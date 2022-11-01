import { Entity } from "./Entity.js";
import { defaultEvents, getObjectKey } from "./utils.js";

export class Component extends Entity {
  children = [];
  subscribtions = {};

  constructor({ children, ...props } = {}) {
    super(props);
    this.setChildren(children);
  }

  setChildren(children) {
    if (!children || !Array.isArray(children)) return;

    this.children = children;
  }

  start() {
    this.initChildren();
  }

  initChildren() {
    if (!this.children) return;

    this.children.forEach((child) => {
      child = this.app.addEntity(child);
      child.setParent(this);
    });

    delete this.children;
  }

  // start() {
  //   this.generateId(this);
  //   // this.initControllers();
  //   // this.initComponents();
  //   // this.subscribe(this.systemEvents, this);

  //   // if (this.types) {
  //   //   this.types.forEach((type) => {
  //   //     this.globalRing({ system: { [`${type}:start`]: this } });
  //   //     this.localRing({ system: { [`${type}:start`]: this } });
  //   //   });
  //   // }
  // }

  // setComponents(components) {
  //   if (components) {
  //     this.components = components;
  //   }
  // }

  // setControllers(controllers) {
  //   if (controllers) {
  //     this.controllers = controllers;
  //   }
  // }

  // initComponents() {
  //   if (!this.components) return;

  //   this.components.forEach((component) => {
  //     if (typeof component === "function") {
  //       this.addComponents(component);
  //     }
  //   });

  //   delete this.component;
  // }

  // initControllers() {
  //   if (!this.controllers) return;

  //   this.controllers.forEach((controller) => {
  //     if (typeof controller === "function") {
  //       this.addChildren(controller);
  //     }
  //   });

  //   delete this.controllers;
  // }

  // generateId(entity) {
  //   let lastId = -1;

  //   if (Object.keys(this.children)[Object.keys(this.children).length - 1]) {
  //     lastId = Object.keys(this.children)[
  //       Object.keys(this.children).length - 1
  //     ];
  //   } else if (this.id != null) {
  //     lastId = this.id;
  //   }

  //   const newId = parseInt(lastId) + 1;

  //   entity.setId(newId);

  //   return newId;
  // }

  // addComponents(components) {
  //   if (!components) return;

  //   components = this.addChildren(components);

  //   components.forEach((c) => {
  //     c.start();
  //   });
  // }

  // addChildren(children) {
  //   if (!children) return;

  //   if (!Array.isArray(children)) {
  //     children = [children];
  //   }

  //   return children.map((child) => {
  //     child = child();

  //     const id = this.generateId(child);

  //     this.children[id] = child;

  //     child.setParent(this);

  //     console.log(child);

  //     // if (child.types) {
  //     //   child.types.forEach((type) => {
  //     //     this.ring({ system: { [`${type}:append`]: child } });
  //     //   });
  //     // }

  //     return child;
  //   });
  // }

  // prepareEvents(events) {
  //   if (!events || !this.global[channelName]) return false;

  //   if (!Array.isArray(events)) {
  //     events = [events];
  //   }

  //   return events;
  // }

  // globalRing(radio) {
  //   for (let channelName in radio) {
  //     let events = this.prepareEvents(radio[channelName]);

  //     if (!events) continue;

  //     events.forEach((eventData) => {
  //       let eventListeners = null;

  //       if (typeof eventData === "string") {
  //         eventListeners = this.global[channelName][eventData];
  //       } else {
  //         const eventName = getObjectKey(eventData);
  //         eventListeners = this.channels[channelName][eventName];
  //       }

  //       if (!eventListeners) return;

  //       eventListeners.forEach((id) => {
  //         // if (id === this.id) {
  //         //   if (this.systemEvents[channelName][eventData]) {
  //         //     this.systemEvents[channelName][eventData].call(
  //         //       this,
  //         //       eventData[eventName]
  //         //     );
  //         //   }
  //         // } else {
  //         //   if (this.children[id].systemEvents[channelName][eventName]) {
  //         //     this.children[id].systemEvents[channelName][eventName].call(
  //         //       this.children[id],
  //         //       eventData[eventName]
  //         //     );
  //         //   }
  //         // }
  //       });
  //     });
  //   }
  // }

  // ring(radio) {
  //   for (let channelName in radio) {
  //     let events = radio[channelName];

  //     if (!events || !this.channels[channelName]) continue;

  //     if (!Array.isArray(events)) {
  //       events = [events];
  //     }

  //     events.forEach((eventData) => {
  //       if (typeof eventData === "string") {
  //         const eventListeners = this.channels[channelName][eventData];

  //         if (eventListeners) {
  //           eventListeners.forEach((id) => {
  //             if (id === this.id) {
  //               if (this.systemEvents[channelName][eventData]) {
  //                 this.systemEvents[channelName][eventData].call(this);
  //               }
  //             } else {
  //               if (this.children[id].systemEvents[channelName][eventData]) {
  //                 this.children[id].systemEvents[channelName][eventData].call(
  //                   this.children[id]
  //                 );
  //               }
  //             }
  //           });
  //         }
  //       } else {
  //         const eventName = getObjectKey(eventData);
  //         const eventListeners = this.channels[channelName][eventName];

  //         if (eventListeners) {
  //           eventListeners.forEach((id) => {
  //             if (id === this.id) {
  //               if (this.systemEvents[channelName][eventData]) {
  //                 this.systemEvents[channelName][eventData].call(
  //                   this,
  //                   eventData[eventName]
  //                 );
  //               }
  //             } else {
  //               if (this.children[id].systemEvents[channelName][eventName]) {
  //                 this.children[id].systemEvents[channelName][eventName].call(
  //                   this.children[id],
  //                   eventData[eventName]
  //                 );
  //               }
  //             }
  //           });
  //         }
  //       }
  //     });
  //   }
  // }

  // subscribe(radio, entity) {
  //   for (let channelName in radio) {
  //     if (!this.channels[channelName]) continue;

  //     for (let eventName in radio[channelName]) {
  //       if (!this.channels[channelName][eventName]) {
  //         this.channels[channelName][eventName] = [];
  //       }
  //       const index = this.channels[channelName][eventName].push(entity.id);
  //       if (entity !== this) {
  //         entity.info.push(["channels", channelName, eventName, index]);
  //       }
  //     }
  //   }
  // }
}
