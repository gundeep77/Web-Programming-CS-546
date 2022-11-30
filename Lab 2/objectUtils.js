// function for checking invalid inputs
errorCheckForDeepEquality = (obj1, obj2) => {
  if (Array.isArray(obj1) || Array.isArray(obj2) || !obj1 || !obj2)
    throw "2 parameters must be passed both of which must be Object type!";
};

function deepEquality(obj1, obj2) {
  errorCheckForDeepEquality(obj1, obj2);
  if (arguments.length !== 2)
    throw "Required number of parameters for this function is 2!";

  for (const x in obj1) {
    if (x in obj2 && Object.keys(obj1).length === Object.keys(obj2).length) {
      // handling the case when in any key/value pair, the value is an array
      if (Array.isArray(obj1[x]) && Array.isArray(obj2[x])) {
        if (obj1[x].length === obj2[x].length) {
          for (let i = 0; i < obj1[x].length; i++) {
            if (typeof obj1[x][i] === 'object' && typeof obj2[x][i] === 'object' && !Array.isArray(obj1[x][i]) && !Array.isArray(obj2[x][i])) {
              if (!deepEquality(obj1[x][i], obj2[x][i])) return false;      
            }
            else if (obj1[x][i] !== obj2[x][i]) return false;
          }
        } else return false;
        // using recursion for the case when the value in the key/value pair is an object
      } else if (typeof obj1[x] === "object" && typeof obj2[x] === "object") {
        if (!deepEquality(obj1[x], obj2[x])) return false;
      } else if (
        (typeof obj1[x] !== "object" &&
          typeof obj2[x] !== "object" &&
          obj1[x] !== obj2[x]) ||
        (typeof obj1[x] === "object" && typeof obj2[x] !== "object") ||
        (typeof obj1[x] !== "object" && typeof obj2[x] === "object")
      )
        return false;
    } else return false;
  }
  return true;
}

// function for checking invalid inputs
errorCheckForCommonKeyValues = (obj1, obj2) => {
  if (Array.isArray(obj1) || Array.isArray(obj2) || !obj1 || !obj2)
    throw "2 parameters must be passed both of which must be Object type!";
};
function commonKeysValues(obj1, obj2) {
  errorCheckForCommonKeyValues(obj1, obj2);
  if (arguments.length !== 2)
    throw "Required number of parameters for this function is 2!";

  let resultCommonKeysValues = {};
  let flag = true;
  for (const x in obj1) {
    if (x in obj2) {
      if (obj1[x] === obj2[x]) resultCommonKeysValues[x] = obj1[x];
      // handling the case when in any key/value pair, the value is an array
      else if (Array.isArray(obj1[x]) && Array.isArray(obj2[x])) {
        if (obj1[x].length === obj2[x].length) {
          for (let i = 0; i < obj1[x]; i++) {
            if (obj1[x][i] !== obj2[x][i]) {
              flag = false;
              break;
            }
          }
          if (flag) {
            resultCommonKeysValues[x] = obj1[x];
          }
        }
      }
      // using the deepEquality() function to check deep equality of objects directly (DRY principle)
      else if (typeof obj1[x] === "object" && typeof obj2[x] === "object") {
        if (deepEquality(obj1[x], obj2[x])) {
          resultCommonKeysValues[x] = obj1[x];
          for (const i in obj1[x]) {
            resultCommonKeysValues[i] = obj1[x][i];
          }
        } else {
          // creating a recrusive function to check for nested objects, and if they exist, breaking them into one object to find the common key/value pairs
          let keyValues1 = {};
          let recursiveCheckForNestedObjects1 = (obj) => {
            for (const p in obj) {
              if (typeof obj[p] === "object" && !Array.isArray(obj[p])) {
                recursiveCheckForNestedObjects1(obj[p]);
              } else {
                keyValues1[p] = obj[p];
              }
            }
            return keyValues1;
          };
          let temp1 = recursiveCheckForNestedObjects1(obj1);

          let keyValues2 = {};
          let recursiveCheckForNestedObjects2 = (obj) => {
            for (const p in obj) {
              if (typeof obj[p] === "object" && !Array.isArray(obj[p])) {
                recursiveCheckForNestedObjects2(obj[p]);
              } else {
                keyValues2[p] = obj[p];
              }
            }
            return keyValues2;
          };
          let temp2 = recursiveCheckForNestedObjects2(obj2);

          for (const p in temp1) {
            if (p in temp2) {
              resultCommonKeysValues[p] = temp1[p];
            }
          }
        }
      }
    }
  }
  return resultCommonKeysValues;
}

// function for checking invalid inputs
let errorCheckForCalculateObject = (object, func) => {
  if (!object || typeof object !== "object" || Array.isArray(object))
    throw "1st argument should be an object!";
  if (!func || typeof func !== "function")
    throw "2nd argument should be a function!";
  for (const x of Object.values(object)) {
    if (typeof x !== "number")
      throw "The values in the input object must all be numbers!";
  }
};

function calculateObject(object, func) {
  errorCheckForCalculateObject(object, func);
  if (arguments.length !== 2)
    throw "Required number of parameters for this function is 2!";

  const keys = Object.keys(object);
  const values = Object.values(object);

  const funcAppliedValues = values.map(func);
  const resultObject = {};
  for (let i = 0; i < keys.length; i++) {
    resultObject[keys[i]] = (funcAppliedValues[i] ** 0.5).toFixed(2);
  }
  return resultObject;
}

module.exports = {
  deepEquality,
  commonKeysValues,
  calculateObject,
};
