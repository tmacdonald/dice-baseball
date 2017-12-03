import actions from './actions'
import baseReducer, { defaultState } from './baseReducer'

const runner1 = 'A', runner2 = 'B', runner3 = 'C'
const hitter = 'D'

test('single with no runners on puts one runner at first', () => {
    const state = Object.assign({}, defaultState)
    const newState = baseReducer(state, hitter, { type: actions.SINGLE })

    expect(newState.first).toBe(hitter)
})

test('single with runner on first puts runners on first and second', () => {
    const state = Object.assign({}, defaultState, { first: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.SINGLE })

    expect(newState.first).toBe(hitter)
    expect(newState.second).toBe(runner1)
})

test('single with runner on second puts runners on first and third', () => {
    const state = Object.assign({}, defaultState, { second: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.SINGLE })

    expect(newState.first).toBe(hitter)
    expect(newState.third).toBe(runner1)
})

test('single with runner on third scores run and puts runner on first', () => {
    const state = Object.assign({}, defaultState, { third: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.SINGLE })

    expect(newState.first).toBe(hitter)
    expect(newState.third).toBe(false)
})

test('double with no runners on puts one runner at second', () => {
    const state = Object.assign({}, defaultState)
    const newState = baseReducer(state, hitter, { type: actions.DOUBLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(hitter)
})

test('double with runner on first puts runners on second and third', () => {
    const state = Object.assign({}, defaultState, { first: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.DOUBLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(hitter)
    expect(newState.third).toBe(runner1)
})

test('triple with no runners on puts one runner at third', () => {
    const state = Object.assign({}, defaultState)
    const newState = baseReducer(state, hitter, { type: actions.TRIPLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(false)
    expect(newState.third).toBe(hitter)
})

test('triple with bases loaded clears bases', () => {
    const state = Object.assign({}, defaultState, { first: runner3, second: runner2, third: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.TRIPLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(false)
    expect(newState.third).toBe(hitter)
})

test('home run clears bases', () => {
    const state = Object.assign({}, defaultState, { first: runner3, second: runner2, third: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.HOMERUN })

    expect(newState.third).toBe(false)
    expect(newState.second).toBe(false)
    expect(newState.first).toBe(false)
})

test('walk with no runners on puts a runner at first', () => {
    const state = Object.assign({}, defaultState)
    const newState = baseReducer(state, hitter, { type: actions.WALK })

    expect(newState.first).toBe(hitter)
    expect(newState.second).toBe(false)
    expect(newState.third).toBe(false)
})

test('walk with a runner on first puts runners on first and second', () => {
    const state = Object.assign({}, defaultState, { first: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.WALK })

    expect(newState.first).toBe(hitter)
    expect(newState.second).toBe(runner1)
    expect(newState.third).toBe(false)
})

test('walk with a runner on second puts runners on first and second', () => {
    const state = Object.assign({}, defaultState, { second: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.WALK })

    expect(newState.first).toBe(hitter)
    expect(newState.second).toBe(runner1)
    expect(newState.third).toBe(false)
})

test('walk with a runner on third puts runners on first and third', () => {
    const state = Object.assign({}, defaultState, { third: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.WALK })

    expect(newState.first).toBe(hitter)
    expect(newState.second).toBe(false)
    expect(newState.third).toBe(runner1)
})

test('walk with runners on first and second loads the bases', () => {
    const state = Object.assign({}, defaultState, { first: runner2, second: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.WALK })

    expect(newState.first).toBe(hitter)
    expect(newState.second).toBe(runner2)
    expect(newState.third).toBe(runner1)
})

test ('walk with runners on first and third loads the bases', () => {
    const state = Object.assign({}, defaultState, { first: runner2, third: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.WALK })

    expect(newState.first).toBe(hitter)
    expect(newState.second).toBe(runner2)
    expect(newState.third).toBe(runner1)
})

test ('walk with runners on second and third loads the bases', () => {
    const state = Object.assign({}, defaultState, { second: runner2, third: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.WALK })

    expect(newState.first).toBe(hitter)
    expect(newState.second).toBe(runner2)
    expect(newState.third).toBe(runner1)
})

test('walk with the bases loaded continues to have the bases loaded', () => {
    const state = Object.assign({}, defaultState, { first: runner3, second: runner2, third: runner1 })
    const newState = baseReducer(state, hitter, { type: actions.WALK })

    expect(newState.first).toBe(hitter)
    expect(newState.second).toBe(runner3)
    expect(newState.third).toBe(runner2)
})