const _showError = function (req, res, status, message) {
  let title = '';
  let content = message;
  if (status === 404) {
    title = '404, page not found';
    if (message === '') {
      content = 'Oh dear. Looks like we can\'t find this page. Sorry about that. It\'s too bad, bit of a tradgedy really.  Try not to get too down about it.  Please, don\'t blame yourself, it happens to everyone now and again.  Best to pick yourself up and carry on.';
    }
  } else {
    title = `${status}, something's gone wrong`;
    if (message === '') {
      content = 'Something, somewhere, has gone just a little bit wrong.';
    }
  }
  res.status(status);
  res.render('generic-text', {
    title : status,
    pageHeader: {
      title: title,
      actioncall: content,
    }
  });
};

module.exports = {
  _showError
}