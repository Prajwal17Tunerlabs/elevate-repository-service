/**
 * name : helper.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Repositories helper methods.
 */

// Dependencies
const ResourcesQueries = require('@databaseQueries/resources')

module.exports = class RepositoriesHelper {
	/**
	 * Fetch paginated list of resources for a repository.
	 * @method
	 * @name contents
	 * @param {String} repositoryId - Repository UUID.
	 * @param {Object} filters - Optional query filters.
	 * @param {String|null} filters.processing_status - Filter by processing status.
	 * @param {String|null} filters.review_status - Filter by review status.
	 * @param {Boolean|null} filters.is_resource_processed - Filter by processed flag.
	 * @param {Number} pageNo - Page number.
	 * @param {Number} pageSize - Number of records per page.
	 * @returns {Promise<Object>} Paginated resource list with count.
	 */
	static contents(repositoryId, filters = {}, pageNo = 1, pageSize = 100) {
		return new Promise(async (resolve, reject) => {
			try {
				const filter = { repository_id: repositoryId }

				if (filters.processing_status) filter.processing_status = filters.processing_status
				if (filters.review_status) filter.review_status = filters.review_status
				if (filters.is_resource_processed !== null) filter.is_resource_processed = filters.is_resource_processed

				const { count, data } = await ResourcesQueries.findAll(filter, [], pageNo, pageSize)

				return resolve({
					status: HTTP_STATUS_CODE.ok.status,
					message: CONSTANTS.apiResponses.RESOURCE_LIST_FETCHED,
					data,
					count,
				})
			} catch (error) {
				return reject({
					status: HTTP_STATUS_CODE.internal_server_error.status,
					message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
					errorObject: error,
				})
			}
		})
	}
}
