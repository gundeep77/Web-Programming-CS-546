function questionOne(arr) {
  let primeOrNot = [];
  let flag;
  arr.forEach((num) => {
    if (num === 0 || num === 1) {
      primeOrNot.push(false);
      return;
    }
    flag = true;
    for (i = 2; i <= num / 2; i++) {
      if (num % i === 0) {
        flag = false;
        break;
      }
    }
    primeOrNot.push(flag);
  });
  return primeOrNot;
}

function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  if (startingNumber === 0) return 0;
  if (commonRatio === 0) return 0;
  if (!Number.isInteger(numberOfTerms) || numberOfTerms <= 0) return NaN;

  let sum = 0;
  let nextTerm = startingNumber;
  while (numberOfTerms > 0) {
    sum += nextTerm;
    nextTerm *= commonRatio;
    numberOfTerms--;
  }
  return sum;
}

function questionThree(str) {
  str = str.toLowerCase();
  const vowels = "aeiou";
  let consonantCount = 0;

  for (let x of str) {
    if (x.match("[a-z]") && !vowels.includes(x)) {
      consonantCount++;
    }
  }
  return consonantCount;
}

function questionFour(fullString, substring) {
  return fullString.split(substring).length - 1;
}

module.exports = {
  firstName: "Gundeep Singh",
  lastName: "Saluja",
  studentId: "20005427",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};