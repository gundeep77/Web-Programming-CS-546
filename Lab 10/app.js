const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const configRoutes = require("./routes");
const { createUser } = require("./data/users");
const mongoConnection = require("./config/mongoConnection");
const exphbs = require("express-handlebars");
const session = require("express-session");

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  console.log(new Date().toUTCString());
  console.log(req.method);
  console.log(req.originalUrl);
  if (req.session.username) console.log("User is authenticated!");
  else console.log ("User is not authenticated!");
  next();
});

app.use ("/register", (req, res, next) => {
  if (req.session.username) {
    return res.redirect("/protected");
  } else {
    next();
  }
})

app.use("/protected", (req, res, next) => {
  if (!req.session.username) {
    req.statusCode = 403;
    return res.render("forbiddenAccess", {title: "Forbidden!"})
  } else {
    next();
  }
});

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
