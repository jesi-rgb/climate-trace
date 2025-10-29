import "@sveltejs/kit/internal/server";
import "./utils.js";
import "@sveltejs/kit";
import "clsx";
import { q as query } from "./query.js";
import * as v from "valibot";
import { ct } from "./index.js";
import "./core.js";
import { init_remote_functions } from "@sveltejs/kit/internal";
const m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get getSectorDetails() {
    return getSectorDetails;
  },
  get getSectorEmissions() {
    return getSectorEmissions;
  },
  get getSectorSources() {
    return getSectorSources;
  },
  get getSectors() {
    return getSectors;
  },
  get getSubsectorDetails() {
    return getSubsectorDetails;
  },
  get getSubsectors() {
    return getSubsectors;
  }
}, Symbol.toStringTag, { value: "Module" }));
const getSectorDetails = query(v.string(), async (sector) => {
  return ct("getSectorDetails", { sector });
});
const getSubsectorDetails = query(v.string(), async (subsector) => {
  return ct("getSubsectorDetails", { subsector });
});
const getSectorEmissions = query(v.string(), async (sector) => {
  return ct("getAggregatedEmissions", { sectors: [sector] });
});
const getSectorSources = query(
  v.object({
    sector: v.string(),
    limit: v.optional(v.number())
  }),
  async ({ sector, limit = 100 }) => {
    return ct("getSources", { sectors: [sector], limit });
  }
);
const getSectors = query(async () => {
  return ct("getSectors", void 0);
});
const getSubsectors = query(async () => {
  return ct("getSubsectors", void 0);
});
init_remote_functions(m, "src/routes/api/sector.remote.ts", "92b49x");
for (const [name, fn] of Object.entries(m)) {
  fn.__.id = "92b49x/" + name;
  fn.__.name = name;
}
export {
  getSectorEmissions as a,
  getSectorSources as b,
  getSectors as c,
  getSectorDetails as g,
  m
};
