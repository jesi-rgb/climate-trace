import { query } from '$app/server';
import * as v from 'valibot';
import { ct } from '$lib/api';

export const getCountryData = query(v.string(), async (countryCode) => {
	const rankingsData = await ct('getCountryRankings', undefined);

	const countryRanking = rankingsData.rankings.find((r) => r.country === countryCode);
	if (!countryRanking) {
		throw new Error('Country not found');
	}

	const totalEmissions = countryRanking.emissionsQuantity;
	const emissionsPerCapita = countryRanking.emissionsPerCapita;
	const population = emissionsPerCapita > 0 ? Math.round(totalEmissions / emissionsPerCapita) : 0;

	return {
		name: countryRanking.name,
		code: countryRanking.country,
		population,
		region: '',
		subregion: '',
		totalEmissions,
		emissionsPerCapita
	};
});

export const getCountryEmissionsBySector = query(v.string(), async (countryCode) => {
	return ct('getAggregatedEmissions', { gadmId: countryCode });
});

export const getCountrySources = query(
	v.object({
		countryCode: v.string(),
		limit: v.optional(v.number())
	}),
	async ({ countryCode, limit = 50 }) => {
		return ct('getSources', { gadmId: countryCode, limit });
	}
);
