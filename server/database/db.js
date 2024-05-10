const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log('Connected successfully to MongoDB');
});


module.exports = db;


