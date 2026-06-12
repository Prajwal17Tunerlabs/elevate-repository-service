'use strict'

const { DataTypes } = require('sequelize')
const { sequelize } = require('@config/database')

const RepositorySync = sequelize.define(
	'repository_syncs',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		repository_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'repositories',
				key: 'id',
			},
		},
		sync_type: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		previous_cursor: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		next_cursor: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		total_files_scanned: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		files_added: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		files_updated: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		files_deleted: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		total_failures: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		duration_ms: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		error_message: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		start_time: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		end_time: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: false,
	}
)

module.exports = RepositorySync
