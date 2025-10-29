import "./async.js";
import { h as attributes, i as element, j as clsx, g as attr_class, k as attr_style, s as stringify, a as attr } from "./index3.js";
import { g as getIconContext } from "./context2.js";
import { e as escape_html } from "./context.js";
import { c as cn } from "./utils3.js";
import { H as Heading } from "./Heading.js";
import { B as Body } from "./Pagination.js";
function XCircle($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M168.49,104.49,145,128l23.52,23.51a12,12,0,0,1-17,17L128,145l-23.51,23.52a12,12,0,0,1-17-17L111,128,87.51,104.49a12,12,0,0,1,17-17L128,111l23.51-23.52a12,12,0,0,1,17,17ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path><path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M164.24,100.24,136.48,128l27.76,27.76a6,6,0,1,1-8.48,8.48L128,136.48l-27.76,27.76a6,6,0,0,1-8.48-8.48L119.52,128,91.76,100.24a6,6,0,0,1,8.48-8.48L128,119.52l27.76-27.76a6,6,0,0,1,8.48,8.48ZM230,128A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M162.83,98.83,133.66,128l29.17,29.17a4,4,0,0,1-5.66,5.66L128,133.66,98.83,162.83a4,4,0,0,1-5.66-5.66L122.34,128,93.17,98.83a4,4,0,0,1,5.66-5.66L128,122.34l29.17-29.17a4,4,0,1,1,5.66,5.66ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"></path>`);
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
function Number($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      as = "p",
      size = "big",
      class: className,
      children,
      $$slots,
      $$events,
      ...rest
    } = $$props;
    const baseClass = "font-bold leading-[1.04] tabular-nums";
    const numberSizeOptions = {
      huge: "text-5xl md:text-6xl",
      big: "text-4xl md:text-5xl",
      medium: "text-3xl md:text-4xl",
      small: "text-2xl md:text-3xl"
    };
    const classList = cn(baseClass, numberSizeOptions[size], className);
    element(
      $$renderer2,
      as,
      () => {
        $$renderer2.push(`${attributes({ class: clsx(classList), ...rest })}`);
      },
      () => {
        children?.($$renderer2);
        $$renderer2.push(`<!---->`);
      }
    );
  });
}
function Figure($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      icon,
      iconClass,
      title,
      value,
      subtitle,
      color = "primary",
      gradientFrom = 10,
      gradientTo = 0,
      borderOpacity = 30,
      href,
      class: className
    } = $$props;
    $$renderer2.push(`<figure${attr_class(clsx(cn("card border", className)))}${attr_style(` --gradient-from: color-mix(in oklch, var(--color-${stringify(color)}), transparent ${stringify(100 - gradientFrom)}%); --gradient-to: color-mix(in oklch, var(--color-${stringify(color)}), transparent ${stringify(100 - gradientTo)}%); background-image: linear-gradient(to bottom right, var(--gradient-from), var(--gradient-to)); border-color: color-mix(in oklch, var(--color-${stringify(color)}), transparent ${stringify(100 - borderOpacity)}%); `)}><div class="card-body"><div class="flex items-center gap-2 mb-2">`);
    if (icon) {
      $$renderer2.push("<!--[-->");
      const Icon = icon;
      $$renderer2.push(`<!---->`);
      Icon($$renderer2, {
        size: 20,
        weight: "fill",
        class: cn(iconClass),
        style: `color: var(--color-${stringify(color)});`
      });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    Heading($$renderer2, {
      size: "eyebrow",
      class: "card-title",
      style: `color: var(--color-${stringify(color)});`,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(title)}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> `);
    if (href) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attr("href", href)}>`);
      Number($$renderer2, {
        class: "hover:underline",
        style: `text-decoration-color: var(--color-${stringify(color)});
					text-decoration-thickness: 2px; text-underline-offset: 4px;`,
        size: "medium",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(value)}`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      Number($$renderer2, {
        size: "medium",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(value)}`);
        },
        $$slots: { default: true }
      });
    }
    $$renderer2.push(`<!--]--> `);
    if (subtitle) {
      $$renderer2.push("<!--[-->");
      Body($$renderer2, {
        size: "16",
        class: "opacity-60",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(subtitle)}`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></figure>`);
  });
}
export {
  Figure as F,
  XCircle as X
};
