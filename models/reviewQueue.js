'use strict'

const { DataTypes } = require('sequelize')
const { sequelize } = require('@config/database')

const ReviewQueue = sequelize.define(
	'review_queue',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		resource_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'resources',
				key: 'id',
			},
		},
		review_type: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		reason: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		status: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		assigned_to: {
			type: DataTypes.UUID,
			allowNull: true,
		},
		reviewed_by: {
			type: DataTypes.UUID,
			allowNull: true,
		},
		review_notes: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		completed_at: {
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

module.exports = ReviewQueue
