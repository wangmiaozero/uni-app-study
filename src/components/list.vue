<template>
	<view class="list" @click="onClick">
		<text>{{name}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			name:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			onClick(){
				this.$emit('onClick',this.name)
			}
		}
	}
</script>

<style>
	.list{
		height: 50px;
		line-height: 50px;
		text-align: center;
		background-color: yellow;
		color:#fff;
	}
</style>
