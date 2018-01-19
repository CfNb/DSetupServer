const mongoose = require('mongoose');

const gtgSchema = new mongoose.Schema({
  lastNumber: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    match: /^G\d{5}$/
  },
  createdOn: Date,
  requestedBy: {
    type: String,
    uppercse: true,
    trim: true,
    match: /^[A-Z]{2,3}$/
  }
})