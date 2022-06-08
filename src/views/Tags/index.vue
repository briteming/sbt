<template>
	<div class = "tags">
		<div class = "tag_header animate__animated animate__fadeInDown">
			<div class = "bg_img" :style = "{backgroundImage: 'url(' + $config.TagOpts.bgImg + ')'}"></div>
			<div class = "tag_title animate__animated animate__fadeInDown">T A G S</div>
			<div class = "slope_left"></div>
			<div class = "slope_right"></div>
		</div>
		<div class = "tag_list">
			<span v-for = "(tag, id) in data.taglist" :key = "tag.id" @click = "clickTag (id)"
				:style = "{ 'background': tag.exist ? $config.color_main : 'white', 'color': tag.exist ? 'white' : $config.color_main }">
				{{ tag.name }}
			</span>
		</div>
		<div v-if = "data.posts.length > 0 && data.posts[0] != - 1">
			<Card :posts = "data.posts" />
		</div>
		<div v-else-if = "data.posts[0] == - 1" class = "tag_error animate__animated animate__bounceIn">
			<p>No more articles here～</p>
		</div>
		<Loading v-else />
	</div>
	<Footer :bgImg = "$config.TagOpts.bgImg" />
</template>

<script>
import Footer from '/src/components/Footer/index.vue'
import Loading from '/src/components/Loading/index.vue'
import Card from '/src/components/Card/index.vue'

import { useStore } from 'vuex'
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
		const data = reactive ({
			taglist: [],
			posts: [],
		});
		onBeforeMount (async () => {
			data.taglist = await store.dispatch ('queryTags');
			const posts = await store.dispatch ('queryPostList', {});
			data.posts = posts;
		})
		async function clickTag (id) {
			data.taglist[id].exist = ! data.taglist[id].exist;
			let filter = `&labels=`;
			data.posts = [];
			data.taglist.forEach ((item) => {
				if (item.exist)
					filter += `${item.name},`;
			});
			const posts = await store.dispatch ('queryPostList', {
				filter
			});
			if (posts.length > 0) data.posts = posts;
			else {
				data.posts[0] = - 1;
				console.log (data.posts[0]);
			}
		}
		return {
			data,
			clickTag,
		};
	},
};
</script>

<style lang = "scss" scoped>
@import './index.scss'
</style>