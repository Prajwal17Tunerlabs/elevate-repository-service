/**
 * name : repositories.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Repository related information.
 */

// Dependencies
const repositoriesHelper = require(MODULES_BASE_PATH + '/repositories/helper')

module.exports = class Repositories {
	static get name() {
		return 'repositories'
	}

	/**
	 * @api {get} /repository-service/v1/repositories/contents/:_id
	 * Fetch paginated list of resources belonging to a repository.
	 * @apiVersion 1.0.0
	 * @apiName contents
	 * @apiGroup Repositories
	 * @apiParam {String} _id Repository UUID
	 * @apiQuery {Number} [page=1] Page number
	 * @apiQuery {Number} [limit=100] Page size
	 * @apiQuery {String} [processing_status] Filter by processing status
	 * @apiQuery {String} [review_status] Filter by review status
	 * @apiQuery {Boolean} [is_resource_processed] Filter by processed flag
	 * @apiHeader {String} internal-access-token Internal service token
	 * @apiSampleRequest /repository-service/v1/repositories/contents/uuid-here
	 * @apiUse successBody
	 * @apiUse errorBody
	 * @apiParamExample {json} Response:
	 *   {
	 *     "message": "Resource list fetched successfully",
	 *     "status": 200,
	 *     "result": [],
	 *     "count": 0
	 *   }
	 */

	/**
	 * Fetch paginated list of resources for a repository.
	 * @method
	 * @name contents
	 * @param {Object} req - Request object.
	 * @param {String} req.params._id - Repository UUID.
	 * @param {Number} req.pageNo - Current page number (set by pagination middleware).
	 * @param {Number} req.pageSize - Page size (set by pagination middleware).
	 * @param {String} [req.query.processing_status] - Filter by resource processing status.
	 * @param {String} [req.query.review_status] - Filter by resource review status.
	 * @param {String} [req.query.is_resource_processed] - Filter by processed flag ('true'/'false').
	 * @returns {Promise<Object>} Paginated resource list with total count.
	 */
	async contents(req) {
		return new Promise(async (resolve, reject) => {
			try {
				const repositoryId = req.params._id
				const { pageNo, pageSize } = req

				const filters = {
					processing_status: req.query.processing_status || null,
					review_status: req.query.review_status || null,
					is_resource_processed:
						req.query.is_resource_processed !== undefined
							? req.query.is_resource_processed === 'true'
							: null,
				}

				const result = await repositoriesHelper.contents(repositoryId, filters, pageNo, pageSize)
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
