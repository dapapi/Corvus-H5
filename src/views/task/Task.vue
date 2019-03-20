<template>
  <div>
    <template v-if="!checkListVisible">
      <Cell v-if="!query.resourceType" title="关联资源" is-link @click.native="changeState('popupVisible', !popupVisible)" :value="linkResourceName ? linkResourceName : noneResource "></Cell>
      <Cell v-else title="关联资源" :value="linkResourceName ? linkResourceName : noneResource "></Cell>
      <Popup position="bottom" v-model="popupVisible" popup-transition="popup-fade" style="width: 100%">
        <Cell title="暂不关联资源" @click.native="checkResource('')"><span class="mint-cell-mask"></span></Cell>
        <Cell v-for="(item, index) in resourceList" :title="item.title" @click.native="checkResource(item)" :key="index">
          <span class="mint-cell-mask"></span>
        </Cell>
      </Popup>
      <Cell class="require" title="任务类型" @click.native="changeState('typeVisible', !typeVisible)" :value="taskTypeName" is-link></Cell>
      <Selector :visible="typeVisible" :data="taskTypes" @change="checkTaskType" />
      <Field class="require" label="任务名称" v-model="title" />
      <Cell class="require" title="负责人" @click.native="checkKeyMan" is-link>
        <img class="avatar" v-for="(item, index) in principalIconArr" :src="item.icon_url" :key="index">
      </Cell>
      <Cell title="参与人"  @click.native="checkParticipant" is-link>
        <img class="avatar" v-for="(item, index) in participantIconArr" :src="item.icon_url" :key="index">
      </Cell>
      <Cell class="require" title="任务优先级" @click.native="changeState('levelVisible', !levelVisible)" :value="priorityName" is-link></Cell>
      <Selector :visible="levelVisible" :data="taskLevelArr" @change="checkTaskLevel" />
      <Cell class="require" title="开始时间" @click.native="showStartPicker" :value="startTime" is-link></Cell>
      <DatetimePicker
        ref="startPicker"
        type="datetime"
        v-model="startTimeModel"
        @confirm="startConfirm"
        @visible-change="handleValueChange"
      />
      <Cell title="截止时间" class="require" @click.native="showEndPicker" :value="endTime" is-link></Cell>
      <DatetimePicker
        ref="endPicker"
        type="datetime"
        v-model="endTimeModel"
        @visible-change="handleValueChange"
        @confirm="endConfirm"
      />
      <Field type="textarea" ref='textarea' rows="1" label="任务说明" v-model="desc" />
      <div class="attachment">
        <Cell title="附件">
          <FileUpload @change="uploadFile"><i class="iconfont icon-fujian annex"></i></FileUpload>
        </Cell>
        <div class="annex-list" v-for="(item, index) in annexArr" :key="index">
          <div class="left">
            <div class="icon">
              <img :src="item.url" />
            </div>
            <div class="info">
              <div class="title">{{ item.title }}</div>
              <div class="size">{{ (item.size  / 1024).toFixed(1) }}k</div>
            </div>
          </div>
          <div class="right">
            <i class="iconfont icon-shanchu" @click="delAnnex(index, item)"></i>
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
    <!-- <Button @click.native="editTask">编辑</Button> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import config from '@/utils/config'
