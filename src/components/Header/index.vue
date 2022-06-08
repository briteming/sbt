<template>
	<header>
		<div class = "bg_img" :style = "{backgroundImage: 'url(' + data.banner + ')'}"></div>
		<div class = "banner_wave_1"></div>
		<div class = "banner_wave_2"></div>
		<div class = "site-title animate__animated animate__fadeInDown"> {{ proxy.$config.title }} </div>
		<div class = "site-subtitle"> {{ proxy.$config.quote }} </div>
	</header>
</template>

<script>
import { onMounted, reactive, computed, getCurrentInstance } from 'vue';
export default {
	setup () {
		const { proxy } = getCurrentInstance ();
		const data = reactive ({
			banner: proxy.$config.backgroundImg,
		});
		return { proxy, data };
	}
};
</script>

<style lang = "scss" scoped>
@import './index.scss';
</style>