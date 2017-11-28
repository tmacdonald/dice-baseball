import actions from './actions'
import runsReducer, { defaultState } from './runsReducer'

const basesLoaded = { first: true, second: true, third: true }

test('single with runner on third scores 1', () => {
    const state = defaultState
    const newState = runsReducer(state, { third: true }, { type: actions.SINGLE })

    expect(newState).toBe(state + 1)
})

test('single with no runners on third scores 0', () => {
    const state = defaultState
    const newState = runsReducer(state, {}, { type: actions.SINGLE })

    expect(newState).toBe(state)
})

test('single with runn on second scores 0', () => {
    const state = defaultState
    const newState = runsReducer(state, { second: true }, { type: actions.SINGLE })

    expect(newState).toBe(state)
})

test('double with runner on third scores 1', () => {
    const state = defaultState
    const newState = runsReducer(state, { third: true }, { type: actions.DOUBLE })

    expect(newState).toBe(state + 1)
})

test('double with runner on second scores 1', () => {
    const state = defaultState
    const newState = runsReducer(state, { second: true }, { type: actions.DOUBLE })

    expect(newState).toBe(state + 1)
})

test('double with runners on second and third scores 2', () => {
    const state = defaultState
    const newState = runsReducer(state, { second: true, third: true }, { type: actions.DOUBLE })

    expect(newState).toBe(state + 2)
})

test('double with runner on first scores 0', () => {
    const state = defaultState
    const newState = runsReducer(state, { first: true }, { type: actions.DOUBLE })

    expect(newState).toBe(state)
})

test('double with no runners on third scores 0', () => {
    const state = defaultState
    const newState = runsReducer(state, {}, { type: actions.DOUBLE })

    expect(newState).toBe(state)
})

test('triple with bases loaded scores 3', () => {
    const state = defaultState
    const newState = runsReducer(state, basesLoaded, { type: actions.TRIPLE })

    expect(newState).toBe(state + 3)
})

test('triple with runner on first scores one', () => {
    const state = defaultState
    const newState = runsReducer(state, { first: true }, { type: actions.TRIPLE })

    expect(newState).toBe(state + 1)
})

test('triple with runner on second scores one', () => {
    const state = defaultState
    const newState = runsReducer(state, { second: true }, { type: actions.TRIPLE })

    expect(newState).toBe(state + 1)
})

test('triple with runner on third scores one and puts on runner at third', () => {
    const state = defaultState
    const newState = runsReducer(state, { third: true }, { type: actions.TRIPLE })

    expect(newState).toBe(state + 1)
})

test('home run with no runners on scores one', () => {
    const state = 3
    const newState = runsReducer(state, {}, { type: actions.HOMERUN })

    expect(newState).toBe(state + 1)
})

test('home run with runner on scores two', () => {
    const state = defaultState
    const newState = runsReducer(state, { second: true }, { type: actions.HOMERUN })

    expect(newState).toBe(state + 2)
})

test('home run with two runners on scores three', () => {
    const state = defaultState
    const newState = runsReducer(state, { first: true, second: true }, { type: actions.HOMERUN })

    expect(newState).toBe(state + 3)
})

test('home run with bases loaded scores four', () => {
    const state = defaultState
    const newState = runsReducer(state, { first: true, second: true, third: true }, { type: actions.HOMERUN })

    expect(newState).toBe(state + 4)
})