import type * as v from 'valibot';
import type {
	SourceSummary,
	SourceDetails,
	AggregatedEmissionsResponse,
	CountryEmissionsRankingsResponse,
	AdministrativeArea,
	CitiesSearchResult,
	Country,
	SubSector,
	OwnersSearchResult
} from './schemas/generated';
import {
	SourcesParamsSchema,
	SourcesResponseSchema,
	SourceByIdParamsSchema,
	SourceDetailsSchema,
	AggregatedEmissionsParamsSchema,
	AggregatedEmissionsResponseSchema,
	CountryRankingsParamsSchema,
	CountryEmissionsRankingsResponseSchema
} from './schemas/core';


export const endpoints = {
	// -------------------------------------------------------------------------
	// SOURCES - High priority, fully validated
	// -------------------------------------------------------------------------
	getSources: {
		path: '/v7/sources',
		method: 'GET',
		paramsSchema: SourcesParamsSchema,
		responseSchema: SourcesResponseSchema,
		_types: {} as {
			params:
			| {
				year?: number;
				gas?: string;
				sectors?: string[];
				subsectors?: string[];
				gadmId?: string;
				cityId?: string;
				countryGroup?: string;
				continent?: string;
				ownerIds?: string[];
				limit?: number;
				offset?: number;
			}
			| undefined;
			response: SourceSummary[] | null;
		}
	} as const,

	getSourceById: {
		path: '/v7/sources/:id',
		method: 'GET',
		paramsSchema: SourceByIdParamsSchema,
		responseSchema: SourceDetailsSchema,
		_types: {} as {
			params: {
				id: number;
				start?: string;
				end?: string;
				timeGranularity?: 'month' | 'year';
				gas?: string;
			};
			response: SourceDetails;
		}
	} as const,

	getAggregatedEmissions: {
		path: '/v7/sources/emissions',
		method: 'GET',
		paramsSchema: AggregatedEmissionsParamsSchema,
		responseSchema: AggregatedEmissionsResponseSchema,
		_types: {} as {
			params:
			| {
				year?: number;
				gas?: string;
				sectors?: string[];
				subsectors?: string[];
				gadmId?: string;
				cityId?: string;
				countryGroup?: string;
				continent?: string;
				ownerIds?: string[];
			}
			| undefined;
			response: AggregatedEmissionsResponse;
		}
	} as const,

	// -------------------------------------------------------------------------
	// RANKINGS - High priority, fully validated
	// -------------------------------------------------------------------------
	getCountryRankings: {
		path: '/v7/rankings/countries',
		method: 'GET',
		paramsSchema: CountryRankingsParamsSchema,
		responseSchema: CountryEmissionsRankingsResponseSchema,
		_types: {} as {
			params:
			| {
				gas?: string;
				start?: string;
				end?: string;
				sectors?: string[];
				subsectors?: string[];
				countryGroup?: string;
				continent?: string;
			}
			| undefined;
			response: CountryEmissionsRankingsResponse;
		}
	} as const,

	// -------------------------------------------------------------------------
	// ADMINISTRATIVE AREAS - Medium priority, validated
	// -------------------------------------------------------------------------
	searchAdmins: {
		path: '/v7/admins',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params:
			| {
				name?: string;
				bbox?: string;
				level?: 0 | 1 | 2;
				limit?: number;
				offset?: number;
			}
			| undefined;
			response: AdministrativeArea[];
		}
	} as const,

	getAdminById: {
		path: '/v7/admins/:id',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: { id: string };
			response: AdministrativeArea;
		}
	} as const,

	getAdminSubdivisions: {
		path: '/v7/admins/:id/subdivisions',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: { id: string };
			response: AdministrativeArea[];
		}
	} as const,

	// -------------------------------------------------------------------------
	// CITIES - Medium priority, validated
	// -------------------------------------------------------------------------
	searchCities: {
		path: '/v7/cities',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params:
			| {
				name?: string;
				country?: string;
				bbox?: string;
				limit?: number;
				offset?: number;
			}
			| undefined;
			response: CitiesSearchResult[];
		}
	} as const,

	// -------------------------------------------------------------------------
	// OWNERS - Medium priority, validated
	// -------------------------------------------------------------------------
	searchOwners: {
		path: '/v7/owners',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params:
			| {
				name?: string;
				limit?: number;
				offset?: number;
			}
			| undefined;
			response: OwnersSearchResult[];
		}
	} as const,

	// -------------------------------------------------------------------------
	// DEFINITIONS - Low priority, unvalidated (simple strings/objects)
	// -------------------------------------------------------------------------
	getContinents: {
		path: '/v7/definitions/continents',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: undefined;
			response: string[];
		}
	} as const,

	getContinentDetails: {
		path: '/v7/definitions/continents/:continent',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: { continent: string };
			response: { name: string; countries: string[] };
		}
	} as const,

	getCountries: {
		path: '/v7/definitions/countries',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: undefined;
			response: Country[];
		}
	} as const,

	getCountryDetails: {
		path: '/v7/definitions/countries/:country',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: { country: string };
			response: Country;
		}
	} as const,

	getCountryGroups: {
		path: '/v7/definitions/countrygroups',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: undefined;
			response: { countrygroup: string[] };
		}
	} as const,

	getCountryGroupDetails: {
		path: '/v7/definitions/countrygroups/:group',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: { group: string };
			response: string[];
		}
	} as const,

	getGases: {
		path: '/v7/definitions/gases',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: undefined;
			response: string[];
		}
	} as const,

	getSectors: {
		path: '/v7/definitions/sectors',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: undefined;
			response: string[];
		}
	} as const,

	getSectorDetails: {
		path: '/v7/definitions/sectors/:sector',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: { sector: string };
			response: { name: string; subSectors: string[] };
		}
	} as const,

	getSubsectors: {
		path: '/v7/definitions/subsectors',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: undefined;
			response: string[];
		}
	} as const,

	getSubsectorDetails: {
		path: '/v7/definitions/subsectors/:subsector',
		method: 'GET',
		paramsSchema: undefined,
		responseSchema: undefined,
		_types: {} as {
			params: { subsector: string };
			response: SubSector;
		}
	} as const
} as const;

export type EndpointKey = keyof typeof endpoints;
export type InferParams<K extends EndpointKey> = (typeof endpoints)[K]['_types']['params'];
export type InferResponse<K extends EndpointKey> = (typeof endpoints)[K]['_types']['response'];
