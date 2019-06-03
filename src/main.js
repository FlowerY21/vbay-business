import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import echarts from 'echarts'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition)

import './common/js/common-plugins';
import './assets/css/index.css';

Vue.prototype.$echarts = echarts;
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
});






