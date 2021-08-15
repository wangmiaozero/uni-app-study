import Vue from 'vue'
// 混入
Vue.mixin({
	data() {
		return {
		}
	},
	onLaunch(){},
	onLoad(option) {
		Vue.prototype.$myOtion = option || {}
	},
	onShow(option) {
		
	}
})