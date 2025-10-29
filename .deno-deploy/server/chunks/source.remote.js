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
  get getSourceById() {
    return getSourceById;
  },
  get getTopSources() {
    return getTopSources;
  }
}, Symbol.toStringTag, { value: "Module" }));
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
const getTopSources = query(
  v.optional(
    v.object({
      year: v.optional(v.number()),
      gas: v.optional(v.string()),
      sectors: v.optional(v.array(v.string())),
      subsectors: v.optional(v.array(v.string())),
      limit: v.optional(v.number()),
      offset: v.optional(v.number())
    })
  ),
  async (filters = {}) => {
    return ct("getSources", filters);
  }
);
init_remote_functions(m, "src/routes/api/source.remote.ts", "17m8e5g");
for (const [name, fn] of Object.entries(m)) {
  fn.__.id = "17m8e5g/" + name;
  fn.__.name = name;
}
export {
  getSourceById as a,
  getTopSources as g,
  m
};
