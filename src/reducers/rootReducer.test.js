import actions from './actions'
import reducer from './rootReducer'

/**
 * state shape: {
 *  bases: {
 *      first: boolean,
 *      second: boolean,
 *      third: boolean
 *  },
 *  runs: number,
 *  strikes: 0,
 *  balls: 0,
 *  outs: 0,
 *  hits: 0
 * }
 */

test('three strikes, you\'re out!', () => {
    const state = {
        bases: { first: false, second: false, third: false },
        runs: 0,
        strikes: 2,
        balls: 0,
        outs: 0,
        hits: 0
    }

    const newState = reducer(state, { type: actions.STRIKE })

    expect(newState.outs).toBe(state.outs + 1)
    expect(newState.strikes).toBe(0)
})

test('ball four with bases loaded scores a run', () => {
    const state = {
        bases: { first: true, second: true, third: true },
        runs: 0,
        strikes: 0,
        balls: 3,
        outs: 0,
        hits: 0
    }

    const newState = reducer(state, { type: actions.BALL })

    expect(newState.runs).toBe(state.runs + 1)
})