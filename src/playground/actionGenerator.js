import { generateDiceRolls } from "../dice/dice-roll";

function serializeDiceRoll(diceRoll) {
  const serializedSortedDiceRolls = diceRoll
    .slice()
    .sort()
    .join(",");
  return `[${serializedSortedDiceRolls}]`;
}

export function arrayEquals(a, b, matcher = (x, y) => x === y) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (!a.length || !b.length) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i = i + 1) {
    if (!matcher(a[i], b[i])) {
      return false;
    }
  }

  return true;
}

export default function actionGenerator(numberOfDice, ruleSet) {
  if (!ruleSet || ruleSet.length === 0) {
    throw new Error("ruleSet must be defined and must be a list");
  }

  if (ruleSet.some(rule => !rule.roll || !rule.action)) {
    console.log(ruleSet);
    throw new Error("All rules must have a roll and an action");
  }

  const expectedRuleSetRolls = generateDiceRolls(numberOfDice, 6);

  if (!arrayEquals(ruleSet.map(rule => rule.roll), expectedRuleSetRolls, (x, y) => arrayEquals(x, y))) {
    throw new Error("Must contain all possible combinations of rolls");
  }

  const rollActions = {};
  ruleSet.forEach(({ roll, action }) => {
    rollActions[serializeDiceRoll(roll)] = action;
  });

  return diceRoll => {
    const key = serializeDiceRoll(diceRoll);
    const action = rollActions[key];
    return action;
  };
}
