<template>
    <div id = "app">
        <!-- <Header /> -->
        <Nav />
        <router-view />
        <!-- <Footer /> -->
    </div>
</template>

<script>
import Nav from "./components/Nav/index.vue"
import Footer from "./components/Footer/index.vue"

import { useRoute, useRouter } from 'vue-router'
import { watch, } from 'vue'

export default {
    name: "App",
    components:{
        Nav,
        Footer,
    },
    setup () {
        const route = useRoute ();
        watch (route, (nval, ovla) => {
            scrollTop ();
        })
        function scrollTop () {
            window.scrollTo({ top: 0 });
        }
    },
};
</script>

<style lang = "scss" scoped>
</style>