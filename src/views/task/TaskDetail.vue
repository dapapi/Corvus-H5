<template>
  <div class="task-detail">
    <div class="title"><i class="iconfont icon-biaoti"></i>基本资料</div>
    <div class="item">关联资源：<span>艺人-周冬雨</span></div>
    <div class="item">负责人：<span>papi项目</span></div>
    <div class="item">参与人：<span>测试</span></div>
    <div class="item">开始时间：<span>测试</span></div>
    <div class="item">结束时间：<span>测试</span></div>
    <div class="item">优先级：<span>S</span></div>
    <div class="item">任务说明：<span>艺人-周冬雨</span></div>
    <div class="item">关联资源：<span>艺人-周冬雨</span></div>
    <div class="item">关联资源：<span>艺人-周冬雨</span></div>
    <div class="line"></div>
    <div class="title"><i class="iconfont icon-biaoti"></i>更新信息</div>
    <div class="item">录入人：<span>艺人-周冬雨</span></div>
    <div class="item">录入时间：<span>papi项目</span></div>
    <div class="item">最近更新人：<span>测试</span></div>
    <div class="item">更新时间：<span>测试</span></div>
    <div class="item">完成时间：<span>测试</span></div>
  </div>
</template>

<script>
export default {
  name: 'TaskDetail',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.task-detail {
  background: #fff;
  padding-bottom: .2rem;
  .title {
    color: #333;
    padding-top: .2rem;
    font-weight: 500;
  }
  .item {
    margin: .2rem;
    color: #666;
    span {
      color: #333;
    }
  }
  .line {
    width: 100%;
    height: 0;
    margin: 0 .2rem;
    border-bottom: 1px solid #D8D8D8;
  }
}

</style>
