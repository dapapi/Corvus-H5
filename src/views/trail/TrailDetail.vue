<template>
  <div class="task-detail">
    <div class="title"><i class="iconfont icon-biaoti"></i>基本资料</div>
    <div class="item">
      <span class="left">关联资源：</span>
      <span class="right">
        <template v-if="taskDetail.resource">
          {{ taskDetail.resource.data.resource.data.title }} -
          {{ taskDetail.resource.data.resourceable.data.name }}
        </template>
      </span>
    </div>
    <div class="item">
      <span class="left">负责人：</span>
      <span class="right">{{ taskDetail.principal && taskDetail.principal.data.name }}</span>
    </div>
    <div class="item">
      <span class="left">参与人：</span>
      <span class="right">xxxxxx</span>
    </div>
    <div class="item">
      <span class="left">开始时间：</span>
      <span class="right">{{ taskDetail.start_at }}</span>
    </div>
    <div class="item">
      <span class="left">结束时间：</span>
      <span class="right">{{ taskDetail.stop_at }}</span>
    </div>
    <div class="item">
      <span class="left">优先级：</span>
      <span class="right">{{ taskDetail.priority && taskLevelArr.find( n => taskDetail.priority === n.value).name }}</span>
    </div>
    <div class="item">
      <span class="left">任务说明：</span>
      <span class="right">{{ taskDetail.desc }}</span>
    </div>
    <div class="line"></div>
    <div class="title"><i class="iconfont icon-biaoti"></i>更新信息</div>
    <div class="item">
      <span class="left">录入人：</span>
      <span class="right">{{ taskDetail.creator && taskDetail.creator.data.name }}</span>
    </div>
    <div class="item">
      <span class="left">录入时间：</span>
      <span class="right">{{ taskDetail.created_at }}</span>
    </div>
    <div class="item">
      <span class="left">最近更新人：</span>
      <span class="right">测试</span>
    </div>
    <div class="item">
      <span class="left">更新时间：</span>
      <span class="right">{{ taskDetail.updated_at }}</span>
    </div>
    <div class="item">
      <span class="left">完成时间：</span>
      <span class="right">{{ taskDetail.complete_at }}</span>
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
      taskLevelArr: config.taskLevelArr
    }
  },
  mounted () {
    this.getTaskInfo()
  },
  computed: {
    ...mapState([
      'taskDetail'
    ])
  },
  methods: {
    ...mapActions([
      'getTasks'
    ]),
    getTaskInfo () {
      const params = {}
      params.data = {
        include: 'creator,principal,pTask,tasks.type,resource.resourceable,resource.resource,affixes,participants'
      }
      params.id = this.$route.params.id
      this.getTasks(params)
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
    width: 100%;
    height: 0;
    margin: 0 .2rem;
    border-bottom: 1px solid #D8D8D8;
  }
}

</style>
