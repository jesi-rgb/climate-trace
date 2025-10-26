import { query } from '$app/server';
import * as v from 'valibot';
import { ct, ApiError } from '$lib/api';

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
		try {
			return ct('getSources', filters);
		} catch (error) {
			if (error instanceof ApiError && error.status === 404) {
				return [];
			}
			throw error;
		}
	}
);

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
		try {
			return ct('getAggregatedEmissions', filters);
		} catch (error) {
			if (error instanceof ApiError && error.status === 404) {
				return null;
			}
			throw error;
		}
	}
);

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

export const getSectors = query(async () => {
	return ct('getSectors', undefined);
});

export const getSubsectors = query(async () => {
	return ct('getSubsectors', undefined);
});
