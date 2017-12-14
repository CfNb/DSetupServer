/* GET about page. */
const about = function (req, res) {
  // res.render([template to use], [js object containing date]);
  res.render('about', { title: 'About' });
};

module.exports = {
  about
};