import moment from 'moment'
import fetch from '@/utils/fetch'
import tool from '@/utils/tool'
import Cookies from 'js-cookie'

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
      principalIconArr: [], // 负责人头像
      participantIds: [], // 参与人
      participantIconArr: [], // 参与人头像
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
      code: '', // 修改关联资源需要传
      startTimeModel: new Date(), // 默认开始时间
      endTimeModel: new Date(), // 默认开始时间
      isLoading: false,
      query: this.$route.query
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
      const taskDetail = this.taskDetail
      if (taskDetail.resource) {
        this.resourceId = taskDetail.resource.data.resource.data.type
        this.resourceName = taskDetail.resource.data.resource.data.title
        this.resourceableName = taskDetail.resource.data.resourceable.data.name
                                || taskDetail.resource.data.resourceable.data.company
                                || taskDetail.resource.data.resourceable.data.nickname
                                || taskDetail.resource.data.resourceable.data.title
        this.resourceableId = taskDetail.resource.data.resourceable.data.id
        this.code = taskDetail.resource.data.resource.data.code
      }
      this.title = taskDetail.title
      this.taskType = taskDetail.type.data.id
      this.taskTypeName = taskDetail.type.data.title
      this.priority = taskDetail.priority
      if (taskDetail.priority) {
        this.priorityName = this.taskLevelArr.find(n => taskDetail.priority === n.value).name
      }
      this.principalId = taskDetail.principal.data.id
      this.principalIconArr.push({
        id: taskDetail.principal.data.id,
        name: taskDetail.principal.data.name,
        icon_url: taskDetail.principal.data.icon_url
      })
      this.participantIds = taskDetail.participants.data.map(n => n.id)
      this.participantIconArr = taskDetail.participants.data
      this.startTime = taskDetail.start_at
      this.endTime = taskDetail.end_at
      this.desc = taskDetail.desc
      this.annexArr = taskDetail.affixes.data
    },
    // 监听textara的变化,自动改变textarea的高度
    desc () {
      const el = this.$refs.textarea.$el.querySelector('textarea')
      el.style.height = el.scrollHeight - 4 + 'px'
    },
    isLoading () {
      if (this.isLoading) {
        Indicator.open()
      } else {
        Indicator.close()
      }
    }
  },
  mounted () {
    const query = this.query
    if (query.resourceType) {
      this.resourceId = query.resourceType
      this.resourceName = query.resourceName
    }
    if (query.resourceableId) {
      this.resourceableId = query.resourceableId
      this.resourceableName = query.resourceableName
    }
    this.getResourceList()
    this.getTaskTypes()
    // 赋值给浏览器
    this.leftClick = this.leftClickTemp
    if (this.$route.name === 'task/edit') {
      this.getTaskDetail()
      this.pageTitle = '编辑任务'
      this.rightClick = this.editTask
    } else {
      this.rightClick = this.addNewTask
      this.getUserInfo()
      if (this.$route.name === 'task/addSubTask') {
        this.pageTitle = '新增子任务'
      } else {
        this.pageTitle = '新增任务'
      }
    }
    window.rightClick = this.rightClick
    window.leftClick = this.leftClick
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
      this.resourceId = data.type
      this.code = data.code

      const code = data.code
      let _code = code.substr(0, code.length - 1) + '/related'

      let params = {
        url: _code,
        data: {}
      }
    
      if (code === 'bloggers') { 
        params.url = code + '/all'
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
      const time = moment(date).format('YYYY-MM-DD HH-SS')
      this.startTime = time.substr(0,13) + ':' + time.substr(-2)
    },
    endConfirm (date) {
      const time = moment(date).format('YYYY-MM-DD HH-SS')
      this.endTime = time.substr(0,13) + ':' + time.substr(-2)
    },
    // 新建任务，子任务
    addNewTask () {
      if (this.isLoading) {
        return
      }
      
      if (!this.checkField()) {
        return
      }
      
      const params = {
        type: this.taskType,
        title: this.title,
        principal_id: this.principalId,
        participant_ids: this.participantIds,
        priority: this.priority,
        start_at: this.startTime,
        end_at: this.endTime,
        desc: this.desc,
        affix: this.annexArr
      }
      if (this.resourceName && this.resourceableName) {
        params.resource_type = this.resourceId
        params.resourceable_id = this.resourceableId
      }
      this.isLoading = true
      if (this.$route.name === 'task/addSubTask') {
        // 执行添加子任务
        fetch('post', '/tasks/' + this.taskId + '/subtask', params).then( res => {
          this.isLoading = false
          toast('添加成功！')
          setTimeout(() => {
            this.leftClick()
          }, 900)
        }).catch( res => {
          this.isLoading = false
        })
      } else {
        // 执行添加任务
        fetch('post', '/tasks', params).then(res => {
          this.isLoading = false
          toast('添加成功！')
          setTimeout(() => {
            this.leftClick()
          }, 900)
        }).catch( res => {
          this.isLoading = false
        })
      }
    },
    // 编辑任务，子任务
    editTask () {
      if (!this.checkField()) {
        return
      }
      if (this.isLoading) {
        return
      }
      const params = {
        type: this.taskType,
        title: this.title,
        principal_id: this.principalId,
        participant_ids: this.participantIds,
        priority: this.priority,
        start_at: this.startTime,
        end_at: this.endTime,
        desc: this.desc,
        affix: this.annexArr
      }
      if (this.resourceName && this.resourceableName) {
        params.resource_type = this.resourceId
        params.resourceable_id = this.resourceableId
        params.code = this.code
      }

      fetch('put', '/tasks/' + this.taskId, params).then(res => {
        // 回调app原生方法
        this.isLoading = false
        toast('修改成功')
          setTimeout(() => {
            this.leftClick()
          }, 900)
      }).catch( err => {
          this.isLoading = false
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
          title: fileName,
          size: fileSize
        }
      )
    },
    // 删除附件
    delAnnex (index, data) {
      MessageBox.confirm('确定执行此操作?').then(res => {
        if (data.id) {
          fetch('delete', '/tasks/' + this.taskId + '/affixes/' + data.id).then(res => {
            this.annexArr.splice(index, 1)
          })
        } else {
          this.annexArr.splice(index, 1)
        }
      })
    },
    leftClickTemp () {
      tool.nativeEvent('back', 2)
    },
    // 选择负责人
    checkKeyMan () {
      window.setMemberData = this.setPrincipalData
      const params = {
        type: 1,
        data: this.principalIconArr
      }
      tool.nativeEvent('selectOrganizational', JSON.stringify(params))
    },
    checkParticipant () {
      window.setMemberData = this.setParticipantData
      const params = {
        type: 2,
        data: this.participantIconArr
      }
      tool.nativeEvent('selectOrganizational', JSON.stringify(params))
    },
    // 设置负责人数据
    setPrincipalData (data) {
      this.principalIconArr = JSON.parse(data)
      this.principalId = this.principalIconArr[0].id || ''
    },
    setParticipantData (data) {
      this.participantIconArr = JSON.parse(data)
      this.participantIds = this.participantIconArr.map(n => n.id)
    },
    // 必填字段校验
    checkField () {
      if (!this.taskType) {
        toast('任务类型不能为空！')
        return
      }
      if (!this.title) {
        toast('任务名称不能为空！')
        return
      }
      if (!this.principalId) {
        toast('负责人不能为空！')
        return
      }
      if (!this.priority) {
        toast('任务优先级不能为空！')
        return
      }
      if (!this.startTime) {
        toast('开始时间不能为空！')
        return
      }
      if (!this.startTime) {
        toast('结束时间不能为空！')
        return
      }
      if (this.endTime <= this.startTime) {
        toast('截止时间不能小于开始时间！')
        return
      }
      return true
    },
    // 获取用户信息
    getUserInfo () {
      fetch('get', `/users/my`).then(res => {
        const data = res.data
        this.principalIconArr.push({
          id: data.id,
          name: data.name,
          icon_url: data.icon_url
        })
        this.principalId = this.principalIconArr[0].id || ''
      })
    },
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
