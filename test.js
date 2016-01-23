import test from 'ava'
import shady from './index.js'

const WAIT = 100
const TIMEOUT = 1000

test.cb('one event with string', t => {
  t.plan(1)

  let sink = shady()
  sink.on('e', t.pass)

  setTimeout(sink.send('e'), WAIT)
  setTimeout(t.end, TIMEOUT)
})

test.cb('one event with array', t => {
  t.plan(1)

  let sink = shady()
  sink.on(['e'], t.pass)

  setTimeout(sink.send('e'), WAIT)
  setTimeout(t.end, TIMEOUT)
})

test.cb('no events', t => {
  t.plan(0)

  let sink = shady()
  sink.on('e', t.fail)

  setTimeout(t.end, TIMEOUT)
})

test.cb('wrong event', t => {
  t.plan(1)

  let sink = shady()
  sink.on('f', t.fail)
  sink.on('p', t.pass)

  setTimeout(sink.send('p'), WAIT)
  setTimeout(t.end, TIMEOUT)
})

test.cb('any event', t => {
  t.plan(1)

  let sink = shady()
  sink.on('*', t.pass)

  setTimeout(sink.send('a'), WAIT)
  setTimeout(t.end, TIMEOUT)
})

test.cb('multiple single events', t => {
  t.plan(2)

  let sink = shady()
  sink.on('a', t.pass)
  sink.on('b', t.pass)

  setTimeout(sink.send('a'), WAIT)
  setTimeout(sink.send('b'), WAIT + 1)
  setTimeout(t.end, TIMEOUT)
})

test.cb('wait for multiple events', t => {
  t.plan(1)

  let sink = shady()
  sink.on(['a', 'b', 'c'], t.pass)

  setTimeout(sink.send('a'), WAIT)
  setTimeout(sink.send('b'), WAIT + 1)
  setTimeout(sink.send('c'), WAIT + 2)
  setTimeout(t.end, TIMEOUT)
})
