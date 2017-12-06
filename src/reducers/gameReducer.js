import actions from './actions'
import inningReducer, { defaultInning } from './inningReducer'

function isBottomHalf(state) {
    const numberOfInnings = state.innings.length
    return numberOfInnings > 0 && state.innings[numberOfInnings - 1].top && !state.innings[numberOfInnings - 1].bottom
}

function isTopHalf(state) {
    const numberOfInnings = state.innings.length
    return numberOfInnings === 0 || !state.innings[numberOfInnings - 1].top || state.innings[numberOfInnings - 1].bottom
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
            return Object.assign({}, updateBatter(state), {
                currentInning: defaultInning(state.homeRoster[state.homeIndex]),
                innings
            })
        } else {
            const fullInningsSummary = Object.assign({}, state.innings[state.innings.length - 1], { bottom: inningSummary })
            return Object.assign({}, updateBatter(state), {
                currentInning: defaultInning(state.visitingRoster[state.visitingIndex]),
                innings: state.innings.slice(0, state.innings.length - 1).concat(fullInningsSummary)    
            })
        }
        
    } else {
        return updateBatter(Object.assign({}, state, {
            currentInning: inningState
        }))
    }
}

function updateBatter(state) {
    if (isTopHalf(state)) {
        const visitingIndex = (state.visitingIndex + 1) % state.visitingRoster.length
        const batter = state.visitingRoster[visitingIndex]

        return Object.assign({}, state, {
            currentInning: Object.assign({}, state.currentInning, { batter }),
            visitingIndex
        })

    } else {
        const homeIndex = (state.homeIndex + 1) % state.homeRoster.length
        const batter = state.homeRoster[homeIndex]

        return Object.assign({}, state, {
            currentInning: Object.assign({}, state.currentInning, { batter }),
            homeIndex
        })
    }
}

function reducer(state, action) {
    switch (action.type) {
        case actions.SINGLE:
        case actions.DOUBLE:
        case actions.TRIPLE:
        case actions.HOMERUN:
        case actions.WALK:
            return updateBatter(Object.assign({}, state, {
                currentInning: inningReducer(state.currentInning, action),
            }))
        case actions.OUT:
            return out(state, action)
        default:
            return Object.assign({}, state, {
                currentInning: inningReducer(state.currentInning, action),
            })
    }
    
}

export default reducer