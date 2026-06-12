'use strict'

const { DataTypes } = require('sequelize')
const { sequelize } = require('@config/database')

const ResourceMetadata = sequelize.define(
	'resource_metadata',
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
		metadata_key: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		metadata_value: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		confidence_score: {
			type: DataTypes.DECIMAL(5, 2),
			allowNull: true,
		},
		source: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: false,
	}
)

module.exports = ResourceMetadata
