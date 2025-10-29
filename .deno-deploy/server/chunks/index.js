import * as v from "valibot";
import { C as CountryEmissionsRankingsResponseSchema, a as CountryRankingsParamsSchema, A as AggregatedEmissionsResponseSchema, b as AggregatedEmissionsParamsSchema, S as SourceDetailsSchema, c as SourceByIdParamsSchema, d as SourcesResponseSchema, e as SourcesParamsSchema } from "./core.js";
import { s, o, m, n, k, t, j, p, q, u, E, O, w, g, i, h, f, l, r, v as v2 } from "./core.js";
const endpoints = {
  // -------------------------------------------------------------------------
  // SOURCES - High priority, fully validated
  // -------------------------------------------------------------------------
  getSources: {
    path: "/v7/sources",
    method: "GET",
    paramsSchema: SourcesParamsSchema,
    responseSchema: SourcesResponseSchema,
    _types: {}
  },
  getSourceById: {
    path: "/v7/sources/:id",
    method: "GET",
    paramsSchema: SourceByIdParamsSchema,
    responseSchema: SourceDetailsSchema,
    _types: {}
  },
  getAggregatedEmissions: {
    path: "/v7/sources/emissions",
    method: "GET",
    paramsSchema: AggregatedEmissionsParamsSchema,
    responseSchema: AggregatedEmissionsResponseSchema,
    _types: {}
  },
  // -------------------------------------------------------------------------
  // RANKINGS - High priority, fully validated
  // -------------------------------------------------------------------------
  getCountryRankings: {
    path: "/v7/rankings/countries",
    method: "GET",
    paramsSchema: CountryRankingsParamsSchema,
    responseSchema: CountryEmissionsRankingsResponseSchema,
    _types: {}
  },
  // -------------------------------------------------------------------------
  // ADMINISTRATIVE AREAS - Medium priority, validated
  // -------------------------------------------------------------------------
  searchAdmins: {
    path: "/v7/admins",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getAdminById: {
    path: "/v7/admins/:id",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getAdminSubdivisions: {
    path: "/v7/admins/:id/subdivisions",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  // -------------------------------------------------------------------------
  // CITIES - Medium priority, validated
  // -------------------------------------------------------------------------
  searchCities: {
    path: "/v7/cities",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  // -------------------------------------------------------------------------
  // OWNERS - Medium priority, validated
  // -------------------------------------------------------------------------
  searchOwners: {
    path: "/v7/owners",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  // -------------------------------------------------------------------------
  // DEFINITIONS - Low priority, unvalidated (simple strings/objects)
  // -------------------------------------------------------------------------
  getContinents: {
    path: "/v7/definitions/continents",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getContinentDetails: {
    path: "/v7/definitions/continents/:continent",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getCountries: {
    path: "/v7/definitions/countries",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getCountryDetails: {
    path: "/v7/definitions/countries/:country",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getCountryGroups: {
    path: "/v7/definitions/countrygroups",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getCountryGroupDetails: {
    path: "/v7/definitions/countrygroups/:group",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getGases: {
    path: "/v7/definitions/gases",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getSectors: {
    path: "/v7/definitions/sectors",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getSectorDetails: {
    path: "/v7/definitions/sectors/:sector",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getSubsectors: {
    path: "/v7/definitions/subsectors",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  },
  getSubsectorDetails: {
    path: "/v7/definitions/subsectors/:subsector",
    method: "GET",
    paramsSchema: void 0,
    responseSchema: void 0,
    _types: {}
  }
};
const CACHE_CONFIG = {
  definitions: 24 * 60 * 60 * 1e3,
  reference: 12 * 60 * 60 * 1e3,
  dynamic: 60 * 60 * 1e3,
  none: 0
};
const ENDPOINT_CACHE_STRATEGY = {
  getContinents: "definitions",
  getContinentDetails: "definitions",
  getCountries: "definitions",
  getCountryDetails: "definitions",
  getCountryGroups: "definitions",
  getCountryGroupDetails: "definitions",
  getGases: "definitions",
  getSectors: "definitions",
  getSectorDetails: "definitions",
  getSubsectors: "definitions",
  getSubsectorDetails: "definitions",
  searchCities: "reference",
  searchAdmins: "reference",
  getAdminById: "reference",
  getAdminSubdivisions: "reference",
  searchOwners: "reference",
  getCountryRankings: "dynamic",
  getAggregatedEmissions: "dynamic",
  getSources: "none",
  getSourceById: "none"
};
class ApiCache {
  cache = /* @__PURE__ */ new Map();
  hits = 0;
  misses = 0;
  getCacheKey(endpoint, params) {
    if (!params) {
      return endpoint;
    }
    return `${endpoint}:${JSON.stringify(params, Object.keys(params).sort())}`;
  }
  shouldCache(endpoint) {
    if (endpoint.startsWith("get") && endpoint.includes("Country")) {
      return true;
    }
    return ENDPOINT_CACHE_STRATEGY[endpoint] !== "none";
  }
  getTTL(endpoint) {
    if (endpoint.startsWith("get") && endpoint.includes("Country")) {
      return CACHE_CONFIG.definitions;
    }
    const category = ENDPOINT_CACHE_STRATEGY[endpoint];
    return CACHE_CONFIG[category];
  }
  isValid(entry) {
    return Date.now() - entry.timestamp < entry.ttl;
  }
  get(endpoint, params) {
    if (!this.shouldCache(endpoint)) {
      return null;
    }
    const key = this.getCacheKey(endpoint, params);
    const entry = this.cache.get(key);
    if (!entry) {
      this.misses++;
      return null;
    }
    if (!this.isValid(entry)) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }
    this.hits++;
    return entry.data;
  }
  set(endpoint, params, data) {
    if (!this.shouldCache(endpoint)) {
      return;
    }
    const key = this.getCacheKey(endpoint, params);
    const ttl = this.getTTL(endpoint);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }
  invalidate(endpoint, params) {
    const key = this.getCacheKey(endpoint, params);
    this.cache.delete(key);
  }
  clear(category) {
    if (!category) {
      this.cache.clear();
      this.hits = 0;
      this.misses = 0;
      return;
    }
    const endpointsToClean = Object.entries(ENDPOINT_CACHE_STRATEGY).filter(([_, cat]) => cat === category).map(([endpoint]) => endpoint);
    for (const [key] of this.cache) {
      const endpoint = key.split(":")[0];
      if (endpointsToClean.includes(endpoint)) {
        this.cache.delete(key);
      }
    }
  }
  getStats() {
    const total = this.hits + this.misses;
    const hitRate = total > 0 ? this.hits / total : 0;
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      age: Date.now() - entry.timestamp,
      ttl: entry.ttl
    }));
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: Math.round(hitRate * 100) / 100,
      entries
    };
  }
}
const apiCache = new ApiCache();
const BASE_URL = "https://api.climatetrace.org";
class ApiError extends Error {
  constructor(message, status, statusText) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.name = "ApiError";
  }
}
async function ct(key, params) {
  const cached = apiCache.get(key, params);
  if (cached !== null) {
    return cached;
  }
  const endpoint = endpoints[key];
  if (endpoint.paramsSchema && params !== void 0) {
    try {
      v.parse(endpoint.paramsSchema, params);
    } catch (error) {
      throw new Error(`Invalid parameters for ${key}: ${error}`);
    }
  }
  let url = `${BASE_URL}${endpoint.path}`;
  const queryParams = new URLSearchParams();
  if (params) {
    const paramsObj = params;
    Object.entries(paramsObj).forEach(([paramKey, value]) => {
      if (value === void 0) return;
      if (url.includes(`:${paramKey}`)) {
        url = url.replace(`:${paramKey}`, String(value));
      } else {
        if (Array.isArray(value)) {
          queryParams.set(paramKey, value.join(","));
        } else {
          queryParams.set(paramKey, String(value));
        }
      }
    });
  }
  const queryString = queryParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  let response;
  try {
    response = await fetch(fullUrl);
  } catch (error) {
    throw new Error(`Network error calling ${key}: ${error}`);
  }
  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new ApiError(
      `API request failed: ${response.status} ${response.statusText} - ${errorText}`,
      response.status,
      response.statusText
    );
  }
  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`Failed to parse JSON response from ${key}: ${error}`);
  }
  if (endpoint.responseSchema) {
    try {
      data = v.parse(endpoint.responseSchema, data);
    } catch (error) {
      console.error(`Response validation failed for ${key}:`, error);
      throw new Error(`Invalid response from ${key}: ${error}`);
    }
  }
  const result = data;
  apiCache.set(key, params, result);
  return result;
}
async function getTopSources(params) {
  return ct("getSources", params);
}
async function getSourceById(id, params) {
  return ct("getSourceById", { ...params, id });
}
async function getAggregatedEmissions(params) {
  return ct("getAggregatedEmissions", params);
}
async function getCountryRankings(params) {
  return ct("getCountryRankings", params);
}
const apiCall = ct;
export {
  s as AdministrativeAreaSchema,
  o as AggregateEmissionsOverviewSchema,
  m as AggregateEmissionsSummarySchema,
  n as AggregateEmissionsTimePeriodSchema,
  AggregatedEmissionsParamsSchema,
  AggregatedEmissionsResponseSchema,
  ApiError,
  k as AssetSubsectorRankSchema,
  t as CitiesSearchResultSchema,
  j as ConfidenceTimePeriodSchema,
  p as CountryEmissionsRankSchema,
  CountryEmissionsRankingsResponseSchema,
  q as CountryEmissionsTotalsSchema,
  CountryRankingsParamsSchema,
  u as CountrySchema,
  E as EmissionsLocationSchema,
  O as OwnerSchema,
  w as OwnersSearchResultSchema,
  SourceByIdParamsSchema,
  g as SourceCentroidSchema,
  SourceDetailsSchema,
  i as SourceEmissionsTimePeriodSchema,
  h as SourceOwnerSchema,
  f as SourceSummarySchema,
  l as SourceTotalsSchema,
  SourcesParamsSchema,
  SourcesResponseSchema,
  r as StringArraySchema,
  v2 as SubSectorSchema,
  apiCache,
  apiCall,
  ct,
  getAggregatedEmissions,
  getCountryRankings,
  getSourceById,
  getTopSources
};
