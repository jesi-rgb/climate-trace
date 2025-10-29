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
  get getAllRankings() {
    return getAllRankings;
  },
  get getCountryRankings() {
    return getCountryRankings;
  }
}, Symbol.toStringTag, { value: "Module" }));
const getAllRankings = query(
  async (filters = {}) => {
    return ct("getCountryRankings", filters);
  }
);
const getCountryRankings = query(
  v.object({
    country: v.string(),
    gas: v.optional(v.string()),
    start: v.optional(v.string()),
    end: v.optional(v.string()),
    sectors: v.optional(v.array(v.string())),
    subsectors: v.optional(v.array(v.string())),
    countryGroup: v.optional(v.string()),
    continent: v.optional(v.string())
  }),
  async (filters = {}) => {
    return ct("getCountryRankings", filters);
  }
);
init_remote_functions(m, "src/routes/api/rankings.remote.ts", "1knng9o");
for (const [name, fn] of Object.entries(m)) {
  fn.__.id = "1knng9o/" + name;
  fn.__.name = name;
}
export {
  getAllRankings as g,
  m
};
