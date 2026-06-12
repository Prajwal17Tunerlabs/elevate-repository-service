'use strict'

// Routes that require admin-level access
const ADMIN_PATHS = ['/admin']

/**
 * Checks if the request path requires admin access and validates the user role.
 */
module.exports = (req, res, next) => {
	const isAdminPath = ADMIN_PATHS.some((adminPath) => req.path.toLowerCase().includes(adminPath))

	if (!isAdminPath) return next()

	if (!req.userDetails || !req.userDetails.roles) {
		return res.status(HTTP_STATUS_CODE.unauthorized.status).json({
			message: CONSTANTS.apiResponses.UNAUTHORIZED,
			status: HTTP_STATUS_CODE.unauthorized.status,
		})
	}

	const adminRoles = [CONSTANTS.common.SUPER_ADMIN, CONSTANTS.common.TENANT_ADMIN, CONSTANTS.common.ORG_ADMIN]
	const hasAdminRole = UTILS.validateRoles(req.userDetails.roles, adminRoles)

	if (!hasAdminRole) {
		return res.status(HTTP_STATUS_CODE.forbidden.status).json({
			message: CONSTANTS.apiResponses.FORBIDDEN,
			status: HTTP_STATUS_CODE.forbidden.status,
		})
	}

	next()
}
