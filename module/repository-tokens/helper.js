/**
 * name : helper.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Repository tokens helper methods.
 */

// Dependencies
const crypto = require('crypto')
const RepositoryTokensQueries = require('@databaseQueries/repositoryTokens')
const providerRegistry = require('./providers')

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16

function getKey() {
	const secret = process.env.ENCRYPTION_SECRET
	if (!secret) throw new Error('ENCRYPTION_SECRET is not configured')
	return crypto.scryptSync(secret, 'salt', 32)
}

function decrypt(encryptedText) {
	const [ivHex, encrypted] = encryptedText.split(':')
	const iv = Buffer.from(ivHex, 'hex')
	const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv)
	return Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]).toString('utf8')
}

function encrypt(text) {
	const iv = crypto.randomBytes(IV_LENGTH)
	const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv)
	const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
	return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

module.exports = class RepositoryTokensHelper {
	/**
	 * Decrypt the stored refresh token, call the provider OAuth endpoint for a new
	 * access token, encrypt and persist it, then return it to the caller.
	 * @method
	 * @name fetchAccessToken
	 * @param {String} repositoryId - UUID of the repository.
	 * @returns {Promise<Object>} New access token with expiry and provider info.
	 */
	static fetchAccessToken(repositoryId) {
		return new Promise(async (resolve, reject) => {
			try {
				// 1. Load token record
				const tokenRecord = await RepositoryTokensQueries.findOne({ repository_id: repositoryId })

				if (!tokenRecord) {
					return reject({
						status: HTTP_STATUS_CODE.not_found.status,
						message: CONSTANTS.apiResponses.RESOURCE_NOT_FOUND,
					})
				}

				// 2. Decrypt the stored refresh token
				const refreshToken = decrypt(tokenRecord.encrypted_refresh_token)

				// 3. Delegate to the appropriate provider to get a new access token
				const provider = providerRegistry.getProvider(tokenRecord.provider_type)
				const { access_token, expires_in } = await provider.refreshAccessToken(refreshToken)

				// 4. Encrypt and persist the new access token
				const encryptedAccessToken = encrypt(access_token)
				const tokenExpiry = expires_in ? new Date(Date.now() + expires_in * 1000) : null

				await RepositoryTokensQueries.updateOne(
					{ repository_id: repositoryId },
					{ encrypted_access_token: encryptedAccessToken, token_expiry: tokenExpiry }
				)

				return resolve({
					status: HTTP_STATUS_CODE.ok.status,
					message: CONSTANTS.apiResponses.RESOURCE_FETCHED,
					data: {
						repository_id: repositoryId,
						access_token,
						token_expiry: tokenExpiry,
						provider_type: tokenRecord.provider_type,
					},
				})
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
