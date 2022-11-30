const { ObjectId } = require("mongodb");
const { movies } = require("../config/mongoCollections");

const finalOverallRating = (reviewsArray) => {
  let currentOverallRating = 0;
  let reviewsLength = reviewsArray.length;
  for (const x of reviewsArray) {
    currentOverallRating += x.rating
  }
  currentOverallRating = (currentOverallRating/(reviewsLength));
  // console.log(currentOverallRating);
  return currentOverallRating;
}

const errorCheckForCreateReview = (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  if (!movieId || !reviewTitle || !reviewerName || !review || !rating)
    throw {error:"Every parameter must be provided and must be non-empty for reviewing a movie!",code:400};
  if (!ObjectId.isValid(movieId)) throw "movie ID is not valid!";
  if (
    typeof movieId !== "string" ||
    typeof reviewTitle !== "string" ||
    typeof reviewerName !== "string" ||
    typeof review !== "string" ||
    typeof rating !== "number"
  )
    throw {error:"Every parameter should have the type string except rating which should be a number!", code:400};
  if (
    !movieId.trim().length ||
    !reviewTitle.trim().length ||
    !reviewerName.trim().length ||
    !review.trim().length
  )
    throw {error: "Parameters can't contain only whitespaces!", code: 400};

  if (typeof rating !== "number") throw {error: "rating needs to be of type number!", code: 400};

  if (rating < 1 || rating > 5) throw {error: "Rating can be in the range 1-5!", code: 400};
};

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  errorCheckForCreateReview(movieId, reviewTitle, reviewerName, review, rating);
  const currentDate = new Date();
  const moviesCollection = await movies();
  const movie = await moviesCollection.findOne({ _id: ObjectId(movieId) });
  if (movie === null)
    throw {error:"No movie with the given movie ID exists in the collection!", code:404};
  movie.reviews.push({
    _id: new ObjectId(),
    reviewTitle: reviewTitle,
    reviewDate:
      currentDate.getMonth() +
      "/" +
      currentDate.getDate() +
      "/" +
      currentDate.getFullYear(),
    reviewerName: reviewerName,
    review: review,
    rating: parseFloat(rating.toFixed(1))
  });
  const updatedInfo = await moviesCollection.updateOne(
    { _id: ObjectId(movieId) },
    { $set: { reviews: movie.reviews , overallRating:parseFloat(finalOverallRating(movie.reviews).toFixed(1))} }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw {error:`Could not update movie with movie ID ${movieId}`, code: 404};
  }
  movie._id = movie._id.toString();
  for (const x of movie.reviews) {
    x._id = x._id.toString();
  }
  const movieUpdated = await moviesCollection.findOne({ _id: ObjectId(movieId) });
  return movieUpdated;
};

const errorCheckForGetAllReviews = (movieId) => {
  if (!movieId) throw {error: "movie ID must provided!", code: 400};
  if (typeof movieId !== "string") throw {error: "movie ID must be of type string!", code: 400};
  if (!ObjectId.isValid(movieId)) throw {error: "movie ID is not valid!", code: 400};
};
const getAllReviews = async (movieId) => {
  errorCheckForGetAllReviews(movieId);
  const movieCollection = await movies();
  const movieData = await movieCollection.findOne({ _id: ObjectId(movieId) });
  if (movieData === null)
    throw {error: "No movie with the given movie ID exists in the collection!", code: 404};
  for (const x of movieData.reviews) {
    x._id = x._id.toString();
  }
  return movieData.reviews;
};

const errorCheckForGetReview = (reviewId) => {
  if (!reviewId) throw {error: "movie ID must provided!", code: 400};
  if (typeof reviewId !== "string") throw {error: "movie ID must be of type string!", code: 400};
  if (!ObjectId.isValid(reviewId)) throw {error: "movie ID is not valid!", code: 400};
};
const getReview = async (reviewId) => {
  errorCheckForGetReview(reviewId);
  const movieCollection = await movies();
  const movieData = await movieCollection.findOne({
    reviews: { $elemMatch: { _id: ObjectId(reviewId) } },
  });
  // const movieData = await movieCollection.findOne({reviews: { $elemMatch: {_id: ObjectId(reviewId)} }});
  let review;
  if (movieData === null)
    throw {error: "No movie with the given movie ID exists in the collection!", code: 404};
  else {
    movieData.reviews.forEach((element) => {
      element._id = element._id.toString();
      if (element._id === reviewId) {
        review = element;
      }
    });
  }
  return review;
};

const errorCheckForremoveReview = (reviewId) => {
  if (!reviewId) throw {error: "movie ID must provided!", code: 400};
  if (typeof reviewId !== "string") throw {error: "movie ID must be of type string!", code:400};
  if (!ObjectId.isValid(reviewId)) throw {error: "movie ID is not valid!", code: 400};
};
const removeReview = async (reviewId) => {
  errorCheckForremoveReview(reviewId);
  const movieCollection = await movies();
  const movieData = await movieCollection.findOne({
    reviews: { $elemMatch: { _id: ObjectId(reviewId) } },
  });
  const removedReview = await movieCollection.updateOne(
    {},
    { $pull: { reviews: { _id: ObjectId(reviewId) } } }
  );
  
  if (removedReview.modifiedCount === 0) throw {error: "No review removed!", code: 404};
  else {

    const updatedMovie = await movieCollection.findOne({_id: ObjectId(movieData._id)});
    const updatedRatingMovie = await movieCollection.updateOne({_id: ObjectId(movieData._id)},{$set:{overallRating: parseFloat(finalOverallRating(updatedMovie.reviews).toFixed(1))}});
    if (updatedRatingMovie.modifiedCount === 0) throw {error: "OverallRating not updated", code: 404};
    const returnMovie = await movieCollection.findOne({_id: ObjectId(movieData._id)});
    return returnMovie;
  }
};

async function main() {
  // console.log(await createReview("6365c7a1e763d411312ce7a0", "MyReview2", "Kajol", "Awesome movie!", 3.3));
  // console.log(await createReview("6365c7b00093a83a20976263", "MyReview2", "Kajol", "Awesome movie!", 3.3));
  // console.log(await getAllReviews("6365c7a1e763d411312ce7a0"));
  // console.log(await getReview("6365d06e81ee37c5930b3616"));
  try {
    console.log(await removeReview("6365d0eab6c8562782375649"));
  } catch (e) {
    console.log(e);
  }
}
// main();
// console.log(getAllReviews("6365b4ab43ab49dcef825ebb"));

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview,
  errorCheckForCreateReview,
  errorCheckForGetAllReviews,
  errorCheckForGetReview,
  errorCheckForremoveReview,
};
