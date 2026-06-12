/**
 * name : reviewQueue.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Review queue related db queries.
 */

const ReviewQueue = require('@models/reviewQueue')

module.exports = class ReviewQueueQueries {
	/**
	 * Create a new review queue entry.
	 * @method
	 * @name create
	 * @param {Object} data - Review queue fields.
	 * @returns {Promise<Object>} Created review queue instance.
	 */
	static create(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await ReviewQueue.create(data)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Find a single review queue entry matching the filter.
	 * @method
	 * @name findOne
	 * @param {Object} filter - Where conditions.
	 * @param {Array} [attributes=[]] - Columns to return; empty means all.
	 * @returns {Promise<Object|null>} ReviewQueue instance or null.
	 */
	static findOne(filter, attributes = []) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = { where: filter }
				if (attributes.length) options.attributes = attributes
				const result = await ReviewQueue.findOne(options)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Paginated list of review queue entries matching the filter.
	 * @method
	 * @name findAll
	 * @param {Object} [filter={}] - Where conditions.
	 * @param {Array} [attributes=[]] - Columns to return; empty means all.
	 * @param {Number} [pageNo=1] - Page number.
	 * @param {Number} [pageSize=100] - Records per page.
	 * @param {Array} [order=[['created_at','DESC']]] - Sort order.
	 * @returns {Promise<{ count: Number, data: Array }>}
	 */
	static findAll(filter = {}, attributes = [], pageNo = 1, pageSize = 100, order = [['created_at', 'DESC']]) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = {
					where: filter,
					limit: pageSize,
					offset: (pageNo - 1) * pageSize,
					order,
				}
				if (attributes.length) options.attributes = attributes
				const { count, rows } = await ReviewQueue.findAndCountAll(options)
				return resolve({ count, data: rows })
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Update review queue entries matching the filter.
	 * @method
	 * @name updateOne
	 * @param {Object} filter - Where conditions.
	 * @param {Object} update - Fields to update.
	 * @returns {Promise<Array>} [affectedRows].
	 */
	static updateOne(filter, update) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await ReviewQueue.update(update, { where: filter })
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}
}
