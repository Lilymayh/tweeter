$(document).ready(function() {
	$('.new-tweet textarea').on('keyup', function(event) {
		const textarea = $(this);
		//traverse up the dom > then find .counter
		const counter = textarea.closest('.new-tweet').find('.counter');

		const maxTweet = 140;
		const currentLength = textarea.val().length;
		const remainingLength = maxTweet - currentLength;

		counter.text(remainingLength);

		//add or remove styling class based on the character length =>
		if (remainingLength < 0) {
			counter.addClass('negativeCount');
		} else {
			counter.removeClass('negativeCount');
		}
	});
});


