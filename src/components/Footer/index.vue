<template>
	<!-- <footer :style="{backgroundImage: 'url(' + $config.backgroundImg + ')'}"> -->
	<footer>
		<div class = "bg_img" :style = "{backgroundImage: 'url(' + bgImg + ')'}"></div>
		<div class = "copyright" :style = "{ color: $config.footerColor }">
			2018 - 2021 {{ $config.title }} <br>
			Theme -
			<a rel = "refer" targt = "_blank" href = "" style = "color: white; text-decoration: none;"> Seraph </a>
			| {{ $config.subtitle }}
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer",
	props: {
		bgImg: String
	},
	setup () {

	},
};
</script>

<style lang = "scss" scoped>
@import './index.scss'
</style>