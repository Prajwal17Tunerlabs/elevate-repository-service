/**
 * name : repositories.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Repository related db queries.
 */

const Repository = require('@models/repositories')

module.exports = class RepositoriesQueries {
	/**
	 * Create a new repository record.
	 * @method
	 * @name create
	 * @param {Object} data - Repository fields.
	 * @returns {Promise<Object>} Created repository instance.
	 */
	static create(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await Repository.create(data)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Find a single repository matching the filter.
	 * @method
	 * @name findOne
	 * @param {Object} filter - Where conditions.
	 * @param {Array} [attributes=[]] - Columns to return; empty means all.
	 * @returns {Promise<Object|null>} Repository instance or null.
	 */
	static findOne(filter, attributes = []) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = { where: filter }
				if (attributes.length) options.attributes = attributes
				const result = await Repository.findOne(options)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Paginated list of repositories matching the filter.
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
				const { count, rows } = await Repository.findAndCountAll(options)
				return resolve({ count, data: rows })
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Update repositories matching the filter.
	 * @method
	 * @name updateOne
	 * @param {Object} filter - Where conditions.
	 * @param {Object} update - Fields to update.
	 * @returns {Promise<Array>} [affectedRows].
	 */
	static updateOne(filter, update) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await Repository.update(update, { where: filter })
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Hard delete repositories matching the filter.
	 * @method
	 * @name deleteOne
	 * @param {Object} filter - Where conditions.
	 * @returns {Promise<Number>} Number of deleted rows.
	 */
	static deleteOne(filter) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await Repository.destroy({ where: filter })
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}
}
