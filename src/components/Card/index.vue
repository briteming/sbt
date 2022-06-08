<template>
	<div class = "card animate__animated animate__fadeInUp">
		<div v-for = "(post, id) in posts.slice (0, data.exist)" :key = "post.id">
			<router-link :to = "{ name: 'post', params: { number: post.number, post: JSON.stringify (post) } }">
				<div class = "block">
					<div class = "sign">
						<div>{{ post.summary[0] }}</div>
					</div>
					<div class = "post_content">
						<div class = "post_title">{{ post.title }}</div>
						<div class = "post_description">
							<p v-html = "post.summary"></p>
						</div>
					</div>
				</div>
			</router-link>
		</div>
		<div class = "button_more" v-if = "data.exist < posts.length" @click = "LoadMorePosts">
			<p>More</p>
		</div>
	</div>
</template>

<script>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive, computed, getCurrentInstance } from 'vue'

export default {
	name: "Card",
	props: {
		posts: Array,
	},
	setup () {
		const data = reactive ({
			exist: 1,
			limit: 1,
		});
		function LoadMorePosts () {
			data.exist += data.limit;
			sessionStorage.exist = data.exist;
		}
		return {
			data,
			LoadMorePosts,
		};
	}
};
</script>

<style lang = "scss" scoped>
@import './index.scss'
</style>