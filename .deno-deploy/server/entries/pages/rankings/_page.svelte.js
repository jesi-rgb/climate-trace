import "../../../chunks/async.js";
import { e as ensure_array_like } from "../../../chunks/index3.js";
import { p as page, g as goto } from "../../../chunks/index2.js";
import { a as fN } from "../../../chunks/utils3.js";
import { g as getAllRankings } from "../../../chunks/rankings.remote.js";
import { s as save, e as escape_html } from "../../../chunks/context.js";
import "../../../chunks/core.js";
import { P as Pagination_1, B as Body } from "../../../chunks/Pagination.js";
import "clsx";
import { P as Plot_1, A as AxisX, a as AxisY, L as LineY } from "../../../chunks/HTMLTooltip.svelte_svelte_type_style_lang.js";
import "interval-tree-1d";
import { ct } from "../../../chunks/index.js";
function TrendingLineRanking($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.async(async ($$renderer3) => {
      let { country } = $$props;
      const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
      const yearlyData = (await save(Promise.all(years.map((year) => ct("getCountryRankings", { start: String(year), end: String(year) })))))();
      const data = years.map((year, index) => {
        const ranking = yearlyData[index]?.rankings.find((r) => r.country === country);
        return { year, emissions: ranking?.emissionsQuantity || 0 };
      });
      if (data) {
        $$renderer3.push("<!--[-->");
        Plot_1($$renderer3, {
          height: 50,
          marginLeft: 15,
          children: ($$renderer4) => {
            AxisX($$renderer4, { title: false, tickCount: 2, tickFontSize: 10 });
            $$renderer4.push(`<!----> `);
            AxisY($$renderer4, { title: false, tickCount: 0 });
            $$renderer4.push(`<!----> `);
            LineY($$renderer4, {
              data,
              x: "year",
              y: "emissions",
              curve: "monotone-x",
              stroke: "var(--color-primary)",
              strokeWidth: 1.5
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.async(async ($$renderer3) => {
      const ITEMS_PER_PAGE = 20;
      const data = (await save(getAllRankings()))();
      let currentPage = parseInt(page.url.searchParams.get("page") || "1");
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const currentRankings = data?.rankings.slice(startIndex, endIndex) || [];
      function handlePageChange(newPage) {
        currentPage = newPage;
        goto(`?page=${newPage}`, {});
      }
      let $$settled = true;
      let $$inner_renderer;
      function $$render_inner($$renderer4) {
        $$renderer4.push(`<section class="px-section-x py-section-y"><div class="flex items-center justify-between"><h1 class="text-3xl font-bold mb-4">Global Emissions Rankings</h1> `);
        Pagination_1($$renderer4, {
          count: data.rankings.length,
          perPage: ITEMS_PER_PAGE,
          onPageChange: handlePageChange,
          get page() {
            return currentPage;
          },
          set page($$value) {
            currentPage = $$value;
            $$settled = false;
          }
        });
        $$renderer4.push(`<!----></div> `);
        if (!data) {
          $$renderer4.push("<!--[-->");
          $$renderer4.push(`<div class="flex min-h-[60vh] items-center justify-center"><div class="text-center"><div class="loading loading-spinner loading-lg text-primary"></div> <p class="mt-4 text-xs text-muted">Loading rankings...</p></div></div>`);
        } else {
          $$renderer4.push("<!--[!-->");
          $$renderer4.push(`<div class="overflow-x-auto"><table class="table"><thead><tr><th>Rank</th><th>Country</th><th>Trend (2015-2024)</th><th class="text-right">Emissions (tonnes CO₂e)</th><th class="text-right">Per Capita</th></tr></thead><tbody><!--[-->`);
          const each_array = ensure_array_like(currentRankings);
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let ranking = each_array[i];
            $$renderer4.push(`<tr class="hover:bg-base-200 cursor-pointer"><td>${escape_html(startIndex + i + 1)}</td><td>`);
            Body($$renderer4, {
              size: "16",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->${escape_html(ranking.name)}`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></td><td class="max-w-[0px]">`);
            TrendingLineRanking($$renderer4, { country: ranking.country });
            $$renderer4.push(`<!----></td><td>`);
            Body($$renderer4, {
              as: "div",
              size: "16",
              class: "text-right w-full tabular-nums",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->${escape_html(fN(ranking.emissionsQuantity))}`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></td><td class="tabular-nums text-right">`);
            Body($$renderer4, {
              as: "div",
              size: "16",
              class: "text-right w-full tabular-nums",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->${escape_html(fN(ranking.emissionsPerCapita))}`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></td></tr>`);
          }
          $$renderer4.push(`<!--]--></tbody></table></div>`);
        }
        $$renderer4.push(`<!--]--></section>`);
      }
      do {
        $$settled = true;
        $$inner_renderer = $$renderer3.copy();
        $$render_inner($$inner_renderer);
      } while (!$$settled);
      $$renderer3.subsume($$inner_renderer);
    });
  });
}
export {
  _page as default
};
