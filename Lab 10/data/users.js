// const helpers = require("../helpers");
const { users } = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const { errorCheckForCreateUser, errorCheckForCheckUser } = require("../helpers");
const saltRounds = 10;



const createUser = async (username, password) => {
  errorCheckForCreateUser(username, password);

  username = username.trim().toLowerCase();
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = {
    username: username,
    password: hashedPassword,
  };

  const usersCollection = await users();

  const userExists = await usersCollection.findOne({ username: username });
  if (userExists !== null)
    throw { message: "User already exists in the database!", code: 400};

  const insertInfo = await usersCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0)
    throw { message: "Internal Server Error", code: 500};
  return { insertedUser: true };
};

const checkUser = async (username, password) => {
  errorCheckForCheckUser(username, password);

  username = username.trim().toLowerCase();
  const usersCollection = await users();
  const userExists = await usersCollection.findOne({username: username});

  if (userExists === null)  throw {message: "Either the username or password is invalid"};
  else {
    const authenticated = await bcrypt.compare(password, userExists.password);
    if (authenticated) return {authenticatedUser: true};
    else throw {message: "Either the username or password is invalid"};
  }
};

module.exports = {
  createUser,
  checkUser,
};
