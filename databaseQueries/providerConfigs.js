/**
 * name : providerConfigs.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Provider config related db queries.
 */

const ProviderConfig = require('@models/providerConfigs')

module.exports = class ProviderConfigsQueries {
	/**
	 * Find a single provider config matching the filter.
	 * @method
	 * @name findOne
	 * @param {Object} filter - Where conditions.
	 * @param {Array} [attributes=[]] - Columns to return; empty means all.
	 * @returns {Promise<Object|null>} ProviderConfig instance or null.
	 */
	static findOne(filter, attributes = []) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = { where: filter }
				if (attributes.length) options.attributes = attributes
				const result = await ProviderConfig.findOne(options)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * List all provider configs.
	 * @method
	 * @name findAll
	 * @param {Object} [filter={}] - Where conditions.
	 * @param {Array} [attributes=[]] - Columns to return; empty means all.
	 * @returns {Promise<Array>} Array of ProviderConfig instances.
	 */
	static findAll(filter = {}, attributes = []) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = { where: filter }
				if (attributes.length) options.attributes = attributes
				const result = await ProviderConfig.findAll(options)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Insert or update a provider config by provider_type.
	 * @method
	 * @name upsert
	 * @param {Object} data - Config fields including provider_type.
	 * @returns {Promise<Array>} [instance, created].
	 */
	static upsert(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await ProviderConfig.upsert(data)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Update provider configs matching the filter.
	 * @method
	 * @name updateOne
	 * @param {Object} filter - Where conditions.
	 * @param {Object} update - Fields to update.
	 * @returns {Promise<Array>} [affectedRows].
	 */
	static updateOne(filter, update) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await ProviderConfig.update(update, { where: filter })
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}
}
