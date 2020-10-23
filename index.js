

export function jsonapi({ handler, cors }) {
	return async (event, context) => {
		
		const resp = await handler();

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
	}
}
