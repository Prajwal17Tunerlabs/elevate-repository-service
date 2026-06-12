'use strict'

module.exports = {
	// Generic
	SUCCESS: 'Success',
	FAILED: 'Failed',
	NOT_FOUND: 'Not found',
	INTERNAL_SERVER_ERROR: 'Internal server error',
	BAD_REQUEST: 'Bad request',
	UNAUTHORIZED: 'Unauthorized',
	FORBIDDEN: 'Forbidden access',

	// Authentication
	INVALID_TOKEN: 'Invalid auth token',
	TOKEN_EXPIRED: 'Auth token expired',
	MISSING_TOKEN: 'Auth token is missing',
	SESSION_EXPIRED: 'Session expired',
	INVALID_INTERNAL_TOKEN: 'Invalid internal access token',

	// User
	USER_NOT_FOUND: 'User not found',
	USER_ALREADY_EXISTS: 'User already exists',
	USER_CREATED: 'User created successfully',
	USER_UPDATED: 'User updated successfully',
	USER_DELETED: 'User deleted successfully',
	USER_FETCHED: 'User fetched successfully',
	USER_LIST_FETCHED: 'User list fetched successfully',

	// Resource
	RESOURCE_NOT_FOUND: 'Resource not found',
	RESOURCE_CREATED: 'Resource created successfully',
	RESOURCE_UPDATED: 'Resource updated successfully',
	RESOURCE_DELETED: 'Resource deleted successfully',
	RESOURCE_FETCHED: 'Resource fetched successfully',
	RESOURCE_LIST_FETCHED: 'Resource list fetched successfully',
	RESOURCE_ALREADY_EXISTS: 'Resource already exists',

	// Validation
	INVALID_ID: 'Invalid ID format',
	REQUIRED_FIELD_MISSING: 'Required field is missing',

	// Kafka
	KAFKA_COMMUNICATION_OFF: 'Kafka communication is turned off',
	MESSAGE_PUBLISHED: 'Message published to Kafka',
	MESSAGE_PUBLISH_FAILED: 'Failed to publish message to Kafka',
}
