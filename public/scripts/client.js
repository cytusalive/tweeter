/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  loadTweets().then((allTweets) => {
    renderTweets(allTweets, $(".tweet-container"));
  });
  $("form").on("submit", function(event) {
    event.preventDefault();
    const tweetLen = $("#tweet-text")['0'].value.length;
    if (!tweetLen) {
      alert("Tweet cannot be empty.");
    } else if (tweetLen > 140) {
      alert("Tweet is too long.");
    } else {
      const formData = $(this).serialize();
      $.post("/tweets", formData, () => {
        loadTweets().then((allTweets) => {
          renderTweets(allTweets, $(".tweet-container"));
        });
        $("textarea").val('');
      })
    }
  })
});

