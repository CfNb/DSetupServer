const express = require('express');
const router = express.Router();
const ctrlSearch = require('../controllers/api_c_search');
const ctrlCustomers = require('../controllers/api_c_customers');
const ctrlOutsource = require('../controllers/api_c_outsource');


// search all WIP
router.route('/search/:term')
  .get(ctrlSearch.searchAll); // returns items, jobs and customers matching term

// customers
router.route('/customers')
  .get(ctrlCustomers.customerReadAll) // get list of all customers
  .post(ctrlCustomers.customerCreate);

router.route('/customers/:custNumber')
  .get(ctrlCustomers.customerRead)
  .put(ctrlCustomers.customerUpdate)
  .delete(ctrlCustomers.customerDelete); // for delete, custNumber is actually customer id

// outsource
router.route('/outsource')
  .get(ctrlOutsource.outsourceReadAll) // get list of all outsource locations
  .post(ctrlOutsource.outsourceCreate); // create a new outsource location

router.route('/outsource/:outsourceID')
  .put(ctrlOutsource.outsourceUpdate) // update an existing outsource location
  .delete(ctrlOutsource.outsourceDelete); // delete an outsource location


module.exports = router;