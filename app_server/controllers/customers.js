/* Customer pages */

/* GET customer page. */
const customer = function (req, res) {
  // res.render([template to use], [js object containing date]);
  res.render('customer', { title: 'Customer View' });
};

module.exports = {
  customer
};