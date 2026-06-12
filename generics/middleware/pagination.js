'use strict'

/**
 * Pagination middleware.
 * Parses and validates page, limit, and search query parameters.
 * Sets defaults and enforces max page size.
 */
module.exports = (req, res, next) => {
	const defaultPage = CONSTANTS.common.DEFAULT_PAGE_NO
	const defaultPageSize = CONSTANTS.common.DEFAULT_PAGE_SIZE
	const maxPageSize = CONSTANTS.common.MAX_PAGE_SIZE

	let pageNo = parseInt(req.query.page || req.body.page) || defaultPage
	let pageSize = parseInt(req.query.limit || req.body.limit) || defaultPageSize

	if (pageNo < 1) pageNo = defaultPage
	if (pageSize < 1 || pageSize > maxPageSize) pageSize = defaultPageSize

	req.pageNo = pageNo
	req.pageSize = pageSize
	req.searchText = req.query.search || req.body.search || ''

	next()
}
