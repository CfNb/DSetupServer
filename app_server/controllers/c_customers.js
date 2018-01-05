/* Controller for Customer pages */
const request = require('request');
const api = require('./apiOptions');
const util = require('./c_utilities');

/* GET customers page, listing all customer */
const _renderCustomers = function(req, res, responseBody) {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "api lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'no customers found';
    }
  }
  res.render('customers', {
    title: 'Customers',
    pageHeader: {
      title: 'Customer List',
      actioncall: 'Select a Customer to view or edit details',
    },
    customers: responseBody,
    message: message,
    deleted: req.query.del
  });
}

const customers = function (req, res) {
  const requestOptions = {
    url : api.server + 'customers',
    method : 'GET',
    json : {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      /* manipulate data if needed...
      let data = body;
      if (response.statusCode === 200 && data.length) {
        
      }
      */
      _renderCustomers(req, res, body);
    }
  );
};


/* GET customer page. */
const _renderCustomer = function (req, res, responseBody) {
  res.render('customer', { 
    title: 'Customer ' + responseBody.number,
    pageHeader: {
      title: responseBody.name,
      actioncall: 'Edit customer information below or select a job to view its details',
    },
    customer: responseBody
  });
}

const customer = function (req, res) {
  const requestOptions = {
    url : api.server + 'customers/' + req.params.customerNumber,
    method : 'GET',
    json : {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        _renderCustomer(req, res, body);
      } else {
        util._showError(req, res, response.statusCode, body.message);
      }
    }
  );
};


/* GET customer creation page */
const addCustomer = function (req, res) {
  res.render('addCustomer', {
    title: 'New Customer',
    pageHeader: {
      title: 'Add a New Customer',
      actioncall: 'Enter details to create a new Customer'
    },
    error: req.query.err
  });
};

/* POST customer creation page data, adding customer to database */
const doAddCustomer = function (req, res) {
  if (!req.body.name || !req.body.number) {
    res.redirect('/customer/add?err=val');
  } else {
    const postdata = {
      name: req.body.name,
      number: req.body.number,
    };
    const requestOptions = {
      url: api.server + '/customers',
      method: 'POST',
      json: postdata
    };
    request(
      requestOptions,
      (err, response, body) => {
        if (response.statusCode === 201) {
          res.redirect('/customer/' + body.number);
        } else {
          util._showError(req, res, response.statusCode, body.message);
        }
      }
    );
  }
};


/* DELETE a customer, only allowed if customer has no job content */
const doDeleteCustomer = function (req, res) {
  //check if customer has any jobs
  
  const requestOptions = {
    url: api.server + '/customers/' + req.params.customerID,
    method: 'DELETE',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 204) {
        res.redirect('/customers?del=' + req.params.customerNumber);
      } else {
        util._showError(req, res, response.statusCode, body.message);
      }
    }
  );
}



module.exports = {
  customer,
  customers,
  addCustomer,
  doAddCustomer,
  doDeleteCustomer
};