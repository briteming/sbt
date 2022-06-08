// From https://codepen.io/jonathansilva/pen/GhkAI/

<template>
	<div class="loader-wrapper">
		<div class="loader">
		    <div class="roller"></div>
		    <div class="roller"></div>
		</div>
		  
		<div id="loader2" class="loader">
		    <div class="roller"></div>
		    <div class="roller"></div>
		</div>
		  
		<div id="loader3" class="loader">
		    <div class="roller"></div>
		    <div class="roller"></div>
		</div>
	</div>
</template>

<style lang = "scss" scoped>
.loading {
	@include pc-layout {
		margin: 100px auto;
		width: 100px;
	}
}
@import './index.scss'
</style>