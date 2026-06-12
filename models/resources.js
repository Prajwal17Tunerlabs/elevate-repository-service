'use strict'

const { DataTypes } = require('sequelize')
const { sequelize } = require('@config/database')

const Resource = sequelize.define(
	'resources',
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
		provider_file_id: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		provider_parent_id: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		is_resource_processed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		file_name: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		file_extension: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		file_size: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		folder_path: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		canonical_url: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		downloadable_url: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		checksum: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		provider_created_time: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		provider_modified_time: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		subject: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		is_public: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		processing_status: {
			type: DataTypes.STRING(50),
			defaultValue: 'DISCOVERED',
		},
		review_status: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		deleted_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		indexes: [
			{
				unique: true,
				fields: ['repository_id', 'provider_file_id'],
				name: 'unq_resource',
			},
		],
	}
)

module.exports = Resource
