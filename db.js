// db.js
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://Studydoor:ChmkjJ_11@cluster0.iygive1.mongodb.net/carrent?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected to MongoDB successfully');
});

module.exports = db;
