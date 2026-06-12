/**
 * name : repository-tokens.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Repository token related information.
 */

// Dependencies
const repositoryTokensHelper = require(MODULES_BASE_PATH + '/repository-tokens/helper')

module.exports = class RepositoryTokens {
	static get name() {
		return 'repository-tokens'
	}

	/**
	 * @api {post} /repository-service/v1/repository-tokens/fetchAccessToken/:_id
	 * Refresh and return a new access token for a repository.
	 * @apiVersion 1.0.0
	 * @apiName fetchAccessToken
	 * @apiGroup RepositoryTokens
	 * @apiParam {String} _id Repository UUID
	 * @apiHeader {String} internal-access-token Internal service token
	 * @apiSampleRequest /repository-service/v1/repository-tokens/fetchAccessToken/uuid-here
	 * @apiUse successBody
	 * @apiUse errorBody
	 * @apiParamExample {json} Response:
	 *   {
	 *     "message": "Resource fetched successfully",
	 *     "status": 200,
	 *     "result": {
	 *       "repository_id": "uuid",
	 *       "access_token": "new-decrypted-access-token",
	 *       "token_expiry": "2026-07-11T00:00:00.000Z",
	 *       "provider_type": "GOOGLE_DRIVE"
	 *     }
	 *   }
	 */

	/**
	 * Decrypt the stored refresh token, call the provider OAuth API to get a new
	 * access token, encrypt and persist it, then return it to the caller.
	 * @method
	 * @name fetchAccessToken
	 * @param {Object} req - Request object.
	 * @param {String} req.params._id - Repository UUID.
	 * @returns {Promise<Object>} New access token with expiry and provider info.
	 */
	async fetchAccessToken(req) {
		return new Promise(async (resolve, reject) => {
			try {
				const repositoryId = req.params._id

				if (!repositoryId) {
					return reject({
						status: HTTP_STATUS_CODE.bad_request.status,
						message: CONSTANTS.apiResponses.REQUIRED_FIELD_MISSING,
					})
				}

				const result = await repositoryTokensHelper.fetchAccessToken(repositoryId)
				return resolve(result)
			} catch (error) {
				return reject({
					status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
					message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
					errorObject: error,
				})
			}
		})
	}
}
