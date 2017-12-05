import actions from './actions'
import reducer, { defaultInning } from './inningReducer'

const roster = ['A', 'B', 'C', 'D']

/**
 * state shape: {
 *  bases: {
 *      first: object,
 *      second: object,
 *      third: object
 *  },
 *  batter: object
 *  runs: number,
 *  strikes: 0,
 *  balls: 0,
 *  outs: 0,
 *  hits: 0
 * }
 */

test('three strikes, you\'re out!', () => {
    const state = Object.assign({}, defaultInning(roster), {
        strikes: 2
    })

    const newState = reducer(state, { type: actions.STRIKE })

    expect(newState.outs).toBe(state.outs + 1)
    expect(newState.strikes).toBe(0)
})

test('ball four with bases loaded scores a run', () => {
    const state = Object.assign({}, defaultInning(roster), {
        bases: { first: 'B', second: 'C', third: 'D' },
        balls: 3
    })

    const newState = reducer(state, { type: actions.BALL })

    expect(newState.runs).toBe(state.runs + 1)
})

test('grand slam scores four and clears the bases', () => {
    const state = Object.assign({}, defaultInning(roster), {
        bases: { first: 'B', second: 'C', third: 'D' }
    })

    const newState = reducer(state, { type: actions.HOMERUN })

    expect(newState.runs).toBe(state.runs + 4)
    expect(newState.bases).toEqual({ first: false, second: false, third: false })
})