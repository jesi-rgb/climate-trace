import "./async.js";
import { i as element, h as attributes, j as clsx } from "./index3.js";
import { c as cn } from "./utils3.js";
function Heading($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      as = null,
      class: className,
      size = "h2",
      children,
      $$slots,
      $$events,
      ...rest
    } = $$props;
    const baseClass = "font-bold font-display leading-[1.04]";
    const headingSizeOptions = {
      h1: "text-[20px] md:text-[30px] tracking-[-0.01em]",
      h2: "text-[18px] md:text-[20px]",
      h3: "text-[16px] md:text-[18px]",
      eyebrow: "text-[11px] md:text-[13px] uppercase tracking-wide font-semibold leading-[1.00]"
    };
    const elementSizeOptions = { h1: "h1", h2: "h2", h3: "h3", eyebrow: "h4" };
    const finalAs = as ?? elementSizeOptions[size];
    const classList = cn(baseClass, headingSizeOptions[size], className);
    element(
      $$renderer2,
      finalAs,
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
export {
  Heading as H
};
