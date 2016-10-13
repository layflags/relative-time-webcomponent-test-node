import './browser-env'
import test from 'ava'
import ago from 'ago'
import timekeeper from 'timekeeper'
import delay from 'delay'

// module under test
import RelativeTime from '.'

test('RelativeTime is a function', t => {
  const expected = 'function'
  const actual = typeof RelativeTime

  t.is(actual, expected)
})

;[
  '3 seconds ago',
  '1 hour ago',
  '7 days ago',
  '2 years ago'
].forEach(text => {
  test(`RelativeTime renders '${text}'`, t => {
    const expected = text
    const actual = relativeTime(new Date(ago(...text.split(' ')))).innerHTML

    t.is(actual, expected)
  })
})

test('RelativeTime updates automatically', async t => {
  // setup
  const component = relativeTime(new Date(), true)

  timekeeper.travel(new Date(ago(-2, 'days')))
  await delay()

  // expect
  const expected = '2 days ago'
  const actual = component.innerHTML

  t.is(actual, expected)

  // teardown
  timekeeper.reset()
})

// ~~~ helpers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function createComponent (Component, init) {
  const element = new Component()
  return init(element) || element
}

function relativeTime (date, autoupdate = false) {
  return createComponent(RelativeTime, element => {
    element.setAttribute('datetime', date.toISOString())
    if (autoupdate) element.setAttribute('autoupdate', true)
  })
}
