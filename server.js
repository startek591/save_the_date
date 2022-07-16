(function () {
  const express = require('express');
  const bodyParser = require('body-parser');
  const port = process.env.PORT || 1337;

  const api = require('./app/controller/api');
  const middleware = require('./app/controller/middleware');

  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.use(middleware.cors);
  app.use(middleware.handleValidationError);
  app.use(middleware.handleError);
  app.use(middleware.notFound);

  app.get('/api/users', api.listUsers);
  app.post('/api/users', api.createUser);
  app.get('/api/user/:username', api.getUser);
  app.put('/api/user/:username', api.editUser);
  app.delete('/api/user/:id', api.deleteUser);
  

  app.listen(port, () => { console.log(`Server has connected successfully at port ${port}.`) });
}());