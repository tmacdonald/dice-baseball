import actions from './actions'
import reducer, { defaultState } from './defenseReducer'

test('strike increments strikes', () => {
    const state = Object.assign({}, defaultState, { strikes: 0 })
    const newState = reducer(state, { type: actions.STRIKE })

    expect(newState.strikes).toBe(state.strikes + 1)    
})

test('strike does not exceed three', () => {
    const state = Object.assign({}, defaultState, { strikes: 3 })
    const newState = reducer(state, { type: actions.STRIKE })

    expect(newState.strikes).toBe(3)    
})

test('strike out resets strike count', () => {
    const state = Object.assign({}, defaultState, { strikes: 3 })
    const newState = reducer(state, { type: actions.OUT })

    expect(newState.strikes).toBe(0)
})

test('strike out resets ball count', () => {
    const state = Object.assign({}, defaultState, { balls: 3 })
    const newState = reducer(state, { type: actions.OUT })

    expect(newState.balls).toBe(0)
})

test('strike out increments outs', () => {
    const state = Object.assign({}, defaultState, { outs: 0 })
    const newState = reducer(state, { type: actions.OUT })

    expect(newState.outs).toBe(1)
})

test('walk resets strike count', () => {
    const state = Object.assign({}, defaultState, { strikes: 3 })
    const newState = reducer(state, { type: actions.WALK })

    expect(newState.strikes).toBe(0)
})

test('walk resets ball count', () => {
    const state = Object.assign({}, defaultState, { balls: 3 })
    const newState = reducer(state, { type: actions.WALK })

    expect(newState.balls).toBe(0)
})