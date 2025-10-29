import "@sveltejs/kit/internal/server";
import "./utils.js";
import "@sveltejs/kit";
import "clsx";
import { q as query } from "./query.js";
import * as v from "valibot";
import { ct, ApiError } from "./index.js";
import "./core.js";
import { init_remote_functions } from "@sveltejs/kit/internal";
const m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get getAggregatedEmissions() {
    return getAggregatedEmissions;
  },
  get getCountryRankings() {
    return getCountryRankings;
  },
  get getSectors() {
    return getSectors;
  },
  get getSourceById() {
    return getSourceById;
  },
  get getSubsectors() {
    return getSubsectors;
  },
  get getTopSources() {
    return getTopSources;
  }
}, Symbol.toStringTag, { value: "Module" }));
const getTopSources = query(
  v.optional(
    v.object({
      year: v.optional(v.number()),
      gas: v.optional(v.string()),
      sectors: v.optional(v.array(v.string())),
      limit: v.optional(v.number())
    })
  ),
  async (filters = {}) => {
    try {
      return ct("getSources", filters);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return [];
      }
      throw error;
    }
  }
);
const getSourceById = query(
  v.object({
    id: v.number(),
    start: v.optional(v.string()),
    end: v.optional(v.string()),
    timeGranularity: v.optional(v.picklist(["month", "year"])),
    gas: v.optional(v.string())
  }),
  async (params) => {
    return ct("getSourceById", params);
  }
);
const getAggregatedEmissions = query(
  v.optional(
    v.object({
      year: v.optional(v.number()),
      gas: v.optional(v.string()),
      sectors: v.optional(v.array(v.string())),
      gadmId: v.optional(v.string()),
      cityId: v.optional(v.string())
    })
  ),
  async (filters = {}) => {
    try {
      return ct("getAggregatedEmissions", filters);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  }
);
const getCountryRankings = query(
  v.optional(
    v.object({
      gas: v.optional(v.string()),
      start: v.optional(v.string()),
      end: v.optional(v.string())
    })
  ),
  async (filters = {}) => {
    return ct("getCountryRankings", filters);
  }
);
const getSectors = query(async () => {
  return ct("getSectors", void 0);
});
const getSubsectors = query(async () => {
  return ct("getSubsectors", void 0);
});
init_remote_functions(m, "src/routes/api/emissions.remote.ts", "134xwjn");
for (const [name, fn] of Object.entries(m)) {
  fn.__.id = "134xwjn/" + name;
  fn.__.name = name;
}
export {
  getAggregatedEmissions as g,
  m
};
