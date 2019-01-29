const carMakesRoute = require('./carMakesRoute');
const carModelsRoute = require('./carModelsRoute');

module.exports = function (app, db) {
  carMakesRoute(app, db);
  carModelsRoute(app, db);
};