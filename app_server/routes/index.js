const express = require('express');
const router = express.Router();
//required controllers:
const c_Items = require('../controllers/c_items');
const c_Jobs = require('../controllers/c_jobs');
const c_Customers = require('../controllers/c_customers');
const c_Outsource = require('../controllers/c_outsource');
const c_Colors = require('../controllers/c_colors');
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
router.route('/customer/:customerNumber')
  .get(c_Customers.customer)
  .post(c_Customers.updateCustomer);
router.get('/customer/:customerNumber/delete/:customerID', c_Customers.doDeleteCustomer);
router.route('/customer/:customerNumber/job/add')
  .get(c_Jobs.addJob)
  .post(c_Jobs.doAddJob);

/* Outsource page */
router.route('/outsource')
  .get(c_Outsource.outsource)
  .post(c_Outsource.doAddOutsource);
router.post('/outsource/:outsourceID', c_Outsource.doUpdateOutsource);
router.get('/outsource/delete/:abbreviation/:outsourceID', c_Outsource.doDeleteOutsource);

/* Colors page */
router.route('/colors')
  .get(c_Colors.colors) // defaults to page one of color list
  .post(c_Colors.doAddColor);
router.route('/colors/:page', c_Colors.colors) // color list by page
  .get (c_Colors.colors)
  .post(c_Colors.doAddColor);
router.post('/colors/update/:colorID', c_Colors.doUpdateColor);
router.get('/colors/delete/:colorID', c_Colors.doDeleteColor);

/* Other pages */
router.get('/', c_Others.main);

module.exports = router;