import Vue from 'vue'
import App from './App.vue'

import('@/assets/styles/index.css');

import scroll from './common/scroll.directive';
Vue.directive('scroll', scroll);

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
