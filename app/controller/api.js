(function () {
  const Users = require('../model/users');

  module.exports = {
    createUser,
    getUser
  }

  async function createUser(request, response) {
    const user = await Users.create(request.body);
    response.json(user);
  }

  async function getUser(request, response, next) {
    const { username } = request.params;
    const user = await Users.get(username);
    if (!user) return next();
    response.json(user);
  }

}());