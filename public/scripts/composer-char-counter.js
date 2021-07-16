const maxChars = 140;

$(document).ready(function() {
  // Auto update remaining Char count on input
  $("#tweet-text").on('input', function() {
    let input = $("#tweet-text").val();
    let charCount = maxChars - input.length;
    let counter = $(this).siblings("#underTextArea").children(".counter");
    counter.text(charCount);
    // Counter turns red when negative
    if (charCount < 0) {
      counter.css('color', '#FF0000');
    } else {
      counter.css('color', '#545149')
    }
    
    // Auto extends textbox when full
    if (this.scrollTop > 0) {
      $(this).css('height', '+=1.5');
    }
  })
});
