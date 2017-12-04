import actions from './actions'

const defaultState = {
    first: false,
    second: false,
    third: false
}

function advanceAllRunners(state, batter, action) {
    const newState = Object.assign({}, state)

    newState.third = state.second
    newState.second = state.first
    newState.first = batter
    newState.batter = false

    return newState
}

function double(state, batter, action) {
    const newState = Object.assign({}, state)

    newState.third = state.first
    newState.second = batter
    newState.first = false
    newState.batter = false

    return newState
}

function triple(state, batter, action) {
    const newState = Object.assign({}, state)

    newState.third = batter
    newState.second = false
    newState.first = false
    newState.batter = false

    return newState
}

function homerun(state, batter, action) {
    const newState = Object.assign({}, state)

    newState.third = false
    newState.second = false
    newState.first = false
    newState.batter = false

    return newState
}

function advanceAvailableBases(state, batter, action) {
    const newState = Object.assign({}, state)

    newState.third = (state.first && state.second) || state.third
    newState.second = state.first || state.second
    newState.first = batter
    newState.batter = false

    return newState
}

function reducer (state, batter, action) {

    switch (action.type) {
        case actions.SINGLE: 
        case actions.ADVANCE_ALL_RUNNERS:
            return advanceAllRunners(state, batter, action)
            case actions.DOUBLE:
            return double(state, batter, action)
        case actions.TRIPLE:
            return triple(state, batter, action)
        case actions.HOMERUN:
            return homerun(state, batter, action)
        case actions.WALK:
        case actions.ADVANCE_AVAILABLE_BASES:
            return advanceAvailableBases(state, batter, action)
        default:
            return defaultState
    }
}

export {
    defaultState
}
export default reducer