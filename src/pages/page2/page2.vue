<template>
	<view>
		page2 
		<button type="primary" @click="back">返回</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				// 返回多级页面
				uni.navigateBack({
					delta:2
				})
			}
		}
	}
</script>

<style>

</style>
