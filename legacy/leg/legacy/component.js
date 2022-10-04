class Component {
  constructor({ view, commands, models, systemEvents }) {
    this.view = view;
    this.commands = commands;
    this.models = models;
    this.systemEvents = systemEvents;

    this.setCommands();
  }

  setCommands() {
    const html = document.documentElement;

    for (let elementName in this.commands) {
      const element = this.view.$(elementName);
      element.component = this;

      if (!element.events) {
        element.events = {};
      }

      const events = this.commands[elementName];

      for (let eventName in events) {
        element.events[eventName] = events[eventName];

        if (!html.events.includes(eventName)) {
          html.events.push(eventName);
          html.addEventListener(eventName, (e) => {
            const systemEvents = e.target.events;

            if (!systemEvents && !systemEvents?.[eventName]) return;

            this.systemEvents[systemEvents[eventName]](this.models);
          });
        }
      }
    }
  }
}

export { Component };
