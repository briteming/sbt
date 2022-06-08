<template>
	<div id = "home">
		<Header />
		<!-- <Transition name = "fade-transform" mode = "out-in"> -->
		<div v-if = "data.posts.length">
			<div class = "home_wrapper">
				<!-- <div class = "content" :style = "{backgroundImage: 'url(' + $config.backgroundImg + ')'}"> -->
				<div class = "content">
					<article class = "animate__animated animate__fadeInUp" v-for = "(post, id) in data.posts.slice (0, data.exist)" :key = "post.id">
					<!-- <article v-for = "(post, id) in data.posts.slice (0, data.exist)" :key = "post.id"> -->
						<router-link :to = "{ name: 'post', params: { number: post.number, post: JSON.stringify (post) } }" @click = "saveScrollTop">
							<div v-if = "! (id % 2)">
								<div class = "border_small" style = "left: 0; bottom: 0; writing-mode: vertical-lr;">{{ post.title }}</div>
								<div class = "border_large" style = "right: 0; top: 0">
									<div class = "post_content">
										<p v-html = "post.summary"></p>
									</div>
									<div class = "post_prop">
										<i class = "fa-fw fas fa-clock"></i>
										<span> {{ post.created_at }} | </span>
										<i class = "fa-fw fas fa-folder" v-if = "post.milestone"></i>
										<span v-if = "post.milestone"> {{ post.milestone.title }}</span>
									</div>
								</div>
							</div>
							<div v-else>
								<div class = "border_small" style = "right: 0; bottom: 0; writing-mode: vertical-rl;">{{ post.title }}</div>
								<div class = "border_large" style = "left: 0; top: 0">
									<div class = "post_content">
										<p v-html = "post.summary"></p>
									</div>
									<div class = "post_prop">
										<i class = "fa-fw fas fa-clock"></i>
										<span> {{ post.created_at }} | </span>
										<i class = "fa-fw fas fa-folder"></i>
										<span v-if = "post.milestone"> {{ post.milestone.title }}</span>
									</div>
								</div>
							</div>
						</router-link>
					</article>
				</div>
				<div class = "button_more" v-if = "data.exist < data.posts.length" @click = "LoadMorePosts">
					<p>More</p>
				</div>
			</div>
		</div>
		<Loading v-else />
	<!-- </Transition> -->
	</div>
	<Footer :bgImg = "$config.backgroundImg" />
</template>

<script>
// import MarkDown from '/src/components/MarkDown/index.vue';
import Header from "/src/components/Header/index.vue"
import Footer from "/src/components/Footer/index.vue"
import Loading from "/src/components/Loading/index.vue"

import { useStore } from 'vuex'
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive, computed, getCurrentInstance } from 'vue'

export default {
	name: "Home",
	components: {
		Header,
		Footer,
		Loading,
	},
	setup () {
		const store = useStore ();
		const data = reactive ({
			exist: 1,
			limit: 10,
			posts: [],
		});
		data.exist = sessionStorage.exist ? sessionStorage.exist : 1;
		// queryPostList
		onBeforeMount (async () => {
			const posts = await store.dispatch ('queryPostList', {});
			data.posts = posts;
		});
		onUpdated (() => {
			if (sessionStorage.scrollTop)
				window.scrollTo ({ top: sessionStorage.scrollTop, behavior: 'smooth' });
		});
		function LoadMorePosts () {
			data.exist += data.limit;
			sessionStorage.exist = data.exist;
		}
		function saveScrollTop () {
			sessionStorage.scrollTop = scroll ().top;
		}
		return {
			data,
			LoadMorePosts,
			saveScrollTop,
		};
	}
};
</script>

<style lang = "scss" scoped>
@import './index.scss'
</style>