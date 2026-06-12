'use strict'

module.exports = {
	ok: { status: 200, message: 'OK' },
	created: { status: 201, message: 'Created' },
	no_content: { status: 204, message: 'No Content' },
	bad_request: { status: 400, message: 'Bad Request' },
	unauthorized: { status: 401, message: 'Unauthorized' },
	forbidden: { status: 403, message: 'Forbidden' },
	not_found: { status: 404, message: 'Not Found' },
	conflict: { status: 409, message: 'Conflict' },
	unprocessable: { status: 422, message: 'Unprocessable Entity' },
	too_many_requests: { status: 429, message: 'Too Many Requests' },
	internal_server_error: { status: 500, message: 'Internal Server Error' },
	service_unavailable: { status: 503, message: 'Service Unavailable' },
}
