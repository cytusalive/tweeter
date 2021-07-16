// Scrolls to top then focuses on textbox when clicked
$(document).ready(() => {
  $(".new").on("click", () => {
    window.scrollTo(0, 0);
    $("#tweet-text").focus();
  })
})