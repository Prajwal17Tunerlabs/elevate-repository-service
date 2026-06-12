'use strict'

/**
 * Injects tenantId and organizations into req.body from authenticated user details.
 * Falls back to header-provided values for admin-level operations.
 */
module.exports = (req, res, next) => {
	if (!req.userDetails) return next()

	const { tenantId, organizations } = req.userDetails

	if (tenantId) {
		req.body.tenantId = tenantId
		req.decodedToken = req.decodedToken || {}
		req.decodedToken.tenantId = tenantId
	}

	if (organizations) {
		req.body.organizations = organizations
	}

	// Allow overriding org via header (e.g. for tenant/org admins)
	const orgCodeFromHeader = req.headers['organization-code']
	if (orgCodeFromHeader) {
		req.body.organizationCode = orgCodeFromHeader.toLowerCase()
	}

	next()
}
