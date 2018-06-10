import reducer, { getHomeTeamScore, getVisitingTeamScore, isEndState } from "./gameReducer";
import { defaultInning } from "./inningReducer";
import actions from "./actions";

const homeIndex = 0;
const homeRoster = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const visitingIndex = 0;
const visitingRoster = ["Z", "Y", "X", "W", "V", "U", "T", "S", "R"];

test("top half of inning ending resets the state", () => {
  const inningState = Object.assign({}, defaultInning(visitingRoster[visitingIndex]), {
    runs: 1,
    outs: 2,
    hits: 2
  });

  const state = {
    homeIndex,
    homeRoster,
    visitingIndex,
    visitingRoster,
    currentInning: inningState,
    innings: []
  };

  const newState = reducer(state, { type: actions.OUT });

  expect(newState).toEqual({
    visitingIndex: visitingIndex + 1,
    homeIndex,
    homeRoster,
    visitingRoster,
    currentInning: defaultInning(state.homeRoster[0]),
    innings: [
      {
        top: {
          runs: 1,
          hits: 2
        }
      }
    ]
  });
});

test("bottom half of inning ending resets the state", () => {
  const inningState = Object.assign({}, defaultInning(homeRoster[0]), {
    runs: 4,
    outs: 2,
    hits: 5
  });

  const state = {
    homeIndex,
    homeRoster,
    visitingIndex,
    visitingRoster,
    currentInning: inningState,
    innings: [
      {
        top: {
          runs: 1,
          hits: 2
        }
      }
    ]
  };

  const newState = reducer(state, { type: actions.OUT });

  expect(newState).toEqual({
    homeIndex: homeIndex + 1,
    homeRoster,
    visitingIndex,
    visitingRoster,
    currentInning: defaultInning(state.visitingRoster[0]),
    innings: [
      {
        top: {
          runs: 1,
          hits: 2
        },
        bottom: {
          runs: 4,
          hits: 5
        }
      }
    ]
  });
});

function createInning(visitingRuns, visitingHits, homeRuns, homeHits) {
  return {
    top: { runs: visitingRuns, hits: visitingHits },
    bottom: { runs: homeRuns, hits: homeHits }
  };
}

function createInnings(
  numberOfInnings,
  visitingRunsPerInning,
  visitingHitsPerInning,
  homeRunsPerInning,
  homeHitsPerInning
) {
  const innings = [];
  for (let i = 0; i < numberOfInnings; i = i + 1) {
    innings.push(createInning(visitingRunsPerInning, visitingHitsPerInning, homeRunsPerInning, homeHitsPerInning));
  }
  return innings;
}

const inning = { top: { runs: 0, hits: 1 }, bottom: { runs: 1, hits: 2 } };
const eightInnings = [inning, inning, inning, inning, inning, inning, inning, inning];

test("getVisitingTeamScore sums up the runs of all completed innings", () => {
  const innings = [createInning(3, 3, 0, 0), createInning(2, 2, 0, 0), createInning(2, 2, 0, 0)];

  const state = {
    innings
  };

  expect(getVisitingTeamScore(state)).toEqual(7);
});

test("getVisitingTeamScore includes the current inning", () => {
  const innings = [createInning(3, 3, 0, 0), createInning(2, 2, 0, 0), createInning(2, 2, 0, 0)];

  const state = {
    innings,
    currentInning: {
      runs: 1,
      hits: 2
    }
  };

  expect(getVisitingTeamScore(state)).toEqual(8);
});

test("getHomeTeamScore sums up the runs of all completed innings", () => {
  const innings = [createInning(0, 0, 1, 1), createInning(0, 0, 2, 2), createInning(0, 0, 3, 3)];

  const state = {
    innings
  };

  expect(getHomeTeamScore(state)).toEqual(6);
});

test("getHomeTeamScore includes the current inning", () => {
  const innings = [
    createInning(0, 0, 1, 1),
    createInning(0, 0, 2, 2),
    createInning(0, 0, 3, 3),
    { top: { runs: 0, hits: 0 } }
  ];

  const state = {
    innings,
    currentInning: {
      runs: 4,
      hits: 2
    }
  };

  expect(getHomeTeamScore(state)).toEqual(10);
});

test("isEndState is false in with no innings played", () => {
  const state = {
    innings: []
  };

  expect(isEndState(state)).toBe(false);
});

test("isEndState is false when teams are tied after 9 innings", () => {
  const state = {
    innings: createInnings(9, 0, 0, 0, 0)
  };

  expect(isEndState(state)).toBe(false);
});

test("isEndState is true when home team is winning after 8 1/2", () => {
  const state = {
    innings: eightInnings.concat({ top: { runs: 0, hits: 0 } })
  };

  expect(isEndState(state)).toBe(true);
});

test("isEndState is true when visiting team is winning at 9 innings played", () => {
  const state = {
    innings: createInnings(9, 1, 1, 0, 0)
  };

  expect(isEndState(state)).toBe(true);
});

// TODO visiting team winning after 10 innings and batting - true
// TODO home team winning after 10 innings - true
// TODO visiting team winning after 9 innings but home team has to bat - false

xtest("end state - end of the top of the ninth with the home team winning", () => {
  const inningState = Object.assign({}, defaultInning(visitingRoster[visitingIndex]), {
    runs: 1,
    outs: 2,
    hits: 2
  });

  const state = {
    homeIndex,
    homeRoster,
    visitingIndex,
    visitingRoster,
    currentInning: inningState,
    innings: eightInnings
  };

  const newState = reducer(state, { type: actions.OUT });

  expect(newState).toEqual({
    gameOver: true,
    homeRoster,
    visitingRoster,
    innings: eightInnings.concat({
      top: {
        runs: 1,
        hits: 2
      }
    })
  });
});

test("end state - end of the bottom of the ninth", () => {});

test("end state - extra innings", () => {});

xtest("game", () => {
  function log(message) {
    console.log(message);
  }

  const state = {
    homeIndex,
    homeRoster,
    visitingIndex,
    visitingRoster,
    currentInning: defaultInning(visitingRoster[visitingIndex]),
    innings: []
  };

  let newState = state;

  for (var i = 0; i < 30; i = i + 1) {
    const action = Math.random() < 0.7 ? actions.SINGLE : actions.OUT;
    console.log(action);
    newState = reducer(newState, { type: action });
    log(newState);
  }
});
