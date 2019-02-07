import pubsub from '../pubsub'

beforeEach(() => {
  pubsub.events = {}
})

test('pubsub.events is defined', () => {
  expect(pubsub.events).toBeDefined()
})

test('when subscribe is called, creates a corresponding property', () => {
  const action = 'action'
  pubsub.subscribe(action, () => console.log('test'))
  expect(Object.prototype.hasOwnProperty.call(pubsub.events, action)).toBeTruthy()
})

test('when subscribe is called, creates a corresponding property with the value of array', () => {
  const action = 'action'
  pubsub.subscribe(action, () => console.log('test'))
  expect(Array.isArray(pubsub.events[action])).toBeTruthy()
})

test('when subscribe is called more than once with the same action name, does not create a duplicate property', () => {
  pubsub.subscribe('action', () => console.log('test1'))
  pubsub.subscribe('action', () => console.log('test2'))
  expect(Object.keys(pubsub.events).length).toBe(1)
})

test('when subscribe is called with different action names, creates two different properties', () => {
  pubsub.subscribe('action1', () => console.log('test1'))
  pubsub.subscribe('action2', () => console.log('test2'))
  expect(Object.keys(pubsub.events).length).toBe(2)
})

test('when subscribe is called more than once with the same action name, pushes the corresponding listeners to the array that corresponds to this action',
  () => {
    const action = 'action'
    pubsub.subscribe(action, () => console.log('test1'))
    pubsub.subscribe(action, () => console.log('test2'))
    expect(pubsub.events[action].length).toBe(2)
  })

test('when subscribe is called, return a function to delete the listener', () => {
  const fn = pubsub.subscribe('action', () => console.log('test'))
  expect(typeof fn).toBe('function')
})

test('when delete function is called, the listener is removed from the array', () => {
  const action = 'action'
  const fn = pubsub.subscribe('action', () => console.log('test'))
  expect(typeof pubsub.events[action][0]).toBe('function')
  fn()
  expect(typeof pubsub.events[action][0]).not.toBe('function')
})

test('when pubslish is called, fires all the function in the corresponding array', () => {
  const mock1 = jest.fn()
  const mock2 = jest.fn()
  pubsub.subscribe('action', mock1)
  pubsub.subscribe('action', mock2)
  pubsub.publish('action')
  expect(mock1.mock.calls.length).toBe(1)
  expect(mock2.mock.calls.length).toBe(1)
})

test('when pubslish is called, fires ONLY the function in the corresponding array', () => {
  const mock1 = jest.fn()
  const mock2 = jest.fn()
  const mock3 = jest.fn()
  pubsub.subscribe('action', mock1)
  pubsub.subscribe('action', mock2)
  pubsub.subscribe('action2', mock3)
  pubsub.publish('action')
  expect(mock1.mock.calls.length).toBe(1)
  expect(mock2.mock.calls.length).toBe(1)
  expect(mock3.mock.calls.length).toBe(0)
})

test('when publish is called with the second param, it is being passed as a payload', () => {
  const mock = jest.fn(x => x + 1)
  pubsub.subscribe('action', mock)
  const payload = 1
  pubsub.publish('action', payload)
  expect(mock.mock.results[0].value).toBe(2)
})
