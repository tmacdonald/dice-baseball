import actions from './actions'
import hitsReducer, { defaultState } from './hitsReducer'

test('single increments hits', () => {
    const state = defaultState
    const newState = hitsReducer(state, { type: actions.SINGLE })

    expect(newState).toBe(state + 1)    
})

test('double increments hits', () => {
    const state = defaultState
    const newState = hitsReducer(state, { type: actions.DOUBLE })

    expect(newState).toBe(state + 1)    
})

test('triple increments hits', () => {
    const state = defaultState
    const newState = hitsReducer(state, { type: actions.TRIPLE })

    expect(newState).toBe(state + 1)    
})

test('home run increments hits', () => {
    const state = defaultState
    const newState = hitsReducer(state, { type: actions.HOMERUN })

    expect(newState).toBe(state + 1)    
})

test('walk does not increment hits', () => {
    const state = defaultState
    const newState = hitsReducer(state, { type: actions.WALK })

    expect(newState).toBe(state)    
})