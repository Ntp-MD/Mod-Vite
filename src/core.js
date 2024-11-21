
/*

$(document).ready(async () => {
	$('html *[id]').each(async function () {
		for (const folder of ['components', 'views']) {
			let path = `https://ntp-md.github.io/MOD/${folder}/${this.id}.html`;
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
	if (window.location.hostname === 'ntp-md.github.io') {
		$('link[rel="stylesheet"]').each(function () {
			var href = $(this).attr('href');
			$(this).attr('href', href.replace(/^\/(.*)$/, 'https://ntp-md.github.io/MOD/$1'));
		});
		$('img').each(function () {
			var src = $(this).attr('src');
			$(this).attr('src', src.replace(/^\/(.*)$/, 'https://ntp-md.github.io/MOD/$1'));
		});
		$('script').each(function () {
			var src = $(this).attr('src');

			if (src && src.startsWith('/')) {
				$(this).attr('src', src.replace(/^\/(.*)$/, 'https://ntp-md.github.io/MOD/$1'));
			}
		});
	}
});

*/