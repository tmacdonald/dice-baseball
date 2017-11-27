import actions from './actions'

const defaultState = {
    first: false,
    second: false,
    third: false
}

function advanceAllRunners(state, action) {
    const newState = Object.assign({}, state)

    newState.third = state.second
    newState.second = state.first
    newState.first = true

    return newState
}

function double(state, action) {
    const newState = Object.assign({}, state)

    newState.third = state.first
    newState.second = true
    newState.first = false

    return newState
}

function triple(state, action) {
    const newState = Object.assign({}, state)

    newState.third = true
    newState.second = false
    newState.first = false

    return newState
}

function homerun(state, action) {
    const newState = Object.assign({}, state)

    newState.third = false
    newState.second = false
    newState.first = false

    return newState
}

function advanceAvailableBases(state, action) {

}

function machine (state, action) {
    if (!action) {
        action = state
        state = defaultState
    }

    switch (action.type) {
        case actions.SINGLE: 
        case actions.ADVANCE_ALL_RUNNERS:
            return advanceAllRunners(state, action)
        case actions.DOUBLE:
            return double(state, action)
        case actions.TRIPLE:
            return triple(state, action)
        case actions.HOMERUN:
            return homerun(state, action)
        case actions.WALK:
        case actions.ADVANCE_AVAILABLE_BASES:
            return advanceAvailableBases(state, action)
        default:
            return defaultState
    }
}

export {
    actions,
    defaultState
}
export default machine