'use strict'

let enviromentVariables = {
	APPLICATION_PORT: {
		message: 'Please specify the port value for e.g. 3000',
		optional: false,
	},
	APPLICATION_ENV: {
		message: 'Please specify the value for e.g. local/development/qa/production',
		optional: false,
		default: 'development',
	},
	APP_BASE_URL: {
		message: 'Please specify the base URL for e.g. /repository-service',
		optional: true,
		default: '/repository-service',
	},

	// PostgreSQL
	POSTGRES_HOST: {
		message: 'Please specify the postgres host for e.g. localhost',
		optional: true,
		default: 'localhost',
	},
	POSTGRES_PORT: {
		message: 'Please specify the postgres port for e.g. 5432',
		optional: true,
		default: '5432',
	},
	POSTGRES_DB: {
		message: 'Please specify the postgres database name for e.g. elevate_repository_service',
		optional: false,
	},
	POSTGRES_USER: {
		message: 'Please specify the postgres user for e.g. postgres',
		optional: false,
	},
	POSTGRES_PASSWORD: {
		message: 'Please specify the postgres password',
		optional: false,
	},

	// Temporal
	TEMPORAL_ON: {
		message: 'Enable/Disable Temporal workflows. Valid values - ON, OFF',
		optional: true,
		default: 'OFF',
		possibleValues: ['ON', 'OFF'],
	},
	TEMPORAL_ADDRESS: {
		message: 'Please specify the Temporal server address for e.g. localhost:7233',
		optional: true,
		default: 'localhost:7233',
		requiredIf: {
			key: 'TEMPORAL_ON',
			operator: 'EQUALS',
			value: 'ON',
		},
	},
	TEMPORAL_NAMESPACE: {
		message: 'Please specify the Temporal namespace for e.g. default',
		optional: true,
		default: 'default',
		requiredIf: {
			key: 'TEMPORAL_ON',
			operator: 'EQUALS',
			value: 'ON',
		},
	},
	TEMPORAL_TASK_QUEUE: {
		message: 'Please specify the Temporal task queue name',
		optional: true,
		default: 'elevate-repository-queue',
		requiredIf: {
			key: 'TEMPORAL_ON',
			operator: 'EQUALS',
			value: 'ON',
		},
	},

	// Kafka
	KAFKA_COMMUNICATIONS_ON: {
		message: 'Enable/Disable Kafka communications. Valid values - ON, OFF',
		optional: true,
		default: 'OFF',
		possibleValues: ['ON', 'OFF'],
	},
	KAFKA_URL: {
		message: 'Please specify the Kafka broker URL for e.g. localhost:9092',
		optional: true,
		requiredIf: {
			key: 'KAFKA_COMMUNICATIONS_ON',
			operator: 'EQUALS',
			value: 'ON',
		},
	},
	KAFKA_GROUP_ID: {
		message: 'Please specify the Kafka consumer group ID',
		optional: true,
		default: 'elevate-repository',
		requiredIf: {
			key: 'KAFKA_COMMUNICATIONS_ON',
			operator: 'EQUALS',
			value: 'ON',
		},
	},
	KAFKA_TOPIC_SAMPLE: {
		message: 'Please specify the sample Kafka topic name',
		optional: true,
		default: 'sample-topic',
	},

	// Auth
	INTERNAL_ACCESS_TOKEN: {
		message: 'Please specify the internal access token',
		optional: false,
	},
	ENCRYPTION_SECRET: {
		message: 'Please specify the secret key used for AES-256 token encryption/decryption',
		optional: false,
	},

	// Google Drive OAuth
	GOOGLE_DRIVE_CLIENT_ID: {
		message: 'Please specify the Google Drive OAuth client ID',
		optional: true,
	},
	GOOGLE_DRIVE_CLIENT_SECRET: {
		message: 'Please specify the Google Drive OAuth client secret',
		optional: true,
	},
	GOOGLE_DRIVE_TOKEN_URL: {
		message: 'Please specify the Google Drive OAuth token endpoint URL',
		optional: true,
		default: 'https://oauth2.googleapis.com/token',
	},

	// OneDrive OAuth
	ONE_DRIVE_TENANT_ID: {
		message: 'Please specify the Microsoft tenant ID for OneDrive OAuth',
		optional: true,
	},
	ONE_DRIVE_CLIENT_ID: {
		message: 'Please specify the OneDrive OAuth client ID',
		optional: true,
	},
	ONE_DRIVE_CLIENT_SECRET: {
		message: 'Please specify the OneDrive OAuth client secret',
		optional: true,
	},
	ONE_DRIVE_TOKEN_URL: {
		message: 'Please specify the OneDrive OAuth token endpoint URL (include tenant ID in the path)',
		optional: true,
	},

	TIMEZONE_OFFSET: {
		message: 'Please specify the timezone offset for e.g. +05:30',
		optional: true,
		default: '+05:30',
	},
}

let success = true

module.exports = function () {
	const tableData = {}
	let validRequiredIfOperators = ['EQUALS', 'NOT_EQUALS']

	Object.keys(enviromentVariables).forEach((eachEnvironmentVariable) => {
		let keyCheckPass = true
		const varConfig = enviromentVariables[eachEnvironmentVariable]

		// Resolve requiredIf — elevate optional → required based on another var's value
		if (
			varConfig.optional === true &&
			varConfig.requiredIf &&
			varConfig.requiredIf.key &&
			varConfig.requiredIf.operator &&
			validRequiredIfOperators.includes(varConfig.requiredIf.operator) &&
			varConfig.requiredIf.value
		) {
			switch (varConfig.requiredIf.operator) {
				case 'EQUALS':
					if (process.env[varConfig.requiredIf.key] === varConfig.requiredIf.value) {
						varConfig.optional = false
					}
					break
				case 'NOT_EQUALS':
					if (process.env[varConfig.requiredIf.key] !== varConfig.requiredIf.value) {
						varConfig.optional = false
					}
					break
			}
		}

		if (varConfig.optional === false) {
			if (!process.env[eachEnvironmentVariable] || process.env[eachEnvironmentVariable] === '') {
				if (varConfig.default !== undefined && varConfig.default !== '') {
					process.env[eachEnvironmentVariable] = String(varConfig.default)
					keyCheckPass = true
				} else {
					success = false
					keyCheckPass = false
				}
			} else if (
				varConfig.possibleValues &&
				Array.isArray(varConfig.possibleValues) &&
				!varConfig.possibleValues.includes(process.env[eachEnvironmentVariable])
			) {
				success = false
				keyCheckPass = false
				varConfig.message += ` Valid values - ${varConfig.possibleValues.join(', ')}`
			}
		}

		// Apply default for optional vars that are missing
		if (
			(!process.env[eachEnvironmentVariable] || process.env[eachEnvironmentVariable].trim() === '') &&
			varConfig.optional === true &&
			varConfig.default !== undefined
		) {
			process.env[eachEnvironmentVariable] = String(varConfig.default)
			keyCheckPass = true
		}

		tableData[eachEnvironmentVariable] = keyCheckPass ? 'PASSED' : varConfig.message
	})

	console.info('\n=== Environment Variable Check ===')
	console.table(tableData)

	return { success }
}
