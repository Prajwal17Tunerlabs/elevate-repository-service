'use strict'

const httpRequest = require('./http-request')

/**
 * POST to an internal service endpoint with auth headers.
 */
const post = (url, body, token = '', internalAccessToken = '') => {
	const headers = {}
	if (token) headers['x-auth-token'] = token
	if (internalAccessToken) headers['internal-access-token'] = internalAccessToken
	return httpRequest.post(url, body, headers)
}

/**
 * GET from an internal service endpoint with auth headers.
 */
const get = (url, queryParams = {}, token = '', internalAccessToken = '') => {
	const headers = {}
	if (token) headers['x-auth-token'] = token
	if (internalAccessToken) headers['internal-access-token'] = internalAccessToken
	return httpRequest.get(url, queryParams, headers)
}

module.exports = { post, get }
