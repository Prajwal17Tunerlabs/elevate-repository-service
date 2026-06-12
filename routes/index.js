'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const https = require('https')
const fs = require('fs')

const authenticator = require('@generics/middleware/authenticator')
const pagination = require('@generics/middleware/pagination')

const BASE_URL = process.env.APP_BASE_URL || '/repository-service'

// Apply middleware to all versioned API routes
router.use(`${BASE_URL}/:version/:controller`, [authenticator, pagination])

/**
 * Dynamic route handler.
 * Loads controller by name, invokes the method, and returns a formatted JSON response.
 */
const routeHandler = async (req, res) => {
	try {
		const { version, controller, file, method, _id } = req.params

		// Block methods starting with underscore
		if (method.startsWith('_')) {
			return res.status(HTTP_STATUS_CODE.bad_request.status).json({
				message: CONSTANTS.apiResponses.BAD_REQUEST,
				status: HTTP_STATUS_CODE.bad_request.status,
			})
		}

		// Build controller path: controllers/v1/users or controllers/v1/cloud-services/files
		const controllerBasePath = path.join(PROJECT_ROOT_DIRECTORY, 'controllers', version)
		const controllerPath = file
			? path.join(controllerBasePath, controller, file)
			: path.join(controllerBasePath, controller)

		let ControllerClass
		try {
			ControllerClass = require(controllerPath)
		} catch {
			return res.status(HTTP_STATUS_CODE.bad_request.status).json({
				message: CONSTANTS.apiResponses.BAD_REQUEST,
				status: HTTP_STATUS_CODE.bad_request.status,
			})
		}

		const controllerInstance = new ControllerClass()

		if (typeof controllerInstance[method] !== 'function') {
			return res.status(HTTP_STATUS_CODE.bad_request.status).json({
				message: CONSTANTS.apiResponses.BAD_REQUEST,
				status: HTTP_STATUS_CODE.bad_request.status,
			})
		}

		// Attach path params to request
		if (_id) req.params._id = _id

		const result = await controllerInstance[method](req)

		// Handle stream response (file downloads)
		if (result && result.isResponseAStream) {
			if (result.fileNameWithPath && fs.existsSync(result.fileNameWithPath)) {
				return res.download(result.fileNameWithPath)
			}
			if (result.responseStream) {
				res.setHeader('Content-Disposition', `attachment; filename="${result.fileName || 'download'}"`)
				return result.responseStream.pipe(res)
			}
			if (result.fileUrl && result.fileUrl.startsWith('https')) {
				res.setHeader('Content-Disposition', `attachment; filename="${result.fileName || 'download'}"`)
				return https.get(result.fileUrl, (stream) => stream.pipe(res))
			}
		}

		// Standard JSON response
		return res.status(result.status || HTTP_STATUS_CODE.ok.status).json({
			message: result.message,
			status: result.status || HTTP_STATUS_CODE.ok.status,
			result: result.data !== undefined ? result.data : result.result,
			...(result.count !== undefined && { count: result.count }),
		})
	} catch (error) {
		console.error('Route handler error:', error)
		return res.status(HTTP_STATUS_CODE.internal_server_error.status).json({
			message: error.message || CONSTANTS.apiResponses.INTERNAL_SERVER_ERROR,
			status: HTTP_STATUS_CODE.internal_server_error.status,
		})
	}
}

// Route patterns
router.all(`${BASE_URL}/:version/:controller/:method`, routeHandler)
router.all(`${BASE_URL}/:version/:controller/:file/:method`, routeHandler)
router.all(`${BASE_URL}/:version/:controller/:method/:_id`, routeHandler)
router.all(`${BASE_URL}/:version/:controller/:file/:method/:_id`, routeHandler)

module.exports = router
