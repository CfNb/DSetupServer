// common handler for errors in request response from api
const showError = function (req, res, status, message) {
  let title = '';
  let content = message;
  if (status === 404) {
    title = '404, page not found';
    if (message === '') {
      content = 'Looks like we can\'t find this page. Sorry about that.';
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

// sort array of objects by given property
// property value must be string
const sortObjsBy = function (arr, prop) {
	arr.sort(function (a, b) {		
		return a[prop].localeCompare(b[prop]);
	});
	return arr
};


module.exports = {
  showError,
  sortObjsBy
}