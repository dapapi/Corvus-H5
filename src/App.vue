<template>
  <div id="app">
    <router-view v-wechat-title='$route.meta.title'/>
  </div>
</template>
<style lang="scss">
html{
  font-size: 48px;
}
body.modal-open {
    position: fixed;
    width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: .28rem;
}
body {
  margin: 0;
  padding: 0;
  background-color: #f3f4f5;
}
.mint-cell {
  min-height: .96rem;
}
.mint-cell-allow-right::after {
  right: .28rem;
}
.mint-cell-wrapper {
  font-size: .32rem;
  padding: 0 .2rem;
  background:none;
  border-bottom:1px solid #eaeaea;
  // background-size: 100% 1px;
  input, textarea {
    text-align: right;
  }
}
.mint-cell-value {
  color: #666;
}
.mint-field .mint-cell-title {
  width: 2.01rem;
}
.mint-cell-value.is-link {
  margin-right: .48rem;
}
.mint-field .mint-cell-value{
  padding: .01rem 0;
}
.mint-field.is-textarea .mint-cell-wrapper{
  align-items:stretch!important;
}
.mint-field.is-textarea .mint-cell-title {
  padding: .2rem 0;
}
.mint-field.is-textarea .mint-cell-value {
  padding: 0px;
}
.mint-cell-value textarea {
  resize: none;
}
.iconfont {
  font-size: .28rem;
  margin: .12rem;
}
textarea:disabled, input:disabled {
  background-color: #fff;
}
//解决datePicker  有的手机不显示问题
.picker-items{width:100%}
/*公共样式*/
ul,li,p{
  padding:0px;
  margin: 0px;
}
li{
  list-style: none
}
.clearfix::after,.clearfix::before{
    display: block;
    clear: both;
    content: "";
}
.float-left{
  float: left;
}
.float-right{
  float: right;
}
a{
  text-decoration: none;
  color:#333;
  &:hover{
    color:#333
  };
  &:visited{
    color:#333
  }

}
.avatar {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  margin-left: .1rem;
}
.require .mint-cell-text{
  &::after{
    content:'*';
    // display: inline-block;
    position: relative;
    top:0.1rem;
    left:.05rem;
    min-height: .96rem;
    color:red;
    font-size: .44rem;
  }
}
img{
  max-width:100%;
  pointer-events: auto

}
.mint-popup{
  overflow:scroll;
  width:100%;
  max-height:100vh
}
.mint-field-clear{
  display: none
}
.mint-cell-wrapper input, .mint-cell-wrapper textarea{
  color:#666
}
.mint-popup, .mint-popup-bottom {
  max-height: 75%;
  overflow-y: scroll;
}
</style>
