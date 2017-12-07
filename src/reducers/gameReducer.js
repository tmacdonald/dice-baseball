import actions from './actions'
import inningReducer, { defaultInning } from './inningReducer'

/**
 * 
 * @param {*} state requires at least the shape 
 * { 
 *  innings: list { top: { runs: number, hits: number }, bottom: { runs: number, hits: number } }, 
 * }
 */
function isBottomHalf(state) {
    const numberOfInnings = state.innings.length
    return numberOfInnings > 0 && state.innings[numberOfInnings - 1].top && !state.innings[numberOfInnings - 1].bottom
}

function isTopHalf(state) {
    const numberOfInnings = state.innings.length
    return numberOfInnings === 0 || !state.innings[numberOfInnings - 1].top || state.innings[numberOfInnings - 1].bottom
}

/**
 * Returns true if
 * - 8+ 1/2 innings have been played and the home team is winning
 * - 9+ innings have been completed (top and bottom) and a team is winning
 * 
 * If the home team is ever winning after 9 innings, they win
 * 
 * @param {*} state requires at least the shape 
 * { 
 *  innings: list { top: { runs: number, hits: number }, bottom: { runs: number, hits: number } }, 
 *  currentInning: { runs: number, hits: number }
 * }
 */
function isEndState(state) {
    return (
        (state.innings.length >= 9 && getHomeTeamScore(state) > getVisitingTeamScore(state))
        || (state.innings.length >= 9 && isTopHalf(state) && getVisitingTeamScore(state) > getHomeTeamScore(state))
    )
}

/**
 * Gets the score for the visiting team including the current inning (if it is the top half)
 * 
 * @param {*} state requires at least the shape 
 * { 
 *  innings: list { top: { runs: number, hits: number }, bottom: { runs: number, hits: number } }, 
 *  currentInning: { runs: number, hits: number }
 * }
 */
function getVisitingTeamScore(state) {
    return state.innings
        .filter(inning => inning.top)
        .map(inning => inning.top.runs)
        .reduce((x, y) => x + y, 0)
        + ((isTopHalf(state) && state.currentInning) ? state.currentInning.runs : 0)

}

/**
 * Gets the score for the home team including the current inning (if it is the bottom half)
 * 
 * @param {*} state requires at least the shape 
 * { 
 *  innings: list { top: { runs: number, hits: number }, bottom: { runs: number, hits: number } }, 
 *  currentInning: { runs: number, hits: number }
 * }
 */
function getHomeTeamScore(state) {
    return state.innings
        .filter(inning => inning.bottom)
        .map(inning => inning.bottom.runs)
        .reduce((x, y) => x + y, 0)
        + ((isBottomHalf(state) && state.currentInning) ? state.currentInning.runs : 0)
}

function out(state, action) {
    const inningState = inningReducer(state.currentInning, action)
    if (inningState.outs === 3) {
        const inningSummary = {
            runs: inningState.runs,
            hits: inningState.hits
        }

        if (isEndState(state)) {

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

export {
    getVisitingTeamScore,
    getHomeTeamScore,
    isEndState
}