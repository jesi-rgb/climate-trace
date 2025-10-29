import "../../../../chunks/async.js";
import { m as bind_props, p as props_id, l as spread_props, h as attributes, s as stringify, e as ensure_array_like, a as attr } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/index2.js";
import { f as formatSector, a as fN, g as getActivityIcon, b as getActivityLabel, d as formatActivity, s as shouldShowCapacityCard, e as getCapacityLabel, h as formatCapacityFactor, i as getCapacityTooltip, j as formatEmissionsFactor, k as getEmissionsFactorUnit, l as formatDate } from "../../../../chunks/utils3.js";
import { a as getSourceById } from "../../../../chunks/source.remote.js";
import { F as Factory } from "../../../../chunks/Factory.js";
import { F as Flame, G as Globe, T as Trophy, C as ChartLine, D as Dot } from "../../../../chunks/ChartLine.js";
import { g as getIconContext } from "../../../../chunks/context2.js";
import { e as escape_html, s as save } from "../../../../chunks/context.js";
import { X as XCircle, F as Figure } from "../../../../chunks/Figure.js";
import { L as Lightning } from "../../../../chunks/Lightning.js";
import { W as Wind } from "../../../../chunks/Wind.js";
import { P as Plot_1, L as LineY } from "../../../../chunks/HTMLTooltip.svelte_svelte_type_style_lang.js";
import "interval-tree-1d";
import { C as Card } from "../../../../chunks/Card.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { ct } from "../../../../chunks/index.js";
import "../../../../chunks/core.js";
import { P as Pagination_1 } from "../../../../chunks/Pagination.js";
import { T as TooltipRootState, F as Floating_layer, a as TooltipContentState, P as Popper_layer_force_mount, b as Popper_layer, g as getFloatingContentCSSVars, c as TooltipTriggerState, d as Floating_layer_anchor, e as Portal } from "../../../../chunks/tooltip.svelte.js";
import { n as noop, h as boxWith, g as createId, m as mergeProps } from "../../../../chunks/use-id.js";
import { H as Heading } from "../../../../chunks/Heading.js";
function Tooltip$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      onOpenChange = noop,
      onOpenChangeComplete = noop,
      disabled,
      delayDuration,
      disableCloseOnTriggerClick,
      disableHoverableContent,
      ignoreNonKeyboardFocus,
      children
    } = $$props;
    TooltipRootState.create({
      open: boxWith(() => open, (v) => {
        open = v;
        onOpenChange(v);
      }),
      delayDuration: boxWith(() => delayDuration),
      disableCloseOnTriggerClick: boxWith(() => disableCloseOnTriggerClick),
      disableHoverableContent: boxWith(() => disableHoverableContent),
      ignoreNonKeyboardFocus: boxWith(() => ignoreNonKeyboardFocus),
      disabled: boxWith(() => disabled),
      onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
    });
    Floating_layer($$renderer2, {
      tooltip: true,
      children: ($$renderer3) => {
        children?.($$renderer3);
        $$renderer3.push(`<!---->`);
      }
    });
    bind_props($$props, { open });
  });
}
function Tooltip_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      children,
      child,
      id = createId(uid),
      ref = null,
      side = "top",
      sideOffset = 0,
      align = "center",
      avoidCollisions = true,
      arrowPadding = 0,
      sticky = "partial",
      strategy,
      hideWhenDetached = false,
      collisionPadding = 0,
      onInteractOutside = noop,
      onEscapeKeydown = noop,
      forceMount = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = TooltipContentState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      onInteractOutside: boxWith(() => onInteractOutside),
      onEscapeKeydown: boxWith(() => onEscapeKeydown)
    });
    const floatingProps = {
      side,
      sideOffset,
      align,
      avoidCollisions,
      arrowPadding,
      sticky,
      hideWhenDetached,
      collisionPadding,
      strategy
    };
    const mergedProps = mergeProps(restProps, floatingProps, contentState.props);
    if (forceMount) {
      $$renderer2.push("<!--[-->");
      {
        let popper = function($$renderer3, { props, wrapperProps }) {
          const mergedProps2 = mergeProps(props, { style: getFloatingContentCSSVars("tooltip") });
          if (child) {
            $$renderer3.push("<!--[-->");
            child($$renderer3, {
              props: mergedProps2,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...mergedProps2 })}>`);
            children?.($$renderer3);
            $$renderer3.push(`<!----></div></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        };
        Popper_layer_force_mount($$renderer2, spread_props([
          mergedProps,
          contentState.popperProps,
          {
            enabled: contentState.root.opts.open.current,
            id,
            trapFocus: false,
            loop: false,
            preventScroll: false,
            forceMount: true,
            ref: contentState.opts.ref,
            tooltip: true,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else {
      $$renderer2.push("<!--[!-->");
      if (!forceMount) {
        $$renderer2.push("<!--[-->");
        {
          let popper = function($$renderer3, { props, wrapperProps }) {
            const mergedProps2 = mergeProps(props, { style: getFloatingContentCSSVars("tooltip") });
            if (child) {
              $$renderer3.push("<!--[-->");
              child($$renderer3, {
                props: mergedProps2,
                wrapperProps,
                ...contentState.snippetProps
              });
              $$renderer3.push(`<!---->`);
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...mergedProps2 })}>`);
              children?.($$renderer3);
              $$renderer3.push(`<!----></div></div>`);
            }
            $$renderer3.push(`<!--]-->`);
          };
          Popper_layer($$renderer2, spread_props([
            mergedProps,
            contentState.popperProps,
            {
              open: contentState.root.opts.open.current,
              id,
              trapFocus: false,
              loop: false,
              preventScroll: false,
              forceMount: false,
              ref: contentState.opts.ref,
              tooltip: true,
              popper,
              $$slots: { popper: true }
            }
          ]));
        }
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Tooltip_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      children,
      child,
      id = createId(uid),
      disabled = false,
      type = "button",
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = TooltipTriggerState.create({
      id: boxWith(() => id),
      disabled: boxWith(() => disabled ?? false),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = mergeProps(restProps, triggerState.props, { type });
    Floating_layer_anchor($$renderer2, {
      id,
      ref: triggerState.opts.ref,
      tooltip: true,
      children: ($$renderer3) => {
        if (child) {
          $$renderer3.push("<!--[-->");
          child($$renderer3, { props: mergedProps });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<button${attributes({ ...mergedProps })}>`);
          children?.($$renderer3);
          $$renderer3.push(`<!----></button>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    bind_props($$props, { ref });
  });
}
function TooltipContent($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      children,
      sideOffset = 8,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      {
        let child = function($$renderer4, { wrapperProps, props, open }) {
          if (open) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div${attributes({ ...wrapperProps })}><div${attributes({
              ...props,
              class: "z-50 overflow-hidden rounded-lg border border-base-300 bg-base-100 px-3 py-1.5 text-sm shadow-md"
            })}>`);
            children?.($$renderer4);
            $$renderer4.push(`<!----></div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]-->`);
        };
        Tooltip_content($$renderer3, spread_props([
          { sideOffset },
          restProps,
          {
            forceMount: true,
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            },
            child,
            $$slots: { child: true }
          }
        ]));
      }
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Tooltip($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      children,
      trigger,
      triggerProps = {},
      contentProps = {},
      delayDuration = 200,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Tooltip$1($$renderer3, spread_props([
        { delayDuration },
        restProps,
        {
          get open() {
            return open;
          },
          set open($$value) {
            open = $$value;
            $$settled = false;
          },
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            {
              let child = function($$renderer5, { props }) {
                $$renderer5.push(`<div${attributes({ ...props })}>`);
                trigger($$renderer5);
                $$renderer5.push(`<!----></div>`);
              };
              Tooltip_trigger($$renderer4, spread_props([triggerProps, { child, $$slots: { child: true } }]));
            }
            $$renderer4.push(`<!----> <!---->`);
            Portal($$renderer4, {
              children: ($$renderer5) => {
                TooltipContent($$renderer5, spread_props([
                  contentProps,
                  {
                    children: ($$renderer6) => {
                      children?.($$renderer6);
                      $$renderer6.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  }
                ]));
              }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { open });
  });
}
function MapPin($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M128,60a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,60Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,124Zm0-112a92.1,92.1,0,0,0-92,92c0,77.36,81.64,135.4,85.12,137.83a12,12,0,0,0,13.76,0,259,259,0,0,0,42.18-39C205.15,170.57,220,136.37,220,104A92.1,92.1,0,0,0,128,12Zm31.3,174.71A249.35,249.35,0,0,1,128,216.89a249.35,249.35,0,0,1-31.3-30.18C80,167.37,60,137.31,60,104a68,68,0,0,1,136,0C196,137.31,176,167.37,159.3,186.71Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M128,24a80,80,0,0,0-80,80c0,72,80,128,80,128s80-56,80-128A80,80,0,0,0,128,24Zm0,112a32,32,0,1,1,32-32A32,32,0,0,1,128,136Z" opacity="0.2"></path><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M128,66a38,38,0,1,0,38,38A38,38,0,0,0,128,66Zm0,64a26,26,0,1,1,26-26A26,26,0,0,1,128,130Zm0-112a86.1,86.1,0,0,0-86,86c0,30.91,14.34,63.74,41.47,94.94a252.32,252.32,0,0,0,41.09,38,6,6,0,0,0,6.88,0,252.32,252.32,0,0,0,41.09-38c27.13-31.2,41.47-64,41.47-94.94A86.1,86.1,0,0,0,128,18Zm0,206.51C113,212.93,54,163.62,54,104a74,74,0,0,1,148,0C202,163.62,143,212.93,128,224.51Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M128,68a36,36,0,1,0,36,36A36,36,0,0,0,128,68Zm0,64a28,28,0,1,1,28-28A28,28,0,0,1,128,132Zm0-112a84.09,84.09,0,0,0-84,84c0,30.42,14.17,62.79,41,93.62a250,250,0,0,0,40.73,37.66,4,4,0,0,0,4.58,0A250,250,0,0,0,171,197.62c26.81-30.83,41-63.2,41-93.62A84.09,84.09,0,0,0,128,20Zm37.1,172.23A254.62,254.62,0,0,1,128,227a254.62,254.62,0,0,1-37.1-34.81C73.15,171.8,52,139.9,52,104a76,76,0,0,1,152,0C204,139.9,182.85,171.8,165.1,192.23Z"></path>`);
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
function Users($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M125.18,156.94a64,64,0,1,0-82.36,0,100.23,100.23,0,0,0-39.49,32,12,12,0,0,0,19.35,14.2,76,76,0,0,1,122.64,0,12,12,0,0,0,19.36-14.2A100.33,100.33,0,0,0,125.18,156.94ZM44,108a40,40,0,1,1,40,40A40,40,0,0,1,44,108Zm206.1,97.67a12,12,0,0,1-16.78-2.57A76.31,76.31,0,0,0,172,172a12,12,0,0,1,0-24,40,40,0,1,0-10.3-78.67,12,12,0,1,1-6.16-23.19,64,64,0,0,1,57.64,110.8,100.23,100.23,0,0,1,39.49,32A12,12,0,0,1,250.1,205.67Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M136,108A52,52,0,1,1,84,56,52,52,0,0,1,136,108Z" opacity="0.2"></path><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M112.6,158.43a58,58,0,1,0-57.2,0A93.83,93.83,0,0,0,5.21,196.72a6,6,0,0,0,10.05,6.56,82,82,0,0,1,137.48,0,6,6,0,0,0,10-6.56A93.83,93.83,0,0,0,112.6,158.43ZM38,108a46,46,0,1,1,46,46A46.06,46.06,0,0,1,38,108Zm211,97a6,6,0,0,1-8.3-1.74A81.8,81.8,0,0,0,172,166a6,6,0,0,1,0-12,46,46,0,1,0-17.08-88.73,6,6,0,1,1-4.46-11.14,58,58,0,0,1,50.14,104.3,93.83,93.83,0,0,1,50.19,38.29A6,6,0,0,1,249,205Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M107.19,159a56,56,0,1,0-46.38,0A91.83,91.83,0,0,0,6.88,197.81a4,4,0,1,0,6.7,4.37,84,84,0,0,1,140.84,0,4,4,0,1,0,6.7-4.37A91.83,91.83,0,0,0,107.19,159ZM36,108a48,48,0,1,1,48,48A48.05,48.05,0,0,1,36,108Zm212,95.35a4,4,0,0,1-5.53-1.17A83.81,83.81,0,0,0,172,164a4,4,0,0,1,0-8,48,48,0,1,0-17.82-92.58,4,4,0,1,1-3-7.43,56,56,0,0,1,44,103,91.83,91.83,0,0,1,53.93,38.86A4,4,0,0,1,248,203.35Z"></path>`);
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
function Gauge($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M209.88,69.83A115.19,115.19,0,0,0,128,36h-.41C63.85,36.22,12,88.76,12,153.13V176a20,20,0,0,0,20,20H224a20,20,0,0,0,20-20V152A115.25,115.25,0,0,0,209.88,69.83ZM220,172H127.32l46.44-65A12,12,0,1,0,154.24,93L97.82,172H36V153.13c0-1.72,0-3.43.14-5.13H56a12,12,0,0,0,0-24H40.62c10.91-33.39,40-58.52,75.38-63.21V80a12,12,0,0,0,24,0V60.8A92,92,0,0,1,215.66,124H200a12,12,0,0,0,0,24h19.9c.06,1.33.1,2.66.1,4Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M232,152v24a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V153.13C24,95.65,70.15,48.2,127.63,48A104,104,0,0,1,232,152Z" opacity="0.2"></path><path d="M207.06,72.67A111.24,111.24,0,0,0,128,40h-.4C66.07,40.21,16,91,16,153.13V176a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V152A111.25,111.25,0,0,0,207.06,72.67ZM224,176H119.71l54.76-75.3a8,8,0,0,0-12.94-9.42L99.92,176H32V153.13c0-3.08.15-6.12.43-9.13H56a8,8,0,0,0,0-16H35.27c10.32-38.86,44-68.24,84.73-71.66V80a8,8,0,0,0,16,0V56.33A96.14,96.14,0,0,1,221,128H200a8,8,0,0,0,0,16h23.67c.21,2.65.33,5.31.33,8Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M240,152v24a16,16,0,0,1-16,16H115.93a4,4,0,0,1-3.24-6.35L174.27,101a8.21,8.21,0,0,0-1.37-11.3,8,8,0,0,0-11.37,1.61l-72,99.06A4,4,0,0,1,86.25,192H32a16,16,0,0,1-16-16V153.13c0-1.79,0-3.57.13-5.33a4,4,0,0,1,4-3.8H48a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,47.73,128H23.92a4,4,0,0,1-3.87-5c12-43.84,49.66-77.13,95.52-82.28a4,4,0,0,1,4.43,4V72a8,8,0,0,0,8.53,8A8.17,8.17,0,0,0,136,71.73V44.67a4,4,0,0,1,4.43-4A112.18,112.18,0,0,1,236.23,123a4,4,0,0,1-3.88,5H208.27a8.17,8.17,0,0,0-8.25,7.47,8,8,0,0,0,8,8.53h27.92a4,4,0,0,1,4,3.86C240,149.23,240,150.61,240,152Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M205.65,74.08A109.26,109.26,0,0,0,128,42h-.39C67.17,42.21,18,92.06,18,153.13V176a14,14,0,0,0,14,14H224a14,14,0,0,0,14-14V152A109.3,109.3,0,0,0,205.65,74.08ZM226,176a2,2,0,0,1-2,2H115.78l57.07-78.47a6,6,0,0,0-9.7-7.06L100.94,178H32a2,2,0,0,1-2-2V153.13A102.36,102.36,0,0,1,30.62,142H56a6,6,0,0,0,0-12H32.71C42.6,88.4,78.53,56.86,122,54.19V80a6,6,0,0,0,12,0V54.19A98.05,98.05,0,0,1,223.53,130H200a6,6,0,0,0,0,12h25.5c.33,3.3.5,6.64.5,10Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M207.06,72.67A111.24,111.24,0,0,0,128,40h-.4C66.07,40.21,16,91,16,153.13V176a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V152A111.25,111.25,0,0,0,207.06,72.67ZM224,176H119.71l54.76-75.3a8,8,0,0,0-12.94-9.42L99.92,176H32V153.13c0-3.08.15-6.12.43-9.13H56a8,8,0,0,0,0-16H35.27c10.32-38.86,44-68.24,84.73-71.66V80a8,8,0,0,0,16,0V56.33A96.14,96.14,0,0,1,221,128H200a8,8,0,0,0,0,16h23.67c.21,2.65.33,5.31.33,8Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M204.23,75.5A107.37,107.37,0,0,0,127.62,44C68.28,44.21,20,93.16,20,153.13V176a12,12,0,0,0,12,12H224a12,12,0,0,0,12-12V152A107.25,107.25,0,0,0,204.23,75.5ZM228,176a4,4,0,0,1-4,4H111.85l59.38-81.65a4,4,0,1,0-6.46-4.7L102,180H32a4,4,0,0,1-4-4V153.13A103.42,103.42,0,0,1,28.84,140H56a4,4,0,0,0,0-8H30.21C39.59,87.66,77.84,53.93,124,52.09V80a4,4,0,0,0,8,0V52.08A100.08,100.08,0,0,1,226,132H200a4,4,0,0,0,0,8h27.29a101.6,101.6,0,0,1,.71,12Z"></path>`);
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
function CurrencyDollar($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M152,116H140V60h4a28,28,0,0,1,28,28,12,12,0,0,0,24,0,52.06,52.06,0,0,0-52-52h-4V24a12,12,0,0,0-24,0V36h-4a52,52,0,0,0,0,104h4v56H104a28,28,0,0,1-28-28,12,12,0,0,0-24,0,52.06,52.06,0,0,0,52,52h12v12a12,12,0,0,0,24,0V220h12a52,52,0,0,0,0-104Zm-40,0a28,28,0,0,1,0-56h4v56Zm40,80H140V140h12a28,28,0,0,1,0,56Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M192,168a40,40,0,0,1-40,40H128V128h24A40,40,0,0,1,192,168ZM112,48a40,40,0,0,0,0,80h16V48Z" opacity="0.2"></path><path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M160,152a16,16,0,0,1-16,16h-8V136h8A16,16,0,0,1,160,152Zm72-24A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-56,24a32,32,0,0,0-32-32h-8V88h4a16,16,0,0,1,16,16,8,8,0,0,0,16,0,32,32,0,0,0-32-32h-4V64a8,8,0,0,0-16,0v8h-4a32,32,0,0,0,0,64h4v32h-8a16,16,0,0,1-16-16,8,8,0,0,0-16,0,32,32,0,0,0,32,32h8v8a8,8,0,0,0,16,0v-8h8A32,32,0,0,0,176,152Zm-76-48a16,16,0,0,0,16,16h4V88h-4A16,16,0,0,0,100,104Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M152,122H134V54h10a34,34,0,0,1,34,34,6,6,0,0,0,12,0,46.06,46.06,0,0,0-46-46H134V24a6,6,0,0,0-12,0V42H112a46,46,0,0,0,0,92h10v68H104a34,34,0,0,1-34-34,6,6,0,0,0-12,0,46.06,46.06,0,0,0,46,46h18v18a6,6,0,0,0,12,0V214h18a46,46,0,0,0,0-92Zm-40,0a34,34,0,0,1,0-68h10v68Zm40,80H134V134h18a34,34,0,0,1,0,68Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M152,124H132V52h12a36,36,0,0,1,36,36,4,4,0,0,0,8,0,44.05,44.05,0,0,0-44-44H132V24a4,4,0,0,0-8,0V44H112a44,44,0,0,0,0,88h12v72H104a36,36,0,0,1-36-36,4,4,0,0,0-8,0,44.05,44.05,0,0,0,44,44h20v20a4,4,0,0,0,8,0V212h20a44,44,0,0,0,0-88Zm-40,0a36,36,0,0,1,0-72h12v72Zm40,80H132V132h20a36,36,0,0,1,0,72Z"></path>`);
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
function Horse($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M144,104a16,16,0,1,1-16-16A16,16,0,0,1,144,104Zm92,25.53A108.3,108.3,0,0,1,130.18,236l-2.25,0A107.31,107.31,0,0,1,56,208.94a12,12,0,1,1,16-17.88,81.42,81.42,0,0,0,16.2,11.26l21.54-29.62c-20.4-7-41.91-3.33-54.43-1.21a35.79,35.79,0,0,1-35.25-14.43c-.16-.21-.31-.43-.45-.65l-13.78-22A12,12,0,0,1,9.43,118L108,53.51V32a12,12,0,0,1,12-12h8A108,108,0,0,1,236,129.53Zm-24-.33a84,84,0,0,0-80-85.11V60a12,12,0,0,1-5.43,10L32.41,131.61l7.31,11.68a12,12,0,0,0,11.58,4.54c16.23-2.75,49.4-8.36,79.64,8A36,36,0,0,0,164,120a12,12,0,0,1,24,0,60.09,60.09,0,0,1-53.64,59.66l-22.45,30.87a87.57,87.57,0,0,0,17.8,1.45A84.29,84.29,0,0,0,212,129.2Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M224,129.37c-.72,51.48-42.57,93.59-94.05,94.61a98.08,98.08,0,0,1-37.81-6.66L128,168h0c-26.64-16-57.23-11.3-74.7-8.34A24,24,0,0,1,29.79,150L16,128,120,64V32h8A96,96,0,0,1,224,129.37Z" opacity="0.2"></path><path d="M136,100a12,12,0,1,1-12-12A12,12,0,0,1,136,100Zm96,29.48A104.29,104.29,0,0,1,130.1,232l-2.17,0a103.32,103.32,0,0,1-69.26-26A8,8,0,1,1,69.34,194a84.71,84.71,0,0,0,20.1,13.37L116,170.84c-22.78-9.83-47.47-5.65-61.4-3.29A31.84,31.84,0,0,1,23.3,154.72l-.3-.43-13.78-22a8,8,0,0,1,2.59-11.05L112,59.53V32a8,8,0,0,1,8-8h8A104,104,0,0,1,232,129.48Zm-16-.22A88,88,0,0,0,128,40V64a8,8,0,0,1-3.81,6.81L27.06,130.59l9.36,15A15.92,15.92,0,0,0,52,151.77c16-2.7,48.77-8.24,78.07,8.18A40.06,40.06,0,0,0,168,120a8,8,0,0,1,16,0,56.07,56.07,0,0,1-51.8,55.83l-27.11,37.28A90.89,90.89,0,0,0,129.78,216,88.29,88.29,0,0,0,216,129.26Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M202.05,55A103.24,103.24,0,0,0,128,24h-8a8,8,0,0,0-8,8V59.53L11.81,121.19a8,8,0,0,0-2.59,11.05l13.78,22,.3.43a31.84,31.84,0,0,0,31.34,12.83c13.93-2.36,38.62-6.54,61.4,3.29l-26.6,36.57A84.71,84.71,0,0,1,69.34,194,8,8,0,1,0,58.67,206a103.32,103.32,0,0,0,69.26,26l2.17,0a104,104,0,0,0,72-177ZM124,112a12,12,0,1,1,12-12A12,12,0,0,1,124,112Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M134,100a10,10,0,1,1-10-10A10,10,0,0,1,134,100Zm96,29.45A102.29,102.29,0,0,1,130.06,230l-2.13,0A101.33,101.33,0,0,1,60,204.47a6,6,0,1,1,8-8.94,87.12,87.12,0,0,0,22.09,14.39l29-39.89c-23.93-11.37-50.18-6.93-64.8-4.45a29.84,29.84,0,0,1-29.38-12,3.62,3.62,0,0,1-.22-.32l-13.79-22a6,6,0,0,1,1.95-8.29L114,60.65V32a6,6,0,0,1,6-6h8A102,102,0,0,1,230,129.45Zm-12-.17A90,90,0,0,0,128,38h-2V64a6,6,0,0,1-2.86,5.11L24.29,129.94l10.47,16.74a17.91,17.91,0,0,0,17.54,7.06c15.82-2.67,48.42-8.18,77.23,8.22A42,42,0,0,0,170,120a6,6,0,0,1,12,0,54.06,54.06,0,0,1-50.87,53.9l-29.36,40.37A92.83,92.83,0,0,0,129.82,218,90.28,90.28,0,0,0,218,129.28Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M136,100a12,12,0,1,1-12-12A12,12,0,0,1,136,100Zm96,29.48A104.29,104.29,0,0,1,130.1,232l-2.17,0a103.32,103.32,0,0,1-69.26-26A8,8,0,1,1,69.34,194a84.71,84.71,0,0,0,20.1,13.37L116,170.84c-22.78-9.83-47.47-5.65-61.4-3.29A31.84,31.84,0,0,1,23.3,154.72l-.3-.43-13.78-22a8,8,0,0,1,2.59-11.05L112,59.53V32a8,8,0,0,1,8-8h8A104,104,0,0,1,232,129.48Zm-16-.22A88,88,0,0,0,128,40V64a8,8,0,0,1-3.81,6.81L27.06,130.59l9.36,15A15.92,15.92,0,0,0,52,151.77c16-2.7,48.77-8.24,78.07,8.18A40.06,40.06,0,0,0,168,120a8,8,0,0,1,16,0,56.07,56.07,0,0,1-51.8,55.83l-27.11,37.28A90.89,90.89,0,0,0,129.78,216,88.29,88.29,0,0,0,216,129.26Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M132,100a8,8,0,1,1-8-8A8,8,0,0,1,132,100Zm96,29.42A100.29,100.29,0,0,1,130,228l-2.09,0a99.37,99.37,0,0,1-66.6-25,4,4,0,1,1,5.34-6,89.08,89.08,0,0,0,24.09,15.39l31.35-43.11c-25.16-13-53.95-8.1-68.14-5.7a27.85,27.85,0,0,1-27.43-11.22c-.05-.07-.1-.14-.14-.21l-13.79-22a3.94,3.94,0,0,1-.5-3,4,4,0,0,1,1.79-2.5L116,61.76V32a4,4,0,0,1,4-4h8A100,100,0,0,1,228,129.42Zm-34.48-66A91.35,91.35,0,0,0,128,36h-4V64a4,4,0,0,1-1.9,3.41L21.53,129.29l11.58,18.52a19.89,19.89,0,0,0,19.52,7.91c15.68-2.66,48.08-8.13,76.39,8.25a44,44,0,0,0,43-44,4,4,0,0,1,8,0A52.06,52.06,0,0,1,130.07,172l-31.56,43.4A94.54,94.54,0,0,0,129.86,220,92,92,0,0,0,193.51,63.4Z"></path>`);
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
function ChartBar($$renderer, $$props) {
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
      $$renderer2.push(`<path d="M224,196h-4V40a12,12,0,0,0-12-12H152a12,12,0,0,0-12,12V76H96A12,12,0,0,0,84,88v36H48a12,12,0,0,0-12,12v60H32a12,12,0,0,0,0,24H224a12,12,0,0,0,0-24ZM164,52h32V196H164Zm-56,48h32v96H108ZM60,148H84v48H60Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M208,40V208H152V40Z" opacity="0.2"></path><path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M224,202H214V40a6,6,0,0,0-6-6H152a6,6,0,0,0-6,6V82H96a6,6,0,0,0-6,6v42H48a6,6,0,0,0-6,6v66H32a6,6,0,0,0,0,12H224a6,6,0,0,0,0-12ZM158,46h44V202H158ZM102,94h44V202H102ZM54,142H90v60H54Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M224,204H212V40a4,4,0,0,0-4-4H152a4,4,0,0,0-4,4V84H96a4,4,0,0,0-4,4v44H48a4,4,0,0,0-4,4v68H32a4,4,0,0,0,0,8H224a4,4,0,0,0,0-8ZM156,44h48V204H156ZM100,92h48V204H100ZM52,140H92v64H52Z"></path>`);
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.async(async ($$renderer3) => {
      const iconMap = {
        CurrencyDollar,
        Globe,
        Horse,
        Factory,
        Wind,
        Lightning,
        ChartBar
      };
      const ITEMS_PER_PAGE = 10;
      let sourceId = Number(page.params.id);
      const years = [2021, 2022, 2023, 2024];
      let yearlyData = (await save(Promise.all(years.map((year) => getSourceById({
        id: sourceId,
        timeGranularity: "month",
        start: `${year}-01`,
        end: `${year}-12`
      })))))();
      let source = yearlyData[yearlyData.length - 1];
      let countrySourceDetails = (await save(ct("getCountryDetails", { country: source.country })))();
      let currentPage = 1;
      let allEmissions = (() => {
        return yearlyData.flatMap((data) => {
          if (!data?.emissions || !Array.isArray(data.emissions)) return [];
          return data.emissions;
        });
      })();
      let emissionsTimeseries = (() => {
        return allEmissions.map((e) => ({
          date: `${e.year}-${String(e.month || 1).padStart(2, "0")}`,
          year: e.year,
          month: e.month,
          emissions: e.emissionsQuantity
        }));
      })();
      let totalEmissions = (() => {
        return allEmissions.reduce((sum, e) => sum + e.emissionsQuantity, 0);
      })();
      let gasBreakdown = (() => {
        const gasMap = /* @__PURE__ */ new Map();
        allEmissions.forEach((e) => {
          const current = gasMap.get(e.gas) || 0;
          gasMap.set(e.gas, current + e.emissionsQuantity);
        });
        return Array.from(gasMap.entries()).map(([gas, quantity]) => ({ gas, quantity, percentage: quantity / totalEmissions * 100 })).sort((a, b) => b.quantity - a.quantity);
      })();
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const currentEmissions = allEmissions.slice(startIndex, endIndex);
      let $$settled = true;
      let $$inner_renderer;
      function $$render_inner($$renderer4) {
        {
          $$renderer4.push("<!--[!-->");
          if (!source) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="flex min-h-[60vh] items-center justify-center"><div class="alert alert-error max-w-md">`);
            XCircle($$renderer4, { size: 24, weight: "bold" });
            $$renderer4.push(`<!----> <div><h3 class="font-bold">Source not found</h3> <a href="/sources" class="link link-hover">Return to sources</a></div></div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`<div class="px-section-x py-section-y"><div class="mb-4"><div class="breadcrumbs text-sm mb-2"><ul><li><a href="/" class="link link-hover">Home</a></li> <li><a href="/sources" class="link link-hover">Sources</a></li> <li>${escape_html(source.name || "Unknown Source")}</li></ul></div> <div class="flex items-center gap-4"><h1 class="text-4xl font-bold">${escape_html(source.name || "Unknown Source")}</h1> <div class="badge badge-primary badge-lg">${escape_html(formatSector(source.subsector))}</div></div> <p class="text-lg opacity-70 mt-2">${escape_html(formatSector(source.sector))}</p></div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 join-horizontal mb-4">`);
            Figure($$renderer4, {
              icon: Flame,
              title: "Total Emissions",
              value: fN(totalEmissions),
              subtitle: "tonnes CO₂e (2021-2024)",
              color: "warning"
            });
            $$renderer4.push(`<!----> `);
            {
              let trigger = function($$renderer5) {
                Figure($$renderer5, {
                  icon: Globe,
                  title: "Country",
                  value: source.country,
                  subtitle: "location",
                  color: "info",
                  href: `/country/${stringify(source.country)}`
                });
              };
              Tooltip($$renderer4, {
                trigger,
                children: ($$renderer5) => {
                  Heading($$renderer5, {
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->${escape_html(countrySourceDetails.name)}`);
                    },
                    $$slots: { default: true }
                  });
                },
                $$slots: { trigger: true, default: true }
              });
            }
            $$renderer4.push(`<!----> `);
            Figure($$renderer4, {
              icon: Factory,
              title: "Sector",
              value: formatSector(source.sector),
              subtitle: "industry type",
              color: "secondary"
            });
            $$renderer4.push(`<!----> `);
            if (source.totals?.activity) {
              $$renderer4.push("<!--[-->");
              const IconComponent = iconMap[getActivityIcon(source.totals.activityUnits)] || ChartBar;
              Figure($$renderer4, {
                icon: IconComponent,
                title: getActivityLabel(source.totals.activityUnits),
                value: formatActivity(source.totals.activity, source.totals.activityUnits),
                subtitle: source.totals.activityUnits,
                color: "neutral-content"
              });
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (source.totals?.capacityFactor !== void 0 && source.totals?.activityUnits && shouldShowCapacityCard(source.totals.activityUnits)) {
              $$renderer4.push("<!--[-->");
              Figure($$renderer4, {
                icon: Gauge,
                title: getCapacityLabel(source.totals.activityUnits),
                value: formatCapacityFactor(source.totals.capacityFactor, source.totals.activityUnits, source.totals.capacity),
                subtitle: getCapacityTooltip(source.totals.activityUnits),
                color: "info"
              });
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (source.totals?.emissionsFactor && source.totals?.activityUnits) {
              $$renderer4.push("<!--[-->");
              Figure($$renderer4, {
                icon: Flame,
                title: "Emissions Intensity",
                value: formatEmissionsFactor(source.totals.emissionsFactor, source.totals.activityUnits),
                subtitle: getEmissionsFactorUnit(source.totals.emissionsFactor, source.totals.activityUnits),
                color: "error"
              });
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (gasBreakdown.length === 1) {
              $$renderer4.push("<!--[-->");
              Figure($$renderer4, {
                icon: Flame,
                title: "Gas Type",
                value: fN(gasBreakdown[0].quantity),
                subtitle: `${stringify(gasBreakdown[0].gas)}, tonnes`,
                color: "warning"
              });
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (source.subsectorRanks && source.subsectorRanks.length > 0) {
              $$renderer4.push("<!--[-->");
              Figure($$renderer4, {
                icon: Trophy,
                title: "Subsector Rank",
                value: `#${stringify(source.subsectorRanks[0].rank)}`,
                subtitle: `in ${stringify(formatSector(source.subsector))}`,
                color: "secondary"
              });
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--></div> <div class="mb-8">`);
            if (emissionsTimeseries.length > 0) {
              $$renderer4.push("<!--[-->");
              {
                let title = function($$renderer5) {
                  $$renderer5.push(`<div class="flex items-center gap-2">`);
                  ChartLine($$renderer5, { size: 24, weight: "bold", class: "text-accent" });
                  $$renderer5.push(`<!----> <h2 class="card-title">Emissions Timeline</h2></div>`);
                }, content = function($$renderer5) {
                  $$renderer5.push(`<div class="px-4 pb-4">`);
                  Plot_1($$renderer5, {
                    inset: 15,
                    height: 250,
                    y: {
                      grid: true,
                      nice: true,
                      tickFormat(d) {
                        return fN(d.valueOf());
                      }
                    },
                    x: {
                      grid: true,
                      interval: "1 quarter",
                      tickFormat(d) {
                        return formatDate(d);
                      },
                      tickRotate: -20
                    },
                    children: ($$renderer6) => {
                      LineY($$renderer6, {
                        data: emissionsTimeseries,
                        x: (d) => new Date(d.date),
                        y: "emissions",
                        curve: "monotone-x",
                        stroke: "var(--color-primary)",
                        strokeWidth: 2,
                        strokeDasharray: "2"
                      });
                      $$renderer6.push(`<!----> `);
                      Dot($$renderer6, {
                        data: emissionsTimeseries,
                        x: (d) => new Date(d.date),
                        y: "emissions",
                        fill: "var(--color-primary)",
                        r: 3
                      });
                      $$renderer6.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> <div class="text-xs opacity-60 mt-2">Emissions in tonnes CO₂e</div></div>`);
                };
                Card($$renderer4, { title, content });
              }
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (gasBreakdown.length > 1) {
              $$renderer4.push("<!--[-->");
              {
                let title = function($$renderer5) {
                  $$renderer5.push(`<div class="flex items-center gap-2">`);
                  Flame($$renderer5, { size: 24, weight: "fill", class: "text-error" });
                  $$renderer5.push(`<!----> <h2 class="card-title">Gas Breakdown</h2></div>`);
                }, content = function($$renderer5) {
                  $$renderer5.push(`<div class="px-4 pb-4 space-y-3"><!--[-->`);
                  const each_array = ensure_array_like(gasBreakdown);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let gas = each_array[$$index];
                    $$renderer5.push(`<div><div class="flex justify-between items-center mb-1"><span class="text-sm font-medium">${escape_html(gas.gas)}</span> <span class="text-sm font-bold tabular-nums">${escape_html(fN(gas.quantity))}</span></div> <div class="flex items-center gap-2"><progress class="progress progress-error w-full"${attr("value", gas.percentage)} max="100"></progress> <span class="text-xs opacity-60 tabular-nums min-w-[3rem]">${escape_html(gas.percentage.toFixed(1))}%</span></div></div>`);
                  }
                  $$renderer5.push(`<!--]--></div>`);
                };
                Card($$renderer4, { title, content });
              }
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--></div> `);
            if (source.owners && source.owners.length > 0) {
              $$renderer4.push("<!--[-->");
              {
                let title = function($$renderer5) {
                  $$renderer5.push(`<div class="flex items-center gap-2">`);
                  Users($$renderer5, { size: 24, weight: "fill", class: "text-info" });
                  $$renderer5.push(`<!----> <h2 class="card-title">Owners</h2></div>`);
                }, content = function($$renderer5) {
                  $$renderer5.push(`<div class="px-4 pb-4 flex flex-wrap gap-2"><!--[-->`);
                  const each_array_1 = ensure_array_like(source.owners);
                  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                    let owner = each_array_1[$$index_1];
                    $$renderer5.push(`<a${attr("href", `/owners?id=${stringify(owner.id)}`)} class="badge badge-lg badge-outline">${escape_html(owner.name)}</a>`);
                  }
                  $$renderer5.push(`<!--]--></div>`);
                };
                Card($$renderer4, {
                  class: "mb-6",
                  title,
                  content
                });
              }
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            {
              let title = function($$renderer5) {
                $$renderer5.push(`<div class="flex items-center gap-2">`);
                MapPin($$renderer5, { size: 18, weight: "fill", class: "text-primary" });
                $$renderer5.push(`<!----> <h2 class="card-title text-lg">Detailed Emissions Timeline</h2></div>`);
              }, content = function($$renderer5) {
                $$renderer5.push(`<div class="overflow-x-auto"><table class="table table-sm"><thead><tr><th>Year</th><th>Month</th><th class="text-right">Emissions</th><th>Gas</th><th class="text-right">Activity</th></tr></thead><tbody><!--[-->`);
                const each_array_2 = ensure_array_like(currentEmissions);
                for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                  let emission = each_array_2[$$index_2];
                  $$renderer5.push(`<tr class="hover"><td>${escape_html(emission.year)}</td><td>${escape_html(emission.month || "-")}</td><td class="text-right tabular-nums">${escape_html(fN(emission.emissionsQuantity))}</td><td class="text-sm opacity-70">${escape_html(emission.gas)}</td><td class="text-right tabular-nums text-xs">`);
                  if (emission.activity) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`${escape_html(fN(emission.activity))} ${escape_html(emission.activityUnits || "")}`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                    $$renderer5.push(`-`);
                  }
                  $$renderer5.push(`<!--]--></td></tr>`);
                }
                $$renderer5.push(`<!--]--></tbody></table></div> <div class="mt-4 mb-2 pr-section-x">`);
                Pagination_1($$renderer5, {
                  count: allEmissions.length,
                  perPage: ITEMS_PER_PAGE,
                  get page() {
                    return currentPage;
                  },
                  set page($$value) {
                    currentPage = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div>`);
              };
              Card($$renderer4, { title, content });
            }
            $$renderer4.push(`<!----></div>`);
          }
          $$renderer4.push(`<!--]-->`);
        }
        $$renderer4.push(`<!--]-->`);
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
