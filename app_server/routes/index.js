const express = require('express');
const router = express.Router();
//required controllers:
const ctrlItems = require('../controllers/items');
const ctrlJobs = require('../controllers/jobs');
const ctrlCustomers = require('../controllers/customers');
const ctrlOthers = require('../controllers/others');

/* Item pages */
router.get('/item', ctrlItems.item);

/* Job pages */
router.get('/job', ctrlJobs.job);

/* Customer pages */
router.get('/customer', ctrlCustomers.customer);

/* Other pages */
router.get('/', ctrlOthers.about);

module.exports = router;