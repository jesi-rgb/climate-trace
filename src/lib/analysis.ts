import { ct } from "./api";


export async function analyzeCountry(countryCode: string) {
	// Get country details
	const country = await ct('getCountryDetails', { country: countryCode });

	// Get all administrative divisions (states/provinces)
	const states = await ct('searchAdmins', {
		level: 1
		// Note: API doesn't support filtering by country in search yet
	});

	// Get emissions by sector for this country
	const emissions = await ct('getAggregatedEmissions', {
		year: 2024,
		gadmId: countryCode
	});

	// Get top emitting sources in this country
	const sources = await ct('getSources', {
		year: 2024,
		limit: 50
	});

	const countrySources = sources.filter((s) => s.country === countryCode);

	return {
		country,
		states,
		emissionsBySector: emissions.sectors.summaries,
		emissionsBySubsector: emissions.subsectors.summaries,
		topSources: countrySources.slice(0, 10)
	};
}


export async function getEmissionsTrend(sourceId: number) {
	const source = await ct('getSourceById', {
		id: sourceId,
		start: '2021',
		end: '2024',
		timeGranularity: 'year'
	});

	// Extract time series data
	const timeSeries = source.emissions.map((e) => ({
		year: e.year,
		emissions: e.emissionsQuantity,
		gas: e.gas
	}));

	// Calculate year-over-year change
	const changes = timeSeries.slice(1).map((current, i) => {
		const previous = timeSeries[i];
		const change = ((current.emissions - previous.emissions) / previous.emissions) * 100;
		return {
			year: current.year,
			change: change.toFixed(2) + '%'
		};
	});

	return {
		source: {
			id: source.id,
			name: source.name,
			sector: source.sector
		},
		timeSeries,
		changes,
		totalEmissions: source.totals.emissionsQuantity
	};
}


export async function compareCities(cityNames: string[]) {
	// Find cities
	const citySearches = await Promise.all(
		cityNames.map((name) => ct('searchCities', { name, limit: 1 }))
	);

	const cities = citySearches.map((results) => results[0]).filter(Boolean);

	// Get emissions for each city
	const emissions = await Promise.all(
		cities.map((city) =>
			ct('getAggregatedEmissions', {
				year: 2024,
				cityId: city.id
			})
		)
	);

	return cities.map((city, i) => ({
		city: city.name,
		country: city.country,
		totalEmissions: emissions[i].totals.summaries.reduce((sum, s) => sum + s.emissionsQuantity, 0),
		bySector: emissions[i].sectors.summaries
	}));
}


export async function searchEmitters(params: {
	query?: string;
	sector?: string;
	country?: string;
	minEmissions?: number;
}) {
	// Get all available sectors
	const sectors = await ct('getSectors', undefined);

	// Get sources with filters
	const sources = await ct('getSources', {
		year: 2024,
		sectors: params.sector ? [params.sector] : undefined,
		limit: 100
	});

	// Filter by country and emissions if needed
	let filtered = sources;

	if (params.country) {
		filtered = filtered.filter((s) => s.country === params.country);
	}

	if (params.minEmissions) {
		filtered = filtered.filter((s) => s.emissionsQuantity >= params.minEmissions);
	}

	if (params.query) {
		const query = params.query.toLowerCase();
		filtered = filtered.filter((s) => s.name.toLowerCase().includes(query));
	}

	return {
		results: filtered,
		count: filtered.length,
		sectors
	};
}
