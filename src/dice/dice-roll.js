Array.prototype.flatMap = function(lambda) {
  return Array.prototype.concat.apply([], this.map(lambda));
};

function range(start, end) {
  const list = [];
  for (var i = start; i <= end; i = i + 1) {
    list.push(i);
  }
  return list;
}

function generateRandomDiceRolls(numberOfDice, numberOfSides) {
  const rolls = [];
  for (let roll = 0; roll < numberOfDice; roll = roll + 1) {
    rolls.push(Math.floor(Math.random() * numberOfSides) + 1);
  }
  return rolls;
}

function generateDiceRolls(numberOfDice, numberOfSides) {
  function recursiveCall(dieNumber, numberOfDice, numberOfSides, lists) {
    if (dieNumber === 1) {
      const list = range(1, numberOfSides).map(x => [x]);
      if (numberOfDice == 1) {
        return list;
      }

      return recursiveCall(dieNumber + 1, numberOfDice, numberOfSides, list);
    }

    if (dieNumber > numberOfDice) return lists;

    const newLists = lists.flatMap(list => {
      const lastNumber = list[list.length - 1];
      return range(lastNumber, numberOfSides).map(x => list.concat(x));
    });

    return recursiveCall(dieNumber + 1, numberOfDice, numberOfSides, newLists);
  }

  return recursiveCall(1, numberOfDice, numberOfSides);
}

function generateAllDiceRolls(numberOfDice, numberOfSides) {
  function recursiveCall(dieNumber, numberOfDice, numberOfSides, lists) {
    if (dieNumber === 1) {
      const list = range(1, numberOfSides).map(x => [x]);
      if (numberOfDice == 1) {
        return list;
      }

      return recursiveCall(dieNumber + 1, numberOfDice, numberOfSides, list);
    }

    if (dieNumber > numberOfDice) return lists;

    const newLists = lists.flatMap(list => {
      return range(1, numberOfSides).map(x => list.concat(x));
    });

    return recursiveCall(dieNumber + 1, numberOfDice, numberOfSides, newLists);
  }

  return recursiveCall(1, numberOfDice, numberOfSides);
}

function generateAllSums(numberOfDice, numberOfSides) {
  return generateAllDiceRolls(numberOfDice, numberOfSides).map(x => x.reduce((y, z) => y + z, 0));
}

// export {
//     generateDiceRolls,
//     generateAllDiceRolls,
//     generateAllSums
// }

module.exports = {
  generateRandomDiceRolls,
  generateAllDiceRolls,
  generateDiceRolls,
  generateAllSums
};
