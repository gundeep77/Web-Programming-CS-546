const axios = require("axios");

const URL =
  "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json";

const getAllPeople = async () => {
  const { data } = await axios.get(URL);
  return data;
};

const errorCheckForSearchPeopleByName = (searchPersonName) => {
  if (!searchPersonName) throw {error: "You must provide a keyword to search!", statusCode: 400};
  if (!searchPersonName.trim().length) throw {error: "Your keyword cannot contain only whitespaces!", error: 400};
}

const searchPeopleByName = async (searchPersonName) => {
  errorCheckForSearchPeopleByName(searchPersonName);

  const { data } = await axios.get(URL);
  const resultArray = [];
  for (const person of data) {
    if (
      person.firstName
        .trim()
        .toLowerCase()
        .includes(searchPersonName.trim().toLowerCase()) ||
      person.lastName
        .trim()
        .toLowerCase()
        .includes(searchPersonName.trim().toLowerCase())
    ) {
      resultArray.push(person);
    }
  }
  if (!resultArray.length) throw {error: "Person doesn't exist in the dataset", code: 404};
  return resultArray.slice(0, 20);
};

const errorCheckForSearchPeopleById = (id) => {
  const onlyNumber = /^\d+$/;
  if (!onlyNumber.test(id)) throw {error: "The ID should be a number!", code: 400};
}
const searchPeopleByID = async (id) => {
  errorCheckForSearchPeopleById(id);

  const { data } = await axios.get(URL);
  for (const person of data) {
    if (parseInt(person.id) === parseInt(id)) {
      return person;
    }
  }
  throw {error: "Person not found!", code: 404};
};

module.exports = { getAllPeople, searchPeopleByName, searchPeopleByID };
