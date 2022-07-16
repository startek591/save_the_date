(function(){
  const mongoose = require('mongoose');
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/save_the_date';
  
  mongoose.connect(uri).then(
    () => { console.log(`Successfully connected to the database`); },
    (error) => { console.log(`The database did not connect successfully. ${error}`)});

  module.exports = mongoose;

}());