import actions from './actions'
import hitsReducer, { defaultState } from './hitsReducer'

test('single increments hits', () => {
    const state = Object.assign({}, defaultState)
    const newState = hitsReducer(state, { type: actions.SINGLE })

    expect(newState.hits).toBe(state.hits + 1)    
})

test('double increments hits', () => {
    const state = Object.assign({}, defaultState)
    const newState = hitsReducer(state, { type: actions.DOUBLE })

    expect(newState.hits).toBe(state.hits + 1)    
})

test('triple increments hits', () => {
    const state = Object.assign({}, defaultState)
    const newState = hitsReducer(state, { type: actions.TRIPLE })

    expect(newState.hits).toBe(state.hits + 1)    
})

test('home run increments hits', () => {
    const state = Object.assign({}, defaultState)
    const newState = hitsReducer(state, { type: actions.HOMERUN })

    expect(newState.hits).toBe(state.hits + 1)    
})

test('walk does not increment hits', () => {
    const state = Object.assign({}, defaultState)
    const newState = hitsReducer(state, { type: actions.WALK })

    expect(newState.hits).toBe(state.hits)    
})