// const movies = require("./data/movies");
// const reviews = require("./data/reviews");
// const mongoConnection = require("./config/mongoConnection");

const express = require('express');
const app = express();
const configRoutes = require('./routes');

app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});


const main = async () => {
  await mongoConnection.dbConnection();
    try {
      console.log(
        await movies.createMovie(
          "Avengers",
          "Earth's mightiest heroes.",
          ["Action", "Science fiction"],
          "NC-17",
          "Paramount Pictures",
          "Christopher Nolan",
          ["Robert Downie", "Chris Hemsworth", "Chris Evans"],
          "09/17/2014",
          "2h 30min"
        )
      );
    } catch (e) {
      console.log(e);
    }

  try {
    console.log(
      await movies.createMovie(
        "The Dark Knight",
        "Bruce Wayne returns after 7 years to save Gotham.",
        ["Action", "Space adventure", "Science fiction"],
        "NC-17",
        "Paramount Pictures",
        "Christopher Nolan",
        ["Christian Bale", "Natalie Portman"],
        "09/17/2014",
        "2h 30min"
      )
    );
  } catch (e) {
    console.log(e);
  }

  try {
    console.log(
      await movies.updateMovie(
        "6364c5d264f8674a5af74861",
        "The Dark Knight",
        "Bruce Wayne is back to work.",
        ["Action", "Space adventure", "Science fiction", "Thriller"],
        "NC-18",
        "Warner Bros",
        "Christopher James Nolan",
        ["Christian Bale", "Maggie Gyllenhaal"],
        "09/17/2015",
        "2h 31min"
      )
    );
  } catch (e) {
    console.log(e);
  }

  try {
    console.log(await reviews.createReview("6366b2958176b1314522031c", "first review", "kajol", "bad movie!", 3));
  }
  catch (e) {
    console.log(e);
  }

   mongoConnection.closeConnection();
};

main();
