<script>
import NavHeader from './components/nav-header.vue';

export default {
	components: {
		NavHeader,
	},
};
</script>


<template>
	<div id="app">
		
		<nav-header />
		<router-view />
	</div>
</template>
