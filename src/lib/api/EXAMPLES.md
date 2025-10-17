# Climate TRACE API Client - Examples

## Real-World Usage Examples

### Example 1: Dashboard - Top Global Emitters

```typescript
import { ct } from '$lib/api';

export async function loadDashboard() {
	// Get top 10 emitters globally
	const topSources = await ct('getSources', {
		year: 2024,
		gas: 'co2e_100yr',
		limit: 10
	});

	// Get country rankings
	const rankings = await ct('getCountryRankings', {
		start: '2024',
		end: '2024'
	});

	return {
		topSources,
		topCountries: rankings.rankings.slice(0, 10),
		totalEmissions: rankings.totals.emissionsQuantity
	};
}
```

### Example 2: Sector Analysis

```typescript
import { ct } from '$lib/api';

export async function analyzeSector(sector: string) {
	// Get all subsectors for this sector
	const sectorDetails = await ct('getSectorDetails', { sector });

	// Get aggregated emissions for this sector
	const emissions = await ct('getAggregatedEmissions', {
		year: 2024,
		sectors: [sector]
	});

	// Get top sources in this sector
	const topSources = await ct('getSources', {
		year: 2024,
		sectors: [sector],
		limit: 20
	});

	return {
		sector,
		subsectors: sectorDetails.subSectors,
		totalEmissions: emissions.totals,
		topSources
	};
}
```

### Example 3: Country Deep Dive

```typescript
import { ct } from '$lib/api';

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
```

### Example 4: Time Series Analysis

```typescript
import { ct, type SourceDetails } from '$lib/api';

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
```

### Example 5: City Emissions Comparison

```typescript
import { ct } from '$lib/api';

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
```

### Example 6: Search & Filter

```typescript
import { ct } from '$lib/api';

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
```

### Example 7: Owner Analysis

```typescript
import { ct } from '$lib/api';

export async function analyzeOwner(ownerName: string) {
	// Search for owner
	const ownerResults = await ct('searchOwners', {
		name: ownerName,
		limit: 5
	});

	if (ownerResults.length === 0) {
		return null;
	}

	const owner = ownerResults[0];

	// Get sources owned by this owner
	const sources = await ct('getSources', {
		year: 2024,
		ownerIds: [owner.id],
		limit: 100
	});

	// Calculate totals by sector
	const bySector = sources.reduce(
		(acc, source) => {
			const sector = source.sector;
			if (!acc[sector]) {
				acc[sector] = { emissions: 0, count: 0 };
			}
			acc[sector].emissions += source.emissionsQuantity;
			acc[sector].count += 1;
			return acc;
		},
		{} as Record<string, { emissions: number; count: number }>
	);

	return {
		owner,
		totalSources: sources.length,
		totalEmissions: sources.reduce((sum, s) => sum + s.emissionsQuantity, 0),
		bySector: Object.entries(bySector).map(([sector, data]) => ({
			sector,
			...data
		}))
	};
}
```

### Example 8: SvelteKit Server Load Function

```typescript
// src/routes/sources/+page.server.ts
import { ct } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const year = Number(url.searchParams.get('year') || 2024);
	const sector = url.searchParams.get('sector') || undefined;

	const [sources, sectors, rankings] = await Promise.all([
		ct('getSources', {
			year,
			sectors: sector ? [sector] : undefined,
			limit: 50
		}),
		ct('getSectors', undefined),
		ct('getCountryRankings', {
			start: String(year),
			end: String(year)
		})
	]);

	return {
		sources,
		sectors,
		rankings: rankings.rankings.slice(0, 10),
		year,
		selectedSector: sector
	};
};
```

### Example 9: Error Handling Pattern

```typescript
import { ct, ApiError } from '$lib/api';

export async function safeApiCall<T>(
	endpoint: Parameters<typeof ct>[0],
	params: Parameters<typeof ct>[1]
): Promise<{ data?: T; error?: string }> {
	try {
		const data = await ct(endpoint, params);
		return { data: data as T };
	} catch (error) {
		if (error instanceof ApiError) {
			return {
				error: `API error ${error.status}: ${error.statusText}`
			};
		} else if (error instanceof Error) {
			return {
				error: error.message
			};
		} else {
			return {
				error: 'Unknown error occurred'
			};
		}
	}
}

// Usage
const result = await safeApiCall('getSources', { year: 2024 });
if (result.error) {
	console.error(result.error);
} else {
	console.log(result.data);
}
```

### Example 10: Caching Layer

```typescript
import { ct } from '$lib/api';

class CachedApiClient {
	private cache = new Map<string, { data: unknown; timestamp: number }>();
	private ttl = 5 * 60 * 1000; // 5 minutes

	async get<K extends Parameters<typeof ct>[0]>(
		endpoint: K,
		params: Parameters<typeof ct>[1]
	) {
		const key = JSON.stringify({ endpoint, params });
		const cached = this.cache.get(key);

		if (cached && Date.now() - cached.timestamp < this.ttl) {
			return cached.data;
		}

		const data = await ct(endpoint, params);
		this.cache.set(key, { data, timestamp: Date.now() });

		return data;
	}

	clear() {
		this.cache.clear();
	}
}

export const cachedApi = new CachedApiClient();

// Usage
const sources = await cachedApi.get('getSources', { year: 2024 });
```

## Tips

1. **Batch requests**: Use `Promise.all()` for independent API calls
2. **Error handling**: Always wrap API calls in try-catch blocks
3. **Type inference**: Let TypeScript infer response types automatically
4. **Caching**: Consider caching for frequently accessed data
5. **Pagination**: Use `limit` and `offset` parameters for large result sets
