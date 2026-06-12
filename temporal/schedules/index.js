'use strict'

const { ScheduleOverlapPolicy } = require('@temporalio/client')
const { getClient } = require('@config/temporal')

const TASK_QUEUE = process.env.TEMPORAL_TASK_QUEUE || 'elevate-repository-queue'

/**
 * Create (or skip if already exists) all Temporal schedules.
 * Call this once on service startup.
 */
const registerSchedules = async () => {
	const client = await getClient()

	await createSchedule(client, {
		scheduleId: 'sample-schedule',
		cronExpression: '0 * * * *', // every hour
		workflowType: 'sampleWorkflow',
		workflowArgs: [{ source: 'scheduled' }],
	})
}

const createSchedule = async (client, { scheduleId, cronExpression, workflowType, workflowArgs }) => {
	try {
		await client.schedule.create({
			scheduleId,
			spec: { cronExpressions: [cronExpression] },
			action: {
				type: 'startWorkflow',
				workflowType,
				taskQueue: TASK_QUEUE,
				args: workflowArgs,
			},
			policies: {
				overlap: ScheduleOverlapPolicy.SKIP,
			},
		})
		console.log(`Temporal schedule registered: ${scheduleId}`)
	} catch (err) {
		// ALREADY_EXISTS — schedule was created in a previous run, safe to ignore
		if (err.code === 6) return
		throw err
	}
}

module.exports = { registerSchedules }
