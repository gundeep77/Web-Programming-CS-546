// Please uncomment the code lines containing the function calls one by one to check for test cases for different functions. The try/catch statements are included in the respective print functions corresponding to the original functions that were given to implement, and are defined in people.js and companies.js files.

const getPeople = require("./people");
const getCompanies = require("./companies");

async function testCasesForGetPersonById() {
  await getPeople.printGetPersonById("938beac7-18d7-4ce6-b6cb-4e97c8b34cb2");
  await getPeople.printGetPersonById("");
  await getPeople.printGetPersonById("GFHasdf");
  await getPeople.printGetPersonById();
  await getPeople.printGetPersonById("   ");
  await getPeople.printGetPersonById("as", "sa");
}
// testCasesForGetPersonById();

async function testCasesForSameJobTitle() {
    await getPeople.printSameJobTitle("Help Desk Operator");
    await getPeople.printSameJobTitle();
    await getPeople.printSameJobTitle("");
    await getPeople.printSameJobTitle("Machine Learning Engineer");
    await getPeople.printSameJobTitle("  ");
    await getPeople.printSameJobTitle("asdf", "asdf");

}
// testCasesForSameJobTitle();

async function testCasesForGetPostalCodes () {
    await getPeople.printGetPostalCodes("Salt lake city", "utah");
    await getPeople.printGetPostalCodes("");
    await getPeople.printGetPostalCodes(2,3);
    await getPeople.printGetPostalCodes("   ", "  ");
    await getPeople.printGetPostalCodes();
    await getPeople.printGetPostalCodes("Bayside", "New York");
    await getPeople.printGetPostalCodes("ASDAS");
}
// testCasesForGetPostalCodes();

async function testCasesForSameCityAndState () {
    await getPeople.printSameCityAndState("Salt lake city", "utah");
    await getPeople.printSameCityAndState("  ", "  ");
    await getPeople.printSameCityAndState(1, 3);
    await getPeople.printSameCityAndState();
    await getPeople.printSameCityAndState("Bayside", "New York");
}
// testCasesForSameCityAndState();

async function testCasesForListEmployees() {
    await getCompanies.printListEmployees("Runte Inc");
    await getCompanies.printListEmployees("");
    await getCompanies.printListEmployees("  ");
    await getCompanies.printListEmployees();
    await getCompanies.printListEmployees("ABCD");
    await getCompanies.printListEmployees(123);
}
// testCasesForListEmployees();

async function testCasesForSameIndustry() {
    await getCompanies.printSameIndustry("Auto Parts:O.E.M.");
    await getCompanies.printSameIndustry("");
    await getCompanies.printSameIndustry("   ");
    await getCompanies.printSameIndustry("FGHD");
    await getCompanies.printSameIndustry();
    await getCompanies.printSameIndustry(324);
}
// testCasesForSameIndustry();

async function testCasesForGetCompanyById() {
    await getCompanies.printGetCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf");
    await getCompanies.printGetCompanyById("");
    await getCompanies.printGetCompanyById("ABC");
    await getCompanies.printGetCompanyById();
    await getCompanies.printGetCompanyById(4123);
}
// testCasesForGetCompanyById();