function isSubset (A, B) {
  return B.every(val => A.indexOf(val) !== -1)
}

module.exports = function shady () {
  return {
    events: [],
    listeners: [],
    send: function (name) {
      return () => {
        this.events.push(name)
        this.listeners.forEach((listener, idx) => {
          if (listener.on[0] === '*' || isSubset(this.events, listener.on)) {
            listener.cb()
            this.listeners.splice(idx, 1)
          }
        })
      }
    },
    on: function (events, fn) {
      this.listeners.push({
        on: Array.isArray(events) ? events : [events],
        cb: fn
      })
    }
  }
}
