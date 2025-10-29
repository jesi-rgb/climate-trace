import "../../../../chunks/async.js";
import { h as attributes, e as ensure_array_like, g as attr_class, a as attr, s as stringify } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/index2.js";
import { f as formatSector, a as fN } from "../../../../chunks/utils3.js";
import { g as getSectorDetails, a as getSectorEmissions, b as getSectorSources } from "../../../../chunks/sector.remote.js";
import { L as Lightning } from "../../../../chunks/Lightning.js";
import { F as Factory } from "../../../../chunks/Factory.js";
import { X as XCircle, F as Figure } from "../../../../chunks/Figure.js";
import { g as getIconContext } from "../../../../chunks/context2.js";
import { e as escape_html, s as save } from "../../../../chunks/context.js";
import { C as Card } from "../../../../chunks/Card.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import "../../../../chunks/core.js";
import { P as Pagination_1 } from "../../../../chunks/Pagination.js";
import { H as Heading } from "../../../../chunks/Heading.js";
function Stack($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const ctx = getIconContext();
    let { children, $$slots, $$events, ...props } = $$props;
    let weight = props.weight ?? ctx.weight ?? "regular";
    let color = props.color ?? ctx.color ?? "currentColor";
    let size = props.size ?? ctx.size ?? "1em";
    let mirrored = props.mirrored ?? ctx.mirrored ?? false;
    function svgAttr(obj) {
      let { weight: weight2, color: color2, size: size2, mirrored: mirrored2, ...attrs } = obj;
      return attrs;
    }
    $$renderer2.push(`<svg${attributes(
      {
        xmlns: "http://www.w3.org/2000/svg",
        role: "img",
        width: size,
        height: size,
        fill: color,
        transform: mirrored ? "scale(-1, 1)" : void 0,
        viewBox: "0 0 256 256",
        ...svgAttr(ctx),
        ...svgAttr(props)
      },
      void 0,
      void 0,
      void 0,
      3
    )}>`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--><rect width="256" height="256" fill="none"></rect>`);
    if (weight === "bold") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<path d="M234.36,170A12,12,0,0,1,230,186.37l-96,56a12,12,0,0,1-12.1,0l-96-56a12,12,0,0,1,12.09-20.74l90,52.48L218,165.63A12,12,0,0,1,234.36,170ZM218,117.63,128,170.11,38.05,117.63A12,12,0,0,0,26,138.37l96,56a12,12,0,0,0,12.1,0l96-56A12,12,0,0,0,218,117.63ZM20,80a12,12,0,0,1,6-10.37l96-56a12.06,12.06,0,0,1,12.1,0l96,56a12,12,0,0,1,0,20.74l-96,56a12,12,0,0,1-12.1,0l-96-56A12,12,0,0,1,20,80Zm35.82,0L128,122.11,200.18,80,128,37.89Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M224,80l-96,56L32,80l96-56Z" opacity="0.2"></path><path d="M230.91,172A8,8,0,0,1,228,182.91l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,36,169.09l92,53.65,92-53.65A8,8,0,0,1,230.91,172ZM220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09ZM24,80a8,8,0,0,1,4-6.91l96-56a8,8,0,0,1,8.06,0l96,56a8,8,0,0,1,0,13.82l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,24,80Zm23.88,0L128,126.74,208.12,80,128,33.26Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M220,169.09l-92,53.65L36,169.09A8,8,0,0,0,28,182.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,169.09Z"></path><path d="M220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09Z"></path><path d="M28,86.91l96,56a8,8,0,0,0,8.06,0l96-56a8,8,0,0,0,0-13.82l-96-56a8,8,0,0,0-8.06,0l-96,56a8,8,0,0,0,0,13.82Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M229.18,173a6,6,0,0,1-2.16,8.2l-96,56a6,6,0,0,1-6,0l-96-56a6,6,0,0,1,6-10.36l93,54.23,93-54.23A6,6,0,0,1,229.18,173ZM221,122.82l-93,54.23L35,122.82a6,6,0,0,0-6,10.36l96,56a6,6,0,0,0,6,0l96-56a6,6,0,0,0-6-10.36ZM26,80a6,6,0,0,1,3-5.18l96-56a6,6,0,0,1,6,0l96,56a6,6,0,0,1,0,10.36l-96,56a6,6,0,0,1-6,0l-96-56A6,6,0,0,1,26,80Zm17.91,0L128,129.05,212.09,80,128,31Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M230.91,172A8,8,0,0,1,228,182.91l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,36,169.09l92,53.65,92-53.65A8,8,0,0,1,230.91,172ZM220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09ZM24,80a8,8,0,0,1,4-6.91l96-56a8,8,0,0,1,8.06,0l96,56a8,8,0,0,1,0,13.82l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,24,80Zm23.88,0L128,126.74,208.12,80,128,33.26Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M227.45,174a4,4,0,0,1-1.44,5.48l-96,56a4,4,0,0,1-4,0l-96-56a4,4,0,0,1,4-6.92l94,54.83,94-54.83A4,4,0,0,1,227.45,174ZM222,124.54l-94,54.83L34,124.54a4,4,0,0,0-4,6.92l96,56a4,4,0,0,0,4,0l96-56a4,4,0,0,0-4-6.92ZM28,80a4,4,0,0,1,2-3.46l96-56a4,4,0,0,1,4,0l96,56a4,4,0,0,1,0,6.92l-96,56a4,4,0,0,1-4,0l-96-56A4,4,0,0,1,28,80Zm11.94,0L128,131.37,216.06,80,128,28.63Z"></path>`);
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`${escape_html((console.error('Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".'), ""))}`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></svg>`);
  });
}
function EmissionSources($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { sources, subsectors } = $$props;
    const ITEMS_PER_PAGE = 10;
    let selectedSubsector = null;
    let currentPage = 1;
    let filteredAndSortedSources = (() => {
      let result = [...sources];
      result.sort((a, b) => {
        const diff = a.emissionsQuantity - b.emissionsQuantity;
        return -diff;
      });
      return result;
    })();
    let paginatedSources = (() => {
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return filteredAndSortedSources.slice(start, end);
    })();
    let totalCount = filteredAndSortedSources.length;
    function handlePageChange(newPage) {
      currentPage = newPage;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      {
        let title = function($$renderer4) {
          $$renderer4.push(`<div class="flex items-center gap-2">`);
          Factory($$renderer4, { size: 24, weight: "bold", class: "text-warning" });
          $$renderer4.push(`<!----> <h2 class="card-title">Top Emission Sources</h2></div>`);
        }, content = function($$renderer4) {
          $$renderer4.push(`<div class="px-4 pb-4 space-y-4"><div><div class="flex items-center justify-between mb-2"><span class="label-text font-medium">Filter by Subsector</span> `);
          {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--></div> <div class="filter"><!--[-->`);
          const each_array = ensure_array_like(subsectors);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let subsector = each_array[$$index];
            $$renderer4.push(`<input${attr_class(`btn ${stringify(selectedSubsector === subsector ? "" : "filter-reset")}`)} type="radio" name="subsector-filter"${attr("aria-label", formatSector(subsector))}${attr("checked", selectedSubsector === subsector, true)}/>`);
          }
          $$renderer4.push(`<!--]--></div></div> `);
          Pagination_1($$renderer4, {
            count: totalCount,
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
          $$renderer4.push(`<!----> <div class="overflow-x-auto"><table class="table table-sm"><thead><tr><th>Source Name</th><th>Country</th><th>Subsector</th><th class="text-right"><button type="button" class="link link-hover">Emissions ${escape_html("↓")}</button></th></tr></thead><tbody>`);
          const each_array_1 = ensure_array_like(paginatedSources);
          if (each_array_1.length !== 0) {
            $$renderer4.push("<!--[-->");
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let source = each_array_1[$$index_1];
              $$renderer4.push(`<tr class="hover"><td><a${attr("href", `/source/${stringify(source.id)}`)} class="link link-hover">${escape_html(source.name || "Unknown")}</a></td><td><a${attr("href", `/country/${stringify(source.country)}`)} class="link link-hover">${escape_html(source.country)}</a></td><td class="text-sm opacity-70">${escape_html(formatSector(source.subsector))}</td><td class="text-right tabular-nums">${escape_html(fN(source.emissionsQuantity))}</td></tr>`);
            }
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`<tr><td colspan="4" class="text-center text-muted">No sources found</td></tr>`);
          }
          $$renderer4.push(`<!--]--></tbody></table></div></div>`);
        };
        Card($$renderer3, { title, content });
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.async(async ($$renderer3) => {
      let sector = page.params.sector;
      let details = (await save(getSectorDetails(sector)))();
      let emissions = (await save(getSectorEmissions(sector)))();
      let sources = (await save(getSectorSources({ sector, limit: 50 })))();
      let totalEmissions = emissions.subsectors.summaries[0]?.emissionsQuantity ?? 0;
      let subsectorCount = details.subSectors.length;
      let topSubsectors = (() => {
        if (!emissions.subsectors.summaries) return [];
        return emissions.subsectors.summaries.sort((a, b) => b.emissionsQuantity - a.emissionsQuantity);
      })();
      let subsectorNames = details.subSectors;
      {
        $$renderer3.push("<!--[!-->");
        if (!details) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex min-h-[60vh] items-center justify-center"><div class="alert alert-error max-w-md">`);
          XCircle($$renderer3, { size: 24, weight: "bold" });
          $$renderer3.push(`<!----> <div>`);
          Heading($$renderer3, {
            as: "h3",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Sector not found`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> <a href="/" class="link link-hover">Return to home</a></div></div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="px-section-x py-section-y"><div class="mb-4"><div class="breadcrumbs text-sm mb-2"><ul><li><a href="/" class="link link-hover">Home</a></li> <li><a href="/sectors" class="link link-hover">Sectors</a></li> <li>${escape_html(formatSector(details.name))}</li></ul></div> <div class="flex items-center gap-4">`);
          Heading($$renderer3, {
            size: "h1",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->${escape_html(formatSector(details.name))}`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> <div class="badge badge-primary badge-lg">${escape_html(subsectorCount)} subsectors</div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">`);
          Figure($$renderer3, {
            icon: Lightning,
            title: "Total Emissions",
            value: fN(totalEmissions),
            subtitle: "tonnes CO₂e",
            color: "primary"
          });
          $$renderer3.push(`<!----> `);
          Figure($$renderer3, {
            icon: Stack,
            title: "Subsectors",
            value: subsectorCount,
            subtitle: "categories",
            color: "info"
          });
          $$renderer3.push(`<!----> `);
          if (topSubsectors.length > 0) {
            $$renderer3.push("<!--[-->");
            {
              let title = function($$renderer4) {
                $$renderer4.push(`<div class="flex items-center gap-2">`);
                Factory($$renderer4, { size: 24, weight: "fill", class: "text-secondary" });
                $$renderer4.push(`<!----> `);
                Heading($$renderer4, {
                  as: "h2",
                  class: "card-title",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Top Subsectors by Emissions`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----></div>`);
              }, content = function($$renderer4) {
                $$renderer4.push(`<div class="px-4 pb-4 space-y-3"><!--[-->`);
                const each_array = ensure_array_like(topSubsectors);
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let subsector = each_array[$$index];
                  $$renderer4.push(`<div><div class="flex justify-between items-center mb-1"><span class="text-sm font-medium">${escape_html(formatSector(subsector.subsector))}</span> <span class="text-sm font-bold tabular-nums">${escape_html(fN(subsector.emissionsQuantity))}</span></div> <div class="flex items-center gap-2"><progress class="progress progress-secondary w-full"${attr("value", subsector.percentage)} max="100"></progress> <span class="text-xs opacity-60 tabular-nums min-w-[3rem]">${escape_html(subsector.percentage.toFixed(1))}%</span></div></div>`);
                }
                $$renderer4.push(`<!--]--></div>`);
              };
              Card($$renderer3, { title, content });
            }
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (sources && sources.length > 0) {
            $$renderer3.push("<!--[-->");
            EmissionSources($$renderer3, { sources, subsectors: subsectorNames });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]-->`);
    });
  });
}
export {
  _page as default
};
