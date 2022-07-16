(function(){
  const express = require('express');
  const bodyParser = require('body-parser');
  const port = process.env.PORT || 1337;

  const api = require('./app/controller/api');
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/api/users', api.createUser);
  app.listen(port, () => { console.log(`Server has connected successfully at port ${port}.`)});
}());