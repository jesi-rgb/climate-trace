import "../../../../chunks/async.js";
import { e as escape_html, g as getContext, s as save } from "../../../../chunks/context.js";
import "clsx";
import { p as page } from "../../../../chunks/index2.js";
import { f as formatSector, a as fN } from "../../../../chunks/utils3.js";
import { g as getCountryData } from "../../../../chunks/country.remote.js";
import { g as getAllRankings } from "../../../../chunks/rankings.remote.js";
import { g as getAggregatedEmissions } from "../../../../chunks/emissions.remote.js";
import { h as attributes, l as spread_props, e as ensure_array_like, g as attr_class, j as clsx, a as attr, k as attr_style, s as stringify } from "../../../../chunks/index3.js";
import { g as getIconContext } from "../../../../chunks/context2.js";
import { T as Trophy, C as ChartLine, D as Dot, F as Flame, G as Globe } from "../../../../chunks/ChartLine.js";
import { X as XCircle, F as Figure } from "../../../../chunks/Figure.js";
import { H as Heading } from "../../../../chunks/Heading.js";
import { C as Card } from "../../../../chunks/Card.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import "../../../../chunks/core.js";
import { P as Pagination_1, B as Body } from "../../../../chunks/Pagination.js";
import { e as indexData, f as resolveChannel, h as isDataRecord, R as RAW_VALUE, I as INDEX, g as getPlotDefaults, s as sort, j as recordizeX, M as Mark_1, G as GroupMultiple, k as RectPath, l as maybeInterval, C as CanvasLayer, n as callWithProps, o as recordize, c as Anchor, d as resolveProp, b as resolveStyles, p as GEOJSON_PREFER_STROKE, q as groupFacetsAndZ, t as projectXY, P as Plot_1, L as LineY } from "../../../../chunks/HTMLTooltip.svelte_svelte_type_style_lang.js";
import "interval-tree-1d";
import { geoPath, geoGraticule } from "d3-geo";
import "maplibre-gl";
import { F as Factory } from "../../../../chunks/Factory.js";
import { stack, stackOffsetSilhouette, stackOffsetExpand, stackOffsetWiggle, stackOffsetDiverging, stackOrderInsideOut, stackOrderAppearance, stackOrderAscending, stackOrderNone } from "d3-shape";
import { groups, range } from "d3-array";
import { quadtree } from "d3-quadtree";
function UsersThree($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M164.38,181.1a52,52,0,1,0-72.76,0,75.89,75.89,0,0,0-30,28.89,12,12,0,0,0,20.78,12,53,53,0,0,1,91.22,0,12,12,0,1,0,20.78-12A75.89,75.89,0,0,0,164.38,181.1ZM100,144a28,28,0,1,1,28,28A28,28,0,0,1,100,144Zm147.21,9.59a12,12,0,0,1-16.81-2.39c-8.33-11.09-19.85-19.59-29.33-21.64a12,12,0,0,1-1.82-22.91,20,20,0,1,0-24.78-28.3,12,12,0,1,1-21-11.6,44,44,0,1,1,73.28,48.35,92.18,92.18,0,0,1,22.85,21.69A12,12,0,0,1,247.21,153.59Zm-192.28-24c-9.48,2.05-21,10.55-29.33,21.65A12,12,0,0,1,6.41,136.79,92.37,92.37,0,0,1,29.26,115.1a44,44,0,1,1,73.28-48.35,12,12,0,1,1-21,11.6,20,20,0,1,0-24.78,28.3,12,12,0,0,1-1.82,22.91Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M168,144a40,40,0,1,1-40-40A40,40,0,0,1,168,144ZM64,56A32,32,0,1,0,96,88,32,32,0,0,0,64,56Zm128,0a32,32,0,1,0,32,32A32,32,0,0,0,192,56Z" opacity="0.2"></path><path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1,0-16,24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.85,8,57,57,0,0,0-98.15,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M243.6,148.8a6,6,0,0,1-8.4-1.2A53.58,53.58,0,0,0,192,126a6,6,0,0,1,0-12,26,26,0,1,0-25.18-32.5,6,6,0,0,1-11.62-3,38,38,0,1,1,59.91,39.63A65.69,65.69,0,0,1,244.8,140.4,6,6,0,0,1,243.6,148.8ZM189.19,213a6,6,0,0,1-2.19,8.2,5.9,5.9,0,0,1-3,.81,6,6,0,0,1-5.2-3,59,59,0,0,0-101.62,0,6,6,0,1,1-10.38-6A70.1,70.1,0,0,1,103,182.55a46,46,0,1,1,50.1,0A70.1,70.1,0,0,1,189.19,213ZM128,178a34,34,0,1,0-34-34A34,34,0,0,0,128,178ZM70,120a6,6,0,0,0-6-6A26,26,0,1,1,89.18,81.49a6,6,0,1,0,11.62-3,38,38,0,1,0-59.91,39.63A65.69,65.69,0,0,0,11.2,140.4a6,6,0,1,0,9.6,7.2A53.58,53.58,0,0,1,64,126,6,6,0,0,0,70,120Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M237,147.44a4,4,0,0,1-5.48-1.4c-8.33-14-20.93-22-34.56-22a4,4,0,0,1-1.2-.2,36.76,36.76,0,0,1-3.8.2,4,4,0,0,1,0-8,28,28,0,1,0-27.12-35,4,4,0,0,1-7.75-2,36,36,0,1,1,54,39.48c10.81,3.85,20.51,12,27.31,23.48A4,4,0,0,1,237,147.44ZM187.46,214a4,4,0,0,1-1.46,5.46,3.93,3.93,0,0,1-2,.54,4,4,0,0,1-3.46-2,61,61,0,0,0-105.08,0,4,4,0,0,1-6.92-4,68.35,68.35,0,0,1,39.19-31,44,44,0,1,1,40.54,0A68.35,68.35,0,0,1,187.46,214ZM128,180a36,36,0,1,0-36-36A36,36,0,0,0,128,180ZM64,116A28,28,0,1,1,91.12,81a4,4,0,0,0,7.75-2A36,36,0,1,0,45.3,118.75,63.55,63.55,0,0,0,12.8,141.6a4,4,0,0,0,6.4,4.8A55.55,55.55,0,0,1,64,124a4,4,0,0,0,0-8Z"></path>`);
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
function Fire($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M177.62,159.6a52,52,0,0,1-34,34,12.2,12.2,0,0,1-3.6.55,12,12,0,0,1-3.6-23.45,28,28,0,0,0,18.32-18.32,12,12,0,0,1,22.9,7.2ZM220,144a92,92,0,0,1-184,0c0-28.81,11.27-58.18,33.48-87.28a12,12,0,0,1,17.9-1.33L107.07,74.5,127,19.89a12,12,0,0,1,18.94-5.12C168.2,33.25,220,82.85,220,144Zm-24,0c0-41.71-30.61-78.39-52.52-99.29l-20.21,55.4a12,12,0,0,1-19.63,4.5L80.71,82.36C67,103.38,60,124.06,60,144a68,68,0,0,0,136,0Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M208,144a80,80,0,0,1-160,0c0-30.57,14.42-58.26,31-80l33,32,26.27-72C159.86,41.92,208,88.15,208,144Z" opacity="0.2"></path><path d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M181.92,153A55.58,55.58,0,0,1,137,197.92a7,7,0,0,1-1,.08,6,6,0,0,1-1-11.92c17.38-2.92,32.13-17.68,35.08-35.08a6,6,0,1,1,11.84,2ZM214,144a86,86,0,0,1-172,0c0-27.47,10.85-55.61,32.25-83.64a6,6,0,0,1,9-.67l26.34,25.56,23.09-63.31a6,6,0,0,1,9.47-2.56C163.72,37.33,214,85.4,214,144Zm-12,0c0-48.4-38.65-89.84-61.07-109.8L117.64,98.06a6,6,0,0,1-9.82,2.25l-28-27.22C62.67,97.13,54,121,54,144a74,74,0,0,0,148,0Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M179.94,152.67a53.51,53.51,0,0,1-43.28,43.27,3.68,3.68,0,0,1-.66.06,4,4,0,0,1-.66-7.94c18.18-3.06,33.63-18.51,36.72-36.73a4,4,0,0,1,7.88,1.34ZM212,144a84,84,0,0,1-168,0c0-27,10.71-54.75,31.84-82.43a4,4,0,0,1,6-.44l28.55,27.7,24.15-66.2a4,4,0,0,1,6.31-1.71C162.22,38.69,212,86.24,212,144Zm-8,0c0-50.82-41.73-93.91-63.94-113.23l-24.3,66.6a4,4,0,0,1-6.55,1.5L79.5,70C61.25,95.07,52,119.93,52,144a76,76,0,0,0,152,0Z"></path>`);
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
const S = {
  x: Symbol("x"),
  x1: Symbol("x1"),
  x2: Symbol("x2"),
  y: Symbol("y"),
  y1: Symbol("y1"),
  y2: Symbol("y2")
};
const GROUP = Symbol("group");
const FACET = Symbol("facet");
const DEFAULT_STACK_OPTIONS = {
  order: null,
  offset: null,
  reverse: false
};
const STACK_ORDER = {
  // null
  // TODO: value: ,
  none: stackOrderNone,
  sum: stackOrderAscending,
  appearance: stackOrderAppearance,
  "inside-out": stackOrderInsideOut
};
const STACK_OFFSET = {
  none: null,
  diverging: stackOffsetDiverging,
  wiggle: stackOffsetWiggle,
  center: stackOffsetSilhouette,
  normalize: stackOffsetExpand
};
function stackXY(byDim, data, channels, options) {
  const groupFacetsBy = [
    channels.fx != null ? "fx" : null,
    channels.fy != null ? "fy" : null
  ].filter((d) => d !== null);
  const groupBy = channels.z ? "z" : channels.fill ? "fill" : channels.stroke ? "stroke" : true;
  const secondDim = channels.y1 != null ? "y1" : "y";
  const byLow = `${byDim}1`;
  const byHigh = `${byDim}2`;
  if (channels[byDim] != null && channels[`${byLow}`] === void 0 && channels[`${byHigh}`] === void 0) {
    const resolvedData = indexData(data).map((d, i) => ({
      ...isDataRecord(d) ? d : { [RAW_VALUE]: d },
      [S[secondDim]]: resolveChannel(secondDim, d, channels),
      [GROUP]: groupBy === true ? "G" : resolveChannel(groupBy, d, channels),
      [FACET]: groupFacetsBy.length > 0 ? groupFacetsBy.map((channel) => String(resolveChannel(channel, d, channels))).join("---") : "F",
      [S[byDim]]: resolveChannel(byDim, d, channels)
    }));
    const out = [];
    const groups$1 = groups(resolvedData, (d) => d[FACET]);
    for (const [, facetData] of groups$1) {
      let keys;
      const groupedBySecondDim = groups(facetData, (d) => d[S[secondDim]]);
      let stackData;
      const hasUniqueGroups = groupBy !== true && groupedBySecondDim.every(([, items]) => {
        const groupSet = new Set(items.map((d) => d[GROUP]));
        return groupSet.size === items.length;
      });
      if (groupBy === true || !hasUniqueGroups) {
        let maxKeys = 0;
        stackData = groupedBySecondDim.map(([k, items]) => {
          const values = items.map((d) => ({ i: d[INDEX], v: d[S[byDim]] }));
          if (values.length > maxKeys)
            maxKeys = values.length;
          return values;
        });
        keys = range(maxKeys);
      } else {
        const keySet = new Set(facetData.map((d) => d[GROUP]));
        stackData = groupedBySecondDim.map(([k, items]) => {
          const obj = {};
          items.forEach((d) => {
            const key = d[GROUP];
            if (obj[key] == null)
              obj[key] = { i: d[INDEX], v: d[S[byDim]] };
            else
              obj[key] = {
                i: d[INDEX],
                v: obj[key].v + d[S[byDim]]
              };
          });
          return obj;
        });
        keys = Array.from(keySet);
      }
      const stackOrder = (series2) => {
        const f = STACK_ORDER[options.order || "none"];
        return options.reverse ? f(series2).reverse() : f(series2);
      };
      const series = stack().order(stackOrder).offset(groupBy === true && options.offset === "wiggle" ? STACK_OFFSET["center"] : STACK_OFFSET[options.offset]).keys(keys).value((d, key, i, data2) => {
        return d[key]?.v == null ? void 0 : d[key]?.v;
      })(stackData);
      const newData = series.flatMap((s) => s.map((d) => [d[0], d[1], d.data[s.key]?.i])).filter((d) => d[2] !== void 0).map((d) => ({ [S[byLow]]: d[0], [S[byHigh]]: d[1], ...resolvedData[d[2]] }));
      out.push(...newData);
    }
    return {
      data: out,
      ...channels,
      [byDim]: void 0,
      ...typeof channels[byDim] === "string" && !channels[`__${byDim}_origField`] ? { [`__${byDim}_origField`]: channels[byDim] } : {},
      ...{ [byLow]: S[byLow], [byHigh]: S[byHigh] }
    };
  }
  return { data, ...channels };
}
function stackX({ data, ...channels }, opts = {}) {
  return stackXY("x", data, channels, applyDefaults(opts));
}
function applyDefaults(opts) {
  if (opts.offset === "wiggle" && opts.order === void 0) {
    return { ...DEFAULT_STACK_OPTIONS, order: "inside-out", ...opts };
  }
  return { ...DEFAULT_STACK_OPTIONS, ...opts };
}
function BarX($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const DEFAULTS = {
      fill: "currentColor",
      ...getPlotDefaults().bar,
      ...getPlotDefaults().barX
    };
    let { $$slots, $$events, ...markProps } = $$props;
    const { data = [{}], class: className = null, stack: stack2, ...options } = { ...DEFAULTS, ...markProps };
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const args = stackX(
      intervalX(
        // by default, sort by y channel (the ordinal labels)
        sort(recordizeX({ data, sort: { channel: "y" }, ...options })),
        { plot }
      ),
      stack2
    );
    {
      let children = function($$renderer3, { mark, usedScales, scaledData }) {
        GroupMultiple($$renderer3, {
          class: "bar-x",
          length: scaledData.length,
          children: ($$renderer4) => {
            $$renderer4.push(`<!--[-->`);
            const each_array = ensure_array_like(scaledData);
            for (let i = 0, $$length = each_array.length; i < $$length; i++) {
              let d = each_array[i];
              const bw = plot.scales.y.fn.bandwidth();
              const minx = Math.min(d.x1, d.x2);
              const maxx = Math.max(d.x1, d.x2);
              if (d.valid) {
                $$renderer4.push("<!--[-->");
                RectPath($$renderer4, {
                  usedScales,
                  class: className,
                  options,
                  datum: d,
                  x: minx,
                  useInsetAsFallbackHorizontally: false,
                  y: d.y - bw * 0.5,
                  width: maxx - minx,
                  height: bw
                });
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]-->`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
      };
      Mark_1($$renderer2, spread_props([
        {
          type: "barX",
          requiredScales: { y: ["band"] },
          channels: [
            "x1",
            "x2",
            "y",
            "fill",
            "stroke",
            "opacity",
            "fillOpacity",
            "strokeOpacity"
          ]
        },
        args,
        { children, $$slots: { default: true } }
      ]));
    }
  });
}
function intervalX(args, { plot }) {
  return interval("x", plot, args);
}
function interval(dim, plot, { data, ...options }) {
  if (options.interval && options[dim] && options[`${dim}1`] == null && options[`${dim}2`] == null) {
    const interval2 = maybeInterval(options.interval, plot.scales[dim].type);
    const newData = data.map((row) => {
      const val = resolveChannel(dim, row, options);
      return {
        ...row,
        [`__${dim}1`]: interval2.floor(val),
        [`__${dim}2`]: interval2.offset(interval2.floor(val))
      };
    });
    return {
      data: newData,
      // set default inset
      [`inset${"Right"}`]: 1,
      ...options,
      [`${dim}1`]: `__${dim}1`,
      [`${dim}2`]: `__${dim}2`
    };
  }
  return { data, ...options };
}
function GeoCanvas($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { getPlotState } = getContext("svelteplot");
    getPlotState();
    CanvasLayer($$renderer2, {});
  });
}
function Geo($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    let { $$slots, $$events, ...markProps } = $$props;
    const DEFAULTS = { ...getPlotDefaults().geo };
    const {
      data = [{}],
      canvas = false,
      geoType,
      dragRotate,
      class: className = "",
      ...options
    } = { ...DEFAULTS, ...markProps };
    const path = callWithProps(geoPath, [plot.scales.projection], {
      ...options.r ? {
        pointRadius: (d) => plot.scales.r.fn(resolveChannel("r", d, options))
      } : { pointRadius: 3 }
    });
    const args = sort(recordize({
      data,
      ...options.r ? { sort: { channel: "-r" } } : {},
      ...options
    }));
    {
      let children = function($$renderer3, { mark, scaledData, usedScales }) {
        $$renderer3.push(`<g aria-label="geo"${attr_class(clsx(["geo", geoType && `geo-${geoType}`, className]))} style="fill:currentColor">`);
        if (canvas) {
          $$renderer3.push("<!--[-->");
          GeoCanvas($$renderer3);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(scaledData);
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let d = each_array[i];
            if (d.valid) {
              $$renderer3.push("<!--[-->");
              Anchor($$renderer3, {
                options,
                datum: d.datum,
                children: ($$renderer4) => {
                  const title = resolveProp(args.title, d.datum, "");
                  const geometry = resolveProp(args.geometry, d.datum, d.datum);
                  const [style, styleClass] = resolveStyles(plot, d, args, GEOJSON_PREFER_STROKE.has(geometry.type) ? "stroke" : "fill", usedScales);
                  $$renderer4.push(`<path${attr("d", path(geometry))}${attr_style(style)}${attr_class(clsx([styleClass]))}>`);
                  if (title) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<title>${escape_html(title)}</title>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--></path>`);
                }
              });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></g>`);
      };
      Mark_1($$renderer2, spread_props([
        {
          type: "geo",
          channels: [
            "fill",
            "stroke",
            "opacity",
            "fillOpacity",
            "strokeOpacity",
            "r"
          ]
        },
        args,
        { children, $$slots: { default: true } }
      ]));
    }
  });
}
function Graticule($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...markProps } = $$props;
    const DEFAULTS = { step: 10, ...getPlotDefaults().graticule };
    const { class: className = "", ...options } = { ...DEFAULTS, ...markProps };
    const graticule = (() => {
      const graticule2 = geoGraticule();
      graticule2.stepMinor([
        options.stepX ?? options.step ?? DEFAULTS.step,
        options.stepY ?? options.step ?? DEFAULTS.step
      ]);
      return graticule2;
    })();
    Geo($$renderer2, spread_props([{ data: [graticule()] }, options, { geoType: "graticule" }]));
  });
}
function Pointer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const POINTER_X = Symbol("pointerX");
    const POINTER_Y = Symbol("pointerY");
    let { $$slots, $$events, ...markProps } = $$props;
    const DEFAULTS = { ...getPlotDefaults().pointer };
    const {
      data = [{}],
      children,
      x,
      y,
      z,
      fx,
      fy
    } = { ...DEFAULTS, ...markProps };
    let selectedData = [];
    const groups2 = (() => {
      const groups3 = [];
      groupFacetsAndZ(indexData(data), { x, y, z, fx, fy }, (d) => groups3.push(d));
      return groups3;
    })();
    groups2.map((items) => quadtree().x(x != null ? (d) => d[POINTER_X] : () => 0).y(y != null ? (d) => d[POINTER_Y] : () => 0).addAll(items?.map((d) => {
      const [px, py] = projectXY(plot.scales, resolveChannel("x", d, { x }), resolveChannel("y", d, { y }), true, true);
      return {
        ...isDataRecord(d) ? d : { [RAW_VALUE]: d },
        [POINTER_X]: px,
        [POINTER_Y]: py
      };
    }) ?? []));
    if (children) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<g class="pointer">`);
      children($$renderer2, { data: selectedData });
      $$renderer2.push(`<!----></g>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Sphere($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...markProps } = $$props;
    const DEFAULTS = { ...getPlotDefaults().sphere };
    const { ...options } = { ...DEFAULTS, ...markProps };
    Geo($$renderer2, spread_props([
      { data: [{ type: "Sphere" }] },
      options,
      { geoType: "sphere" }
    ]));
  });
}
function MultilineText($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const LINE_ANCHOR = { bottom: "auto", middle: "central", top: "hanging" };
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    let { textLines, d, args, usedScales } = $$props;
    const title = resolveProp(args.title, d.datum, "");
    const frameAnchor = resolveProp(args.frameAnchor, d.datum);
    const isLeft = frameAnchor === "left" || frameAnchor === "top-left" || frameAnchor === "bottom-left";
    const isRight = frameAnchor === "right" || frameAnchor === "top-right" || frameAnchor === "bottom-right";
    const isTop = frameAnchor === "top" || frameAnchor === "top-left" || frameAnchor === "top-right";
    const isBottom = frameAnchor === "bottom" || frameAnchor === "bottom-left" || frameAnchor === "bottom-right";
    const lineAnchor = resolveProp(args.lineAnchor, d.datum, args.y != null ? "middle" : isTop ? "top" : isBottom ? "bottom" : "middle");
    const textClassName = resolveProp(args.textClass, d.datum, null);
    const [x, y] = args.x != null && args.y != null ? [d.x, d.y] : [
      args.x != null ? d.x : (isLeft ? plot.options.marginLeft : isRight ? plot.options.marginLeft + plot.facetWidth : plot.options.marginLeft + plot.facetWidth * 0.5) + (d.dx ?? 0),
      args.y != null ? d.y : (isTop ? plot.options.marginTop : isBottom ? plot.options.marginTop + plot.facetHeight : plot.options.marginTop + plot.facetHeight * 0.5) + (d.dy ?? 0)
    ];
    const [style, styleClass] = resolveStyles(
      plot,
      { ...d, __tspanIndex: 0 },
      {
        fontSize: 12,
        fontWeight: 500,
        strokeWidth: 1.6,
        textAnchor: isLeft ? "start" : isRight ? "end" : "middle",
        ...args
      },
      "fill",
      usedScales
    );
    const fontSize = textLines.length > 1 ? resolveProp(args.fontSize, d.datum) ?? 12 : 0;
    const computedFontSize = fontSize;
    const lineHeight = textLines.length > 1 ? resolveProp(args.lineHeight, d.datum) ?? 1.2 : 0;
    const rotate = +resolveProp(args.rotate, d.datum, 0);
    if (textLines.length > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<text${attr_class(clsx([textClassName]), "svelte-1n4f8aw")}${attr("dominant-baseline", LINE_ANCHOR[lineAnchor])}${attr("transform", `translate(${stringify(Math.round(x))},${stringify(Math.round(y - (lineAnchor === "bottom" ? textLines.length - 1 : lineAnchor === "middle" ? (textLines.length - 1) * 0.5 : 0) * computedFontSize * lineHeight))}) rotate(${stringify(rotate)})`)}><!--[-->`);
      const each_array = ensure_array_like(textLines);
      for (let l = 0, $$length = each_array.length; l < $$length; l++) {
        let line = each_array[l];
        $$renderer2.push(`<tspan x="0"${attr("dy", l ? computedFontSize * lineHeight : 0)}${attr_class(clsx(styleClass))}${attr_style(style)}>${escape_html(line)}</tspan>`);
      }
      $$renderer2.push(`<!--]-->`);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<title>${escape_html(title)}</title>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></text>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<text${attr_class(clsx([textClassName, styleClass]), "svelte-1n4f8aw")}${attr("dominant-baseline", LINE_ANCHOR[lineAnchor])}${attr("transform", `translate(${stringify(Math.round(x))},${stringify(Math.round(y))}) rotate(${stringify(rotate)})`)}${attr_style(style)}>${escape_html(textLines[0])}`);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<title>${escape_html(title)}</title>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></text>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Text($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const DEFAULTS = {
      fontSize: 12,
      c: 500,
      strokeWidth: 1.6,
      frameAnchor: "middle",
      lineHeight: 1.1,
      rotate: 0,
      ...getPlotDefaults().text
    };
    let { $$slots, $$events, ...markProps } = $$props;
    const { data = [{}], class: className = "", ...options } = { ...DEFAULTS, ...markProps };
    const args = sort({ data: indexData(data), ...options });
    {
      let children = function($$renderer3, { mark, scaledData, usedScales }) {
        GroupMultiple($$renderer3, {
          class: `text ${stringify(className)}`,
          length: className ? 2 : args.data.length,
          children: ($$renderer4) => {
            $$renderer4.push(`<!--[-->`);
            const each_array = ensure_array_like(scaledData);
            for (let i = 0, $$length = each_array.length; i < $$length; i++) {
              let d = each_array[i];
              if (d.valid) {
                $$renderer4.push("<!--[-->");
                const textLines = String(resolveProp(args.text, d.datum, "")).split("\n");
                MultilineText($$renderer4, { textLines, d, args, usedScales });
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]-->`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
      };
      Mark_1($$renderer2, spread_props([
        {
          type: "text",
          channels: [
            "x",
            "y",
            "r",
            "symbol",
            "fill",
            "stroke",
            "opacity",
            "strokeOpacity",
            "fillOpacity"
          ],
          required: []
        },
        args,
        { children, $$slots: { default: true } }
      ]));
    }
  });
}
function Map$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="relative w-full h-full min-h-[400px] svelte-1bzu6h5">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="pulsing absolute rounded-field border-2 border-primary pointer-events-none inset-0 svelte-1bzu6h5"></div>`);
    }
    $$renderer2.push(`<!--]--> <div id="map" class="h-full w-full min-h-[400px] border border-subtle rounded-field svelte-1bzu6h5"></div></div>`);
  });
}
function Campfire($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M227.51,227.4A12,12,0,0,1,216,236a12.15,12.15,0,0,1-3.4-.49l-84.6-25-84.6,25A12.15,12.15,0,0,1,40,236a12,12,0,0,1-3.4-23.51L85.65,198,36.6,183.51a12,12,0,0,1,6.8-23l84.6,25,84.6-25a12,12,0,1,1,6.8,23L170.35,198l49.05,14.49A12,12,0,0,1,227.51,227.4ZM64,104c0-50.59,55.93-81.28,58.31-82.57a12,12,0,0,1,11.38,0C136.07,22.72,192,53.41,192,104a64,64,0,0,1-128,0Zm64,40a12,12,0,0,0,12-12c0-6.47-2.71-12.55-8-18.07a41.26,41.26,0,0,0-4-3.57,42.49,42.49,0,0,0-4,3.57c-5.33,5.52-8,11.6-8,18.07A12,12,0,0,0,128,144ZM88,104a39.78,39.78,0,0,0,4.85,19.08c4.81-25,28.66-37.25,29.78-37.81a12,12,0,0,1,10.74,0c1.12.56,25,12.78,29.78,37.81A39.78,39.78,0,0,0,168,104c0-28.34-27.74-49.81-40-57.92C115.75,54.18,88,75.66,88,104Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M180,108a52,52,0,0,1-52,52,24,24,0,0,0,24-24c0-24-24-40-24-40s-24,16-24,40a24,24,0,0,0,24,24,52,52,0,0,1-52-52c0-44,52-76,52-76S180,64,180,108Z" opacity="0.2"></path><path d="M128,168a60.07,60.07,0,0,0,60-60c0-47.92-53.53-81.41-55.81-82.81a8,8,0,0,0-8.38,0A156,156,0,0,0,96.24,48C77.77,67.13,68,87.9,68,108A60.07,60.07,0,0,0,128,168Zm-16-32c0-13.57,10-24.46,16-29.79,6,5.33,16,16.22,16,29.79a16,16,0,0,1-32,0Zm16-94.34C139.74,50,172,76,172,108a43.83,43.83,0,0,1-12.09,30.24c.05-.74.09-1.49.09-2.24,0-28-26.44-45.91-27.56-46.66a8,8,0,0,0-8.88,0C122.44,90.09,96,108,96,136c0,.75,0,1.5.09,2.24A43.83,43.83,0,0,1,84,108C84,76,116.27,50,128,41.66Zm95.62,184.76a8,8,0,0,1-10.05,5.2L128,204.39,42.43,231.62a8,8,0,1,1-4.85-15.25l64-20.37-64-20.38a8,8,0,1,1,4.85-15.24L128,187.6l85.57-27.22a8,8,0,1,1,4.85,15.24l-64,20.38,64,20.37A8,8,0,0,1,223.62,226.42Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M132.19,25.19a8,8,0,0,0-8.38,0A156,156,0,0,0,96.24,48C77.77,67.13,68,87.9,68,108a60,60,0,0,0,120,0C188,60.08,134.47,26.59,132.19,25.19ZM128,152a24,24,0,0,1-24-24c0-24,24-40,24-40s24,16,24,40A24,24,0,0,1,128,152Zm95.62,74.42a8,8,0,0,1-10.05,5.2L128,204.39,42.43,231.62a8,8,0,1,1-4.85-15.25l64-20.37-64-20.38a8,8,0,1,1,4.85-15.24L128,187.6l85.57-27.22a8,8,0,1,1,4.85,15.24l-64,20.38,64,20.37A8,8,0,0,1,223.62,226.42Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M221.72,225.82a6,6,0,0,1-7.54,3.9L128,202.3,41.82,229.72a6,6,0,1,1-3.64-11.44l70-22.28-70-22.28a6,6,0,1,1,3.64-11.44L128,189.7l86.18-27.42a6,6,0,1,1,3.64,11.44l-70,22.28,70,22.28A6,6,0,0,1,221.72,225.82ZM70,108c0-46.81,52.62-79.73,54.86-81.11a6,6,0,0,1,6.28,0C133.38,28.27,186,61.19,186,108a58,58,0,0,1-116,0Zm58,46a18,18,0,0,0,18-18c0-15.48-12-27.43-18-32.44-6,5-18,17-18,32.44A18,18,0,0,0,128,154ZM82,108a45.93,45.93,0,0,0,17,35.67A29.87,29.87,0,0,1,98,136c0-26.9,25.58-44.27,26.67-45a6,6,0,0,1,6.66,0c1.09.72,26.67,18.09,26.67,45a29.87,29.87,0,0,1-1,7.67A45.93,45.93,0,0,0,174,108c0-34.06-35.15-61.22-46-68.78C117.15,46.78,82,73.93,82,108Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M223.62,226.42a8,8,0,0,1-10.05,5.2L128,204.39,42.43,231.62a8,8,0,1,1-4.85-15.25l64-20.37-64-20.38a8,8,0,1,1,4.85-15.24L128,187.6l85.57-27.22a8,8,0,1,1,4.85,15.24l-64,20.38,64,20.37A8,8,0,0,1,223.62,226.42ZM68,108c0-20.1,9.77-40.87,28.24-60a156,156,0,0,1,27.57-22.76,8,8,0,0,1,8.38,0C134.47,26.59,188,60.08,188,108a60,60,0,0,1-120,0Zm60,44a16,16,0,0,0,16-16c0-13.57-10-24.46-16-29.79-6,5.33-16,16.22-16,29.79A16,16,0,0,0,128,152ZM84,108a43.83,43.83,0,0,0,12.09,30.24c0-.74-.09-1.49-.09-2.24,0-28,26.44-45.91,27.56-46.66a8,8,0,0,1,8.88,0C133.56,90.09,160,108,160,136c0,.75,0,1.5-.09,2.24A43.83,43.83,0,0,0,172,108c0-32-32.26-58-44-66.34C116.27,50,84,76,84,108Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M219.81,225.21A4,4,0,0,1,216,228a3.92,3.92,0,0,1-1.21-.19L128,200.2,41.21,227.81A3.92,3.92,0,0,1,40,228a4,4,0,0,1-1.21-7.81l76-24.19-76-24.19a4,4,0,1,1,2.42-7.62L128,191.8l86.79-27.61a4,4,0,1,1,2.42,7.62l-76,24.19,76,24.19A4,4,0,0,1,219.81,225.21ZM72,108c0-19,9.38-38.85,27.12-57.27A152,152,0,0,1,125.9,28.59a4,4,0,0,1,4.2,0,152,152,0,0,1,26.78,22.14C174.62,69.15,184,89,184,108a56,56,0,0,1-54.56,56c-.48,0-1,0-1.44,0s-1,0-1.44,0A56,56,0,0,1,72,108Zm56,48a20,20,0,0,0,20-20c0-17.39-14.37-30.53-20-35-5.63,4.48-20,17.62-20,35A20,20,0,0,0,128,156ZM80,108a48,48,0,0,0,23.28,41.13A27.83,27.83,0,0,1,100,136c0-25.84,24.73-42.63,25.78-43.33a4,4,0,0,1,4.44,0c1.05.7,25.78,17.49,25.78,43.33a27.83,27.83,0,0,1-3.28,13.13A48,48,0,0,0,176,108c0-36.37-38.49-64.76-48-71.21C118.5,43.25,80,71.68,80,108Z"></path>`);
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
function SourcesTable($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { countryName, globeSources } = $$props;
    const ITEMS_PER_PAGE = 10;
    let currentPage = 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentSources = globeSources.slice(startIndex, endIndex);
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      {
        let title = function($$renderer4) {
          $$renderer4.push(`<div class="flex items-center gap-2">`);
          Campfire($$renderer4, { size: 24, weight: "fill", class: "text-primary" });
          $$renderer4.push(`<!----> `);
          Heading($$renderer4, {
            size: "h3",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Top Emission Sources in ${escape_html(countryName)}`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----></div>`);
        }, content = function($$renderer4) {
          $$renderer4.push(`<div class="flex flex-col gap-4"><div class="overflow-x-auto"><table class="table table-zebra"><thead><tr><th class="text-right w-20">#</th><th>Source Name</th><th>Sector</th><th>Subsector</th><th class="text-right">Emissions</th></tr></thead><tbody><!--[-->`);
          const each_array = ensure_array_like(currentSources);
          for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
            let source = each_array[idx];
            $$renderer4.push(`<tr class="hover"><td class="text-muted font-mono text-right">${escape_html(source.id)}</td><td><a${attr("href", `/source/${stringify(source.id)}`)} class="link link-hover">${escape_html(source.name)}</a></td><td class="text-muted">${escape_html(formatSector(source.sector))}</td><td class="text-muted">${escape_html(formatSector(source.subsector))}</td><td class="text-right tabular-nums">${escape_html(fN(source.emissionsQuantity))}</td></tr>`);
          }
          $$renderer4.push(`<!--]--></tbody></table></div> <div class="flex justify-end mr-4 mb-4">`);
          Pagination_1($$renderer4, {
            count: globeSources.length,
            perPage: ITEMS_PER_PAGE,
            get page() {
              return currentPage;
            },
            set page($$value) {
              currentPage = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div></div>`);
        };
        Card($$renderer3, {
          class: "col-span-full",
          title,
          content
        });
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
function GeoSources($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { countryCode } = $$props;
    let sources = [];
    const rotate = [0, 0, 0];
    let globeSources = (() => {
      if (!sources) return [];
      return sources.filter((s) => s.centroid.latitude !== null && s.centroid.longitude !== null && s.centroid.latitude !== void 0 && s.centroid.longitude !== void 0).map((s) => ({
        id: s.id,
        name: s.name,
        lat: s.centroid.latitude,
        lon: s.centroid.longitude,
        emissionsQuantity: s.emissions.reduce((sum, e) => sum + e.emissionsQuantity, 0),
        sector: s.sector,
        subsector: s.subsector
      }));
    })();
    let centerCoords = (() => {
      if (globeSources.length === 0) return { lat: 0, lon: 0 };
      const avgLat = globeSources.reduce((sum, s) => sum + s.lat, 0) / globeSources.length;
      const avgLon = globeSources.reduce((sum, s) => sum + s.lon, 0) / globeSources.length;
      return { lat: avgLat, lon: avgLon };
    })();
    function convertToGeoJSON(data) {
      return {
        type: "FeatureCollection",
        features: data.map((item) => ({
          type: "Feature",
          geometry: { type: "Point", coordinates: [item.lon, item.lat] },
          properties: {
            id: item.id,
            name: item.name,
            emissionsQuantity: item.emissionsQuantity
          }
        }))
      };
    }
    {
      let title = function($$renderer3) {
        $$renderer3.push(`<div class="flex items-center gap-2">`);
        Fire($$renderer3, { size: 24, weight: "fill", class: "text-primary" });
        $$renderer3.push(`<!----> `);
        Heading($$renderer3, {
          size: "h3",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Sources Map`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      }, content = function($$renderer3) {
        if (globeSources.length === 0) {
          $$renderer3.push("<!--[-->");
          Plot_1($$renderer3, {
            inset: 2,
            projection: { type: "orthographic", rotate },
            children: ($$renderer4) => {
              Sphere($$renderer4, { stroke: "currentColor" });
              $$renderer4.push(`<!----> `);
              Graticule($$renderer4, { strokeOpacity: 0.3, stepX: 10, stepY: 5 });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
        } else {
          $$renderer3.push("<!--[!-->");
          if (globeSources.length > 0) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="px-4 py-2">`);
            Map$1($$renderer3, {
              initialLat: centerCoords.lat,
              initialLon: centerCoords.lon,
              data: convertToGeoJSON(globeSources)
            });
            $$renderer3.push(`<!----></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<div class="relative flex items-center justify-center h-full"><div class="absolute inset-0 opacity-10">`);
            Plot_1($$renderer3, {
              inset: 2,
              projection: { type: "orthographic", rotate },
              children: ($$renderer4) => {
                Sphere($$renderer4, { stroke: "currentColor" });
                $$renderer4.push(`<!----> `);
                Graticule($$renderer4, { strokeOpacity: 0.3, stepX: 10, stepY: 5 });
                $$renderer4.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push(`<!----></div> `);
            Heading($$renderer3, {
              size: "h3",
              class: "font-semibold",
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->Couln't find any emission sources for ${escape_html(countryCode)}`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push(`<!----></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]-->`);
      }, footnote = function($$renderer3) {
        Body($$renderer3, {
          size: "12",
          class: "text-muted text-center",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->${escape_html(globeSources.length > 0 ? "Streaming" : "")}
			${escape_html(globeSources.length == 0 ? "Loading" : globeSources.length)} emission sources over ${escape_html(countryCode)}`);
          },
          $$slots: { default: true }
        });
      };
      Card($$renderer2, {
        title,
        content,
        footnote
      });
    }
    $$renderer2.push(`<!----> `);
    if (globeSources.length > 0) {
      $$renderer2.push("<!--[-->");
      SourcesTable($$renderer2, { globeSources, countryName: countryCode });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function GlobalRankings($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { rankingsContext, countryName } = $$props;
    if (rankingsContext.length > 0) {
      $$renderer2.push("<!--[-->");
      {
        let title = function($$renderer3) {
          $$renderer3.push(`<div class="flex items-center gap-2">`);
          Trophy($$renderer3, { size: 18, weight: "fill", class: "text-primary" });
          $$renderer3.push(`<!----> `);
          Heading($$renderer3, {
            size: "h3",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Global Rankings`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----></div>`);
        }, content = function($$renderer3) {
          $$renderer3.push(`<div class="overflow-x-auto"><table class="table table-sm"><thead><tr><th class="w-16">Rank</th><th>Country</th><th class="text-right">Total</th><th class="text-right">Per Capita</th></tr></thead><tbody><!--[-->`);
          const each_array = ensure_array_like(rankingsContext);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let ranking = each_array[$$index];
            $$renderer3.push(`<tr${attr_class(clsx(ranking.isCurrentCountry ? "bg-primary/10 font-semibold" : ""))}><td class="text-center">`);
            if (ranking.isCurrentCountry) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<div class="badge badge-primary badge-sm">${escape_html(ranking.rank)}</div>`);
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push(`${escape_html(ranking.rank)}`);
            }
            $$renderer3.push(`<!--]--></td><td class="truncate max-w-[120px]">${escape_html(ranking.name)}</td><td class="text-right tabular-nums text-xs">${escape_html(fN(ranking.emissionsQuantity))}</td><td class="text-right tabular-nums text-xs">${escape_html(fN(ranking.emissionsPerCapita))}</td></tr>`);
          }
          $$renderer3.push(`<!--]--></tbody></table></div>`);
        }, footnote = function($$renderer3) {
          Body($$renderer3, {
            size: "12",
            class: "mt-2 text-muted",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Showing ±3 countries around ${escape_html(countryName)}'s position`);
            },
            $$slots: { default: true }
          });
        };
        Card($$renderer2, {
          title,
          content,
          footnote
        });
      }
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function EmissionsBarChart($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, formatValue } = $$props;
    Plot_1($$renderer2, {
      height: 300,
      marginLeft: 100,
      marginRight: 30,
      marginBottom: 40,
      y: { domain: data.map((d) => d.sector), type: "band" },
      x: {
        grid: true,
        nice: true,
        tickFormat(d) {
          return formatValue(d.valueOf());
        }
      },
      children: ($$renderer3) => {
        BarX($$renderer3, {
          data,
          x: "emissions",
          y: "sector",
          sort: { channel: "-y" },
          fill: "var(--color-primary)",
          fillOpacity: 0.2,
          stroke: "var(--color-primary)",
          strokeWidth: 2
        });
      },
      $$slots: { default: true }
    });
  });
}
function TopEmissionSectors($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { topSectors } = $$props;
    if (topSectors.length > 0) {
      $$renderer2.push("<!--[-->");
      {
        let title = function($$renderer3) {
          $$renderer3.push(`<div class="flex items-center gap-2">`);
          Factory($$renderer3, { size: 24, weight: "fill", class: "text-primary" });
          $$renderer3.push(`<!----> `);
          Heading($$renderer3, {
            size: "h3",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Top Emission Sectors`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----></div>`);
        }, content = function($$renderer3) {
          $$renderer3.push(`<div class="px-4">`);
          EmissionsBarChart($$renderer3, {
            data: topSectors.map((s) => ({
              sector: formatSector(s.sector),
              emissions: s.emissionsQuantity
            })),
            formatValue: fN
          });
          $$renderer3.push(`<!----></div>`);
        }, footnote = function($$renderer3) {
          Body($$renderer3, {
            size: "12",
            class: "mt-2 text-muted",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Emissions in tonnes CO₂e`);
            },
            $$slots: { default: true }
          });
        };
        Card($$renderer2, {
          title,
          content,
          footnote
        });
      }
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function EmissionsTimeline($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { emissionsTimeseries, years } = $$props;
    if (emissionsTimeseries.length > 0) {
      $$renderer2.push("<!--[-->");
      {
        let title = function($$renderer3) {
          $$renderer3.push(`<div class="flex items-center gap-2">`);
          ChartLine($$renderer3, { size: 24, weight: "bold", class: "text-primary" });
          $$renderer3.push(`<!----> `);
          Heading($$renderer3, {
            size: "h3",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Emissions Timeline`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----></div>`);
        }, content = function($$renderer3) {
          $$renderer3.push(`<div class="px-4">`);
          Plot_1($$renderer3, {
            inset: 15,
            y: {
              grid: true,
              nice: true,
              tickFormat(d) {
                return fN(d.valueOf());
              }
            },
            x: {
              grid: true,
              nice: true,
              ticks: years,
              tickFormat(d) {
                return d.valueOf();
              }
            },
            children: ($$renderer4) => {
              LineY($$renderer4, {
                data: emissionsTimeseries,
                x: "year",
                y: "emissions",
                curve: "monotone-x",
                stroke: "var(--color-primary)",
                strokeDasharray: "2",
                strokeWidth: 2
              });
              $$renderer4.push(`<!----> `);
              Dot($$renderer4, {
                data: emissionsTimeseries,
                x: "year",
                y: "emissions",
                fill: "var(--color-primary)"
              });
              $$renderer4.push(`<!----> `);
              {
                let children = function($$renderer5, { data }) {
                  Text($$renderer5, {
                    data,
                    fill: "currentColor",
                    stroke: "var(--color-base-200)",
                    strokeWidth: 4,
                    x: "year",
                    class: "font-mono",
                    y: "emissions",
                    text: (d) => `${fN(d.emissions, 4, "compact")} t`,
                    fontSize: 12,
                    lineAnchor: "bottom",
                    fontWeight: "bold",
                    dy: -10
                  });
                };
                Pointer($$renderer4, {
                  data: emissionsTimeseries,
                  x: "year",
                  children,
                  $$slots: { default: true }
                });
              }
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----></div>`);
        }, footnote = function($$renderer3) {
          Body($$renderer3, {
            size: "12",
            class: "mt-2 text-muted",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Emissions in tonnes CO₂e`);
            },
            $$slots: { default: true }
          });
        };
        Card($$renderer2, {
          title,
          content,
          footnote
        });
      }
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.async(async ($$renderer3) => {
      let country = page.params.country;
      let data = (await save(getCountryData(country)))();
      let rankings = (await save(getAllRankings()))();
      const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
      let yearlyRankings = (await save(Promise.all(years.map((year) => import("../../../../chunks/index.js").then((mod) => mod.ct("getCountryRankings", { start: String(year), end: String(year) }))))))();
      let countryEmissions = (await save(getAggregatedEmissions({ gadmId: country, year: 2024 })))();
      let countryRankingIndex = rankings?.rankings.findIndex((r) => r.country === country) ?? -1;
      let rankingsContext = (() => {
        if (countryRankingIndex === -1 || !rankings) return [];
        const start = Math.max(0, countryRankingIndex - 3);
        const end = Math.min(rankings.rankings.length, countryRankingIndex + 4);
        return rankings.rankings.slice(start, end).map((r, idx) => ({
          ...r,
          rank: start + idx + 1,
          isCurrentCountry: r.country === country
        }));
      })();
      let emissionsTimeseries = (() => {
        return years.map((year, index) => {
          const ranking = yearlyRankings[index]?.rankings.find((r) => r.country === country);
          return { year, emissions: ranking?.emissionsQuantity || 0 };
        });
      })();
      let topSectors = (() => {
        if (!countryEmissions?.sectors?.summaries) return [];
        return countryEmissions.sectors.summaries.sort((a, b) => b.emissionsQuantity - a.emissionsQuantity).slice(0, 5);
      })();
      {
        $$renderer3.push("<!--[!-->");
        if (!data) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex min-h-[60vh] items-center justify-center"><div class="alert alert-error max-w-md">`);
          XCircle($$renderer3, { size: 24, weight: "bold" });
          $$renderer3.push(`<!----> <div>`);
          Heading($$renderer3, {
            size: "h3",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Country not found`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> <a href="/" class="link link-hover">Return to home</a></div></div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="py-section-y px-section-x"><div class="mb-4"><div class="breadcrumbs text-sm mb-2"><ul><li><a href="/" class="link link-hover">Home</a></li> <li>Countries</li> <li>${escape_html(data.name)}</li></ul></div> <div class="flex items-center gap-4">`);
          Heading($$renderer3, {
            size: "h1",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->${escape_html(data.name)}`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          if (data.subregion) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="badge badge-primary badge-lg">${escape_html(data.subregion)}</div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div> `);
          if (data.region) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<p class="text-lg opacity-70 mt-2">${escape_html(data.region)}</p>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 join-horizontal mb-2">`);
          Figure($$renderer3, {
            icon: Flame,
            title: "Emissions Per Capita",
            value: fN(data.emissionsPerCapita),
            subtitle: "tonnes CO₂e per person",
            color: "error"
          });
          $$renderer3.push(`<!----> `);
          Figure($$renderer3, {
            icon: UsersThree,
            title: "Population",
            value: fN(data.population),
            subtitle: "people",
            color: "info"
          });
          $$renderer3.push(`<!----> `);
          Figure($$renderer3, {
            icon: Globe,
            title: "Total Emissions",
            value: fN(data.totalEmissions),
            subtitle: "tonnes CO₂e",
            color: "warning"
          });
          $$renderer3.push(`<!----></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-8">`);
          GlobalRankings($$renderer3, { rankingsContext, countryName: data.name });
          $$renderer3.push(`<!----> `);
          TopEmissionSectors($$renderer3, { topSectors });
          $$renderer3.push(`<!----> `);
          EmissionsTimeline($$renderer3, { emissionsTimeseries, years });
          $$renderer3.push(`<!----> `);
          GeoSources($$renderer3, { countryCode: country, countryName: data.name });
          $$renderer3.push(`<!----></div></div>`);
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
