class Pubsub {
    constructor() {
        this.events = {};
    }

    subscribe(action, listener) {
        if(!this.events.hasOwnProperty(action)) {
            this.events[action] = [];
        }
        const indexOfAddedListener = this.events[action].push(listener) - 1;
        return function() {
            delete this.events[action][indexOfAddedListener];
        }.bind(this);
    }

    publish(action, payload) {
        if(!this.events.hasOwnProperty(action)) return;

        this.events[action].forEach((listener) => {
            listener(payload);
        })
    }
}