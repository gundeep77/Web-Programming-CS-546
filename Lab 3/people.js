const axios = require("axios");

const getPeopleData = async () => {
  const peopleData = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
  );
  return peopleData;
};

const errorCheckForGetPersonById = (id) => {
  if (typeof id !== "string" || !id.length || !id)
    throw "Your input must be a NON-EMPTY STRING!";
  if (!id.trim().length) throw "Only whitespaces are not allowed!";
};
const getPersonById = async (id) => {
  errorCheckForGetPersonById(id);

  const { data } = await getPeopleData();
  for (const x of data) {
    if (x.id === id) {
      return x;
    }
  }
  throw "Person not found!";
};
async function printGetPersonById(id) {
  try {
    if (arguments.length !== 1)
      throw "Number of arguments for this function has to be 1!";
    console.log(await getPersonById(id));
  } catch (e) {
    console.log(e);
  }
}

const errorCheckForSameJobTitle = (jobTitle) => {
  if (!jobTitle || typeof jobTitle !== "string" || !jobTitle.length)
    throw "Your input must be a NON-EMPTY STRING!";
  if (!jobTitle.trim().length) throw "Only whitespaces are not allowed!";
};
const sameJobTitle = async (jobTitle) => {
  errorCheckForSameJobTitle(jobTitle);

  const { data } = await getPeopleData();
  const resultArr = [];
  for (const x of data) {
    if (x.job_title.toLowerCase() === jobTitle.toLowerCase()) {
      resultArr.push(x);
    }
  }
  if (resultArr.length >= 2) return resultArr;
  else
    throw `People with job title ${jobTitle} are not 2 in number. Should be at least 2!`;
};

async function printSameJobTitle(jobTitle) {
  try {
    if (arguments.length !== 1)
      throw "Number of arguments for this function has to be 1!";
    console.log(await sameJobTitle(jobTitle));
  } catch (e) {
    console.log(e);
  }
}

const erroCheckForGetPostalCodes = (city, state) => {
  if (
    !city ||
    !state ||
    typeof city !== "string" ||
    typeof state !== "string" ||
    !city.length ||
    !state.length
  )
    throw "Both city and state must NON-EMPTY STRINGS!";
  if (!city.trim().length || !state.trim().length)
    throw "Neither of the 2 strings can contain only whitespaces!";
};
const getPostalCodes = async (city, state) => {
  erroCheckForGetPostalCodes(city, state);

  const { data } = await getPeopleData();
  const resultArr = [];
  for (const x of data) {
    if (
      x.city.toLowerCase() === city.toLowerCase() &&
      x.state.toLowerCase() === state.toLowerCase()
    ) {
      resultArr.push(parseInt(x.postal_code));
    }
  }
  if (resultArr.length) return resultArr.sort((a, b) => a - b);
  else
    throw "There are no postal codes for the combination of given city and state!";
};
async function printGetPostalCodes(city, state) {
  try {
    if (arguments.length !== 2)
      throw "Number of arguments for this function has to be 2!";
    console.log(await getPostalCodes(city, state));
  } catch (e) {
    console.log(e);
  }
}

const errorCheckForSameCityAndState = (city, state) => {
  if (
    !city ||
    !state ||
    typeof city !== "string" ||
    typeof state !== "string" ||
    !city.length ||
    !state.length
  )
    throw "Both city and state must NON-EMPTY STRINGS!";
  if (!city.trim().length || !state.trim().length)
    throw "Neither of the 2 strings can contain only whitespaces!";
};
const sameCityAndState = async (city, state) => {
  errorCheckForSameCityAndState(city, state);

  const { data } = await getPeopleData();
  const resultArr = [];
  for (const x of data) {
    if (
      x.city.toLowerCase() === city.toLowerCase() &&
      x.state.toLowerCase() === state.toLowerCase()
    ) {
      resultArr.push(`${x.first_name} ${x.last_name}`);
    }
  }
  resultArr.sort((a, b) => {
    if (a.split(" ")[1] <= b.split(" ")[1]) return -1;
    else return 1;
  });
  if (resultArr.length >= 2) return resultArr;
  else
    throw `People living in ${city}, ${state} are not 2 in number. Should be at least 2!`;
};
async function printSameCityAndState(city, state) {
  try {
    if (arguments.length !== 2)
      throw "Number of arguments for this function has to be 2!";
    console.log(await sameCityAndState(city, state));
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getPeopleData,
  printGetPersonById,
  printSameJobTitle,
  printGetPostalCodes,
  printSameCityAndState,
};
