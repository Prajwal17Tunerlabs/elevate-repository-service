'use strict'

module.exports = {
	// HTTP Methods
	GET: 'GET',
	POST: 'POST',
	PATCH: 'PATCH',
	PUT: 'PUT',
	DELETE: 'DELETE',

	// Auth methods
	NATIVE: 'NATIVE',
	KEYCLOAK: 'KEYCLOAK',

	// Roles
	SUPER_ADMIN: 'SUPER_ADMIN',
	TENANT_ADMIN: 'TENANT_ADMIN',
	ORG_ADMIN: 'ORG_ADMIN',
	USER: 'USER',

	// Status values
	ACTIVE: 'ACTIVE',
	INACTIVE: 'INACTIVE',
	DELETED: 'DELETED',
	DRAFT: 'DRAFT',
	PUBLISHED: 'PUBLISHED',

	// Project / Task statuses
	NOT_STARTED: 'NOT_STARTED',
	IN_PROGRESS: 'IN_PROGRESS',
	COMPLETED: 'COMPLETED',
	SUBMITTED: 'SUBMITTED',

	// Scope
	ALL_SCOPE_VALUE: 'ALL',
	MANDATORY_SCOPE_FIELD: 'mandatoryScopeFields',
	OPTIONAL_SCOPE_FIELD: 'optionalScopeFields',

	// Visibility
	PUBLIC: 'PUBLIC',
	PRIVATE: 'PRIVATE',

	// Pagination defaults
	DEFAULT_PAGE_NO: 1,
	DEFAULT_PAGE_SIZE: 100,
	MAX_PAGE_SIZE: 100,

	// Telemetry
	TELEMETRY_VERSION: '3.0',

	// Resource types
	RESOURCE_TYPE_PROJECT: 'PROJECT',
	RESOURCE_TYPE_TEMPLATE: 'TEMPLATE',

	// Cloud providers
	AWS: 'AWS',
	GCP: 'GCP',
	AZURE: 'AZURE',
	OCI: 'OCI',

	// App identifiers
	APP_ELEVATE: 'elevate',
}
