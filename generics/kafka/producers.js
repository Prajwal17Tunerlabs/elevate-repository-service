'use strict'

const kafka = require('kafka-node')

let kafkaClient = null
let producer = null

/**
 * Initialize Kafka client and producer (call once at startup).
 */
const initialize = () => {
	kafkaClient = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_URL })
	producer = new kafka.HighLevelProducer(kafkaClient)

	producer.on('ready', () => {
		console.log('Kafka producer is ready')
	})

	producer.on('error', (err) => {
		console.error('Kafka producer error:', err)
	})
}

/**
 * Core function to push a message to a Kafka topic.
 * @param {string} topic - Kafka topic name
 * @param {string} message - JSON stringified message
 * @returns {Promise<Object>}
 */
const pushMessageToKafka = (topic, message) => {
	return new Promise((resolve, reject) => {
		if (process.env.KAFKA_COMMUNICATIONS_ON !== 'ON') {
			return resolve({
				success: false,
				message: CONSTANTS.apiResponses.KAFKA_COMMUNICATION_OFF,
			})
		}

		if (!producer) {
			return resolve({ success: false, message: 'Kafka producer not initialized' })
		}

		const payloads = [{ topic, messages: message }]

		producer.send(payloads, (err, data) => {
			if (err) {
				console.error(`Failed to push message to topic ${topic}:`, err)
				return resolve({ success: false, message: err.message })
			}
			console.log(`Message pushed to topic ${topic}:`, data)
			return resolve({ success: true, message: CONSTANTS.apiResponses.MESSAGE_PUBLISHED, data })
		})
	})
}

/**
 * Push a generic resource event to Kafka.
 * @param {Object} resourceData
 */
const pushResourceEventToKafka = async (resourceData) => {
	const topic = process.env.KAFKA_TOPIC_SAMPLE || 'sample-topic'
	const message = JSON.stringify(resourceData)
	return pushMessageToKafka(topic, message)
}

/**
 * Push a user activity event to Kafka.
 * @param {Object} activityData
 */
const pushUserActivityToKafka = async (activityData) => {
	const topic = process.env.KAFKA_TOPIC_USER_ACTIVITY || 'user-activities'
	const message = JSON.stringify(activityData)
	return pushMessageToKafka(topic, message)
}

/**
 * Push a resource deletion event to Kafka.
 * @param {Object} deletionData
 */
const pushResourceDeleteKafkaEvent = async (deletionData) => {
	const topic = process.env.KAFKA_TOPIC_RESOURCE_DELETION || 'resource-deletion-topic'
	const message = JSON.stringify(deletionData)
	return pushMessageToKafka(topic, message)
}

module.exports = {
	initialize,
	pushMessageToKafka,
	pushResourceEventToKafka,
	pushUserActivityToKafka,
	pushResourceDeleteKafkaEvent,
}
