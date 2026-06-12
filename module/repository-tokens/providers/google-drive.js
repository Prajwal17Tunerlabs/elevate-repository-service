/**
 * name : google-drive.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Google Drive OAuth2 access token refresh.
 */

const rp = require('request-promise')

/**
 * Exchange a Google OAuth2 refresh token for a new access token.
 * @param {String} refreshToken - Decrypted refresh token.
 * @returns {Promise<{ access_token: String, expires_in: Number }>}
 */
async function refreshAccessToken(refreshToken) {
	const response = await rp({
		method: 'POST',
		uri: process.env.GOOGLE_DRIVE_TOKEN_URL,
		form: {
			client_id: process.env.GOOGLE_DRIVE_CLIENT_ID,
			client_secret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
			refresh_token: refreshToken,
			grant_type: 'refresh_token',
		},
		json: true,
	})

	if (!response.access_token) {
		const err = new Error('Google Drive token refresh failed: no access_token in response')
		err.status = HTTP_STATUS_CODE.internal_server_error.status
		throw err
	}

	return {
		access_token: response.access_token,
		expires_in: response.expires_in, // seconds, typically 3600
	}
}

module.exports = { refreshAccessToken }
