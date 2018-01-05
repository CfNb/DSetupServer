const mongoose = require('mongoose');
const Cust = mongoose.model('Customer');
//const Job = mongoose.model('Job');
//const Item = mongoose.model('Item');

// GET request, searches all for phrase
const searchAll = function (req, res) {
  const re = new RegExp(req.params.term, 'i');
  
  Cust
    .find().or([{ 'number': { $regex: re }}, { 'name': { $regex: re }}]).sort('name')
    .exec((err, customers) => {
      res.json(customers);

    });
  
  // need to add other collections, assemble results
  
};


module.exports = {
  searchAll
}