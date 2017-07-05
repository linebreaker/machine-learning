require('console.table');

const LinearRegressionModel = require('./LinearRegressionModel');

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  var counter = array.length;

  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter--;
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function genArray(size, value) {
  var arr = [];
  for (var i = 0; i < size; i++) {
    if (value instanceof Function) {
      arr.push(value(arr, i));
    } else {
      arr.push(value);
    }
  }

  return arr;
}

/**
 * Generates samples representing an amount of food ordered (in oz.), with a last column being the total cost for such order.
 * Example:
 *
 * ```
 * // prices => Rice: 1 ($/oz), Beans: 2 ($/oz), Water: 3 ($/oz), Milk: 4 ($/oz)
 * // output:
 * [
 *    [4, 4, 0, 16, 76],
 *    [0, 0, 32, 0, 96],
 *    ...
 * ]
 * ```
 *
 * @param {Array<number>} prices
 * @param {number} rows
 * @returns {Array<Array<number>>}
 */
function genPriceData(prices, rows) {
  return genArray(rows, () => (
    genArray(prices.length + 1, (row, i) => {
      if (i < prices.length) {
        return Number(Math.random() * randInt(0, 10)).toFixed(4) * 1;
      } else {
        return Number(row.reduce((acc, amount, i) => acc + amount * prices[i], 0)).toFixed(2) * 1;
      }
    })
  ));
}

function splitTrainingTest(data, percentageInTraining, shuffleData) {
  shuffleData = shuffleData || false;

  if (shuffleData) {
    data = shuffle(data);
  }

  var totalTraining = Math.floor(data.length * percentageInTraining)
  var training = data.slice(0, totalTraining);
  var test = data.slice(totalTraining);

  return [
    // x_train
    training.map(row => row.slice(0, -1)),
    // x_test
    test.map(row => row.slice(0, -1)),
    // y_train
    training.map(row => row.slice(-1)),
    // y_test
    test.map(row => row.slice(-1)),
  ]
}


function main() {
  var data = genPriceData([1, 2, 3, 4], 10);
  [xTrain, xTest, yTrain, yTest] = splitTrainingTest(data, 0.7, true);

  // console.table('Data', data);
  // console.table('xTrain', xTrain);
  // console.table('yTrain', yTrain);
  // console.table('xTest', xTest);
  // console.table('yTest', yTest);
}

main();
