/**
 * Climate TRACE API Client
 *
 * Type-safe, validated API client for Climate TRACE v7 API
 *
 * @example
 * ```ts
 * import { ct, getTopSources } from '$lib/api';
 *
 * // Using the generic client
 * const sources = await ct('getSources', { year: 2024, limit: 10 });
 *
 * // Using convenience functions
 * const topEmitters = await getTopSources({ year: 2024, gas: 'co2e_100yr' });
 * ```
 */

// Export main API client
export {
	ct,
	apiCall,
	ApiError,
	getTopSources,
	getSourceById,
	getAggregatedEmissions,
	getCountryRankings
} from './client';

export { apiCache } from './cache';

export type { EndpointKey, InferParams, InferResponse } from './endpoints';

// Export all generated types
export * from './schemas/generated';

// Export Valibot schemas (for custom validation if needed)
export * from './schemas/core';
