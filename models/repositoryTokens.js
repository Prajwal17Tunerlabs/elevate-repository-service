'use strict'

const { DataTypes } = require('sequelize')
const { sequelize } = require('@config/database')

const RepositoryToken = sequelize.define(
	'repository_tokens',
	{
		repository_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			references: {
				model: 'repositories',
				key: 'id',
			},
		},
		encrypted_access_token: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		encrypted_refresh_token: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		token_expiry: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		provider_type: {
			type: DataTypes.STRING(50),
			allowNull: false,
		}
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
)

module.exports = RepositoryToken
