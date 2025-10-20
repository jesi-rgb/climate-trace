import { query } from '$app/server';
import * as v from 'valibot';
import { ct } from '$lib/api';

export const getAllRankings = query(
	async (filters = {}) => {
		return ct('getCountryRankings', filters);
	}
);

export const getCountryRankings = query(
	v.object({
		country: v.string(),
		gas: v.optional(v.string()),
		start: v.optional(v.string()),
		end: v.optional(v.string()),
		sectors: v.optional(v.array(v.string())),
		subsectors: v.optional(v.array(v.string())),
		countryGroup: v.optional(v.string()),
		continent: v.optional(v.string())
	}),
	async (filters = {}) => {
		return ct('getCountryRankings', filters);
	}
);
