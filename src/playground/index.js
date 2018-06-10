import actionGenerator from "./actionGenerator";
import { generateRandomDiceRolls } from "../dice/dice-roll";
import { defaultInning } from "../reducers/inningReducer";
import reducer, { getVisitingTeamScore, getHomeTeamScore, isEndState } from "../reducers/gameReducer";
import actions from "../reducers/actions";

// const ruleSet = [
//   { roll: [1, 1], action: actions.DOUBLE },
//   { roll: [1, 2], action: actions.SINGLE },
//   { roll: [1, 3], action: actions.SINGLE },
//   { roll: [1, 4], action: actions.SINGLE },
//   { roll: [1, 5], action: actions.WALK },
//   { roll: [1, 6], action: actions.WALK },
//   { roll: [2, 2], action: actions.STRIKE },
//   { roll: [2, 3], action: actions.STRIKE },
//   { roll: [2, 4], action: actions.STRIKE },
//   { roll: [2, 5], action: actions.STRIKE },
//   { roll: [2, 6], action: actions.OUT },
//   { roll: [3, 3], action: actions.OUT },
//   { roll: [3, 4], action: actions.OUT },
//   { roll: [3, 5], action: actions.OUT },
//   { roll: [3, 6], action: actions.OUT },
//   { roll: [4, 4], action: actions.OUT },
//   { roll: [4, 5], action: actions.OUT },
//   { roll: [4, 6], action: actions.OUT },
//   { roll: [5, 5], action: actions.OUT },
//   { roll: [5, 6], action: actions.TRIPLE },
//   { roll: [6, 6], action: actions.HOMERUN }
// ];

const ruleSet = [
  { roll: [1, 1], action: actions.OUT },
  { roll: [1, 2], action: actions.OUT },
  { roll: [1, 3], action: actions.OUT },
  { roll: [1, 4], action: actions.OUT },
  { roll: [1, 5], action: actions.OUT },
  { roll: [1, 6], action: actions.OUT },
  { roll: [2, 2], action: actions.DOUBLE },
  { roll: [2, 3], action: actions.SINGLE },
  { roll: [2, 4], action: actions.SINGLE },
  { roll: [2, 5], action: actions.SINGLE },
  { roll: [2, 6], action: actions.SINGLE },
  { roll: [3, 3], action: actions.TRIPLE },
  { roll: [3, 4], action: actions.OUT },
  { roll: [3, 5], action: actions.OUT },
  { roll: [3, 6], action: actions.OUT },
  { roll: [4, 4], action: actions.OUT },
  { roll: [4, 5], action: actions.OUT },
  { roll: [4, 6], action: actions.OUT },
  { roll: [5, 5], action: actions.OUT },
  { roll: [5, 6], action: actions.OUT },
  { roll: [6, 6], action: actions.HOMERUN }
];

const homeIndex = 0;
const homeRoster = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const visitingIndex = 0;
const visitingRoster = ["Z", "Y", "X", "W", "V", "U", "T", "S", "R"];

const actionator = actionGenerator(2, ruleSet);

function log(message) {
  console.log(message);
}

const initialState = {
  homeIndex,
  homeRoster,
  visitingIndex,
  visitingRoster,
  currentInning: defaultInning(visitingRoster[visitingIndex]),
  innings: []
};

function boxScore(state) {
  console.log(
    state.innings
      .map((inning, i) => i + 1)
      .concat("R")
      .concat("H")
  );
  console.log(
    state.innings
      .map(inning => inning.top.runs)
      .concat(getVisitingTeamScore(state))
      .concat(visitingHits(state))
  );
  console.log(
    state.innings
      .map(inning => (inning.bottom ? inning.bottom.runs : "-"))
      .concat(getHomeTeamScore(state))
      .concat(homeHits(state))
  );
}

function visitingHits(state) {
  return state.innings.map(inning => inning.top.hits).reduce((x, y) => x + y, 0);
}

