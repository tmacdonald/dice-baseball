import actions from './actions'
import baseReducer, { defaultState } from './baseReducer'

test('single with no runners on puts one runner at first', () => {
    const state = Object.assign({}, defaultState, { first: true })
    const newState = baseReducer({ type: actions.SINGLE })

    expect(newState.first).toBe(true)
})

test('single with runner on first puts runners on first and second', () => {
    const state = Object.assign({}, defaultState, { first: true })
    const newState = baseReducer(state, { type: actions.SINGLE })

    expect(newState.first).toBe(true)
    expect(newState.second).toBe(true)
})

test('single with runner on second puts runners on first and third', () => {
    const state = Object.assign({}, defaultState, { second: true })
    const newState = baseReducer(state, { type: actions.SINGLE })

    expect(newState.first).toBe(true)
    expect(newState.third).toBe(true)
})

test('single with runner on third scores run and puts runner on first', () => {
    const state = Object.assign({}, defaultState, { third: true })
    const newState = baseReducer(state, { type: actions.SINGLE })

    expect(newState.first).toBe(true)
    expect(newState.third).toBe(false)
})

test('double with no runners on puts one runner at second', () => {
    const newState = baseReducer({ type: actions.DOUBLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(true)
})

test('double with runner on first puts runners on second and third', () => {
    const state = Object.assign({}, defaultState, { first: true })
    const newState = baseReducer(state, { type: actions.DOUBLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(true)
    expect(newState.third).toBe(true)
})

test('triple with no runners on puts one runner at third', () => {
    const newState = baseReducer({ type: actions.TRIPLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(false)
    expect(newState.third).toBe(true)
})

test('triple with bases loaded clears bases', () => {
    const state = Object.assign({}, defaultState, { first: true, second: true, third: true })
    const newState = baseReducer(state, { type: actions.TRIPLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(false)
    expect(newState.third).toBe(true)
})

test('home run clears bases', () => {
    const state = Object.assign({}, defaultState, { first: true, second: true, third: true })
    const newState = baseReducer(state, { type: actions.HOMERUN })

    expect(newState.third).toBe(false)
    expect(newState.second).toBe(false)
    expect(newState.first).toBe(false)
})