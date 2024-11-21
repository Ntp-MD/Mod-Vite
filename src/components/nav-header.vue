<style scoped>


.nav-header {
	display: grid;
	grid-template-columns: 20% 80%;
	align-items: center;
	width: 80vw;
	height: 5vw;
	margin: 0 auto;
}

.nav-logo {
	font-size: 3vw;
	font-weight: 700;
}

.nav-menu {
	display: flex;
	justify-content: flex-end;
	gap: 1vw;
}

.toggle-mode {
	cursor: pointer;
	position: fixed;
	top: 0;
	right: 0;
}

.toggle-mode img {
	aspect-ratio: 1;
	width: 50px;
}
</style>

<template>
	<div class="nav-header">
		<a href="/" class="nav-logo">MOD</a>
		<div class="nav-menu">
			<a class="nav-link" href="">Home</a>
			<a class="nav-link" href="">About</a>
			<a class="nav-link" href="">Service</a>
			<a class="nav-link" href="">Contact</a>
		</div>
	</div>
	<div class="toggle-mode">
		<img src="/src/assets/icon/day-and-night2.png" alt="">
	</div>
</template>


<script>

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


</script>
