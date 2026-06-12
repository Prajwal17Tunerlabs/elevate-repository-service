'use strict'

const https = require('https')
const http = require('http')
const url = require('url')
const formUrlEncoded = require('form-urlencoded').default
const xmljs = require('xml-js')

class HTTPRequest {
	constructor() {}

	/**
	 * Internal HTTP/HTTPS request handler.
	 * Automatically parses XML or JSON responses.
	 */
	_httpRequest(options, postData = null) {
		return new Promise((resolve) => {
			const protocol = options.protocol === 'https:' ? https : http
			const req = protocol.request(options, (res) => {
				let data = ''
				res.on('data', (chunk) => (data += chunk))
				res.on('end', () => {
					try {
						const contentType = res.headers['content-type'] || ''
						let parsed
						if (contentType.includes('xml')) {
							parsed = JSON.parse(xmljs.xml2json(data, { compact: true, spaces: 2 }))
						} else {
							parsed = JSON.parse(data)
						}
						resolve({ data: parsed, message: 'success', status: res.statusCode, headers: res.headers })
					} catch (e) {
						resolve({ data: data, message: 'success', status: res.statusCode, headers: res.headers })
					}
				})
			})

			req.on('error', (err) => {
				resolve({ data: null, message: err.message, status: 500, headers: {} })
			})

			if (postData) req.write(postData)
			req.end()
		})
	}

	/**
	 * Parse a URL string and route to _httpRequest.
	 */
	_request(reqUrl, method, headers = {}, postData = null) {
		const parsed = url.parse(reqUrl)
		const options = {
			protocol: parsed.protocol,
			hostname: parsed.hostname,
			port: parsed.port,
			path: parsed.path,
			method,
			headers,
		}
		return this._httpRequest(options, postData)
	}

	/**
	 * HTTP GET request with optional query parameters.
	 */
	get(reqUrl, queryParams = {}, headers = {}) {
		const params = new URLSearchParams(queryParams).toString()
		const fullUrl = params ? `${reqUrl}?${params}` : reqUrl
		return this._request(fullUrl, 'GET', headers)
	}

	/**
	 * HTTP POST request.
	 * @param {boolean} isFormEncoded - Send as application/x-www-form-urlencoded if true.
	 */
	post(reqUrl, body = {}, headers = {}, isFormEncoded = false) {
		let postData
		if (isFormEncoded) {
			postData = formUrlEncoded(body)
			headers['Content-Type'] = 'application/x-www-form-urlencoded'
		} else {
			postData = JSON.stringify(body)
			headers['Content-Type'] = 'application/json'
		}
		headers['Content-Length'] = Buffer.byteLength(postData)
		return this._request(reqUrl, 'POST', headers, postData)
	}
}

module.exports = new HTTPRequest()
