const carMakesRoute = require('./carMakesRoute');

module.exports = function (app, db) {
  carMakesRoute(app, db);
};