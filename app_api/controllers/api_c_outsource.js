const mongoose = require('mongoose');
const Outs = mongoose.model('OutsourceLocation');

// GET request, returns all outsource locations
const outsourceReadAll = function (req, res) {
  Outs
    .find({})
    .exec((err, outsourceLocs) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
        res.status(200).json(outsourceLocs);
    })
};

// POST request, adds new outsource, returns created outsource location
const outsourceCreate = function (req, res) {
  // check if outsource already exists or abbreviation already in use
  // create if both are unique
  Outs
    .findOne({
      $or: [
        { 'name': req.body.name },
        { 'abbreviation': req.body.abbreviation }
      ]}) 
    .exec((err, outsourceLoc) => {
      if (!outsourceLoc) {
        Outs
          .create({
            name: req.body.name,
            abbreviation: req.body.abbreviation
          }, (err, outsourceLoc) => {
            if (err) {
              res.status(400).json(err);
            } else {
              res.status(201).json(outsourceLoc);
            }
          });
      } else if (err) {
        res.status(404).json(err);
        return;
      } else {
        let msg = "the abbreviation is already in use"
        if (outsourceLoc.name === req.body.name) {
          msg = "outsource location with same name already exists" 
        }
        res.status(409).json({"message": msg});
      }
    });
};

// PUT request, returns updated outsource location
const outsourceUpdate = function (req, res) {  
  if (!req.body.name || !req.body.abbreviation) {
    res.status(404).json({
      "message": "not found, name and abbreviation is required"
    });
    return;
  }
  // TO DO: test that name and abbr are unique!
  
  Outs
    .findOne({'_id':req.params.outsourceID})
    .exec((err, outsource) => {
      if (!outsource) {
        res.status(404).json({
            "message": "outsource location not found"
          });
        return;
      } else if (err) {
        res.status(404).json(err);
        return;
      }
      outsource.name = req.body.name;
      outsource.abbreviation = req.body.abbreviation;
      outsource.save((err, outsource) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(outsource);  
        }
      })
    })
};

// DELETE request, returns nothing on sucess
const outsourceDelete = function (req, res) {
  if (req.params.outsourceID) {
    Outs
      .findByIdAndRemove(req.params.outsourceID)
      .exec((err) => {
        if (err) {
          res.status(404).json(err);
          return;
        }
        res.status(204).json(null);
      });
  } else {
    res.status(404).json({
      "message": "no outsource id"
    });
  }
};


module.exports = {
  outsourceReadAll,
  outsourceCreate,
  outsourceUpdate,
  outsourceDelete
};