/**
 * name : repositoryTokens.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Repository token related db queries.
 */

const RepositoryToken = require('@models/repositoryTokens')

module.exports = class RepositoryTokensQueries {
	/**
	 * Create a new repository token record.
	 * @method
	 * @name create
	 * @param {Object} data - Token fields.
	 * @returns {Promise<Object>} Created token instance.
	 */
	static create(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await RepositoryToken.create(data)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Find a single token record matching the filter.
	 * @method
	 * @name findOne
	 * @param {Object} filter - Where conditions.
	 * @param {Array} [attributes=[]] - Columns to return; empty means all.
	 * @returns {Promise<Object|null>} Token instance or null.
	 */
	static findOne(filter, attributes = []) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = { where: filter }
				if (attributes.length) options.attributes = attributes
				const result = await RepositoryToken.findOne(options)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Update a token record matching the filter.
	 * @method
	 * @name updateOne
	 * @param {Object} filter - Where conditions.
	 * @param {Object} update - Fields to update.
	 * @returns {Promise<Array>} [affectedRows].
	 */
	static updateOne(filter, update) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await RepositoryToken.update(update, { where: filter })
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Insert or update a token record by repository_id.
	 * @method
	 * @name upsert
	 * @param {Object} data - Token fields including repository_id.
	 * @returns {Promise<Array>} [instance, created].
	 */
	static upsert(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await RepositoryToken.upsert(data)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Delete a token record matching the filter.
	 * @method
	 * @name deleteOne
	 * @param {Object} filter - Where conditions.
	 * @returns {Promise<Number>} Number of deleted rows.
	 */
	static deleteOne(filter) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await RepositoryToken.destroy({ where: filter })
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}
}
