<template>
		<!-- :class="content" -->
		<!-- :class="['background','content']" -->
		<!-- :class="{'background':isShow}" -->
	<view :class="['background','content']">
		<image class="logo" src="/static/logo.png"   mode="aspectFit"></image>
		<view>
			
			<text class="title">{{title}}</text>
		</view>
		<button @click="henledOpen">去往page</button>
		<navigator url="../page/page">组件跳转-跟小程序一样</navigator>
		<button type="primary" @click="hanledgetSystemInfo">getSystemInfo</button>
		<button @click="henledGetsytemInfoSync">getSystemInfoSync</button>
		<list v-for="(item,index) in list" :key="index" :name="item" @onClick="onClick"></list>
	</view>
	<!-- mode="aspectFit" 保持纵横比缩放图片 -->
</template>

<script>
	import list from '@/components/list.vue'
	export default {
		components:{
			list
		},
		data() {
			return {
				list:['uni-app','vue','wechat'],
				title: 'Hello',
				content:'content',
				background:'background',
				isShow:false
			}
		},
		// 页面加载
		onLoad() {
			// 这边变量不存在,所以被onError 捕捉到了
			console.log(a)
			console.log('page onLoad',new Date())
		},
		// 页面渲染完成
		onReady(){
			console.log('page onReady',new Date())
		},
		// 页面显示
		onShow(){
			console.log('page onShow',new Date())
		},
		// 页面隐藏
		onHide() {
			console.log('page onHide',new Date())
		},
		// 页面卸载
		onUnload() {
			console.log('page onUnload',new Date())
		},
		
		/* 
			两个页面 A页面 B页面
			A----> B
			1. A onHide
			2. B onLoad
			3. B onShow
			4. B onReady
			
			B----> A
			
			1. B onUnload
			2. A onShow
		 
		 */
		methods: {
			henledOpen(){
				// 打开新页面
				uni.navigateTo({
					url:'../page/page?av=uniapp2333'
				})
				// 跟小程序一样 会关闭当前页面
				/* uni.redirectTo({
					url:'../page/page'
				}) */
				// 跟小程序一样 会所有关闭页面
				/* uni.reLaunch({
					url:'../page/page'
				}) */
				// 跟小程序一样 只能跳转tabBar
				uni.switchTab({
					url:'../test-page/test-page'
				})
			},
			hanledgetSystemInfo(){
				// 获取设备信息
				uni.getSystemInfo({
						success(e){
							console.log(e)
						}
				})
			},
			henledGetsytemInfoSync(){
				// 获取头部信息
			  let info = uni.getSystemInfoSync();
			  console.log(info)
			},
			onClick(row){
				console.log(row)
			}
		}
	}
</script>

<style>
	/* 
	
	 设计稿 750px  100px
	 750*100/750 =100rpx
	 
	 设计稿 640px 100px
	 750*100/640 =117rpx
	 
	 */
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.background{
		background-color: #007AFF;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
