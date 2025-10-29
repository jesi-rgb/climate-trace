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
  get getCountryData() {
    return getCountryData;
  },
  get getCountryEmissionsBySector() {
    return getCountryEmissionsBySector;
  },
  get getCountrySources() {
    return getCountrySources;
  }
}, Symbol.toStringTag, { value: "Module" }));
const getCountryData = query(v.string(), async (countryCode) => {
  const rankingsData = await ct("getCountryRankings", void 0);
  const countryRanking = rankingsData.rankings.find((r) => r.country === countryCode);
  if (!countryRanking) {
    throw new Error("Country not found");
  }
  const totalEmissions = countryRanking.emissionsQuantity;
  const emissionsPerCapita = countryRanking.emissionsPerCapita;
  const population = emissionsPerCapita > 0 ? Math.round(totalEmissions / emissionsPerCapita) : 0;
  return {
    name: countryRanking.name,
    code: countryRanking.country,
    population,
    region: "",
    subregion: "",
    totalEmissions,
    emissionsPerCapita
  };
});
const getCountryEmissionsBySector = query(v.string(), async (countryCode) => {
  return ct("getAggregatedEmissions", { gadmId: countryCode });
});
const getCountrySources = query(
  v.object({
    countryCode: v.string(),
    limit: v.optional(v.number())
  }),
  async ({ countryCode, limit }) => {
    const cities = await ct("searchCities", { country: countryCode, limit: limit ?? 1e5 });
    const cityIds = cities.map((c) => c.id);
    const idPromises = cityIds.map(
      (id) => ct("getSources", { cityId: id }).then((sources2) => sources2?.map((s) => s.id))
    );
    const ids = (await Promise.all(idPromises)).flat().filter((id) => id !== void 0);
    const sourceDetailsPromises = ids.map(
      (id) => ct("getSourceById", { id }).then((details) => details)
    );
    const sources = await Promise.all(sourceDetailsPromises);
    return sources;
  }
);
init_remote_functions(m, "src/routes/api/country.remote.ts", "ug0imp");
for (const [name, fn] of Object.entries(m)) {
  fn.__.id = "ug0imp/" + name;
  fn.__.name = name;
}
export {
  getCountryData as g,
  m
};
