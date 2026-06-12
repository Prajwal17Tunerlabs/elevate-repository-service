'use strict'

const sampleActivity = async (params) => {
	console.log('Running sampleActivity with params:', params)
	// Add your activity logic here
	return { success: true, message: 'Activity completed', params }
}

module.exports = { sampleActivity }
