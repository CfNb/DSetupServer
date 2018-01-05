/* Controller for Misc pages */
const request = require('request');
const api = require('./apiOptions');

/* GET main home page. */
const main = function (req, res) {
  // res.render([template to use], [js object containing data]);
  res.render('main', { 
    title: 'Suite D',
    pageHeader: {
      title: 'Welcome, this site is a work in progress',
      actioncall: 'Review Prepress information by entering a reference number in the above search box.',
    }
  });
};

module.exports = {
  main
};