<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
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
.iconfont {
  font-size: .28rem;
  margin: .12rem;
}
textarea:disabled, input:disabled {
  background-color: #fff;
}
</style>
