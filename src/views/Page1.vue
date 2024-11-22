<template>
	<div>

	</div>
	<Slide />
</template>

<script>
// Import the Slide component from the components folder
import Slide from '@/components/Slide.vue';

export default {
	name: 'Page1',
	components: {
		Slide, // Register the Slide component so you can use it in the template
	},
};
</script>