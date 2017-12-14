/* Item page collects same information as shown in Prepress DSetup Extension */

/* GET item page. */
const item = function (req, res) {
  // res.render([template to use], [js object containing date]);
  res.render('item', { title: 'Item View' });
};

module.exports = {
  item
};