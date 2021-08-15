<template>
	<view class="content">
		<!-- 状态栏 -->
		<view v-if="list.length !== 0" class="todo-header">
			<!-- 状态栏的左侧 -->
			<view class="todo-header__left">
				<text class="active-text">{{text}}</text>
				<text class="todo-header__cnt">{{listData.length}}条</text>
			</view>
			<!-- 皮肤 -->
			<view class="switchContainer" >
				 	<button class="cu-btn bg-blue shadow" @tap="showModal" data-target="gridModal">主题色</button>
			</view>
			
			<!-- 状态栏的右侧 -->
			<view class="todo-header__right">
				<view class="todo-header__right-item" :class="{'active-tab':activeIndex === -1}" @click="tab(-1)">全部</view>
				<view class="todo-header__right-item" :class="{'active-tab':activeIndex === 0}" @click="tab(0)">待办</view>
				<view class="todo-header__right-item" :class="{'active-tab':activeIndex === 1}" @click="tab(1)">已完成</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<radio-group class="block" @change="Gridchange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in themeStatusList" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.key}}</view>
								<radio class="round" :value="item.value"
								 :class="themeStatus==item.value?'checked':''" 
								 :checked="themeStatus==item.value"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
		<!-- 没有数据的状态 -->
		<view v-if="list.length === 0" class="default">
			<view class="image-default">
				<image :src="$TOOL.toolGetLocalImg('nodata')" mode="aspectFit"></image>
			</view>
			<view class="default-info">
				<view class="default-info__text">您还没有创建任何待办事项</view>
				<view class="default-info__text">点击下方+号创建一个吧</view>
			</view>
		</view>
		<!-- 内容 -->
		<view v-else class="todo-content">
			<!-- todo--finish -->
			<view class="todo-list" :class="{'todo--finish':item.status==1}" v-for="(item,index) in listData" :key="index" @click="finish(item.id)">
				<view class="todo-list__checkbox">
					<view class="checkbox"></view>
				</view>
				<view class="todo-list__content">
					{{item.content}}
				</view>
				<view @click="dele(item.id)" class="todo-list__close cuIcon-close"></view>
			</view>
		</view>
		<!-- 创建按钮 -->
		<view class="create-todo" @click="create">
			<text class="iconfont icon-jia" :class="{'create-todo-active':textShow}"></text>
		</view>
		<!-- 输入框 -->
		<view v-if="active" class="create-content" :class="{'create--show':textShow}">
			<view class="create-content-box">
				<!-- input 输入 -->
				<view class="create-input">
					<input type="text" v-model="value" placeholder="请输入您要创建的事项" />
				</view>
				<!-- 发布按钮 -->
				<view class="create-button" @click="add">
					创建
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import selectSwitch from "@/components/xuan-switch/xuan-switch.vue";
	export default {
		components:{
				selectSwitch
		},
		data() {
			return {
				active: false,
				text: '全部',
				textShow: false,
				modalName: null,
				themeStatusList:[
					{
						key:"白天",
						value:'1'
					},
					{
						key:"晚上",
						value:'0'
					}
				]
			}
		},
		onLoad() {

		},
		computed: {
			list(){
				return this.$store.getters['doto']['list']
			},
			activeIndex(){
				return this.$store.getters['doto']['activeIndex']
			},
			themeStatus(){
				return this.$store.getters['doto']['themeStatus']
			},
			value:{
				get:function(){
					return this.$store.getters['doto']['value']
				},
				set:function(newData){
					this.$store.commit('SET_DOTO',{ key:'value',value:newData })
				}
			},
			listData() {
				let list = JSON.parse(JSON.stringify(this.list))
				let newList = []

				// 点击 全部
				if (this.activeIndex === -1) {
					this.text = '全部'
					return list
				}
				// 点击 待办事项
				if (this.activeIndex === 0) {
					list.forEach((item) => {
						if (item.status==0) {
							newList.push(item)
						}
					})
					this.text = '待办'
					return newList
				}
				// 点击 已完成
				if (this.activeIndex === 1) {
					list.forEach((item) => {
						if (item.status==1) {
							newList.push(item)
						}
					})
					this.text = '已完成'
					return newList
				}
				return []
			},
		},
		mounted() {
			if(this.themeStatus==1){
				this.$TOOL.updataProperty('--white-back-color','#EBECF0')
				this.$TOOL.updataProperty('--white-text-color','#A2B1CA')
				this.$TOOL.updataProperty('--white-title-color','#6C7A92')
				this.$TOOL.updataProperty('--white-shadow-color','0, 0, 0')
				this.$TOOL.updataProperty('--white-light-color','255, 255, 255')
				this.$TOOL.updataProperty('--white-border-active-color','#EEE')
				this.$TOOL.updataProperty('--white-main-action-left','#779DFF')
				this.$TOOL.updataProperty('--white-main-action-right','#9EB8FF')
				this.$TOOL.updataProperty('--white-background-color','#ddd')
				this.$TOOL.updataProperty('--color','#779DFF')
			}else if(this.themeStatus==0){
				this.$TOOL.updataProperty('--white-back-color','#2E3237')
				this.$TOOL.updataProperty('--white-text-color','#707174')
				this.$TOOL.updataProperty('--white-title-color','#A7A9AA')
				this.$TOOL.updataProperty('--white-shadow-color','0, 0, 0')
				this.$TOOL.updataProperty('--white-light-color','80, 80, 80')
				this.$TOOL.updataProperty('--white-border-active-color','#444')
				this.$TOOL.updataProperty('--white-main-action-left','#D43C0B')
				this.$TOOL.updataProperty('--white-main-action-right','#BF8A10')
				this.$TOOL.updataProperty('--white-background-color','#26282B')
				this.$TOOL.updataProperty('--color','#fff')
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.$store.commit('SET_DOTO',{ key:'themeStatus',value:e.detail.value })
				console.log(this.themeStatus,'themeStatus')
				if(this.themeStatus==1){
					this.$TOOL.updataProperty('--white-back-color','#EBECF0')
					this.$TOOL.updataProperty('--white-text-color','#A2B1CA')
					this.$TOOL.updataProperty('--white-title-color','#6C7A92')
					this.$TOOL.updataProperty('--white-shadow-color','0, 0, 0')
					this.$TOOL.updataProperty('--white-light-color','255, 255, 255')
					this.$TOOL.updataProperty('--white-border-active-color','#EEE')
					this.$TOOL.updataProperty('--white-main-action-left','#779DFF')
					this.$TOOL.updataProperty('--white-main-action-right','#9EB8FF')
					this.$TOOL.updataProperty('--white-background-color','#ddd')
					this.$TOOL.updataProperty('--color','#779DFF')
				}else if(this.themeStatus==0){
					this.$TOOL.updataProperty('--white-back-color','#2E3237')
					this.$TOOL.updataProperty('--white-text-color','#707174')
					this.$TOOL.updataProperty('--white-title-color','#A7A9AA')
					this.$TOOL.updataProperty('--white-shadow-color','0, 0, 0')
					this.$TOOL.updataProperty('--white-light-color','80, 80, 80')
					this.$TOOL.updataProperty('--white-border-active-color','#444')
					this.$TOOL.updataProperty('--white-main-action-left','#D43C0B')
					this.$TOOL.updataProperty('--white-main-action-right','#BF8A10')
					this.$TOOL.updataProperty('--white-background-color','#26282B')
					this.$TOOL.updataProperty('--color','#fff')
				}
				
			},
			// 打开输入框
			create() {
				if (this.active) {
					this.close()
				} else {
					this.open()
				}
			},
			// 打开 动画
			open() {
				this.active = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.textShow = true
					}, 50)
				})
			},
			// 关闭动画
			close() {
				this.textShow = false
				this.$nextTick(()=>{
					setTimeout(() => {
						this.active = false
					}, 350)
				})
			},
			// 发布
			add() {
				console.log(this.value);
				if (this.value === '') {
					uni.showToast({
						title: "请输入内容",
						icon: 'none'
					})
					return
				}
				let data = {
					id: this.$TOOL.newGuid(),
					content: this.value,
					status:0,// 0 待办 1 已完成
				};
				this.$store.commit('ADD_DOTO',{ key:'list',value:data })
				this.$store.commit('SET_DOTO',{ key:'value',value:'' })
				this.close()
			},
			// 点击列表触发
			finish(id) {
				console.log(id)
				this.$store.commit('UPDATA_DOTO',{ key:'list',id:id })
			},
			dele(id){
				this.$store.commit('DELETE_DOTO',{ key:'list',id:id })
			},
			tab(index) {
				this.$store.commit('SET_DOTO',{ key:'activeIndex',value:index })
			}
		}
	}
