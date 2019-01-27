module.exports = function (app, db) {
  app.post('/makes', (req, res) => {
    res.send({message: 'Hello One Last Time'});
  });

  app.get('/makes', (req, res) => {
    res.send({message: 'Hello Yet Again'});
  });

  app.delete('/makes/:id', (req, res) => {
    res.json({message: 'Hello Again'});
  });

  app.put('/makes/:id', (req, res) => {
    res.json({message: 'Hello there!'});
  });
};