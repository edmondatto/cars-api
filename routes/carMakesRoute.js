let ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
  app.post('/makes', (req, res) => {
    const newMake = {name: req.body.name, countryOfOrigin: req.body.countryOfOrigin};

    db.collection('makes').insert(newMake, (err, result) => {
      const isDuplicateResource = err && err.code === 11000;

      if (err) {
        res.send({
          message: isDuplicateResource
            ? `A resource with the name ${newMake.name} already exists!`
            : 'An error occurred!',
          status: isDuplicateResource
            ? 409
            : 418,
        })
      } else {
        res.send({
          ...result.ops[0],
          status: 201
        })
      }
    });
  });

  app.get('/makes', (req, res) => {
    db.collection('makes').find({}).toArray((err, items) => {
      if (err) {
        res.send({
          error: err,
        });
      } else {
        res.send({
          results: items,
          status: items.length > 0 ? 200 : 204
        });
      }
    })
  });

  app.get('/makes/:id', (req, res) => {
    const idParam = req.params.id;
    const makeId = {'_id': new ObjectID(idParam)};

    db.collection('makes').findOne(makeId, (err, item) => {
      if (err) {
        res.send({
          error: 'An error occurred'
        })
      } else {
        res.send({
          ...item,
          status: 200
        })
      }
    })
  });

  app.delete('/makes/:id', (req, res) => {
    const idParam = req.params.id;
    const makeId = {'_id': new ObjectID(idParam)};

    db.collection('makes').remove(makeId, (err, item) => {
      const resourceDoesNotExist = item.result.n < 1;

      if (err || resourceDoesNotExist) {
        res.send({
          error: resourceDoesNotExist ? `Resource with Id ${idParam} does not exist!` : err,
          status: resourceDoesNotExist ? 404 : 400
        })
      } else {
        res.send({
          message: `Car make ${idParam} has been deleted`,
          status: 200
        })
      }
    })
  });

  app.put('/makes/:id', (req, res) => {
    const idParam = req.params.id;
    const makeId = {'_id': new ObjectID(idParam)};

    // TODO Update doesn't merge old and new objects
    db.collection('makes').update(makeId, req.body, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send({
          ...result,
          status: 200
        });
      }
    })
  });
};