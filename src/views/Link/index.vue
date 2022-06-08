<template>
	<div class = "link">
		<div class = "link_header animate__animated animate__fadeInDown">
			<div class = "bg_img" :style = "{backgroundImage: 'url(' + $config.LinkOpts.bgImg + ')'}"></div>
			<div class = "link_title animate__animated animate__fadeInDown">L I N K</div>
			<div class = "slope_left"></div>
			<div class = "slope_right"></div>
		</div>
		<div class = "link_content">
			<div class = "link_post">
				<Markdown v-if = "data.posts.length > 0 && data.posts[0] != - 1" :content = "data.posts[0].body" />
				<Loading v-else />
			</div>
			<div class = "link_cat" v-for = "(cat, index) in $config.LinkOpts.friends" :key = "cat.id">
				<div class = "top">
					{{ cat.name }}
				</div>
				<div class = "bottom">
					<a class = "links" v-for = "(link, id) in cat.comprise" :key = "link.id" :href = "link.link" target = "_blank">
						<div class = "avatar">
							<img :src = "link.avatar">
						</div>
						<div class = "description">
							<div class = "upper">{{ link.name }}</div>
							<div class = "lower">
								<p>{{ link.subtitle }}</p>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
	<Footer :bgImg = "$config.LinkOpts.bgImg" />
</template>

<script>
import Footer from '/src/components/Footer/index.vue'
import Loading from '/src/components/Loading/index.vue'
import Markdown from '/src/components/Markdown/index.vue'

import { useStore } from 'vuex'
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive, computed, getCurrentInstance } from 'vue'

export default {
	name: 'Category',
	components: {
		Footer,
		Loading,
		Markdown,
	},
	setup () {
		const store = useStore ();
		const data = reactive ({
			posts: [],
		});
		onBeforeMount (async () => {
			const type = `link`;
			const posts = await store.dispatch ('queryPage', {
				type,
			});
			if (posts.length > 0) data.posts = posts;
			else data.posts[0] = - 1;
		})
		return {
			data,
		};
	},
};
</script>

<style lang = "scss" scoped>
@import './index.scss'
</style>