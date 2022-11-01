function getObjectKey(obj) {
  if (typeof obj === "object") {
    return Object.keys(obj)[0];
  }
}

const defaultEvents = {
  viewChange: {},
  dataChange: {},
  componentStarted: {},
  componentAppended: {},
  controllerAppended: {},
};

export { getObjectKey, defaultEvents };
