'use strict'

/**
 * Sample Kafka consumer handler.
 *
 * Receives messages from a Kafka topic and processes them.
 * Register this consumer in config/kafka.js with the appropriate topic.
 */

/**
 * Called when a Kafka message is received.
 * @param {Object} message - Kafka message object with .value string
 * @returns {Promise}
 */
const messageReceived = (message) => {
	return new Promise(async (resolve, reject) => {
		try {
			const parsedMessage = JSON.parse(message.value)

			// TODO: Replace with actual business logic
			console.log('Sample consumer received message:', parsedMessage)

			// Example: validate entity type
			if (!parsedMessage.entityType) {
				return resolve('Message skipped: missing entityType')
			}

			// Process message...
			// await someHelper.processEvent(parsedMessage)

			return resolve('Message processed successfully')
		} catch (error) {
			return reject(error)
		}
	})
}

/**
 * Called when an error occurs in the consumer.
 * @param {Error} error
 * @returns {Promise}
 */
const errorTriggered = (error) => {
	return new Promise((resolve) => {
		console.error('Sample consumer error:', error)
		resolve(error)
	})
}

module.exports = { messageReceived, errorTriggered }
