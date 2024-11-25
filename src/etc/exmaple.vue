<!-- example.vue -->
<style scoped>
@import '/css/example.css';

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
</style>










<!--  -->
<script>
import { example } from '/js/example.js'; // Importing JS module

export default {
	name: 'example',
	mounted() {
		slide1(); // Call the imported function when the component is mounted
	}
};
</script>






<!-- /js/example.js  -->
<script>

export function example() {
	$(document).ready(function () {

	});
}

</script>
