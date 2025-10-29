import "./async.js";
import { e as ensure_array_like, a as attr, k as attr_style, s as stringify, a8 as store_get, g as attr_class, a9 as unsubscribe_stores, m as bind_props, j as clsx, l as spread_props, i as element, h as attributes, y as source, x as get, a0 as set } from "./index3.js";
import { b as setContext, g as getContext, h as hasContext, e as escape_html } from "./context.js";
import { Z as SvelteMap } from "./use-id.js";
import { w as writable } from "./index4.js";
import { scaleBand, scaleOrdinal, scaleQuantile, scaleQuantize, scaleThreshold, scaleLinear, scaleSequentialQuantile, scaleSequentialSqrt, scaleSequentialPow, scaleSequentialSymlog, scaleSequentialLog, scaleSequential, scaleDivergingSqrt, scaleDivergingPow, scaleDivergingSymlog, scaleDivergingLog, scaleDiverging, scaleLog, scaleSymlog, scalePow, scaleSqrt, scaleTime, scalePoint } from "d3-scale";
import "clsx";
import { symbolAsterisk, symbolCircle, symbolCross, symbolDiamond, symbolDiamond2, symbolPlus, symbolSquare, symbolSquare2, symbolStar, symbolX, symbolTriangle, symbolTriangle2, symbolWye, symbol, curveLinear, curveBasis, curveBasisClosed, curveBasisOpen, curveBundle, curveBumpX, curveBumpY, curveCardinal, curveCardinalClosed, curveCardinalOpen, curveCatmullRom, curveCatmullRomClosed, curveCatmullRomOpen, curveLinearClosed, curveMonotoneX, curveMonotoneY, curveNatural, curveStep, curveStepAfter, curveStepBefore, line } from "d3-shape";
import { extent, range, ascending, groups, ticks, deviation, variance, median, mean, sum, mode, max, min, quantile } from "d3-array";
import { schemeAccent, schemeCategory10, schemeDark2, schemePaired, schemePastel1, schemePastel2, schemeSet1, schemeSet2, schemeSet3, schemeTableau10, interpolateBrBG, interpolatePRGn, interpolatePiYG, interpolatePuOr, interpolateRdBu, interpolateRdGy, interpolateRdYlBu, interpolateRdYlGn, interpolateSpectral, interpolateBlues, interpolateGreens, interpolateGreys, interpolatePurples, interpolateReds, interpolateOranges, interpolateTurbo, interpolateViridis, interpolateMagma, interpolateInferno, interpolatePlasma, interpolateCividis, interpolateCubehelixDefault, interpolateWarm, interpolateCool, interpolateBuGn, interpolateBuPu, interpolateGnBu, interpolateOrRd, interpolatePuBuGn, interpolatePuBu, interpolatePuRd, interpolateRdPu, interpolateYlGnBu, interpolateYlGn, interpolateYlOrBr, interpolateYlOrRd, interpolateRainbow, interpolateSinebow, schemeBrBG, schemePRGn, schemePiYG, schemePuOr, schemeRdBu, schemeRdGy, schemeRdYlBu, schemeRdYlGn, schemeSpectral, schemeBlues, schemeGreens, schemeGreys, schemeOranges, schemePurples, schemeReds, schemeBuGn, schemeBuPu, schemeGnBu, schemeOrRd, schemePuBu, schemePuBuGn, schemePuRd, schemeRdPu, schemeYlGn, schemeYlGnBu, schemeYlOrBr, schemeYlOrRd } from "d3-scale-chromatic";
import { quantize, interpolateLab, interpolateRound } from "d3-interpolate";
import { isPlainObject, pick } from "es-toolkit";
import { color } from "d3-color";
import { geoPath, geoTransform, geoClipRectangle, geoTransverseMercator, geoStereographic, geoOrthographic, geoMercator, geoGnomonic, geoEquirectangular, geoEqualEarth, geoConicEquidistant, geoConicEqualArea, geoConicConformal, geoAzimuthalEquidistant, geoAzimuthalEqualArea, geoAlbers, geoAlbersUsa } from "d3-geo";
import { timeSecond, timeMinute, timeHour, timeDay, timeMonday, timeTuesday, timeWednesday, timeThursday, timeFriday, timeSaturday, timeSunday, timeWeek, timeMonth, timeYear, utcSecond, utcMinute, utcHour, unixDay, utcMonday, utcTuesday, utcWednesday, utcThursday, utcFriday, utcSaturday, utcSunday, utcWeek, utcMonth, utcYear } from "d3-time";
import IntervalTree from "interval-tree-1d";
import { o as on } from "./events.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const SCALES = [
  "x",
  "y",
  "color",
  "opacity",
  "symbol",
  "r",
  "length",
  "fx",
  "fy",
  "projection"
];
const VALID_SCALE_TYPES = {
  color: /* @__PURE__ */ new Set([
    "linear",
    "categorical",
    "ordinal",
    "diverging",
    "quantile",
    "quantize",
    "quantile-cont",
    "threshold",
    "log",
    "symlog",
    "pow",
    "sqrt",
    "diverging-log",
    "diverging-pow",
    "diverging-sqrt",
    "diverging-symlog"
  ]),
  x: /* @__PURE__ */ new Set([
    "linear",
    "log",
    "symlog",
    "time",
    "ordinal",
    "band",
    "point",
    "quantile",
    "quantize",
    "threshold"
  ]),
  y: /* @__PURE__ */ new Set([
    "linear",
    "log",
    "symlog",
    "time",
    "ordinal",
    "band",
    "point",
    "quantile",
    "quantize",
    "threshold"
  ])
  // ...
};
const CHANNEL_SCALE = {
  x: "x",
  x1: "x",
  x2: "x",
  y: "y",
  y1: "y",
  y2: "y",
  r: "r",
  length: "length",
  fx: "fx",
  fy: "fy",
  symbol: "symbol",
  fill: "color",
  stroke: "color",
  opacity: "opacity",
  fillOpacity: "opacity",
  strokeOpacity: "opacity"
};
const CSS_VAR = /^var\(--([a-z-0-9,\s]+)\)$/;
const CSS_COLOR = /^color\(/;
const CSS_COLOR_MIX = /^color-mix\(/;
const CSS_COLOR_CONTRAST = /^color-contrast\(/;
const CSS_RGBA = /^rgba\(/;
const CSS_URL = /^url\(#/;
const INDEX = Symbol("index");
function isDataRecord(value) {
  if (typeof value !== "object" || value === null)
    return false;
  if (Object.prototype.toString.call(value) !== "[object Object]")
    return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null)
    return true;
  const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
}
const sqrt3 = Math.sqrt(3);
const sqrt4_3 = 2 / sqrt3;
const symbolHexagon = {
  draw(context, size) {
    const rx = Math.sqrt(size / Math.PI), ry = rx * sqrt4_3, hy = ry / 2;
    context.moveTo(0, ry);
    context.lineTo(rx, hy);
    context.lineTo(rx, -hy);
    context.lineTo(0, -ry);
    context.lineTo(-rx, -hy);
    context.lineTo(-rx, hy);
    context.closePath();
  }
};
const symbols = /* @__PURE__ */ new Map([
  ["asterisk", symbolAsterisk],
  ["circle", symbolCircle],
  ["cross", symbolCross],
  ["diamond", symbolDiamond],
  ["diamond2", symbolDiamond2],
  ["hexagon", symbolHexagon],
  ["plus", symbolPlus],
  ["square", symbolSquare],
  ["square2", symbolSquare2],
  ["star", symbolStar],
  ["times", symbolX],
  ["triangle", symbolTriangle],
  ["triangle2", symbolTriangle2],
  ["wye", symbolWye]
]);
function isSymbolObject(value) {
  if (typeof value === "string")
    return false;
  return value && typeof value.draw === "function";
}
function isSymbol(value) {
  if (isSymbolObject(value))
    return true;
  if (typeof value !== "string")
    return false;
  return symbols.has(value.toLowerCase());
}
function maybeSymbol(symbol2) {
  if (symbol2 == null || isSymbolObject(symbol2))
    return symbol2;
  const value = symbols.get(`${symbol2}`.toLowerCase());
  if (value)
    return value;
  throw new Error(`invalid symbol: ${symbol2}`);
}
function isDate(v) {
  return v instanceof Date && !isNaN(v.getTime());
}
function isDateOrNull(v) {
  return v == null || isDate(v);
}
function isNumberOrNull(v) {
  return v == null || Number.isFinite(v) || typeof v === "string" && !Number.isNaN(+v);
}
function isNumberOrNullOrNaN(v) {
  return v == null || Number.isFinite(v) || Number.isNaN(v) || typeof v === "string" && !Number.isNaN(+v);
}
function isStringOrNull(v) {
  return v == null || typeof v === "string";
}
function isSymbolOrNull(v) {
  return v == null || (typeof v === "string" || typeof v === "object") && isSymbol(v);
}
function isColorOrNull(v) {
  if (v == null)
    return true;
  if (typeof v === "string") {
    v = `${v}`.toLowerCase();
    return v === "currentcolor" || CSS_VAR.test(v) || CSS_COLOR.test(v) || CSS_COLOR_MIX.test(v) || CSS_COLOR_CONTRAST.test(v) || CSS_RGBA.test(v) || CSS_URL.test(v) || color(v) !== null;
  }
  return false;
}
function isRawValue(value) {
  const t = typeof value;
  return t === "string" || t === "number" || t === "boolean" || isDate(value) || t === null;
}
const X = Symbol("x");
const Y = Symbol("y");
const RAW_VALUE = Symbol("originalValue");
function indexData(data) {
  return data.map((d, i) => ({ ...d, [INDEX]: i }));
}
function recordizeX({ data, ...channels }, { withIndex } = { withIndex: true }) {
  const dataIsRawValueArray = !isDataRecord(data[0]) && !Array.isArray(data[0]) && channels.x == null;
  if (dataIsRawValueArray) {
    const { x, x1, x2, ...nonXChannels } = channels;
    return {
      data: data.map((value, index) => ({
        [RAW_VALUE]: value,
        [INDEX]: index
      })),
      ...nonXChannels,
      x: RAW_VALUE,
      ...withIndex ? { y: INDEX } : {}
    };
  }
  return { data: indexData(data), ...channels };
}
function recordizeY({ data, ...channels }, { withIndex } = { withIndex: true }) {
  if (!data)
    return { data, ...channels };
  const dataIsRawValueArray = !isDataRecord(data[0]) && !Array.isArray(data[0]) && channels.y == null;
  if (dataIsRawValueArray) {
    const { y, y1, y2, ...nonYChannels } = channels;
    return {
      data: Array.from(data).map((value, index) => ({
        [INDEX]: index,
        [RAW_VALUE]: value
      })),
      ...nonYChannels,
      ...withIndex ? { x: INDEX } : {},
      y: RAW_VALUE
    };
  }
  return { data: indexData(data), ...channels };
}
function recordizeXY({ data, ...channels }) {
  if (!data)
    return { data, ...channels };
  if (!isDataRecord(data[0]) && Array.isArray(data[0]) && channels.x === void 0 && channels.y === void 0) {
    return {
      data: data.map(([x, y, ...rest], i) => ({
        [RAW_VALUE]: [x, y, ...rest],
        [INDEX]: i,
        [X]: x,
        [Y]: y
      })),
      ...channels,
      x: X,
      y: Y
    };
  }
  return { data, ...channels };
}
function recordize({ data, ...channels }) {
  if (!data)
    return { data, ...channels };
  if (!isDataRecord(data[0])) {
    return {
      data: data.map((d, i) => ({
        [RAW_VALUE]: d,
        [INDEX]: i
      })),
      ...channels
    };
  }
  return { data: indexData(data), ...channels };
}
function coalesce(...args) {
  for (const arg of args) {
    if (arg !== null && arg !== void 0) {
      return arg;
    }
  }
  return null;
}
function testFilter(datum, options) {
  return options.filter == null || resolveProp(options.filter, datum);
}
function randomId() {
  return Math.ceil(1e9 + Math.random() * 1e9).toString(36);
}
function isSnippet(value) {
  return typeof value === "function" && value.length === 1;
}
function isValid(value) {
  return value !== null && value !== void 0 && !Number.isNaN(value) && (typeof value !== "number" || Number.isFinite(value));
}
function isObject$1(option) {
  return typeof option === "object" && !isDate(option) && !Array.isArray(option) && option !== null;
}
const NUMERIC = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;
function maybeNumber(value) {
  if (typeof value === "number" && Number.isFinite(value))
    return value;
  if (typeof value === "string") {
    if (NUMERIC.test(value.trim())) {
      return parseFloat(value);
    }
  }
  return null;
}
const constant = (x) => () => x;
const GEOJSON_PREFER_STROKE = /* @__PURE__ */ new Set(["MultiLineString", "LineString"]);
const styleProps = {
  strokeWidth: "stroke-width",
  strokeDasharray: "stroke-dasharray",
  strokeLinejoin: "stroke-linejoin",
  strokeLinecap: "stroke-linecap",
  blend: "mix-blend-mode",
  clipPath: "clip-path",
  mask: "mask",
  fontFamily: "font-family",
  fontSize: "font-size",
  fontStyle: "font-style",
  fontWeight: "font-weight",
  textAnchor: "text-anchor",
  fontVariant: "font-variant",
  letterSpacing: "letter-spacing",
  textDecoration: "text-decoration",
  textTransform: "text-transform",
  wordSpacing: "word-spacing",
  cursor: "cursor",
  pointerEvents: "pointer-events"
};
const styleDefaults = {
  fontWeight: "normal"
};
function getBaseStylesObject(datum, props) {
  return Object.fromEntries(Object.entries(styleProps).filter(([key, cssKey]) => cssKey && props[key] != null).map(([key, cssKey]) => [
    cssKey,
    maybeToPixel(cssKey, resolveProp(props[key], datum, styleDefaults[key] || null))
  ]));
}
function maybeToPixel(cssKey, value) {
  if (cssKey === "font-size" || cssKey === "stroke-width") {
    return typeof value === "number" ? `${value}px` : value;
  }
  return value;
}
function resolveProp(accessor, datum, _defaultValue = null) {
  if (typeof accessor === "function") {
    return datum == null ? accessor() : accessor(datum.hasOwnProperty(RAW_VALUE) ? datum[RAW_VALUE] : datum, datum[INDEX]);
  } else if ((typeof accessor === "string" || typeof accessor === "symbol") && datum && datum[accessor] !== void 0) {
    return datum[accessor];
  }
  return isRawValue(accessor) ? accessor : _defaultValue;
}
function toChannelOption(name, channel) {
  const isPositionScale = CHANNEL_SCALE[name] === "x" || CHANNEL_SCALE[name] === "y";
  const isOpacityScale = CHANNEL_SCALE[name] === "opacity";
  return isDataRecord(channel) ? channel : {
    value: channel,
    scale: !isPositionScale && !isOpacityScale && typeof channel === "number" || typeof channel === "undefined" ? null : CHANNEL_SCALE[name],
    channel: null
  };
}
function resolveChannel(channel, datum, channels) {
  const scale = CHANNEL_SCALE[channel];
  const accessor = channel === "z" ? channels.z || channels.fill || channels.stroke : channels[channel];
  const channelOptions = toChannelOption(channel, accessor);
  if (channelOptions.channel) {
    return resolveChannel(channelOptions.channel, datum, channels);
  }
  return resolve(datum, channelOptions.value, channel, scale);
}
function resolve(datum, accessor, channel, scale) {
  if (isDataRecord(datum)) {
    if (typeof accessor === "function")
      return accessor(datum[RAW_VALUE] != null ? datum[RAW_VALUE] : datum, datum?.[INDEX]);
    if ((typeof accessor === "string" || typeof accessor === "symbol") && datum[accessor] !== void 0)
      return datum[accessor];
    if (accessor === null && datum[channel] !== void 0)
      return datum[channel];
    return isRawValue(accessor) ? accessor : null;
  } else if (Array.isArray(datum) && (typeof accessor === "string" || typeof accessor === "number") && datum[accessor] != null) {
    return datum[accessor];
  } else {
    return typeof accessor === "function" ? accessor(datum, datum?.[INDEX]) : accessor !== null && isRawValue(accessor) ? accessor : !Array.isArray(datum) && (scale === "x" || scale === "y") ? datum : null;
  }
}
const scaledStyleProps = {
  fill: "fill",
  stroke: "stroke",
  fillOpacity: "fill-opacity",
  strokeOpacity: "stroke-opacity",
  opacity: "opacity"
};
const oppositeColor = {
  fill: "stroke",
  stroke: "fill"
};
function resolveScaledStyleProps(datum, channels, useScale, plot, defaultColorProp = null) {
  return {
    ...getBaseStylesObject(datum, channels),
    fill: "none",
    stroke: "none",
    ...defaultColorProp && channels[oppositeColor[defaultColorProp]] == null ? { [defaultColorProp]: "currentColor" } : {},
    ...Object.fromEntries(Object.entries(scaledStyleProps).filter(([key]) => channels[key] != null).map(([key, cssAttr]) => [key, cssAttr, resolveChannel(key, datum, channels)]).filter(([key, , value]) => isValid(value) || key === "fill" || key === "stroke").map(([key, cssAttr, value]) => {
      if (useScale[key]) {
        if (value == void 0 && (key === "fill" || key === "stroke") && plot.options.color.unknown) {
          return [cssAttr, plot.options.color.unknown];
        }
        return [cssAttr, plot.scales[CHANNEL_SCALE[key]].fn(value)];
      }
      return [cssAttr, value];
    }))
  };
}
function resolveScaledStyles(datum, channels, useScale, plot, defaultColorProp = null) {
  return `${stylePropsToCSS(resolveScaledStyleProps(datum, channels, useScale, plot, defaultColorProp))};${channels.style || ""}`;
}
function stylePropsToCSS(props) {
  return `${Object.entries(props).map(([key, value]) => `${key}: ${value}`).join(";")}`;
}
function resolveStyles(plot, datum, channels, defaultColorProp = null, useScale, recomputeChannels = false) {
  const styleProps2 = {
    ...getBaseStylesObject(datum?.datum, channels),
    fill: "none",
    stroke: "none",
    ...defaultColorProp && (channels[oppositeColor[defaultColorProp]] == null || channels[oppositeColor[defaultColorProp]] === "none") ? { [defaultColorProp]: "currentColor" } : {},
    ...Object.fromEntries(Object.entries(scaledStyleProps).filter(([key]) => channels[key] != null).map(([key, cssAttr]) => [
      key,
      cssAttr,
      recomputeChannels ? resolveChannel(key, datum?.datum, channels) : datum?.[key]
    ]).filter(([key, , value]) => isValid(value) || key === "fill" || key === "stroke").map(([key, cssAttr, value]) => {
      if (useScale[key]) {
        if (value == void 0 && (key === "fill" || key === "stroke") && plot.options.color.unknown) {
          return [cssAttr, plot.options.color.unknown];
        }
      } else if ((key === "fill" || key === "stroke") && value === true) {
        return [cssAttr, "currentColor"];
      }
      return [cssAttr, value];
    }))
  };
  if (plot.css) {
    return [null, plot.css(`${stylePropsToCSS(styleProps2)};${channels.style ?? ""}`)];
  } else {
    return [`${stylePropsToCSS(styleProps2)};${channels.style ?? ""}`, null];
  }
}
function Facet($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      fx,
      fy,
      left,
      top,
      right,
      bottom,
      topEmpty,
      bottomEmpty,
      leftEmpty,
      rightEmpty,
      children
    } = $$props;
    setContext("svelteplot/facet", {
      getTestFacet() {
        return (datum, options) => {
          return (options.fx == null || resolveChannel("fx", datum, options) === fx) && (options.fy == null || resolveChannel("fy", datum, options) === fy);
        };
      },
      getFacetState() {
        return {
          fx,
          fy,
          left,
          top,
          right,
          bottom,
          topEmpty,
          bottomEmpty,
          leftEmpty,
          rightEmpty
        };
      }
    });
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
function getEmptyFacets(marks, fxValues, fyValues) {
  const facettedMarks = marks.filter((mark) => {
    return mark.options.__firstFacet && mark.data.length > 0 && // has data
    !mark.options.automatic && // not an automatic mark
    (fxValues.length === 1 || mark.options.fx != null) && // uses x faceting
    (fyValues.length === 1 || mark.options.fy != null);
  });
  const facettedData = facettedMarks.map((mark) => mark.data.map((datum) => {
    const fx = resolveChannel("fx", datum, mark.options);
    const fy = resolveChannel("fy", datum, mark.options);
    return {
      fx,
      fy
    };
  })).flat(1);
  const out = /* @__PURE__ */ new Map();
  for (const fx of fxValues) {
    out.set(fx, /* @__PURE__ */ new Map());
    for (const fy of fyValues) {
      let hasFacettedData = fxValues.length === 1 || fyValues.length === 1;
      for (const datum of facettedData) {
        if (datum.fx === fx && datum.fy === fy) {
          hasFacettedData = true;
          break;
        }
      }
      out.get(fx)?.set(fy, !hasFacettedData);
    }
  }
  return out;
}
function FacetGrid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { getPlotState, updateDimensions } = getContext("svelteplot");
    const plot = getPlotState();
    let { children, marks } = $$props;
    const useFacetX = plot.scales.fx.domain.length > 0;
    const useFacetY = plot.scales.fy.domain.length > 0;
    const fxValues = useFacetX ? plot.scales.fx.domain : [true];
    const fyValues = useFacetY ? plot.scales.fy.domain : [true];
    const emptyFacets = getEmptyFacets(marks, fxValues, fyValues);
    const facetXScale = scaleBand().paddingInner(fxValues.length > 1 ? 0.1 : 0).domain(fxValues).rangeRound([0, plot.plotWidth]);
    const facetYScale = scaleBand().paddingInner(fyValues.length > 1 ? 0.1 : 0).domain(fyValues).rangeRound([0, plot.plotHeight]);
    const facetWidth = useFacetX ? facetXScale.bandwidth() : plot.plotWidth;
    const facetHeight = useFacetY ? facetYScale.bandwidth() : plot.plotHeight;
    $$renderer2.push(`<!--[-->`);
    const each_array = ensure_array_like(fxValues);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let facetX = each_array[i];
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(fyValues);
      for (let j = 0, $$length2 = each_array_1.length; j < $$length2; j++) {
        let facetY = each_array_1[j];
        $$renderer2.push(`<g class="facet"${attr("data-facet-x", i)}${attr("data-facet-y", j)}${attr("data-facet", i * fyValues.length + j)} fill="currentColor"${attr("transform", `translate(${stringify(useFacetX ? facetXScale(facetX) : 0)}, ${stringify(useFacetY ? facetYScale(facetY) : 0)})`)}${attr_style("", {
          display: emptyFacets.get(facetX)?.get(facetY) ? "none" : "block"
        })}><rect${attr("x", plot.options.marginLeft)}${attr("y", plot.options.marginTop)}${attr("width", facetWidth)}${attr("height", facetHeight)} fill="transparent" pointer-events="all"></rect>`);
        Facet($$renderer2, {
          fx: facetX,
          fy: facetY,
          left: i === 0,
          right: i === fxValues.length - 1,
          top: j === 0,
          bottom: j === fyValues.length - 1,
          leftEmpty: !!(i === 0 || emptyFacets.get(fxValues[i - 1])?.get(facetY)),
          topEmpty: !!(j === 0 || emptyFacets.get(facetX)?.get(fyValues[j - 1])),
          rightEmpty: !!(i === fxValues.length - 1 || emptyFacets.get(fxValues[i + 1])?.get(facetY)),
          bottomEmpty: !!(j === fyValues.length - 1 || emptyFacets.get(facetX)?.get(fyValues[j + 1])),
          children: ($$renderer3) => {
            children($$renderer3);
            $$renderer3.push(`<!---->`);
          }
        });
        $$renderer2.push(`<!----></g>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function mergeDeep(target, ...sources) {
  if (!sources.length)
    return target;
  const source2 = sources.shift();
  if (isObject(target) && isObject(source2)) {
    for (const key in source2) {
      if (isObject(source2[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        } else {
          target[key] = Object.assign({}, target[key]);
        }
        mergeDeep(target[key], source2[key]);
      } else if (source2[key] !== null) {
        Object.assign(target, { [key]: source2[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}
const identity$1 = constant({ stream: (stream) => stream });
const defaultAspectRatio = 0.618;
function createProjection({ projOptions, inset: globalInset = 2, insetTop = globalInset, insetRight = globalInset, insetBottom = globalInset, insetLeft = globalInset } = {}, dimensions) {
  if (projOptions == null)
    return;
  if (typeof projOptions.stream === "function")
    return projOptions;
  let options;
  let domain;
  let clip = "frame";
  if (isObject$1(projOptions)) {
    let inset;
    ({
      type: projOptions,
      domain,
      inset,
      insetTop = inset !== void 0 ? inset : insetTop,
      insetRight = inset !== void 0 ? inset : insetRight,
      insetBottom = inset !== void 0 ? inset : insetBottom,
      insetLeft = inset !== void 0 ? inset : insetLeft,
      clip = clip,
      ...options
    } = projOptions);
    if (projOptions == null)
      return;
  }
  let aspectRatio = defaultAspectRatio;
  const projFactory = projOptions;
  const { width, height, marginLeft, marginRight, marginTop, marginBottom } = dimensions;
  const dx = width - marginLeft - marginRight - insetLeft - insetRight;
  const dy = height - marginTop - marginBottom - insetTop - insetBottom;
  const projInstance = projFactory?.({ width: dx, height: dy, clip, ...options });
  if (projInstance == null)
    return;
  clip = maybePostClip(clip, marginLeft, marginTop, width - marginRight, height - marginBottom);
  let tx = marginLeft + insetLeft;
  let ty = marginTop + insetTop;
  let transform;
  let invertTransform = (d) => d;
  if (domain != null) {
    const [[x0, y0], [x1, y1]] = geoPath(projInstance).bounds(domain);
    const k = Math.min(dx / (x1 - x0), dy / (y1 - y0));
    aspectRatio = (y1 - y0) / (x1 - x0);
    if (k > 0) {
      tx -= (k * (x0 + x1) - dx) / 2;
      ty -= (k * (y0 + y1) - dy) / 2;
      transform = geoTransform({
        point(x, y) {
          this.stream.point(x * k + tx, y * k + ty);
        }
      });
      invertTransform = ([x, y]) => [(x - tx) / k, (y - ty) / k];
    } else {
      throw new Error(`Warning: the projection could not be fit to the specified domain; using the default scale.`);
    }
  }
  transform ??= tx === 0 && ty === 0 ? identity$1() : geoTransform({
    point(x, y) {
      this.stream.point(x + tx, y + ty);
    }
  });
  invertTransform ??= ([x, y]) => [x - tx, y - ty];
  return {
    aspectRatio,
    invert([x, y]) {
      return projInstance.invert(invertTransform([x, y]));
    },
    stream: (s) => projInstance.stream(transform.stream(clip(s)))
  };
}
function maybePostClip(clip, x1, y1, x2, y2) {
  if (clip === false || clip == null || typeof clip === "number")
    return (s) => s;
  if (clip === true)
    clip = "frame";
  switch (`${clip}`.toLowerCase()) {
    case "frame":
      return geoClipRectangle(x1, y1, x2, y2);
    default:
      throw new Error(`unknown projection clip type: ${clip}`);
  }
}
/**
 * @license
 * Copyright 2020-2023 Observable, Inc.
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose
 * with or without fee is hereby granted, provided that the above copyright notice
 * and this permission notice appear in all copies.
 */
const durationSecond = 1e3;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;
const durations = /* @__PURE__ */ new Map([
  ["second", durationSecond],
  ["minute", durationMinute],
  ["hour", durationHour],
  ["day", durationDay],
  ["monday", durationWeek],
  ["tuesday", durationWeek],
  ["wednesday", durationWeek],
  ["thursday", durationWeek],
  ["friday", durationWeek],
  ["saturday", durationWeek],
  ["sunday", durationWeek],
  ["week", durationWeek],
  ["month", durationMonth],
  ["year", durationYear]
]);
const timeIntervals = /* @__PURE__ */ new Map([
  ["second", timeSecond],
  ["minute", timeMinute],
  ["hour", timeHour],
  ["day", timeDay],
  // https://github.com/d3/d3-time/issues/62
  ["monday", timeMonday],
  ["tuesday", timeTuesday],
  ["wednesday", timeWednesday],
  ["thursday", timeThursday],
  ["friday", timeFriday],
  ["saturday", timeSaturday],
  ["sunday", timeSunday],
  ["week", timeWeek],
  ["month", timeMonth],
  ["year", timeYear]
]);
const utcIntervals = /* @__PURE__ */ new Map([
  ["second", utcSecond],
  ["minute", utcMinute],
  ["hour", utcHour],
  ["day", unixDay],
  ["monday", utcMonday],
  ["tuesday", utcTuesday],
  ["wednesday", utcWednesday],
  ["thursday", utcThursday],
  ["friday", utcFriday],
  ["saturday", utcSaturday],
  ["sunday", utcSunday],
  ["week", utcWeek],
  ["month", utcMonth],
  ["year", utcYear]
]);
const intervalDuration = Symbol("intervalDuration");
const intervalType = Symbol("intervalType");
for (const [name, interval] of timeIntervals) {
  interval[intervalDuration] = durations.get(name);
  interval[intervalType] = "time";
}
for (const [name, interval] of utcIntervals) {
  interval[intervalDuration] = durations.get(name);
  interval[intervalType] = "utc";
}
function parseTimeInterval(input) {
  let name = `${input}`.toLowerCase();
  if (name.endsWith("s"))
    name = name.slice(0, -1);
  let period = 1;
  const match = /^(?:(\d+)\s+)/.exec(name);
  if (match) {
    name = name.slice(match[0].length);
    period = +match[1];
  }
  switch (name) {
    case "quarter":
      name = "month";
      period *= 3;
      break;
    case "half":
      name = "month";
      period *= 6;
      break;
  }
  let interval = utcIntervals.get(name);
  if (!interval)
    throw new Error(`unknown interval: ${input}`);
  if (period > 1 && !interval.every)
    throw new Error(`non-periodic interval: ${name}`);
  return [name, period];
}
function maybeTimeInterval(input) {
  return asInterval(parseTimeInterval(input), "time");
}
function asInterval([name, period], type) {
  let interval = timeIntervals.get(name);
  if (period > 1) {
    interval = interval.every(period);
    interval[intervalDuration] = durations.get(name) * period;
    interval[intervalType] = type;
  }
  return interval;
}
function maybeInterval(interval) {
  if (interval == null)
    return;
  if (typeof interval === "number") {
    if (0 < interval && interval < 1 && Number.isInteger(1 / interval))
      interval = -1 / interval;
    const n = Math.abs(interval);
    return interval < 0 ? {
      floor: (d) => Math.floor(d * n) / n,
      round: (d) => Math.round(d * n) / n,
      offset: (d) => (d * n + 1) / n,
      // note: no optional step for simplicity
      range: (lo, hi) => range(Math.ceil(lo * n), hi * n).map((x) => x / n)
    } : {
      floor: (d) => Math.floor(d / n) * n,
      round: (d) => Math.round(d / n) * n,
      offset: (d) => d + n,
      // note: no optional step for simplicity
      range: (lo, hi) => range(Math.ceil(lo / n), hi / n).map((x) => x * n)
    };
  }
  if (typeof interval === "string")
    return maybeTimeInterval(interval);
  if (typeof interval.floor !== "function")
    throw new Error("invalid interval; missing floor method");
  if (typeof interval.offset !== "function")
    throw new Error("invalid interval; missing offset method");
  return interval;
}
function autoTicks(type, ticks2, interval, domain, scaleFn, count) {
  if (ticks2)
    return ticks2;
  if (interval) {
    const [lo, hi] = extent(domain);
    const I = maybeInterval(interval);
    return I.range(lo, I.offset(hi)).filter((d) => d >= lo && d <= hi);
  }
  return typeof scaleFn.ticks === "function" ? scaleFn.ticks(count) : [];
}
const SORT_KEY = Symbol("sortKey");
const IS_SORTED = Symbol("isSorted");
function sort({ data, ...channels }, options = {}) {
  if (!Array.isArray(data))
    return { data, ...channels };
  if (channels.sort) {
    const { sort: sort2 } = channels;
    if (isDataRecord(sort2) && typeof sort2.channel === "string" && sort2.channel.charAt(0) === "-") {
      sort2.channel = sort2.channel.substring(1);
      sort2.order = "descending";
    }
    const isComparator = typeof channels.sort === "function" && channels.sort.length !== 1;
    return {
      data: isComparator ? data.toSorted(channels.sort) : data.map((d) => ({
        ...d,
        [SORT_KEY]: resolveChannel("sort", d, { ...channels, sort: sort2 })
      })).map((d) => ({
        ...d,
        [SORT_KEY]: typeof d[SORT_KEY] === "number" && !Number.isFinite(d[SORT_KEY]) ? Number.POSITIVE_INFINITY : d[SORT_KEY]
      })).toSorted((a, b) => (typeof a[SORT_KEY] === "string" && typeof b[SORT_KEY] === "string" ? a[SORT_KEY].localeCompare(b[SORT_KEY]) : a[SORT_KEY] > b[SORT_KEY] ? 1 : a[SORT_KEY] < b[SORT_KEY] ? -1 : 0) * (options.reverse || isDataRecord(sort2) && sort2?.order === "descending" ? -1 : 1)).map(({ [SORT_KEY]: a, ...rest }) => rest),
      ...channels,
      [IS_SORTED]: sort2,
      // set the sort channel to null to disable the implicit alphabetical
      // ordering of ordinal domains, and also to avoid double sorting in case
      // this transform is used "outside" a mark
      sort: null
    };
  }
  return {
    data,
    ...channels
  };
}
function computeScales(plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, marks, plotDefaults) {
  const x = createScale("x", plotOptions.x, marks, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults);
  const y = createScale("y", plotOptions.y, marks, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults);
  const r = createScale("r", plotOptions.r, marks, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults);
  const color2 = createScale("color", plotOptions.color, marks, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults);
  const opacity = createScale("opacity", plotOptions.opacity, marks, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults);
  const length = createScale("length", plotOptions.length, marks, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults);
  const symbol2 = createScale("symbol", plotOptions.symbol, marks, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults);
  const fx = createScale("fx", plotOptions.fx, marks, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults);
  const fy = createScale("fy", plotOptions.fy, marks, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults);
  const projection = plotOptions.projection ? createProjection({ projOptions: plotOptions.projection, inset: plotOptions.inset }, {
    width: plotWidth,
    height: plotHeight,
    marginBottom: plotOptions.marginBottom,
    marginLeft: plotOptions.marginLeft,
    marginRight: plotOptions.marginRight,
    marginTop: plotOptions.marginTop
  }) : null;
  return { x, y, r, color: color2, opacity, length, symbol: symbol2, fx, fy, projection };
}
function createScale(name, scaleOptions, marks, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults) {
  if (!plotOptions.implicitScales && !scaleOptions.scale) {
    const fn2 = name === "color" ? () => "currentColor" : () => 0;
    fn2.range = name === "color" ? () => ["currentColor"] : () => [0];
    return { type: "linear", domain: [0], range: [0], fn: fn2, skip: /* @__PURE__ */ new Map(), isDummy: true };
  }
  const dataValues = /* @__PURE__ */ new Set();
  const allDataValues = [];
  const markTypes = /* @__PURE__ */ new Set();
  const skip = /* @__PURE__ */ new Map();
  let manualActiveMarks = 0;
  const propNames = /* @__PURE__ */ new Set();
  const uniqueScaleProps = /* @__PURE__ */ new Set();
  let sortOrdinalDomain = true;
  for (const mark of marks) {
    if ((name === "x" || name === "y") && mark.options[IS_SORTED] != void 0) {
      sortOrdinalDomain = false;
    }
    for (const channel of mark.channels) {
      if (!skip.has(channel))
        skip.set(channel, /* @__PURE__ */ new Set());
      if (mark.data.length > 0) {
        const channelOptions = isDataRecord(mark.options[channel]) ? mark.options[channel] : { value: mark.options[channel], scale: CHANNEL_SCALE[channel] };
        const useScale = channelOptions.scale === name && // only use scale if implicit scales are enabled or use has explicitly
        // defined a scale
        (plotOptions.implicitScales || scaleOptions.scale) && // type number means, someone is defining a channel as constant, e.g.
        // <Dot r={10} /> in which case we don't want to pass it through a scale
        // typeof channelOptions.value !== 'number' &&
        typeof channelOptions.value !== "undefined";
        if (useScale) {
          if (name === "opacity" && looksLikeOpacity(channelOptions.value)) {
            skip.get(channel).add(mark.id);
          } else {
            const isOutputType = name === "color" ? isColorOrNull : name === "symbol" ? isSymbolOrNull : false;
            let allValuesAreOutputType = !!isOutputType && mark.data.length > 0;
            if (isOutputType) {
              for (const datum of mark.data) {
                const val = resolveProp(channelOptions.value, datum);
                allValuesAreOutputType = allValuesAreOutputType && val !== null && isOutputType(val);
                if (!allValuesAreOutputType)
                  break;
              }
            }
            if (allValuesAreOutputType) {
              skip.get(channel).add(mark.id);
            }
            if (typeof channelOptions.value === "string" && !looksLikeANumber(channelOptions.value) && !channelOptions.value.startsWith("__") && mark.data[0][channelOptions.value] !== void 0) {
              propNames.add(channelOptions.value);
            }
            uniqueScaleProps.add(channelOptions.value);
            if (channelOptions.value != null && !allValuesAreOutputType) {
              manualActiveMarks++;
              markTypes.add(mark.type);
              for (const datum of mark.data) {
                const value = resolveProp(channelOptions.value, datum);
                dataValues.add(value);
                if (name === "color" && scaleOptions.type === "quantile" || scaleOptions.type === "quantile-cont") {
                  allDataValues.push(value);
                }
              }
            }
          }
        }
        if ((name === "x" || name === "y") && mark.options[`__${name}_origField`] && !mark.options[`__${name}_origField`].startsWith("__")) {
          propNames.add(mark.options[`__${name}_origField`]);
        }
      }
    }
  }
  if ((name === "x" || name === "y") && scaleOptions.sort) {
    sortOrdinalDomain = true;
  }
  if ((name === "x" || name === "y") && scaleOptions.sort === false) {
    sortOrdinalDomain = false;
  }
  const valueArr = [...dataValues.values(), ...scaleOptions.domain || []].filter((d) => d != null);
  const type = scaleOptions.type === "auto" ? inferScaleType(name, valueArr, markTypes, scaleOptions) : scaleOptions.type;
  if (VALID_SCALE_TYPES[name] && !VALID_SCALE_TYPES[name].has(type)) {
    throw new Error(`Invalid scale type ${type} for scale
            ${name}. Valid types are ${[...VALID_SCALE_TYPES[name]].join(", ")}`);
  }
  const isOrdinal = type === "band" || type === "point" || type === "ordinal" || type === "categorical" || type === "threshold";
  if (isOrdinal && sortOrdinalDomain) {
    valueArr.sort(ascending);
  }
  const valueArray = type === "quantile" || type === "quantile-cont" ? allDataValues.toSorted() : valueArr;
  let domain = scaleOptions.domain ? isOrdinal ? scaleOptions.domain : extent(scaleOptions.zero ? [0, ...scaleOptions.domain] : scaleOptions.domain) : type === "band" || type === "point" || type === "ordinal" || type === "categorical" || type === "quantile" || type === "quantile-cont" ? name === "y" ? valueArray.toReversed() : valueArray : extent(scaleOptions.zero ? [0, ...valueArray] : valueArray);
  if (scaleOptions.interval) {
    if (isOrdinal) {
      domain = domainFromInterval(domain, scaleOptions.interval, name);
    } else {
      if (markTypes.size > 0) {
        console.error("Setting interval via axis options is only supported for ordinal scales");
      }
    }
  }
  if (!scaleOptions.scale) {
    throw new Error(`No scale function defined for ${name}`);
  }
  const fn = scaleOptions.scale({
    name,
    type,
    domain,
    scaleOptions,
    plotOptions,
    plotWidth,
    plotHeight,
    plotHasFilledDotMarks,
    plotDefaults
  });
  const range2 = fn.range();
  return {
    type,
    domain,
    range: range2,
    fn,
    skip,
    manualActiveMarks,
    uniqueScaleProps,
    autoTitle: type === "time" ? null : propNames.size === 1 ? `${[...propNames.values()][0]}${type === "log" ? " (log)" : ""}` : null
  };
}
function domainFromInterval(domain, interval, name) {
  const interval_ = maybeInterval(interval);
  const [lo, hi] = extent(domain);
  const out = interval_.range(lo, interval_.offset(hi));
  return name === "y" ? out.toReversed() : out;
}
const markTypesWithBandDefault = {
  x: /* @__PURE__ */ new Set(["barY", "cell", "tickY"]),
  y: /* @__PURE__ */ new Set(["barX", "cell", "tickX"])
};
function inferScaleType(name, dataValues, markTypes, scaleOptions = {}) {
  if (name === "color") {
    if (!dataValues.length)
      return "ordinal";
    if (dataValues.every(isNumberOrNullOrNaN))
      return "linear";
    if (dataValues.every(isDateOrNull))
      return "linear";
    if (dataValues.every(isStringOrNull))
      return "categorical";
    return "categorical";
  }
  if (name === "symbol")
    return "ordinal";
  if (name === "x" || name === "y") {
    if (scaleOptions.nice || scaleOptions.zero)
      return "linear";
    if (scaleOptions.domain && scaleOptions.domain.length === 2) {
      if (scaleOptions.domain.every(Number.isFinite))
        return "linear";
      if (scaleOptions.domain.every(isDate))
        return "time";
    }
  }
  if (name === "y" && Array.from(markTypes).some((d) => markTypesWithBandDefault.y.has(d)))
    return "band";
  if (name === "x" && Array.from(markTypes).some((d) => markTypesWithBandDefault.x.has(d)))
    return "band";
  if (!dataValues.length)
    return "linear";
  if (dataValues.length === 1)
    return "point";
  if (dataValues.every(isNumberOrNull))
    return name === "r" ? "sqrt" : "linear";
  if (dataValues.every(isDateOrNull))
    return "time";
  if (dataValues.every(isStringOrNull))
    return "point";
  return "linear";
}
const scaledChannelNames = [
  "x",
  "x1",
  "x2",
  "y",
  "y1",
  "y2",
  "r",
  "opacity",
  "fill",
  "fillOpacity",
  "stroke",
  "strokeOpacity",
  "symbol",
  "length"
];
function getUsedScales(plot, options, mark) {
  return Object.fromEntries(scaledChannelNames.map((channel) => {
    const scale = CHANNEL_SCALE[channel];
    const skipMarks = plot.scales[scale].skip.get(channel) || /* @__PURE__ */ new Set();
    return [
      channel,
      !skipMarks.has(mark.id) && toChannelOption(channel, options[channel]).scale !== null && !plot.scales[scale].isDummy
    ];
  }));
}
function looksLikeANumber(input) {
  return Number.isFinite(input) || typeof input === "string" && input.trim().length > 0 && Number.isFinite(+input);
}
function isWithin(number, min2, max2) {
  return Number.isFinite(number) && number >= min2 && number <= max2;
}
function looksLikeOpacity(input) {
  return looksLikeANumber(input) && isWithin(+input, 0, 1);
}
function projectXY(scales, x, y, useXScale = true, useYScale = true) {
  if (scales.projection) {
    let x_, y_;
    const stream = scales.projection.stream({
      point(px, py) {
        x_ = px;
        y_ = py;
      }
    });
    stream.point(x, y);
    return [x_, y_];
  }
  return [
    useXScale ? projectX("x", scales, x) : x,
    useYScale ? projectY("y", scales, y) : y
  ];
}
function projectX(channel, scales, value) {
  return scales.x.fn(value) + (channel === "x" && scales.x.type === "band" ? scales.x.fn.bandwidth() * 0.5 : channel === "x2" && scales.x.type === "band" ? scales.x.fn.bandwidth() : 0);
}
function projectY(channel, scales, value) {
  return scales.y.fn(value) + (channel === "y" && scales.y.type === "band" ? scales.y.fn.bandwidth() * 0.5 : channel === "y2" && scales.y.type === "band" ? scales.y.fn.bandwidth() : 0);
}
const PLOT_DEFAULTS_KEY = Symbol("svelteplot/defaults");
function setPlotDefaults(plotDefaults) {
  const existingDefaults = getPlotDefaults();
  const mergedDefaults = { ...existingDefaults, ...plotDefaults };
  setContext(PLOT_DEFAULTS_KEY, mergedDefaults);
}
function getPlotDefaults() {
  return hasContext(PLOT_DEFAULTS_KEY) ? getContext(PLOT_DEFAULTS_KEY) : (
    // Fallback for backward compatibility
    hasContext("svelteplot/defaults") ? (console.error(`svelteplot: Please use new setPlotDefaults hook instead of 'svelteplot/defaults' context`), getContext("svelteplot/defaults")) : {}
  );
}
function Plot($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let autoMarginLeft = writable(new SvelteMap());
    let autoMarginRight = writable(new SvelteMap());
    let autoMarginBottom = writable(new SvelteMap());
    let autoMarginTop = writable(new SvelteMap());
    setContext("svelteplot/autoMargins", {
      autoMarginLeft,
      autoMarginRight,
      autoMarginBottom,
      autoMarginTop
    });
    const maxMarginLeft = Math.max(...store_get($$store_subs ??= {}, "$autoMarginLeft", autoMarginLeft).values());
    const maxMarginRight = Math.max(...store_get($$store_subs ??= {}, "$autoMarginRight", autoMarginRight).values());
    const maxMarginBottom = Math.max(...store_get($$store_subs ??= {}, "$autoMarginBottom", autoMarginBottom).values());
    const maxMarginTop = Math.max(...store_get($$store_subs ??= {}, "$autoMarginTop", autoMarginTop).values());
    const USER_DEFAULTS = getPlotDefaults();
    const DEFAULTS = {
      height: 350,
      initialWidth: 500,
      inset: 0,
      margin: "auto",
      colorScheme: "turbo",
      unknown: "#cccccc99",
      categoricalColorScheme: "observable10",
      pointScaleHeight: 18,
      bandScaleHeight: 30,
      locale: "en-US",
      numberFormat: {
        style: "decimal",
        // notation: 'compact',
        useGrouping: "min2",
        compactDisplay: "short"
      },
      markerDotRadius: 3,
      ...USER_DEFAULTS,
      axisX: {
        anchor: "bottom",
        implicit: true,
        ...USER_DEFAULTS.axis,
        ...USER_DEFAULTS.axisX
      },
      axisY: {
        anchor: "left",
        implicit: true,
        ...USER_DEFAULTS.axis,
        ...USER_DEFAULTS.axisY
      },
      gridX: {
        implicit: false,
        ...USER_DEFAULTS.grid,
        ...USER_DEFAULTS.gridX
      },
      gridY: {
        implicit: false,
        ...USER_DEFAULTS.grid,
        ...USER_DEFAULTS.gridY
      }
    };
    let {
      header,
      footer,
      overlay,
      underlay,
      children,
      facetAxes,
      testid,
      facet,
      class: className = "",
      css = DEFAULTS.css,
      width: fixedWidth,
      $$slots,
      $$events,
      ...initialOpts
    } = $$props;
    let width = DEFAULTS.initialWidth;
    setPlotDefaults(DEFAULTS);
    let marks = [];
    const explicitMarks = marks.filter((m) => !m.options.automatic);
    const hasExplicitAxisX = !!explicitMarks.find((m) => m.type === "axisX");
    const hasExplicitAxisY = !!explicitMarks.find((m) => m.type === "axisY");
    const hasExplicitGridX = !!explicitMarks.find((m) => m.type === "gridX");
    const hasExplicitGridY = !!explicitMarks.find((m) => m.type === "gridY");
    const explicitScales = new Set(explicitMarks.map((m) => [...m.scales.values()].filter((scale) => {
      const channels = Object.entries(CHANNEL_SCALE).filter(([, scaleName]) => scale === scaleName).map(([channel]) => channel);
      return channels.find((channel) => m.options[channel] != null);
    })).flat(1));
    const explicitDomains = new Set(SCALES.filter((scale) => !!initialOpts[scale]?.domain));
    const isOneDimensional = explicitScales.has("x") !== explicitScales.has("y");
    const plotOptions = extendPlotOptions(initialOpts, {
      explicitScales,
      explicitDomains,
      hasProjection: !!initialOpts.projection,
      margin: initialOpts.margin,
      inset: initialOpts.inset
    });
    const hasFilledDotMarks = !!explicitMarks.find((d) => d.type === "dot" && d.options.fill);
    const preScales = computeScales(plotOptions, width, 400, hasFilledDotMarks, marks, DEFAULTS);
    const hasProjection = !!preScales.projection;
    const plotWidth = (fixedWidth || width) - plotOptions.marginLeft - plotOptions.marginRight;
    const xFacetCount = Math.max(1, preScales.fx.domain.length);
    const yFacetCount = Math.max(1, preScales.fy.domain.length);
    const yDomainCount = isOneDimensional && explicitScales.has("x") ? 1 : preScales.y.domain.length;
    const height = maybeNumber(plotOptions.height) === null || plotOptions.height === "auto" ? Math.round(preScales.projection && preScales.projection.aspectRatio ? plotWidth * preScales.projection.aspectRatio / xFacetCount * yFacetCount + plotOptions.marginTop + plotOptions.marginBottom : plotOptions.aspectRatio ? heightFromAspect(preScales.x, preScales.y, plotOptions.aspectRatio, plotWidth, plotOptions.marginTop, plotOptions.marginBottom) : (isOneDimensional && explicitScales.has("x") || !explicitMarks.length ? yFacetCount * DEFAULTS.bandScaleHeight : preScales.y.type === "band" ? yFacetCount * yDomainCount * DEFAULTS.bandScaleHeight : preScales.y.type === "point" ? yFacetCount * yDomainCount * DEFAULTS.pointScaleHeight : DEFAULTS.height) + plotOptions.marginTop + plotOptions.marginBottom) : typeof plotOptions.height === "function" ? plotOptions.height(plotWidth) : maybeNumber(plotOptions.height);
    const plotHeight = height - plotOptions.marginTop - plotOptions.marginBottom;
    let plotBody = null;
    let facetWidth = null;
    let facetHeight = null;
    let plotState = computePlotState();
    function computePlotState() {
      const scales = computeScales(plotOptions, facetWidth || width, facetHeight || height, hasFilledDotMarks, marks, DEFAULTS);
      const colorSymbolRedundant = scales.color.uniqueScaleProps?.size === 1 && scales.symbol.uniqueScaleProps?.size === 1 && [...scales.color.uniqueScaleProps?.values()][0] === [...scales.symbol.uniqueScaleProps?.values()][0];
      return {
        options: plotOptions,
        width,
        height,
        facetWidth,
        facetHeight,
        plotHeight,
        plotWidth,
        scales,
        colorSymbolRedundant,
        hasFilledDotMarks,
        body: plotBody,
        css
      };
    }
    setContext("svelteplot", {
      /**
       * used by the Mark component to register new marks to the plot
       */
      addMark(mark) {
        if (marks.find((m) => m.id === mark.id)) {
          return;
        }
        marks = [...marks, mark];
      },
      /**
       * used by the Mark component to update marks when its props change
       */
      updateMark(mark) {
      },
      /**
       * used by the Mark component to unregister marks when their
       * respective components get removed from the plot
       */
      removeMark(mark) {
        marks = marks.filter((m) => m.id !== mark.id);
      },
      getPlotState() {
        return plotState;
      },
      getTopLevelFacet() {
        return facet;
      },
      updateDimensions(w, h) {
        if (facetWidth !== w) facetWidth = w;
        if (facetHeight !== h) facetHeight = h;
      },
      updatePlotState() {
        plotState = computePlotState();
      }
    });
    function getWidth() {
      return width;
    }
    function heightFromAspect(x, y, aspectRatio, plotWidth2, marginTop, marginBottom) {
      const xDomainExtent = x.type === "band" || x.type === "point" ? x.domain.length : Math.abs(x.domain[1] - x.domain[0]);
      const yDomainExtent = y.type === "band" || y.type === "point" ? y.domain.length : Math.abs(y.domain[1] - y.domain[0]);
      return plotWidth2 / xDomainExtent * yDomainExtent / aspectRatio + marginTop + marginBottom;
    }
    function extendPlotOptions(initialOpts2, opts) {
      return mergeDeep({}, smartDefaultPlotOptions(opts), initialOpts2);
    }
    function maybeMargin(margin, direction, defaultValue, autoMargins) {
      const marginValue = typeof margin === "object" && margin[direction] != null ? margin[direction] : (
        // use the margin value if it's a number
        typeof margin === "number" || margin === "auto" ? margin : (
          // use direction-specific default value if defined
          typeof defaultValue === "object" && defaultValue[direction] != null ? defaultValue[direction] : typeof defaultValue === "number" || defaultValue === "auto" ? defaultValue : "auto"
        )
      );
      return marginValue === "auto" ? autoMargins[direction] : marginValue;
    }
    function smartDefaultPlotOptions({ explicitScales: explicitScales2, explicitDomains: explicitDomains2, hasProjection: hasProjection2, margin }) {
      const autoXAxis = explicitScales2.has("x") || explicitDomains2.has("x");
      const autoYAxis = explicitScales2.has("y") || explicitDomains2.has("y");
      const isOneDimensional2 = autoXAxis !== autoYAxis;
      const oneDimX = autoXAxis && !autoYAxis;
      const oneDimY = autoYAxis && !autoXAxis;
      const autoMargins = {
        left: hasProjection2 ? 0 : Math.max(maxMarginLeft + 1, 1),
        right: hasProjection2 ? 0 : oneDimY ? 0 : Math.max(maxMarginRight + 1, 4),
        top: hasProjection2 ? 0 : oneDimX ? 0 : Math.max(5, maxMarginTop),
        bottom: hasProjection2 ? 0 : Math.max(5, maxMarginBottom)
      };
      return {
        title: "",
        subtitle: "",
        caption: "",
        height: "auto",
        // maxWidth: oneDimY ? `${60 * e}px` : undefined,
        marginLeft: maybeMargin(margin, "left", DEFAULTS.margin, autoMargins),
        marginRight: maybeMargin(margin, "right", DEFAULTS.margin, autoMargins),
        marginTop: maybeMargin(margin, "top", DEFAULTS.margin, autoMargins),
        marginBottom: maybeMargin(margin, "bottom", DEFAULTS.margin, autoMargins),
        inset: isOneDimensional2 ? 10 : DEFAULTS.inset,
        grid: (DEFAULTS.gridX?.implicit ?? false) && (DEFAULTS.gridY?.implicit ?? false),
        axes: (DEFAULTS.axisX?.implicit ?? false) && (DEFAULTS.axisY?.implicit ?? false),
        frame: DEFAULTS.frame?.implicit ?? false,
        projection: null,
        aspectRatio: null,
        facet: {},
        padding: 0.1,
        x: {
          type: "auto",
          axis: DEFAULTS.axisX.implicit && autoXAxis ? DEFAULTS.axisX.anchor : false,
          labelAnchor: "auto",
          reverse: false,
          clamp: false,
          nice: false,
          zero: false,
          round: false,
          percent: false,
          align: 0.5,
          tickSpacing: DEFAULTS.axisX.tickSpacing ?? 80,
          tickFormat: "auto",
          grid: DEFAULTS.gridX.implicit ?? false
        },
        y: {
          type: "auto",
          axis: DEFAULTS.axisY.implicit && autoYAxis ? DEFAULTS.axisY.anchor : false,
          labelAnchor: "auto",
          reverse: false,
          clamp: false,
          nice: false,
          zero: false,
          round: false,
          percent: false,
          align: 0.5,
          tickSpacing: DEFAULTS.axisY.tickSpacing ?? 50,
          tickFormat: "auto",
          grid: DEFAULTS.gridY.implicit ?? false
        },
        opacity: {
          type: "linear",
          reverse: false,
          clamp: false,
          nice: false,
          zero: false,
          round: false,
          tickSpacing: 0,
          percent: false,
          padding: 0.1,
          align: 0.5
        },
        r: {
          type: "sqrt",
          reverse: false,
          clamp: false,
          nice: false,
          zero: true,
          percent: false,
          round: false,
          padding: 0,
          align: 0
        },
        color: { type: "auto", unknown: DEFAULTS.unknown },
        length: { type: "linear" },
        symbol: { type: "ordinal" },
        fx: { type: "band", axis: "top" },
        fy: { type: "band", axis: "right" },
        locale: DEFAULTS.locale,
        css: DEFAULTS.css
      };
    }
    const mapXY = (x, y) => {
      const [px, py] = projectXY(plotState.scales, x, y);
      return { x: px, y: py };
    };
    $$renderer2.push(`<figure${attr_class(`svelteplot ${stringify(className)}`, "svelte-c5n3b4")}${attr("data-testid", testid)}${attr_style("", { "max-width": plotOptions.maxWidth })}>`);
    if (header) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="plot-header svelte-c5n3b4">`);
      header?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="plot-body svelte-c5n3b4">`);
    if (underlay) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="plot-underlay svelte-c5n3b4">`);
      underlay($$renderer2, plotOptions);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <svg${attr("width", fixedWidth || width)}${attr("height", height)} fill="currentColor"${attr("viewBox", `0 0 ${stringify(width)} ${stringify(height)}`)}>`);
    facetAxes?.($$renderer2);
    $$renderer2.push(`<!---->`);
    FacetGrid($$renderer2, {
      marks: explicitMarks,
      children: ($$renderer3) => {
        if (children) {
          $$renderer3.push("<!--[-->");
          children($$renderer3, {
            width,
            height,
            options: plotOptions,
            scales: plotState.scales,
            mapXY,
            hasProjection,
            hasExplicitAxisX,
            hasExplicitAxisY,
            hasExplicitGridX,
            hasExplicitGridY
          });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    $$renderer2.push(`<!----></svg> `);
    if (overlay) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="plot-overlay svelte-c5n3b4">`);
      overlay?.($$renderer2, {
        width,
        height,
        options: plotOptions,
        scales: plotState.scales,
        mapXY,
        hasProjection,
        hasExplicitAxisX,
        hasExplicitAxisY,
        hasExplicitGridX,
        hasExplicitGridY
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (footer) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<figcaption class="plot-footer svelte-c5n3b4">`);
      footer?.($$renderer2);
      $$renderer2.push(`<!----></figcaption>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></figure>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { getWidth });
  });
}
const RENAME = "__renamed__";
function groupFacetsAndZ(items, channels, reduce) {
  const groupBy = ["fx", "fy", "z"].map((groupChannel) => {
    const groupByChannel = groupChannel === "z" ? channels.z ? "z" : channels.fill ? "fill" : channels.stroke ? "stroke" : false : channels[groupChannel] ? groupChannel : false;
    if (groupByChannel) {
      const groupByPropName = typeof channels[groupByChannel] === "string" ? channels[groupByChannel] : `__group_${groupByChannel}`;
      return [
        groupByChannel,
        groupByPropName,
        (d) => resolveChannel(groupByChannel, d, channels)
      ];
    } else {
      return [null, null, () => true];
    }
  });
  const groups$1 = groups(items, ...groupBy.map((d) => d[2]));
  for (const [fxKey, fxGroups] of groups$1) {
    const newItemGroupProps = {};
    if (groupBy[0][0] !== null)
      newItemGroupProps[groupBy[0][1]] = fxKey;
    for (const [fyKey, fyGroups] of fxGroups) {
      if (groupBy[1][0] !== null)
        newItemGroupProps[groupBy[1][1]] = fyKey;
      for (const [zKey, zGroups] of fyGroups) {
        if (groupBy[2][0] !== null)
          newItemGroupProps[groupBy[2][1]] = zKey;
        reduce(zGroups, newItemGroupProps);
      }
    }
  }
  return Object.fromEntries(groupBy.filter(([groupByChannel]) => groupByChannel !== null).map(([groupByChannel, groupByProp]) => [groupByChannel, groupByProp]));
}
function dodgeX(args, plotState) {
  if (!args.dodgeX)
    return args.data;
  let { anchor = "left", padding = 1, r = args.dodgeX.r } = maybeAnchor(args.dodgeX);
  let anchorFunction;
  switch (`${anchor}`.toLowerCase()) {
    case "left":
      anchorFunction = anchorXLeft;
      break;
    case "right":
      anchorFunction = anchorXRight;
      break;
    case "middle":
      anchorFunction = anchorXMiddle;
      break;
    default:
      throw new Error(`unknown dodge anchor: ${anchor}`);
  }
  return dodge("x", "y", anchorFunction, Number(padding), r, args, plotState);
}
function dodgeY(args, plotState) {
  if (!args.dodgeY)
    return args.data;
  let { anchor = "bottom", padding = 1, r = args.dodgeY.r } = maybeAnchor(args.dodgeY);
  let anchorFunction;
  switch (`${anchor}`.toLowerCase()) {
    case "top":
      anchorFunction = anchorYTop;
      break;
    case "bottom":
      anchorFunction = anchorYBottom;
      break;
    case "middle":
      anchorFunction = anchorYMiddle;
      break;
    default:
      throw new Error(`unknown dodge anchor: ${anchor}`);
  }
  return dodge("y", "x", anchorFunction, Number(padding), r, args, plotState);
}
function dodge(y, x, anchor, padding, r, { data, ...channels }, plotState) {
  const { fx, fy } = channels;
  let [ky, ty] = anchor(plotState);
  const compare = ky ? compareAscending : compareSymmetric;
  const cr = r !== void 0 ? r : 3;
  groupFacetsAndZ(data, { fx, fy }, (items) => {
    const tree = IntervalTree();
    const data2 = items.filter((d) => (typeof d.r !== "number" || d.r >= 0) && isFinite(d[x]) && isFinite(d[y]));
    const intervals = new Float64Array(2 * data2.length + 2);
    data2.forEach((d, i) => {
      const ri = d.r ?? r ?? 3;
      const y0 = ky ? ri + padding : 0;
      const l = d[x] - ri;
      const h = d[x] + ri;
      let k = 2;
      tree.queryInterval(l - padding, h + padding, ([, , j]) => {
        const yj = data2[j][y] - y0;
        const dx = d[x] - data2[j][x];
        const dr = padding + (channels.r ? d.r + data2[j].r : 2 * cr);
        const dy = Math.sqrt(dr * dr - dx * dx);
        intervals[k++] = yj - dy;
        intervals[k++] = yj + dy;
      });
      let candidates = intervals.slice(0, k);
      if (ky)
        candidates = candidates.filter((y2) => y2 >= 0);
      out: for (const diff of candidates.sort(compare)) {
        for (let j = 0; j < k; j += 2) {
          if (intervals[j] + 1e-6 < diff && diff < intervals[j + 1] - 1e-6) {
            continue out;
          }
        }
        d[y] = diff + y0;
        break;
      }
      tree.insert([l, h, i]);
    });
    if (!ky)
      ky = 1;
    data2.forEach((d) => d[y] = d[y] * ky + ty);
  });
  return data;
}
function maybeAnchor(anchor) {
  return typeof anchor === "string" ? { anchor } : anchor;
}
function anchorXLeft({ options: { marginLeft } }) {
  return [1, marginLeft];
}
function anchorXRight({ facetWidth: width, options: { marginLeft } }) {
  return [-1, marginLeft + width];
}
function anchorXMiddle({ facetWidth: width, options: { marginLeft } }) {
  return [0, marginLeft + width / 2];
}
function anchorYTop({ options: { marginTop } }) {
  return [1, marginTop];
}
function anchorYBottom({ facetHeight: height }) {
  return [-1, height];
}
function anchorYMiddle({ facetHeight: height, options: { marginTop, marginBottom } }) {
  return [0, (marginTop + height) / 2];
}
function compareSymmetric(a, b) {
  return Math.abs(a) - Math.abs(b);
}
function compareAscending(a, b) {
  return a - b;
}
function Mark_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      data = [],
      children,
      type,
      channels = [],
      required = [],
      requiredScales = {},
      defaults = {},
      $$slots,
      $$events,
      ...options
    } = $$props;
    [...channels, "fx", "fy"];
    const { addMark, removeMark, getTopLevelFacet, getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const facet = getTopLevelFacet();
    const { getFacetState } = getContext("svelteplot/facet");
    const { left, top } = getFacetState();
    class Mark {
      id;
      type;
      channels = [];
      scales = /* @__PURE__ */ new Set();
      data = [];
      options = {};
      constructor(type2) {
        this.id = Symbol();
        this.type = type2;
      }
    }
    const mark = new Mark(type);
    const facetMode = options.facet || "auto";
    const optionsWithAutoFacet = {
      ...options,
      __firstFacet: left && top,
      ...facet && facet.data && (facetMode === "auto" && facet.data === data || facetMode === "include") ? { fx: facet.x, fy: facet.y } : {}
    };
    const { getTestFacet } = getContext("svelteplot/facet");
    const testFacet = getTestFacet();
    const resolvedData = data.map((d, i) => ({ ...d, [INDEX]: i })).flatMap((row, index) => {
      const channels2 = options;
      if (!testFacet(row, channels2) || !testFilter(row, channels2)) return [];
      const out = { datum: row, index };
      for (const [channel] of Object.entries(CHANNEL_SCALE)) {
        if (options?.[channel] !== void 0 && out[channel] === void 0) {
          out[channel] = resolveChannel(channel, row, options);
        }
      }
      return [out];
    });
    const errors = [
      ...required.filter((name) => options[name] == null).map((name) => `missing channel value for ${mark.type} mark: ${name}`),
      ...Object.entries(requiredScales).filter(([scale, types]) => {
        return !types.includes(plot.scales[scale].type);
      }).map(([scale, types]) => `scale type mismatch for ${scale} (needs ${types.join(" or ")})`)
    ];
    const usedScales = getUsedScales(plot, optionsWithAutoFacet, mark);
    const scaledData = dodge2(
      resolvedData.flatMap((row) => {
        const out = { datum: row.datum, index: row[INDEX], valid: true };
        out.dx = Number(resolveProp(options.dx, out.datum, 0));
        out.dy = Number(resolveProp(options.dy, out.datum, 0));
        if (plot.scales.projection && mark.type !== "geo") {
          for (const suffix of ["", "1", "2"]) {
            if (options?.[`x${suffix}`] !== void 0 && options?.[`y${suffix}`] !== void 0) {
              const [x, y] = mark.type === "line" ? [row.x, row.y] : (
                // line paths are projected later
                projectXY(plot.scales, row.x, row.y, usedScales.x, usedScales.y)
              );
              out[`x${suffix}`] = x;
              out[`y${suffix}`] = y;
              out.valid = out.valid && isValid(row.x) && isValid(row.y) && isValid(x) && isValid(y);
            }
          }
        }
        for (const [channel, scale] of Object.entries(CHANNEL_SCALE)) {
          if (options?.[channel] != null && out[channel] === void 0) {
            const value = row[channel];
            const origChannel = options?.[RENAME]?.[channel] || channel;
            const scaled = usedScales[channel] ? scale === "x" ? projectX(origChannel, plot.scales, value) : scale === "y" ? projectY(origChannel, plot.scales, value) : scale === "color" && !isValid(value) ? plot.options.color.unknown : plot.scales[scale].fn(value) : value;
            out.valid = out.valid && (scale === "color" || isValid(value));
            out[channel] = Number.isFinite(scaled) && (scale === "x" || scale === "y") ? scaled + (scale === "x" ? out.dx : out.dy) : scaled;
          } else if (defaults[channel]) {
            out[channel] = defaults[channel];
          }
        }
        return [out];
      }),
      options
    );
    function dodge2(data2, options2) {
      if (options2.dodgeX) {
        return dodgeX({ data: data2, ...options2 }, plot);
      }
      if (options2.dodgeY) {
        return dodgeY({ data: data2, ...options2 }, plot);
      }
      return data2;
    }
    if (errors.length) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<text transform="translate(10,10)" class="svelte-1vdc81s"><!--[-->`);
      const each_array = ensure_array_like(errors);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let error = each_array[i];
        $$renderer2.push(`<tspan x="0"${attr("dy", i ? 14 : 0)}>${escape_html(error)}</tspan>`);
      }
      $$renderer2.push(`<!--]--></text>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2, { mark, usedScales, scaledData });
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function removeIdenticalLines(input) {
  const uniqueTicks = [];
  if (!input.length)
    return input;
  for (let c = 0; c < input.length; c++) {
    uniqueTicks.push({
      ...input[c],
      text: []
    });
  }
  for (let l = 0; l < input[0].text.length; l++) {
    const isIdentical = input.length > 1 && input.every((tick) => input[0].text[l] === tick.text[l]);
    for (let c = 0; c < input.length; c++) {
      if (!isIdentical && input[c].text[l])
        uniqueTicks[c].text.push(input[c].text[l]);
    }
  }
  return uniqueTicks;
}
function BaseAxisX($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      scaleFn,
      scaleType,
      ticks: ticks2,
      tickFormat,
      anchor,
      tickSize,
      tickPadding,
      tickFontSize,
      tickClass,
      marginTop,
      height,
      options,
      plot,
      title,
      text = true
    } = $$props;
    function splitTick(tick) {
      return Array.isArray(tick) ? tick : [tick];
    }
    let tickRotate = plot.options.x.tickRotate || 0;
    let tickY = anchor === "bottom" ? marginTop + height : marginTop;
    let isQuantitative = scaleType !== "point" && scaleType !== "band";
    randomId();
    const { autoMarginTop, autoMarginBottom } = getContext("svelteplot/autoMargins");
    const positionedTicks = (() => {
      let tickObjects = removeIdenticalLines(ticks2.map((tick, i) => {
        const datum = { [RAW_VALUE]: tick, [INDEX]: i };
        return {
          ...datum,
          hidden: false,
          dx: +resolveProp(options.dx, datum, 0),
          dy: +resolveProp(options.dy, datum, 0),
          x: scaleFn(tick) + (scaleType === "band" ? scaleFn.bandwidth() * 0.5 : 0),
          text: splitTick(tickFormat(tick, i)),
          element: null
        };
      }));
      const T = tickObjects.length;
      if (text) {
        for (let i = 0; i < T; i++) {
          let j = i;
          do {
            j--;
          } while (j >= 0 && tickObjects[j].hidden);
          if (j >= 0) {
            const tickLabelSpace = Math.abs(tickObjects[i].x - tickObjects[j].x);
            tickObjects[i].hidden = tickLabelSpace < 15;
          }
        }
      }
      return tickObjects;
    })();
    $$renderer2.push(`<g class="axis-x"><!--[-->`);
    const each_array = ensure_array_like(
      // measure tick label heights
      // clear margins on destroy
      positionedTicks
    );
    for (let t = 0, $$length = each_array.length; t < $$length; t++) {
      let tick = each_array[t];
      if (testFilter(tick, options) && !tick.hidden) {
        $$renderer2.push("<!--[-->");
        const tickClass_ = resolveProp(tickClass, tick);
        const tickFontSize_ = +resolveProp(tickFontSize, tick, 10);
        $$renderer2.push(`<g${attr_class(`tick ${stringify(tickClass_ || "")}`)}${attr("transform", `translate(${stringify(tick.x + tick.dx)}, ${stringify(tickY + tick.dy)})`)}${attr("text-anchor", tickRotate < 0 ? "end" : tickRotate > 0 ? "start" : "middle")}>`);
        if (tickSize) {
          $$renderer2.push("<!--[-->");
          const [tickLineStyle, tickLineClass] = resolveStyles(plot, { datum: tick }, options, "stroke", { x: true }, true);
          $$renderer2.push(`<line${attr_style(tickLineStyle)}${attr_class(clsx(tickLineClass), "svelte-1yg4edo")}${attr("y2", anchor === "bottom" ? tickSize : -tickSize)}></line>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
        if (text) {
          $$renderer2.push("<!--[-->");
          const textLines = tick.text;
          const prevTextLines = t && positionedTicks[t - 1].text;
          const moveDown = (tickSize + tickPadding + (tickRotate !== 0 ? tickFontSize_ * 0.35 : 0)) * (anchor === "bottom" ? 1 : -1);
          const [textStyle, textClass] = resolveStyles(
            plot,
            { datum: tick },
            {
              fontVariant: isQuantitative ? "tabular-nums" : "normal",
              ...options,
              textAnchor: options.textAnchor === "auto" ? tickRotate < 0 ? "end" : tickRotate > 0 ? "start" : "middle" : options.textAnchor,
              fontSize: tickFontSize_,
              stroke: null
            },
            "fill",
            { x: true },
            true
          );
          $$renderer2.push(`<text${attr("transform", `translate(0, ${stringify(moveDown)})  rotate(${stringify(tickRotate)})`)}${attr_style(textStyle)}${attr_class(clsx(textClass), "svelte-1yg4edo")}${attr("x", 0)}${attr("y", 0)}${attr("dominant-baseline", tickRotate !== 0 ? "central" : anchor === "bottom" ? "hanging" : "auto")}>`);
          if (ticks2.length > 0 || t === 0 || t === ticks2.length - 1) {
            $$renderer2.push("<!--[-->");
            if (textLines.length === 1) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`${escape_html(textLines[0])}`);
            } else {
              $$renderer2.push("<!--[!-->");
              $$renderer2.push(`<!--[-->`);
              const each_array_1 = ensure_array_like(textLines);
              for (let i = 0, $$length2 = each_array_1.length; i < $$length2; i++) {
                let line2 = each_array_1[i];
                $$renderer2.push(`<tspan x="0"${attr("dy", i ? 12 : 0)}>${escape_html(!prevTextLines || prevTextLines[i] !== line2 ? line2 : "")}</tspan>`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></text>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></g>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></g>`);
  });
}
const DATE_TIME = {
  hour: "numeric",
  minute: "numeric",
  month: "short",
  day: "numeric"
};
const autoFormatDateTime = (locale) => {
  const format = new Intl.DateTimeFormat(locale, DATE_TIME).format;
  return (date) => format(date).replace(", ", "\n");
};
const DAY_MONTH = {
  month: "short",
  day: "numeric"
};
const autoFormatDayMonth = (locale) => {
  const format = new Intl.DateTimeFormat(locale, DAY_MONTH).format;
  return (date) => format(date).replace(" ", "\n");
};
const MONTH_YEAR = {
  month: "short",
  year: "numeric"
};
const autoFormatMonthYear = (locale) => {
  const format = new Intl.DateTimeFormat(locale, MONTH_YEAR).format;
  return (date) => format(date).replace(" ", "\n");
};
function autoTimeFormat(x, plotWidth, plotLocale) {
  const daysPer100Px = (toNumber(x.domain[1]) - toNumber(x.domain[0])) / plotWidth / 864e5 * 100;
  const format = daysPer100Px < 1 ? autoFormatDateTime(plotLocale) : daysPer100Px < 30 ? autoFormatDayMonth(plotLocale) : autoFormatMonthYear(plotLocale);
  return (date) => format(date).split("\n");
}
function toNumber(d) {
  return isDate(d) ? d.getTime() : +d;
}
function AxisX($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...markProps } = $$props;
    const DEFAULTS = {
      tickSize: 6,
      tickPadding: 3,
      tickFontSize: 11,
      titleFontSize: 11,
      textAnchor: "auto",
      opacity: 0.8,
      anchor: "bottom",
      ...getPlotDefaults().axis,
      ...getPlotDefaults().axisX
    };
    const {
      ticks: magicTicks,
      data = Array.isArray(magicTicks) ? magicTicks : [],
      automatic = false,
      title,
      anchor,
      facetAnchor = "auto",
      interval = typeof magicTicks === "string" ? magicTicks : void 0,
      tickSize,
      tickFontSize,
      tickPadding,
      labelAnchor,
      tickFormat,
      tickClass,
      class: className,
      tickCount = typeof magicTicks === "number" ? magicTicks : void 0,
      tickSpacing,
      text = true,
      ...options
    } = { ...DEFAULTS, ...markProps };
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const autoTickCount = tickCount != null ? tickCount : tickSpacing != null ? Math.max(3, Math.round(plot.facetWidth / tickSpacing)) : Math.max(3, Math.round(plot.facetWidth / plot.options.x.tickSpacing));
    const ticks2 = data.length > 0 ? (
      // use custom tick values if user passed any as prop
      Array.from(new Set(data))
    ) : (
      // use custom scale tick values if user passed any as plot scale option
      autoTicks(plot.scales.x.type, plot.options.x.ticks, interval || plot.options.x.interval, plot.scales.x.domain, plot.scales.x.fn, autoTickCount)
    );
    const tickFmt = tickFormat || plot.options.x.tickFormat;
    const useTickFormat = typeof tickFmt === "function" ? tickFmt : plot.scales.x.type === "band" || plot.scales.x.type === "point" ? (d) => d : plot.scales.x.type === "time" ? (
      // time scale
      typeof tickFmt === "object" ? (d) => Intl.DateTimeFormat(plot.options.locale, tickFmt).format(d) : autoTimeFormat(plot.scales.x, plot.plotWidth, plot.options.locale)
    ) : (
      // numeric scale
      typeof tickFmt === "object" ? (d) => Intl.NumberFormat(plot.options.locale, tickFmt).format(d) : (
        // auto
        (d) => Intl.NumberFormat(plot.options.locale, {
          // use compact notation if range covers multipe magnitudes
          ...new Set(ticks2.map(Math.log10).map(Math.round)).size > 1 ? { notation: "compact" } : {},
          ...DEFAULTS.numberFormat,
          style: plot.options.x.percent ? "percent" : "decimal"
        }).format(d)
      )
    );
    const optionsLabel = plot.options?.x?.label;
    const scaleType = plot.scales.x.type;
    const isQuantitative = scaleType !== "point" && scaleType !== "band";
    const useTitle = title !== void 0 ? title || "" : optionsLabel === null ? null : optionsLabel !== void 0 ? optionsLabel : plot.scales.x.autoTitle ? isQuantitative ? plot.options.x?.reverse ? `← ${plot.scales.x.autoTitle}${plot.options.x.percent ? " (%)" : ""}` : `${plot.scales.x.autoTitle}${plot.options.x.percent ? " (%)" : ""} →` : plot.scales.x.autoTitle : "";
    const useLabelAnchor = labelAnchor || plot.options?.x?.labelAnchor || "auto";
    const titleAlign = useLabelAnchor === "auto" ? isQuantitative ? "right" : "center" : useLabelAnchor;
    const { getFacetState } = getContext("svelteplot/facet");
    const { left, top, bottom, bottomEmpty, topEmpty } = getFacetState();
    const useFacetAnchor = facetAnchor !== "auto" ? facetAnchor : anchor === "bottom" ? "bottom-empty" : "top-empty";
    const showAxis = useFacetAnchor === "top" ? top : useFacetAnchor === "bottom" ? bottom : useFacetAnchor === "top-empty" ? topEmpty : bottomEmpty;
    Mark_1($$renderer2, spread_props([
      {
        type: "axisX",
        data: data.length ? data.map((tick) => ({ __x: tick })) : [],
        channels: ["x"]
      },
      options,
      {
        x: "__x",
        automatic,
        children: ($$renderer3) => {
          if (left && top && useTitle) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<text${attr_style(resolveScaledStyles(
              null,
              {
                opacity: 0.8,
                ...options,
                stroke: null,
                fontSize: options.titleFontSize || 11,
                textAnchor: titleAlign === "right" ? "end" : titleAlign === "center" ? "middle" : "start"
              },
              {},
              plot,
              "fill"
            ))}${attr("x", plot.options.marginLeft + plot.plotWidth * (titleAlign === "right" ? 1 : titleAlign === "center" ? 0.5 : 0))}${attr("y", anchor === "top" ? (options.titleFontSize || 11) + 5 : plot.height - (options.titleFontSize || 11) - 5)} class="axis-x-title svelte-x6donl"${attr("dominant-baseline", anchor === "top" ? "auto" : "hanging")}>${escape_html(useTitle)}</text>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
          if (showAxis) {
            $$renderer3.push("<!--[-->");
            BaseAxisX($$renderer3, {
              anchor,
              options,
              plot,
              text,
              tickClass,
              tickFontSize,
              tickPadding,
              ticks: ticks2,
              tickSize,
              height: plot.facetHeight,
              marginTop: plot.options.marginTop,
              scaleFn: plot.scales.x.fn,
              scaleType: plot.scales.x.type,
              tickFormat: useTickFormat,
              title: useTitle
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function BaseAxisY($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      scaleFn,
      scaleType,
      ticks: ticks2,
      tickFormat,
      anchor,
      lineAnchor,
      tickSize,
      tickPadding,
      tickFontSize,
      tickClass,
      marginLeft,
      width,
      title,
      plot,
      options,
      text = true
    } = $$props;
    const LINE_ANCHOR = { top: "hanging", center: "middle", bottom: "auto" };
    const positionedTicks = (() => {
      let tickObjects = ticks2.map((tick, i) => {
        const datum = { [RAW_VALUE]: tick, [INDEX]: i };
        return {
          ...datum,
          hidden: false,
          dx: +resolveProp(options.dx, datum, 0),
          dy: +resolveProp(options.dy, datum, 0),
          y: scaleFn(tick) + (scaleType === "band" ? scaleFn.bandwidth() * 0.5 : 0),
          text: tickFormat(tick, i),
          element: null
        };
      });
      if (text) {
        const T = tickObjects.length;
        for (let i = 0; i < T; i++) {
          let j = i;
          do {
            j--;
          } while (j >= 0 && tickObjects[j].hidden);
          if (j >= 0) {
            const tickLabelSpace = Math.abs(tickObjects[i].y - tickObjects[j].y);
            tickObjects[i].hidden = tickLabelSpace < 15;
          }
        }
      }
      return tickObjects;
    })();
    const isQuantitative = scaleType !== "point" && scaleType !== "band";
    randomId();
    const { autoMarginLeft, autoMarginRight, autoMarginTop } = getContext("svelteplot/autoMargins");
    $$renderer2.push(`<g class="axis-y"><!--[-->`);
    const each_array = ensure_array_like(
      // measure tick label widths
      // add margin top to make some space for title
      // no need for extra margin top
      // clear margins on destroy
      positionedTicks
    );
    for (let t = 0, $$length = each_array.length; t < $$length; t++) {
      let tick = each_array[t];
      if (testFilter(tick, options) && !tick.hidden) {
        $$renderer2.push("<!--[-->");
        const tickClass_ = resolveProp(tickClass, tick);
        const [textStyle, textClass] = resolveStyles(
          plot,
          { datum: tick },
          {
            fontVariant: isQuantitative ? "tabular-nums" : "normal",
            ...options,
            fontSize: tickFontSize,
            stroke: null
          },
          "fill",
          { y: true },
          true
        );
        $$renderer2.push(`<g${attr_class(`tick ${stringify(tickClass_ || "")}`)}${attr("transform", `translate(${stringify(tick.dx + marginLeft + (anchor === "left" ? 0 : width))},${stringify(tick.y + tick.dy)})`)}>`);
        if (tickSize) {
          $$renderer2.push("<!--[-->");
          const [tickLineStyle, tickLineClass] = resolveStyles(plot, { datum: tick }, options, "stroke", { y: true }, true);
          $$renderer2.push(`<line${attr_style(tickLineStyle)}${attr_class(clsx(tickLineClass), "svelte-inyq83")}${attr("x2", anchor === "left" ? -tickSize : tickSize)}></line>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
        if (text) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<text${attr_class(clsx([textClass, { "is-left": anchor === "left" }]), "svelte-inyq83")}${attr_style(textStyle)}${attr("x", (tickSize + tickPadding) * (anchor === "left" ? -1 : 1))}${attr("dominant-baseline", LINE_ANCHOR[lineAnchor])}>${escape_html(Array.isArray(tick.text) ? tick.text.join(" ") : tick.text)}</text>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></g>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></g>`);
  });
}
function AxisY($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...markProps } = $$props;
    const DEFAULTS = {
      tickSize: 6,
      tickPadding: 3,
      tickFontSize: 11,
      opacity: 0.8,
      anchor: "left",
      textAnchor: "auto",
      ...getPlotDefaults().axis,
      ...getPlotDefaults().axisY
    };
    const {
      ticks: magicTicks,
      data = Array.isArray(magicTicks) ? magicTicks : [],
      automatic = false,
      title,
      anchor = "left",
      class: className,
      facetAnchor = "auto",
      interval = typeof magicTicks === "string" ? magicTicks : void 0,
      lineAnchor = "center",
      textAnchor,
      tickSize,
      tickFontSize,
      tickPadding,
      tickFormat,
      tickClass,
      tickCount = typeof magicTicks === "number" ? magicTicks : void 0,
      tickSpacing,
      text = true,
      ...options
    } = { ...DEFAULTS, ...markProps };
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const autoTickCount = tickCount != null ? tickCount : tickSpacing != null ? Math.max(3, Math.round(plot.facetHeight / tickSpacing)) : Math.max(2, Math.round(plot.facetHeight / plot.options.y.tickSpacing));
    const ticks2 = data.length > 0 ? (
      // use custom tick values if user passed any as prop
      data
    ) : (
      // use custom scale tick values if user passed any as plot scale option
      autoTicks(plot.scales.y.type, plot.options.y.ticks, interval || plot.options.y.interval, plot.scales.y.domain, plot.scales.y.fn, autoTickCount)
    );
    const tickFmt = tickFormat || plot.options.y.tickFormat;
    const useTickFormat = typeof tickFmt === "function" ? tickFmt : plot.scales.y.type === "band" || plot.scales.y.type === "point" ? (d) => d : plot.scales.y.type === "time" ? (
      // time scale
      typeof tickFmt === "object" ? (d) => Intl.DateTimeFormat(plot.options.locale, tickFmt).format(d) : autoTimeFormat(plot.scales.y, plot.plotWidth, plot.options.locale)
    ) : (
      // numeric scale
      typeof tickFmt === "object" ? (d) => Intl.NumberFormat(plot.options.locale, tickFmt).format(d) : (
        // auto
        (d) => Intl.NumberFormat(plot.options.locale, {
          // use compact notation if range covers multipe magnitudes
          ...new Set(ticks2.map(Math.log10).map(Math.round)).size > 1 ? { notation: "compact" } : {},
          ...DEFAULTS.numberFormat,
          style: plot.options.y.percent ? "percent" : "decimal"
        }).format(d)
      )
    );
    const optionsLabel = plot.options.y.label;
    const useTitle = title !== void 0 ? title || "" : optionsLabel === null ? null : optionsLabel !== void 0 ? optionsLabel : plot.scales.y.autoTitle ? `↑ ${plot.scales.y.autoTitle}${plot.options.y.percent ? " (%)" : ""}` : "";
    const { getFacetState } = getContext("svelteplot/facet");
    const { left, leftEmpty, right, rightEmpty, top } = getFacetState();
    const useFacetAnchor = facetAnchor !== "auto" ? facetAnchor : anchor === "left" ? "left-empty" : "right-empty";
    const showAxis = useFacetAnchor === "left" ? left : useFacetAnchor === "right" ? right : useFacetAnchor === "left-empty" ? leftEmpty : rightEmpty;
    Mark_1($$renderer2, spread_props([
      {
        type: "axisY",
        data: data.length ? data.map((tick) => ({ __y: tick })) : [],
        channels: ["y"]
      },
      { ...options, y: "__y" },
      {
        automatic,
        children: ($$renderer3) => {
          if (left && top && useTitle) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<text${attr_style(resolveScaledStyles(
              null,
              {
                opacity: 0.8,
                ...options,
                fontSize: options.titleFontSize ?? 11,
                fill: "currentColor",
                stroke: null,
                textAnchor: anchor === "left" ? "start" : "end"
              },
              {},
              plot,
              "fill"
            ))}${attr("x", anchor === "left" ? 0 : plot.width)}${attr("y", 5)} class="axis-y-title svelte-lok93m" dominant-baseline="hanging">${escape_html(useTitle)}</text>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
          if (showAxis) {
            $$renderer3.push("<!--[-->");
            BaseAxisY($$renderer3, {
              anchor,
              lineAnchor,
              options: {
                ...options,
                textAnchor: textAnchor == null || textAnchor === "auto" ? anchor === "left" ? "end" : "start" : textAnchor
              },
              plot,
              text,
              tickClass,
              tickFontSize,
              tickPadding,
              ticks: ticks2,
              tickSize,
              marginLeft: plot.options.marginLeft,
              scaleFn: plot.scales.y.fn,
              scaleType: plot.scales.y.type,
              tickFormat: useTickFormat,
              title: useTitle,
              width: plot.facetWidth
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function roundedRect(x, y, width, height, borderRadius = {
  topLeft: 0,
  topRight: 0,
  bottomLeft: 0,
  bottomRight: 0
}) {
  const maxRadius = Math.min(width, height) / 2;
  const [tl, tr, bl, br] = (typeof borderRadius === "number" ? new Array(4).fill(borderRadius) : [
    borderRadius?.topLeft || 0,
    borderRadius?.topRight || 0,
    borderRadius?.bottomLeft || 0,
    borderRadius?.bottomRight || 0
  ]).map((r) => Math.min(r, maxRadius));
  return `
    M ${x + tl} ${y}
    H ${x + width - tr}
    ${tr ? `A ${tr} ${tr} 0 0 1 ${x + width} ${y + tr}` : ""}
    V ${y + height - br}
    ${br ? `A ${br} ${br} 0 0 1 ${x + width - br} ${y + height}` : ""}
    H ${x + bl}
    ${bl ? `A ${bl} ${bl} 0 0 1 ${x} ${y + height - bl}` : ""}
    V ${y + tl}
    ${tl ? `A ${tl} ${tl} 0 0 1 ${x + tl} ${y}` : ""}
    Z
  `;
}
function Anchor($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { datum = {}, options = {}, children } = $$props;
    const href = resolveProp(options.href, datum, null);
    const target = resolveProp(options.target, datum, null);
    const rel = resolveProp(options.rel, datum, null);
    const type = resolveProp(options.type, datum, null);
    const download = resolveProp(options.download, datum, null);
    const dataAttributes = Object.fromEntries(Object.entries(options).filter(([key]) => key.startsWith("data-sveltekit-")));
    if (href) {
      $$renderer2.push("<!--[-->");
      element(
        $$renderer2,
        "a",
        () => {
          $$renderer2.push(`${attributes(
            {
              href,
              target,
              rel,
              type,
              download,
              ...dataAttributes,
              "aria-label": "link",
              xmlns: "http://www.w3.org/2000/svg"
            },
            void 0,
            void 0,
            void 0,
            3
          )}`);
        },
        () => {
          children?.($$renderer2);
          $$renderer2.push(`<!---->`);
        }
      );
    } else {
      $$renderer2.push("<!--[!-->");
      children?.($$renderer2);
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function RectPath($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      datum,
      options,
      class: className = null,
      x,
      y,
      width,
      height,
      useInsetAsFallbackVertically = true,
      useInsetAsFallbackHorizontally = true,
      usedScales,
      fallbackStyle
    } = $$props;
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const inset = +resolveProp(options.inset, datum?.datum, 0);
    const insetLeft = +resolveProp(options.insetLeft, datum?.datum, useInsetAsFallbackHorizontally ? inset : 0);
    const insetRight = +resolveProp(options.insetRight, datum?.datum, useInsetAsFallbackHorizontally ? inset : 0);
    const insetTop = +resolveProp(options.insetTop, datum?.datum, useInsetAsFallbackVertically ? inset : 0);
    const insetBottom = +resolveProp(options.insetBottom, datum?.datum, useInsetAsFallbackVertically ? inset : 0);
    const borderRadius = options.borderRadius ?? 0;
    const hasBorderRadius = typeof borderRadius === "number" && borderRadius > 0 || typeof borderRadius === "object" && Math.max(borderRadius.topRight ?? 0, borderRadius.bottomRight ?? 0, borderRadius.topLeft ?? 0, borderRadius.bottomLeft ?? 0) > 0;
    const [style, styleClass] = resolveStyles(
      plot,
      datum,
      options,
      !fallbackStyle ? options.stroke && !options.fill ? "stroke" : "fill" : fallbackStyle,
      usedScales
    );
    Anchor($$renderer2, {
      options,
      datum: datum?.datum,
      children: ($$renderer3) => {
        if (hasBorderRadius) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<path${attr("transform", `translate(${stringify(x + insetLeft)},${stringify(y + insetBottom)})`)}${attr("d", roundedRect(0, 0, width - insetLeft - insetRight, height - insetTop - insetBottom, borderRadius))}${attr_class(clsx([styleClass, className]))}${attr_style(style)}></path>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<rect${attr("transform", `translate(${stringify(x + insetLeft)},${stringify(y + insetBottom)})`)}${attr("width", width - insetLeft - insetRight)}${attr("height", height - insetTop - insetBottom)}${attr_class(clsx([styleClass, className]))}${attr_style(style)}></rect>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
  });
}
function Frame($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...markProps } = $$props;
    const DEFAULTS = {
      fill: void 0,
      class: "frame",
      stroke: void 0,
      fillOpacity: 1,
      strokeOpacity: 1,
      ...getPlotDefaults().frame
    };
    const {
      automatic,
      class: className,
      fill,
      stroke,
      opacity,
      fillOpacity,
      strokeOpacity,
      ...options
    } = { ...DEFAULTS, ...markProps };
    const dx = resolveProp(options.dx, null, 0) || 0;
    const dy = resolveProp(options.dy, null, 0) || 0;
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    {
      let children = function($$renderer3, { usedScales }) {
        RectPath($$renderer3, {
          class: className,
          datum: {
            fill,
            stroke,
            fillOpacity,
            strokeOpacity,
            opacity,
            datum: {},
            valid: true
          },
          x: plot.options.marginLeft + dx,
          y: plot.options.marginTop + dy,
          width: plot.facetWidth,
          height: plot.facetHeight,
          usedScales,
          fallbackStyle: fill == null || fill === "none" ? "stroke" : "fill",
          options: {
            ...options,
            fill,
            stroke,
            fillOpacity,
            opacity,
            strokeOpacity
          }
        });
      };
      Mark_1($$renderer2, {
        type: "frame",
        automatic,
        children,
        $$slots: { default: true }
      });
    }
  });
}
function ColorLegend($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = null } = $$props;
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const DEFAULTS = getPlotDefaults();
    const legendTitle = plot.options.color.label;
    const scaleType = plot.scales.color.type;
    const tickFormat = typeof plot.options.color?.tickFormat === "function" ? plot.options.color.tickFormat : Intl.NumberFormat(plot.options.locale, plot.options.color.tickFormat || { ...DEFAULTS.numberFormat, notation: "compact" }).format;
    const randId = Math.round(Math.random() * 1e6).toFixed(32);
    if (plot.scales.color.manualActiveMarks > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`color-legend ${stringify(className || "")}`, "svelte-1269hcs")}>`);
      if (legendTitle) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="title svelte-1269hcs">${html(legendTitle)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (scaleType === "ordinal" || scaleType === "categorical") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<!--[-->`);
        const each_array = ensure_array_like(plot.scales.color.domain);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let value = each_array[$$index];
          const symbolV = plot.scales.symbol.fn(value);
          const symbolType = maybeSymbol(symbolV);
          $$renderer2.push(`<div class="item svelte-1269hcs"><div class="swatch svelte-1269hcs"><svg width="15" height="15">`);
          if (plot.colorSymbolRedundant) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path transform="translate(7.5,7.5)"${attr("d", symbol(symbolType, 40)())} class="svelte-1269hcs"${attr_style("", {
              fill: plot.hasFilledDotMarks ? plot.scales.color.fn(value) : "none",
              stroke: plot.hasFilledDotMarks ? null : plot.scales.color.fn(value)
            })}></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<rect width="15" height="15"${attr_style("", { fill: plot.scales.color.fn(value) })}></rect>`);
          }
          $$renderer2.push(`<!--]--></svg></div> <span class="item-label svelte-1269hcs">${escape_html(value)}</span></div>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (scaleType === "quantile" || scaleType === "quantize" || scaleType === "threshold") {
          $$renderer2.push("<!--[-->");
          const domain = extent(plot.scales.color.fn.domain());
          const range$1 = plot.scales.color.range;
          const tickLabels = scaleType === "quantile" ? plot.scales.color.fn.quantiles() : scaleType === "quantize" ? plot.scales.color.fn.thresholds() : plot.scales.color.fn.domain();
          const ticks2 = range(domain[0], domain[1], (domain[1] - domain[0]) / range$1.length).slice(1);
          Plot_1($$renderer2, {
            maxWidth: "240px",
            margin: 1,
            marginLeft: 1,
            marginRight: 1,
            marginTop: 6,
            marginBottom: 20,
            height: 38,
            inset: 0,
            x: { domain, ticks: ticks2 },
            children: ($$renderer3) => {
              $$renderer3.push(`<defs><linearGradient${attr("id", `gradient-${stringify(randId)}`)} x2="1"><stop offset="0%"${attr("stop-color", range$1[0])}></stop><!--[-->`);
              const each_array_1 = ensure_array_like(ticks2);
              for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
                let t = each_array_1[i];
                const offset = 100 * (t - domain[0]) / (domain[1] - domain[0]);
                $$renderer3.push(`<stop${attr("offset", `${stringify(offset - 1e-3)}%`)}${attr("stop-color", plot.scales.color.fn(tickLabels[i] - 0.1))}></stop><stop${attr("offset", `${stringify(offset)}%`)}${attr("stop-color", plot.scales.color.fn(tickLabels[i]))}></stop>`);
              }
              $$renderer3.push(`<!--]--><stop offset="100%"${attr("stop-color", range$1.at(-1))}></stop></linearGradient></defs>`);
              Frame($$renderer3, {
                dy: -5,
                stroke: null,
                fill: `url(#gradient-${stringify(randId)})`
              });
              $$renderer3.push(`<!---->`);
              AxisX($$renderer3, {
                tickSize: 18,
                dy: -17,
                tickFormat: (d, i) => tickFormat(tickLabels[i])
              });
              $$renderer3.push(`<!---->`);
            },
            $$slots: { default: true }
          });
        } else {
          $$renderer2.push("<!--[!-->");
          const domain = extent(plot.scales.color.domain);
          const ticks2 = range(domain[0], domain[1], (domain[1] - domain[0]) / 7).slice(1);
          Plot_1($$renderer2, {
            maxWidth: "240px",
            margin: 1,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 6,
            marginBottom: 20,
            height: 38,
            inset: 0,
            x: { domain, tickSpacing: 30, tickFormat },
            children: ($$renderer3) => {
              $$renderer3.push(`<defs><linearGradient${attr("id", `gradient-${stringify(randId)}`)} x2="1"><!--[-->`);
              const each_array_2 = ensure_array_like(ticks2);
              for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                let t = each_array_2[$$index_2];
                $$renderer3.push(`<stop${attr("offset", `${stringify(100 * (t - domain[0]) / (domain[1] - domain[0]))}%`)}${attr("stop-color", plot.scales.color.fn(t))}></stop>`);
              }
              $$renderer3.push(`<!--]--></linearGradient></defs>`);
              Frame($$renderer3, {
                dy: -5,
                stroke: null,
                fill: `url(#gradient-${stringify(randId)})`
              });
              $$renderer3.push(`<!---->`);
              AxisX($$renderer3, { tickSize: 18, dy: -17 });
              $$renderer3.push(`<!---->`);
            },
            $$slots: { default: true }
          });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function GridX($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...markProps } = $$props;
    const DEFAULTS = { ...getPlotDefaults().grid, ...getPlotDefaults().gridX };
    const { data = [], automatic = false, ...options } = { ...DEFAULTS, ...markProps };
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const autoTickCount = Math.max(3, Math.round(plot.facetWidth / plot.options.x.tickSpacing));
    const ticks2 = (data.length > 0 ? (
      // use custom tick values if user passed any as prop
      data
    ) : (
      // use custom scale tick values if user passed any as plot scale option
      autoTicks(plot.scales.x.type, plot.options.x.ticks, plot.options.x.interval, plot.scales.x.domain, plot.scales.x.fn, autoTickCount)
    )).map((d, i) => isDataRecord(d) ? { ...d, [INDEX]: i } : { [RAW_VALUE]: d, [INDEX]: i });
    {
      let children = function($$renderer3, { usedScales }) {
        $$renderer3.push(`<g class="grid-x"><!--[-->`);
        const each_array = ensure_array_like(ticks2);
        for (let t = 0, $$length = each_array.length; t < $$length; t++) {
          let tick = each_array[t];
          if (testFilter(tick, options)) {
            $$renderer3.push("<!--[-->");
            const x = plot.scales.x.fn(tick[RAW_VALUE]) + (plot.scales.x.type === "band" ? plot.scales.x.fn.bandwidth() * 0.5 : 0);
            const y1_ = resolveChannel("y1", tick, options);
            const y2_ = resolveChannel("y2", tick, options);
            const dx = +resolveProp(options?.dx, tick, 0);
            const dy = +resolveProp(options?.dy, tick, 0);
            const y1 = options.y1 != null ? plot.scales.y.fn(y1_) : plot.options.marginTop;
            const y2 = options.y2 != null ? plot.scales.y.fn(y2_) : plot.options.marginTop + plot.facetHeight;
            const [style, styleClass] = resolveStyles(plot, { datum: tick }, options, "stroke", usedScales, true);
            $$renderer3.push(`<line${attr_class(clsx(styleClass), "svelte-75g6py")}${attr("transform", `translate(${stringify(x + dx)},${stringify(dy)})`)}${attr_style(style)}${attr("y1", y1)}${attr("y2", y2)}></line>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></g>`);
      };
      Mark_1($$renderer2, spread_props([
        {
          type: "gridX",
          data: data.length ? data.map((tick) => ({ [RAW_VALUE]: tick })) : [],
          channels: ["y1", "y2", "x", "stroke", "strokeOpacity"]
        },
        { ...options, x: RAW_VALUE },
        { automatic, children, $$slots: { default: true } }
      ]));
    }
  });
}
function GridY($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...markProps } = $$props;
    const DEFAULTS = { ...getPlotDefaults().grid, ...getPlotDefaults().gridY };
    const { data = [], automatic = false, ...options } = { ...DEFAULTS, ...markProps };
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const autoTickCount = Math.max(2, Math.round(plot.facetHeight / plot.options.y.tickSpacing));
    const ticks2 = data.length > 0 ? (
      // use custom tick values if user passed any as prop
      data
    ) : (
      // use custom scale tick values if user passed any as plot scale option
      autoTicks(plot.scales.y.type, plot.options.y.ticks, plot.options.y.interval, plot.scales.y.domain, plot.scales.y.fn, autoTickCount)
    );
    {
      let children = function($$renderer3, { usedScales }) {
        $$renderer3.push(`<g class="grid-y"><!--[-->`);
        const each_array = ensure_array_like(ticks2);
        for (let t = 0, $$length = each_array.length; t < $$length; t++) {
          let tick = each_array[t];
          if (testFilter(tick, options)) {
            $$renderer3.push("<!--[-->");
            const y = plot.scales.y.fn(tick) + (plot.scales.y.type === "band" ? plot.scales.y.fn.bandwidth() * 0.5 : 0);
            const x1_ = resolveChannel("x1", tick, options);
            const x2_ = resolveChannel("x2", tick, options);
            const x1 = options.x1 != null ? plot.scales.x.fn(x1_) : plot.options.marginLeft;
            const x2 = options.x2 != null ? plot.scales.x.fn(x2_) : plot.options.marginLeft + plot.facetWidth;
            const dx = +resolveProp(options?.dx, tick, 0);
            const dy = +resolveProp(options?.dy, tick, 0);
            const [style, styleClass] = resolveStyles(plot, { datum: { [RAW_VALUE]: tick } }, options, "stroke", usedScales, true);
            $$renderer3.push(`<line${attr_style(style)}${attr_class(clsx(styleClass), "svelte-ykw1ch")}${attr("transform", `translate(${stringify(dx)},${stringify(y + dy)})`)}${attr("x1", x1)}${attr("x2", x2)}></line>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></g>`);
      };
      Mark_1($$renderer2, spread_props([
        {
          type: "gridY",
          data: data.length ? data.map((tick) => ({ [RAW_VALUE]: tick })) : [],
          channels: ["x1", "x2", "y", "stroke", "strokeOpacity"]
        },
        { ...options, y: RAW_VALUE },
        { automatic, children, $$slots: { default: true } }
      ]));
    }
  });
}
function SymbolLegend($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { getPlotState } = getContext("svelteplot");
    let plot = getPlotState();
    if (
      // TODO: allow styling of legend
      plot.scales.color.manualActiveMarks > 0
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="symbol-legend svelte-1vze4d"><!--[-->`);
      const each_array = ensure_array_like(plot.scales.color.domain);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let value = each_array[$$index];
        const symbolV = plot.scales.symbol.fn(value);
        const symbolType = maybeSymbol(symbolV);
        const color2 = plot.colorSymbolRedundant ? plot.scales.color.fn(value) : "currentColor";
        $$renderer2.push(`<div class="item svelte-1vze4d"><div class="swatch svelte-1vze4d"><svg width="15" height="15"><path transform="translate(7.5,7.5)"${attr("d", symbol(symbolType, 40)())} class="svelte-1vze4d"${attr_style("", {
          fill: plot.hasFilledDotMarks ? color2 : "none",
          stroke: plot.hasFilledDotMarks ? null : color2
        })}></path></svg></div> <span class="item-label svelte-1vze4d">${escape_html(value)}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function FacetAxes($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const useFacetX = plot.scales.fx.domain.length > 0;
    const useFacetY = plot.scales.fy.domain.length > 0;
    const fxValues = useFacetX ? plot.scales.fx.domain : [true];
    const fyValues = useFacetY ? plot.scales.fy.domain : [true];
    const facetXScale = scaleBand().paddingInner(0.1).domain(fxValues).rangeRound([0, plot.plotWidth]);
    const facetYScale = scaleBand().paddingInner(0.1).domain(fyValues).rangeRound([0, plot.plotHeight]);
    if (fxValues.length > 1 && plot.options.fx.axis) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<g${attr("transform", `translate(${stringify(plot.options.marginLeft)}, 0)`)}>`);
      BaseAxisX($$renderer2, spread_props([
        {
          scaleFn: facetXScale,
          scaleType: "band",
          ticks: fxValues,
          tickFormat: (d) => d,
          tickFontSize: 11,
          tickSize: 0,
          tickPadding: 5,
          anchor: plot.options.fx.axis,
          options: plot.options.fx.axisOptions || {}
        },
        plot.options.fx.axisProps || {},
        {
          height: plot.plotHeight,
          marginTop: plot.options.marginTop,
          plot
        }
      ]));
      $$renderer2.push(`<!----></g>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (fyValues.length > 1 && plot.options.fy.axis) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<g${attr("transform", `translate(0, ${stringify(plot.options.marginTop)})`)}>`);
      BaseAxisY($$renderer2, spread_props([
        {
          scaleFn: facetYScale,
          scaleType: "band",
          ticks: fyValues,
          tickFormat: (d) => d,
          tickFontSize: 11,
          tickSize: 0,
          tickPadding: 5,
          anchor: plot.options.fy.axis,
          lineAnchor: "center",
          options: plot.options.fy.axisOptions || {}
        },
        plot.options.fy.axisProps || {},
        {
          width: plot.plotWidth,
          marginLeft: plot.options.marginLeft,
          plot
        }
      ]));
      $$renderer2.push(`<!----></g>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
const schemeObservable10 = [
  "#4269d0",
  "#efb118",
  "#ff725c",
  "#6cc5b0",
  "#3ca951",
  "#ff8ab7",
  "#a463f2",
  "#97bbf5",
  "#9c6b4e",
  "#9498a0"
];
const categoricalSchemes = /* @__PURE__ */ new Map([
  ["accent", schemeAccent],
  ["category10", schemeCategory10],
  ["dark2", schemeDark2],
  ["observable10", schemeObservable10],
  ["paired", schemePaired],
  ["pastel1", schemePastel1],
  ["pastel2", schemePastel2],
  ["set1", schemeSet1],
  ["set2", schemeSet2],
  ["set3", schemeSet3],
  ["tableau10", schemeTableau10]
]);
function isCategoricalScheme(scheme) {
  return scheme != null && categoricalSchemes.has(`${scheme}`.toLowerCase());
}
const ordinalSchemes = /* @__PURE__ */ new Map([
  // diverging
  ["brbg", scheme11(schemeBrBG, interpolateBrBG)],
  ["prgn", scheme11(schemePRGn, interpolatePRGn)],
  ["piyg", scheme11(schemePiYG, interpolatePiYG)],
  ["puor", scheme11(schemePuOr, interpolatePuOr)],
  ["rdbu", scheme11(schemeRdBu, interpolateRdBu)],
  ["rdgy", scheme11(schemeRdGy, interpolateRdGy)],
  ["rdylbu", scheme11(schemeRdYlBu, interpolateRdYlBu)],
  ["rdylgn", scheme11(schemeRdYlGn, interpolateRdYlGn)],
  ["spectral", scheme11(schemeSpectral, interpolateSpectral)],
  // reversed diverging (for temperature data)
  ["burd", scheme11r(schemeRdBu, interpolateRdBu)],
  ["buylrd", scheme11r(schemeRdYlBu, interpolateRdYlBu)],
  // sequential (single-hue)
  ["blues", scheme9(schemeBlues, interpolateBlues)],
  ["greens", scheme9(schemeGreens, interpolateGreens)],
  ["grays", scheme9(schemeGreys, interpolateGreys)],
  ["greys", scheme9(schemeGreys, interpolateGreys)],
  ["oranges", scheme9(schemeOranges, interpolateOranges)],
  ["purples", scheme9(schemePurples, interpolatePurples)],
  ["reds", scheme9(schemeReds, interpolateReds)],
  // sequential (multi-hue)
  ["turbo", schemei(interpolateTurbo)],
  ["viridis", schemei(interpolateViridis)],
  ["magma", schemei(interpolateMagma)],
  ["inferno", schemei(interpolateInferno)],
  ["plasma", schemei(interpolatePlasma)],
  ["cividis", schemei(interpolateCividis)],
  ["cubehelix", schemei(interpolateCubehelixDefault)],
  ["warm", schemei(interpolateWarm)],
  ["cool", schemei(interpolateCool)],
  ["bugn", scheme9(schemeBuGn, interpolateBuGn)],
  ["bupu", scheme9(schemeBuPu, interpolateBuPu)],
  ["gnbu", scheme9(schemeGnBu, interpolateGnBu)],
  ["orrd", scheme9(schemeOrRd, interpolateOrRd)],
  ["pubu", scheme9(schemePuBu, interpolatePuBu)],
  ["pubugn", scheme9(schemePuBuGn, interpolatePuBuGn)],
  ["purd", scheme9(schemePuRd, interpolatePuRd)],
  ["rdpu", scheme9(schemeRdPu, interpolateRdPu)],
  ["ylgn", scheme9(schemeYlGn, interpolateYlGn)],
  ["ylgnbu", scheme9(schemeYlGnBu, interpolateYlGnBu)],
  ["ylorbr", scheme9(schemeYlOrBr, interpolateYlOrBr)],
  ["ylorrd", scheme9(schemeYlOrRd, interpolateYlOrRd)],
  // cyclical
  ["rainbow", schemeicyclical(interpolateRainbow)],
  ["sinebow", schemeicyclical(interpolateSinebow)]
]);
function isOrdinalScheme(scheme) {
  return ordinalSchemes.has(`${scheme}`.toLowerCase());
}
function scheme9(scheme, interpolate) {
  return (n) => {
    if (n === 1)
      return [scheme[3][1]];
    if (n === 2)
      return [scheme[3][1], scheme[3][2]];
    n = Math.max(3, Math.floor(n));
    return n > 9 ? quantize(interpolate, n) : scheme[n];
  };
}
function scheme11(scheme, interpolate) {
  return (n) => {
    if (n === 2)
      return [scheme[3][0], scheme[3][2]];
    n = Math.max(3, Math.floor(n));
    return n > 11 ? quantize(interpolate, n) : scheme[n];
  };
}
function scheme11r(scheme, interpolate) {
  return (n) => {
    if (n === 2)
      return [scheme[3][2], scheme[3][0]];
    n = Math.max(3, Math.floor(n));
    return n > 11 ? quantize((t) => interpolate(1 - t), n) : scheme[n].slice().reverse();
  };
}
function schemei(interpolate) {
  return (n) => quantize(interpolate, Math.max(2, Math.floor(n)));
}
function schemeicyclical(interpolate) {
  return (n) => quantize(interpolate, Math.floor(n) + 1).slice(0, -1);
}
function ordinalScheme(scheme) {
  const s = `${scheme}`.toLowerCase();
  if (!ordinalSchemes.has(s))
    throw new Error(`unknown ordinal scheme: ${s}`);
  return ordinalSchemes.get(s);
}
const quantitativeSchemes = /* @__PURE__ */ new Map([
  // diverging
  ["brbg", interpolateBrBG],
  ["prgn", interpolatePRGn],
  ["piyg", interpolatePiYG],
  ["puor", interpolatePuOr],
  ["rdbu", interpolateRdBu],
  ["rdgy", interpolateRdGy],
  ["rdylbu", interpolateRdYlBu],
  ["rdylgn", interpolateRdYlGn],
  ["spectral", interpolateSpectral],
  // reversed diverging (for temperature data)
  ["burd", (t) => interpolateRdBu(1 - t)],
  ["buylrd", (t) => interpolateRdYlBu(1 - t)],
  // sequential (single-hue)
  ["blues", interpolateBlues],
  ["greens", interpolateGreens],
  ["grays", interpolateGreys],
  ["greys", interpolateGreys],
  ["purples", interpolatePurples],
  ["reds", interpolateReds],
  ["oranges", interpolateOranges],
  // sequential (multi-hue)
  ["turbo", interpolateTurbo],
  ["viridis", interpolateViridis],
  ["magma", interpolateMagma],
  ["inferno", interpolateInferno],
  ["plasma", interpolatePlasma],
  ["cividis", interpolateCividis],
  ["cubehelix", interpolateCubehelixDefault],
  ["warm", interpolateWarm],
  ["cool", interpolateCool],
  ["bugn", interpolateBuGn],
  ["bupu", interpolateBuPu],
  ["gnbu", interpolateGnBu],
  ["orrd", interpolateOrRd],
  ["pubugn", interpolatePuBuGn],
  ["pubu", interpolatePuBu],
  ["purd", interpolatePuRd],
  ["rdpu", interpolateRdPu],
  ["ylgnbu", interpolateYlGnBu],
  ["ylgn", interpolateYlGn],
  ["ylorbr", interpolateYlOrBr],
  ["ylorrd", interpolateYlOrRd],
  // cyclical
  ["rainbow", interpolateRainbow],
  ["sinebow", interpolateSinebow]
]);
function isQuantitativeScheme(scheme) {
  return quantitativeSchemes.has(String(scheme).toLowerCase());
}
function quantitativeScheme(scheme) {
  const s = `${scheme}`.toLowerCase();
  if (!quantitativeSchemes.has(s))
    throw new Error(`unknown quantitative scheme: ${s}`);
  return quantitativeSchemes.get(s);
}
const divergingSchemes = /* @__PURE__ */ new Set([
  "brbg",
  "prgn",
  "piyg",
  "puor",
  "rdbu",
  "rdgy",
  "rdylbu",
  "rdylgn",
  "spectral",
  "burd",
  "buylrd"
]);
function isDivergingScheme(scheme) {
  return scheme != null && divergingSchemes.has(`${scheme}`.toLowerCase());
}
function callWithProps(d3func, args, props = {}) {
  const res = d3func(...args);
  for (const [key, val] of Object.entries(props)) {
    if (typeof res[key] !== "function")
      throw new Error(`function ${key} does not exist`);
    res[key](val);
  }
  return res;
}
function getLogTicks(domain, count = 6) {
  const inverted = domain[0] < 0 && domain[1] < 0;
  if (inverted)
    domain = [domain[0] * -1, domain[1] * -1];
  const reversed = domain[1] < domain[0];
  if (reversed)
    domain = domain.slice(0).reverse();
  if (domain[0] < 0 || domain[1] < 0)
    return [];
  if (domain[0] === 0)
    return ticks(domain[0], domain[1], count - 2);
  let mult = 1;
  count += 2;
  let candidates = getTickCandidates(domain, mult);
  if (candidates[0].num > count) {
    while (candidates[0].num > count) {
      mult *= 10;
      candidates = getTickCandidates(domain, mult);
    }
  } else if (candidates[candidates.length - 1].num < count) {
    const ticksList2 = ticks(domain[0], domain[1], count - 2);
    if (reversed)
      ticksList2.reverse();
    return ticksList2;
  }
  count -= 2;
  const ticksList = candidates.map((d) => ({
    ...d,
    ticks: d.ticks.filter((t) => t >= domain[0] && t <= domain[1])
  })).map((d) => ({ ...d, diff: Math.abs(d.ticks.length - count) })).sort((a, b) => a.diff - b.diff)[0].ticks;
  if (reversed)
    ticksList.reverse();
  if (inverted)
    return ticksList.map((t) => t * -1);
  return ticksList;
}
const logSeries = [[10], [5, 4, 5], [3, 10 / 3], [2, 2.5, 2], [1.5, 2, 5 / 3, 2]];
function getTickCandidates(domain, mult = 1) {
  return logSeries.map((factors) => {
    let i = Math.pow(10, Math.floor(Math.log10(domain[0])));
    let f = 0;
    const ticks2 = [i];
    while (i < domain[1] && ticks2.length < 50) {
      i *= factors[f] * mult;
      ticks2.push(i);
      f = (f + 1) % factors.length;
    }
    return { ticks: ticks2, num: ticks2.length };
  });
}
const Scales = {
  point: scalePoint,
  band: scaleBand,
  linear: scaleLinear,
  time: scaleTime,
  sqrt: scaleSqrt,
  pow: scalePow,
  log: scaleLog,
  symlog: scaleSymlog,
  ordinal: scaleOrdinal,
  sequential: scaleSequential,
  diverging: scaleDiverging
};
const SequentialScales = {
  linear: scaleSequential,
  log: scaleSequentialLog,
  symlog: scaleSequentialSymlog,
  pow: scaleSequentialPow,
  sqrt: scaleSequentialSqrt,
  "quantile-cont": scaleSequentialQuantile
};
const DivergingScales = {
  diverging: scaleDiverging,
  "diverging-log": scaleDivergingLog,
  "diverging-symlog": scaleDivergingSymlog,
  "diverging-pow": scaleDivergingPow,
  "diverging-sqrt": scaleDivergingSqrt
};
const ThresholdScales = {
  // custom thresholds
  threshold: scaleThreshold,
  // quantile scales
  quantize: scaleQuantize,
  quantile: scaleQuantile
};
function autoScale({ name, type, domain, scaleOptions, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults }) {
  let fn;
  let range2;
  range2 = scaleOptions?.range || getScaleRange(name, scaleOptions, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks);
  if (scaleOptions.reverse)
    range2.reverse();
  const niceTickCount = name === "x" || name === "y" ? Math.round(Math.abs(range2[0] - range2[1]) / scaleOptions.tickSpacing) : void 0;
  const scaleProps = {
    domain,
    range: range2,
    ...(type === "linear" || type === "log") && scaleOptions.nice ? {
      nice: scaleOptions.nice ? niceTickCount : true
    } : {},
    ...type === "linear" ? {
      clamp: scaleOptions.clamp,
      ...scaleOptions.round ? { interpolate: interpolateRound } : {}
    } : {},
    ...type === "log" ? {
      base: scaleOptions.base || 10
    } : {},
    ...type === "symlog" ? {
      constant: scaleOptions.constant || 1
    } : {},
    ...type === "band" || type === "point" ? {
      align: scaleOptions.align,
      padding: maybeNumber(coalesce(scaleOptions.padding, plotOptions.padding, 0.15))
    } : {}
  };
  fn = callWithProps(Scales[type], [], scaleProps);
  if (type === "band" || type === "point") {
    fn.ticks = () => domain;
  }
  if (type === "log") {
    fn.ticks = (count) => getLogTicks(domain, count);
  } else if (type === "symlog") {
    const maxabs = Math.max(Math.abs(domain[0]), Math.abs(domain[1]));
    fn.ticks = (count) => {
      const ticks2 = getLogTicks([scaleProps.constant + 1, maxabs], count / 2);
      return [...ticks2.map((t) => -t).reverse(), 0, ...ticks2];
    };
  }
  return fn;
}
function autoScaleColor({ type, domain, scaleOptions, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks, plotDefaults }) {
  let fn;
  let range$1;
  const { scheme, interpolate, pivot, n = type === "threshold" ? domain.length + 1 : 9, unknown = plotDefaults.unknown } = scaleOptions;
  if (type === "categorical" || type === "ordinal") {
    let scheme_ = scheme || plotDefaults.categoricalColorScheme;
    if (isPlainObject(scheme_)) {
      const newScheme = Object.values(scheme_);
      const newDomain = Object.keys(scheme_);
      for (const v of domain) {
        if (scheme_[v] == null) {
          newDomain.push(v);
          newScheme.push(unknown);
        }
      }
      domain = newDomain;
      scheme_ = newScheme;
    }
    range$1 = Array.isArray(scheme_) ? scheme_ : isCategoricalScheme(scheme_) ? categoricalSchemes.get(scheme_) : ordinalScheme(scheme_)(domain.length);
    fn = scaleOrdinal().domain(domain).range(range$1);
  } else if (!!ThresholdScales[type]) {
    const scheme_ = scheme || plotDefaults.colorScheme;
    range$1 = Array.isArray(scheme_) && (scaleOptions.n == null || scaleOptions.n === scheme_.length) ? scheme_.slice(0) : Array.isArray(scheme_) ? (
      // interpolate n colors from custom colors
      range(n).map((i) => i / (n - 1)).map(scaleLinear(scheme_.map((c, i) => i / (scheme_.length - 1)), scheme_).interpolate(interpolateLab))
    ) : interpolate ? range(n).map((i) => interpolate(i / (n - 1))) : isOrdinalScheme(scheme_) ? ordinalScheme(scheme_)(n) : null;
    if (range$1 == null) {
      throw new Error("unknown ordinal scheme " + scheme_);
    }
    if (scaleOptions.reverse)
      range$1 = range$1.toReversed();
    fn = ThresholdScales[type]().domain(domain).range(range$1);
  } else if (!!SequentialScales[type] || !!DivergingScales[type]) {
    const scale = SequentialScales[type] || DivergingScales[type];
    const scheme_ = scheme || plotDefaults.colorScheme;
    if (interpolate) {
      fn = scale(domain, interpolate);
    } else if (Array.isArray(scheme_)) {
      const step = 1 / (scheme_.length - 1);
      fn = scale(domain, (type === "linear" ? scaleLinear : scaleLog)(range(0, 1 + step / 2, step), scheme_).interpolate(interpolateLab));
    } else if (!!DivergingScales[type] || scaleOptions.type === "auto" && isDivergingScheme(scheme_)) {
      const maxabs = Math.max(Math.abs(domain[0]), Math.abs(domain[1]));
      const domain_ = pivot != null ? [domain[0], pivot, domain[1]] : [-maxabs, 0, maxabs];
      fn = scale(domain_, quantitativeScheme(scheme_));
    } else if (!!SequentialScales[type] || scaleOptions.type === "auto" && isQuantitativeScheme(scheme_)) {
      fn = scale(domain, quantitativeScheme(scheme_));
    }
    if (type === "log") {
      fn.ticks = (count) => getLogTicks(domain, count);
    }
  }
  if (!fn) {
    console.error("color problem", type);
    fn = () => "red";
    fn.range = () => ["red"];
  }
  return fn;
}
function getScaleRange(name, scaleOptions, plotOptions, plotWidth, plotHeight, plotHasFilledDotMarks) {
  const { marginTop, marginLeft, inset } = plotOptions;
  const { insetLeft, insetRight, insetTop, insetBottom } = scaleOptions;
  return name === "opacity" ? [0, 1] : name === "length" ? [0, 20] : name === "x" ? [
    marginLeft + (insetLeft || inset || 0),
    marginLeft + plotWidth - (insetRight || inset || 0)
  ] : name === "y" ? [
    plotHeight + marginTop - (insetBottom || inset || 0),
    marginTop + (insetTop || inset || 0)
  ] : name === "r" ? [0, 10] : name === "symbol" ? (
    // Plot is smart enough to pick different default shapes depending on whether
    // or not there are filled dot marks in the plot, so we have to pass this
    // information all the way here
    plotHasFilledDotMarks ? ["circle", "cross", "diamond", "square", "star", "triangle", "wye"] : ["circle", "plus", "times", "triangle2", "asterisk", "square2", "diamond2"]
  ) : [];
}
const identity = constant({ stream: (stream) => stream });
const reflectY = constant({
  ...geoTransform({
    point(x, y) {
      this.stream.point(x, -y);
    }
  }),
  invert(x, y) {
    return [x, -y];
  }
});
const pi = Math.PI;
const tau = 2 * pi;
function namedProjection(projection) {
  switch (`${projection}`.toLowerCase()) {
    case "albers-usa":
      return scaleProjection(geoAlbersUsa, 0.7463, 0.4673);
    case "albers":
      return conicProjection(geoAlbers, 0.7463, 0.4673);
    case "azimuthal-equal-area":
      return scaleProjection(geoAzimuthalEqualArea, 4, 4);
    case "azimuthal-equidistant":
      return scaleProjection(geoAzimuthalEquidistant, tau, tau);
    case "conic-conformal":
      return conicProjection(geoConicConformal, tau, tau);
    case "conic-equal-area":
      return conicProjection(geoConicEqualArea, 6.1702, 2.9781);
    case "conic-equidistant":
      return conicProjection(geoConicEquidistant, 7.312, 3.6282);
    case "equal-earth":
      return scaleProjection(geoEqualEarth, 5.4133, 2.6347);
    case "equirectangular":
      return scaleProjection(geoEquirectangular, tau, pi);
    case "gnomonic":
      return scaleProjection(geoGnomonic, 3.4641, 3.4641);
    case "identity":
      return { type: identity };
    case "reflect-y":
      return { type: reflectY };
    case "mercator":
      return scaleProjection(geoMercator, tau, tau);
    case "orthographic":
      return scaleProjection(geoOrthographic, 2, 2);
    case "stereographic":
      return scaleProjection(geoStereographic, 2, 2);
    case "transverse-mercator":
      return scaleProjection(geoTransverseMercator, tau, tau);
    default:
      throw new Error(`unknown projection type: ${projection}`);
  }
}
function scaleProjection(createProjection2, kx, ky) {
  return {
    type: ({ width, height, rotate, precision = 0.15, clip }) => {
      const projection = createProjection2();
      if (precision != null)
        projection.precision?.(precision);
      if (rotate != null)
        projection.rotate?.(rotate);
      if (typeof clip === "number")
        projection.clipAngle?.(clip);
      projection.scale(Math.min(width / kx, height / ky));
      projection.translate([width / 2, height / 2]);
      return projection;
    },
    aspectRatio: ky / kx
  };
}
function conicProjection(createProjection2, kx, ky) {
  const { type, aspectRatio } = scaleProjection(createProjection2, kx, ky);
  return {
    type: (options) => {
      const { parallels, domain, width, height } = options;
      const projection = type(options);
      if (parallels != null) {
        projection.parallels(parallels);
        if (domain === void 0) {
          projection.fitSize([width, height], { type: "Sphere" });
        }
      }
      return projection;
    },
    aspectRatio
  };
}
function Plot_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      header: userHeader,
      footer: userFooter,
      overlay,
      underlay,
      children: parentChildren,
      testid,
      facet,
      projection,
      $$slots,
      $$events,
      ...restOptions
    } = $$props;
    const projectionOpts = (() => {
      if (projection && typeof projection !== "function" && typeof projection?.type !== "function") {
        const { type: projFactory, aspectRatio } = namedProjection(isObject$1(projection) ? projection.type : projection);
        return {
          ...isObject$1(projection) ? projection : {},
          type: projFactory,
          aspectRatio
        };
      }
      return projection;
    })();
    const scales = Object.fromEntries([
      "x",
      "y",
      "r",
      "color",
      "opacity",
      "symbol",
      "length",
      "fx",
      "fy"
    ].map((scale) => {
      const scaleOpts = restOptions[scale] || {};
      const scaleFn = scaleOpts.scale || (scale === "color" ? autoScaleColor : autoScale);
      return [scale, { ...scaleOpts, scale: scaleFn }];
    }));
    function header($$renderer3) {
      if (restOptions.title) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<h2>${escape_html(restOptions.title)}</h2>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (restOptions.subtitle) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<h3>${escape_html(restOptions.subtitle)}</h3>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (userHeader) {
        $$renderer3.push("<!--[-->");
        userHeader?.($$renderer3);
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (restOptions.color?.legend) {
        $$renderer3.push("<!--[-->");
        ColorLegend($$renderer3, {});
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (restOptions.symbol?.legend) {
        $$renderer3.push("<!--[-->");
        SymbolLegend($$renderer3);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    function footer($$renderer3) {
      if (restOptions.caption) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div>${escape_html(restOptions.caption)}</div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (userFooter) {
        $$renderer3.push("<!--[-->");
        userFooter?.($$renderer3);
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--[-->`);
    {
      {
        let children = function($$renderer3, {
          hasProjection,
          hasExplicitAxisX,
          hasExplicitAxisY,
          hasExplicitGridX,
          hasExplicitGridY,
          options,
          scales: scales2,
          ...restProps
        }) {
          $$renderer3.push(`<!--[-->`);
          {
            if (!hasProjection && !hasExplicitAxisX) {
              $$renderer3.push("<!--[-->");
              if (options.axes && (options.x.axis === "top" || options.x.axis === "both")) {
                $$renderer3.push("<!--[-->");
                AxisX($$renderer3, { anchor: "top", automatic: true });
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]--> `);
              if (options.axes && (options.x.axis === "bottom" || options.x.axis === "both")) {
                $$renderer3.push("<!--[-->");
                AxisX($$renderer3, { anchor: "bottom", automatic: true });
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]-->`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> `);
            if (!hasProjection && !hasExplicitAxisY) {
              $$renderer3.push("<!--[-->");
              if (options.axes && (options.y.axis === "left" || options.y.axis === "both")) {
                $$renderer3.push("<!--[-->");
                AxisY($$renderer3, { anchor: "left", automatic: true });
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]--> `);
              if (options.axes && (options.y.axis === "right" || options.y.axis === "both")) {
                $$renderer3.push("<!--[-->");
                AxisY($$renderer3, { anchor: "right", automatic: true });
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]-->`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> `);
            if (!hasExplicitGridX && (options.grid || options.x.grid)) {
              $$renderer3.push("<!--[-->");
              GridX($$renderer3, { automatic: true });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> `);
            if (!hasExplicitGridY && (options.grid || options.y.grid)) {
              $$renderer3.push("<!--[-->");
              GridY($$renderer3, { automatic: true });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> `);
            if (options.frame) {
              $$renderer3.push("<!--[-->");
              Frame($$renderer3, { automatic: true });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> `);
            parentChildren?.($$renderer3, { options, scales: scales2, ...restProps });
            $$renderer3.push(`<!---->`);
          }
          $$renderer3.push(`<!--]-->`);
        }, facetAxes = function($$renderer3) {
          FacetAxes($$renderer3);
        };
        Plot($$renderer2, spread_props([
          { overlay, underlay },
          restOptions,
          {
            header: userHeader || restOptions.title || restOptions.subtitle || restOptions.color?.legend || restOptions.symbol?.legend ? header : null,
            footer: userFooter || restOptions?.caption ? footer : null,
            projection: projectionOpts,
            implicitScales: true
          },
          scales,
          {
            children,
            facetAxes,
            $$slots: { default: true, facetAxes: true }
          }
        ]));
      }
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function GroupMultiple($$renderer, $$props) {
  let {
    length = 1,
    children,
    class: className = null,
    $$slots,
    $$events,
    ...groupProps
  } = $$props;
  if (length > 1 || className) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<g${attributes({ class: clsx(className), ...groupProps }, void 0, void 0, void 0, 3)}>`);
    children($$renderer);
    $$renderer.push(`<!----></g>`);
  } else {
    $$renderer.push("<!--[!-->");
    children($$renderer);
    $$renderer.push(`<!---->`);
  }
  $$renderer.push(`<!--]-->`);
}
const curves = /* @__PURE__ */ new Map([
  ["basis", curveBasis],
  ["basis-closed", curveBasisClosed],
  ["basis-open", curveBasisOpen],
  ["bundle", curveBundle],
  ["bump-x", curveBumpX],
  ["bump-y", curveBumpY],
  ["cardinal", curveCardinal],
  ["cardinal-closed", curveCardinalClosed],
  ["cardinal-open", curveCardinalOpen],
  ["catmull-rom", curveCatmullRom],
  ["catmull-rom-closed", curveCatmullRomClosed],
  ["catmull-rom-open", curveCatmullRomOpen],
  ["linear", curveLinear],
  ["linear-closed", curveLinearClosed],
  ["monotone-x", curveMonotoneX],
  ["monotone-y", curveMonotoneY],
  ["natural", curveNatural],
  ["step", curveStep],
  ["step-after", curveStepAfter],
  ["step-before", curveStepBefore]
]);
function maybeCurve(curve = curveLinear, tension) {
  if (typeof curve === "function")
    return curve;
  const c = curves.get(`${curve}`.toLowerCase());
  if (!c)
    throw new Error(`unknown curve: ${curve}`);
  if (tension !== void 0) {
    if ("beta" in c) {
      return c.beta(tension);
    } else if ("tension" in c) {
      return c.tension(tension);
    } else if ("alpha" in c) {
      return c.alpha(tension);
    }
  }
  return c;
}
const devicePixelRatio = /* @__PURE__ */ new class DevicePixelRatio {
  #dpr = source(void 0);
  #update() {
    const off = on(
      window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`),
      "change",
      () => {
        set(this.#dpr, window.devicePixelRatio);
        off();
        this.#update();
      }
    );
  }
  constructor() {
  }
  get current() {
    get(this.#dpr);
    return void 0;
  }
}();
function CanvasLayer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...restProps } = $$props;
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    $$renderer2.push(`<foreignObject x="0" y="0"${attr("width", plot.width)}${attr("height", plot.height)} class="svelte-zr9o7x"><!---->`);
    {
      $$renderer2.push(`<canvas${attributes(
        {
          xmlns: "http://www.w3.org/1999/xhtml",
          ...restProps,
          width: plot.width * (devicePixelRatio.current ?? 1),
          height: plot.height * (devicePixelRatio.current ?? 1),
          style: `width: ${stringify(plot.width)}px; height: ${stringify(plot.height)}px;`
        },
        "svelte-zr9o7x"
      )}></canvas>`);
    }
    $$renderer2.push(`<!----></foreignObject>`);
  });
}
const StaticReducer = {
  count: (d) => Array.from(d).length,
  min,
  max,
  mode,
  sum,
  mean,
  median,
  identity: (d) => d,
  variance,
  deviation,
  first: (d) => d[0],
  last: (d) => d.at(-1),
  difference: (d) => d.at(-1) - d[0],
  ratio: (d) => d.at(-1) / d[0]
  // TODO: proportion
  // TODO: proportion-facet
  // TODO: min-index
  // TODO: max-index
};
new Proxy(StaticReducer, {
  get(target, prop) {
    if (String(prop).charAt(0) === "p" && String(prop).length === 3) {
      const p = +String(prop).slice(1) / 100;
      return percentile(p);
    }
    return Reflect.get(target, prop);
  },
  has(target, prop) {
    if (String(prop).charAt(0) === "p" && String(prop).length === 3) {
      return true;
    }
    return Reflect.has(target, prop);
  }
});
function percentile(p) {
  return (I, f) => quantile(I, p, f);
}
function Marker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { id, shape, color: color2 } = $$props;
    const tickMarker = (orient) => ({
      viewBox: "-3 -3 6 6",
      path: "M0,-3v6",
      width: 6,
      height: 6,
      orient,
      color: "stroke"
    });
    const MARKERS = {
      circle: {
        width: 6.67,
        height: 6.67,
        orient: 0,
        color: "fill",
        bg: "stroke"
      },
      dot: { width: 6.67, height: 6.67, orient: 0, color: "fill" },
      "circle-stroke": {
        width: 6.67,
        height: 6.67,
        orient: 0,
        color: "stroke",
        bg: "fill"
      },
      tick: tickMarker("auto"),
      "tick-x": tickMarker(90),
      "tick-y": tickMarker(0),
      arrow: {
        path: "M-1.5,-3l3,3l-3,3",
        width: 6.67,
        height: 6.67,
        orient: "auto",
        color: "stroke"
      },
      "arrow-reverse": {
        path: "M1.5,-3l-3,3l3,3",
        width: 6.67,
        height: 6.67,
        orient: "auto",
        color: "stroke"
      }
    };
    const defaultDotRadius = getPlotDefaults().markerDotRadius;
    const markerColors = {
      fill: "none",
      [MARKERS[shape].color]: color2,
      ...MARKERS[shape].bg ? { [MARKERS[shape].bg]: "var(--svelteplot-bg)" } : {}
    };
    $$renderer2.push(`<marker${attributes(
      {
        id,
        viewBox: MARKERS[shape].viewBox || "-5 -5 10 10",
        markerWidth: MARKERS[shape].width,
        orient: MARKERS[shape].orient,
        markerHeight: MARKERS[shape].height,
        "stroke-width": "1.5",
        ...markerColors
      },
      void 0,
      void 0,
      void 0,
      3
    )}>`);
    if (shape === "dot" || shape === "circle" || shape === "circle-stroke") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<circle${attr("r", defaultDotRadius)}></circle>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<path${attr("d", MARKERS[shape].path)}></path>`);
    }
    $$renderer2.push(`<!--]--></marker>`);
  });
}
function MarkerPath($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      datum,
      markerStart,
      markerMid,
      markerEnd,
      marker,
      d,
      dInv,
      style,
      class: className = null,
      textStyleClass = null,
      startOffset,
      textStyle,
      text,
      transform,
      color: color2,
      strokeWidth,
      mark
    } = $$props;
    const id = randomId();
    const { getPlotState } = getContext("svelteplot");
    const points = text && d != null ? d.split(/[LMC]/).slice(1) : [];
    const hasPath = points.length > 0;
    const firstPt = text && hasPath ? points.at(0).split(",").map(Number) : [];
    const lastPt = text && hasPath ? points.at(-1).split(",").map(Number) : [];
    const leftToRight = text && hasPath ? firstPt[0] < lastPt.at(-2) : true;
    const textPath = !text || leftToRight ? d : dInv;
    const strokeWidth_ = resolveProp(strokeWidth, datum, 1.4);
    $$renderer2.push(`<g${attr("transform", transform)}${attr_class(clsx(className))}${attr("stroke-width", strokeWidth_)}><!--[-->`);
    const each_array = ensure_array_like(Object.entries({
      start: markerStart,
      mid: markerMid,
      end: markerEnd,
      all: marker
    }));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [key, marker2] = each_array[$$index];
      const markerId = `marker-${key === "all" ? "" : `${key}-`}${id}`;
      if (isSnippet(marker2)) {
        $$renderer2.push("<!--[-->");
        marker2($$renderer2, markerId, color2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (marker2) {
          $$renderer2.push("<!--[-->");
          Marker($$renderer2, {
            id: markerId,
            shape: marker2 === true ? "circle" : resolveProp(marker2, datum),
            color: color2
          });
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
    if (mark.options.onmouseenter || mark.options.onclick) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<path${attr("d", d)}${attr_style(`fill:none;stroke-width: ${stringify((strokeWidth || 1) + 10)}; stroke: transparent; stroke-opacity:0`)}></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--><path${attr("marker-start", markerStart || marker ? `url(#marker-${markerStart ? "start-" : ""}${id})` : null)}${attr("marker-mid", markerMid || marker ? `url(#marker-${markerMid ? "mid-" : ""}${id})` : null)}${attr("marker-end", markerEnd || marker ? `url(#marker-${markerEnd ? "end-" : ""}${id})` : null)}${attr("d", d)}${attr_style(style)}></path>`);
    if (text) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<path${attr("d", textPath)}${attr("id", id)} stroke="none" fill="none"></path><text dy="-3"${attr_style(textStyle)}${attr_class(clsx(textStyleClass), "svelte-12l946b")}><textPath${attr("startOffset", startOffset)}${attr("href", `#${stringify(id)}`)}>${escape_html(text)}</textPath></text>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></g>`);
  });
}
function LineCanvas($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { getPlotState } = getContext("svelteplot");
    getPlotState();
    CanvasLayer($$renderer2, {});
  });
}
function Line($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...markProps } = $$props;
    const DEFAULTS = {
      curve: "auto",
      tension: 0,
      canvas: false,
      class: null,
      lineClass: null,
      ...getPlotDefaults().line
    };
    const {
      data = [{}],
      curve,
      tension,
      text,
      canvas,
      class: className,
      lineClass,
      ...options
    } = { ...DEFAULTS, ...markProps };
    const args = sort(recordizeXY({ data, ...options }));
    function groupIndex(data2, groupByKey2) {
      if (!groupByKey2) return [data2];
      let group = [];
      const groups2 = [group];
      let lastGroupValue;
      for (const d of data2) {
        const groupValue = resolveProp(groupByKey2, d.datum);
        if (groupValue === lastGroupValue) {
          group.push(d);
        } else {
          group = [d];
          groups2.push(group);
          lastGroupValue = groupValue;
        }
      }
      return groups2;
    }
    const groupByKey = args.z || args.stroke;
    const { getPlotState } = getContext("svelteplot");
    const plot = getPlotState();
    const linePath = plot.scales.projection && curve === "auto" ? sphereLine(plot.scales.projection) : callWithProps(line, [], {
      curve: maybeCurve(curve === "auto" ? "linear" : curve, tension),
      x: (d) => d.x,
      y: (d) => d.y,
      defined: (d) => isValid(d.x) && isValid(d.y)
    });
    function sphereLine(projection) {
      const path = geoPath(projection);
      const fn = (lineData) => {
        let line2 = [];
        const lines = [line2];
        for (const { x, y } of lineData) {
          if (!isValid(x) || !isValid(y)) {
            line2 = [];
            lines.push(line2);
          } else {
            line2.push([x, y]);
          }
        }
        return path({ type: "MultiLineString", coordinates: lines });
      };
      fn.context = path.context;
      return fn;
    }
    {
      let children = function($$renderer3, { mark, usedScales, scaledData }) {
        if (scaledData.length > 0) {
          $$renderer3.push("<!--[-->");
          const groupedLineData = groupIndex(scaledData, groupByKey);
          $$renderer3.push(`; `);
          if (canvas) {
            $$renderer3.push("<!--[-->");
            LineCanvas($$renderer3);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<g${attr_class(clsx(["lines", className]))}><!--[-->`);
            const each_array = ensure_array_like(groupedLineData);
            for (let i = 0, $$length = each_array.length; i < $$length; i++) {
              let lineData = each_array[i];
              const pathString = linePath(lineData);
              if (pathString) {
                $$renderer3.push("<!--[-->");
                GroupMultiple($$renderer3, {
                  class: resolveProp(lineClass, lineData[0]),
                  children: ($$renderer4) => {
                    const [style, styleClass] = resolveStyles(
                      plot,
                      lineData[0],
                      {
                        strokeWidth: 1.4,
                        strokeLinejoin: "round",
                        ...args,
                        stroke: lineData[0].stroke
                      },
                      "stroke",
                      usedScales
                    );
                    const [textStyle, textStyleClass] = resolveStyles(
                      plot,
                      lineData[0],
                      {
                        textAnchor: "middle",
                        ...pick(args, ["fontSize", "fontWeight", "fontStyle", "textAnchor"]),
                        strokeWidth: args.textStrokeWidth ? args.textStrokeWidth : args.textStroke ? 2 : 0,
                        fill: args.textFill || args.stroke,
                        stroke: args.textStroke
                      },
                      "fill",
                      usedScales,
                      true
                    );
                    if (options.outlineStroke) {
                      $$renderer4.push("<!--[-->");
                      const [outlineStyle, outlineStyleClass] = resolveStyles(
                        plot,
                        { ...lineData[0], stroke: options.outlineStroke },
                        {
                          strokeLinejoin: "round",
                          ...args,
                          stroke: options.outlineStroke,
                          strokeOpacity: options.outlineStrokeOpacity ?? 1,
                          strokeWidth: options.outlineStrokeWidth || resolveProp(options.strokeWidth, lineData[0].datum, 1.4) + 2
                        },
                        "stroke",
                        usedScales
                      );
                      $$renderer4.push(`<path${attr("d", pathString)}${attr_style(outlineStyle)}${attr_class(clsx(["is-outline", outlineStyleClass]))}></path>`);
                    } else {
                      $$renderer4.push("<!--[!-->");
                    }
                    $$renderer4.push(`<!--]-->`);
                    MarkerPath($$renderer4, {
                      mark,
                      scales: plot.scales,
                      markerStart: args.markerStart,
                      markerMid: args.markerMid,
                      markerEnd: args.markerEnd,
                      marker: args.marker,
                      strokeWidth: args.strokeWidth,
                      datum: lineData[0],
                      d: pathString,
                      dInv: text ? linePath(lineData.toReversed()) : null,
                      color: lineData[0].stroke || "currentColor",
                      style,
                      class: styleClass,
                      text: text ? resolveProp(text, lineData[0]) : null,
                      startOffset: resolveProp(args.textStartOffset, lineData[0], "50%"),
                      textStyle,
                      textStyleClass
                    });
                    $$renderer4.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]-->`);
            }
            $$renderer3.push(`<!--]--></g>`);
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      };
      Mark_1($$renderer2, spread_props([
        {
          type: "line",
          channels: ["x", "y", "opacity", "stroke", "strokeOpacity"],
          required: ["x", "y"]
        },
        args,
        { children, $$slots: { default: true } }
      ]));
    }
  });
}
function LineY($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data = [{}], $$slots, $$events, ...rest } = $$props;
    let args = recordizeY({ data, ...rest });
    Line($$renderer2, spread_props([args]));
  });
}
export {
  AxisX as A,
  CanvasLayer as C,
  GroupMultiple as G,
  INDEX as I,
  LineY as L,
  Mark_1 as M,
  Plot_1 as P,
  RAW_VALUE as R,
  AxisY as a,
  resolveStyles as b,
  Anchor as c,
  resolveProp as d,
  indexData as e,
  resolveChannel as f,
  getPlotDefaults as g,
  isDataRecord as h,
  isValid as i,
  recordizeX as j,
  RectPath as k,
  maybeInterval as l,
  maybeSymbol as m,
  callWithProps as n,
  recordize as o,
  GEOJSON_PREFER_STROKE as p,
  groupFacetsAndZ as q,
  recordizeXY as r,
  sort as s,
  projectXY as t
};
