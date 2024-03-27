const data = {
	"user": {
		"name": "Newton",
		"avatars": "https://i.imgur.com/73hZDYK.png",
		"handle": "@SirIsaac"
	},
	"content": {
		"text": "If I have seen further it is by standing on the shoulders of giants"
	},
	"created_at": 1461116232227
};

const renderTweets = function(tweets) {
	tweets.forEach(tweet => {
		const $tweet = createTweetElement(tweet);

		$('.tweets').prepend($tweet);
	});
};

const createTweetElement = function(tweet) {
	//const createdAt = new Date(tweet.created_at) -> ahead of compass

	const html = `
	<article class="tweet">
		<header>
			<img src="${tweet.user.avatars}" alt="User Avatar">
			<h3>${tweet.user.name}</h3>
			<span>${tweet.user.handle}</span>
		</header>
		<p>${tweet.content.text}</p>
		<footer>
			<span>10 Day Ago</span>
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

	//AJAX post request
	$.post('/submit-url', formData)
		.done((form) => {
			console.log('Form submitted:', form);
		})
		.fail((status, error) => {
			console.error('Error submitting form:', status, error);
		});
});


renderTweets([data]);