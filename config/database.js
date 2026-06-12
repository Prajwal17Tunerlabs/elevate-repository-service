'use strict'

const { Sequelize } = require('sequelize')

const DB_NAME = process.env.POSTGRES_DB || 'elevate_repository_service'
const DB_USER = process.env.POSTGRES_USER || 'postgres'
const DB_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres'
const DB_HOST = process.env.POSTGRES_HOST || 'localhost'
const DB_PORT = process.env.POSTGRES_PORT || 5432

const connectionConfig = {
	host: DB_HOST,
	port: DB_PORT,
	dialect: 'postgres',
	logging: false,
}

// Main sequelize instance (used by all models)
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, connectionConfig)

const createDatabaseIfNotExists = async () => {
	// Connect to the default 'postgres' database to run CREATE DATABASE
	const adminSequelize = new Sequelize('postgres', DB_USER, DB_PASSWORD, connectionConfig)
	try {
		await adminSequelize.query(`CREATE DATABASE "${DB_NAME}";`)
		console.log(`Database "${DB_NAME}" created`)
	} catch (err) {
		// 42P04 = duplicate_database — already exists, safe to ignore
		if (err.original?.code !== '42P04') throw err
	} finally {
		await adminSequelize.close()
	}
}

const connect = async () => {
	await createDatabaseIfNotExists()
	await sequelize.authenticate()
	console.log(`PostgreSQL connected to "${DB_NAME}"`)

	require('../models')
	await sequelize.sync({ alter: true })
	console.log('PostgreSQL models synced')
}

module.exports = { sequelize, connect }
