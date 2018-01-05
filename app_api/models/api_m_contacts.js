const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: /.*@.*\..*/
  }
});

module.exports = mongoose.model('Contact', contactSchema);