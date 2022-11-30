const helpers = require("../helpers");
const { movies } = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");

const {
  isValidDate,
  isAlphanumeric,
  isOnlyAlphabets,
  isValidRuntimeFormat,
} = require("../helpers");

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
    throw "Every parameter is required to be input and has to be non-empty!";

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
    throw "title, plot, rating, studio, director, dateReleased, and runtime should be string type and genres and castMembers should be arrays!";
  if (title.length < 2) throw "title must be at least 2 characters long!";
  if (studio.length < 5) throw "studio must be at least 5 characters long!";
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

  if (!isAlphanumeric(title)) throw "title must be alphanumeric!";
  if (!isOnlyAlphabets(studio)) throw "studio must contain only alphabets!";
  if (!isOnlyAlphabets(director)) throw "director must contain only alphabets!";
  if (
    director.split(" ").length !== 2 ||
    director.split(" ")[0].length < 3 ||
    director.split(" ")[1].length < 3
  )
    throw "director's full name must contain only 2 words, first name and last name, and both must be at least 3 characters long!";
  const possibleRatings = ["G", "PG", "PG-13", "R", "NC-17"];
  if (
    rating !== possibleRatings[0] &&
    rating !== possibleRatings[1] &&
    rating !== possibleRatings[2] &&
    rating !== possibleRatings[3] &&
    rating !== possibleRatings[4]
  )
    throw "Rating can only be one of: G, PG, PG-13, R, or NC-17!";

  if (!genres.length || !castMembers.length)
    throw "genres and castMembers can't be empty arrays!";
  for (const x of genres) {
    if (!x || !x.trim().length)
      throw "A genre can neither be an empty element nor contain only whitespaces!";
    if (!x.isOnlyAlphabets && x.length < 5)
      throw "Each genre must be at least 5 characters long and should contain only alphabets!";
  }

  for (const x of castMembers) {
    if (!x || !x.trim().length)
      throw "A castMember can neither be an empty element nor contain only whitespaces!";
    if (
      x.split(" ").length !== 2 ||
      x.split(" ")[0].length < 3 ||
      x.split(" ")[1].length < 3
    )
      throw "Each castMember's full name must contain only 2 words, first name and last name, and both must be at least 3 characters long!";
  }

  if (!isValidDate(dateReleased))
    throw "Invalid date or format! Format must be mm/dd/yyyy, the year can't be before 1900 and can't go beyond 2024 (in our case)!";
  if (!isValidRuntimeFormat(runtime))
    throw "Invalid runtime format for the movie!";
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

  let runtimeSplit = runtime.split(" ");
  if (runtimeSplit[0].length === 2) {
    if (runtimeSplit[0][0] === "0")
      throw "Movie should be at least 1 hour long!";
  }
  if (runtimeSplit[0].length === 3) {
    if (runtimeSplit[0][0] === "0" && runtimeSplit[0][1] === "0")
      throw "Movie should be at least 1 hour long!";
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
  };
  const insertInfo = await movieCollection.insertOne(newMovie);
  if (insertInfo.insertedCount === 0) throw "Could not add a movie to the db!";
  const newId = insertInfo.insertedId;
  const movieObject = await getMovieById(newId.toString());
  return movieObject;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection.find({}).toArray();
  if (!movieList) throw "Could not get all the movies in the db!";
  for (const x of movieList) {
    x._id = x._id.toString();
  }
  return movieList;
};

const errorCheckForGetMovieByIdAndRemoveMovie = (id) => {
  if (!id) throw "A non-empty ID must be provided!";
  if (typeof id !== "string") throw "ID must be a string type!";
  if (!id.trim().length) throw "ID can't contain only whitespaces!";
};

const getMovieById = async (id) => {
  errorCheckForGetMovieByIdAndRemoveMovie(id);
  if (!ObjectId.isValid(id)) throw "ID is not valid!";
  const movieCollection = await movies();
  const movieObject = await movieCollection.findOne({ _id: ObjectId(id) });
  if (movieObject === null)
    throw "No movie with this ID can be found in the db!";
  movieObject["_id"] = movieObject["_id"].toString();
  return movieObject;
};

const removeMovie = async (id) => {
  errorCheckForGetMovieByIdAndRemoveMovie(id);
  if (!ObjectId.isValid(id)) throw "ID is not valid!";

  const movieBeforeDeletion = await getMovieById(id);
  const movieName = movieBeforeDeletion.title;
  const movieCollection = await movies();
  const deletionInfo = await movieCollection.deleteOne({ _id: ObjectId(id) });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete dog with id of ${id}`;
  }
  return `${movieName} has been successfully deleted!`;
};

const renameMovie = async (id, newName) => {
  if (!id) throw "A non-empty ID must be provided!";
  if (typeof id !== "string") throw "ID must be a string type!";
  if (!id.trim().length) throw "ID can't contain only whitespaces!";
  if (!ObjectId.isValid(id)) throw "ID is not valid!";
  if (!newName) throw "A non-empty new name must be provided!";
  if (typeof newName !== "string") throw "newName must of type string!";
  if (!newName.trim().length) throw "newName can't contain only whitespaces!";
  if (!isAlphanumeric(newName)) throw "newName must be alphanumeric!";

  newName = newName.trim();
  const movieCollection = await movies();
  const updatedInfo = await movieCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { title: newName } },
    { update: true }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update to new movie name!";
  }
  return getMovieById(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie,
};
