import actions from './actions'

const defaultState = {
    hits: 0
}

function reducer (state, action) {
    if (!action) {
        action = state
        state = defaultState
    }

    switch (action.type) {
        case actions.SINGLE:
        case actions.DOUBLE:
        case actions.TRIPLE:
        case actions.HOMERUN: 
            return { hits: state.hits + 1 }
        default:
            return state
    }
}

export {
    defaultState
}
export default reducer