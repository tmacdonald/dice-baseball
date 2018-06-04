import actionGenerator from "./actionGenerator"

const ruleSet = [
  { roll: [1, 1], action: "double" },
  { roll: [1, 2], action: "single" },
  { roll: [1, 3], action: "single" },
  { roll: [1, 4], action: "single" },
  { roll: [1, 5], action: "base on error " },
  { roll: [1, 6], action: "base on balls" },
  { roll: [2, 2], action: "strike" },
  { roll: [2, 3], action: "strike" },
  { roll: [2, 4], action: "strike" },
  { roll: [2, 5], action: "strike" },
  { roll: [2, 6], action: "foul out" },
  { roll: [3, 3], action: "out at 1st" },
  { roll: [3, 4], action: "out at 1st" },
  { roll: [3, 5], action: "out at 1st" },
  { roll: [3, 6], action: "out at 1st" },
  { roll: [4, 4], action: "fly out " },
  { roll: [4, 5], action: "fly out " },
  { roll: [4, 6], action: "fly out " },
  { roll: [5, 5], action: "double play " },
  { roll: [5, 6], action: "triple " },
  { roll: [6, 6], action: "home run" },
]

describe("actionGenerator", () => {
  it("should validate that the ruleset and number of dice match", () => {

  })

  it("should return the appropriate action", () => {
    const rulesEngine = actionGenerator(2, ruleSet)

    const action = rulesEngine([2, 6])

    expect(action).toEqual("foul out")
  })

  it("should return the appropriate action for an out of order roll", () => {
    const rulesEngine = actionGenerator(2, ruleSet)

    const action = rulesEngine([6, 2])

    expect(action).toEqual("foul out")
  })
})