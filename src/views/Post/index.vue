<template>
	<div id = "post">
		<div v-if = "data.post">
			<div class = "post_header animate__animated animate__fadeInDown" :style = "{backgroundImage: 'url(' + data.post.cover.src + ')'}">
				<div class = "post_title animate__animated animate__fadeInDown">
					{{ data.post.title }}
				</div>
				<div class = "post_header_meta">
					<!-- <div class = "review">
						<i class = "far fa-eye"></i>
						<span>{{data.post.created_at}}</span>
					</div> -->
					<div class = "archive">
						<i v-if = "data.post.milestone" class = "far fa-folder-open"></i>
						<span v-if = "data.post.milestone">{{data.post.milestone.title}}</span>
					</div>
				</div>
			</div>
			<article class = "animate__animated animate__fadeInUp">
				<!-- <p v-html = "data.post.description"></p> -->
				<MarkDown :content = "data.post.body" target = "#post" />
			</article>
			<div class = "post_footer">
				<div class = "post_meta">
					<span v-if = "data.post.labels" v-for = "(tag, id) in data.post.labels">
						{{ tag.name }}
					</span>
				</div>
				<div class = "post_license">
					<div class = "license_text">
						<i class = "fa fa-creative-commons"></i>
						All articles in this blog are licensed under
						<a href = "https://creativecommons.org/licenses/by-nc-sa/4.0/">
							CC BY-NC-SA 4.0
						</a>
						unless stating additionally.
					</div>
				</div>
			</div>
		</div>
		<!-- <Loading v-else /> -->
	</div>
	<Footer v-if = "data.post.cover" :bgImg = "data.post.cover.src" />
</template>

<script>
import Footer from '/src/components/Footer/index.vue'
import MarkDown from '/src/components/MarkDown/index.vue'
// import { mavonEditor } from 'mavon-editor'
import Loading from '/src/components/Loading/index.vue'

import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ref, onBeforeMount, onMounted, reactive, computed, getCurrentInstance } from 'vue'

export default {
	name: "Post",
	components: {
		Loading,
		MarkDown,
		Footer,
	},
	setup () {
		const store = useStore ();
		const route = useRoute (), router = useRouter ();
		const data = reactive ({
			post: '',
		});
		onBeforeMount (async () => {
			const { number, post } = route.params; // Acquire post
			if (post) data.post = JSON.parse (post);
			else data.post = await store.dispatch ('queryPost', { number });
			console.log (data.post.cover.src);
		});
		onMounted (() => {
			var katex = document.getElementsByClassName ("katex");
			var arr = Array.from (katex);
			arr.forEach ((item) => {
				var trash = item.firstElementChild || item.firstChild;
				item.removeChild (trash);
			});
		});
		return { data };
	}
};
</script>

<style lang = "scss" scoped>
@import './index.scss'
</style>