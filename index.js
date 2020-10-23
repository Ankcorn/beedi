function parseJSON(value) {
	try { 
		return JSON.parse(value)
	} catch(e) {
		return value
	}
}

export function jsonapi({ handler, cors, dependencies, errors }) {
	return async (event, context) => {
		try {
			const resp = await handler({ ...event, body: parseJSON(event.body) }, { ...context, ...dependencies && dependencies(event) });

			const headers = cors && {
				'Access-Control-Allow-Origin': cors,
				'Access-Control-Allow-Credentials': true,
			};
			
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
				const resp = errors[key](e)
				return {
					...resp,
					body: JSON.stringify(resp.body)
				}
			}
			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Internal Server Error' })
			}
		}
		
	}
}
