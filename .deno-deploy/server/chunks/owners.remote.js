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
  get searchOwners() {
    return searchOwners;
  }
}, Symbol.toStringTag, { value: "Module" }));
const searchOwners = query(
  v.optional(
    v.object({
      name: v.optional(v.string()),
      limit: v.optional(v.number()),
      offset: v.optional(v.number())
    })
  ),
  async (params = {}) => {
    return ct("searchOwners", params);
  }
);
init_remote_functions(m, "src/routes/api/owners.remote.ts", "11qft9n");
for (const [name, fn] of Object.entries(m)) {
  fn.__.id = "11qft9n/" + name;
  fn.__.name = name;
}
export {
  m,
  searchOwners as s
};
