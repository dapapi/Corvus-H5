<template>
  <div class="client-detail">
    <div class="title"><i class="iconfont icon-biaoti"></i>客户信息</div>
    <div class="item">
      <span class="left">公司名称：</span>
      <span class="right">{{ clientDetail.company }}</span>
    </div>
    <div class="item">
      <span class="left">级别：</span>
      <span class="right">{{ clientDetail.grade ? clientLevelArr.find( n => clientDetail.grade === n.value ).name : '' }}</span>
    </div>
    <div class="item">
      <span class="left">负责人：</span>
      <span class="right">{{ clientDetail.principal && clientDetail.principal.data.name }}</span>
    </div>
    <div class="item">
      <span class="left">地区：</span>
      <span class="right">{{ clientDetail.province }} {{ clientDetail.city }} {{ clientDetail.district }}</span>
    </div>
    <div class="item">
      <span class="left">详细地址：</span>
      <span class="right">{{ clientDetail.address }}</span>
    </div>
    <div class="item">
      <span class="left">规模：</span>
      <span class="right">{{ clientDetail.size ? clientLevelArr.find( n => clientDetail.size === n.value ).name : '' }}</span>
    </div>
    <div class="item">
      <span class="left">备注：</span>
      <span class="right">{{ clientDetail.desc }}</span>
    </div>
    <div class="line"></div>
    <div class="title"><i class="iconfont icon-biaoti"></i>时间信息</div>
    <div class="item">
      <span class="left">录入人：</span>
      <span class="right">{{ clientDetail.creator ? clientDetail.creator.data.name : '' }}</span>
    </div>
    <div class="item">
      <span class="left">录入时间：</span>
      <span class="right">{{ clientDetail.created_at ? clientDetail.created_at : '' }}</span>
    </div>
    <div class="item">
      <span class="left">最近更新人：</span>
      <span class="right">{{ clientDetail.last_updated_user }}</span>
    </div>
    <div class="item">
      <span class="left">最近更新时间：</span>
      <span class="right">{{ clientDetail.updated_at }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import config from '@/utils/config'

export default {
  name: 'TaskDetail',
  data () {
    return {
      clientLevelArr: config.clientLevelArr,
      clientScaleArr: config.clientScaleArr
    }
  },
  mounted () {
    this.getClientInfo()
  },
  computed: {
    ...mapState([
      'clientDetail'
    ])
  },
  methods: {
    ...mapActions([
      'getClientDetail'
    ]),
    getClientInfo () {
      const params = {
        id: this.$route.params.id
      }
      this.getClientDetail(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.client-detail {
  background: #fff;
  padding-bottom: .2rem;
  font-size: .32rem;
  .title {
    color: #333;
    padding-top: .2rem;
    font-weight: 500;
  }
  .item {
    margin: .2rem;
    display: flex;
    justify-content: flex-start;
    .left {
      color: #666;
      flex-shrink: 0;
    }
    .right {
      color: #333;
      flex-shrink: 1;
    }
  }
  .line {
    height: 0;
    margin: 0 .2rem;
    border-bottom: 1px solid #D8D8D8;
  }
}

</style>
