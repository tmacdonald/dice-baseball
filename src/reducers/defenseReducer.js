import actions from './actions'

const defaultState = {
    balls: 0,
    strikes: 0,
    outs: 0,
    errors: 0
}

function strike(state, action) {
    const newState = Object.assign({}, state)

    newState.strikes = Math.min(3, state.strikes + 1)

    return newState
}

function ball(state, action) {
    const newState = Object.assign({}, state)

    newState.balls = Math.minmax(4, state.balls + 1)

    return newState
}

function walk(state, action) {
    const newState = Object.assign({}, state)

    newState.strikes = 0
    newState.balls = 0

    return newState
}

function out(state, action) {
    const newState = Object.assign({}, state)

    newState.outs = Math.min(3, state.outs + 1)
    newState.strikes = 0
    newState.balls = 0

    return newState
}

/**
 * Note that getting to four balls does not trigger a change in base runners. That has
 * to be done by the baseReducer
 * 
 * Note that getting to three strikes does not trigger a strikeout. That has to be detected
 * by the client which then send a STRIKE_OUT action to this reducer
 * 
 * @param {*} state 
 * @param {*} action 
 */
function reducer (state, action) {
    switch (action.type) {
        case actions.STRIKE:
            return strike(state, action)
        case actions.BALL:
            return ball(state, action)
        case actions.WALK:
            return walk(state, action)
        case actions.STRIKE_OUT:
        case actions.GROUND_OUT: 
        case actions.FLY_OUT:
            return out(state, action)
        default:
            return state
    }
}

export {
    defaultState
}
export default reducer