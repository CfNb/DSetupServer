const mongoose = require('mongoose');
const itemModel = require('./api_m_items');
const noteModel = require('./api_m_notes');

const jobSchema = new mongoose.Schema({
  number: {
    type: String, // string to allow for GtG numbers...
    required: true,
    minlength: 6,
    maxlength: 6
  },
  description: {
    type: String,
  },
  gtg: {
    type: Boolean,
    required: true,
  },
  outsource: {
    type: Boolean,
    required: true,
  },
  outsourceLocation: String,
  completed: {
    type: Boolean,
    'default': false,
  },
  notes: [noteModel.schema],
  items: [itemModel.schema],
  active: {
    type: Boolean,
    default: true,
    required: true
  }
});

module.exports = mongoose.model('Job', jobSchema);