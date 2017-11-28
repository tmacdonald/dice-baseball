import actions from './actions'
import defenseReducer from './defenseReducer'

function strike(state, action) {
    let newState = defenseReducer(state, action)

    if (newState.strikes === 3) {
        newState = defenseReducer(state, { type: actions.STRIKE_OUT })
    }
    return newState
}

function rootReducer(state, action) {
    switch(action.type) {
        case actions.STRIKE:
            return strike(state, action)
        default:
            return state
    }
}

export default rootReducer