const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  author: {
    type: String,
    uppercase: true,
    match: /^[A-Z]{2,3}$/
  },
  Date: String,
  content: {
    type: String,
    default: 'OK'
  }
});

module.exports = mongoose.model('Note', noteSchema);