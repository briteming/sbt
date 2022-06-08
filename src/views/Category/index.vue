<template>
	<div class = "category">
		<div class = "cat_header animate__animated animate__fadeInDown">
			<div class = "bg_img" :style = "{backgroundImage: 'url(' + $config.CatOpts.bgImg + ')'}"></div>
			<div class = "cat_title animate__animated animate__fadeInDown">
				{{ data.cat.title }}
			</div>
			<div class = "slope_left"></div>
			<div class = "slope_right"></div>
		</div>
	</div>
	<Card v-if = "data.posts.length > 0 & data.posts[0] != - 1" :posts = "data.posts" />
	<div v-else-if = "data.posts[0] == - 1" class = "cat_error animate__animated animate__bounceIn">
		<p>No more articles here～</p>
	</div>
	<Loading v-else />
	<Footer :bgImg = "$config.CatOpts.bgImg" />
</template>

<script>
import Footer from '/src/components/Footer/index.vue'
import Loading from '/src/components/Loading/index.vue'
import Card from '/src/components/Card/index.vue'

import { useStore } from 'vuex'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive, computed, getCurrentInstance } from 'vue'

export default {
	name: 'Category',
	components: {
		Footer,
		Card,
		Loading,
	},
	setup () {
		const store = useStore ();
		const route = useRoute (), router = useRouter ();
		const data = reactive ({
			cat: {},
			posts: [],
		});
		onBeforeMount (async () => {
			const { number, cat } = route.params;
			if (cat) data.cat = JSON.parse (cat);
			else {
				data.cat = await store.dispatch ('queryCategory', {
					number
				});
			}
			const filter = `&milestone=${number}`
			const posts = await store.dispatch ('queryPostList', {
				filter
			});
			if (posts.length > 0) data.posts = posts;
			else data.posts[0] = - 1;
		})
		onBeforeRouteUpdate (async (to) => {
			const number = to.params.number;
			data.cat = {}, data.posts = [];
			data.cat = await store.dispatch ('queryCategory', {
				number
			});
			const filter = `&milestone=${number}`
			const posts = await store.dispatch ('queryPostList', {
				filter
			});
			if (posts.length > 0) data.posts = posts;
			else data.posts[0] = - 1;
		});
		return {
			data,
		};
	},
};
</script>

<style lang = "scss" scoped>
@import './index.scss'
</style>