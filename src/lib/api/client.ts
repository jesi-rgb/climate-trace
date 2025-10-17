import * as v from 'valibot';
import { endpoints, type EndpointKey, type InferParams, type InferResponse } from './endpoints';

const BASE_URL = 'https://api.climatetrace.org';

export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public statusText: string
	) {
		super(message);
		this.name = 'ApiError';
	}
}

/**
 * Type-safe API client for Climate TRACE API
 * Automatically validates params and responses based on endpoint definition
 */
export async function ct<K extends EndpointKey>(
	key: K,
	params?: InferParams<K>
): Promise<InferResponse<K>> {
	const endpoint = endpoints[key];

	// 1. Validate input params (if schema exists)
	if (endpoint.paramsSchema && params !== undefined) {
		try {
			v.parse(endpoint.paramsSchema, params);
		} catch (error) {
			throw new Error(`Invalid parameters for ${key}: ${error}`);
		}
	}

	// 2. Build URL with path params and query params
	let url = `${BASE_URL}${endpoint.path}`;
	const queryParams = new URLSearchParams();

	if (params) {
		const paramsObj = params as Record<string, unknown>;

		Object.entries(paramsObj).forEach(([paramKey, value]) => {
			if (value === undefined) return;

			// Handle path parameters (e.g., :id, :sector)
			if (url.includes(`:${paramKey}`)) {
				url = url.replace(`:${paramKey}`, String(value));
			}
			// Handle query parameters
			else {
				if (Array.isArray(value)) {
					queryParams.set(paramKey, value.join(','));
				} else {
					queryParams.set(paramKey, String(value));
				}
			}
		});
	}

	const queryString = queryParams.toString();
	const fullUrl = queryString ? `${url}?${queryString}` : url;

	// 3. Fetch from API
	let response: Response;
	try {
		response = await fetch(fullUrl);
	} catch (error) {
		throw new Error(`Network error calling ${key}: ${error}`);
	}

	// 4. Handle HTTP errors
	if (!response.ok) {
		const errorText = await response.text().catch(() => 'Unknown error');
		throw new ApiError(
			`API request failed: ${response.status} ${response.statusText} - ${errorText}`,
			response.status,
			response.statusText
		);
	}

	// 5. Parse JSON response
	let data: unknown;
	try {
		data = await response.json();
	} catch (error) {
		throw new Error(`Failed to parse JSON response from ${key}: ${error}`);
	}

	// 6. Validate response (if schema exists)
	if (endpoint.responseSchema) {
		try {
			return v.parse(endpoint.responseSchema, data) as InferResponse<K>;
		} catch (error) {
			console.error(`Response validation failed for ${key}:`, error);
			throw new Error(`Invalid response from ${key}: ${error}`);
		}
	}

	// 7. Return unvalidated response for endpoints without schemas
	return data as InferResponse<K>;
}

/**
 * Convenience wrapper for common sources query
 */
export async function getTopSources(params?: InferParams<'getSources'>) {
	return ct('getSources', params);
}

/**
 * Convenience wrapper for source details
 */
export async function getSourceById(id: number, params?: Omit<InferParams<'getSourceById'>, 'id'>) {
	return ct('getSourceById', { ...params, id });
}

/**
 * Convenience wrapper for aggregated emissions
 */
export async function getAggregatedEmissions(params?: InferParams<'getAggregatedEmissions'>) {
	return ct('getAggregatedEmissions', params);
}

/**
 * Convenience wrapper for country rankings
 */
export async function getCountryRankings(params?: InferParams<'getCountryRankings'>) {
	return ct('getCountryRankings', params);
}

// Legacy alias for backwards compatibility
export const apiCall = ct;