</script>

<style lang="scss" scoped >
	page{
		 background-color: var(--white-background-color);
	}
	.todo-header {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		font-size: 24rpx;
		color: #333333;
		width: 100%;
		height: 90rpx;
		background-color: var(--white-back-color);
		box-sizing: border-box;
		box-shadow: 14rpx 14rpx 30rpx 0rpx rgba(var(--white-shadow-color), .3), -14rpx -14rpx 30rpx 0rpx rgba(var(--white-light-color), 1), inset -2rpx -2rpx 4rpx 0rpx rgba(var(--white-shadow-color), .3), inset 2rpx 2rpx 4rpx 0rpx rgba(var(--white-light-color), 1);
		z-index: 10;
	}
	.switchContainer{
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		uni-switch .wx-switch-input:not([class*="bg-"]), uni-switch .uni-switch-input:not([class*="bg-"]){
			background-color: blue;
		}
	}
	.todo-header__left {
		.todo-header__cnt{
			color: #ccc;
		}
	}
	.default-info__text{
		color: var(--white-title-color);
	}
	.active-text {
		font-size: 28rpx;
		color: var(--color);
		padding-right: 20rpx;

	}

	.todo-header__right {
		flex-shrink: 0;
		display: flex;
	}

	.todo-header__right-item {
		padding: 0 5px;
		color: #ccc;
		&:active{
			opacity: .5;
		}
	}

	.active-tab {
		color: var(--color)
	}

	.todo-content {
		position: relative;
		padding-top: 100rpx;
		padding-bottom: 100px;
	}

	.todo-list {
		position: relative;
		display: flex;
		align-items: center;
		padding: 30rpx;
		margin: 30rpx;
		color: var(--color);
		box-sizing: border-box;
		font-size: 28rpx;
		border-radius: 10px;
		background-color: var(--white-back-color);
		box-shadow: 14rpx 14rpx 30rpx 0rpx rgba(var(--white-shadow-color), .3), -14rpx -14rpx 30rpx 0rpx rgba(var(--white-light-color), 1), inset -2rpx -2rpx 4rpx 0rpx rgba(var(--white-shadow-color), .3), inset 2rpx 2rpx 4rpx 0rpx rgba(var(--white-light-color), 1);
		overflow: hidden;
		.todo-list__content {
			display: flex;
			flex: 1;
			overflow: hidden;
		}
		.todo-list__close{
			width: 40rpx;
			height: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	
	.todo-list:after {
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		left: 0;
		width: 10rpx;
		background: var(--color);
	}

	.todo-list__checkbox {
		padding-right: 30rpx;
	}

	.checkbox {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: #FFFFFF;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
	}

	.todo--finish .checkbox {
		position: relative;
		background: #eee;
	}

	.todo--finish .checkbox:after {
		content: '';
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 50%;
		background: #CFEBFD;
		box-shadow: 0 0 4rpx 0px rgba(0, 0, 0, 0.2) inset;
	}

	

	.todo--finish.todo-list:before {
		content: '';
		position: absolute;
		width: 75%;
		top: 50%;
		//bottom: 0;
		left: 80rpx;
		//right: 40rpx;
		height: 4rpx;
		margin: auto 0;
		background: #bdcdd8;
	}

	.todo--finish.todo-list:after {
		background: #cccccc;
	}

	.create-todo {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 40rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: var(--white-back-color);
		border: 4rpx solid var(--white-back-color);
		box-shadow: 14rpx 14rpx 30rpx 0rpx rgba(var(--white-shadow-color), .3), -14rpx -14rpx 30rpx 0rpx rgba(var(--white-light-color), 1), inset -2rpx -2rpx 4rpx 0rpx rgba(var(--white-shadow-color), .3), inset 2rpx 2rpx 4rpx 0rpx rgba(var(--white-light-color), 1);
		&:active{
			box-shadow: 14rpx 14rpx 30rpx 0rpx rgba(var(--white-shadow-color), .3), -14rpx -14rpx 30rpx 0rpxrgba(var(--white-light-color), 1), inset 8rpx 8rpx 16rpx 0rpx rgba(var(--white-shadow-color), .3), inset -8rpx -8rpx 16rpx 0rpx rgba(var(--white-light-color), 1) !important;
			border: 4rpx solid var(--white-border-active-color);
			text-shadow: 0rpx 0rpx 4rpx rgba(var(--white-text-color), .3);
		}
	}

	.icon-jia {
		font-size: 60rpx;
		color: var(--color);
	}

	.create-content {
		position: fixed;
		bottom: 190rpx;
		left: 40rpx;
		right: 40rpx;
		transition: all 0.3s;
		opacity: 0;
		transform: scale(0) translateY(200%);
		
	}

	.create--show {
		opacity: 1;
		transform: scale(1) translateY(0);
	}

	.create-content-box {
		display: flex;
		flex: 1;
		align-items: center;
		padding-right: 0;
		text-indent: 30rpx;
		border-radius: 100rpx;
		overflow: hidden;
		background: #ebecf0;
		z-index: 2;
		position: relative;
	}

	.create-input {
		width: 100%;
		color: #8a92a5;
		height: 100rpx;
		display: flex;
		flex: 1;
		justify-content: flex-start;
		align-items: center;
		box-shadow: inset -6rpx -6rpx 12rpx #ffffff, inset 6rpx 6rpx 12rpx #d1d9e6;
		input{
			width: 500rpx;
		}
	}

	.create-button {
		position: absolute;
		right: -12%;
		top: 50%;
		transform: translate(-50%,-50%);
		width: 160rpx;
		height: 100rpx;
		display: flex;
		padding-right: 20rpx;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		border-radius: 100rpx;
		font-size: 32rpx;
		color: var(--color);
		box-shadow: -4rpx 0rpx 4px 2rpx rgba(0, 0, 0, 0.1);
		&:active{
			box-shadow: 14rpx 14rpx 30rpx 0rpx rgba(var(--white-shadow-color), .3), -14rpx -14rpx 30rpx 0rpxrgba(var(--white-light-color), 1), inset 8rpx 8rpx 16rpx 0rpx rgba(var(--white-shadow-color), .3), inset -8rpx -8rpx 16rpx 0rpx rgba(var(--white-light-color), 1) !important;
			border: 4rpx solid var(--white-border-active-color);
			text-shadow: 0px 0rpx 4rpx rgba(var(--white-text-color), .3);
		}
	}

	.create-content:after {
		content: '';
		position: absolute;
		right: 0;
		left: 0;
		bottom: -16rpx;
		margin: 0 auto;
		width: 40rpx;
		height: 40rpx;
		background: #ebecf0;
		transform: rotate(45deg);
		//box-shadow: inset -6rpx -6rpx 12rpx #ffffff, inset 6rpx 6rpx 12rpx #d1d9e6;
		z-index: -1;
	}

	.default {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image-default {
		display: flex;
		justify-content: center;
		width: 200rpx;
		height: 200rpx;
	}

	.image-default image {
		width: 100%;
		height: 100%;
	}

	.default-info {
		text-align: center;
		font-size: 28rpx;
		color: #CCCCCC;
	}

	.icon-jia {
		transition: transform 0.3s;
	}

	.create-todo-active {
		transform: rotate(135deg);
	}
</style>
