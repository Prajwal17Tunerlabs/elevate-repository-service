'use strict'

const GUEST_PATHS = ['health', 'healthcheckstatus']

const isGuestPath = (req) => {
	const pathSegments = req.path.toLowerCase().split('/')
	return pathSegments.some((segment) => GUEST_PATHS.includes(segment))
}

module.exports = (req, res, next) => {
	if (isGuestPath(req)) return next()

	const internalToken = req.headers['internal-access-token']

	if (!internalToken || internalToken !== process.env.INTERNAL_ACCESS_TOKEN) {
		return res.status(HTTP_STATUS_CODE.unauthorized.status).json({
			message: CONSTANTS.apiResponses.UNAUTHORIZED,
			status: HTTP_STATUS_CODE.unauthorized.status,
		})
	}

	next()
}
