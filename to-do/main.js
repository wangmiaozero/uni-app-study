import Vue from 'vue'
import App from './App'
import './mixin/MyOtion.js'

Vue.config.productionTip = false

import store from './store/index.js'
Vue.prototype.$store = store;

import TOOL from './common/js/utils/tool'
Vue.prototype.$TOOL = TOOL;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
