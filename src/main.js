import Vue from 'vue'
import {
  Button,
  Cell,
  Popup,
  Checklist,
  Radio,
  Field,
  DatetimePicker,
  Toast,
  Picker,
  Search,
  Indicator, 
  InfiniteScroll,
  MessageBox
  } from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store/index'
import CheckList from '@/components/CheckList'
import FileUpload from '@/components/FileUpload'
import Selector from '@/components/Selector'
import AddClient from '@/components/AddClient'
import Regional from '@/components/Regional'
import VueWechatTitle from 'vue-wechat-title'
import 'scrolling-element'
import FastClick from 'fastclick'


Vue.config.productionTip = false
// mint组件
Vue.component('Button', Button)
Vue.component('Cell', Cell)
Vue.component('Popup', Popup)
Vue.component('Field', Field)
Vue.component(Radio.name, Radio)
Vue.component(Checklist.name, Checklist)
Vue.component('DatetimePicker', DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component('Search', Search)
// Vue.component('MessageBox', MessageBox)

Vue.use(VueWechatTitle)
Vue.use(InfiniteScroll);

// 自定义组件
Vue.component('CheckList', CheckList)
Vue.component('FileUpload', FileUpload)
Vue.component('Selector', Selector)
Vue.component('AddClient', AddClient)
Vue.component('Regional', Regional)

// 全局方法
window.toast = Toast
window.Indicator = Indicator
window.MessageBox = MessageBox
FastClick.attach(document.body) 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
