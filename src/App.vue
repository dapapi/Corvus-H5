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
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
  background-color: #f3f4f5;
}
.mint-cell {
  min-height: .96rem;
}
.mint-cell-wrapper {
  font-size: .32rem;
  padding: 0 .2rem;
  background-size: 100% 1px;
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
// D8D8D8
</style>
