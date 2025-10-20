import { query } from '$app/server';
import * as v from 'valibot';
import { ct, pangea } from '$lib/api';

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

export const getCountryEmissionsBySector = query(v.string(), async (countryCode) => {
	const pangeaCountry = await pangea('getCountryInfo', { code: countryCode });
	return ct('getAggregatedEmissions', { gadmId: pangeaCountry.adm0_a3 });
});

export const getCountrySources = query(
	v.object({
		countryCode: v.string(),
		limit: v.optional(v.number())
	}),
	async ({ countryCode, limit = 50 }) => {
		const pangeaCountry = await pangea('getCountryInfo', { code: countryCode });
		return ct('getSources', { gadmId: pangeaCountry.adm0_a3, limit });
	}
);
