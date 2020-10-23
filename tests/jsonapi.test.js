import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { jsonapi } from '../index';
import event from './seed/event.json'

test('beedi calls my handler and parses json response', async () => {
	const handler = async() => {
		return { 
			message: 'ok'
		}
	}
	const lambda = jsonapi({
		handler
	});

	const response = await lambda(event);

	assert.equal(response, {
		statusCode: 200,
		body: '{"message":"ok"}'
	})
})

test('beedi calls my handler and parses string response', async () => {
	const handler = async() => {
		return 'ok'
	}
	const lambda = jsonapi({
		handler
	});

	const response = await lambda(event);

	assert.equal(response, {
		statusCode: 200,
		body: 'ok'
	})
});

test('beedi calls my handler and parses number response', async () => {
	const handler = async() => {
		return 4
	}
	const lambda = jsonapi({
		handler
	});

	const response = await lambda(event);

	assert.equal(response, {
		statusCode: 200,
		body: 4
	})
});

test('beedi supports cors', async () => {
	const handler = async () => {
		return {
			message: 'hello cors'
		}
	}
	const lambda = jsonapi({
		handler,
		cors: '*'
	});

	const response = await lambda(event);

	assert.equal(response, {
		statusCode: 200,
		body: '{"message":"hello cors"}',
		headers:{
			"Access-Control-Allow-Origin":"*",
			"Access-Control-Allow-Credentials":true
		}
	})
});



test('beedi parses body to object to make life slightly more convenient', async () => {
	const handler = async (event) => {
		return event.body.message
	}

	const lambda = jsonapi({
		handler,
	});

	const response = await lambda(event);

	assert.equal(response, {
		statusCode: 200,
		body: "this a key of body in the test object",
	})
});

test('beedi lets you inject dependencies to make testing easier', async () => {
	const handler = async (event, { dep1, dep2 }) => {
		return {
			dep1: dep1(),
			dep2: dep2(),
		}
	}

	const lambda = jsonapi({
		handler,
		dependencies: () => ({ dep1: () => 'dep1 was called', dep2: () => 'dep2 was called' })
	});

	const response = await lambda(event, {});

	assert.equal(response.statusCode, 200)
	assert.equal(response.body, JSON.stringify({dep1:'dep1 was called',dep2:'dep2 was called'}));
});

test('beedi json api handles errors for you', async () => {
	const handler = async (event, { dep1, dep2 }) => {
		throw Error('big bad error')
	}

	const lambda = jsonapi({
		handler,
	});

	const response = await lambda(event, {});

	assert.equal(response, {
		statusCode: 500,
		body: "{\"message\":\"Internal Server Error\"}",
	})
});

test('beedi json api can catch and configure errors with regex', async () => {
	const handler = async (event, { dep1, dep2 }) => {
		throw Error('big bad error')
	}

	const lambda = jsonapi({
		handler,
		errors: {
			"big*": error => ({
				body: { foo: error.message },
				statusCode: 400,
			}),
			"*": error => ({
				body: { message: 'Internal Server Error'},
				statusCode: 500
			})
		}
	});

	const response = await lambda(event, {});

	assert.equal(response, {
		statusCode: 400,
		body: "{\"foo\":\"big bad error\"}",
	})
});

test.run();
