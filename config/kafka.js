'use strict'

const kafka = require('kafka-node')
const producers = require('@generics/kafka/producers')

/**
 * Topic-to-consumer mapping.
 * Add a new entry here when adding a new consumer.
 */
const CONSUMERS = {
	[process.env.KAFKA_TOPIC_SAMPLE || 'sample-topic']: require('@kafkaConsumers/sampleConsumer'),
}

/**
 * Initialize Kafka producer and all consumers.
 */
const initialize = () => {
	// Initialize producer
	producers.initialize()

	// Initialize consumers
	const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_URL })
	const consumer = new kafka.Consumer(
		client,
		Object.keys(CONSUMERS).map((topic) => ({ topic, partition: 0 })),
		{ autoCommit: true, groupId: process.env.KAFKA_GROUP_ID || 'elevate-repository' }
	)

	consumer.on('message', async (message) => {
		const handler = CONSUMERS[message.topic]
		if (!handler) return

		try {
			await handler.messageReceived(message)
		} catch (error) {
			await handler.errorTriggered(error)
		}
	})

	consumer.on('error', (err) => {
		console.error('Kafka consumer error:', err)
	})

	console.log('Kafka consumers initialized for topics:', Object.keys(CONSUMERS).join(', '))
}

module.exports = { initialize }
