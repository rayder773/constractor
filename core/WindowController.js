import { Controller } from "./Controller.js";
import { toCapitalCase } from "../utils.js";

export class WindowController extends Controller {
  clienEvents = [];

  constructor({ clienEvents, ...props } = {}) {
    super(props);
    this.setClienEvents(clienEvents);
  }

  setClienEvents(clienEvents) {
    if (!clienEvents) return;

    this.clienEvents = clienEvents;
  }

  start() {
    if (!this.clienEvents) return;

    this.clienEvents.forEach((eventName) => {
      window.addEventListener(eventName, (e) => {
        let { target } = e;

        if (target === window) {
          this.ask(`on${toCapitalCase(eventName)}`, e);
        } else {
          let systemEventName = null;

          while (target) {
            systemEventName = target?.events?.[eventName];
            if (systemEventName) {
              break;
            } else {
              target = target.parentElement;
            }
          }
          if (systemEventName) {
            if (target.view.controller.clientEvents[systemEventName]) {
              target.view.controller.clientEvents[systemEventName](e);
            } else {
              target.view.controller.ask(systemEventName, e);
            }
          }
        }
      });
    });

    super.start();
  }
}
