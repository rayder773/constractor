export function EventEmmiter() {
  let listeners = {};

  return Object.freeze({
    addListener(eventName, cb) {
      if (!listeners[eventName]) {
        listeners[eventName] = [];
      }

      if (!listeners[eventName].includes(cb)) {
        listeners[eventName].push(cb);
      }
    },
    notify(eventName, ...args) {
      if (listeners[eventName]) {
        listeners[eventName].forEach((cb) => {
          cb(...args);
        });
      }
    },
  });
}
