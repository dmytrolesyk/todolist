class Pubsub {
  constructor() {
    this.events = {}
  }

  subscribe(action, listener) {
    if (!Object.prototype.hasOwnProperty.call(this.events, action)) {
      this.events[action] = []
    }
    const indexOfAddedListener = this.events[action].push(listener) - 1
    return function removeListener() {
      delete this.events[action][indexOfAddedListener]
    }.bind(this)
  }

  publish(action, payload) {
    if (!Object.prototype.hasOwnProperty.call(this.events, action)) return

    this.events[action].forEach((listener) => {
      listener(payload)
    })
  }
}