


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



