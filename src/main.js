import Vue from 'vue'
import { Button, Cell, Popup, Checklist, Radio, Field, DatetimePicker } from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store/index'
import CheckList from '@/components/CheckList'
import FileUpload from '@/components/FileUpload'
import Selector from '@/components/Selector'
import AddClient from '@/components/AddClient'

Vue.config.productionTip = false
// mint组件
Vue.component('Button', Button)
Vue.component('Cell', Cell)
Vue.component('Popup', Popup)
Vue.component('Field', Field)
Vue.component(Radio.name, Radio)
Vue.component(Checklist.name, Checklist)
Vue.component('DatetimePicker', DatetimePicker)

// 自定义组件
Vue.component('CheckList', CheckList)
Vue.component('FileUpload', FileUpload)
Vue.component('Selector', Selector)
Vue.component('AddClient', AddClient)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
