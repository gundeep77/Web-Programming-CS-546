const arrayRoutes = require('./sortArray');

const constructorMethod = (app) => {
  app.use('/', arrayRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
