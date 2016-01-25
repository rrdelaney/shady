import test from 'ava'
import { wait } from './index.js'

const WAIT = 100
const TIMEOUT = 1000

test('one event', t => {
  let sink = wait(['e'], TIMEOUT)
  setTimeout(sink.send('e'), WAIT)

  return sink
})

test('two events', t => {
  let sink = wait(['a', 'b'], TIMEOUT)

  setTimeout(sink.send('a'), WAIT)
  setTimeout(sink.send('b'), WAIT + 1)

  return sink
})

test('no events', t => {
  let sink = wait(['e'], TIMEOUT)

  return t.throws(sink)
})

test('wrong event', t => {
  let sink = wait(['f'], TIMEOUT)

  setTimeout(sink.send('p'), WAIT)

  return t.throws(sink)
})

test('results with one arg', async t => {
  let sink = wait(['a'], TIMEOUT)

  setTimeout(() => sink.send('a')('OK'), WAIT)

  let { a } = await sink
  t.is(a, 'OK')
})

test('three events', async t => {
  let sink = wait(['a', 'b', 'c'], TIMEOUT)

  setTimeout(sink.send('a'), WAIT)
  setTimeout(sink.send('b'), WAIT + 1)
  setTimeout(sink.send('c'), WAIT + 2)

  let { a, b, c } = await sink

  t.ok(a)
  t.ok(b)
  t.ok(c)
})
