import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import config from './config.js'
import router from './router.js'
import store from './store.js'

import './styles/index.scss'
import '/public/font/font.scss'
import '/public/lib/fontello.scss'
import 'aos/dist/aos.css'

import hljs from 'highlight.js'
// import VueHighlightJS from 'vue-highlightjs'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/lib/common'
// import 'highlight.js/styles/base16/atelier-dune-light.css'
import 'highlight.js/styles/github.css'

const app = createApp(App);
app.config.globalProperties.$config = config;
app.use (router);
app.use (Vuex), app.use (store);
/*app.use ((app) => {
	app.directive ('highlight', {
		mounted (el) {
			let blocks = el.querySelectorAll ('pre code');
			blocks.forEach (hljs.highlightElement);
		}
	})
});*/
// app.use (VueHighlightJS);
app.use(hljsVuePlugin)
app.mount('#app');