const { ObjectId } = require("mongodb");
const {
  isValidDate,
  isAlphanumeric,
  isOnlyAlphabets,
  isValidRuntimeFormat,
} = require("../helpers");
const { movies } = require("../config/mongoCollections");

const errorAndValidationCheckForCreateMovie = (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  if (
    !title ||
    !plot ||
    !genres ||
    !rating ||
    !studio ||
    !director ||
    !castMembers ||
    !dateReleased ||
    !runtime
  )
    throw {error: "Every parameter is required to be input and has to be non-empty!", code: 400};

  if (
    typeof title !== "string" ||
    typeof plot !== "string" ||
    !Array.isArray(genres) ||
    typeof rating !== "string" ||
    typeof studio !== "string" ||
    typeof director !== "string" ||
    !Array.isArray(castMembers) ||
    typeof dateReleased !== "string" ||
    typeof runtime !== "string"
  )
    throw {error: "title, plot, rating, studio, director, dateReleased, and runtime should be string type and genres and castMembers should be arrays!", code: 400};
  if (title.length < 2) throw {error: "title must be at least 2 characters long!", code: 400};
  if (studio.length < 5) throw {error: "studio must be at least 5 characters long!", code: 400};
  if (
    !title.trim().length ||
    !plot.trim().length ||
    !rating.trim().length ||
    !studio.trim().length ||
    !director.trim().length ||
    !dateReleased.trim().length ||
    !runtime.trim().length
  )
    throw "title, plot, rating, studio, director, dateReleased, and runtime can't contain only whitespaces!";

  if (!isAlphanumeric(title)) throw {error: "title must be alphanumeric!", code: 400};
  if (!isOnlyAlphabets(studio)) throw {error: "studio must contain only alphabets!", code: 400};
  if (!isOnlyAlphabets(director)) throw {error:"director must contain only alphabets!", code: 400};
  if (
    director.split(" ").length !== 2 ||
    director.split(" ")[0].length < 3 ||
    director.split(" ")[1].length < 3
  )
    throw {error: "director's full name must contain only 2 words, first name and last name, and both must be at least 3 characters long!", code: 400};
  const possibleRatings = ["G", "PG", "PG-13", "R", "NC-17"];
  if (
    rating !== possibleRatings[0] &&
    rating !== possibleRatings[1] &&
    rating !== possibleRatings[2] &&
    rating !== possibleRatings[3] &&
    rating !== possibleRatings[4]
  )
    throw {error: "Rating can only be one of: G, PG, PG-13, R, or NC-17!", code: 400};

  if (!genres.length || !castMembers.length)
    throw {error: "genres and castMembers can't be empty arrays!", code: 400};
  for (const x of genres) {
    if (!x || !x.trim().length)
      throw {error: "A genre can neither be an empty element nor contain only whitespaces!", code: 400};
    if (!x.isOnlyAlphabets && x.length < 5)
      throw {error: "Each genre must be at least 5 characters long and should contain only alphabets!", code: 400};
  }

  for (const x of castMembers) {
    if (!x || !x.trim().length)
      throw {error: "A castMember can neither be an empty element nor contain only whitespaces!", code: 400};
    if (
      x.split(" ").length !== 2 ||
      x.split(" ")[0].length < 3 ||
      x.split(" ")[1].length < 3
    )
      throw {error: "Each castMember's full name must contain only 2 words, first name and last name, and both must be at least 3 characters long!", code: 400};
  }

  if (!isValidDate(dateReleased))
    throw {error: "Invalid date or format! Format must be mm/dd/yyyy, the year can't be before 1900 and can't go beyond 2024 (in our case)!", code: 400};
  if (!isValidRuntimeFormat(runtime))
    throw {error: "Invalid runtime format for the movie!", code: 400};
};

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  errorAndValidationCheckForCreateMovie(
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime
  );

  title = title.trim();
  plot = plot.trim();
  rating = rating.trim();
  studio = studio.trim();
  director = director.trim();
  dateReleased = dateReleased.trim();
  runtime = runtime.trim();
  let reviews = [];
  let overallRating = 0;

  let runtimeSplit = runtime.split(" ");
  if (runtimeSplit[0].length === 2) {
    if (runtimeSplit[0][0] === "0")
      throw {error: "Movie should be at least 1 hour long!", code: 404};
  }
  if (runtimeSplit[0].length === 3) {
    if (runtimeSplit[0][0] === "0" && runtimeSplit[0][1] === "0")
      throw {error: "Movie should be at least 1 hour long!", code: 404};
  }
  if (runtimeSplit[0].length === 3) {
    if (runtimeSplit[0][0] === "0")
      runtimeSplit[0] = runtimeSplit[0].replace(runtimeSplit[0][0], "");
  }

  if (runtimeSplit[1].length === 5) {
    if (runtimeSplit[1][0] === "0")
      runtimeSplit[1] = runtimeSplit[1].replace(runtimeSplit[1][0], "");
  }
  runtime = runtimeSplit.join(" ");

  for (let i = 0; i < genres.length; i++) {
    genres[i] = genres[i].trim();
  }

  for (let i = 0; i < castMembers.length; i++) {
    castMembers[i] = castMembers[i].trim();
  }

  const movieCollection = await movies();
  let newMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews: reviews,
    overallRating: overallRating
  };
  const insertInfo = await movieCollection.insertOne(newMovie);
  if (insertInfo.insertedCount === 0) throw {error: "Could not add a movie to the db!", code: 404};
  const newId = insertInfo.insertedId;
  const movieObject = await getMovieById(newId.toString());
  return movieObject;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection.find({},{projection: {_id:1,title:1}}).toArray();
  if (!movieList) throw {error: "Could not get all the movies in the db!", code: 404};
  for (const x of movieList) {
    x._id = x._id.toString();
  }
  return movieList;
};

