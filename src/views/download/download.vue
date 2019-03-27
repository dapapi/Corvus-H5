<template>
  <div class="main">
    <div class="top"></div>
    <div class="logo"></div>
    <div class="desc">
      <h2>泰洋系Group</h2>
      <h3>版本：1.0</h3>
    </div>
    <div class="btn-group">
      <img src="../../assets/img/android.png" alt="安卓下载" />
      <br />
      <img src="../../assets/img/iphone.png" alt="苹果下载" />
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
  background-color: #fff;
  text-align: center;
  .top {
    height: 80px;
    background-image: url('../../assets/img/bg.png');
    background-repeat: repeat-x;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 400px) {
    .top {
      height: 40px;
      background-size: 100%;
    }
  }
  .logo {
    margin: 0 auto;
    width: 159px;
    height: 167px;
    background-image: url('../../assets/img/logo.png');
    background-size: 100%;
  }
  .desc {
    h2 {
      color: #333;
      font-size: 26px;
      font-weight: 400;
    }
    h3 {
      font-size: 18px;
      margin-top: -10px;
      color: #999;
      font-weight: normal;
    }
  }
  .btn-group {
    margin-top: 60px;
    img {
      width: 204px;
      height: 42px;
    }
    img:nth-of-type(2) {
      margin-top: 20px;
    }
  }
}
</style>
