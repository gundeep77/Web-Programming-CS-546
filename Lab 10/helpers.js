// validation functions
const isAlphanumeric = (string) => {
    return !/^[a-zA-Z0-9 ]+$/i.test(string) ? false : true;
};

const isProperPassword = (string) => {
    return !/(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*/g.test(string) ? false : true;
};

// error handling functions
const errorCheckForCreateUser = (username, password) => {
    username = username.toLowerCase().trim();
    password = password.trim();

    if (!username || !password) throw {message:"Both username and password must be provided!"};
    if (!username.length || !username.length) throw {message:"Both username and password must be non-empty and only whitespaces are not allowed!"};
    if (username.split(" ").length != 1 || password.split(" ").length != 1) throw {message:"Both username and password must contain only a single word, no spaces within!"};
    if (!isAlphanumeric(username)) throw {message:"Username must be alphanumeric!"};
    if (username.length < 4) throw {message:"Username must be at least 4 characters long!"};
    if (password.length < 6) throw {message:"Password must be at least 6 characters long!"};
    if (!isProperPassword(password)) throw {message: "Password must contain at least one uppercase character, one number, and one special character"};

};

const errorCheckForCheckUser = (username, password) => {
    username = username.toLowerCase().trim();
    password = password.trim();

    if (!username || !password) throw {message:"Both username and password must be provided!"};
    if (!username.length || !username.length) throw {message:"Both username and password must be non-empty and only whitespaces are not allowed!"};
    if (username.split(" ").length != 1 || password.split(" ").length != 1) throw {message:"Both username and password must contain only a single word, no spaces within!"};
    if (!isAlphanumeric(username)) throw {message:"Username must be alphanumeric!"};
    if (username.length < 4) throw {message:"Username must be at least 4 characters long!"};
    if (password.length < 6) throw {message:"Password must be at least 6 characters long!"};
    if (!isProperPassword(password)) throw {message: "Password must contain at least one uppercase character, one number, and one special character"};

}

module.exports = {
    isAlphanumeric,
    errorCheckForCreateUser,
    errorCheckForCheckUser
}