/**
 * name : resourceMetadata.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Resource metadata related db queries.
 */

const ResourceMetadata = require('@models/resourceMetadata')

module.exports = class ResourceMetadataQueries {
	/**
	 * Create a new metadata record.
	 * @method
	 * @name create
	 * @param {Object} data - Metadata fields.
	 * @returns {Promise<Object>} Created metadata instance.
	 */
	static create(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await ResourceMetadata.create(data)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Bulk insert metadata records.
	 * @method
	 * @name bulkCreate
	 * @param {Array} data - Array of metadata objects.
	 * @returns {Promise<Array>} Inserted instances.
	 */
	static bulkCreate(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await ResourceMetadata.bulkCreate(data)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * List all metadata records matching the filter.
	 * @method
	 * @name findAll
	 * @param {Object} [filter={}] - Where conditions.
	 * @param {Array} [attributes=[]] - Columns to return; empty means all.
	 * @returns {Promise<Array>} Array of metadata instances.
	 */
	static findAll(filter = {}, attributes = []) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = { where: filter }
				if (attributes.length) options.attributes = attributes
				const result = await ResourceMetadata.findAll(options)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Update metadata records matching the filter.
	 * @method
	 * @name updateOne
	 * @param {Object} filter - Where conditions.
	 * @param {Object} update - Fields to update.
	 * @returns {Promise<Array>} [affectedRows].
	 */
	static updateOne(filter, update) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await ResourceMetadata.update(update, { where: filter })
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Delete metadata records matching the filter.
	 * @method
	 * @name deleteOne
	 * @param {Object} filter - Where conditions.
	 * @returns {Promise<Number>} Number of deleted rows.
	 */
	static deleteOne(filter) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await ResourceMetadata.destroy({ where: filter })
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}
}
