<template>
	<div id="app">
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import router from "./router";
export default {
	name: 'app',
	mounted() {
	}
}
</script>

<style>
#app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 0;
	}
</style>
