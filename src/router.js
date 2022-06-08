import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home/index.vue'
import Archives from './views/Archives/index.vue'
import Tags from './views/Tags/index.vue'
import Category from './views/Category/index.vue'
import Link from './views/Link/index.vue'

import Post from './views/Post/index.vue'

const routerHistory = createWebHistory ();

const router = createRouter ({
	history: routerHistory,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/archives',
			name: 'archives',
			component: Archives,
		},
		{
			path: '/tags',
			name: 'tags',
			component: Tags,
		},
		{
			path: '/category/:number',
			name: 'category',
			component: Category,
		},
		{
			path: '/link',
			name: 'link',
			component: Link,
		},
		
		{
			path: '/post/:number',
			name: 'post',
			component: Post,
		},
	]
});
export default router;