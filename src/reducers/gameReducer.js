import actions from './actions'
import inningReducer, { defaultInning } from './inningReducer'

function isBottomHalf(state) {
    return state.innings.length > 0 && state.innings[state.innings.length - 1].top
}

function isTopHalf(state) {
    return state.innings.length === 0 || !state.innings[state.innings.length - 1].top
}

function out(state, action) {
    const inningState = inningReducer(state.currentInning, action)
    if (inningState.outs === 3) {
        const inningSummary = {
            runs: inningState.runs,
            hits: inningState.hits
        }

        if (isTopHalf(state)) {
            const innings = state.innings.slice().concat({ top: inningSummary })
            return {
                currentInning: defaultInning(state.homeRoster),
                innings
            }
        } else {
            const fullInningsSummary = Object.assign({}, state.innings[state.innings.length - 1], { bottom: inningSummary })
            return {
                currentInning: defaultInning(state.visitingRoster),
                innings: state.innings.slice(0, state.innings.length - 1).concat(fullInningsSummary)    
            }
        }
        
    } else {
        return {
            currentInning: inningState,
            innings: state.innings
        }
    }

}

function reducer(state, action) {
    switch (action.type) {
        case actions.OUT:
            return out(state, action)
        default:
            return {
                currentInning: inningReducer(state.currentInning, action),
                innings: state.innings
            }
    }
    
}

export default reducer