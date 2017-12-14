/* Job pages */

/* GET job page. */
const job = function (req, res) {
  // res.render([template to use], [js object containing date]);
  res.render('job', { title: 'Job View' });
};

module.exports = {
  job
};