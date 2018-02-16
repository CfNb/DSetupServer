// Dynamic Fields, adds an additional field
$(".add-more").click(function(e){
  e.preventDefault();

  // current field:
  const id = $(this).data("id");
  const cur = parseInt($(this).data("count"), 10);
  const next = 1 + cur;

  // duplicate input 0, updating id
  const divToClone = $(this).prev(".input-group").attr("id");
  $("#" + divToClone).clone(true).attr("id", id + next)
    .find("input:text").val("").attr("name", id + '[' + next + ']').end()
    .insertBefore(this);

  // increment next in html
  $(this).data("count", next);
});

// Dynamic Fields, removes a field
$('.remove-me').click(function(e){
  e.preventDefault();
  const divToRemove = $(this).closest(".input-group").attr("id");
  const siblings = $("#" + divToRemove).siblings(".input-group").length;
  if (siblings > 0) {
    // remove input
    $("#" + divToRemove).remove();
  } else {
    // reset input's value
    $("#" + divToRemove).find("input:text").val("");
  }
  // enable form update button
  $(".update").attr('disabled', false);
});

// Enable form submit button on field change
$("form").on('input change', function() {
  $('.btn-primary', this).attr('disabled', false);
});

// Toggle scrape info on colors page
$(".toggleScrapeData").click(function(e) {
  e.preventDefault();
  $(".scrapeInfo", this.closest("form")).toggle();
}); 