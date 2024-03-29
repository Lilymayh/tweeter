const renderTweets = function(tweets) {
	const tweetsContainer = $('.tweets')
	tweetsContainer.empty()

	tweets.forEach(tweet => {
		const $tweet = createTweetElement(tweet);

		$('.tweets').prepend($tweet);
	});
};

const createTweetElement = function(tweet) {

	const timeAgo = timeago.format(tweet.created_at);

	const html = `
	<article class="tweet">
		<header>
		<div class="avatar">
		<img src="${tweet.user.avatars}" alt="User Avatar">
			<h3>${tweet.user.name}</h3>
			</div>
			<span>${tweet.user.handle}</span>
		</header>
		<p>${$('<div>').text(tweet.content.text).html()}</p>
		<footer>
			<span class="time">${timeAgo}</span>
			<div class="icons">
				<i class="fa-solid fa-flag"></i>
				<i class="fa-solid fa-retweet"></i>
				<i class="fa-solid fa-heart"></i>
				</div>
		</footer>
	</article>
`;
	return $(html);
};

$('.tweet-form').on('submit', function(eventObj) {
	eventObj.preventDefault();
	const formData = $(this).serialize();

	const tweet = $('#tweet-text').val().trim();

	if(!isTweetValid(tweet)) {
		return;
	}
	console.log(formData)
	//AJAX post request
	$.post('http://localhost:8080/tweets', formData)
		.done((form) => {
			loadTweets(form);
		})
		.fail((jqXHR, status, error) => {
			console.error('Error submitting form:', status, error);
		});
});


const loadTweets = function(tweet) {
	$.ajax('http://localhost:8080/tweets', { method: 'GET' })
		.then(function(tweets) {
			renderTweets(tweets);

		})
		.fail(function(jqXHR, status, error) {
			console.error(status, error);
		});
};

loadTweets()

//function to throw an error if tweet has invalid input.
const isTweetValid = function(tweet) {
	if (tweet === "") {
			$('.error-message').text('Tweet can not be blank');
			$('.error-message').show()
			return false;
	}

	if (tweet.length > 140) {
			$('.error-message').text('Please keep your tweeting to under 140 characters!');
			$('.error-message').show()
			return false;
	}

	return true;
};

$('.tweet-text').on('keyup', function() {
  $('.error-message').hide();
});