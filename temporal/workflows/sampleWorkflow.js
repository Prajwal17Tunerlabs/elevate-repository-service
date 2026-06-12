// Temporal workflows run in an isolated sandbox — only @temporalio/workflow imports are allowed here.
import { proxyActivities, log } from '@temporalio/workflow'

const { sampleActivity } = proxyActivities({
	startToCloseTimeout: '10 minutes',
	retry: {
		maximumAttempts: 3,
	},
})

export async function sampleWorkflow(params) {
	log.info('sampleWorkflow started', { params })
	const result = await sampleActivity(params)
	log.info('sampleWorkflow completed', { result })
	return result
}
