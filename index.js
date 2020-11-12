function parseJSON(value) {
	try { 
		return JSON.parse(value)
	} catch(e) {
		return value
	}
}

export function jsonapi({ handler, cors, dependencies, errors }) {
	return async (event, context) => {
		const headers = cors && {
			'Access-Control-Allow-Origin': cors,
			'Access-Control-Allow-Credentials': true,
		};

		try {
			const input = { ...event, body: parseJSON(event.body) };
			const deps =  { ...context, ...dependencies && dependencies(event) };
			const resp = await handler(input, deps);
			
			if(typeof resp === 'string' || typeof resp === 'number') {
				return {
					statusCode: 200,
					...headers && { headers },
					body: resp
				}
			}

			return {
				statusCode: 200,
				...headers && { headers },
				body: JSON.stringify(resp)
			}
		} catch (e) {
			if(errors) {
				const key = Object.keys(errors).find(condition => RegExp(condition).test(e.message));
				if(!key) {
					return {
						statusCode: 500,
						...headers && { headers },
						body: e.message
					}
				}
				const resp = errors[key](e)
				return {
					...resp,
					...headers && { headers },
					body: JSON.stringify(resp.body)
				}
			}
			return {
				statusCode: 500,
				...headers && { headers },
				body: e.message
			}
		}
		
	}
}
