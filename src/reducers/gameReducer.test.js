import reducer from './gameReducer'
import { defaultInning } from './inningReducer'
import actions from './actions'

test('top half of inning ending resets the state', () => {
    const inningState = {
        bases: { first: false, second: false, third: false },
        batter: 'A',
        runs: 1,
        strikes: 0,
        balls: 0,
        outs: 2,
        hits: 2
    }

    const state = {
        currentInning: inningState,
        innings: []
    }

    const newState = reducer(state, { type: actions.OUT })

    expect(newState).toEqual({
        currentInning: defaultInning,
        innings: [{
            top: {
                runs: 1,
                hits: 2
            }
        }]
    })
})

test('top half of inning ending resets the state', () => {
    const inningState = {
        bases: { first: false, second: false, third: false },
        batter: 'A',
        runs: 4,
        strikes: 0,
        balls: 0,
        outs: 3,
        hits: 5
    }

    const state = {
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
        currentInning: defaultInning,
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