function serializeDiceRoll(diceRoll) {
  const serializedSortedDiceRolls = diceRoll.slice().sort().join(",")
  return `[${serializedSortedDiceRolls}]`
}

export default function actionGenerator(numberOfDice, ruleSet) {

  const rollActions = {}
  ruleSet.forEach(({ roll, action }) => {
    rollActions[serializeDiceRoll(roll)] = action
  })
  // TODO Validate that the ruleset matches the number of dice
  // There should be a valid action for each combination of rolls
  return (diceRoll) => {
    const key = serializeDiceRoll(diceRoll)
    const action = rollActions[key]
    return action
  }
}