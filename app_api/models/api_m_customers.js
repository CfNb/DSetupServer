const mongoose = require('mongoose');
const contactModel = require('./api_m_contacts');
const noteModel = require('./api_m_notes');
const jobModel = require('./api_m_jobs');

const customerSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    match: /[A-Z]{4}\d{2}/
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdOn: {
    type: Date,
    "default": Date.now
  },
  createdBy: {
    type: String,
    required: true,
    "default": 'TST',
    uppercse: true,
    trim: true,
    match: /^[A-Z]{2,3}$/
  },
  editedOn: Date,
  editedBy: {
    type: String,
    uppercse: true,
    trim: true,
    match: /^[A-Z]{2,3}$/
  },
  contacts: [contactModel.schema],
  notes: [noteModel.schema],
  jobs: [jobModel.schema]
});

mongoose.model('Customer', customerSchema);