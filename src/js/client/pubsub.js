/** @flow */


export class Pubsub {
  events: {[string]: Array<(any) => any>} = {}

  constructor() {
    this.events = {}
  }

  subscribe(action: string, listener: (any) => void): ?() => void {
    if (!Object.prototype.hasOwnProperty.call(this.events, action)) {
      this.events[action] = []
    }
    const indexOfAddedListener = this.events[action].push(listener) - 1
    return function removeListener() {
      delete this.events[action][indexOfAddedListener]
    }.bind(this)
  }

  publish(action: string, payload: any) {
    if (!Object.prototype.hasOwnProperty.call(this.events, action)) return

    this.events[action].forEach((listener) => {
      listener(payload)
    })
  }
}

const pubsub = new Pubsub()

export default pubsub
