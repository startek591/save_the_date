(function () {
  const Users = require('../model/users');
  const path = require('path');

  module.exports = {
    serveFrontend,
    createUser,
    getUser,
    listUsers,
    editUser,
    deleteUser
  }

  function serveFrontend(request, response) {
    response.sendFile(path.join(__dirname + '/../../public/app/views/index.html'));
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

  async function editUser(request, response) {
    const change = request.body;
    const users = await Users.edit(request.params.username, change);
    response.json(users);
  }

  async function deleteUser(request, response) {
    await Users.remove(request.params.id);
    response.json({ success: true });
  }
}());