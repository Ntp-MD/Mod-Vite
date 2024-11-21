

/*
$(document).ready(async () => {
	$('html *[id]').each(async function () {
		for (const folder of ['components', 'views']) {
			let path = `https://ntp-md.github.io/Mod-Vite/${folder}/${this.id}.html`;
			let content = await $.get(path).catch(() => null);
			if (!content) {
				path = `/${folder}/${this.id}.html`;
				content = await $.get(path).catch(() => null);
			}
			if (content) {
				$(this).html(content);
			}
		}
	});
});



$(document).ready(function () {
	if (localStorage.getItem('darkMode') === 'enabled') {
		$('body').addClass('dark-mode');
	}
});

$(document).on('click', function (e) {
	if ($(e.target).closest('.toggle-mode').length) {
		$('body').toggleClass('dark-mode');

		// Save the mode in local storage
		if ($('body').hasClass('dark-mode')) {
			localStorage.setItem('darkMode', 'enabled');
		} else {
			localStorage.setItem('darkMode', 'disabled');
		}
	}
});



*/