// Auto-generated TypeScript types from Climate TRACE OpenAPI schema
// DO NOT EDIT MANUALLY - regenerate from climate-trace.ts if needed

export interface AdministrativeArea {

	full_name: string;

	/** Unique identifier from the GADM dataset */
	id: string;

	/** sub-division level */
	level: number;

	level_0_id: string;

	level_1_id: string;

	level_2_id: string;

	name: string;
}

export interface AggregateEmissionsOverview {

	summaries: AggregateEmissionsSummary[];

	timeseries: AggregateEmissionsTimePeriod[];
}

export interface AggregateEmissionsSummary {

	/** emissions quantity in tonnes */
	emissionsQuantity: number;

	gas: string;

	percentage: number;

	sector: string;

	subsector: string;
}

export interface AggregateEmissionsTimePeriod {

	/** emissions quantity in tonnes */
	emissionsQuantity: number;

	gas: string;

	/** Emissions month. Can be omitted if endpoints support `timeGranularity` parameter and is set to "month". */
	month: number;

	sector: string;

	subsector: string;

	/** Emissions year */
	year: number;
}

export interface AggregatedEmissionsResponse {

	location: EmissionsLocation;

	owners: Owner[];

	sectors: AggregateEmissionsOverview;

	subsectors: AggregateEmissionsOverview;

	totals: AggregateEmissionsOverview;
}

export interface AssetSubsectorRank {

	/** Global rank by subsector for total CO2 emissions produced by the parent source/asset in the specified year. */
	rank: number;

	/** Rank year */
	year: number;
}

export interface CitiesSearchResult {

	alternateNames: string[];

	/** 3-letter country code */
	country: string;

	/** Unique identifier from the GHS FUA dataset */
	id: string;

	matchedName: string;

	name: string;
}

export interface ConfidenceTimePeriod {

	activity: string;

	asset_type: string;

	capacity: string;

	capacity_factor: string;

	ch4_emissions: string;

	ch4_emissions_factor: string;

	co2_emissions: string;

	co2_emissions_factor: string;

	n2o_emissions: string;

	n2o_emissions_factor: string;

	other_gas_emissions: string;

	other_gas_emissions_factor: string;

	total_co2e_20yrgwp: string;

	total_co2e_100yrgwp: string;

	/** Confidence year */
	year: number;
}

export interface Country {

	/** continent name */
	continent: string;

	/** 3-letter country code */
	id: string;

	/** country name */
	name: string;
}

export interface CountryEmissionsRank {

	/** 3-letter country code */
	country: string;

	/** per capita emissions based on annual population data */
	emissionsPerCapita: number;

	/** emissions quantity in tonnes */
	emissionsQuantity: number;

	gas: string;

	/** country name */
	name: string;

	percentage: number;

	/** rank within the filtered list of countries */
	rank: number;
}

export interface CountryEmissionsRankingsResponse {

	location: EmissionsLocation;

	rankings: CountryEmissionsRank[];

	totals: CountryEmissionsTotals;
}

export interface CountryEmissionsTotals {

	/** emissions quantity in tonnes */
	emissionsQuantity: number;

	/** ISO 8601 date format */
	end: string;

	gas: string;

	/** ISO 8601 date format */
	start: string;

	timeseries: AggregateEmissionsTimePeriod[];
}

export interface EmissionsLocation {

	/** unique identifier of an Urban Area in the GHS FUA dataset */
	cityId: string;

	/** continent name */
	continent: string;

	/** 3-letter country code */
	country: string;

	/** country group identifier */
	countryGroup: string;

	/** unique identifier of an Administrative Area in the GADM dataset */
	gadmId: string;

	/** location name */
	name: string;
}

export interface Owner {

	id: string;

	name: string;
}

export interface OwnersSearchResult {

	/** unique identifier of an owner */
	id: string;

	name: string;
}

export interface SourceCentroid {

	latitude: number;

	longitude: number;

	/** spatial reference identifier denoting a coordinate reference system */
	srid: number;
}

export interface SourceDetails {

	assetType: string;

	centroid: SourceCentroid;

	confidence: ConfidenceTimePeriod[];

	country: string;

	emissions: SourceEmissionsTimePeriod[];

	/** Unique identifier of emissions source/asset */
	id: number;

	name: string;

	owners: SourceOwner[];

	sector: string;

	sourceType: string;

	subsector: string;

	subsectorRanks: AssetSubsectorRank[];

	totals: SourceEmissionsTimePeriod;
}

export interface SourceEmissionsTimePeriod {

	activity: number;

	activityUnits: string;

	capacity: number;

	capacityFactor: number;

	capacityUnits: string;

	emissionsFactor: number;

	emissionsFactorUnits: string;

	/** emissions quantity in tonnes */
	emissionsQuantity: number;

	gas: string;

	/** Emissions month. Can be omitted if endpoint supports `timeGranularity` parameter and is set to "month". */
	month: number;

	sector: string;

	subsector: string;

	/** Emissions year */
	year: number;
}

export interface SourceOwner {

	id: string;

	name: string;
}

export interface SourceSummary {

	assetType: string;

	country: string;

	/** emissions quantity in tonnes */
	emissionsQuantity: number;

	gas: string;

	/** Unique identifier of emissions source/asset */
	id: number;

	name: string;

	sector: string;

	sourceType: string;

	subsector: string;

	/** Emissions year */
	year: number;
}

export interface SubSector {

	asset: boolean;

	country: boolean;

	dataLeads: Record<string, unknown>[];

	locationDisplay: boolean;

	name: string;

	sector: string;

	sectorDisplay: string;

	subsectorDisplay: string;
}
