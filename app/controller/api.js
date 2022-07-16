(function () {
  const Users = require('../model/users');

  module.exports = {
    createUser,
    getUser,
    listUsers
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

  async function listUsers(request, response) {
    const { offset = 0, limit = 25 } = request.query;
    const users = await Users.list({
      offset: Number(offset),
      limit: Number(limit)
    });
    response.json(users);
  }

}());