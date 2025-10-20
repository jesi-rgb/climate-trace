import { query } from '$app/server';
import * as v from 'valibot';
import { ct } from '$lib/api';

export const getSectors = query(async () => {
	return ct('getSectors', undefined);
});

export const getSectorDetails = query(v.string(), async (sector) => {
	return ct('getSectorDetails', { sector });
});

export const getSectorEmissions = query(v.string(), async (sector) => {
	return ct('getAggregatedEmissions', { sectors: [sector] });
});

export const getSectorSources = query(
	v.object({
		sector: v.string(),
		limit: v.optional(v.number())
	}),
	async ({ sector, limit = 100 }) => {
		return ct('getSources', { sectors: [sector], limit });
	}
);
