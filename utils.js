export function getObjectKey(obj) {
  if (typeof obj === "object") {
    return Object.keys(obj)[0];
  }
}

export function toCapitalCase(str) {
  if (!str) return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
