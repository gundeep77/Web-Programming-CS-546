//require express, express router and bcrypt as shown in lecture code
const express = require("express");
const { createUser, checkUser } = require("../data/users");
const router = express.Router();
const {
  errorCheckForCreateUser,
  errorCheckForCheckUser,
} = require("../helpers");

router.route("/").get(async (req, res) => {
  if (req.session.username) res.redirect("/protected");
  else res.render("userLogin", { title: "Login", heading: "Login Form" });
});

router
  .route("/register")
  .get(async (req, res) => {
    res.render("userRegister", {
      title: "Registration",
      heading: "Registration Form",
    });
  })
  .post(async (req, res) => {
    const { usernameInput, passwordInput } = req.body;

    try {
      errorCheckForCreateUser(usernameInput, passwordInput);
    } catch (e) {
      res.statusCode = 400;
      res.render("userRegister", {
        heading: "Registration Form",
        error: "Note: " + e.message,
        title: "Registration",
        hasError: true,
      });
    }
    try {
      const isValidUser = await createUser(usernameInput, passwordInput);
      if (isValidUser.insertedUser === true) res.redirect("/");
    } catch (e) {
      if (e.code === 500) {
        res.statusCode = 500;
        res.send(`<h1>${e.message}<h1/>`);
      }
      if (e.code === 400) {
        res.statusCode = 400;
        res.render("userRegister", {
          heading: "Registration Form",
          error: "Note: " + e.message,
          title: "Registration",
          hasError: true,
        });
      }
    }
  });

router.route("/login").post(async (req, res) => {
  const { usernameInput, passwordInput } = req.body;
  try {
    errorCheckForCheckUser(usernameInput, passwordInput);
  } catch (e) {
    res.statusCode = 400;
    res.render("userLogin", {
      error: "Note: " + e.message,
      title: "Login",
      heading: "Login Form",
      hasError: true,
    });
  }

  try {
    const userAuthenticated = await checkUser(usernameInput, passwordInput);
    if (userAuthenticated.authenticatedUser === true) {
      req.session.username = usernameInput.trim().toLowerCase();
      res.redirect("/protected");
    }
  } catch (e) {
    res.statusCode = 400;
    res.render("userLogin", {
      title: "Login",
      heading: "Login Form",
      error: "Note: " + e.message,
      hasError: true,
    });
  }
});

router.route("/protected").get(async (req, res) => {
  res.render("private", {
    heading: "You are logged in!",
    title: "Welcome!",
    username: req.session.username,
    dateTime: new Date(),
  });
});

router.route("/logout").get(async (req, res) => {
  if (req.session.username) {
    req.session.destroy();
    res.render("logout", {
      title: "Goodbye!",
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
