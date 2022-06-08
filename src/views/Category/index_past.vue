<template>
	<div class = "category">
		<!-- <div class = "bg_img" :style = "{backgroundImage: 'url(' + $config.CatOpts.bgImg + ')'}"></div>
		<div class = "title">{{ $config.CatOpts.title }}</div>
		<div class = "content">
			<div class = "cat_block" v-for = "item in data.list" :key = "item.id">

			</div>
		</div> -->
		<div class = "cat_header animate__animated animate__fadeInDown">
			<div class = "bg_img" :style = "{backgroundImage: 'url(' + $config.CatOpts.bgImg + ')'}"></div>
			<div class = "cat_title animate__animated animate__fadeInDown">
				{{ data.cat.title }}
			</div>
			<div class = "cat_subtitle">
				{{ data.cat.description }}
			</div>
		</div>
		<!-- <article> -->
		<div v-if = "data.list.length">
			<div class = "cat_card" v-for = "item in data.list" :key = "item.id">
				<p> {{ item.title }} </p>
			</div>
		</div>
		<!-- </article> -->
	</div>
	<Footer :bgImg = "$config.CatOpts.bgImg" />
</template>

<script>
import Footer from '/src/components/Footer/index.vue'
import Loading from '/src/components/Loading/index.vue'

import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive, computed, getCurrentInstance } from 'vue'

export default {
	name: 'Category',
	components: {
		Footer,
	},
	setup () {
		const store = useStore ();
		const route = useRoute (), router = useRouter ();
		const data = reactive ({
			cat: {},
			list: [],
		});
		onBeforeMount (async () => {
			const { id, cat } = route.params;
			data.cat = JSON.parse (cat);
			console.log (data.cat);
			const filter = `&milestone=${data.cat.number}`
			const posts = await store.dispatch ('queryPostList', {
				filter
			});
			console.log (posts);
		})
		return {
			data,
		};
	}
};
</script>

<style lang = "scss" scoped>
@import './index.scss'
</style>