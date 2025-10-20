import { query } from '$app/server';
import * as v from 'valibot';
import { ct } from '$lib/api';

export const searchOwners = query(
	v.optional(
		v.object({
			name: v.optional(v.string()),
			limit: v.optional(v.number()),
			offset: v.optional(v.number())
		})
	),
	async (params = {}) => {
		return ct('searchOwners', params);
	}
);
