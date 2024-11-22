<template>
	<div class="nav-header">
		<a href="/" class="nav-logo">MOD</a>
		<div class="nav-menu">
			<router-link class="nav-link" to="/page1">Page1</router-link>
			<router-link class="nav-link" to="/page2">Page2</router-link>
			<router-link class="nav-link" to="/page3">Page3</router-link>
			<router-link class="nav-link" to="/page4">Page4</router-link>
		</div>
	</div>
	<div class="toggle-mode">
		<div class="bg-toggle">
			<div class="icon-toggle"></div>
		</div>
	</div>
</template>


<script>



</script>


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
	top: 40%;
	right: 10px;
}

.bg-toggle {
	position: relative;
	display: grid;
	place-items: center;
	width: 35px;
	aspect-ratio: 2/5;
	background-image: url(/src/assets/icon/bg-day.png);
	background-size: cover;
	background-repeat: no-repeat;
	border: 2px solid #ccc;
	border-radius: 30px;
}

body.dark-mode .bg-toggle {
	background-image: url(/src/assets/icon/bg-night.png) !important;
	border: 2px solid #fff;
}

.icon-toggle {
	background-image: url(/src/assets/icon/sun.png);
	background-size: cover;
	background-repeat: no-repeat;
	transform: translateY(-90%);
	height: 25px;
	aspect-ratio: 1;
	transition: .5s;
	border-radius: 50%;
}

body.dark-mode .icon-toggle{
	background-image: url(/src/assets/icon/moon.png);
	transform: translateY(90%);
}
</style>