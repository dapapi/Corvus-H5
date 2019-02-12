<template>
  <div class="task-detail">
    <div class="title"><i class="iconfont icon-biaoti"></i>基本资料</div>
    <div class="item">
      <span class="left">线索名称：</span>
      <span class="right">{{ trailDetail.title }}</span>
    </div>
    <div class="item">
      <span class="left">线索来源：</span>
      <span class="right">{{ trailDetail.resource_type && trailOrigin.find(n => n.value === trailDetail.resource_type).name }}</span>
    </div>
    <div class="item">
      <span class="left">负责人：</span>
      <span class="right">{{ trailDetail.principal && trailDetail.principal.data.name }}</span>
    </div>
     <div v-if="trailDetail.type !== 4" class="item">
      <span class="left">预计费用：</span>
      <span class="right">{{ trailDetail.fee }}</span>
    </div>
    <div class="item">
      <span class="left">目标艺人：</span>
      <span class="right">
        {{ trailDetail.bloggerexceptions && trailDetail.bloggerexceptions.data.map(n => n.nickname).join('、') }}
        {{ trailDetail.starexpectations && trailDetail.starexpectations.data.map(n => n.name).join('、') }}
      </span>
    </div>
    <div class="item">
      <span class="left">推荐艺人：</span>
      <span class="right">
         {{ trailDetail.bloggerrecommendations && trailDetail.bloggerrecommendations.data.map(n => n.nickname).join('、') }}
         {{ trailDetail.starrecommendations && trailDetail.starrecommendations.data.map(n => n.name).join('、') }}
      </span>
    </div>
    <div class="item">
      <span class="left">优先级：</span>
      <span class="right">{{ trailDetail.priority && taskLevelArr.find(n => n.value === trailDetail.priority).name }}</span>
    </div>
    <div class="item">
      <span class="left">行业：</span>
      <span class="right">{{ trailDetail.industry }}</span>
    </div>
    <div class="item" v-if="trailDetail.type === 4">
      <span class="left">是否锁价：</span>
      <span class="right">
        {{ trailDetail.lock_status && lockArr.find(n => (trailDetail.lock_status === 0 ? 2 : 1) === n.value).name}}
      </span>
    </div>
    <template v-else>
      <div class="item">
        <span class="left">线索状态：</span>
        <span class="right">{{ trailDetail.status && trailStatusArr.find(n => n.value === trailDetail.status).name }}</span>
      </div>
      <div class="item">
        <span class="left">合作类型：</span>
        <span class="right">{{ trailDetail.cooperation_type && cooperationTypeArr.find(n => n.value === trailDetail.cooperation_type).name }}</span>
      </div>
    </template>
    <div class="line"></div>
    <div class="title"><i class="iconfont icon-biaoti"></i>客户资料</div>
    <div class="item">
      <span class="left">品牌名称：</span>
      <span class="right">{{ trailDetail.brand }}</span>
    </div>
     <div class="item">
      <span class="left">公司名称：</span>
      <span class="right">{{ trailDetail.client && trailDetail.client.data.company }}</span>
    </div>
    <div class="item">
      <span class="left">级别：</span>
      <span class="right">{{ trailDetail.client && clientLevelArr.find( n => n.value === trailDetail.client.data.grade).name }}</span>
    </div>
    <div class="item">
      <span class="left">联系人：</span>
      <span class="right">{{ trailDetail.contact && trailDetail.contact.data.name }}</span>
    </div>
    <div class="item">
      <span class="left">联系人电话：</span>
      <span class="right">{{ trailDetail.contact && trailDetail.contact.data.phone }}</span>
    </div>
    <div class="item">
      <span class="left">备注：</span>
      <span class="right">{{ trailDetail.desc }}</span>
    </div>
    <div class="line"></div>
    <div class="title"><i class="iconfont icon-biaoti"></i>更新信息</div>
    <div class="item">
      <span class="left">录入人：</span>
      <span class="right">{{ trailDetail.creator }}</span>
    </div>
    <div class="item">
      <span class="left">录入时间：</span>
      <span class="right">{{ trailDetail.created_at }}</span>
    </div>
    <div class="item">
      <span class="left">最近更新人：</span>
      <span class="right">{{ trailDetail.last_updated_user }}</span>
    </div>
    <div class="item">
      <span class="left">更新时间：</span>
      <span class="right">{{ trailDetail.last_updated_at }}</span>
    </div>
    <template v-if="trailDetail.type === 4">
      <div class="item">
        <span class="left">锁价人：</span>
        <span class="right">{{ trailDetail.lockuser && trailDetail.lockuser.data.name }}</span>
      </div>
      <div class="item">
        <span class="left">锁价时间：</span>
        <span class="right">{{ trailDetail.lock_at }}</span>
      </div>
    </template>
   
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
      trailOrigin: config.trailOrigin,
      taskLevelArr: config.taskLevelArr,
      lockArr: config.lockArr,
      trailStatusArr: config.trailStatusArr, // 线索状态
      cooperationTypeArr: config.cooperationTypeArr // 合作类型
    }
  },
  mounted () {
    this.getTrailInfo()
  },
  computed: {
    ...mapState([
      'trailDetail'
    ])
  },
  methods: {
    ...mapActions([
      'getTrailDetail'
    ]),
    getTrailInfo () {
      const params = {}
      params.id = this.$route.params.id
      this.getTrailDetail(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.task-detail {
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
