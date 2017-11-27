const actions = {
    SINGLE: 'SINGLE',
    DOUBLE: 'DOUBLE',
    TRIPLE: 'TRIPLE',
    HOME_RUN: 'HOME_RUN'
}

const defaultState = {
    first: false,
    second: false,
    third: false,
    balls: 0,
    strikes: 0,
    outs: 0,
    hits: 0,
    runs: 0,
    errors: 0
}

function single(state, action) {
    const newState = Object.assign({}, state)

    newState.hits = state.hits + 1
    newState.runs = state.runs + (state.third ? 1 : 0)
    newState.third = state.second
    newState.second = state.first
    newState.first = true

    return newState
}

function double(state, action) {
    const newState = Object.assign({}, state)

    newState.hits += 1
    newState.runs = state.runs + (state.third ? 1 : 0) + (state.second ? 1 : 0)
    newState.third = state.first
    newState.second = true
    newState.first = false

    return newState
}

function triple(state, action) {
    const newState = Object.assign({}, state)

    newState.hits = state.hits + 1
    newState.runs = state.runs + (state.third ? 1 : 0) + (state.second ? 1 : 0) + (state.first ? 1 : 0)
    newState.third = true
    newState.second = false
    newState.first = false

    return newState
}

function homerun(state, action) {
    const newState = Object.assign({}, state)

    newState.hits = state.hits + 1
    newState.runs = state.runs + 1 + (state.third ? 1 : 0) + (state.second ? 1 : 0) + (state.first ? 1 : 0)
    newState.third = false
    newState.second = false
    newState.first = false

    return newState
}

function machine (state, action) {
    if (!action) {
        action = state
        state = defaultState
    }

    switch (action.type) {
        case actions.SINGLE: 
            return single(state, action)
        case actions.DOUBLE:
            return double(state, action)
        case actions.TRIPLE:
            return triple(state, action)
        case actions.HOMERUN:
            return homerun(state, action)
        default:
            return defaultState
    }
}

export {
    actions,
    defaultState
}
export default machine