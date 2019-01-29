module.exports = function (app, db) {
  app.post('/models', (req, res) => {
    res.send({message: 'Hello One Last Time'});
  });

  app.get('/models', (req, res) => {
    res.send({message: 'Hello Yet Again'});
  });

  app.delete('/models/:id', (req, res) => {
    res.json({message: 'Hello Again'});
  });

  app.put('/models/:id', (req, res) => {
    res.json({message: 'Hello there!'});
  });
};