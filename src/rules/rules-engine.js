//import { generateDiceRolls } from './dice/dice-roll'
const generateDiceRolls = require('../dice/dice-roll').generateDiceRolls

Array.prototype.equals = function(array) {
    if (!array) {
        return false
    }

    if (this.length != array.length) {
        return false
    }

    for (let i = 0; i < this.length; i += 1) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i])) {
                return false;
            }
        } else if (this[i] != array[i]) {
            return false
        }
    }
    return true
}

function createRulesEngine(numberOfSides, numberOfDice, rules) {

    validateRules(rules)

    function validateRules(rules) {
        const possibleRolls = generateDiceRolls(numberOfSides, numberOfDice)
        const ruleRolls = extractRuleRolls(rules)

        console.log(possibleRolls)
        console.log(ruleRolls)

        if (!possibleRolls.equals(ruleRolls)) {
            throw 'The list of rules does not match the possible rolls for the combination of sides and dice'
        }
    }

    function extractRuleRolls(rules) {
        const ruleRolls = []
        for (let roll in rules) {
            if (rules.hasOwnProperty(roll)) {
                ruleRolls.push(roll.split(",").map(x => parseInt(x)))
            }
        }
        return ruleRolls
    }

    function getAction(roll) {
        const action = rules[roll]
        return action
    }

    return {
        getAction
    }
}

// const rulesEngine = createRulesEngine(2, 6, {
//     "1,1": "DOUBLE",
//     "1,2": "SINGLE",
//     "1,3": "SINGLE",
//     "1,4": "SINGLE",
//     "1,5": "WALK",
//     "1,6": "WALK",
//     "2,2": "STRIKE",
//     "2,3": "STRIKE",
//     "2,4": "STRIKE",
//     "2,5": "STRIKE",
//     "2,6": "OUT",
//     "3,3": "OUT",
//     "3,4": "OUT",
//     "3,5": "OUT",
//     "3,6": "OUT",
//     "4,4": "OUT",
//     "4,5": "OUT",
//     "4,6": "OUT",
//     "5,5": "OUT",
//     "5,6": "TRIPLE",
//     "6,6": "HOMERUN"
// })
