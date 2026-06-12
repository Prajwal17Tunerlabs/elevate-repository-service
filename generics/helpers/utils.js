'use strict'

const { validate: uuidValidate, v4: uuidV4 } = require('uuid')
const md5 = require('md5')
const moment = require('moment')

/**
 * Convert camelCase string to Title Case.
 */
function camelCaseToTitleCase(str) {
	return str
		.replace(/([a-z])([A-Z][a-z])/g, '$1 $2')
		.replace(/([A-Z][a-z])([A-Z])/g, '$1 $2')
		.replace(/([a-z])([A-Z]+[a-z])/g, '$1 $2')
		.trim()
		.replace(/^./, (s) => s.toUpperCase())
}

/**
 * Convert hyphen-case string to camelCase.
 */
function hyphenCaseToCamelCase(string) {
	return string.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

function lowerCase(str) {
	return str.toLowerCase()
}

function upperCase(str) {
	return str.toUpperCase()
}

/**
 * Check whether a string is a URL.
 */
function checkIfStringIsUrl(str) {
	const pattern = new RegExp(
		'^(https?:\\/\\/)?' +
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
			'((\\d{1,3}\\.){3}\\d{1,3}))' +
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
			'(\\?[;&a-z\\d%_.~+=-]*)?' +
			'(\\#[-a-z\\d_]*)?$',
		'i'
	)
	return pattern.test(str)
}

/**
 * Convert string to boolean.
 */
function convertStringToBoolean(stringData) {
	return stringData === 'TRUE' || stringData === 'true' || stringData === true
}


/**
 * Get current epoch timestamp.
 */
function epochTime() {
	return new Date().getTime()
}

/**
 * Check whether a string is a valid UUID.
 */
function checkValidUUID(uuids) {
	if (Array.isArray(uuids)) {
		return uuids.every((u) => uuidValidate(u))
	}
	return uuidValidate(uuids)
}

function checkIfValidUUID(value) {
	const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
	return regexExp.test(value)
}

/**
 * Generate a new UUID v4.
 */
function generateUniqueId() {
	return uuidV4()
}

/**
 * MD5 hash a value.
 */
function md5Hash(value) {
	return md5(value)
}

function arrayOfObjectToArrayOfObjectId(ids) {
	return ids.map((obj) => obj._id)
}

/**
 * Calculate the difference in days between two dates.
 */
function dateDiffInDays(startDate, endDate) {
	const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
	const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
	return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24))
}

/**
 * Returns date adjusted by the given timezone offset string (e.g. "+05:30").
 */
function addOffsetToDateTime(time, timeZoneDifference) {
	const localTime = timeZoneDifference.split(':')
	const localHourDifference = Number(localTime[0])
	const getTimeDiffInMinutes =
		localHourDifference * 60 + (localHourDifference / Math.abs(localHourDifference)) * Number(localTime[1])
	const timeDifference = new Date().getTimezoneOffset()
	const differenceWithLocal = timeDifference + getTimeDiffInMinutes

	if (differenceWithLocal === 0) return time

	const getMinutes = differenceWithLocal % 60
	const getHours = (differenceWithLocal - getMinutes) / 60
	time.setHours(time.getHours() - getHours)
	time.setMinutes(time.getMinutes() - getMinutes)
	return time
}

function getStartDate(date, timeZoneDifference) {
	let startDate = date.split(' ')
	if (!startDate[1]) date = startDate[0] + ' 00:00:00'
	return addOffsetToDateTime(new Date(date), timeZoneDifference)
}

function getEndDate(date, timeZoneDifference) {
	let endDate = date.split(' ')
	if (!endDate[1]) date = endDate[0] + ' 23:59:59'
	return addOffsetToDateTime(new Date(date), timeZoneDifference)
}

/**
 * Calculate end date by adding durationInDays to a start date.
 */
function calculateEndDate(createdDate, durationInDays) {
	const startDate = moment(createdDate)
	if (!startDate.isValid()) throw new Error('Invalid start date format')
	if (typeof durationInDays !== 'number' || durationInDays < 0)
		throw new Error('Duration must be a valid non-negative number')
	return startDate.add(durationInDays, 'days').toISOString()
}

/**
 * Convert duration string (e.g. "2 weeks") to number of days.
 */
function convertDurationToDays(duration) {
	const [value, unit] = duration.split(' ')
	const numericValue = parseInt(value, 10)
	switch (unit.toLowerCase()) {
		case 'day':
		case 'days':
			return numericValue
		case 'week':
		case 'weeks':
			return numericValue * 7
		case 'month':
		case 'months':
			return numericValue * 30
		case 'year':
		case 'years':
			return numericValue * 365
		default:
			throw new Error(`Unsupported duration unit: ${unit}`)
	}
}

