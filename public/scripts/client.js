const renderTweets = function(tweets) {
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
			<img src="${tweet.user.avatars}" alt="User Avatar">
			<h3>${tweet.user.name}</h3>
			<span>${tweet.user.handle}</span>
		</header>
		<p>${tweet.content.text}</p>
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

$('.tweets').on('submit', function(eventObj) {
	eventObj.preventDefault();
	formData = $(this).serialize();

	const tweet = $('.tweet-text').val().trim();

	if (tweet === "") {
		alert('Tweet must contain content');
		return;
	}

	if (tweet.length > 140) {
		alert('Error: cAnnot exceed 140 characters!');
		return;
	}

	//AJAX post request
	$.post('/tweets', formData)
		.done((form) => {
			console.log('Form submitted:', form);
			loadTweets();
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