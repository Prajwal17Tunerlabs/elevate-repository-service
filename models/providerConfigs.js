'use strict'

const { DataTypes } = require('sequelize')
const { sequelize } = require('@config/database')

const ProviderConfig = sequelize.define(
	'provider_configs',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		provider_type: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		max_concurrent_syncs: {
			type: DataTypes.INTEGER,
			defaultValue: 5,
		},
		max_requests_per_minute: {
			type: DataTypes.INTEGER,
			defaultValue: 100,
		},
		max_requests_per_day: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		retry_delay_seconds: {
			type: DataTypes.INTEGER,
			defaultValue: 60,
		},
		enabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
)

module.exports = ProviderConfig
