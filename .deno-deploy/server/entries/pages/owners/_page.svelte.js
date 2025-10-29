import "../../../chunks/async.js";
import { e as ensure_array_like, a as attr, s as stringify } from "../../../chunks/index3.js";
import { s as searchOwners } from "../../../chunks/owners.remote.js";
import { C as Card } from "../../../chunks/Card.js";
import { s as save, e as escape_html } from "../../../chunks/context.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/core.js";
import "clsx";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.async(async ($$renderer3) => {
      const owners = (await save(searchOwners({ limit: 100 })))();
      $$renderer3.push(`<div class="container mx-auto p-4"><h1 class="mb-6 text-3xl font-bold">Emission Source Owners</h1> `);
      if (!owners) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex min-h-[60vh] items-center justify-center"><div class="text-center"><div class="loading loading-spinner loading-lg text-primary"></div> <p class="mt-4 text-xs text-muted">Loading owners...</p></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        const each_array = ensure_array_like(owners);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let owner = each_array[$$index];
          {
            let title = function($$renderer4) {
              $$renderer4.push(`<h2 class="card-title">${escape_html(owner.ownerName)}</h2>`);
            }, content = function($$renderer4) {
              $$renderer4.push(`<div class="px-4 pb-4">`);
              if (owner.country) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<p class="text-sm">Country: <a${attr("href", `/country/${stringify(owner.country)}`)} class="link">${escape_html(owner.country)}</a></p>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--></div>`);
            };
            Card($$renderer3, { title, content });
          }
        }
        $$renderer3.push(`<!--]--></div>`);
      }
      $$renderer3.push(`<!--]--></div>`);
    });
  });
}
export {
  _page as default
};
