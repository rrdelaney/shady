exports.wait = function shady (events, timeout) {
  var eventResults = {}
  var eventCount = events.length
  var resolveWait
  var rejectWait

  var wait = new Promise((resolve, reject) => {
    resolveWait = resolve
    rejectWait = reject
  })

  wait.send = name => (err, res) => {
    if (err === null || err === undefined) {
      err = res || true
    }

    var ev = events
      .map((e, index) => ({ name: e, index: index }))
      .filter(e => e.name === name)[0]

    if (ev !== undefined) {
      events[ev.index] = undefined
      eventResults[ev.name] = err
      eventCount -= 1
    }

    if (eventCount === 0) {
      resolveWait(eventResults)
    }

    return wait
  }

  if (timeout) {
    setTimeout(() => rejectWait(new Error('Wait timeout after ' + timeout + 'ms')), timeout)
  }

  return wait
}
