import actions from './actions'

const defaultState = {
    first: false,
    second: false,
    third: false
}

function advanceAllRunners(state, hitter, action) {
    const newState = Object.assign({}, state)

    newState.third = state.second
    newState.second = state.first
    newState.first = hitter
    newState.hitter = false

    return newState
}

function double(state, hitter, action) {
    const newState = Object.assign({}, state)

    newState.third = state.first
    newState.second = hitter
    newState.first = false
    newState.hitter = false

    return newState
}

function triple(state, hitter, action) {
    const newState = Object.assign({}, state)

    newState.third = hitter
    newState.second = false
    newState.first = false
    newState.hitter = false

    return newState
}

function homerun(state, hitter, action) {
    const newState = Object.assign({}, state)

    newState.third = false
    newState.second = false
    newState.first = false
    newState.hitter = false

    return newState
}

function advanceAvailableBases(state, hitter, action) {
    const newState = Object.assign({}, state)

    newState.third = (state.first && state.second) || state.third
    newState.second = state.first || state.second
    newState.first = hitter
    newState.hitter = false

    return newState
}

function reducer (state, hitter, action) {

    switch (action.type) {
        case actions.SINGLE: 
        case actions.ADVANCE_ALL_RUNNERS:
            return advanceAllRunners(state, hitter, action)
            case actions.DOUBLE:
            return double(state, hitter, action)
        case actions.TRIPLE:
            return triple(state, hitter, action)
        case actions.HOMERUN:
            return homerun(state, hitter, action)
        case actions.WALK:
        case actions.ADVANCE_AVAILABLE_BASES:
            return advanceAvailableBases(state, hitter, action)
        default:
            return defaultState
    }
}

export {
    defaultState
}
export default reducer