<template>
	<div class = "about">
		<div class = "content animate__animated animate__bounceIn">
			<div class = "about_header">
				<div class = "icon_list" style = "left: 0">
					<a class = "icons" v-for = "(item, id) in data.menu.slice (0, 2)" :key = "item.id" :href = "item.link" target = "_blank">
						<i :class = "[item.icon, data.menu[id].shake ? 'animate__animated animate__shakeY' : '']" @mouseover = "changeState (id)" @mouseleave = "changeState (id)"></i>
					</a>
				</div>
				<div class = "icon_list" style = "right: 0">
					<a class = "icons" v-for = "(item, id) in data.menu.slice (2, 4)" :key = "item.id" :href = "item.link" target = "_blank">
						<i :class = "[item.icon, data.menu[id + 2].shake ? 'animate__animated animate__shakeY' : '']" @mouseover = "changeState (id + 2)" @mouseleave = "changeState (id + 2)"></i>
					</a>
				</div>
				<div class = "avatar">
					<img :src = "$config.AboutOpts.avatar">
					<div class = "description" style = "font-size: 27px"> {{ $config.title }} </div>
				</div>
			</div>
			<div class = "seperate_line"></div>
			<div class = "about_content">
				<Markdown v-if = "data.posts.length > 0" :content = "data.posts[0].body" />
				<Loading v-else />
			</div>
		</div>
	</div>
</template>

<script>
import Loading from '/src/components/Loading/index.vue'
import Markdown from '/src/components/Markdown/index.vue'

import { useStore } from 'vuex'
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive, computed, getCurrentInstance } from 'vue'

export default {
	name: "About",
	components: {
		Loading,
		Markdown,
	},
	setup () {
		const { proxy } = getCurrentInstance ();
		const { AboutOpts } = proxy.$config;
		const store = useStore ();
		const data = reactive ({
			posts: [],
			menu: [
				{ name: 'Github', link: AboutOpts.github, icon: 'fab fa-github-square', shake: false, },
				{ name: 'Mail', link: AboutOpts.mail, icon: 'fas fa-envelope-square', shake: false, },
				{ name: 'Twitter', link: AboutOpts.twitter, icon: 'fab fa-twitter-square', shake: false, },
				{ name: 'Zhihu', link: AboutOpts.zhihu, icon: 'fab fa-zhihu', shake: false, },
			],
		});
		
		onBeforeMount (async () => {
			const type = `about`;
			const posts = await store.dispatch ('queryPage', {
				type
			});
			if (posts.length > 0) data.posts = posts;
			else data.posts[0] = - 1;
			console.log (data.posts[0].body);
		});

		function changeState (id) {
			data.menu[id].shake = ! data.menu[id].shake;
		}

		return {
			data,
			changeState,
		};
	}
};
</script>

<style lang = "scss" scoped>
@import './index.scss'
</style>