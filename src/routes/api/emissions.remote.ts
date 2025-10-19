import { query } from '$app/server';
import * as v from 'valibot';
import { ct, pangea } from '$lib/api';

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
		return ct('getAggregatedEmissions', filters);
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

export const getCountryData = query(v.string(), async (countryCode) => {
	const rankingsData = await ct('getCountryRankings', undefined);

	const countryRanking = rankingsData.rankings.find((r) => r.country === countryCode);
	if (!countryRanking) {
		throw new Error('Country not found');
	}

	const pangeaCountry = await pangea('getCountryInfo', { code: countryCode });

	const totalEmissions = countryRanking.emissionsQuantity;
	const emissionsPerCapita = pangeaCountry.pop_est > 0 ? totalEmissions / pangeaCountry.pop_est : 0;

	return {
		name: pangeaCountry.name_long,
		code: pangeaCountry.adm0_a3,
		population: pangeaCountry.pop_est,
		region: pangeaCountry.region_un,
		subregion: pangeaCountry.subregion,
		totalEmissions,
		emissionsPerCapita
	};
});
