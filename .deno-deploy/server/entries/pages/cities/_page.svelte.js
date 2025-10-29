import "../../../chunks/async.js";
import { a as attr, e as ensure_array_like, s as stringify } from "../../../chunks/index3.js";
import "../../../chunks/cities.remote.js";
import { C as Card } from "../../../chunks/Card.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/core.js";
import "clsx";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let searchQuery = "";
    let cities = [];
    $$renderer2.push(`<div class="container mx-auto p-4"><h1 class="mb-6 text-3xl font-bold">Cities</h1> <input type="text"${attr("value", searchQuery)} placeholder="Search cities by name..." class="input input-bordered mb-6 w-full"/> `);
    {
      $$renderer2.push("<!--[!-->");
      if (cities.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        const each_array = ensure_array_like(cities);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let city = each_array[$$index];
          {
            let title = function($$renderer3) {
              $$renderer3.push(`<h2 class="card-title">${escape_html(city.name)}</h2>`);
            }, content = function($$renderer3) {
              $$renderer3.push(`<div class="px-4 pb-4 space-y-1"><p class="text-sm">Country: <a${attr("href", `/country/${stringify(city.country)}`)} class="link">${escape_html(city.country)}</a></p> `);
              if (city.population) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<p class="text-sm">Population: ${escape_html(city.population.toLocaleString())}</p>`);
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]--></div>`);
            };
            Card($$renderer2, { title, content });
          }
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (searchQuery.trim()) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-center text-muted">No cities found</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
