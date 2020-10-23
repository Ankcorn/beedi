import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { jsonapi } from '../index';

test('beedi calls my handler and parses json response', async () => {
	const handler = async() => {
		return { 
			message: 'ok'
		}
	}
	const lambda = jsonapi({
		handler
	});

	const response = await lambda();

	assert.equal(response, {
		statusCode: 200,
		body: '{"message":"ok"}'
	}, 'expects correct lambda response')
})

test('beedi calls my handler and parses string response', async () => {
	const handler = async() => {
		return 'ok'
	}
	const lambda = jsonapi({
		handler
	});

	const response = await lambda();

	assert.equal(response, {
		statusCode: 200,
		body: 'ok'
	}, 'expects correct lambda response')
});

test('beedi calls my handler and parses number response', async () => {
	const handler = async() => {
		return 4
	}
	const lambda = jsonapi({
		handler
	});

	const response = await lambda();

	assert.equal(response, {
		statusCode: 200,
		body: 4
	}, 'expects correct lambda response')
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

	const response = await lambda();

	assert.equal(response, {
		statusCode: 200,
		body: '{"message":"hello cors"}',
		headers:{
			"Access-Control-Allow-Origin":"*",
			"Access-Control-Allow-Credentials":true
		}
	}, 'expects correct lambda response')
});

test.run();
