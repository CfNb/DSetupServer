// for refernce: http://jqueryvalidation.org/

$(function() {
  $.validator.addMethod("customerNum", function(value, element) {
      return this.optional( element ) || /^[a-zA-Z]{4}\d{2}$/.test( value );
    }, 'Format must be "AAAA11"'
  );
  
  $.validator.addMethod("contactEmail", function(value, element) {
      return this.optional( element ) || /.*@.*\..*/.test( value );
    }, 'Enter a valid Email Address'
  );
  
  $.validator.addClassRules({
    customerNumber: {
      required: true,
      customerNum: true
    },
    customerName: {
      required: true
    },
    customerContact: {
      email: true,
      contactEmail: true
    }
  });
  
  // Initialize form validation
  $("form[name='addCustomer']").validate({
    submitHandler: function(form) {
      form.submit();
    }
  });
  
  $("form[name='editCustomer']").validate({
    submitHandler: function(form) {
      form.submit();
    }
  });
});