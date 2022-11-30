const movies = require("./data/movies");
const mongoConnection = require("./config/mongoConnection");

async function main() {
  await mongoConnection.dbConnection();

  try {
    console.log(
      await movies.createMovie("Hackers",
      "Hackers are blamed for making a virus that will capsize five oil tankers.",
      ["Crime","Drama","Romance"],
      "PG-13", 
      "United Artists",
      "Iain Softley", 
      ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
      "09/15/1995",
      "1h 45min")
    );
  } catch (e) {
    console.log(e);
  }

//   try {
//     console.log(
//       await movies.createMovie(
//         "The Dark Knight",
//         "Bruce Wayne returns after 7 years to save Gotham.",
//         ["Action", "Space adventure", "Science fiction"],
//         "NC-17",
//         "Paramount Pictures",
//         "Christopher Nolan",
//         ["Christian Bale", "Natalie Portman"],
//         "09/17/2014",
//         "2h 30min"
//       )
//     );
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     console.log(await movies.getAllMovies());
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     console.log(
//       await movies.createMovie(
//         "Avengers",
//         "Earth's mightiest heroes.",
//         ["Action", "Science fiction"],
//         "NC-17",
//         "Paramount Pictures",
//         "Christopher Nolan",
//         ["Robert Downie Jr", "Chris Hemsworth", "Chris Evans"],
//         "09/17/2014",
//         "2h 30min"
//       )
//     );
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     console.log(
//       await movies.renameMovie("63462a616e353ed0c53a02ac", "Interstellar 2")
//     );
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     console.log(await movies.removeMovie("63462a616e353ed0c53a02ad"));
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     console.log(await movies.getAllMovies());
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     console.log(
//       await movies.createMovie(
//         "Avengers",
//         "Earth's mightiest heroes.",
//         ["Space adventure", "Science fiction"],
//         "NC-17",
//         "Paramount Pictures",
//         "Christopher Nolan",
//         ["Robert Downie Jr", "Chris Hemsworth", "Chris Evans"],
//         "09/17/1800",
//         "2h 30min"
//       )
//     );
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     console.log(await movies.removeMovie("63462216aa282e7d47be51de"));
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     console.log(
//       await movies.renameMovie("63462216aa282e7d47be50dc", "New Interstellar")
//     );
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     console.log(await movies.renameMovie("63462216aa282e7d47be51dc", ""));
//   } catch (e) {
//     console.log(e);
//   }

//   try {
//     console.log(await movies.getMovieById("635d8f0e6ab74b5575c43cd6"));
//   } catch (e) {
//     console.log(e);
//   }

// try {
//       console.log(await movies.renameMovie("635d91e40a098bebfd429730", "Avengers Age of Ultron"));
//     } catch (e) {
//       console.log(e);
//     }

  mongoConnection.closeConnection();
}

main();
