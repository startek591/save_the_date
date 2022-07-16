(function(){
const Users = require('../model/users');

module.exports = {
  createUser,
}

async function createUser (request, response) {
  const user = await Users.create(request.body);
  response.json(user);
}

}());