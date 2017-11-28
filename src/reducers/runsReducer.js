import actions from './actions'

const defaultState = 0

function advanceAllRunners(runs, basesState, action) {
    return runs + 
        (basesState.third ? 1 : 0)
}

function double(runs, basesState, action) {
    return runs + 
        (basesState.third ? 1 : 0) + 
        (basesState.second ? 1 : 0)
}

function triple(runs, basesState, action) {
    return runs + 
        (basesState.third ? 1 : 0) + 
        (basesState.second ? 1 : 0) + 
        (basesState.first ? 1 : 0)
}

function homerun(runs, basesState, action) {
    return runs + 1 + 
        (basesState.third ? 1 : 0) + 
        (basesState.second ? 1 : 0) + 
        (basesState.first ? 1 : 0)
}

function advanceAvailableBases(state, basesState, action) {
    if (basesState.first && basesState.second && basesState.third) {
        return state + 1
    }
    return state
}

function reducer (runs, basesState, action) {

    switch (action.type) {
        case actions.SINGLE: 
            return advanceAllRunners(runs, basesState, action)
        case actions.DOUBLE:
            return double(runs, basesState, action)
        case actions.TRIPLE:
            return triple(runs, basesState, action)
        case actions.HOMERUN:
            return homerun(runs, basesState, action)
        case actions.WALK:
            return advanceAvailableBases(runs, basesState, action)
        default:
            return runs
    }
}

export {
    defaultState
}
export default reducer