const maxChars = 140;

$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let input = $("#tweet-text").val();
    console.log(input);
    let charCount = maxChars - input.length;
    let counter = $(this).siblings("#underTextArea").children(".counter");
    counter.text(charCount);
    if (charCount < 0) {
      counter.css('color', '#FF0000');
    } else {
      counter.css('color', '#545149')
    }
  })
});
