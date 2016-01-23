# Shady [![Build Status](https://travis-ci.org/rrdelaney/shady.svg?branch=master)](https://travis-ci.org/rrdelaney/shady)

Async event handling made easy

## Usage

```js
var shady = require('shady')

var sink = shady()
sink.on(['a', 'b'], function() {
  console.log('a and b are done!')
  // ... other things
})

setTimeout(sink.send('a'), 1000)
setTimeout(sink.send('b'), 2000)
```

Shady makes it super easy to handle async tasks for simple things.
It's primary use-case is waiting for task dependencies to be done,
then executing something else. The main difference between Shady and streams is
that Shady can wait for multiple signals and each time a Shady listener is used,
it is discarded. This means if something is listening for "a", and "a" is sent
twice, the listener will only fire once.

## Development

Run tests with `npm test`
