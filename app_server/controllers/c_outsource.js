/* Controller for Outsource pages */
const request = require('request');
const api = require('./apiOptions');
const util = require('./c_utilities');


/* GET outsource page, listing all outsource locations */
const _renderOutsources = function(req, res, responseBody) {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "api lookup error";
    responseBody = [];
  } else if (!responseBody.length) {
      message = 'no locations found';
  } else {
    message = req.query.error;
  }
  
  responseBody = util.sortObjsBy(responseBody, 'abbreviation');
  
  res.render('outsource', {
    title: 'Outsource Locations',
    pageHeader: {
      title: 'Outsource Locations List',
      actioncall: 'Add, remove, or edit location details',
    },
    outsources: responseBody,
    message: message,
    updated: req.query.updated,
    deleted: req.query.deleted,
    added: req.query.added
  });
}

const outsource = function (req, res) {
  const requestOptions = {
    url : api.server + 'outsource',
    method : 'GET',
    json : {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      _renderOutsources(req, res, body);
    }
  );
};

/* POST to add outsource, returns all outsource locations */
const doAddOutsource = function (req, res) {
  if (!req.body.name || !req.body.abbreviation) {
    res.redirect('/outsource?error=' + 'Name and abbreviation are required');
  } else {
    const postdata = {
      name: req.body.name,
      abbreviation: req.body.abbreviation,
    };
    const requestOptions = {
      url : api.server + 'outsource',
      method : 'POST',
      json : postdata
    };
    request(
      requestOptions,
      (err, response, body) => {
        if (response.statusCode === 201) {
          res.redirect('/outsource?added=' + req.body.name);
        } else {
          util.showError(req, res, response.statusCode, body.message);
        }
      }
    );
  }
};

/* PUT updated outsource info, returns all outsource locations */
const doUpdateOutsource = function (req, res) {
  const postdata = {
    name: req.body.name,
    abbreviation: req.body.abbreviation,
  };
  const requestOptions = {
  url: api.server + '/outsource/' + req.params.outsourceID,
  method: 'PUT',
  json: postdata
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        res.redirect('/outsource?updated=' + req.body.abbreviation);
      } else {
        util.showError(req, res, response.statusCode, body.message);
      }
    }
  );
}

/* GET delete outsource, returns all outsource locations */
const doDeleteOutsource = function (req, res) {
  const requestOptions = {
    url : api.server + 'outsource/' + req.params.outsourceID,
    method : 'DELETE',
    json : {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 204) {
        res.redirect('/outsource?deleted=' + req.params.abbreviation);
      } else {
        util.showError(req, res, response.statusCode, body.message);
      }
    }
  );
};


module.exports = {
  outsource,
  doAddOutsource,
  doUpdateOutsource,
  doDeleteOutsource
};