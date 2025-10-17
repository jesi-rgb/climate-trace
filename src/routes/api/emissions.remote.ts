import { query } from '$app/server';
import * as v from 'valibot';
import { ct } from '$lib/api';

// 1. Top emitters - critical for dashboard
export const getTopSources = query(
	v.optional(
		v.object({
			year: v.optional(v.number()),
			gas: v.optional(v.string()),
			sectors: v.optional(v.array(v.string())),
			limit: v.optional(v.number())
		})
	),
	async (filters = {}) => {
		return ct('getSources', filters);
	}
);

// 2. Source details - for drill-down views
export const getSourceById = query(
	v.object({
		id: v.number(),
		start: v.optional(v.string()),
		end: v.optional(v.string()),
		timeGranularity: v.optional(v.picklist(['month', 'year'])),
		gas: v.optional(v.string())
	}),
	async (params) => {
		return ct('getSourceById', params);
	}
);

// 3. Aggregated emissions - for geographic/sector analysis
export const getAggregatedEmissions = query(
	v.optional(
		v.object({
			year: v.optional(v.number()),
			gas: v.optional(v.string()),
			sectors: v.optional(v.array(v.string())),
			gadmId: v.optional(v.string()),
			cityId: v.optional(v.string())
		})
	),
	async (filters = {}) => {
		return ct('getAggregatedEmissions', filters);
	}
);

// 4. Rankings - for leaderboards
export const getCountryRankings = query(
	v.optional(
		v.object({
			gas: v.optional(v.string()),
			start: v.optional(v.string()),
			end: v.optional(v.string())
		})
	),
	async (filters = {}) => {
		return ct('getCountryRankings', filters);
	}
);

// 5. Definitions - for dropdowns/filters
export const getSectors = query(async () => {
	return ct('getSectors', undefined);
});

export const getSubsectors = query(async () => {
	return ct('getSubsectors', undefined);
});
