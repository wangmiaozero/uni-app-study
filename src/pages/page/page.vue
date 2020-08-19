<template>
	<view>
		index页面传过来的值 ---{{avID}}
		<button type="primary" @click="open">去往page2</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avID:''
			}
		},
		
		// 页面加载
		onLoad(e) {
			console.log('page-2 onLoad',new Date())
			console.log(e)
			this.avID = e.av
		},
		// 页面渲染完成
		onReady(){
			console.log('page-2 onReady',new Date())
		},
		// 页面显示
		onShow(){
			console.log('page-2 onShow',new Date())
		},
		// 页面隐藏
		onHide() {
			console.log('page-2 onHide',new Date())
		},
		// 页面卸载
		onUnload() {
			console.log('page-2 onUnload',new Date())
		},
		methods: {
			open(){
				uni.navigateTo({
					url:'../page2/page2?av=uniapp3333'
				})
			},
		}
	}
</script>

<style>

</style>
