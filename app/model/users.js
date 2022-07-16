(function () {
  const cuid = require('cuid');
  const db = require('../config/db.config');

  const User = db.model('User', {
    _id: { type: String, default: cuid },
    username: { type: String, required: true },
    password: { type: String, required: true  },
    email: { type: String, required: true }
  });

  module.exports = {
    create,
    model: User
  }

  async function create(fields) {
    const user = new User(fields);
    await user.save(function(error) {
      if (error) handleError(error);
      else {
        console.log('A user has been created successfully.')
      }
    });
    return user;
  }

}());