const express = require("express");
const router = express.Router();
const data = require("../data");
const path = require("path");
const peopleData = data.people;

router.route("/").get(async (req, res) => {
  res.sendFile(path.resolve("static/homepage.html"));
});

router.route("/searchpeople").post(async (req, res) => {
  try {
    const peopleArray = await peopleData.searchPeopleByName(
      req.body.searchPersonName
    );
    res.render("peopleFound", {
      searchPersonName: req.body.searchPersonName,
      title: "People Found",
      peopleArray: peopleArray,
    });
  } catch (error) {
    if (error.code === 404) {
      res.statusCode = 404;
      res.render("personNotFound", {
        searchPersonName: req.body.searchPersonName,
        title: "Person Not Found"
      });
    }
    if (error.statusCode === 400) {
      res.statusCode = 400;
      res.render("error", { error: error.error, title: "Error" });
    }
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  try {
    const person = await peopleData.searchPeopleByID(req.params.id);
    res.render("personFoundById", { title: "Person Found", person: person });
  } catch (error) 
  {
    if (error.statusCode === 400) res.statusCode = 400;
    res.render("error", {error: error.error, title: "Error"});

    if (error.statusCode === 404) {
        res.statusCode = 404;
        res.render("personNotFound", {searchPersonName: req.params.id, title: "Person Not Found"});
    }
  }
});

module.exports = router;
