<template>
	<nav class = "animate__animated animate__fadeIn" id = "nav">
		<div class = "about" v-if = "$config.AboutOpts.display">
			<div class = "menu menu_about" @click = "handleAbout">
				<i class = "fa-fw fas fa-at"></i>
				<div class = "message"> About </div>
			</div>
		</div>
		<router-link v-for = "item in true_menu" :key = "item.path" :to = "item.path">
			<div class = "menu" :class = "{ 'menu_category': (item.title == 'Category') }">
				<!-- <i :class = "'fa-fw fas fa-${item.icon}'"></i> -->
				<i :class = "setClass ('fa-fw fas fa-', item.icon)"></i>
				<div class = "message"> {{ item.title }} </div>
			</div>
		</router-link>
	</nav>
	<div id = "category">
		<div v-if = "data.cat_appear_once" class = "category animate__animated" :class = "[data.cat_exist ? 'animate__fadeInUp' : 'animate__fadeOutDown']">
			<div v-for = "(item, id) in data.list" :key = "item.id">
				<router-link :to = "{ name: 'category', params: { number: item.number, cat: JSON.stringify (item) } }">
					<!-- <div :style = "{ width: '100%', borderBottom: id < data.list.length - 1 ? 'solid 1px grey' : 'none' }"> -->
					<div class = "category_content">
						<div class = "category_word">{{ item.title }}</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
	<About v-if = "data.about_exist"/>
</template>

<script>
import About from '/src/components/About/index.vue'

import { useStore } from 'vuex'
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, reactive, computed, getCurrentInstance } from 'vue'
export default {
	name: "Nav",
	components: {
		About,
	},
	setup () {
		const { proxy } = getCurrentInstance ();
		const { ArcOpts, TagOpts, CatOpts, LinkOpts, AboutOpts } = proxy.$config;
		const data = reactive ({
			menu: [
			 	{ path: '/', display: true, icon: 'home', title: "Home" },
			 	{ path: '/archives', display: ArcOpts.display, icon: 'archive', title: "Archives" },
			 	{ path: '/tags', display: TagOpts.display, icon: 'tags', title: "Tags" },
			 	{ path: '/', display: CatOpts.display, icon: 'folder-open', title: "Category" },
			 	{ path: '/link', display: LinkOpts.display, icon: 'link', title: "Link" },
			],
			list: [],
			cat_appear_once: false,
			cat_exist: false,
			about_exist: false,
		});
		const true_menu = computed (() => {
			return data.menu.filter ((item) => item.display);
		});
		function setClass (prefix, index) {
			return prefix + index;
		};
		onMounted (() => {
			let nav = document.getElementById ("nav");
			let category = document.getElementById ("category");
			let pH = document.documentElement.clientHeight;
			nav.style.top = (pH / 2) + "px";
			category.style.top = (pH / 2) + "px";
			window.onscroll = function () {
				let nh = scroll ().top;
				nav.style.top = (pH / 2 + nh) + "px";
				category.style.top = (pH / 2 + nh) + "px";
			}

			let cat = document.getElementsByClassName ("menu_category");
			cat[0].onclick =  function (event) {
				event.preventDefault ();
				data.cat_appear_once = true;
				data.cat_exist = ! data.cat_exist;
			};
		});

		// Category
		const store = useStore ();
		onBeforeMount (async () => {
			const list = await store.dispatch ('queryCategoryList');
			data.list = list;
		})

		// About
		function handleAbout () {
			data.about_exist = ! data.about_exist;
		}

		return { proxy, data, true_menu, setClass, handleAbout };
	}
};
</script>

<style lang = "scss" scoped>
@import './index.scss';
</style>