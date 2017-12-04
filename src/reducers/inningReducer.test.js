import actions from './actions'
import reducer from './inningReducer'

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
    const state = {
        bases: { first: false, second: false, third: false },
        batter: 'A',
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
        bases: { first: 'C', second: 'B', third: 'A' },
        batter: 'D',
        runs: 0,
        strikes: 0,
        balls: 3,
        outs: 0,
        hits: 0
    }

    const newState = reducer(state, { type: actions.BALL })

    expect(newState.runs).toBe(state.runs + 1)
})

test('grand slam scores four and clears the bases', () => {
    const state = {
        bases: { first: 'C', second: 'B', third: 'A' },
        batter: 'D',
        runs: 0,
        strikes: 0,
        balls: 0,
        outs: 0,
        hits: 0
    }

    const newState = reducer(state, { type: actions.HOMERUN })

    expect(newState.runs).toBe(state.runs + 4)
    expect(newState.bases).toEqual({ batter: false, first: false, second: false, third: false })
})

test('all actions throws an error', () => {
    const state = {}

    for (let actionKey in actions) {
        if (actions.BATTER_UP !== actionKey && actions.hasOwnProperty(actionKey)) {
            expect(() => reducer(state, { type: actionKey })).toThrow()        
        }
    }
})

test('Batter up!', () => {
    const state = {}
    const batter = 'batter'

    const newState = reducer(state, { type: actions.BATTER_UP, batter })

    expect(newState.batter).toBe(batter)
})