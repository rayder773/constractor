const EVENT = {
    RENDER: "render",
};
export class View {
    constructor(...args) {
        this.children = [];
        this.subscriptions = {};
        this.id = Math.random().toString(36).substr(2, 9);
        // this.on(EVENT.RENDER, () => {
        //   console.log(this);
        //   // console.log(this.id);
        // });
    }
    render({ parent = document.body, element = this.createElement(), } = {}) {
        parent.append(element);
        this.emit(EVENT.RENDER, { parent, element });
    }
    createElement() {
        return document.createElement("div");
    }
    appendChild(child, element) {
        this.children.push(child);
        element.append(child.createElement());
    }
    emit(eventName, data) {
        const subscriptions = this.subscriptions[eventName] || [];
        subscriptions.forEach((callback) => {
            callback(data);
        });
        this.children.forEach((child) => {
            child.emit(eventName, data);
        });
    }
    on(event, callback) {
        if (!this.subscriptions[event]) {
            this.subscriptions[event] = [];
        }
        this.subscriptions[event].push(callback);
    }
}
