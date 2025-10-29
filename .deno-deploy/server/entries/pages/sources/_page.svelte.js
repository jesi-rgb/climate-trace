import "../../../chunks/async.js";
import { h as attributes, e as ensure_array_like, a as attr, m as bind_props, s as stringify } from "../../../chunks/index3.js";
import { p as page, g as goto } from "../../../chunks/index2.js";
import { g as getTopSources } from "../../../chunks/source.remote.js";
import "../../../chunks/sector.remote.js";
import { f as formatSector, a as fN } from "../../../chunks/utils3.js";
import { e as escape_html, s as save } from "../../../chunks/context.js";
import "../../../chunks/core.js";
import { P as Pagination_1 } from "../../../chunks/Pagination.js";
import { F as Factory } from "../../../chunks/Factory.js";
import { B as Buildings, a as Trash, T as Tree } from "../../../chunks/Buildings.js";
import { L as Lightning } from "../../../chunks/Lightning.js";
import { g as getIconContext } from "../../../chunks/context2.js";
function CraneTower($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M240,76H111.42L90.73,34.63A12,12,0,0,0,80,28H48A12,12,0,0,0,36,40V76H24a12,12,0,0,0,0,24H36V204H24a12,12,0,0,0,0,24H128a12,12,0,0,0,0-24H116V100h88v80H192v-4a12,12,0,0,0-24,0v8a20,20,0,0,0,20,20h20a20,20,0,0,0,20-20V100h12a12,12,0,0,0,0-24ZM60,52H72.58l12,24H60Zm0,152V164H92v40Zm32-64H60V100H92Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M104,88V216H48V40H80Z" opacity="0.2"></path><path d="M240,80H108.94L87.16,36.42A8,8,0,0,0,80,32H48a8,8,0,0,0-8,8V80H24a8,8,0,0,0,0,16H40V208H24a8,8,0,0,0,0,16H128a8,8,0,0,0,0-16H112V96h96v88H192v-8a8,8,0,0,0-16,0v8a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16V96h16a8,8,0,0,0,0-16ZM56,48H75.06l16,32H56Zm0,160V160H96v48Zm40-64H56V96H96Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M127.73,208H112V164a4,4,0,0,0-4-4H44a4,4,0,0,0-4,4v44H24.27A8.17,8.17,0,0,0,16,215.47,8,8,0,0,0,24,224H128a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,127.73,208Z"></path><path d="M239.73,80H108.94L87.16,36.42A8,8,0,0,0,80,32H48a8,8,0,0,0-8,8V80H24.27A8.17,8.17,0,0,0,16,87.47,8,8,0,0,0,24,96H40v44a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V96h96v88H192v-7.73a8.18,8.18,0,0,0-7.47-8.25,8,8,0,0,0-8.53,8v8a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16V96h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,239.73,80ZM56,80V48H75.06l16,32Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M240,82H107.71L85.37,37.32A6,6,0,0,0,80,34H48a6,6,0,0,0-6,6V82H24a6,6,0,0,0,0,12H42V210H24a6,6,0,0,0,0,12H128a6,6,0,0,0,0-12H110V94H210v90a2,2,0,0,1-2,2H192a2,2,0,0,1-2-2v-8a6,6,0,0,0-12,0v8a14,14,0,0,0,14,14h16a14,14,0,0,0,14-14V94h18a6,6,0,0,0,0-12ZM54,46H76.29l18,36H54Zm0,164V158H98v52Zm44-64H54V94H98Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M240,80H108.94L87.16,36.42A8,8,0,0,0,80,32H48a8,8,0,0,0-8,8V80H24a8,8,0,0,0,0,16H40V208H24a8,8,0,0,0,0,16H128a8,8,0,0,0,0-16H112V96h96v88H192v-8a8,8,0,0,0-16,0v8a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16V96h16a8,8,0,0,0,0-16ZM56,48H75.06l16,32H56Zm0,160V160H96v48Zm40-64H56V96H96Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M240,84H106.47L83.58,38.21A4,4,0,0,0,80,36H48a4,4,0,0,0-4,4V84H24a4,4,0,0,0,0,8H44V212H24a4,4,0,0,0,0,8H128a4,4,0,0,0,0-8H108V92H212v92a4,4,0,0,1-4,4H192a4,4,0,0,1-4-4v-8a4,4,0,0,0-8,0v8a12,12,0,0,0,12,12h16a12,12,0,0,0,12-12V92h20a4,4,0,0,0,0-8ZM52,44H77.53l20,40H52Zm0,168V156h48v56Zm48-64H52V92h48Z"></path>`);
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
function GasCan($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M200,20H131.31a19.86,19.86,0,0,0-14.14,5.86L105.66,37.37,90.14,21.86a20,20,0,0,0-28.28,0l-24,24a20,20,0,0,0,0,28.28L53.37,89.66,41.86,101.17A19.86,19.86,0,0,0,36,115.31V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V40A20,20,0,0,0,200,20ZM57.66,60,76,41.66,88.69,54.34,70.34,72.69ZM196,212H60V117L78.83,98.14h0L133,44h63ZM136,68a12,12,0,0,1,12-12h20a12,12,0,0,1,0,24H148A12,12,0,0,1,136,68Zm39.5,65.37L147.21,156l28.29,22.63a12,12,0,0,1-15,18.74l-32.5-26-32.5,26a12,12,0,0,1-15-18.74L108.79,156,80.5,133.37a12,12,0,0,1,15-18.74l32.5,26,32.5-26a12,12,0,0,1,15,18.74Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M208,40V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V107.31a8,8,0,0,1,2.34-5.65l67.32-67.32A8,8,0,0,1,123.31,32H200A8,8,0,0,1,208,40Z" opacity="0.2"></path><path d="M200,24H123.31A15.86,15.86,0,0,0,112,28.69L101.66,39,91.31,28.69a16,16,0,0,0-22.62,0l-24,24a16,16,0,0,0,0,22.62L55,85.66,44.69,96A15.86,15.86,0,0,0,40,107.31V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM56,64,80,40,90.34,50.34l-24,24ZM200,216H56V107.31l16-16h0L123.31,40H200ZM128,64a8,8,0,0,1,8-8h40a8,8,0,0,1,0,16H136A8,8,0,0,1,128,64Zm52.8,62.4L141.33,156l39.47,29.6a8,8,0,1,1-9.6,12.8L128,166,84.8,198.4a8,8,0,0,1-9.6-12.8L114.67,156,75.2,126.4a8,8,0,0,1,9.6-12.8L128,146l43.2-32.4a8,8,0,0,1,9.6,12.8Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M200,24H123.31A15.86,15.86,0,0,0,112,28.69L101.66,39,91.31,28.69a16,16,0,0,0-22.62,0l-24,24a16,16,0,0,0,0,22.62L55,85.66,44.69,96A15.86,15.86,0,0,0,40,107.31V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM56,64,80,40,90.34,50.34l-24,24ZM180.8,185.6a8,8,0,1,1-9.6,12.8L128,166,84.8,198.4a8,8,0,0,1-9.6-12.8L114.67,156,75.2,126.4a8,8,0,0,1,9.6-12.8L128,146l43.2-32.4a8,8,0,0,1,9.6,12.8L141.33,156ZM176,72H136a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M200,26H123.31a13.94,13.94,0,0,0-9.9,4.1L101.66,41.86,89.9,30.1a14,14,0,0,0-19.8,0l-24,24a14,14,0,0,0,0,19.8L57.86,85.66,46.1,97.41a13.94,13.94,0,0,0-4.1,9.9V216a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V40A14,14,0,0,0,200,26ZM54.59,65.41a2,2,0,0,1,0-2.82l24-24a2,2,0,0,1,2.82,0L93.17,50.34,66.34,77.17ZM202,216a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V107.31a2,2,0,0,1,.59-1.41l16-16h0L105.9,54.59h0l16-16a2,2,0,0,1,1.41-.59H200a2,2,0,0,1,2,2ZM182,64a6,6,0,0,1-6,6H136a6,6,0,0,1,0-12h40A6,6,0,0,1,182,64Zm-2.4,60.8L138,156l41.6,31.2a6,6,0,1,1-7.2,9.6L128,163.5,83.6,196.8a6,6,0,0,1-7.2-9.6L118,156,76.4,124.8a6,6,0,0,1,7.2-9.6L128,148.5l44.4-33.3a6,6,0,1,1,7.2,9.6Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M200,24H123.31A15.86,15.86,0,0,0,112,28.69L101.66,39,91.31,28.69a16,16,0,0,0-22.62,0l-24,24a16,16,0,0,0,0,22.62L55,85.66,44.69,96A15.86,15.86,0,0,0,40,107.31V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM56,64,80,40,90.34,50.34l-24,24ZM200,216H56V107.31l16-16h0L123.31,40H200ZM128,64a8,8,0,0,1,8-8h40a8,8,0,0,1,0,16H136A8,8,0,0,1,128,64Zm52.8,62.4L141.33,156l39.47,29.6a8,8,0,1,1-9.6,12.8L128,166,84.8,198.4a8,8,0,0,1-9.6-12.8L114.67,156,75.2,126.4a8,8,0,0,1,9.6-12.8L128,146l43.2-32.4a8,8,0,0,1,9.6,12.8Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M200,28H123.31a12,12,0,0,0-8.48,3.51L101.66,44.69,88.49,31.51a12,12,0,0,0-17,0l-24,24a12,12,0,0,0,0,17L60.69,85.66,47.52,98.83A11.9,11.9,0,0,0,44,107.31V216a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V40A12,12,0,0,0,200,28ZM53.17,66.83a4,4,0,0,1,0-5.66l24-24a4,4,0,0,1,5.66,0L96,50.34,66.34,80ZM204,216a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V107.31a4,4,0,0,1,1.17-2.82l16-16h0l35.31-35.31h0l16-16A4,4,0,0,1,123.31,36H200a4,4,0,0,1,4,4ZM180,64a4,4,0,0,1-4,4H136a4,4,0,0,1,0-8h40A4,4,0,0,1,180,64Zm-1.6,59.2L134.67,156l43.73,32.8a4,4,0,0,1-4.8,6.4L128,161,82.4,195.2a4,4,0,0,1-4.8-6.4L121.33,156,77.6,123.2a4,4,0,0,1,4.8-6.4L128,151l45.6-34.2a4,4,0,1,1,4.8,6.4Z"></path>`);
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
function AirplaneTakeoff($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M180,216a12,12,0,0,1-12,12H24a12,12,0,1,1,0-24H168A12,12,0,0,1,180,216ZM251.79,89.88a12,12,0,0,1-5.64,8.1L98.75,186l-.13.07a43.74,43.74,0,0,1-52.2-5.94l-.19-.18-36-35.25A20,20,0,0,1,15.78,112l2.94-1.44a12,12,0,0,1,9.12-.59l26.5,8.94,14.15-8.56L50.42,92.78a20,20,0,0,1,5.7-33.05l.48-.2,7.15-2.7a12,12,0,0,1,8.4,0L124.29,76l49.93-29.8a43.8,43.8,0,0,1,56.43,10,1.84,1.84,0,0,1,.17.22L249.46,80.3A11.94,11.94,0,0,1,251.79,89.88Zm-29.61-5.54L212,71.29a19.89,19.89,0,0,0-25.54-4.48l-54.77,32.7a12,12,0,0,1-10.3,1l-46-16.94,21,20.4a12,12,0,0,1-2.15,18.87L62,142.29a12,12,0,0,1-10,1.1l-13.35-4.5,24.31,23.8a19.89,19.89,0,0,0,23.6,2.65Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M240,91.64l-147.41,88a32,32,0,0,1-38-4.32L18.53,140a8,8,0,0,1,2.32-13.19L24,125.27,55.79,136,88,116.51,58.65,88a8,8,0,0,1,2.2-13.3L68,72l57.53,21.17,54.84-32.75a32,32,0,0,1,41,7.32Z" opacity="0.2"></path><path d="M176,216a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H168A8,8,0,0,1,176,216ZM247.86,93.15a8,8,0,0,1-3.76,5.39l-147.41,88a40.18,40.18,0,0,1-20.26,5.52,39.78,39.78,0,0,1-27.28-10.87l-.12-.12L13,145.8a16,16,0,0,1,4.49-26.21l3-1.47a8,8,0,0,1,6.08-.4l28.26,9.54L75,115.06,53.17,93.87A16,16,0,0,1,57.7,67.4l.32-.13,7.15-2.71a8,8,0,0,1,5.59,0L124.7,84.38,176.27,53.6a39.82,39.82,0,0,1,51.28,9.12l.12.15,18.64,23.89A8,8,0,0,1,247.86,93.15Zm-19.74-3.7-13-16.67a23.88,23.88,0,0,0-30.68-5.42l-54.8,32.72a8.06,8.06,0,0,1-6.87.64L68,80.58l-4,1.53.21.2L93.57,110.8a8,8,0,0,1-1.43,12.58L59.93,142.87a8,8,0,0,1-6.7.73l-28.67-9.67-.19.1-.37.17a.71.71,0,0,1,.13.12l36,35.26a23.85,23.85,0,0,0,28.42,3.18Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M176,216a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H168A8,8,0,0,1,176,216ZM246.31,86.76,227.67,62.87l-.12-.15a39.82,39.82,0,0,0-51.28-9.12L124.7,84.38,70.76,64.54a8,8,0,0,0-5.59,0L58,67.27l-.32.13a16,16,0,0,0-4.53,26.47L75,115.06l-20.17,12.2-28.26-9.54a8,8,0,0,0-6.08.4l-3,1.47A16,16,0,0,0,13,145.8l36,35.27.12.12a39.78,39.78,0,0,0,27.28,10.87,40.18,40.18,0,0,0,20.26-5.52l147.41-88a8,8,0,0,0,2.21-11.78Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M174,216a6,6,0,0,1-6,6H24a6,6,0,0,1,0-12H168A6,6,0,0,1,174,216ZM245.9,92.78a6,6,0,0,1-2.82,4l-147.41,88a38.22,38.22,0,0,1-19.23,5.23,37.8,37.8,0,0,1-25.92-10.33l-.1-.09L14.37,144.36a14,14,0,0,1,4-23l3-1.49a6,6,0,0,1,4.56-.29l29.15,9.83,23.17-14-23.7-23a14,14,0,0,1,4-23.18l.24-.1,7.15-2.71a6,6,0,0,1,4.19,0l54.84,20.18,52.38-31.27A37.81,37.81,0,0,1,226,64l.09.11L244.73,88A6,6,0,0,1,245.9,92.78ZM231.09,90,216.67,71.53a25.86,25.86,0,0,0-33.26-5.89L128.6,98.36a6,6,0,0,1-5.15.48L68,78.45l-4.9,1.85A1.91,1.91,0,0,0,62,81.77a2,2,0,0,0,.63,1.82l.17.15,29.35,28.49a6,6,0,0,1-1.07,9.44L58.89,141.16a6,6,0,0,1-5,.55l-29.45-9.94-.93.46-.28.13a2,2,0,0,0-.58,3.29l.1.09,36,35.28a25.84,25.84,0,0,0,30.81,3.47Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M176,216a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H168A8,8,0,0,1,176,216ZM247.86,93.15a8,8,0,0,1-3.76,5.39l-147.41,88a40.18,40.18,0,0,1-20.26,5.52,39.78,39.78,0,0,1-27.28-10.87l-.12-.12L13,145.8a16,16,0,0,1,4.49-26.21l3-1.47a8,8,0,0,1,6.08-.4l28.26,9.54L75,115.06,53.17,93.87A16,16,0,0,1,57.7,67.4l.32-.13,7.15-2.71a8,8,0,0,1,5.59,0L124.7,84.38,176.27,53.6a39.82,39.82,0,0,1,51.28,9.12l.12.15,18.64,23.89A8,8,0,0,1,247.86,93.15Zm-19.74-3.7-13-16.67a23.88,23.88,0,0,0-30.68-5.42l-54.8,32.72a8.06,8.06,0,0,1-6.87.64L68,80.58l-4,1.53.21.2L93.57,110.8a8,8,0,0,1-1.43,12.58L59.93,142.87a8,8,0,0,1-6.7.73l-28.67-9.67-.19.1-.37.17a.71.71,0,0,1,.13.12l36,35.26a23.85,23.85,0,0,0,28.42,3.18Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M172,216a4,4,0,0,1-4,4H24a4,4,0,0,1,0-8H168A4,4,0,0,1,172,216ZM243.93,92.41a4,4,0,0,1-1.88,2.7l-147.41,88a36.15,36.15,0,0,1-18.2,4.95,35.78,35.78,0,0,1-24.55-9.79L15.73,142.89a12,12,0,0,1,3.44-19.68l3.07-1.5a4,4,0,0,1,3-.2l30,10.13L81.5,115.8,55.91,91a12,12,0,0,1,3.36-19.89l.16-.06,7.15-2.71a4,4,0,0,1,2.8,0L125.11,88.8,178.32,57a35.83,35.83,0,0,1,46.14,8.22l18.69,24A4,4,0,0,1,243.93,92.41Zm-9.87-1.85L218.21,70.24a27.85,27.85,0,0,0-35.81-6.33L127.58,96.64a4,4,0,0,1-3.44.32L68,76.31l-5.66,2.14a4,4,0,0,0-1,6.62,1.14,1.14,0,0,0,.11.11l29.35,28.49a4,4,0,0,1-.72,6.29L57.86,139.44a4,4,0,0,1-3.35.37l-30.23-10.2-1.67.82-.18.09a4,4,0,0,0-1.16,6.59L57.42,172.5a27.82,27.82,0,0,0,33.16,3.72Z"></path>`);
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
function Shovel($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M248.49,55.51l-48-48a12,12,0,0,0-17,17L199,40l-65.37,65.37L102.14,73.86a20,20,0,0,0-28.28,0l-56,56A19.9,19.9,0,0,0,12,144v80a20,20,0,0,0,20,20h80a19.86,19.86,0,0,0,14.14-5.86l56-56a20,20,0,0,0,0-28.28l-31.51-31.52L216,57l15.51,15.52a12,12,0,1,0,17-17ZM162.34,168l-52,52H36V145.66l52-52,28.69,28.68L79.51,159.51a12,12,0,0,0,17,17l37.17-37.18Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M173.66,173.66l-56,56A8,8,0,0,1,112,232H32a8,8,0,0,1-8-8V144a8,8,0,0,1,2.34-5.66l56-56a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,173.66,173.66Z" opacity="0.2"></path><path d="M245.66,58.34l-48-48a8,8,0,0,0-11.32,11.32L204.69,40l-71,71L99.31,76.68a16,16,0,0,0-22.62,0l-56,56A15.89,15.89,0,0,0,16,144v80a16,16,0,0,0,16,16h80a15.86,15.86,0,0,0,11.31-4.69l56-56a16,16,0,0,0,0-22.62L145,122.34l71-71,18.34,18.35a8,8,0,0,0,11.32-11.32ZM168,168l-56,56H32V144L88,88l34.34,34.34-40,40a8,8,0,0,0,11.32,11.32l40-40Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M245.66,69.66a8,8,0,0,1-11.32,0L216,51.31l-71,71L133.66,111l71-71L186.34,21.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,245.66,69.66ZM88,176a8,8,0,0,1-5.66-13.66L133.66,111,99.31,76.68a16,16,0,0,0-22.62,0l-56,56A15.89,15.89,0,0,0,16,144v80a16,16,0,0,0,16,16h80a15.86,15.86,0,0,0,11.31-4.69l56-56a16,16,0,0,0,0-22.62L145,122.34,93.66,173.66A8,8,0,0,1,88,176Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M244.24,59.76l-48-48a6,6,0,0,0-8.48,8.48L207.52,40l-73.86,73.86L97.9,78.1a14,14,0,0,0-19.8,0l-56,56A13.94,13.94,0,0,0,18,144v80a14,14,0,0,0,14,14h80a13.94,13.94,0,0,0,9.9-4.1l56-56a14,14,0,0,0,0-19.8l-35.76-35.76L216,48.48l19.76,19.76a6,6,0,1,0,8.48-8.48ZM169.41,166.58a2,2,0,0,1,0,2.84l-56,56A2,2,0,0,1,112,226H32a2,2,0,0,1-2-2V144a2,2,0,0,1,.58-1.42l56-56A2,2,0,0,1,88,86a2.07,2.07,0,0,1,1.42.58l35.75,35.76L83.76,163.76a6,6,0,1,0,8.48,8.48l41.42-41.41Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M245.66,58.34l-48-48a8,8,0,0,0-11.32,11.32L204.69,40l-71,71L99.31,76.68a16,16,0,0,0-22.62,0l-56,56A15.89,15.89,0,0,0,16,144v80a16,16,0,0,0,16,16h80a15.86,15.86,0,0,0,11.31-4.69l56-56a16,16,0,0,0,0-22.62L145,122.34l71-71,18.34,18.35a8,8,0,0,0,11.32-11.32ZM168,168l-56,56H32V144L88,88l34.34,34.34-40,40a8,8,0,0,0,11.32,11.32l40-40Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M242.83,61.17l-48-48a4,4,0,0,0-5.66,5.66L210.34,40l-76.68,76.69L96.49,79.51a12,12,0,0,0-17,0l-56,56A11.93,11.93,0,0,0,20,144v80a12,12,0,0,0,12,12h80a12,12,0,0,0,8.49-3.51l56-56a12,12,0,0,0,0-17l-37.18-37.17L216,45.66l21.17,21.17a4,4,0,1,0,5.66-5.66Zm-72,104a4,4,0,0,1,0,5.66l-56,56A4,4,0,0,1,112,228H32a4,4,0,0,1-4-4V144a4,4,0,0,1,1.17-2.83l56-56a4,4,0,0,1,5.66,0L128,122.34,85.17,165.17a4,4,0,0,0,5.66,5.66L133.66,128Z"></path>`);
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
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const sectorIcons = {
      "fossil-fuel-operations": GasCan,
      "forestry-and-land-use": Tree,
      manufacturing: CraneTower,
      transportation: AirplaneTakeoff,
      power: Lightning,
      agriculture: Shovel,
      waste: Trash,
      buildings: Buildings
    };
    let {
      searchTerm = "",
      selectedSubsectors = [],
      sectorHierarchy = {},
      loading = false,
      onToggleSubsector
    } = $$props;
    $$renderer2.push(`<div class="border-r border-subtle/40 h-full w-80 flex flex-col"><div class="px-section-x py-section-y overflow-y-auto flex-1"><h2 class="text-lg font-semibold mb-4">Filters</h2> `);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div><div class="skeleton h-4 w-20 mb-2"></div> <div class="skeleton h-8 w-full"></div> <div class="skeleton h-3 w-48 mt-1"></div></div> <div><div class="skeleton h-4 w-40 mb-2"></div> <div class="space-y-2"><!--[-->`);
      const each_array = ensure_array_like(Array(8));
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        each_array[i];
        $$renderer2.push(`<div class="skeleton h-10 w-full"></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="space-y-6"><div><label class="flex-col"><span class="label-text font-medium">Search</span> <input type="text"${attr("value", searchTerm)} placeholder="Search by name..." class="input input-bordered input-sm w-full"/></label> <p class="text-xs opacity-60 mt-1">Searches within current page results</p></div> <div><div class="flex items-center justify-between mb-2"><span class="label-text font-medium">Sectors &amp; Subsectors</span> `);
      if (selectedSubsectors.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button type="button" class="btn btn-ghost btn-xs">Clear</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <ul class="menu menu-sm bg-base-100 rounded-box w-full"><!--[-->`);
      const each_array_1 = ensure_array_like(Object.entries(sectorHierarchy));
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let [sector, subsectors] = each_array_1[i];
        const SectorIcon = sectorIcons[sector] || Factory;
        const open = i === 0;
        $$renderer2.push(`<li><details${attr("open", open, true)}><summary class="font-medium"><!---->`);
        SectorIcon($$renderer2, { size: 18, weight: "fill", class: "inline mr-1" });
        $$renderer2.push(`<!----> ${escape_html(formatSector(sector))}</summary> <ul><!--[-->`);
        const each_array_2 = ensure_array_like(subsectors);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let subsector = each_array_2[$$index_1];
          $$renderer2.push(`<li><label class="cursor-pointer justify-start gap-2 py-1 flex"><input type="checkbox" class="checkbox checkbox-xs"${attr("checked", selectedSubsectors.includes(subsector), true)}/> <span class="text-xs text-muted">${escape_html(formatSector(subsector))}</span></label></li>`);
        }
        $$renderer2.push(`<!--]--></ul></details></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { searchTerm, selectedSubsectors });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.async(async ($$renderer3) => {
      const ITEMS_PER_PAGE = 20;
      const FETCH_CHUNK_SIZE = 1e4;
      const MAX_DISPLAYABLE_ITEMS = 1e4;
      let searchTerm = "";
      let selectedSubsectors = page.url.searchParams.get("subsectors")?.split(",").filter(Boolean) || [];
      let selectedSectors = page.url.searchParams.get("sectors")?.split(",").filter(Boolean) || [];
      let selectedGas = page.url.searchParams.get("gas") || "co2e_100yr";
      let currentPage = parseInt(page.url.searchParams.get("page") || "1");
      let sectorHierarchy = {};
      let sidebarLoading = true;
      let chunkOffset = Math.floor((currentPage - 1) * ITEMS_PER_PAGE / FETCH_CHUNK_SIZE) * FETCH_CHUNK_SIZE;
      let chunkData = (await save(getTopSources({
        limit: FETCH_CHUNK_SIZE,
        offset: chunkOffset,
        subsectors: selectedSubsectors.length > 0 ? selectedSubsectors : void 0,
        gas: selectedGas
      })))();
      let paginatedSources = (() => {
        if (!chunkData || chunkData === null) return [];
        const indexInChunk = (currentPage - 1) * ITEMS_PER_PAGE % FETCH_CHUNK_SIZE;
        let sources = chunkData.slice(indexInChunk, indexInChunk + ITEMS_PER_PAGE);
        if (searchTerm) {
          sources = sources.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return sources;
      })();
      let totalCount = (() => {
        if (!chunkData || chunkData === null) return 0;
        const chunkSize = chunkData.length;
        if (chunkSize < FETCH_CHUNK_SIZE) {
          return chunkOffset + chunkSize;
        }
        return MAX_DISPLAYABLE_ITEMS;
      })();
      function toggleSubsector(subsector) {
        if (selectedSubsectors.includes(subsector)) {
          selectedSubsectors = selectedSubsectors.filter((s) => s !== subsector);
        } else {
          selectedSubsectors = [...selectedSubsectors, subsector];
        }
        updateFilters({ page: 1 });
      }
      function updateFilters(options = {}) {
        const params = new URLSearchParams();
        const targetPage = options.page ?? currentPage;
        params.set("page", targetPage.toString());
        if (selectedGas !== "co2e_100yr") params.set("gas", selectedGas);
        if (selectedSectors.length > 0) params.set("sectors", selectedSectors.join(","));
        if (selectedSubsectors.length > 0) params.set("subsectors", selectedSubsectors.join(","));
        goto(`?${params.toString()}`, {});
        currentPage = targetPage;
      }
      function handlePageChange(newPage) {
        updateFilters({ page: newPage });
      }
      let $$settled = true;
      let $$inner_renderer;
      function $$render_inner($$renderer4) {
        $$renderer4.push(`<div class="drawer drawer-open h-full"><input id="sources-drawer" type="checkbox" class="drawer-toggle"/> <div class="drawer-content overflow-y-auto"><div><div class="px-section-x py-section-y"><div class="mb-6"><h1 class="text-3xl font-bold">Sources</h1> <p class="text-sm opacity-60 mt-2">Showing top ${escape_html(totalCount.toLocaleString())} emission sources. Use filters to narrow results.</p></div> <div class="mb-6"><div class="label"><span class="label-text font-medium">Gas</span></div> <div class="filter"><input class="btn filter-reset btn-sm" type="radio" name="gas" value="co2e_100yr" aria-label="CO₂e - Carbon Dioxide Equivalent"${attr("checked", selectedGas === "co2e_100yr", true)}/> <input class="btn btn-sm" type="radio" name="gas" value="co2" aria-label="CO₂ - Carbon Dioxide"${attr("checked", selectedGas === "co2", true)}/> <input class="btn btn-sm" type="radio" name="gas" value="ch4" aria-label="CH₄ - Methane"${attr("checked", selectedGas === "ch4", true)}/> <input class="btn btn-sm" type="radio" name="gas" value="n2o" aria-label="N₂O - Nitrous Oxide"${attr("checked", selectedGas === "n2o", true)}/></div></div></div> <div class="mt-6 flex items-baseline justify-end">`);
        {
          $$renderer4.push("<!--[!-->");
        }
        $$renderer4.push(`<!--]--> `);
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
        $$renderer4.push(`<!----></div> `);
        if (paginatedSources.length > 0) {
          $$renderer4.push("<!--[-->");
          $$renderer4.push(`<div class="overflow-x-auto"><table class="table"><thead><tr><th>Name</th><th>Sector</th><th>Subsector</th><th>Country</th><th>Asset Type</th><th>Source Type</th><th>Emissions (tonnes CO₂e)</th><th>Year</th></tr></thead><tbody><!--[-->`);
          const each_array = ensure_array_like(paginatedSources);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let source = each_array[$$index];
            $$renderer4.push(`<tr class="hover"><td><a${attr("href", `/source/${stringify(source.id)}`)} class="link link-hover">${escape_html(source.name)}</a></td><td><a${attr("href", `/sector/${stringify(source.sector)}`)} class="link link-hover">${escape_html(formatSector(source.sector))}</a></td><td>${escape_html(formatSector(source.subsector))}</td><td><a${attr("href", `/country/${stringify(source.country)}`)} class="link link-hover">${escape_html(source.country)}</a></td><td>${escape_html(source.assetType)}</td><td>${escape_html(formatSector(source.sourceType))}</td><td class="tabular-nums text-right">${escape_html(fN(source.emissionsQuantity))}</td><td>${escape_html(source.year)}</td></tr>`);
          }
          $$renderer4.push(`<!--]--></tbody></table></div>`);
        } else {
          $$renderer4.push("<!--[!-->");
          $$renderer4.push(`<div class="text-center my-20 text-xl space-y-4"><p class="text-center text-xl text-error">No sources found</p> <button class="btn btn-primary">Clear filters</button></div>`);
        }
        $$renderer4.push(`<!--]--></div></div> <div class="drawer-side h-full"><label for="sources-drawer" aria-label="close sidebar" class="drawer-overlay"></label> `);
        Sidebar($$renderer4, {
          sectorHierarchy,
          loading: sidebarLoading,
          onToggleSubsector: toggleSubsector,
          get searchTerm() {
            return searchTerm;
          },
          set searchTerm($$value) {
            searchTerm = $$value;
            $$settled = false;
          },
          get selectedSubsectors() {
            return selectedSubsectors;
          },
          set selectedSubsectors($$value) {
            selectedSubsectors = $$value;
            $$settled = false;
          }
        });
        $$renderer4.push(`<!----></div></div>`);
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
