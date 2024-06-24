import { debounce } from "lodash";

function createDebouncedFunction(func, waitTime) {
  return debounce(func, waitTime);
}

export { createDebouncedFunction };
