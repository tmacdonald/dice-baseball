import actions from './actions'
import defenseReducer from './defenseReducer'
import runsReducer from './runsReducer'
import baseReducer from './baseReducer'
import hitsReducer from './hitsReducer'

const defaultInning = {
    bases: { first: false, second: false, third: false },
    runs: 0,
    strikes: 0,
    balls: 0,
    outs: 0,
    hits: 0
}

function batterUp(state, action) {
    return Object.assign({}, state, { batter: action.batter })
}

function verifyBatter(state) {
    if (!state.batter) {
        throw 'batter is required'
    }
}

function strike(state, action) {
    let newState = reducer(state, action)

    if (newState.strikes === 3) {
        newState = reducer(state, { type: actions.OUT })
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
    const newBases = baseReducer(state.bases, state.batter, action)
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
        case actions.BATTER_UP:
            return batterUp(state, action)
        case actions.STRIKE:
            verifyBatter(state)
            return strike(state, action)
        case actions.BALL:
            verifyBatter(state)
            return ball(state, action)
        default:
            verifyBatter(state)
            return reducer(state, action)
    }
}

export default rootReducer
export {
    defaultInning 
}