/**
 * Format ISO date to human-readable string (e.g. "16 July 2024").
 */
function formatISODateToReadableDate(isoDate) {
	return new Date(isoDate).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	})
}

/**
 * Generate externalId from a title string.
 */
function generateExternalId(title) {
	const words = title.split(/[\s-]+/)
	const abbreviation = words.map((word) => (word[0] || '').toUpperCase()).join('')
	return `${abbreviation}-${Date.now()}`
}

function formatToTitleCase(value) {
	return value
		.replace(/_/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase())
		.trim()
}

function formatKeywords(keywords) {
	if (Array.isArray(keywords)) return keywords.map((k) => k.trim())
	if (typeof keywords === 'string') return keywords.split(',').map((k) => k.trim())
	return []
}

/**
 * Build a MongoDB $in query per scope factor.
 */
function factorQuery(factors, userRoleInfo) {
	const queryFilter = []
	for (const factor of factors) {
		const scope = 'scope.' + factor
		const rawValues = userRoleInfo[factor]
		let valueArray

		if (rawValues == null) {
			valueArray = [CONSTANTS.common.ALL_SCOPE_VALUE]
		} else if (Array.isArray(rawValues)) {
			valueArray = [...rawValues, CONSTANTS.common.ALL_SCOPE_VALUE]
		} else if (typeof rawValues === 'string') {
			valueArray = [
				...rawValues
					.split(',')
					.map((v) => v.trim())
					.filter(Boolean),
				CONSTANTS.common.ALL_SCOPE_VALUE,
			]
		}

		queryFilter.push({ [scope]: { $in: valueArray } })
	}
	return queryFilter
}

/**
 * Build a MongoDB filter query with mandatory + optional scope factors.
 */
function targetingQuery(bodyData, tenantMeta, mandatoryField, optionalField) {
	const mandatoryFactors = (tenantMeta[mandatoryField] || [])
	const optionalFactors = (tenantMeta[optionalField] || [])
	const andClauses = []

	if (mandatoryFactors.length) andClauses.push(...factorQuery(mandatoryFactors, bodyData))
	if (optionalFactors.length) {
		const optionalQuery = factorQuery(optionalFactors, bodyData)
		if (optionalQuery.length) andClauses.push({ $or: optionalQuery })
	}

	return andClauses.length ? { $and: andClauses } : {}
}

/**
 * Filter and return only allowed scope fields from scopeData.
 */
function getFilteredScope(scopeData, tenantPublicDetailsMetaField) {
	const mandatoryFields = tenantPublicDetailsMetaField[CONSTANTS.common.MANDATORY_SCOPE_FIELD] || []
	const optionalFields = tenantPublicDetailsMetaField[CONSTANTS.common.OPTIONAL_SCOPE_FIELD] || []
	const filteredScope = {}

	for (const field of [...mandatoryFields, ...optionalFields]) {
		if (scopeData[field]) {
			filteredScope[field] = scopeData[field]
		} else if (mandatoryFields.includes(field)) {
			filteredScope[field] = [CONSTANTS.common.ALL_SCOPE_VALUE]
		}
	}
	return filteredScope
}

/**
 * Validate whether any user role matches allowed roles.
 */
function validateRoles(roles, roleToCheck) {
	return roles.some((role) => roleToCheck.includes(role))
}

/**
 * Filter UUID and non-UUID strings into separate arrays.
 */
function filterLocationIdandCode(dataArray) {
	const ids = []
	const codes = []
	dataArray.forEach((element) => {
		checkValidUUID(element) ? ids.push(element) : codes.push(element)
	})
	return { ids, codes }
}

module.exports = {
	camelCaseToTitleCase,
	hyphenCaseToCamelCase,
	lowerCase,
	upperCase,
	checkIfStringIsUrl,
	convertStringToBoolean,
	epochTime,
	checkValidUUID,
	checkIfValidUUID,
	generateUniqueId,
	md5Hash,
	arrayOfObjectToArrayOfObjectId,
	dateDiffInDays,
	addOffsetToDateTime,
	getStartDate,
	getEndDate,
	calculateEndDate,
	convertDurationToDays,
	formatISODateToReadableDate,
	generateExternalId,
	formatToTitleCase,
	formatKeywords,
	factorQuery,
	targetingQuery,
	getFilteredScope,
	validateRoles,
	filterLocationIdandCode,
}
