import * as v from "valibot";
const SourceSummarySchema = v.object({
  id: v.number(),
  name: v.string(),
  sector: v.string(),
  subsector: v.string(),
  country: v.string(),
  emissionsQuantity: v.number(),
  gas: v.string(),
  year: v.number(),
  assetType: v.string(),
  sourceType: v.string()
});
const SourcesParamsSchema = v.optional(
  v.object({
    year: v.optional(v.pipe(v.number(), v.minValue(2021))),
    gas: v.optional(v.string()),
    sectors: v.optional(v.array(v.string())),
    subsectors: v.optional(v.array(v.string())),
    gadmId: v.optional(v.string()),
    cityId: v.optional(v.string()),
    countryGroup: v.optional(v.string()),
    continent: v.optional(v.string()),
    ownerIds: v.optional(v.array(v.string())),
    limit: v.optional(v.number()),
    offset: v.optional(v.number())
  })
);
const SourcesResponseSchema = v.nullable(v.array(SourceSummarySchema));
const SourceCentroidSchema = v.object({
  latitude: v.number(),
  longitude: v.number(),
  srid: v.number()
});
const SourceOwnerSchema = v.object({
  id: v.string(),
  name: v.string()
});
const SourceEmissionsTimePeriodSchema = v.object({
  year: v.number(),
  month: v.optional(v.number()),
  emissionsQuantity: v.number(),
  gas: v.string(),
  sector: v.optional(v.string()),
  subsector: v.optional(v.string()),
  activity: v.optional(v.number()),
  activityUnits: v.optional(v.string()),
  capacity: v.optional(v.number()),
  capacityFactor: v.optional(v.number()),
  capacityUnits: v.optional(v.string()),
  emissionsFactor: v.optional(v.number()),
  emissionsFactorUnits: v.optional(v.string())
});
const ConfidenceTimePeriodSchema = v.object({
  year: v.number(),
  activity: v.optional(v.string()),
  asset_type: v.optional(v.string()),
  capacity: v.optional(v.string()),
  capacity_factor: v.optional(v.string()),
  ch4_emissions: v.optional(v.string()),
  ch4_emissions_factor: v.optional(v.string()),
  co2_emissions: v.optional(v.string()),
  co2_emissions_factor: v.optional(v.string()),
  n2o_emissions: v.optional(v.string()),
  n2o_emissions_factor: v.optional(v.string()),
  other_gas_emissions: v.optional(v.string()),
  other_gas_emissions_factor: v.optional(v.string()),
  total_co2e_20yrgwp: v.optional(v.string()),
  total_co2e_100yrgwp: v.optional(v.string())
});
const AssetSubsectorRankSchema = v.object({
  rank: v.number(),
  year: v.number()
});
const SourceTotalsSchema = v.object({
  gas: v.string(),
  emissionsQuantity: v.number(),
  emissionsFactor: v.optional(v.number()),
  emissionsFactorUnits: v.optional(v.string()),
  activity: v.optional(v.number()),
  activityUnits: v.optional(v.string()),
  capacity: v.optional(v.number()),
  capacityUnits: v.optional(v.string()),
  capacityFactor: v.optional(v.number())
});
const SourceDetailsSchema = v.object({
  id: v.number(),
  name: v.string(),
  sector: v.string(),
  subsector: v.string(),
  country: v.string(),
  assetType: v.string(),
  sourceType: v.string(),
  centroid: SourceCentroidSchema,
  emissions: v.nullable(v.array(SourceEmissionsTimePeriodSchema)),
  owners: v.nullable(v.array(SourceOwnerSchema)),
  confidence: v.nullable(v.array(ConfidenceTimePeriodSchema)),
  totals: SourceTotalsSchema,
  subsectorRanks: v.nullable(v.array(AssetSubsectorRankSchema))
});
const SourceByIdParamsSchema = v.object({
  id: v.number(),
  start: v.optional(v.string()),
  end: v.optional(v.string()),
  timeGranularity: v.optional(v.picklist(["month", "year"])),
  gas: v.optional(v.string())
});
const EmissionsLocationSchema = v.object({
  name: v.string(),
  country: v.optional(v.string()),
  gadmId: v.optional(v.string()),
  cityId: v.optional(v.string()),
  continent: v.optional(v.string()),
  countryGroup: v.optional(v.string())
});
const AggregateEmissionsSummarySchema = v.object({
  emissionsQuantity: v.number(),
  gas: v.string(),
  percentage: v.number(),
  sector: v.optional(v.string()),
  subsector: v.optional(v.string())
});
const AggregateEmissionsTimePeriodSchema = v.object({
  emissionsQuantity: v.number(),
  gas: v.string(),
  month: v.optional(v.number()),
  sector: v.optional(v.string()),
  subsector: v.optional(v.string()),
  year: v.number()
});
const AggregateEmissionsOverviewSchema = v.object({
  summaries: v.array(AggregateEmissionsSummarySchema),
  timeseries: v.array(AggregateEmissionsTimePeriodSchema)
});
const OwnerSchema = v.object({
  id: v.string(),
  name: v.string()
});
const AggregatedEmissionsResponseSchema = v.object({
  location: EmissionsLocationSchema,
  owners: v.optional(v.array(OwnerSchema)),
  sectors: AggregateEmissionsOverviewSchema,
  subsectors: AggregateEmissionsOverviewSchema,
  totals: AggregateEmissionsOverviewSchema
});
const AggregatedEmissionsParamsSchema = v.optional(
  v.object({
    year: v.optional(v.pipe(v.number(), v.minValue(2021))),
    gas: v.optional(v.string()),
    sectors: v.optional(v.array(v.string())),
    subsectors: v.optional(v.array(v.string())),
    gadmId: v.optional(v.string()),
    cityId: v.optional(v.string()),
    countryGroup: v.optional(v.string()),
    continent: v.optional(v.string()),
    ownerIds: v.optional(v.array(v.string()))
  })
);
const CountryEmissionsRankSchema = v.object({
  country: v.string(),
  name: v.string(),
  rank: v.number(),
  emissionsQuantity: v.number(),
  emissionsPerCapita: v.number(),
  gas: v.string(),
  percentage: v.number()
});
const CountryEmissionsTotalsSchema = v.object({
  emissionsQuantity: v.number(),
  gas: v.string(),
  start: v.string(),
  end: v.string(),
  timeseries: v.optional(v.array(AggregateEmissionsTimePeriodSchema))
});
const CountryEmissionsRankingsResponseSchema = v.object({
  location: EmissionsLocationSchema,
  rankings: v.array(CountryEmissionsRankSchema),
  totals: CountryEmissionsTotalsSchema
});
const CountryRankingsParamsSchema = v.optional(
  v.object({
    gas: v.optional(v.string()),
    start: v.optional(v.string()),
    end: v.optional(v.string()),
    sectors: v.optional(v.array(v.string())),
    subsectors: v.optional(v.array(v.string())),
    countryGroup: v.optional(v.string()),
    continent: v.optional(v.string())
  })
);
const StringArraySchema = v.array(v.string());
const AdministrativeAreaSchema = v.object({
  id: v.string(),
  name: v.string(),
  full_name: v.string(),
  level: v.number(),
  level_0_id: v.string(),
  level_1_id: v.string(),
  level_2_id: v.string()
});
const CitiesSearchResultSchema = v.object({
  id: v.string(),
  name: v.string(),
  matchedName: v.string(),
  country: v.string(),
  alternateNames: v.array(v.string())
});
const CountrySchema = v.object({
  id: v.string(),
  name: v.string(),
  continent: v.string()
});
const SubSectorSchema = v.object({
  name: v.string(),
  sector: v.string(),
  sectorDisplay: v.string(),
  subsectorDisplay: v.string(),
  asset: v.boolean(),
  country: v.boolean(),
  locationDisplay: v.boolean(),
  dataLeads: v.array(v.record(v.string(), v.unknown()))
});
const OwnersSearchResultSchema = v.object({
  id: v.string(),
  name: v.string()
});
export {
  AggregatedEmissionsResponseSchema as A,
  CountryEmissionsRankingsResponseSchema as C,
  EmissionsLocationSchema as E,
  OwnerSchema as O,
  SourceDetailsSchema as S,
  CountryRankingsParamsSchema as a,
  AggregatedEmissionsParamsSchema as b,
  SourceByIdParamsSchema as c,
  SourcesResponseSchema as d,
  SourcesParamsSchema as e,
  SourceSummarySchema as f,
  SourceCentroidSchema as g,
  SourceOwnerSchema as h,
  SourceEmissionsTimePeriodSchema as i,
  ConfidenceTimePeriodSchema as j,
  AssetSubsectorRankSchema as k,
  SourceTotalsSchema as l,
  AggregateEmissionsSummarySchema as m,
  AggregateEmissionsTimePeriodSchema as n,
  AggregateEmissionsOverviewSchema as o,
  CountryEmissionsRankSchema as p,
  CountryEmissionsTotalsSchema as q,
  StringArraySchema as r,
  AdministrativeAreaSchema as s,
  CitiesSearchResultSchema as t,
  CountrySchema as u,
  SubSectorSchema as v,
  OwnersSearchResultSchema as w
};
