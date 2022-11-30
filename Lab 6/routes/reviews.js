//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
router
  .route('/:movieId')
  .get(async (req, res) => {
    try{
    reviewsData.errorCheckForGetAllReviews(req.params.movieId)
    const allReviews= await reviewsData.getAllReviews(req.params.movieId);
    res.json(allReviews);
    }
    catch(error){
      if(error.code===400){
        res.status(400).send(error.error);
      }
      else if(error.code===404){
        res.status(404).send(error.error);
      }
      else{
        res.status(500).send(error.error);
      }
    }
  })
  .post(async (req, res) => {
    const createReviewBody = req.body;
    try{
      (reviewsData.errorCheckForCreateReview(req.params.movieId,
        createReviewBody.reviewTitle,
        createReviewBody.reviewerName,
        createReviewBody.review,
        createReviewBody.rating));
      const newReview = await reviewsData.createReview(req.params.movieId,
        createReviewBody.reviewTitle,
        createReviewBody.reviewerName,
        createReviewBody.review,
        createReviewBody.rating);
      res.json(newReview);
      }
      catch(error){
        // console.log(error);
        if(error.code===400){
          res.status(400).send(error.error);
        }
        else if(error.code===404){
          res.status(404).send(error.error);
        }
        else{
          res.status(500).send(error.error);
        }
      }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    try{
      reviewsData.errorCheckForGetReview(req.params.reviewId)
      const allReviews= await reviewsData.getReview(req.params.reviewId);
      res.json(allReviews);
      }
      catch(error){
        if(error.code===400){
          res.status(400).send(error.error);
        }
        else if(error.code===404){
          res.status(404).send(error.error);
        }
        else{
          res.status(500).send(error.error);
        }
      }
  })
  .delete(async (req, res) => {
    try{
      reviewsData.errorCheckForremoveReview(req.params.reviewId)
      const allReviews= await reviewsData.removeReview(req.params.reviewId);
      res.json(allReviews);
      }
      catch(error){
        if(error.code===400){
          res.status(400).send(error.error);
        }
        else if(error.code===404){
          res.status(404).send(error.error);
        }
        else{
          res.status(500).send(error.error);
        }
      }
  });

module.exports = router;