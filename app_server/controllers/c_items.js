/* Controller for Item pages */
const request = require('request');
const api = require('./apiOptions');

/* GET item page. */
const item = function (req, res) {
  // res.render([template to use], [js object containing data]);
  res.render('item', { title: 'Item View' });
};

module.exports = {
  item
};