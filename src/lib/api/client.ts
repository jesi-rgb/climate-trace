import * as v from 'valibot';
import {
	endpoints,
	type EndpointKey,
	type InferParams,
	type InferResponse,
	pangeaEndpoints,
	type PangeaEndpointKey,
	type InferPangeaParams,
	type InferPangeaResponse
} from './endpoints';
import { apiCache } from './cache';

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
 * Includes automatic caching for static/reference data
 */
export async function ct<K extends EndpointKey>(
	key: K,
	params?: InferParams<K>
): Promise<InferResponse<K>> {
	const cached = apiCache.get<InferResponse<K>>(key, params);
	if (cached !== null) {
		return cached;
	}

	const endpoint = endpoints[key];

	if (endpoint.paramsSchema && params !== undefined) {
		try {
			v.parse(endpoint.paramsSchema, params);
		} catch (error) {
			throw new Error(`Invalid parameters for ${key}: ${error}`);
		}
	}

	let url = `${BASE_URL}${endpoint.path}`;
	const queryParams = new URLSearchParams();

	if (params) {
		const paramsObj = params as Record<string, unknown>;

		Object.entries(paramsObj).forEach(([paramKey, value]) => {
			if (value === undefined) return;

			if (url.includes(`:${paramKey}`)) {
				url = url.replace(`:${paramKey}`, String(value));
			} else {
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

	let response: Response;
	try {
		response = await fetch(fullUrl);
	} catch (error) {
		throw new Error(`Network error calling ${key}: ${error}`);
	}

	if (!response.ok) {
		const errorText = await response.text().catch(() => 'Unknown error');
		throw new ApiError(
			`API request failed: ${response.status} ${response.statusText} - ${errorText}`,
			response.status,
			response.statusText
		);
	}

	let data: unknown;
	try {
		data = await response.json();
	} catch (error) {
		throw new Error(`Failed to parse JSON response from ${key}: ${error}`);
	}

	if (endpoint.responseSchema) {
		try {
			data = v.parse(endpoint.responseSchema, data);
		} catch (error) {
			console.error(`Response validation failed for ${key}:`, error);
			throw new Error(`Invalid response from ${key}: ${error}`);
		}
	}

	const result = data as InferResponse<K>;
	apiCache.set(key, params, result);

	return result;
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

export async function pangea<K extends PangeaEndpointKey>(
	key: K,
	params?: InferPangeaParams<K>
): Promise<InferPangeaResponse<K>> {
	const cached = apiCache.get<InferPangeaResponse<K>>(key, params);
	if (cached !== null) {
		return cached;
	}

	const endpoint = pangeaEndpoints[key];

	let url = endpoint.path;

	if (params) {
		const paramsObj = params as Record<string, unknown>;
		Object.entries(paramsObj).forEach(([paramKey, value]) => {
			if (value !== undefined && url.includes(`:${paramKey}`)) {
				url = url.replace(`:${paramKey}`, String(value));
			}
		});
	}

	let response: Response;
	try {
		response = await fetch(url);
	} catch (error) {
		throw new Error(`Network error calling ${key}: ${error}`);
	}

	if (!response.ok) {
		const errorText = await response.text().catch(() => 'Unknown error');
		throw new ApiError(
			`API request failed: ${response.status} ${response.statusText} - ${errorText}`,
			response.status,
			response.statusText
		);
	}

	let data: unknown;
	try {
		data = await response.json();
	} catch (error) {
		throw new Error(`Failed to parse JSON response from ${key}: ${error}`);
	}

	const result = data as InferPangeaResponse<K>;
	apiCache.set(key, params, result);

	return result;
}

export const apiCall = ct;
