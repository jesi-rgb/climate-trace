// src/lib/types/emissions.ts

export interface EmissionSource {
	id: number;
	name: string;
	sector: string;
	subsector: string;
	country: string;
	emissionsQuantity: number;
	gas: string;
	year: number;
	assetType: string;
	sourceType: string;
}

export interface SourceDetails extends EmissionSource {
	centroid: {
		latitude: number;
		longitude: number;
		srid: number;
	};
	emissions: EmissionTimeSeries[];
	owners: Owner[];
	confidence: ConfidenceMetric[];
	totals: EmissionTotal;
	subsectorRanks: SubsectorRank[];
}

export interface EmissionTimeSeries {
	year: number;
	month?: number;
	emissionsQuantity: number;
	gas: string;
	sector: string;
	subsector: string;
	activity?: number;
	activityUnits?: string;
	capacity?: number;
	capacityFactor?: number;
	capacityUnits?: string;
	emissionsFactor?: number;
	emissionsFactorUnits?: string;
}

export interface ConfidenceMetric {
	year: number;
	activity?: string;
	asset_type?: string;
	capacity?: string;
	capacity_factor?: string;
	ch4_emissions?: string;
	ch4_emissions_factor?: string;
	co2_emissions?: string;
	co2_emissions_factor?: string;
	n2o_emissions?: string;
	n2o_emissions_factor?: string;
	other_gas_emissions?: string;
	other_gas_emissions_factor?: string;
	total_co2e_20yrgwp?: string;
	total_co2e_100yrgwp?: string;
}

export interface EmissionTotal {
	emissionsQuantity: number;
	gas: string;
	sector: string;
	subsector: string;
	year: number;
	month?: number;
	activity?: number;
	activityUnits?: string;
	capacity?: number;
	capacityFactor?: number;
	capacityUnits?: string;
	emissionsFactor?: number;
	emissionsFactorUnits?: string;
}

export interface SubsectorRank {
	rank: number;
	year: number;
}

export interface AggregatedEmissions {
	location: {
		name: string;
		country?: string;
		gadmId?: string;
		cityId?: string;
		continent?: string;
		countryGroup?: string;
	};
	owners?: Owner[];
	sectors: {
		summaries: EmissionSummary[];
		timeseries: EmissionTimeSeries[];
	};
	subsectors: {
		summaries: EmissionSummary[];
		timeseries: EmissionTimeSeries[];
	};
	totals: {
		summaries: EmissionSummary[];
		timeseries: EmissionTimeSeries[];
	};
}

export interface EmissionSummary {
	sector: string;
	subsector: string;
	emissionsQuantity: number;
	gas: string;
	percentage: number;
}

export interface Owner {
	id: string;
	name: string;
}

// Rankings types
export interface CountryRanking {
	country: string;
	rank: number;
	emissionsQuantity: number;
	gas: string;
	year: number;
	percentage?: number;
}

// Administrative area types
export interface AdministrativeArea {
	id: string;
	name: string;
	level: number;
	country?: string;
	parentId?: string;
	bbox?: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
}

// City types
export interface City {
	id: string;
	name: string;
	country: string;
	bbox?: [number, number, number, number];
}

// Definition types
export interface Sector {
	name: string;
	description?: string;
	subsectors?: string[];
}

export interface Subsector {
	name: string;
	sector: string;
	description?: string;
}

export interface Gas {
	name: string;
	description?: string;
	gwp?: number; // Global Warming Potential
}

export interface Country {
	code: string;
	name: string;
	continent?: string;
}

export interface Continent {
	name: string;
	countries?: string[];
}

export interface CountryGroup {
	id: string;
	name: string;
	countries?: string[];
}

// Filter types
export interface EmissionsFilters {
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

export interface SourceFilters extends EmissionsFilters {
	start?: string;
	end?: string;
	timeGranularity?: 'month' | 'year';
}

// API Response types (for error handling)
export interface ApiError {
	message: string;
	code?: string;
	status?: number;
}

// Utility types
export type TimeGranularity = 'month' | 'year';
export type GasType = 'co2e_100yr' | 'co2e_20yr' | 'co2' | 'ch4' | 'n2o';
export type AdminLevel = 0 | 1 | 2; // Country, State/Province, County/District
