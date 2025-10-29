import "../../chunks/async.js";
import { e as ensure_array_like, g as attr_class, s as stringify, k as attr_style } from "../../chunks/index3.js";
import { ct } from "../../chunks/index.js";
import "../../chunks/core.js";
import { f as formatSector, a as fN } from "../../chunks/utils3.js";
import { e as escape_html } from "../../chunks/context.js";
function SectorData($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { sectors = [] } = $$props;
    let selectedSector = null;
    const sectorConfig = {
      power: { color: "warning", title: "Power Sector Sources" },
      transportation: { color: "info", title: "Transportation Sources" },
      "fossil-fuel-operations": { color: "error", title: "Fossil Fuel Operations" },
      manufacturing: { color: "success", title: "Manufacturing Sources" }
    };
    function getColor(sector) {
      return sectorConfig[sector]?.color || "primary";
    }
    $$renderer2.push(`<div class="bg-base-200 border border-subtle join-item p-2.5"><h2 class="text-[11px] font-semibold text-base-content mb-1.5">All Monitored Sectors</h2> <div class="flex flex-wrap gap-1 mb-2"><!--[-->`);
    const each_array = ensure_array_like(sectors);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let sector = each_array[index];
      $$renderer2.push(`<button${attr_class(`badge badge-sm text-[9px] ${stringify(selectedSector === sector ? `badge-${getColor(sector)}` : "badge-primary")}`)}>${escape_html(formatSector(sector))}</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let topSources = [];
    let countryRankings = [];
    let sectors = [];
    let subsectors = [];
    let gases = [];
    let globalEmissions = null;
    let sectorEmissions = [];
    let subsectorEmissions = [];
    let topCountries = [];
    let countries = [];
    let continents = [];
    let loading = true;
    async function loadDashboard() {
      loading = true;
      try {
        const [
          sourcesRes,
          rankingsRes,
          sectorsRes,
          subsectorsRes,
          gasesRes,
          emissionsRes,
          countriesRes,
          continentsRes
        ] = await Promise.all([
          ct("getSources", { year: 2022, limit: 30 }),
          ct("getCountryRankings", { gas: "co2e_100yr", start: "2022", end: "2022" }),
          ct("getSectors", void 0),
          ct("getSubsectors", void 0),
          ct("getGases", void 0),
          ct("getAggregatedEmissions", { year: 2022 }),
          ct("getCountries", void 0),
          ct("getContinents", void 0)
        ]);
        topSources = sourcesRes || [];
        countryRankings = (rankingsRes?.rankings || []).slice(0, 25);
        sectors = sectorsRes || [];
        subsectors = subsectorsRes || [];
        gases = gasesRes || [];
        globalEmissions = emissionsRes;
        countries = countriesRes || [];
        continents = continentsRes || [];
        if (emissionsRes?.sectors?.summaries && Array.isArray(emissionsRes.sectors.summaries) && emissionsRes.sectors.summaries.length > 0) {
          sectorEmissions = emissionsRes.sectors.summaries;
        }
        if (emissionsRes?.subsectors?.summaries && Array.isArray(emissionsRes.subsectors.summaries) && emissionsRes.subsectors.summaries.length > 0) {
          subsectorEmissions = emissionsRes.subsectors.summaries.slice(0, 20);
        }
        topCountries = (rankingsRes?.rankings || []).slice(0, 10);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        loading = false;
      }
    }
    loadDashboard();
    $$renderer2.push(`<main class="px-section-x py-section-y">`);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex min-h-[60vh] items-center justify-center"><div class="text-center"><div class="loading loading-spinner loading-lg text-primary"></div> <p class="mt-4 text-xs text-muted">Loading dashboard data...</p></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="grid lg:grid-cols-6 join"><div class="bg-base-200 border border-subtle join-item p-2"><h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Global Emissions</h2> <div class="mt-1"><div class="font-bold text-primary">${escape_html(fN(globalEmissions?.totals?.summaries?.[0]?.emissionsQuantity || 0, 0))} t</div> <p class="text-[9px] text-muted">CO2e (2022)</p></div></div> <div class="bg-base-200 border border-subtle join-item p-2"><h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Sources</h2> <div class="mt-1"><div class="font-bold text-secondary">${escape_html(fN(topSources.length * 100, 0))}+</div> <p class="text-[9px] text-muted">Tracked worldwide</p></div></div> <div class="bg-base-200 border border-subtle join-item p-2"><h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Sectors</h2> <div class="mt-1"><div class="font-bold text-accent">${escape_html(sectors.length)}</div> <p class="text-[9px] text-muted">Industrial sectors</p></div></div> <div class="bg-base-200 border border-subtle join-item p-2"><h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Subsectors</h2> <div class="mt-1"><div class="font-bold text-warning">${escape_html(subsectors.length)}</div> <p class="text-[9px] text-muted">Subsector categories</p></div></div> <div class="bg-base-200 border border-subtle join-item p-2"><h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Countries</h2> <div class="mt-1"><div class="font-bold text-info">${escape_html(countries.length)}</div> <p class="text-[9px] text-muted">With data available</p></div></div> <div class="bg-base-200 border border-subtle join-item p-2"><h2 class="text-[10px] font-medium text-muted uppercase tracking-wide">Continents</h2> <div class="mt-1"><div class="font-bold text-success">${escape_html(continents.length)}</div> <p class="text-[9px] text-muted">Geographic regions</p></div></div></div> <div class="grid lg:grid-cols-4 join"><div class="bg-base-200 border border-t-0 border-subtle join-item p-2.5"><h2 class="text-[11px] font-semibold text-base-content mb-1.5">Top Countries by Emissions</h2> <div class="space-y-1"><!--[-->`);
      const each_array = ensure_array_like(countryRankings);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let country = each_array[i];
        $$renderer2.push(`<div class="flex items-center justify-between text-[11px]"><div class="flex items-center gap-1.5 flex-1 min-w-0"><div class="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-base-300 font-mono text-[9px] font-bold text-base-content">${escape_html(i + 1)}</div> <span class="text-base-content truncate">${escape_html(country.name || country.country)}</span></div> <span class="font-mono text-[9px] text-muted ml-2 shrink-0">${escape_html(fN(country.emissionsQuantity))} t</span></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-base-200 border border-t-0 border-subtle join-item p-2.5"><h2 class="text-[11px] font-semibold text-base-content mb-1.5">Emissions by Sector</h2> <div class="space-y-1"><!--[-->`);
      const each_array_1 = ensure_array_like(sectorEmissions);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let sector = each_array_1[$$index_1];
        $$renderer2.push(`<div><div class="mb-0.5 flex items-center justify-between text-[10px]"><span class="text-base-content truncate">${escape_html(formatSector(sector.sector))}</span> <span class="font-mono text-muted ml-2 shrink-0">${escape_html(sector.percentage.toFixed(1))}%</span></div> <div class="h-0.5 w-full overflow-hidden rounded-full bg-base-300"><div class="h-full bg-primary"${attr_style(`width: ${stringify(sector.percentage)}%`)}></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-base-200 border border-subtle border-t-0 join-item p-2.5"><h2 class="text-[11px] font-semibold text-base-content mb-1.5">Top Subsectors</h2> <div class="space-y-1"><!--[-->`);
      const each_array_2 = ensure_array_like(subsectorEmissions);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let subsector = each_array_2[$$index_2];
        $$renderer2.push(`<div><div class="mb-0.5 flex items-center justify-between text-[10px]"><span class="text-base-content truncate">${escape_html(formatSector(subsector.subsector))}</span> <span class="font-mono text-muted ml-2 shrink-0">${escape_html(subsector.percentage.toFixed(1))}%</span></div> <div class="h-0.5 w-full overflow-hidden rounded-full bg-base-300"><div class="h-full bg-secondary"${attr_style(`width: ${stringify(subsector.percentage)}%`)}></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-base-200 border border-subtle border-t-0 join-item p-2.5"><h2 class="text-[11px] font-semibold text-base-content mb-1.5">Regional Leaders</h2> <div class="grid grid-cols-2 gap-1.5"><!--[-->`);
      const each_array_3 = ensure_array_like(topCountries);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let country = each_array_3[$$index_3];
        $$renderer2.push(`<div class="rounded border border-subtle bg-base-100 p-1.5 text-center"><div class="text-base font-bold text-primary">#${escape_html(country.rank)}</div> <div class="text-[9px] font-semibold text-base-content truncate">${escape_html(country.name || country.country)}</div> <div class="font-mono text-[8px] text-muted">${escape_html(fN(country.emissionsQuantity))} t</div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="grid lg:grid-cols-3 join"><div class="bg-base-200 border border-subtle join-item p-2.5"><h2 class="text-[11px] font-semibold text-base-content mb-1.5">Top Emission Sources (All)</h2> <div class="space-y-1"><!--[-->`);
      const each_array_4 = ensure_array_like(topSources);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let source = each_array_4[$$index_4];
        $$renderer2.push(`<div class="rounded border border-subtle bg-base-100 p-1.5"><div class="flex items-start justify-between"><div class="flex-1 min-w-0"><h3 class="text-[10px] font-semibold text-base-content truncate">${escape_html(source.name)}</h3> <p class="text-[9px] text-muted">${escape_html(formatSector(source.sector))} • ${escape_html(source.country)}</p></div> <div class="text-right ml-2 shrink-0"><div class="font-mono text-[10px] font-bold text-primary">${escape_html(fN(source.emissionsQuantity))}</div> <div class="text-[8px] text-muted">tonnes</div></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> `);
      SectorData($$renderer2, { sectors });
      $$renderer2.push(`<!----> <div class="bg-base-200 border border-subtle join-item p-2.5"><h3 class="text-[11px] font-semibold text-base-content mb-1">Continents</h3> <div class="flex flex-wrap gap-1 mb-2"><!--[-->`);
      const each_array_5 = ensure_array_like(continents);
      for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
        let continent = each_array_5[$$index_5];
        $$renderer2.push(`<div class="badge badge-accent badge-sm text-[9px]">${escape_html(continent)}</div>`);
      }
      $$renderer2.push(`<!--]--></div> <h3 class="mt-2 text-[11px] font-semibold text-base-content mb-1">Key Gases</h3> <div class="flex flex-wrap gap-0.5"><!--[-->`);
      const each_array_6 = ensure_array_like(["co2", "ch4", "n2o", "co2e_100yr", "co2e_20yr"]);
      for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
        let gas = each_array_6[$$index_6];
        $$renderer2.push(`<div class="badge badge-secondary badge-sm text-[9px]">${escape_html(gas.toUpperCase())}</div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
