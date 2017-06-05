<template>
	<section>
		<div>
			<div class="transition-div">
				<!-- <transition name="el-zoom-in-center"> -->
					<div v-show="show2" class="transition-box"></div>
				<!-- </transition> -->

				<!-- <transition name="el-zoom-in-top"> -->
					<div v-show="show2" class="transition-box"></div>
				<!-- </transition> -->

				<!-- <transition name="el-zoom-in-bottom"> -->
					<div v-show="show2" class="transition-box"></div>
				<!-- </transition> -->
					<div v-show="show2" class="transition-box"></div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				show2: true
			}
		}
	}
</script>

<style>
	.transition-div {
		display: flex;
		margin-top: 20px;
		height: 100px;
	}
  .transition-box {
    margin-bottom: 10px;
    width: 600px;
    height: 150px;
    border-radius: 4px;
    background-color: #20A0FF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 100px;
  }
</style>
