import { generateDiceRolls } from "./dice-roll"

describe("generateDiceRolls", () => {
  it("should generate for a single die", () => {
    const rolls = generateDiceRolls(1, 6)

    expect(rolls).toEqual([[1], [2], [3], [4], [5], [6]])
  })

  it("should generate for two dice", () => {
    const rolls = generateDiceRolls(2, 3)

    expect(rolls).toEqual([[1, 1], [1, 2], [1, 3], [2, 2], [2, 3], [3, 3]])
  })

  it("should generate for two dice", () => {
    const rolls = generateDiceRolls(2, 6)

    expect(rolls).toEqual([[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 3], [3, 4], [3, 5], [3, 6], [4, 4], [4, 5], [4, 6], [5, 5], [5, 6], [6, 6]])
  })
})