import { query } from '$app/server';
import * as v from 'valibot';
import { ct, ApiError } from '$lib/api';

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
		try {
			return ct('searchCities', params);
		} catch (error) {
			if (error instanceof ApiError && error.status === 404) {
				return [];
			}
			throw error;
		}
	}
);
