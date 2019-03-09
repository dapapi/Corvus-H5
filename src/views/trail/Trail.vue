<template>
  <div>
    <template v-if="!clientsVisible && !isAddClients && !industryVisible && !expectationsVisible && !recommendationsVisible">
      <template v-if="type !== 4">
        <Cell title="合作类型" @click.native="changeState('cooperationVisible', !cooperationVisible)" :value="cooperationType" isLink></Cell>
        <Selector :visible="cooperationVisible" :data="cooperationTypeArr" @change="checkCooperation" />
      </template>
      <Field class="require" label="品牌名称" v-model="brand" />
      <Cell title="公司名称" class="require" @click.native="changeState('clientsVisible', !clientsVisible)" :value="clientName" isLink></Cell>
      <Field label="线索名称" class="require" v-model="title"></Field>
      <Cell title="线索来源" class="require" @click.native="changeState('trailVisible', !trailVisible)" :value="resourceTypeName" isLink></Cell>
      <Selector :visible="trailVisible" :data="trailOriginArr" @change="checkTrailOrigin" />
      <Field v-if="resourceTypeNum < 6 && resourceTypeNum > 0" v-model="resourceTypeDetail"></Field>
      <Cell title="行业" class="require" @click.native="changeState('industryVisible', !industryVisible)" :value="industryName" isLink></Cell>
      <Cell title="负责人" class="require" @click.native="checkKeyMan" isLink>
        <img class="avatar" v-for="(item, index) in principalIconArr" :src="item.icon_url" :key="index">
      </Cell>
      <Cell title="目标艺人" class="require" :value="expectationsName" @click.native="changeState('expectationsVisible', !expectationsVisible)" isLink></Cell>
      <Cell title="推荐艺人" :value="recommendationsName" @click.native="changeState('recommendationsVisible', !recommendationsVisible)" isLink></Cell>
      <Cell title="优先级" class="require" @click.native="changeState('levelVisible', !levelVisible)" :value="priorityName" isLink></Cell>
      <Selector :visible="levelVisible" :data="taskLevelArr" @change="checkTaskLevel" />
      <Field label="联系人" class="require" v-model="contact.name"></Field>
      <Field label="联系人电话" class="require" v-model="contact.phone"></Field>
      <template v-if="type !== 4">
        <Cell title="线索状态" @click.native="changeState('statusVisible', !statusVisible)" :value="trailStatus" isLink></Cell>
        <Selector :visible="statusVisible" :data="trailStatusArr" @change="checkStatus" />
      </template>
      <Field label="销售进展" disabled v-model="salesProgressText"></Field>
      <Field label="预计订单收入" class="require" v-model="fee"></Field>
      <!-- papi的可以锁价 -->
      <template v-if="type === 4">
        <Cell title="是否锁价" :value="lockName" @click.native="changeState('lockVisible', !lockVisible)" isLink></Cell>
        <Selector :visible="lockVisible" :data="lockArr" @change="checkLock" />
      </template>
      <Field label="备注" v-model="desc"></Field>
      <Button @click="addNewTrail">add</Button>
      <Button @click="addCompany">新增公司</Button>
    </template>
    <!-- 选择客户 -->
    <CheckList
      v-if="clientsVisible"
      :selectorData="clientsAll"
      :needSearch="true"
      :multiple="false"
      :originTitle="pageTitle"
      newTitle="公司名称"
      :leftClick="leftClick"
      @change="seletedClient"
    />
    <AddClient
      v-if="isAddClients"
      @change="addNewCompany"
    />
    <Popup position="bottom" v-model="industryVisible" popup-transition="popup-fade" style="width: 100%">
      <Cell v-for="(item, index) in industriesArr" :title="item.label" @click.native="checkIndustry(item)" :key="index">
        <span class="mint-cell-mask"></span>
      </Cell>
    </Popup>
    <CheckList
      v-if="expectationsVisible"
      :selectorData="starAndBlogger"
      :multiple="true"
      :needSearch="true"
      newTitle="目标艺人"
      :originTitle="pageTitle"
      :rightClick="rightClick"
      :leftClick="leftClick"
      @change="selectExpectations"
    />
    <CheckList
      v-if="recommendationsVisible"
      :needSearch="true"
      :selectorData="starAndBlogger"
      :multiple="true"
      :originTitle="pageTitle"
      newTitle="推荐艺人"
      :rightClick="rightClick"
      :leftClick="leftClick"
      @change="selectRecommendations"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import config from '@/utils/config'
import fetch from '@/utils/fetch'
import tool from '@/utils/tool'

