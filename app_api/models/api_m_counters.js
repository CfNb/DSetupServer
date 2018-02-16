const mongoose = require('mongoose');

// collection consists of a single document 
// used to generate next GtG number from lastNumber
// # format is G00000
const counterSchema = new mongoose.Schema({
  name: String,
  lastNumber: {
    type: String,
    required: true,
    'default': 'G00000',
    uppercase: true,
    trim: true,
    match: /^G\d{5}$/
  }
})

mongoose.model('Counter', counterSchema);