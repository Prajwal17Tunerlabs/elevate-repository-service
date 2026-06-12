/**
 * name : index.js
 * author : Prajwal
 * created-date : 11-Jun-2026
 * Description : Provider registry — maps provider_type to its token refresh handler.
 */

const providers = {
	GOOGLE_DRIVE: require('./google-drive'),
	ONE_DRIVE: require('./one-drive'),
	GITHUB: require('./github'),
}

module.exports = {
	/**
	 * Return the provider handler for a given provider_type.
	 * @param {String} providerType - e.g. 'GOOGLE_DRIVE'
	 * @returns {{ refreshAccessToken: Function }}
	 */
	getProvider(providerType) {
		const provider = providers[providerType]
		if (!provider) {
			const err = new Error(`Unsupported provider type: ${providerType}`)
			err.status = HTTP_STATUS_CODE.bad_request.status
			throw err
		}
		return provider
	},
}
