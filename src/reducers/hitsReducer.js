import actions from './actions'

const defaultState = 0

function reducer (hits, action) {
    switch (action.type) {
        case actions.SINGLE:
        case actions.DOUBLE:
        case actions.TRIPLE:
        case actions.HOMERUN: 
            return hits + 1
        default:
            return hits
    }
}

export {
    defaultState
}
export default reducer