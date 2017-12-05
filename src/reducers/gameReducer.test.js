import reducer from './gameReducer'
import { defaultInning } from './inningReducer'
import actions from './actions'

const homeRoster = ['A', 'B', 'C', 'D']
const visitingRoster = ['E', 'F', 'G', 'H']

function log(message) {
    console.log(message)
}

test('game', () => {
    const state = {
        homeRoster,
        visitingRoster,
        currentInning: defaultInning(visitingRoster),
        innings: []
    }

    let newState = reducer(state, { type: actions.STRIKE })
    log(newState)

    newState = reducer(newState, { type: actions.STRIKE })
    log(newState)
    
    newState = reducer(newState, { type: actions.STRIKE })
    log(newState)

    newState = reducer(newState, { type: actions.SINGLE })
    log(newState)

    newState = reducer(newState, { type: actions.DOUBLE })
    log(newState)

    newState = reducer(newState, { type: actions.TRIPLE })
    log(newState)

    newState = reducer(newState, { type: actions.HOMERUN })
    log(newState)
})

test('top half of inning ending resets the state', () => {
    const inningState = Object.assign({}, defaultInning(visitingRoster), {
        runs: 1,
        outs: 2,
        hits: 2
    })

    const state = {
        homeRoster,
        visitingRoster,
        currentInning: inningState,
        innings: []
    }

    const newState = reducer(state, { type: actions.OUT })

    expect(newState).toEqual({
        currentInning: defaultInning(state.homeRoster),
        innings: [{
            top: {
                runs: 1,
                hits: 2
            }
        }]
    })
})

test('bottom half of inning ending resets the state', () => {
    const inningState = Object.assign({}, defaultInning(homeRoster), {
        runs: 4,
        outs: 2,
        hits: 5
    })

    const state = {
        homeRoster,
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
        currentInning: defaultInning(state.visitingRoster),
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