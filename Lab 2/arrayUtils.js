// function for checking invalid inputs
let errorCheckForArrayStats = (array) => {
  if (!array) throw "Array must exist!";
  if (!Array.isArray(array)) throw "Input parameter must be an array!";
  if (!array.length) throw "Array must not be empty!";
  for (const x of array) {
    if (typeof x !== "number") throw "Every array element must be a number!";
  }
};

function arrayStats(array) {
  errorCheckForArrayStats(array);

  if (arguments.length !== 1)
    throw "Required number of parameters for this function is 1!";
  array.sort((a, b) => a - b);
  const result = {};
  const numberOfElements = array.length;
  const minElement = Math.min(...array);
  const maxElement = Math.max(...array);
  const range = maxElement - minElement;
  let sum = 0;
  for (const x of array) {
    sum += x;
  }

  const mean = sum / numberOfElements;

  // median calculation
  let median;
  if (numberOfElements % 2 === 0) {
    median =
      (array[numberOfElements / 2] + array[numberOfElements / 2 - 1]) / 2;
  } else {
    median = array[(numberOfElements - 1) / 2];
  }

  // calculating the frequency of each element in the array and storing in an object
  countsObject = {};
  for (const x of array) {
    if (x in countsObject) countsObject[x] += 1;
    else countsObject[x] = 1;
  }

  // calculating the maximum frequency
  let max = 0;
  for (const x in countsObject) {
    if (countsObject[x] > max) max = parseFloat(countsObject[x]);
  }

  // calculation of mode(s)
  let mode = [];
  for (const x in countsObject) {
    if (countsObject[x] === max) {
      mode.push(parseFloat(x));
    }
  }

  // finally storing all the caluclated measures in an object
  result.mean = mean;
  result.median = median;

  // checking if there is a single mode or multiple modes
  if (max === 1) result.mode = 0;
  else if (mode.length > 1) result.mode = mode;
  else result.mode = mode[0];
  result.range = range;
  result.minimum = minElement;
  result.maximum = maxElement;
  result.count = numberOfElements;
  result.sum = sum;

  return result;
}

// function for checking invalid inputs
let errorCheckForMakeObject = (...arrays) => {
  for (const x of arrays) {
    if (!Array.isArray(x)) throw "Each input should be an array type!";
    if (x.length !== 2) throw "Every array should contain exactly 2 elements!";
  }
};

function makeObject(...arrays) {
  errorCheckForMakeObject(...arrays);

  // object for string the final result
  const resultObject = {};
  for (const x of arrays) {
    resultObject[x[0]] = x[1];
  }
  return resultObject;
}

// function for checking invalid inputs
let errorCheckForCommonElements = (...arrays) => {
  for (const x of arrays) {
    if (!Array.isArray(x)) throw "Each input should an array type!";
    if (!x.length) throw "Each input array should be non-empty!";
  }
  if (arrays.length < 2) throw "You should input at least 2 arrays!";
};

function commonElements(...arrays) {
  errorCheckForCommonElements(...arrays);

  const resultArray = [];
  for (let i = 0; i < arrays.length - 1; i++) {
    let arr1AsString = [];
    for (const x of arrays[i]) {
      if (Array.isArray(x)) {
        arr1AsString.push(JSON.stringify(x));
      } else if (arrays[i + 1].includes(x) && !resultArray.includes(x)) {
        resultArray.push(x);
      }
    }
    let arr2AsString = [];
    for (const x of arrays[i + 1]) {
      if (Array.isArray(x)) {
        arr2AsString.push(JSON.stringify(x));
      }
    }
    for (const x of arr1AsString) {
      if (arr2AsString.includes(x) && !resultArray.includes(JSON.parse(x))) {
        resultArray.push(JSON.parse(x));
      }
    }
  }
  return resultArray;
}

module.exports = {
  arrayStats,
  makeObject,
  commonElements,
};
