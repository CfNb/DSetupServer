// Dynamic Fields, add additional fields, removes fields
$(".add-more").click(function(e){
    e.preventDefault();
  
    // current field:
    const cur = parseInt($("#dynamic-fields").attr("count"), 10);
    const next = 1 + cur;
  
    // button to replace cur's add button
    ////let removeBtn = '<div class="input-group-append">'
    let removeBtn = '<button id="remove' + cur + '" class="btn btn-secondary remove-me" type="button">'
    removeBtn += '<i class="fa fa-minus" aria-hidden="true"></i></button>';
  
    let newIn = '<div class="input-group dynamic-field' + next + '">';
    newIn += '<input class="form-control" id="contact' + next + '" name="contact' + next + '" type="text" placeholder="name@address.com" aria-label="email contact">';
    newIn += '<div id="dynamic-field' + next + '" class="input-group-append"><button class="btn btnsecondary add-more</div>';
  
    // parse html strings on the fly:
    const newInput = $(newIn);
    const removeButton = $(removeBtn);

    // add new input-group after cur 
    $('.dynamic-field' + cur).after(newInput);

    // move add-more button from cur to newInput
    $(".add-more").appendTo($("#dynamic-field" + next));

    // add remove button to cur
    $("#dynamic-field" + cur).html(removeButton);
  
    // increment next in html
    $("#dynamic-fields").attr("count", next);
  
    $('.remove-me').click(function(e){
        e.preventDefault();
        var contactNum = this.id.charAt(this.id.length-1);
        var contactID = "#contact" + contactNum;
        $(this).remove();
        $(contactID).remove();
    });
});