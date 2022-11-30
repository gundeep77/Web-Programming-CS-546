const axios = require("axios");
const people = require("./people");

const getCompanyData = async () => {
  const companyData = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json"
  );
  return companyData.data;
};

const errorCheckForListEmployees = (companyName) => {
  if (!companyName || typeof companyName !== "string" || !companyName.length)
    throw "Your input must be a NON-EMPTY STRING!";
  if (!companyName.trim().length) throw "Only whitespaces are not allowed!";
};
async function listEmployees(companyName) {
  errorCheckForListEmployees(companyName);

  const employees = [];
  const companyData = await getCompanyData();
  const { data } = await people.getPeopleData();

  for (const x of companyData) {
    if (x.name.toLowerCase() === companyName.toLowerCase()) {
      for (const y of data) {
        if (y.company_id === x.id) {
          employees.push(y.first_name + " " + y.last_name);
        }
      }
      employees.sort((a, b) => {
        if (a.split(" ")[1] <= b.split(" ")[1]) return -1;
        else return 1;
      });
      x.employees = employees;
      return x;
    }
  }
  throw "This company doesn't exist in our database!";
}

async function printListEmployees(companyName) {
  try {
    if (arguments.length !== 1)
      throw "Number of arguments for this function has to be 1!";
    console.log(await listEmployees(companyName));
  } catch (e) {
    console.log(e);
  }
}

const errorCheckForSameIndustry = (industry) => {
  if (!industry || typeof industry !== "string" || !industry.length)
    throw "Your input must be a NON-EMPTY STRING!";
  if (!industry.trim().length) throw "Only whitespaces are not allowed!";
};
const sameIndustry = async (industry) => {
  errorCheckForSameIndustry(industry);

  const companyData = await getCompanyData();
  const resultArr = [];
  for (const x of companyData) {
    if (x.industry.toLowerCase() === industry.toLowerCase()) {
      resultArr.push(x);
    }
  }
  if (!resultArr.length) throw "This industry doesn't exist in our database!";
  return resultArr;
};
async function printSameIndustry(industry) {
  try {
    if (arguments.length !== 1)
      throw "Number of arguments for this function has to be 1!";
    console.log(await sameIndustry(industry));
  } catch (e) {
    console.log(e);
  }
}

const errorCheckForGetCompanyId = (id) => {
  if (!id || typeof id !== "string" || !id.length)
    throw "Your input must be a NON-EMPTY STRING!";
  if (!id.trim().length) throw "Only whitespaces are not allowed!";
};
const getCompanyById = async (id) => {
    errorCheckForGetCompanyId(id);

    const companyData = await getCompanyData();
    for (const x of companyData) {
        if (x.id === id) {
            return x;
        }
    }
    throw "Invalid ID! No company exists with this ID!";
};
async function printGetCompanyById(id) {
  try {
    if (arguments.length !== 1)
      throw "Number of arguments for this function has to be 1!";
    console.log(await getCompanyById(id));
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  printListEmployees,
  printSameIndustry,
  printGetCompanyById,
};
