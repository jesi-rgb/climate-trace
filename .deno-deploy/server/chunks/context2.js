import { h as hasContext, g as getContext } from "./context.js";
let contextKey = Symbol("phosphor-svelte");
function getIconContext() {
  if (hasContext(contextKey)) {
    return getContext(contextKey);
  }
  return {};
}
export {
  getIconContext as g
};
