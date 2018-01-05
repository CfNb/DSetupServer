const mongoose = require('mongoose');
const Cust = mongoose.model('Customer');

// GET request, returns all customers(number & name only)
const customerReadAll = function (req, res) {
  Cust
    .find({}, {number:1, name:1})
    .exec((err, customers) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
        res.status(200).json(customers);
    })
};

// POST request, returns created customer
const customerCreate = function (req, res) {
  // check if customer already exists
  Cust
    .findOne({'number': req.body.number.toUpperCase()}) 
    .exec((err, customer) => {
      if (!customer) {
        Cust
          .create({
            number: req.body.number,
            name: req.body.name
          }, (err, customer) => {
            if (err) {
              res.status(400).json(err);
            } else {
              res.status(201).json(customer);
            }
          });
      } else if (err) {
        res.status(404).json(err);
        return;
      } else {
        res.status(409).json({"message": "customer already exists"});
      }
    });
};

// GET request, returns customer given customer number
const customerRead = function (req, res) {
  if (req.params && req.params.custNumber) {
      Cust
        .findOne({'number': req.params.custNumber})
        .exec((err, customer) => {
          if (!customer) {
            res.status(404).json({
                "message": "customer number not found"
              });
            return;
          } else if (err) {
            res.status(404).json(err);
            return;
          }
          res.status(200).json(customer);
        });
  } else {
    res.status(404).json({"message": "no customer number in request"});
  }
};

// PUT request, returns updated customer
const customerUpdate = function (req, res) {
  if (!req.params.custNumber) {
    res.status(404).json({
      "message": "not found, customer number is required"
    });
    return;
  }
  Cust
    .findOne({'number': req.params.custNumber})
    .exec((err, customer) => {
      if (!customer) {
        res.status(404).json({
            "message": "customer number not found"
          });
        return;
      } else if (err) {
        res.status(404).json(err);
        return;
      }
      customer.number = req.body.number;
      customer.name = req.body.name;
      customer.contacts = req.body.contacts;
      customer.save((err, customer) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(customer);  
        }
      })
    })
};

// DELETE request, returns nothing on sucess
const customerDelete = function (req, res) {
  const customerid = req.params.custNumber;
  if (customerid) {
    Cust
      .findByIdAndRemove(customerid)
      .exec((err) => {
        if (err) {
          res.status(404).json(err);
          return;
        }
        res.status(204).json(null);
      });
  } else {
    res.status(404).json({
      "message": "no customer id"
    });
  }
};


module.exports = {
  customerReadAll,
  customerCreate,
  customerRead,
  customerUpdate,
  customerDelete
};