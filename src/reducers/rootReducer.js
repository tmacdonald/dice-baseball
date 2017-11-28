import actions from './actions'
import defenseReducer from './defenseReducer'
import runsReducer from './runsReducer'
import baseReducer from './baseReducer'
import hitsReducer from './hitsReducer'

function strike(state, action) {
    let newState = reducer(state, action)

    if (newState.strikes === 3) {
        newState = reducer(state, { type: actions.STRIKE_OUT })
    }
    return newState
}

function ball(state, action) {
    let newState = reducer(state, action)

    if (newState.balls === 4) {
        newState = reducer(state, { type: actions.WALK })
    }
    return newState
}

function reducer(state, action) {
    const defenseState = defenseReducer(state, action)
    const runState = runsReducer(state.runs, state.bases, action)
    const newBases = baseReducer(state.bases, action)
    const hitState = hitsReducer(state.hits, action)

    const newState = Object.assign(
        {},
        state,
        defenseState,
        { runs: runState },
        { hits: hitState },
        { bases: newBases }
    )

    return newState
}

function rootReducer(state, action) {
    switch(action.type) {
        case actions.STRIKE:
            return strike(state, action)
        case actions.BALL:
            return ball(state, action)
        default:
            return reducer(state, action)
    }
}

export default rootReducer