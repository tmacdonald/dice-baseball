const numberOfDice = 2
const numberOfSides = 6

Array.prototype.flatMap = function(lambda) {
    return Array.prototype.concat.apply([], this.map(lambda))
}

function range(start, end) {
    const list = []
    for (var i = start; i <= end; i = i + 1) {
        list.push(i)
    }
    return list
}

function generateDiceRolls(dieNumber, numberOfDice, numberOfSides, lists) {
    if (dieNumber === 1) {
        const list = range(1, numberOfSides).map(x => [x])
        if (numberOfDice == 1) {
            return list
        } 

        return generateDiceRolls(dieNumber + 1, numberOfDice, numberOfSides, list)
    }

    if (dieNumber > numberOfDice) return lists

    const newLists = lists.flatMap(list => {
        const lastNumber = list[list.length - 1]
        return range(lastNumber, numberOfSides).map(x => list.concat(x))
    })

    return generateDiceRolls(dieNumber + 1, numberOfDice, numberOfSides, newLists)
}

console.log(generateDiceRolls(1, 1, 6, []))

console.log(generateDiceRolls(1, 6, 6, []))