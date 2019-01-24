<template>
  <div>
    <template v-if="!clientsVisible && !isAddClients && !industryVisible && !expectationsVisible && !recommendationsVisible">
      <Field label="品牌名称" v-model="brand" />
      <Cell title="公司名称" @click.native="changeState('clientsVisible', !clientsVisible)" :value="clientName" isLink></Cell>
      <Field label="线索名称" v-model="title"></Field>
      <Cell title="线索来源" @click.native="changeState('trailVisible', !trailVisible)" :value="resourceTypeName" isLink></Cell>
      <Selector :visible="trailVisible" :data="trailOriginArr" @change="checkTrailOrigin" />
      <Field v-if="resourceTypeNum < 6 && resourceTypeNum > 0" v-model="resourceTypeDetail"></Field>
      <Cell title="行业" @click.native="changeState('industryVisible', !industryVisible)" :value="industryName" isLink></Cell>
      <Cell title="负责人" :value="principalName"></Cell>
      <Cell title="目标艺人" :value="expectationsName" @click.native="changeState('expectationsVisible', !expectationsVisible)" isLink></Cell>
      <Cell title="推荐艺人" :value="recommendationsName" @click.native="changeState('recommendationsVisible', !recommendationsVisible)" isLink></Cell>
      <Cell title="优先级" @click.native="changeState('levelVisible', !levelVisible)" :value="priorityName" isLink></Cell>
      <Selector :visible="levelVisible" :data="taskLevelArr" @change="checkTaskLevel" />
      <Field label="联系人" v-model="contact.name"></Field>
      <Field label="联系人电话" v-model="contact.phone"></Field>
      <Field label="销售进展" disabled v-model="salesProgressText"></Field>
      <Field label="预计订单收入" v-model="fee"></Field>
      <!-- papi的可以锁价 -->
      <Cell title="是否锁价" isLink></Cell>
      <Field label="备注" v-model="desc"></Field>
    </template>
    <!-- 选择客户 -->
    <CheckList
      v-if="clientsVisible"
      :selectorData="clientsAll"
      :multiple="false"
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
      @change="selectExpectations"
    />
    <CheckList
      v-if="recommendationsVisible"
      :selectorData="starAndBlogger"
      :multiple="true"
      @change="selectRecommendations"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import config from '@/utils/config'

export default {
  name: 'Task',
  data () {
    return {
      clientsVisible: false,
      isAddClients: false,
      industryVisible: false,
      taskLevelArr: config.taskLevelArr,
      trailOriginArr: config.trailOrigin,
      levelVisible: false,
      expectationsVisible: false,
      recommendationsVisible: false,
      trailVisible: false,
      title: '', // 线索名称
      brand: '', // 品牌名称
      clientInfo: '', // 公司id
      clientName: '', // 公司名称
      resourceType: '', // 线索来源, 不同来源对应不同来源人员
      resourceTypeName: '', // 线索来源
      resourceTypeDetail: '',
      resourceTypeNum: 0,
      recommendations: [], // 推荐艺人
      recommendationsName: [], // 推荐艺人
      expectations: [], // 目标艺人
      expectationsName: [], // 目标艺人数组
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
      principalName: '', // 负责人
      priority: '', // 优先级
      priorityName: '', // 优先级
      salesProgressText: '未确定合作' // 销售进展，新增为未确定合作
    }
  },
  computed: {
    ...mapState([
      'clientsAll',
      'newClient',
      'industriesArr',
      'starAndBlogger'
    ]),
  },
  watch: {
    newClient () {
      if (this.newClient.company && this.newClient.grade) {
        this.client = {}
        this.client.company = this.newClient.company
        this.client.grade = this.newClient.grade
      }
    }
  },
  mounted () {
    this.getClients()
    this.getIndustries()
    this.getStarAndBlogger()
  },
  methods: {
    ...mapActions([
      'addTrail',
      'getClients',
      'getIndustries',
      'getStarAndBlogger'
    ]),
    changeState (name, value) {
      this[name] = value
    },
    addNewTrail () {
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
        priorityName: '' // 优先级
      }
      console.log(params)
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
      console.log(data)
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
      this.expectationsName = expectationsName
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
      this.recommendationsName = recommendationsName
      this.recommendations = recommendations
    },
    // 选择线索来源
    checkTrailOrigin (data) {
      // console.log(data)
      this.trailVisible = !this.trailVisible
      this.resourceTypeName = data.name
      this.resourceTypeNum = data.value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
