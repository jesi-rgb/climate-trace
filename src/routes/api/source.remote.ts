import { query } from '$app/server';
import * as v from 'valibot';
import { ct } from '$lib/api';

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

export const getTopSources = query(
	v.optional(
		v.object({
			year: v.optional(v.number()),
			gas: v.optional(v.string()),
			sectors: v.optional(v.array(v.string())),
			subsectors: v.optional(v.array(v.string())),
			limit: v.optional(v.number()),
			offset: v.optional(v.number())
		})
	),
	async (filters = {}) => {
		return ct('getSources', filters);
	}
);
