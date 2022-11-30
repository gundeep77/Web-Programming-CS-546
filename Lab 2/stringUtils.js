// function for checking erroneous inputs
let errorCheckForPalindromes = (string) => {
  if (!string || typeof string !== "string") throw "Input should be a string!";
  if (!string.trim().length) throw "Length of the string shouldn't be 0!";
};

// function to reverse a string
let reverseString = (string) => {
  let reversedString = "";
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return reversedString;
};

function palindromes(string) {
  errorCheckForPalindromes(string);
  if (arguments.length !== 1)
    throw "Required number of parameters for this function is 1!";

  const palindromesArr = [];
  const punctuations = "!#$%&()*+,-./:;<=>?@[\\]^_`{|}~";
  const arrWithPunctuations = string.split("");
  const arrWithoutPunctuations = arrWithPunctuations.filter(
    (character) => punctuations.indexOf(character) === -1
  );
  const stringWithoutPunctuations = arrWithoutPunctuations.join("");

  arrForPlaindromes = stringWithoutPunctuations.split(" ");
  for (const x of arrForPlaindromes) {
    if (x.toLowerCase() === reverseString(x).toLowerCase()) {
      palindromesArr.push(x);
    }
  }
  return palindromesArr;
}

// function for checking erroneous inputs
let errorCheckForReplaceChar = (string) => {
  if (typeof string !== "string") throw "Input should be a string!";
  if (!string) throw "Length of the string shouldn't be 0!";
  if (!string.trim().length) throw "String can't contain only whitespaces!";
};

function replaceChar(string) {
  errorCheckForReplaceChar(string);
  if (arguments.length !== 1)
    throw "Required number of parameters for this function is 1!";
  let stringToArray = string.split('');
  let flag = true;
  for (let i = 0; i < stringToArray.length; i++) {
    if (i % 2 !== 0) {
      if (flag) {
        stringToArray[i] = '*';
      } else {
        stringToArray[i] = '$';
      }
      flag = !flag;
    }
  }
  return stringToArray.join("");
}

// function for checking erroneous inputs
let errorCheckForCharSwap = (string1, string2) => {
  if (
    !string1 ||
    !string2 ||
    typeof string1 !== "string" ||
    typeof string2 !== "string"
  )
    throw "Both the inputs should be only string!";
  if (string1.length < 4 || string2.length < 4)
    throw "Length of both the strings should at least be 4!";
};

function charSwap(string1, string2) {
  errorCheckForCharSwap(string1, string2);
  if (arguments.length !== 2)
    throw "Required number of parameters for this function is 2!";

  let tempString1 = "";
  for (let i = 0; i < 4; i++) {
    tempString1 += string1[i];
    string1 = string1.replace(string1[i], string2[i]);
  }
  for (let i = 0; i < 4; i++) {
    string2 = string2.replace(string2[i], tempString1[i]);
  }
  return string1 + " " + string2;
}

module.exports = {
  palindromes,
  replaceChar,
  charSwap,
};
