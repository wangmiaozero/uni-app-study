<script>
	import Vue from 'vue'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import CreateModules from "@/store/modules/createModules";
	export default {
		onLaunch: function(options) {
			console.log('App Launch')
			let name = "createModulesName_1";
			this.$store.registerModule(name, CreateModules, { preserveState: true });
			this.LOGIN_INFO('LOGIN_INFO')
			this.openVconsole(options)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['LOGIN_INFO']),
			openVconsole(options){
				if(options&&options.vconsole=='1'){
					if (document.querySelector('#__vconsole')) {
						document.querySelector('#__vconsole').style.display = 'block';
					} else {
						new VConsole();
					}
				}else{
					if(document.querySelector('#__vconsole')){
						document.querySelector('#__vconsole').style.display = 'none';
					}
				}
			},
		}
	}
</script>

<style>
	@import '/common/icon.css';
	@import "static/css/main.css";
	@import "static/css/animation.css";
	@import "static/css/icon.css";
	@import 'static/font/iconfont.css';
	@import 'static/css/common.css';
</style>