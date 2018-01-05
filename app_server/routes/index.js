const express = require('express');
const router = express.Router();
//required controllers:
const c_Items = require('../controllers/c_items');
const c_Jobs = require('../controllers/c_jobs');
const c_Customers = require('../controllers/c_customers');
const c_Others = require('../controllers/c_others');

/* Item pages */
router.get('/item', c_Items.item);

/* Job pages */
router.get('/job', c_Jobs.job);


/* Customer pages */
router.get('/customers', c_Customers.customers);
router.route('/customer/add')
  .get(c_Customers.addCustomer)
  .post(c_Customers.doAddCustomer);
router.get('/customer/:customerNumber', c_Customers.customer);
router.get('/customer/:customerNumber/delete/:customerID', c_Customers.doDeleteCustomer)
router.route('/customer/:customerNumber/job/add')
  .get(c_Jobs.addJob)
  .post(c_Jobs.doAddJob);

/* Other pages */
router.get('/', c_Others.main);

module.exports = router;