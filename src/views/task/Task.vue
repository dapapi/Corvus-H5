<template>
  <div>
    <template v-if="!checkListVisible">
      <Cell title="关联资源" is-link @click.native="changeState('popupVisible', !popupVisible)" :value="linkResourceName ? linkResourceName : noneResource "></Cell>
      <Popup position="bottom" v-model="popupVisible" popup-transition="popup-fade" style="width: 100%">
        <Cell title="暂不关联资源" @click.native="checkResource('')"><span class="mint-cell-mask"></span></Cell>
        <Cell v-for="(item, index) in resourceList" :title="item.title" @click.native="checkResource(item)" :key="index">
          <span class="mint-cell-mask"></span>
        </Cell>
      </Popup>
      <Cell title="任务类型" @click.native="changeState('typeVisible', !typeVisible)" :value="taskTypeName" is-link></Cell>
      <Selector :visible="typeVisible" :data="taskTypes" @change="checkTaskType" />
      <Field label="任务名称" v-model="title" />
      <Cell title="负责人" is-link></Cell>
      <Cell title="参与人" is-link></Cell>
      <Cell title="任务优先级" @click.native="changeState('levelVisible', !levelVisible)" :value="priorityName" is-link></Cell>
      <Selector :visible="levelVisible" :data="taskLevelArr" @change="checkTaskLevel" />
      <Cell title="开始时间" @click.native="showStartPicker" :value="startTime" is-link></Cell>
      <DatetimePicker
        ref="startPicker"
        type="datetime"
        @confirm="startConfirm"
      />
      <Cell title="截止时间" @click.native="showEndPicker" :value="endTime" is-link></Cell>
      <DatetimePicker
        ref="endPicker"
        type="datetime"
        @confirm="endConfirm"
      />
      <Field type="textarea" rows="1" label="任务说明" v-model="desc" />
      <div class="attachment">
        <FileUpload />
      </div>
    </template>
    <div v-else class="resource">
      <CheckList
        :selectorData="resourceData"
        :multiple="false"
        @change="seletedData"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import config from '@/utils/config'
import moment from 'moment'

export default {
  name: 'Task',
  data () {
    return {
      taskLevelArr: config.taskLevelArr,
      popupVisible: false,
      checkListVisible: false,
      typeVisible: false,
      levelVisible: false,
      startTimeVisible: false,
      resourceName: '',
      resourceId: '',
      resourceableName: '',
      resourceableId: '',
      noneResource: '',
      title: '', // 任务标题
      taskType: '', // 任务类型
      taskTypeName: '',
      principalId: '', // 负责人
      participantIds: [], // 参与人
      priority: '', // 任务优先级
      priorityName: '',
      startTime: '',
      endTime: '',
      desc: '' // 任务描述
    }
  },
  computed: {
    ...mapState([
      'resourceData',
      'resourceList',
      'taskTypes',
      'taskDetail'
    ]),
    linkResourceName () {
      let _name = ''
      if (this.resourceName && this.resourceableName) {
        _name = this.resourceName + '-' + this.resourceableName
      }
      return _name
    }
  },
  watch: {
    taskDetail () {
      console.log(this.taskDetail)
      const taskDetail = this.taskDetail
      if (taskDetail.resource) {
        this.resourceId = taskDetail.resource.data.resource.data.id
        this.resourceName = taskDetail.resource.data.resource.data.title
        this.resourceableName = taskDetail.resource.data.resourceable.data.name
        this.resourceableId = taskDetail.resource.data.resourceable.data.id
      }
      this.title = taskDetail.title
      this.taskType = taskDetail.type.data.id
      this.taskTypeName = taskDetail.type.data.title
      // principalId: '', // 负责人
      // participantIds: [], // 参与人
      this.priority = taskDetail.priority
      if (taskDetail.priority) {
        this.priorityName = this.taskLevelArr.find(n => taskDetail.priority === n.value).name
      }
      this.startTime = taskDetail.start_at
      this.endTime = taskDetail.stop_at
      this.desc = taskDetail.desc
    }
  },
  mounted () {
    this.getResourceList()
    this.getTaskTypes()
    // 赋值给浏览器
    window.addTasks = this.addNewTask()
    console.log(this.$route.params.id)
    if (this.$route.params.id) {
      this.getTaskDetail()
    }
  },
  methods: {
    ...mapMutations([
      'setSelectorCheckedData'
    ]),
    // 返回选中数据
    seletedData (data) {
      this.resourceableName = data.label
      this.resourceableId = data.value
      this.checkListVisible = false
    },
    ...mapActions([
      'getResourceList',
      'getRelatedResources',
      'getTaskTypes',
      'addTask',
      'getTasks'
    ]),
    changeVisible () {
      this.popupVisible = !this.popupVisible
    },
    changeState (name, value) {
      this[name] = value
    },
    // 选中关联资源
    checkResource (data) {
      this.popupVisible = false
      if (!data) {
        this.resourceName = ''
        this.noneResource = '暂不关联资源'
        this.resourceId = ''
        this.resourceableName = ''
        this.resourceableId = ''
        return
      }
      this.noneResource = ''
      this.checkListVisible = true
      this.resourceName = data.title
      this.resourceId = data.id

      const code = data.code
      let params = {
        url: code,
        data: {}
      }
      if (code === 'bloggers' || code === 'stars') {
        params.data.sign_contract_status = 2
      }
      this.getRelatedResources(params)
    },
    // 选择任务类型
    checkTaskType (data) {
      this.typeVisible = !this.typeVisible
      this.taskType = data.value
      this.taskTypeName = data.name
    },
    // 选择任务优先级
    checkTaskLevel (data) {
      this.levelVisible = !this.levelVisible
      this.priority = data.value
      this.priorityName = data.name
    },
    // 显示开始时间
    showStartPicker () {
      this.$refs.startPicker.open()
    },
    // 显示结束时间
    showEndPicker () {
      this.$refs.endPicker.open()
    },
    startConfirm (date) {
      this.startTime = moment(date).format('YYYY-MM-DD HH-SS')
    },
    endConfirm (date) {
      this.endTime = moment(date).format('YYYY-MM-DD HH-SS')
    },
    addNewTask () {
      const params = {
        type: this.taskType,
        title: this.title,
        principal_id: this.principalId,
        participant_ids: this.participantIds,
        priority: this.priority,
        start_at: this.startTime,
        end_at: this.endTime,
        desc: this.desc
      }
      if (this.resourceName && this.resourceableName) {
        params.resource_type = this.resourceId
        params.resourceable_id = this.resourceableId
      }
      console.log(params)
      // this.addTask(params)
    },
    getTaskDetail () {
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
.attachment {
  margin-top: .2rem;
  padding: .2rem;
  background-color: #fff;
}
.resource {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
