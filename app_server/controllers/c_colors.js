/* Controller for Outsource pages */
const request = require('request');
const api = require('./apiColors');
const util = require('./c_utilities');


/* GET color page, listing all colors */
/* Paginate to 500 colors per page */
const _renderColors = function(req, res, responseBody) {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "api lookup error";
    responseBody = [];
  } else if (!responseBody.length) {
      message = 'no colors found';
  } else {
    message = req.query.error;
  }
  
  responseBody = util.sortObjsBy(responseBody, 'name');
  
  const perPage = 250;
  const colorCount = responseBody.length;
  const page = parseInt(req.params.page) || 1;
  const pages = Math.ceil(colorCount / perPage);
  
  const start = (perPage * page) - perPage;
  const end = (perPage * page) + 1;
  const last = page === pages ? colorCount : (perPage * page);
  
  const pageColors = responseBody.slice(start, end);
  
  res.render('colors', {
    title: 'Colors',
    pageHeader: {
      title: 'Color List',
      actioncall: 'Add, remove, or edit colors. Showing ' + (start + 1) + ' thru ' + last + ' of ' + colorCount + ' records.',
    },
    page: page,
    pages: pages,
    colors: pageColors,
    message: message,
    updated: req.query.updated,
    deleted: req.query.deleted,
    added: req.query.added
  });
}

const colors = function (req, res) {
  const requestOptions = {
    url : api.server + 'color',
    method : 'GET',
    json : {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      _renderColors(req, res, body);
    }
  );
};

/* POST to add color, returns all colors */
const doAddColor = function (req, res) {
  
  //console.log(req);
  
  if (!req.body.name || !req.body.kind || !req.body.recommend) {
    res.redirect('/colors?error=' + 'all fields are required');
  } else {
    const postdata = {
      name: req.body.name,
      kind: req.body.kind,
      recommendOrange: req.body.recommend === 'recommendOrange',
      recommendGreen: req.body.recommend === 'recommendGreen',
      recommendViolet: req.body.recommend === 'recommendViolet'
    };
    
    //console.log(postdata)
    
    const requestOptions = {
      url : api.server + 'color',
      method : 'POST',
      json : postdata
    };
    request(
      requestOptions,
      (err, response, body) => {
        if (response.statusCode === 201) {
          res.redirect('/colors?added=' + req.body.name);
        } else {
          util.showError(req, res, response.statusCode, body.message);
        }
      }
    );
  }
};

/* PUT update color info, redirect all colors */
const doUpdateColor = function (req, res) {
  
  //console.log(req);
  
  const postdata = {
    name: req.body.name,
    kind: req.body.kind,
    recommendOrange: req.body.recommend === 'recommendOrange',
    recommendGreen: req.body.recommend === 'recommendGreen',
    recommendViolet: req.body.recommend === 'recommendViolet'
  };
  
  //console.log(postdata);
  
  const requestOptions = {
  url: api.server + '/color/' + req.params.colorID,
  method: 'PUT',
  json: postdata
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        res.redirect('/colors?updated=' + req.body.name);
      } else {
        util.showError(req, res, response.statusCode, body.message);
      }
    }
  );
}

/* GET delete color, redirect to all colors */
const doDeleteColor = function (req, res) {
  const requestOptions = {
    url : api.server + 'color/' + req.params.colorID,
    method : 'DELETE',
    json : {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 204) {
        res.redirect('/colors?deleted=' + req.params.name);
      } else {
        util.showError(req, res, response.statusCode, body.message);
      }
    }
  );
};


module.exports = {
  colors,
  doAddColor,
  doUpdateColor,
  doDeleteColor
};