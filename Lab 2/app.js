const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objectUtils = require("./objectUtils");

// arrayUtils.arrayStats test cases
try {
  console.log(
    arrayUtils.arrayStats([9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20])
  );
} catch (e) {
  console.log(e);
}
try {
  console.log(arrayUtils.arrayStats([2, 4, 7, "hey", 3]));
} catch (e) {
  console.log(e);
}
console.log("\n");

// arrayUtils.makeObject test cases
try {
  console.log(
    arrayUtils.makeObject(
      ["foo", "bar"],
      ["name", "Patrick Hill"],
      ["foo", "not bar"]
    )
  );
} catch (e) {
  console.log(e);
}
try {
  console.log(arrayUtils.makeObject(["guitar", 1, 3, "apple"], ["hey", 12]));
} catch (e) {
  console.log(e);
}
console.log("\n");

// arrayUtils.commonElements test cases
try {
  console.log(
    arrayUtils.commonElements(
      ["2D case", ["foo", "bar"], "bye bye"],
      [["foo", "bar"], true, "String", 10]
    )
  );
} catch (e) {
  console.log(e);
}
try {
  console.log(arrayUtils.commonElements([1, 2, "nope"]));
} catch (e) {
  console.log(e);
}
console.log("\n");

// stringUtils.palindromes test cases
try {
  console.log(
    stringUtils.palindromes(
      `The racecar went to a big track. 'Wow!' i, said. zzbbzz?`
    )
  );
} catch (e) {
  console.log(e);
}
try {
  console.log(stringUtils.palindromes(["hello there"]));
} catch (e) {
  console.log(e);
}
console.log("\n");

// stringUtils.replaceChar test cases
try {
  console.log(
    stringUtils.replaceChar("Hello, How are you? I hope you are well")
  );
} catch (e) {
  console.log(e);
}
try {
  console.log(stringUtils.replaceChar("  "));
} catch (e) {
  console.log(e);
}
console.log("\n");

// stringUtils.charSwap test cases
try {
  console.log(stringUtils.charSwap('hello', 'w '));
} catch (e) {
  console.log(e);
}
try {
  console.log(stringUtils.charSwap("John"));
} catch (e) {
  console.log(e);
}
console.log("\n");

// objectUtils.deepEquality test cases
try {
  console.log(
    objectUtils.deepEquality(
      {
        a: { sA: "Hello", sB: "There", sC: "Class", sD: {1:2, 2:4, 3:{ 2: 3 }} },
        b: [7, { 2: [2, 3] }],
        c: true,
        d: "Test",
      },
      {
        c: true,
        b: [7, { 2: [2, 3] }],
        d: "Test",
        a: { sB: "There", sC: "Class", sA: "Hello", sD: {1:2, 2:4, 3:{ 2: 3 }} },
      }
    )
  );
} catch (e) {
  console.log(e);
}
try {
  console.log(objectUtils.deepEquality([1, 2, 3], [1, 2, 3]));
} catch (e) {
  console.log(e);
}
console.log("\n");

// objectUtils.commonKeyValues test cases
try {
  console.log(
    objectUtils.commonKeysValues(
      { name: { first: "Patrick", last: "Hill" }, age: 46 },
      { school: "Stevens", name: { first: "Patrick", last: "Hill" } }
    )
  );
} catch (e) {
  console.log(e);
}
try {
  console.log(objectUtils.commonKeysValues([1, 2, 3], [1, 2, 3]));
} catch (e) {
  console.log(e);
}
console.log("\n");

// objectUtils.calculateObject test cases
try {
  console.log(objectUtils.calculateObject({ a: 3, b: 7, c: 5 }, (n) => n ** 3));
} catch (e) {
  console.log(w);
}
try {
  console.log(objectUtils.calculateObject([1, 2, 3], (n) => 10 * n));
} catch (e) {
  console.log(e);
}
