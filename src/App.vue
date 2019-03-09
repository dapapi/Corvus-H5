<template>
  <div id="app">
    <router-view v-wechat-title='$route.meta.title'/>
  </div>
</template>
<style lang="scss">
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
  background-size: 100% 1px;
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
.mint-field.is-textarea .mint-cell-title {
  padding: .2rem 0;
}
.mint-field.is-textarea .mint-cell-value {
  padding: .2rem .2rem .2rem 0;
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
.require{
  &::before{
    content:'*';
    display: inline-block;
    position: absolute;
    top:0.24rem;
    left:.1rem;
    min-height: .96rem;
    color:red;
    font-size: .44rem;
  }
}
.mint-cell{
  padding-left:0.14rem;
}
img{
  max-width:100%;
}
</style>
