# shady

Async event handling made easy

## Usage

```js
// ES6
var shady = require('shady')

var sink = shady.wait(['a', 'b'])
sink.then(() => console.log('done!'))

setTimeout(sink.send('a'), 1000)
setTimeout(sink.send('b'), 2000)
```

```js
//ES7

import { wait } from 'shady'

async () => {
  const sink = wait(['a', 'b'])

  setTimeout(sink.send('a'), 1000)
  setTimeout(sink.send('b'), 2000)

  await sink
  console.log('done!')
}
```

You can get results from Shady too!

```js
// ES7

import { wait } from 'shady'

async () => {
  const sink = wait(['a', 'b'])

  setTimeout(() => sink.send('a')(1), 1000)
  setTimeout(() => sink.send('b')(2), 2000)

  let { a, b } = await sink
}

```

Shady makes it super easy to handle async tasks for simple things.
It's primary use-case is waiting for task dependencies to be done,
then executing something else. The main difference between Shady and streams is
that Shady can wait for multiple signals and each time a Shady listener is used,
it is discarded. This means if something is listening for "a", and "a" is sent
twice, the listener will only fire once.

## Development

Run tests with `npm test`
