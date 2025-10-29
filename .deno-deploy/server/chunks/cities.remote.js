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
  get searchCities() {
    return searchCities;
  }
}, Symbol.toStringTag, { value: "Module" }));
const searchCities = query(
  v.optional(
    v.object({
      name: v.optional(v.string()),
      country: v.optional(v.string()),
      bbox: v.optional(v.string()),
      limit: v.optional(v.number()),
      offset: v.optional(v.number())
    })
  ),
  async (params = {}) => {
    try {
      return ct("searchCities", params);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return [];
      }
      throw error;
    }
  }
);
init_remote_functions(m, "src/routes/api/cities.remote.ts", "y6e42g");
for (const [name, fn] of Object.entries(m)) {
  fn.__.id = "y6e42g/" + name;
  fn.__.name = name;
}
export {
  m
};
