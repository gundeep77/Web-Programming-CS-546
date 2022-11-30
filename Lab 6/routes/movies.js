const express = require('express');
const { movies } = require('../data');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;


router
  .route('/')
  .get(async (req, res) => {
    try {
      const allMovies= await moviesData.getAllMovies();
      res.json(allMovies);
    } catch (error) {
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
    const addMoviesBody = req.body;
    try {
      
      moviesData.errorAndValidationCheckForCreateMovie(addMoviesBody.title,
        addMoviesBody.plot,
        addMoviesBody.genres,
        addMoviesBody.rating,
        addMoviesBody.studio,
        addMoviesBody.director,
        addMoviesBody.castMembers,
        addMoviesBody.dateReleased,
        addMoviesBody.runtime);
      const addMovies= await moviesData.createMovie(addMoviesBody.title,
        addMoviesBody.plot,
        addMoviesBody.genres,
        addMoviesBody.rating,
        addMoviesBody.studio,
        addMoviesBody.director,
        addMoviesBody.castMembers,
        addMoviesBody.dateReleased,
        addMoviesBody.runtime);
      res.json(addMovies);
    } catch (error) {
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
  .route('/:movieId')
  .get(async (req, res) => {
    try{
    moviesData.errorCheckForGetMovieByIdAndRemoveMovie(req.params.movieId);
    const moviebyid= await moviesData.getMovieById(req.params.movieId);
    res.json(moviebyid);
    } catch(error){
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
      moviesData.errorCheckForGetMovieByIdAndRemoveMovie(req.params.movieId);
      const moviebyid= await moviesData.removeMovie(req.params.movieId);
      res.json(moviebyid);
      } catch(error){
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
  .put(async (req, res) => {
    const updateMovieBody = req.body;
    try {
      
      moviesData.errorCheckForUpdateMovie(req.params.movieId,updateMovieBody.title,
        updateMovieBody.plot,
        updateMovieBody.genres,
        updateMovieBody.rating,
        updateMovieBody.studio,
        updateMovieBody.director,
        updateMovieBody.castMembers,
        updateMovieBody.dateReleased,
        updateMovieBody.runtime);
      const updateMovies= await moviesData.updateMovie(req.params.movieId,updateMovieBody.title,
        updateMovieBody.plot,
        updateMovieBody.genres,
        updateMovieBody.rating,
        updateMovieBody.studio,
        updateMovieBody.director,
        updateMovieBody.castMembers,
        updateMovieBody.dateReleased,
        updateMovieBody.runtime);
      res.json(updateMovies);
    } catch (error) {
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