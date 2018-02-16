const mongoose = require('mongoose');

// outsource locations
const outsourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    match: /^([A-Z]|\d){2,4}$/
  }
})

mongoose.model('OutsourceLocation', outsourceSchema);