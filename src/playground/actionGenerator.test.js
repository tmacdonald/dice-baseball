import actionGenerator, { arrayEquals } from "./actionGenerator";

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
  { roll: [6, 6], action: "home run" }
];

xdescribe("arrayEquals", () => {
  it("should return true if arrays have the same primitive values", () => {
    expect(arrayEquals([1, 2, 3, 4], [1, 2, 3, 4])).toEqual(true);
  });
});

describe("actionGenerator", () => {
  it("should throw if the rule set is undefined", () => {
    expect(() => actionGenerator(2, undefined)).toThrow(
      "ruleSet must be defined and must be a list"
    );
  });

  it("should throw if the rule set is empty", () => {
    expect(() => actionGenerator(2, [])).toThrow(
      "ruleSet must be defined and must be a list"
    );
  });

  it("should throw if the rule set has a rule that doesn't have a roll", () => {
    const invalidRuleSet = ruleSet
      .slice(0, 4)
      .concat([{ action: ruleSet[4].action, roll: undefined }])
      .concat(ruleSet.slice(5));
    expect(() => actionGenerator(2, invalidRuleSet)).toThrow(
      "All rules must have a roll and an action"
    );
  });

  it("should throw if the rule set has a rule that doesn't have an action", () => {
    expect(() => actionGenerator(2, [{ roll: [1, 1] }])).toThrow(
      "All rules must have a roll and an action"
    );
  });

  it("should throw if some of the actions are missing", () => {});

  it("should return the appropriate action", () => {
    const rulesEngine = actionGenerator(2, ruleSet);

    const action = rulesEngine([2, 6]);

    expect(action).toEqual("foul out");
  });

  it("should return the appropriate action for an out of order roll", () => {
    const rulesEngine = actionGenerator(2, ruleSet);

    const action = rulesEngine([6, 2]);

    expect(action).toEqual("foul out");
  });
});
