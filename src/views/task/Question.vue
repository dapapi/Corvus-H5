<template>
  <div class="question">
    <template v-if="!pushVisible">
      <div class="section">
        <div class="title"><i class="iconfont icon-biaoti"></i>评优团视频评分 <span>平均分 
          {{ questionInfo.sum ? (questionInfo.sum.data[0] ?questionInfo.sum.data[0].truncate : 0) : 0 }}</span>
        </div>
        <div class="item">
          <span class="left">负责人：</span>
          <span class="right">{{ principalName }}</span>
        </div>
        <div class="item">
          <span class="left">任务状态：</span>
          <span class="right" style="color: #FF9800;">
            <template v-if="taskDetail.status === 1">进行中</template>
            <template v-if="taskDetail.status === 2">已完成</template>
            <template v-if="taskDetail.status === 3">已停止</template>
          </span>
        </div>
        <div class="item">
          <span class="left">结束时间：</span>
          <span class="right">{{ taskDetail.end_at }}</span>
        </div>
        <template v-if="showMore">
          <div class="item">
            <span class="left">作者：</span>
            <span class="right"> {{ questionInfo.creator ? questionInfo.creator.data.name : '' }}</span>
          </div>
          <div class="item">
            <span class="left">视频名称：</span>
            <span class="right">{{ questionInfo.production ? questionInfo.production.data[0].nickname : '' }}</span>
          </div>
          <div class="item">
            <span class="left">阅转比：</span>
            <span class="right">{{ questionInfo.production ? questionInfo.production.data[0].read_proportion : '' }}</span>
          </div>
          <div class="item">
            <span class="left">视频链接：</span>
            <span class="right" style="color: #3298DC" @click="goto(questionInfo.production.data[0].link)">{{ questionInfo.production ? questionInfo.production.data[0].link : '' }}</span>
          </div>
          <div class="item" v-if="questionInfo.excellent">
            <span class="left">视频评分：</span>
            <span class="right">{{ questionInfo.excellent_sum }}</span>
          </div>
          <div class="item" v-if="questionInfo.excellent">
            <span class="left">推优原因：</span>
            <span class="right">{{ questionInfo.excellent }}</span>
          </div>
        </template>
        <div class="load-more" @click="loadMore">
          {{ showMore ? '收起全部' : '查看更多' }}
        </div>
      </div>

      <div class="section" :class="hasAnswerArr.length > 0 ? 'gray': ''">
        <template v-for="(item, index) in questionData">
          <div class="question-section" :key="index">
            <div class="title">{{ item.title }}</div>
            <label class="option item" v-for="(_item, _index) in item.items.data" :key="_index" @click="answerQuestion(index, _item)">
              <div class="left">
                <input type="radio" :checked="hasAnswerArr.indexOf(_item.id) > -1" :disabled="hasAnswerArr.length > 0" :name="'question_' + index" /> 
                <div class="input-icon"></div> {{ _item.value }}:&nbsp;</div>
              <div class="right">{{ _item.title }}</div>
            </label>
          </div>
        </template>
      </div>
    </template>
    <div v-else>
      <Field type="textarea" ref='textarea' rows="1" label="推优原因" v-model="pushReason" />
    </div>
  </div>
</template>

