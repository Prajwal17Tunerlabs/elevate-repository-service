/**
 * name : resources.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Resource related db queries.
 */

const { Op } = require('sequelize')
const Resource = require('@models/resources')

module.exports = class ResourcesQueries {
	/**
	 * Create a new resource record.
	 * @method
	 * @name create
	 * @param {Object} data - Resource fields.
	 * @returns {Promise<Object>} Created resource instance.
	 */
	static create(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await Resource.create(data)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Bulk insert resources; updates specified columns on duplicate key.
	 * @method
	 * @name bulkCreate
	 * @param {Array} data - Array of resource objects.
	 * @param {Array} updateOnDuplicate - Column names to update on conflict.
	 * @returns {Promise<Array>} Inserted/updated instances.
	 */
	static bulkCreate(data, updateOnDuplicate = []) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await Resource.bulkCreate(data, {
					updateOnDuplicate: updateOnDuplicate.length ? updateOnDuplicate : undefined,
				})
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Find a single resource matching the filter.
	 * @method
	 * @name findOne
	 * @param {Object} filter - Where conditions.
	 * @param {Array} [attributes=[]] - Columns to return; empty means all.
	 * @returns {Promise<Object|null>} Resource instance or null.
	 */
	static findOne(filter, attributes = []) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = { where: filter }
				if (attributes.length) options.attributes = attributes
				const result = await Resource.findOne(options)
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Paginated list of non-deleted resources matching the filter.
	 * @method
	 * @name findAll
	 * @param {Object} [filter={}] - Where conditions (deleted_at IS NULL is added automatically).
	 * @param {Array} [attributes=[]] - Columns to return; empty means all.
	 * @param {Number} [pageNo=1] - Page number.
	 * @param {Number} [pageSize=100] - Records per page.
	 * @param {Array} [order=[['created_at','DESC']]] - Sort order.
	 * @returns {Promise<{ count: Number, data: Array }>}
	 */
	static findAll(filter = {}, attributes = [], pageNo = 1, pageSize = 100, order = [['created_at', 'DESC']]) {
		return new Promise(async (resolve, reject) => {
			try {
				const where = { ...filter, deleted_at: { [Op.is]: null } }
				const options = {
					where,
					limit: pageSize,
					offset: (pageNo - 1) * pageSize,
					order,
				}
				if (attributes.length) options.attributes = attributes
				const { count, rows } = await Resource.findAndCountAll(options)
				return resolve({ count, data: rows })
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Update resources matching the filter.
	 * @method
	 * @name updateOne
	 * @param {Object} filter - Where conditions.
	 * @param {Object} update - Fields to update.
	 * @returns {Promise<Array>} [affectedRows].
	 */
	static updateOne(filter, update) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await Resource.update(update, { where: filter })
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}

	/**
	 * Soft delete resources by setting deleted_at to now.
	 * @method
	 * @name softDelete
	 * @param {Object} filter - Where conditions.
	 * @returns {Promise<Array>} [affectedRows].
	 */
	static softDelete(filter) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await Resource.update({ deleted_at: new Date() }, { where: filter })
				return resolve(result)
			} catch (error) {
				return reject(error)
			}
		})
	}
}
