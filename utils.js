function getObjectKey(obj) {
  if (typeof obj === "object") {
    return Object.keys(obj)[0];
  }
}

export { getObjectKey };
