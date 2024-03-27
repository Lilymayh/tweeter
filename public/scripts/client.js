/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
	"user": {
		"name": "Newton",
		"avatars": "https://i.imgur.com/73hZDYK.png",
			"handle": "@SirIsaac"
		},
	"content": {
			"text": "If I have seen further it is by standing on the shoulders of giants"
		},
	"created_at": 1461116232227
}

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
		const $tweet = createTweetElement(tweet)

		$('#tweets-container').prepend($tweet)
	})
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet')
	//const createdAt = new Date(tweet.created_at) -> ahead of compass

	$tweet.append(`<header><img src="${tweet.user.avatars}"><h3>${tweet.user.name}</h3><span>${tweet.user.handle}</span></header>`);
  $tweet.append(`<p>${tweet.content.text}</p>`);
  //$tweet.append(`<footer><span>${createdAt.toDateString()}</span></footer>`);

  return $tweet;
}

renderTweets(data);