function homeHits(state) {
  return state.innings
    .filter(inning => inning.bottom)
    .map(inning => inning.bottom.hits)
    .reduce((x, y) => x + y, 0);
}

let state = initialState;
let newState = state;

const events = [];

let i = 0;
while (!isEndState(state) && i < 1000) {
  const rolls = generateRandomDiceRolls(2, 6);
  const action = actionator(rolls);
  newState = reducer(state, { type: action });

  if (action !== actions.BALL && action !== actions.STRIKE) {
    events.push({
      batter: state.currentInning.batter,
      action,
      beforeState: Object.assign({}, state),
      afterState: Object.assign({}, newState)
    });
  }

  i = i + 1;
  state = newState;
}
boxScore(newState);

visitingRoster.map(playerStats).forEach(printStats);

homeRoster.map(playerStats).forEach(printStats);

function printStats(playerStats) {
  let statLine = "";

  statLine += playerStats.player;
  statLine += " " + playerStats.numberOfHits + "/" + playerStats.numberOfAtBats;
  if (playerStats.numberOfSingles) statLine += " " + `${playerStats.numberOfSingles} 1B`;
  if (playerStats.numberOfDoubles) statLine += " " + `${playerStats.numberOfDoubles} 2B`;
  if (playerStats.numberOfTriples) statLine += " " + `${playerStats.numberOfTriples} 3B`;
  if (playerStats.numberOfHomeruns) statLine += " " + `${playerStats.numberOfHomeruns} HR`;
  if (playerStats.numberOfWalks) statLine += " " + `${playerStats.numberOfWalks} BB`;
  if (playerStats.numberOfRBIs) statLine += " " + `${playerStats.numberOfRBIs} RBI`;

  console.log(statLine);
}

function playerStats(player) {
  const singles = numberOfEvents(actions.SINGLE);
  const doubles = numberOfEvents(actions.DOUBLE);
  const triples = numberOfEvents(actions.TRIPLE);
  const homeruns = numberOfEvents(actions.HOMERUN);
  const walks = numberOfEvents(actions.WALK);

  const playerEvents = events.filter(event => event.batter === player);
  const playerActions = playerEvents.map(event => event.action);

  const numberOfAtBats = atBats(playerActions);
  const numberOfHits = hits(playerActions);
  const numberOfSingles = singles(playerActions);
  const numberOfDoubles = doubles(playerActions);
  const numberOfTriples = triples(playerActions);
  const numberOfHomeruns = homeruns(playerActions);
  const numberOfWalks = walks(playerActions);
  const numberOfRBIs = rbis(playerEvents);

  return {
    player,
    numberOfHits,
    numberOfAtBats,
    numberOfSingles,
    numberOfDoubles,
    numberOfTriples,
    numberOfHomeruns,
    numberOfWalks,
    numberOfRBIs
  };
}
function atBats(batterActions) {
  return batterActions.filter(action => action !== actions.WALK).reduce((x, y) => x + 1, 0);
}

function hits(batterActions) {
  const hitActions = batterActions.filter(action => action !== actions.WALK).filter(action => action !== actions.OUT);

  return hitActions.reduce((x, y) => x + 1, 0);
}

function numberOfEvents(action) {
  return function(playerActions) {
    return playerActions.filter(playerAction => action === playerAction).length;
  };
}

function rbis(events) {
  return events
    .filter(event => event.action !== actions.OUT)
    .map(event => event.afterState.currentInning.runs - event.beforeState.currentInning.runs)
    .reduce((x, y) => x + y, 0);
}

// game finished after 11 innings, visiting team won
// 11th inning doesn't show a run
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 'R', 'H' ]
// [ 0, 0, 0, 6, 0, 0, 1, 0, 0, 0, 0, 8, 12 ]
// [ 0, 0, 1, 0, 3, 0, 2, 0, 1, 0, 0, 7, 13 ]
