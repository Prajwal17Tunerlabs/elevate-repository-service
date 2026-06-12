/**
 * name : github.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : GitHub token refresh.
 *
 * GitHub fine-grained PATs and classic PATs do not have a standard OAuth
 * refresh flow. The "refresh token" stored here is treated as a long-lived
 * credential and is returned as-is for the access token.
 * For GitHub Apps with installation tokens, replace this with a call to
 * POST /app/installations/{installation_id}/access_tokens using a signed JWT.
 */

/**
 * Return the GitHub token as-is (no OAuth refresh endpoint for PATs).
 * @param {String} refreshToken - Decrypted stored token (treated as the access credential).
 * @returns {Promise<{ access_token: String, expires_in: null }>}
 */
async function refreshAccessToken(refreshToken) {
	return {
		access_token: refreshToken,
		expires_in: null,
	}
}

module.exports = { refreshAccessToken }
