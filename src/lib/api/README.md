# Climate TRACE API Client

Type-safe, validated API client for Climate TRACE v7 API with full TypeScript support and runtime validation using Valibot.

## Features

- ✅ **Full type safety** - All endpoints, parameters, and responses are fully typed
- ✅ **Runtime validation** - Critical endpoints validate responses with Valibot
- ✅ **Autocomplete** - Full IDE autocomplete for all API endpoints
- ✅ **Error handling** - Comprehensive error handling with custom error types
- ✅ **20+ endpoints** - Complete coverage of Climate TRACE API v7
- ✅ **Zero guesswork** - No manual type assertions needed

## Quick Start

```typescript
import { ct, getTopSources } from '$lib/api';

// Option 1: Use the generic client (recommended)
const sources = await ct('getSources', {
	year: 2024,
	gas: 'co2e_100yr',
	limit: 10
});

// Option 2: Use convenience functions
const topEmitters = await getTopSources({ year: 2024 });
```

## Available Endpoints

### Sources (Fully Validated ✅)

```typescript
// Get ranked sources
await ct('getSources', {
	year: 2024,
	gas: 'co2e_100yr',
	sectors: ['power'],
	limit: 100
});

// Get source details
await ct('getSourceById', {
	id: 42244175,
	start: '2024',
	end: '2024',
	timeGranularity: 'year'
});

// Get aggregated emissions
await ct('getAggregatedEmissions', {
	year: 2024,
	gas: 'co2e_100yr',
	gadmId: 'USA'
});
```

### Rankings (Fully Validated ✅)

```typescript
// Get country rankings
await ct('getCountryRankings', {
	gas: 'co2e_100yr',
	start: '2024',
	end: '2024',
	sectors: ['power', 'transportation']
});
```

### Administrative Areas (Typed 📝)

```typescript
// Search administrative areas
await ct('searchAdmins', {
	name: 'California',
	level: 1
});

// Get admin details
await ct('getAdminById', { id: 'USA.5_1' });

// Get subdivisions
await ct('getAdminSubdivisions', { id: 'USA' });
```

### Cities (Typed 📝)

```typescript
// Search cities
await ct('searchCities', {
	name: 'San Francisco',
	country: 'USA'
});
```

### Owners (Typed 📝)

```typescript
// Search owners
await ct('searchOwners', {
	name: 'Petro',
	limit: 50
});
```

### Definitions (Typed 📝)

```typescript
// Get all sectors
await ct('getSectors', undefined);

// Get sector details
await ct('getSectorDetails', { sector: 'power' });

// Get all countries
await ct('getCountries', undefined);

// Get country details
await ct('getCountryDetails', { country: 'USA' });

// Other endpoints:
// - getContinents, getContinentDetails
// - getCountryGroups, getCountryGroupDetails
// - getGases
// - getSubsectors, getSubsectorDetails
```

## Type Safety Examples

### Autocomplete Support

```typescript
// TypeScript will show you all available endpoints
await ct('get...');
// ^ Autocomplete shows: getSources, getSourceById, etc.

// Parameters are type-checked
await ct('getSources', {
	year: 2024, // ✅ number
	gas: 'co2e_100yr', // ✅ string
	limit: '10' // ❌ Type error: Expected number
});
```

### Response Types

```typescript
// Response types are automatically inferred
const sources = await ct('getSources', { limit: 5 });
// sources: SourceSummary[]

sources[0].name; // ✅ string
sources[0].emissionsQuantity; // ✅ number
sources[0].invalidField; // ❌ Type error
```

### Validation Levels

- **✅ Fully Validated**: Critical endpoints (sources, emissions, rankings) validate both params and responses at runtime
- **📝 Typed Only**: Definition endpoints have TypeScript types but no runtime validation (faster, simpler data)

## Error Handling

```typescript
import { ct, ApiError } from '$lib/api';

try {
	const data = await ct('getSources', { year: 2024 });
} catch (error) {
	if (error instanceof ApiError) {
		console.error(`API error: ${error.status} ${error.statusText}`);
	} else {
		console.error('Network or validation error:', error);
	}
}
```

## SvelteKit Integration

Works seamlessly with SvelteKit queries:

```typescript
// src/routes/api/emissions.remote.ts
import { query } from '$app/server';
import { ct } from '$lib/api';
import * as v from 'valibot';

export const getTopSources = query(
	v.optional(
		v.object({
			year: v.optional(v.number()),
			limit: v.optional(v.number())
		})
	),
	async (params) => {
		return ct('getSources', params);
	}
);
```

## Architecture

```
src/lib/api/
├── schemas/
│   ├── generated.ts  # Auto-generated TypeScript types from OpenAPI
│   ├── core.ts       # Hand-written Valibot schemas for validation
│   └── index.ts      # Re-exports
├── endpoints.ts      # Endpoint registry with types
├── client.ts         # Generic API client with validation
├── index.ts          # Public API
└── README.md         # This file
```

## Regenerating Types

If the Climate TRACE API is updated:

```bash
node generate-types.cjs
```

This regenerates `src/lib/api/schemas/generated.ts` from the OpenAPI spec in `src/lib/types/climate-trace.ts`.

## Adding New Endpoints

1. Add TypeScript types to `schemas/generated.ts` (or regenerate)
2. (Optional) Add Valibot schema to `schemas/core.ts` for validation
3. Add endpoint definition to `endpoints.ts`
4. The client automatically supports it!

## Testing

```bash
npx tsx test-api.ts
```

Runs integration tests against the live Climate TRACE API.

## License

MIT
