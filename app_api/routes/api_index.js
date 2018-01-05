const express = require('express');
const router = express.Router();
const ctrlSearch = require('../controllers/api_c_search')
const ctrlCustomers = require('../controllers/api_c_customers');


// search all WIP
router.route('/search/:term')
  .get(ctrlSearch.searchAll); // returns items, jobs and customers matching term

// customers
router.route('/customers')
  .get(ctrlCustomers.customerReadAll) // route to get list of all customers
  .post(ctrlCustomers.customerCreate);

router.route('/customers/:custNumber')
  .get(ctrlCustomers.customerRead)
  .put(ctrlCustomers.customerUpdate)
  .delete(ctrlCustomers.customerDelete); // for delete, custNumber is actually customer id

module.exports = router;