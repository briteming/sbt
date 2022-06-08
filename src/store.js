import { createStore } from 'vuex'
import {
	queryPost,
	queryPostList,
	queryCategory,
	queryCategoryList,
	queryTags,
	queryPage,
} from './utils/service.js'
import {
	formatPost,
	formatCategory,
 } from './utils/format'

export default createStore ({
	state: {

	},

	mutations: {

	},

	actions: {
		async queryPost (context, { number }) {
			const data = await queryPost (number);
			return formatPost (data);
		},
		async queryPostList (context, payload) {
			const data = await queryPostList (payload);
			data.forEach (formatPost);
			// console.log (data);
			return data;
		},
		async queryCategory (context, { number }) {
			const data = await queryCategory (number);
			return formatCategory (data);
		},
		async queryCategoryList (context) {
			const data = await queryCategoryList ();
			data.forEach (formatCategory);
			return data;
		},
		async queryTags (context) {
			const data = await queryTags ();
			const filter = ['about', 'link'];
			data.forEach ((item) => {
				item.exist = false;
			});
			return data.filter ((item) => ! filter.includes (item.name));
		},
		async queryPage (context, { type }) {
			const data = await queryPage (type);
			return data;
		},
	},
});