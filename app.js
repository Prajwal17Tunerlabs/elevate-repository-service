'use strict'

// Load environment variables before anything else
require('dotenv').config({ path: './.env' })

// Register module aliases (@generics, @helpers, etc.)
require('module-alias/register')

const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

// ─── Global paths ──────────────────────────────────────────────────────────────
global.PROJECT_ROOT_DIRECTORY = __dirname
global.MODULES_BASE_PATH = path.join(__dirname, 'module')

// ─── Validate required environment variables ───────────────────────────────────
const envCheck = require('./envVariable')()
if (!envCheck.success) {
	process.exit(1)
}

// ─── Global constants and utilities ───────────────────────────────────────────
global.HTTP_STATUS_CODE = require('@generics/http-status-codes')
global.CONSTANTS = {
	common: require('@constants/common'),
	apiResponses: require('@constants/api-responses'),
}
global.UTILS = require('@helpers/utils')

// ─── Database connection ───────────────────────────────────────────────────────
require('@config/database').connect()

// ─── Kafka (optional) ─────────────────────────────────────────────────────────
if (process.env.KAFKA_COMMUNICATIONS_ON === 'ON') {
	require('@config/kafka').initialize()
}

// ─── Temporal schedules (optional) ────────────────────────────────────────────
if (process.env.TEMPORAL_ON === 'ON') {
	require('@temporal/schedules').registerSchedules().catch(console.error)
}

// ─── Express app ──────────────────────────────────────────────────────────────
const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(fileUpload())
app.use(express.static('public'))

// Request logger
app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
	next()
})

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
	res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

// ─── API documentation ────────────────────────────────────────────────────────
if (process.env.API_DOC_URL) {
	app.get(process.env.API_DOC_URL, (req, res) => {
		res.sendFile(path.join(__dirname, 'api-doc', 'index.html'))
	})
}

// ─── Application routes ───────────────────────────────────────────────────────
app.use('/', require('@routes'))

// ─── Ensure temp directory exists ─────────────────────────────────────────────
if (!fs.existsSync('./tmp')) {
	fs.mkdirSync('./tmp')
}

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.APPLICATION_PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} [${process.env.APPLICATION_ENV || 'development'}]`)
})

module.exports = app
