import reducer from './gameReducer'
import { defaultInning } from './inningReducer'
import actions from './actions'

const homeIndex = 0
const homeRoster = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
const visitingIndex = 0
const visitingRoster = ['Z', 'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R']

test('top half of inning ending resets the state', () => {
    
    const inningState = Object.assign({}, defaultInning(visitingRoster[visitingIndex]), {
        runs: 1,
        outs: 2,
        hits: 2
    })

    const state = {
        homeIndex,
        homeRoster,
        visitingIndex,
        visitingRoster,
        currentInning: inningState,
        innings: []
    }

    const newState = reducer(state, { type: actions.OUT })

    expect(newState).toEqual({
        visitingIndex: visitingIndex + 1,
        homeIndex,
        homeRoster,
        visitingRoster,
        currentInning: defaultInning(state.homeRoster[0]),
        innings: [{
            top: {
                runs: 1,
                hits: 2
            }
        }]
    })
})

test('bottom half of inning ending resets the state', () => {
    const inningState = Object.assign({}, defaultInning(homeRoster[0]), {
        runs: 4,
        outs: 2,
        hits: 5
    })

    const state = {
        homeIndex,
        homeRoster,
        visitingIndex,
        visitingRoster,
        currentInning: inningState,
        innings: [{
            top: {
                runs: 1,
                hits: 2
            }
        }]
    }

    const newState = reducer(state, { type: actions.OUT })

    expect(newState).toEqual({
        homeIndex: homeIndex + 1,
        homeRoster,
        visitingIndex,
        visitingRoster,
        currentInning: defaultInning(state.visitingRoster[0]),
        innings: [{
            top: {
                runs: 1,
                hits: 2
            },
            bottom: {
                runs: 4,
                hits: 5
            }
        }]
    })
})

test('end state - end of the top of the ninth with the home team winning', () => {

})

test('end state - end of the bottom of the ninth', () => {

})

test('end state - extra innings', () => {

})

test('game', () => {
    function log(message) {
        console.log(message)
    }    

    const state = {
        homeIndex,
        homeRoster,
        visitingIndex,
        visitingRoster,
        currentInning: defaultInning(visitingRoster[visitingIndex]),
        innings: []
    }

    let newState = state

    for (var i = 0; i < 30; i = i + 1) {
        const action = Math.random() < 0.7 ? actions.SINGLE : actions.OUT
        console.log(action)
        newState = reducer(newState, { type: action })
        log(newState)
    }
})