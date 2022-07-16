(function () {
  const cuid = require('cuid');
  const db = require('../config/db.config');

  const User = db.model('User', {
    _id: { type: String, default: cuid },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
  });

  module.exports = {
    create,
    get,
    list,
    edit,
    remove,
    model: User
  }

  async function create(fields) {
    const user = new User(fields);
    await user.save();
    return user;
  }

  async function get(username) {
    const user = await User.findOne({ username });
    return user;
  }

  async function list (opts = {}) {
    const { offset = 0, limit = 25 } = opts
    const query = {};
    const user = await User.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)

    return user;
  }

  async function edit (username, change) {
    const user = await get(username);
    Object.keys(change).forEach(function (key) {
      user[key] = change[key];
      user.save();
      return user;
    });
  }

  async function remove (_id) {
    await User.deleteOne({ _id });
  }


}());