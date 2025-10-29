import "./async.js";
import { g as attr_class, s as stringify } from "./index3.js";
function Card($$renderer, $$props) {
  let {
    variant = "gradient",
    title,
    content,
    footnote,
    class: className = ""
  } = $$props;
  let variantClasses = variant === "gradient" ? "bg-gradient-to-t from-base-200-muted dark:from-base-200 dark:to-base-100 shadow-sm shadow-subtle/10" : "bg-base-200";
  $$renderer.push(`<div${attr_class(`card ${stringify(variantClasses)} border border-base-300 flex flex-col ${stringify(className)}`)}>`);
  if (title) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="px-4 pt-4 pb-2">`);
    title($$renderer);
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <div class="flex-1">`);
  content($$renderer);
  $$renderer.push(`<!----></div> `);
  if (footnote) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="px-4 pb-4 pt-2">`);
    footnote($$renderer);
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
export {
  Card as C
};
