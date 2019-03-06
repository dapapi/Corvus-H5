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
      <Cell title="负责人" @click.native="checkKeyMan" is-link></Cell>
      <Cell title="参与人" is-link></Cell>
      <Cell title="任务优先级" @click.native="changeState('levelVisible', !levelVisible)" :value="priorityName" is-link></Cell>
      <Selector :visible="levelVisible" :data="taskLevelArr" @change="checkTaskLevel" />
      <Cell title="开始时间" @click.native="showStartPicker" :value="startTime" is-link></Cell>
      <DatetimePicker
        ref="startPicker"
        type="datetime"
        @confirm="startConfirm"
        @visible-change="handleValueChange"
      />
      <Cell title="截止时间" @click.native="showEndPicker" :value="endTime" is-link></Cell>
      <DatetimePicker
        ref="endPicker"
        type="datetime"
        @visible-change="handleValueChange"
        @confirm="endConfirm"
      />
      <Field type="textarea" ref='textarea' rows="1" label="任务说明" v-model="desc" />
      <div class="attachment">
        <Cell title="附件">
          <FileUpload @change="uploadFile"><i class="iconfont icon-biaoti annex"></i></FileUpload>
        </Cell>
        <div class="annex-list" v-for="(item, index) in annexArr" :key="index">
          <div class="left">
            <div class="icon">
              <img :src="item.url" />
            </div>
            <div class="info">
              <div class="title">{{ item.name }}</div>
              <div class="size">{{ item.size }}k</div>
            </div>
          </div>
          <div class="right">
            <i class="iconfont icon-shanchu" @click="delAnnex(index)"></i>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="resource">
      <CheckList
        :selectorData="resourceData"
        :multiple="false"
        :needSearch="true"
        :originTitle="pageTitle"
        :rightClick="rightClick"
        :leftClick="leftClick"
        newTitle="关联资源"
        @change="seletedData"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import config from '@/utils/config'
import moment from 'moment'
import fetch from '@/utils/fetch'
import tool from '@/utils/tool'

export default {
  name: 'Task',
  data () {
    return {
      taskLevelArr: config.priorityArr,
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
      desc: '', // 任务描述
      taskId: this.$route.params.id, // 任务id
      annexArr: [], // 附件列表
      pageTitle: '', // 当前页面的标题
      rightClick: null , // 右侧按钮触发的事件
      leftClick: null , // 左侧按钮触发的事件
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
    },
    // 监听textara的变化,自动改变textarea的高度
    desc () {
      const el = this.$refs.textarea.$el.querySelector('textarea')
      el.style.height = el.scrollHeight - 4 + 'px'
    },
  },
  mounted () {
    this.getResourceList()
    this.getTaskTypes()
    // 赋值给浏览器
    // this.leftClick = tool.nativeEvent('back', 2)
    if (this.$route.name === 'task/edit') {
      this.getTaskDetail()
      this.pageTitle = '编辑任务'
      this.rightClick = this.addNewTask
    } else {
      this.rightClick = this.editTask
      if (this.$route.name === 'task/addSubTask') {
        this.pageTitle = '新增子任务'
      } else {
        this.pageTitle = '新增任务'
      }
    }
    window.rightClick = this.rightClick
    window.leftClick = this.leftClick
    window.setMemberData = this.setMemberData
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
    // 新建任务，子任务
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
      if (this.$route.name === 'task/addSubTask') {
        // 执行添加子任务
        fetch('post', '/tasks/' + this.taskId + '/subtask', data).then(function (response) {
          // 回调app原生方法
        })
      } else {
        // 执行添加任务
        fetch('post', '/tasks', params).then(res => {
          console.log(res)
          // 回调app原生方法
        })
      }
    },
    // 编辑任务，子任务
    editTask () {
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
      fetch('put', '/tasks/' + this.taskId, params).then(res => {
        // 回调app原生方法
      })
    },
    getTaskDetail () {
      const params = {}
      params.data = {
        include: 'creator,principal,pTask,tasks.type,resource.resourceable,resource.resource,affixes,participants'
      }
      params.id = this.taskId
      this.getTasks(params)
    },
    //滚动穿透调用的方法
    handleValueChange: function (val) {
      if(val) {
        tool.ModalHelper.afterOpen()
      } else {
        tool.ModalHelper.beforeClose()
      }
    },
    // 上传文件
    uploadFile (fileUrl, fileName, fileSize) {
      this.annexArr.push(
        {
          url: fileUrl,
          name: fileName,
          size: (fileSize / 1024).toFixed(1)
        }
      )
    },
    // 删除附件
    delAnnex (index) {
      this.annexArr.splice(index, 1)
    },
    // 调用组织架构选择负责人
    checkKeyMan () {
      const params = {
        type: 1,
        data: []
      }
      window.selectOrganizational(1, JSON.stringify(params))
    },
    setMemberData (data) {
      alert(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.attachment {
  .annex  {
    font-size: .4rem;
    position: relative;
    left: .1rem;
  }
  .annex-list {
    background-color: #fff;
    padding: .3rem .2rem;
    height: 1rem;
    position: relative;
    &:after {
      content: '';
      border-top: 1px solid #D8D8D8;
      width: calc(100% - .4rem);
      position: absolute;
      top: 0;
      left: .2rem;
    }
    .left {
      float: left;
      .icon {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: .2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        display: inline-block;
        vertical-align: top;
        .title {
          font-size: .28rem;
          color: #333;
          margin-top: .1rem;
        }
        .size {
          font-size: .24rem;
          margin-top: .1rem;
          color: #a4a4a4;
        }
      }
    }
    .right {
      float: right;
      width: 1rem;
      height: 1rem;
      border-left: 1px solid #D8D8D8;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      i {
        font-size: .4rem;
        position: relative;
        left: .1rem;
      }
    }
  }
}
.resource {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
