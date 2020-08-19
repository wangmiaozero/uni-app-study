<script>
	export default {
		onLaunch: function() {
			console.log('App Launch,第一个生命周期跟小程序一样的,只会执行一次')
		},
		onShow: function() {
			console.log('App Show,和小程序一样每次页面加载都会执行一次')
		},
		onHide: function() {
			console.log('App Hide,当页面消失会触发')
		},
		onError(e){
			console.log('error',e)
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
