const moviesRoutes = require('./movies');
const reviewsRoutes = require('./reviews');

const constructorMethod = (app) => {
  app.use('/movies', moviesRoutes);
  app.use('/reviews', reviewsRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
