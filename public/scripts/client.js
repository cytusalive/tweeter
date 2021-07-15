/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    user: {
      name: 'Rhoda Jacobs',
      avatar: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@MrsJacobs',
    },
    content: {
      text: 'Hello World!',
    },
    created_at: Date.now(),
  },
  {
    user: {
      name: 'Newton',
      avatar: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: Date.now() - 111111111,
  }
];

const createTweet = function(tweet) {
  const $tweet = $(
    `<article class="tweet">
      <header class="tweet-header">
        <div class="user">
          <img src="${tweet.user.avatar}" alt="user avatar">
          <span class="username">${tweet.user.name}</span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <p class="tweet-content">${tweet.content.text}</p>
      <footer class="tweet-footer">
        <span class="date">${new Date(tweet.created_at)}</span>
        <div class="icon-row">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`,
  )
  return $tweet;
}

const renderTweets = function(tweets, container) {
  for (const tweet of data) {
    container.append(createTweet(tweet));
  }
}

$(document).ready(() => {
  renderTweets(data, $(".tweet-container"));
});