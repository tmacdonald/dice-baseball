import actions from './actions'
import inningReducer, { defaultInning } from './inningReducer'

function out(state, action) {
    const inningState = inningReducer(state.currentInning, action)
    if (inningState.outs === 3) {
        const inningSummary = {
            runs: inningState.runs,
            hits: inningState.hits
        }

        if (state.innings.length > 0 && state.innings[state.innings.length - 1].top) {
            const fullInningsSummary = Object.assign({}, state.innings[state.innings.length - 1], { bottom: inningSummary })
            return {
                currentInning: defaultInning,
                innings: state.innings.slice(0, state.innings.length - 1).concat(fullInningsSummary)    
            }
        } else {
            const innings = state.innings.slice().concat({ top: inningSummary })
            return {
                currentInning: defaultInning,
                innings
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
            return state
    }
    
}

export default reducer