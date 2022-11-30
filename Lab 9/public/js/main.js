let myForm = document.getElementById("myForm");
let inputArrays = document.getElementById("inputArrays");
let formLabel = document.getElementById("formLabel");
let results = document.getElementById("results");
let error = document.getElementById("error");
let resultLabel = document.getElementById("resultLabel");

if (myForm) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (inputArrays.value.trim()) {
      let allArraysString = inputArrays.value.trim();
      let len = allArraysString.length;
      for (let i = 0; i < len; i++) {
        if (allArraysString[i] === " ") {
          allArraysString = allArraysString.replace(allArraysString[i], "");
        }
      }
      len = allArraysString.length;
      if (allArraysString[len - 1] === ",") {
        allArraysString = allArraysString.slice(0, -1);
      }
      allArraysString = "[" + allArraysString;
      allArraysString = allArraysString + "]";

      for (const x of allArraysString) {
        if (x === ".") {
          error.hidden = false;
          error.innerHTML = "All entries in the arrays must be whole numbers!";
          inputArrays.focus();
          return;
        }
      }

      let allArrays;
      try {
        allArrays = JSON.parse(allArraysString);
        error.hidden = true;
      } catch (e) {
        error.hidden = false;
        error.innerHTML = "Incorrect Format!";
        inputArrays.focus();
      }
      let resultArray = [];
      for (const x of allArrays) {
        if (!x.length) {
          error.hidden = false;
          error.innerHTML = "All input arrays must have at least 1 entry!";
          return;
        }
      }
      if (allArrays.length === 1) resultArray = allArrays[0];
      else {
        for (let i = 0; i < allArrays.length; i++) {
          resultArray = resultArray.concat(allArrays[i]);
        }
      }
      resultArray.sort((a, b) => a - b);
      let li = document.createElement("li");
      let liCount = results.childNodes.length;
      if (liCount % 2 === 0) {
        li.className = "is-green";
      } else {
        li.className = "is-red";
      }
      resultLabel.hidden = false;
      error.hidden = true;
      li.innerHTML = "[" + resultArray + "]";
      results.appendChild(li);
      myForm.reset();
      inputArrays.focus();
    } else {
      error.hidden = false;
      error.innerHTML = "You must input at least 1 array!";
      myForm.reset();
      inputArrays.focus();
    }
  });
}
