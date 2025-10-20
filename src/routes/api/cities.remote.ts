import { query } from '$app/server';
import * as v from 'valibot';
import { ct } from '$lib/api';

export const searchCities = query(
	v.optional(
		v.object({
			name: v.optional(v.string()),
			country: v.optional(v.string()),
			bbox: v.optional(v.string()),
			limit: v.optional(v.number()),
			offset: v.optional(v.number())
		})
	),
	async (params = {}) => {
		return ct('searchCities', params);
	}
);
