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
  Picker
  } from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store/index'
import CheckList from '@/components/CheckList'
import FileUpload from '@/components/FileUpload'
import Selector from '@/components/Selector'
import AddClient from '@/components/AddClient'
import Regional from '@/components/Regional'
import FastClick from 'fastclick'
import VueWechatTitle from 'vue-wechat-title'

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
Vue.component('Toast',Toast)
Vue.use(VueWechatTitle)
Vue.use(Toast)

// 自定义组件
Vue.component('CheckList', CheckList)
Vue.component('FileUpload', FileUpload)
Vue.component('Selector', Selector)
Vue.component('AddClient', AddClient)
Vue.component('Regional', Regional)

FastClick.attach(document.body);
var passiveSupported = false;
try {
  var options = Object.defineProperty({}, "passive", {
    get: function () {
      passiveSupported = true;
    }
  });
  window.addEventListener("test", null, options);
} catch (err) { }
function fn() {
  console.log("fn")
}
document.addEventListener("mousewheel", fn, passiveSupported ? { passive: true } : false)

document.addEventListener("touchstart", fn, passiveSupported ? {
  passive: true
} : false)
document.addEventListener("touchmove", fn, passiveSupported ? {
  passive: true
} : false)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
