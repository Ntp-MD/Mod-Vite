<template>
	<div id="container_box_slide">
		<div id="box_slide">
			<div class="box_items">
				<div class="box_items_img">
					<img src="@/assets/images/1.jpg">
				</div>
				<article>
					<span>Lorem, ipsum dolor.</span>
					<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci beatae mollitia, ut itaque
						nihil quia fugiat distinctio libero possimus eveniet.</div>
				</article>
			</div>
			<div class="box_items">
				<div class="box_items_img">
					<img src="@/assets/images/2.jpg">
				</div>
				<article>
					<span>Lorem, ipsum dolor.</span>
					<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci beatae mollitia, ut itaque
						nihil quia fugiat distinctio libero possimus eveniet.</div>
				</article>

			</div>
			<div class="box_items">
				<div class="box_items_img">
					<img src="@/assets/images/3.jpg">
				</div>
				<article>
					<span>Lorem, ipsum dolor.</span>
					<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci beatae mollitia, ut itaque
						nihil quia fugiat distinctio libero possimus eveniet.</div>
				</article>

			</div>
			<div class="box_items">
				<div class="box_items_img">
					<img src="@/assets/images/4.jpg">
				</div>
				<article>
					<span>Lorem, ipsum dolor.</span>
					<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci beatae mollitia, ut itaque
						nihil quia fugiat distinctio libero possimus eveniet.</div>
				</article>

			</div>
			<div class="box_items">
				<div class="box_items_img">
					<img src="@/assets/images/5.jpg">
				</div>
				<article>
					<span>Lorem, ipsum dolor.</span>
					<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci beatae mollitia, ut itaque
						nihil quia fugiat distinctio libero possimus eveniet.</div>
				</article>
			</div>
			<div class="box_items">
				<div class="box_items_img">
					<img src="@/assets/images/6.jpg">
				</div>
				<article>
					<span>Lorem, ipsum dolor.</span>
					<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci beatae mollitia, ut itaque
						nihil quia fugiat distinctio libero possimus eveniet.</div>
				</article>
			</div>
		</div>
		<div id="dot-indicators"></div>


	</div>


</template>



<style scoped>
@import '@/css/slide.css';
</style>



<script>

import { slide1 } from '@/js/slide.js'; // Importing JS module

export default {
	name: 'Slide',
	mounted() {
		slide1(); // Call the imported function when the component is mounted
	}
};
</script>
