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
		<img src="/src/assets/icon/day-and-night2.png" alt="">
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
	top: 0;
	right: 0;
}

.toggle-mode img {
	aspect-ratio: 1;
	width: 50px;
}
</style>