<script>
import fetch from '@/utils/fetch'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      taskId: this.$route.params.id, // 任务id
      questionId: '', // 问卷id
      questionInfo: {}, // 问卷信息
      questionData: [], // 问卷题目
      showMore: false,
      answerArr: [], // 答案列表
      questionMemberList: [], // 评优团成员
      memberList: [], // 制作组成员
      principalName: '', // 负责人
      hasAnswerNum: 0, // 已经答题的人数
      hasAnswerArr: [], // 本人答案，选项
      pushReason: '', // 推优原因
      pushVisible: false, // 是否显示推优
      leftClick: null,
      rightClick: null,
      isLoading: false,
    }
  },

  watch: {
    // 监听textara的变化,自动改变textarea的高度
    pushReason () {
      const el = this.$refs.textarea.$el.querySelector('textarea')
      el.style.height = el.scrollHeight - 4 + 'px'
    },
    pushVisible () {
      if (this.pushVisible) {
        tool.nativeEvent('setRightText', '提交')
        tool.nativeEvent('setTitle', '推优原因')
        window.rightClick = this.submitPush
        window.leftClick = this.showPush
      } else {
        tool.nativeEvent('setTitle', '问卷详情')
        tool.nativeEvent('setRightText', '推优')
        window.rightClick = this.showPush
        window.leftClick = this.leftClickTemp
      }
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
    this.getQuestionId(this.taskId)
    this.getUserInfo()
    this.getTaskInfo()
    // this.getQuestionMember() // 好像没用

    window.leftClick = this.leftClickTemp
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
    // 获取问卷内容 
    getQuestionData(id) {
      fetch('get', `/reviewquestionnaires/${id}/show?include=sum,creator,production,reviewanswer.users`).then(res => {
        this.questionInfo = res.data[0]
        this.memberList = this.questionInfo.reviewanswer.data

        this.memberList.map(n => {
          if (n.users.data.is_department_principal === 1) {
            this.principalName = n.users.data.name
          }
        })

        // 获取问卷题目
        fetch('get', `/reviews/${id}/questions/?include=items,selectrows.creator`).then(res => {
          this.questionData = res.data
          this.hasAnswerNum =  this.questionData[0].selectrows.data.length
          this.questionData.map(n => {
            n.selectrows.data.map(m => {
              if (m.creator.data.id === this.userId) {
                this.hasAnswerArr.push(m.review_question_item_id)
              }
            })
          })
          if (this.hasAnswerArr.length === 0) {
            tool.nativeEvent('setRightText', '提交')
            window.rightClick = this.submit
          } else if (this.hasAnswerNum === this.memberList.length) {
            tool.nativeEvent('setRightText', '推优')
            window.rightClick = this.showPush
          }
        })
      })
    },
    // 根据任务id获取问卷id
    getQuestionId() {
      fetch('get', `/bloggers/${this.taskId}/taskblogger`).then(res => {
        if (res.data) {
          this.questionId = res.data.id
          this.getQuestionData(res.data.id)
        }
      })
    },
    // 获取用户信息
    getUserInfo () {
      fetch('get', `/users/my`).then(res => {
        const data = res.data
        this.userId = data.id
      })
    },
    loadMore () {
      this.showMore = !this.showMore
    },
    // 回答问卷
    answerQuestion (index, data) {
      if (this.hasAnswerArr.length > 0) {
        return
      }
      this.answerArr[index] = data
    },
    // 获取任务详情
    getTaskInfo () {
      const params = {}
      params.data = {
        include: 'principal'
      }
      params.id = this.taskId
      this.getTasks(params)
    },
    // 跳转链接
    goto (url) {
      if (url) {
        let _url = url
        if (url.indexOf('http') !== 0) {
          _url = '//' + url
        }
        window.location.href = _url
      }
    },
    // 获取评优团成员
    getQuestionMember () {
      fetch('get', '/data_dictionary/appraising/448').then(res => {
        this.questionMemberList = res.data
      })
    },
    // 推优原因提交
    submitPush() {
      if (!this.pushReason) {
        toast('请填写推优原因！')
        return
      }
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      const params = {
        excellent: this.pushReason,
        excellent_sum: this.questionInfo.sum.data[0].truncate
      }
      fetch('post', `/reviewquestionnaires/${this.questionId}/create/excellent`, params).then(res => {
        toast('推优成功！')
        this.isLoading = false
        this.getQuestionId(this.taskId)
        this.getTaskInfo()
        // 回调
      }).catch( res => {
        this.isLoading = false
      })
    },
    // 展示推优原因
    showPush () {
      this.pushVisible = !this.pushVisible
    },
    // 试卷提交
    submit() {
      if (this.answerArr.length < this.questionData.length) {
        toast('您有未作答题目，请作答完成后提交！')
        return
      }
      if (this.isLoading) {
        return
      }
      const params = {
        review_question_item: {}
      }
      for (const n of this.answerArr) {
        params.review_question_item[n.review_question_id] = n.id
      }
      this.isLoading = true
      fetch('post', `/reviews/${this.questionId}/store/Answer`, params).then(res => {
        toast('问卷提交成功！')
        this.isLoading = false
        this.getQuestionId(this.taskId)
        this.getTaskInfo()
      }).catch( res => {
        this.isLoading = false
      })
    },
    // 关闭h5页面
    leftClickTemp () {
      tool.nativeEvent('back', 2)
    },
  }
}
</script>

<style lang="scss" scoped>
.question {
  padding-bottom: .2rem;
  font-size: .32rem;
  .title {
    color: #333;
    font-weight: 500;
    padding: .2rem .2rem 0 .1rem;
    span {
      color: #3298DC;
      float: right;
      font-size: .34rem;
    }
  }
  .item {
    margin: .2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left {
      color: #666;
      flex-shrink: 0;
    }
    .right {
      color: #333;
      flex-shrink: 1;
    }
  }
  .section {
    background-color: #fff;
    margin-top: .2rem;
  }
  .section:nth-child(1) {
    margin-top: 0;
  }
  .load-more {
    text-align: center;
    padding-bottom: .2rem;
    font-size: .28rem;
  }
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    visibility: hidden;
  }
  .input-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #D8D8D8;
    position: relative;
    float: left;
    margin-right: .1rem;
    top: 1px; 
  }
  input:checked + .input-icon {
    border: 1px solid #3F51B5;
  }
  input:checked + .input-icon:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 5px;
    left: 5px;
    background-color: #3F51B5;
  }
  input:checked + .input-icon {
    border: 1px solid #A4B1FF;
  }
  input:disabled + .input-icon {
    border: 1px solid #E0E0E0;
  }
  input:disabled:checked  + .input-icon {
    border: 1px solid #A4B1FF;
  }
  input:disabled:checked + .input-icon:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 5px;
    left: 5px;
    background-color: #A4B1FF;
  }
  .question-section {
    line-height: 1.8;
    color: #333;
    .title {
      padding-left: .2rem;
    }
    .left {
      color: #333;
      margin-right: .2rem;
    }
  }
  .gray {
    .title {
      padding-left: .2rem;
      color: #A4A4A4;
    }
    .left {
      color: #A4A4A4;
      margin-right: .2rem;
    }
    .right {
      color: #A4A4A4;
    }
  }
}
</style>