export default {
  name: 'Task',
  data () {
    return {
      cooperationVisible: false,
      clientsVisible: false,
      isAddClients: false,
      industryVisible: false,
      statusVisible: false,
      taskLevelArr: config.taskLevelArr,
      trailOriginArr: config.trailOrigin,
      lockArr: config.lockArr,
      trailStatusArr: config.trailStatusArr,
      cooperationTypeArr: config.cooperationTypeArr,
      levelVisible: false,
      expectationsVisible: false,
      // selectExpectations
      recommendationsVisible: false,
      trailVisible: false,
      lockVisible: false,
      cooperationType: '', // 合作类型
      title: '', // 线索名称
      brand: '', // 品牌名称
      client: {}, // 公司
      clientName: '', // 公司名称
      resourceType: '', // 线索来源, 不同来源对应不同来源人员
      resourceTypeName: '', // 线索来源
      resourceTypeDetail: '',
      resourceTypeNum: 0,
      recommendations: [], // 推荐艺人
      recommendationsName: '', // 推荐艺人
      expectations: [], // 目标艺人
      expectationsName: '', // 目标艺人数组
      contact: {
        name: '', // 联系人
        phone: '' // 联系人电话
      },
      fee: '', // 预计订单收入
      desc: '', // 备注
      industryName: '', // 行业
      industryId: '', // 行业id
      type: '', // 销售线索
      principalId: '', // 负责人
      // principalName: '', // 负责人
      principalIconArr: [], // 负责人头像
      priority: '', // 优先级
      priorityName: '', // 优先级
      salesProgressText: '未确定合作', // 销售进展，新增为未确定合作
      lockName: '', // 是否锁价
      type: -1, // 1为影视项目，2为综艺项目，3为商务项目 4为papi项目
      trailStatus: '', // 销售线索状态
      pageTitle: '', // 当前页面标题
      rightClick: null,
      leftClick: null , // 左侧按钮触发的事件
    }
  },
  computed: {
    ...mapState([
      'clientsAll',
      'newClient',
      'industriesArr',
      'starAndBlogger',
      'trailDetail'
    ]),
  },
  watch: {
    newClient () {
      if (this.newClient.company && this.newClient.grade) {
        this.client = {}
        this.client.company = this.newClient.company
        this.client.grade = this.newClient.grade
      }
    },
    trailDetail () {
      console.log(this.trailDetail)
      const trailDetail = this.trailDetail
      this.cooperationType = this.cooperationTypeArr.find(n => n.value === trailDetail.cooperation_type).name
      this.title = trailDetail.title
      this.brand = trailDetail.brand
      // client: {}, // 公司
      this.clientName = trailDetail.client.data.company
      this.resourceType = trailDetail.resource_type
      this.resourceTypeName = this.trailOriginArr.find( n => n.value === trailDetail.resource_type).name
      // resourceTypeDetail: '',
      // resourceTypeNum: 0,
      // recommendations: [], // 推荐艺人
      this.recommendationsName = [
        ...trailDetail.bloggerrecommendations.data.map(n => n.nickname),
        ...trailDetail.starrecommendations.data.map(n => n.name)].join('、')

      if (trailDetail.bloggerexpectations || trailDetail.starexpectations) {
        this.expectationsName = [
          ...trailDetail.bloggerexpectations.data.map(n => n.nickname),
          ...trailDetail.starexpectations.data.map(n => n.name)].join('、')
      }
      // expectations: [], // 目标艺人
      // expectationsName: '', // 目标艺人数组
      this.contact = {
        name: trailDetail.contact.data.name,
        phone: trailDetail.contact.data.phone
      },
      this.fee = trailDetail.fee
      this.desc = trailDetail.desc
      this.industryName = trailDetail.industry
      // industryId: '', // 行业id
      // type: '', // 销售线索
      // principalId: '', // 负责人
      this.principalIconArr = trailDetail.principal.data.icon_url
      this.priority = trailDetail.priority
      this.priorityName = this.taskLevelArr.find(n => n.value === trailDetail.priority).name
      // salesProgressText: '未确定合作', // 销售进展，新增为未确定合作
      // lockName: '', // 是否锁价
      this.type = trailDetail.type
      this.trailStatus = this.trailStatusArr.find(n => n.value === trailDetail.status).name
    }
  },
  mounted () {
    this.getClients()
    this.getIndustries()
    this.getStarAndBlogger()
    this.type = this.$route.query.type
    this.leftClick = this.leftClickTemp
    // 提交按钮
    if (this.$route.name === 'trail/edit') {
      this.getTrailDetailInfo()
      this.pageTitle = '编辑线索'
      this.rightClick = this.editTrail
    } else {
      this.pageTitle = '新增线索'
      this.rightClick = this.addNewTrail
    }
    window.rightClick = this.rightClick
    window.leftClick = this.leftClick
  },
  methods: {
    ...mapActions([
      'addTrail',
      'getClients',
      'getIndustries',
      'getStarAndBlogger',
      'getTrailDetail'
    ]),
    changeState (name, value) {
      this[name] = value
    },
    addNewTrail () {
      if (!this.brand) {
        toast('品牌名称不能为空！')
        return
      }
      if (!this.client.id) {
        toast('公司名称不能为空！')
        return
      }
      if (!this.title) {
        toast('线索名称不能为空！')
        return
      }
      if (!this.resourceTypeNum) {
        toast('线索来源不能为空！')
        return
      }
      if (!this.industryId) {
        toast('行业不能为空！')
        return
      }
      if (!this.principalId) {
        toast('负责人不能为空！')
        return
      }
      if (this.expectations.length <= 0) {
        toast('目标艺人不能为空！')
        return
      }
      if (!this.contact.name) {
        toast('联系人不能为空！')
        return
      }
      if (!this.contact.phone) {
        toast('联系人电话不能为空！')
        return
      }
      if (!this.fee) {
        toast('预计订单收入不能为空！')
        return
      }
      const params = {
        title: this.title, // 线索名称
        brand: this.brand, // 品牌名称
        client: this.client, // 公司id
        resource_type: this.resourceType, // 线索来源, 不同来源对应不同来源人员
        recommendations: this.recommendations, // 推荐艺人
        expectations: this.expectations, // 目标艺人
        contact: {
          name: this.contact.name, // 联系人
          phone: this.contact.phone // 联系人电话
        },
        fee: this.fee, // 预计订单收入
        desc: this.desc, // 备注
        industry_id: this.industryId, // 行业
        type: this.type, // 销售线索
        principal_id: this.principalId, // 负责人
        priority: this.priority, // 优先级
        priorityName: '', // 优先级
        status: this.trailStatus // 线索状态
      }
      console.log(params)

      fetch('post', '/trails', params).then(res => {
        console.log(res)
      })
    },
    editTrail () {
      const params = {
        title: this.title, // 线索名称
        brand: this.brand, // 品牌名称
        client: this.client, // 公司id
        resource_type: this.resourceType, // 线索来源, 不同来源对应不同来源人员
        recommendations: this.recommendations, // 推荐艺人
        expectations: this.expectations, // 目标艺人
        contact: {
          name: this.contact.name, // 联系人
          phone: this.contact.phone // 联系人电话
        },
        fee: this.fee, // 预计订单收入
        desc: this.desc, // 备注
        industry_id: this.industryId, // 行业
        type: this.type, // 销售线索
        principal_id: this.principalId, // 负责人
        priority: this.priority, // 优先级
        priorityName: '', // 优先级
        status: this.trailStatus // 线索状态
      }
      fetch('put', '/trails/' + this.trailId, params).then(() => {
        // 回调
      })
    },
    // 选择客户
    seletedClient (data) {
      this.clientsVisible = !this.clientsVisible
      if (data.value) {
        this.client = {}
        this.client.id = data.value
        this.clientName = config.clientLevelArr.find( n => n.value === data.grade).name + '-' + data.label
      }
    },
    // 新增客户(公司)
    addNewCompany (data) {
      this.isAddClients = !this.isAddClients
      this.client = {}
      this.client.company = data
      this.client.grade = ''
    },
    // 选择行业
    checkIndustry (data) {
      console.log(this.industriesArr)
      this.industryVisible = !this.industryVisible
      this.industryId = data.value
      this.industryName = data.label
    },
    // 选择任务级别
    checkTaskLevel (data) {
      this.levelVisible = false
      this.priority = data.value
      this.priorityName = data.name
    },
    // 选择目标艺人
    selectExpectations (data) {
      this.expectationsVisible = false
      const expectations = []
      const expectationsName = []
      data.map(n => {
        expectations.push(n.value)
        expectationsName.push(n.label)
      })
      this.expectationsName = expectationsName.join('、')
      this.expectations = expectations
    },
    selectRecommendations (data) {
      this.recommendationsVisible = false
      const recommendations = []
      const recommendationsName = []
      data.map(n => {
        recommendations.push(n.value)
        recommendationsName.push(n.label)
      })
      this.recommendationsName = recommendationsName.join('、')
      this.recommendations = recommendations
    },
    // 选择线索来源
    checkTrailOrigin (data) {
      console.log(data)
      this.trailVisible = !this.trailVisible
      this.resourceTypeName = data.name
      this.resourceTypeNum = data.value
    },
    // 选择锁价
    checkLock (data) {
      this.lockVisible = false
      console.log(data)
      this.lockName = data.name
    },
    // 合作类型
    checkCooperation (data) {
      this.cooperationVisible = !this.cooperationVisible
      this.cooperationType = data.name
    },
    // 线索状态
    checkStatus (data) {
      this.statusVisible = !this.statusVisible
      this.trailStatus = data.name
    },
    // 获取线索详情
    getTrailDetailInfo () {
      const params = {
        id: this.$route.params.id
      }
      this.getTrailDetail(params)
    },
    // 新增公司
    addCompany () {
      this.isAddClients = true
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
    // 设置负责人数据
    setPrincipalData (data) {
      this.principalIconArr = JSON.parse(data)
      this.principalId = this.principalIconArr[0].id || ''
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