const errorCheckForGetMovieByIdAndRemoveMovie = (movieId) => {
  if (!movieId) throw {error: "A non-empty ID must be provided!", code: 400};
  if (typeof movieId !== "string") throw {error: "ID must be a string type!", code: 400};
  if (!movieId.trim().length) throw {error: "ID can't contain only whitespaces!", code: 400};
  if (!ObjectId.isValid(movieId)) throw {error: "ID is not valid!", code: 400};
};

const getMovieById = async (movieId) => {
  errorCheckForGetMovieByIdAndRemoveMovie(movieId);
  const movieCollection = await movies();
  const movieObject = await movieCollection.findOne({ _id: ObjectId(movieId) });
  if (movieObject === null)
    throw {error: "No movie with this ID can be found in the db!", code: 404};
  movieObject["_id"] = movieObject["_id"].toString();
  return movieObject;
};

const removeMovie = async (movieId) => {
  errorCheckForGetMovieByIdAndRemoveMovie(movieId);
  if (!ObjectId.isValid(movieId)) throw {error: "ID is not valid!", code: 404};

  const movieBeforeDeletion = await getMovieById(movieId);
  const movieName = movieBeforeDeletion.title;
  const movieCollection = await movies();
  const deletionInfo = await movieCollection.deleteOne({
    _id: ObjectId(movieId),
  });

  if (deletionInfo.deletedCount === 0) {
    throw {erorr: `Could not delete movie with movieId ${movieId}`, code: 404};
  }
  return {"movieId": movieId, "deleted": true};
};

const errorCheckForUpdateMovie = (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  if (
    !movieId ||
    !title ||
    !plot ||
    !genres ||
    !rating ||
    !studio ||
    !director ||
    !castMembers ||
    !dateReleased ||
    !runtime
  )
    throw {error: "Every parameter must be provided and must be non-empty for updating a movie!", code: 400};

  if (
    typeof movieId !== "string" ||
    typeof title !== "string" ||
    typeof plot !== "string" ||
    !Array.isArray(genres) ||
    typeof rating !== "string" ||
    typeof studio !== "string" ||
    typeof director !== "string" ||
    !Array.isArray(castMembers) ||
    typeof dateReleased !== "string" ||
    typeof runtime !== "string"
  )
    throw {error: "movieId, title, plot, rating, studio, director, dateReleased, and runtime should be string type and genres and castMembers should be arrays!", code: 400};
  if (
    !movieId.trim().length ||
    !title.trim().length ||
    !plot.trim().length ||
    !rating.trim().length ||
    !studio.trim().length ||
    !director.trim().length ||
    !dateReleased.trim().length ||
    !runtime.trim().length
  )
    throw {error: "movieId, title, plot, rating, studio, director, dateReleased, and runtime can't contain only whitespaces!", code: 400};

  if (!ObjectId.isValid(movieId)) throw "movie ID is not valid!";

  if (!genres.length || !castMembers.length)
    throw {error: "genres and castMembers can't be empty arrays!", code: 400};
  for (const x of genres) {
    if (!x || !x.trim().length)
      throw {error: "A genre can neither be an empty element nor contain only whitespaces!", code: 400};
  }

  for (const x of castMembers) {
    if (!x || !x.trim().length)
      throw {error: "A castMember can neither be an empty element nor contain only whitespaces!", code: 400};
  }

  if (!isValidDate(dateReleased))
    throw {error: "Invalid date or format! Format must be mm/dd/yyyy, the year can't be before 1900 and can't go beyond 2024 (in our case)!", code: 400};
  if (!isValidRuntimeFormat(runtime))
    throw {error: "Invalid runtime format for the movie!", code: 400};
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  errorCheckForUpdateMovie(
    movieId,
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime
  );
  if (await getMovieById(movieId) === null) throw {error: "No movie with the given movie ID exists in the collection!", code: 404};

  const moviesCollection = await movies();
  const updatedMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
  };
  const updatedInfo = await moviesCollection.updateOne(
    { _id: ObjectId(movieId) },
    { $set: updatedMovie }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw {error: `Could not update movie with movie ID ${movieId}`, code: 404};
  }
  return getMovieById(movieId);
};

// const renameMovie = async (movieId, newName) => {
//   //Not used for this lab
// };

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie,
  errorCheckForGetMovieByIdAndRemoveMovie,
  errorAndValidationCheckForCreateMovie,
  errorCheckForUpdateMovie,
};
