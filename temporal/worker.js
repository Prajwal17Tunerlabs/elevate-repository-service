'use strict'

require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
require('module-alias/register')

const { Worker } = require('@temporalio/worker')
const path = require('path')
const activities = require('./activities')

const TASK_QUEUE = process.env.TEMPORAL_TASK_QUEUE || 'elevate-repository-queue'

async function run() {
	const worker = await Worker.create({
		workflowsPath: require.resolve('./workflows/sampleWorkflow'),
		activities,
		taskQueue: TASK_QUEUE,
	})

	console.log(`Temporal worker started on task queue: ${TASK_QUEUE}`)
	await worker.run()
}

run().catch((err) => {
	console.error('Temporal worker failed:', err)
	process.exit(1)
})
