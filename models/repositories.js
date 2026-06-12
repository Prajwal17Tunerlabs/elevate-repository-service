'use strict'

const { DataTypes } = require('sequelize')
const { sequelize } = require('@config/database')

const Repository = sequelize.define(
	'repositories',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		org_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		created_by: {
			type: DataTypes.UUID,
			allowNull: true,
		},
		repository_name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		provider_type: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		root_link: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(50),
			defaultValue: 'ACTIVE',
		},
		sync_enabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		last_sync_cursor: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		last_sync_time: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		last_successful_sync: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		last_failed_sync: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		last_error_message: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		total_resources: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
		},
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
)

module.exports = Repository
