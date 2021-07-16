/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function to prevent injection attacks
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const $tweet = $(
    `<article class="tweet">
      <header class="tweet-header">
        <div class="user">
          <img src="${tweet.user.avatars}" alt="user avatar">
          <span class="username">${tweet.user.name}</span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <p class="tweet-content">${escape(tweet.content.text)}</p>
      <footer class="tweet-footer">
        <span class="date">${timeago.format(tweet.created_at)}</span>
        <div class="icon-row">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`
    )
  return $tweet;
}

// Clears the loaded tweets 
// Then append a new array of tweets sorted by date
const renderTweets = function(tweets, container) {
  container.empty();
  const sortedTweets = tweets.sort((a, b) => b.created_at - a.created_at);
  for (const tweet of sortedTweets) {
    container.append(createTweetElement(tweet));
  }
}

const loadTweets = function() {
  return $.ajax("/tweets", { method: 'GET' });
}

$(document).ready(() => {
  // Hide errors on default
  $(".emptyError").hide();
  $(".fullError").hide();
  // Display existing tweets
  loadTweets().then((allTweets) => {
    renderTweets(allTweets, $(".tweet-container"));
  });
  // When new tweet is submitted, prevents refreshing or redirecting
  $("form").on("submit", function(event) {
    event.preventDefault();
    // Display errors if found any
    $(".emptyError").hide();
    $(".fullError").hide();
    const tweetLen = $("#tweet-text")['0'].value.length;
    if (!tweetLen) {
      $(".emptyError").slideDown();
    } else if (tweetLen > 140) {
      $(".fullError").slideDown();
    } else {
      // If no errors, send URL encoded data to create a tweet
      const formData = $(this).serialize();
      $.post("/tweets", formData, () => {
        loadTweets().then((allTweets) => {
          renderTweets(allTweets, $(".tweet-container"));
        });
        // Clears input box once tweeting succeeds 
        $("textarea").val('');
      })
    }
  })
});

