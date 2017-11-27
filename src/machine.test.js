import machine, { actions, defaultState } from './machine'

test('single increments hits', () => {
    const state = Object.assign({}, defaultState)
    const newState = machine(state, { type: actions.SINGLE })

    expect(newState.hits).toBe(1)    
})

test('single with no runners on puts one runner at first', () => {
    const newState = machine({ type: actions.SINGLE })

    expect(newState.first).toBe(true)
})

test('single with runner on first puts runners on first and second', () => {
    const state = Object.assign({}, defaultState, { first: true })
    const newState = machine(state, { type: actions.SINGLE })

    expect(newState.first).toBe(true)
    expect(newState.second).toBe(true)
})

test('single with runner on second puts runners on first and third', () => {
    const state = Object.assign({}, defaultState, { second: true })
    const newState = machine(state, { type: actions.SINGLE })

    expect(newState.first).toBe(true)
    expect(newState.third).toBe(true)
})

test('single with runner on third scores run and puts runner on first', () => {
    const state = Object.assign({}, defaultState, { third: true })
    const newState = machine(state, { type: actions.SINGLE })

    expect(newState.first).toBe(true)
    expect(newState.third).toBe(false)
    expect(newState.runs).toBe(1)
})

test('double increments hits', () => {
    const state = Object.assign({}, defaultState)
    const newState = machine(state, { type: actions.DOUBLE })

    expect(newState.hits).toBe(1)    
})

test('double with no runners on puts one runner at second', () => {
    const newState = machine({ type: actions.DOUBLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(true)
})

test('double with runner on first puts runners on second and third', () => {
    const state = Object.assign({}, defaultState, { first: true })
    const newState = machine(state, { type: actions.DOUBLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(true)
    expect(newState.third).toBe(true)
})

test('triple increments hits', () => {
    const state = Object.assign({}, defaultState)
    const newState = machine(state, { type: actions.TRIPLE })

    expect(newState.hits).toBe(1)    
})

test('triple with no runners on puts one runner at third', () => {
    const newState = machine({ type: actions.TRIPLE })

    expect(newState.first).toBe(false)
    expect(newState.second).toBe(false)
    expect(newState.third).toBe(true)
})

test('triple with bases loaded scores three', () => {
    const state = Object.assign({}, defaultState, { first: true, second: true, third: true })
    const newState = machine(state, { type: actions.TRIPLE })

    expect(newState.runs).toBe(state.runs + 3)
    expect(newState.first).toBe(false)
    expect(newState.second).toBe(false)
    expect(newState.third).toBe(true)
})

test('triple with runner on first scores one and puts on runner at third', () => {
    const state = Object.assign({}, defaultState, { first: true })
    const newState = machine(state, { type: actions.TRIPLE })

    expect(newState.runs).toBe(1)
    expect(newState.first).toBe(false)
    expect(newState.second).toBe(false)
    expect(newState.third).toBe(true)
})