import actions from './actions'

const defaultState = {
    runs: 0
}

function advanceAllRunners(state, basesState, action) {
    const newState = Object.assign({}, state)

    newState.runs = state.runs + 
        (basesState.third ? 1 : 0)

    return newState
}

function double(state, basesState, action) {
    const newState = Object.assign({}, state)

    newState.runs = state.runs + 
        (basesState.third ? 1 : 0) + 
        (basesState.second ? 1 : 0)

    return newState
}

function triple(state, basesState, action) {
    const newState = Object.assign({}, state)

    newState.runs = state.runs + 
        (basesState.third ? 1 : 0) + 
        (basesState.second ? 1 : 0) + 
        (basesState.first ? 1 : 0)

    return newState
}

function homerun(state, basesState, action) {
    const newState = Object.assign({}, state)

    newState.runs = state.runs + 
        1 + 
        (basesState.third ? 1 : 0) + 
        (basesState.second ? 1 : 0) + 
        (basesState.first ? 1 : 0)

    return newState
}

function advanceAvailableBases(state, action) {

}

function reducer (state, basesState, action) {

    switch (action.type) {
        case actions.SINGLE: 
            return advanceAllRunners(state, basesState, action)
        case actions.DOUBLE:
            return double(state, basesState, action)
        case actions.TRIPLE:
            return triple(state, basesState, action)
        case actions.HOMERUN:
            return homerun(state, basesState, action)
        case actions.WALK:
            return advanceAvailableBases(state, basesState, action)
        default:
            return defaultState
    }
}

export {
    defaultState
}
export default reducer