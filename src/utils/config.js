import Cookies from 'js-cookie'
// 临时修改
const u = navigator.userAgent
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

export default {
  tokenString: 'CORVUS-ACCESS-TOKEN',
  // apiUrl: `http${isIOS?'s':''}://sandbox-api-crm.papitube.com`,
  // apiUrl: `https://sandbox-api-crm.papitube.com`,
  apiUrl: `https://test-api-crm.papitube.com`,
  imgUrl: 'https://res-crm.papitube.com/',
  getHeaders: function () {
      let headers = {
          'Accept': 'application/vnd.Corvus.v1+json',
          'Access-Control-Expose-Headers': 'Location',
          'Access-Control-Allow-Headers': 'Authorization'
      };
        
        // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBkZmYzMzc0OGFhYjQ2YTNjOGFlNmJkZGY4NzhlZjNiZjMxZDcyMzg1MjIyNzk1NTlkNGUxYzlhMTU2NTQyODdjZWQ1MTBmN2M4N2ZmNTVjIn0.eyJhdWQiOiIyIiwianRpIjoiMGRmZjMzNzQ4YWFiNDZhM2M4YWU2YmRkZjg3OGVmM2JmMzFkNzIzODUyMjI3OTU1OWQ0ZTFjOWExNTY1NDI4N2NlZDUxMGY3Yzg3ZmY1NWMiLCJpYXQiOjE1NDc2MDI3MzAsIm5iZiI6MTU0NzYwMjczMCwiZXhwIjoxNTc5MTM4NzMwLCJzdWIiOiI3Iiwic2NvcGVzIjpbIioiXX0.wrYJN1M51lZ-GH2J1rn6vI-rYKp5GjF7zMHnVXaaA2eZGDJshNjo-TC_B5h86M6k-UW6MWMhyKct99lWa16rJ_RpA3PoZar3RmEbB3csZLoWqiTFtvfBaZrIaa41FjMuy7nydUs49rD1LeW_ryMyfn-8TJ8VXsGR6JB7Ip9jzFcQzENcC7K7CMb5KoVfR319rKYwny3TwCeo1TuBYWTswEcWbvl5FGo0kEU0fPuXYvyxgwOUTrwfkzZ_itoq6lvT-DP6IDDwoZsxeuLkNGiCglwx32EWxflCYhcjpXBbZcKdaicD2TeZvPvP_lIUtzhKdGB9MbVKRW9YuGJLidkeLMZzFarHHeKQYeYd0nobh1jRRPsPZJSeX67bKVUATZOqaW8LcYbTbRJHmhhLoMsulTLCWcJ6mbVFGFQWApCmWvnl1p0E2ctGY1RfUWB66-0yKvtdywtk29eYBoyBMVSJkAFBNvMQ6gOMaNdnLQ9HXv-ntMoVBx1MsfjqmMvHk0B6JBjSRwTsLGRTCF3mtZ5ndfOcRvfAfHn53vklF-gjWvz4xRx1A478Ve8QAOq4Y5Agl2vesfO3_Qz9b8t31uEFRgE1u2ce8VE-fQ-INzgoopT4KLjj4pzmSH3dOlCcOFV27j7urNoxk2HE2u_OsYMBgCvDIEMLQOlcfCeP2-WCevg';
      let token = Cookies.get('Authorization')
      if (token) {
        if (token.substr(0, 7) !== 'Bearer ') {
          token = 'Bearer ' + token
        }
        headers.Authorization = token
      }
      return headers
  },
  token: Cookies.get('Authorization'),
  whichDevice:function(){
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isIOS) {
        return 'ios'
      }
      if (isAndroid) {
        return 'android'
      }
  },
  deviceWay:function(name,params){
    
    if (this.whichDevice() == 'ios'){
      window.webkit.messageHandlers[name].postMessage(params)
    }
    if (this.whichDevice() == 'android'){
      window.webView[name](params)
    }
  },
  //判断设备
  deviceBack:function(status){
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isIOS) {
          // alert('调用ios方法')
          window.webkit.messageHandlers.back.postMessage(status)
      }
      if (isAndroid) {
          // alert('调用安卓方法')
          window.webView.back(status)
      }
  },
  // setTitle: function (title) {
  //   let u = navigator.userAgent
  //   let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  //   let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  //   if (isIOS) {
  //     window.webkit.messageHandlers.searchTxt.setTitle(title)
  //   }
  //   if (isAndroid) {
  //     window.webView.setTitle(title)
  //   }
  // },
  taskLevelArr: [
    {
      name: 'S',
      value: 4
    },
    {
        name: 'A',
        value: 3
    },
    {
        name: 'B',
        value: 2
    },
    {
        name: 'C',
        value: 1
    },
  ],
  // 性别
  genderArr: [{
        name: '男',
        value: 1
      },
      {
        name: '女',
        value: 2
      }
    ],
    //艺人来源
    artistSourceArr: [

      {
        name: '线上',
        value: 1
      },
      {
        name: '线下',
        value: 2
      },
      {
        name: '抖音',
        value: 3
      },
      {
        name: '微博',
        value: 4
      },
      {
        name: '陈赫',
        value: 5
      },
      {
        name: '北电',
        value: 6
      },
      {
        name: '杨光',
        value: 7
      },
      {
        name: '中戏',
        value: 8
      },
      {
        name: 'papitube推荐',
        value: 9
      },
      {
        name: '地标商圈',
        value: 10
      },
    ],
    // 艺人沟通状态
    artistStatusArr: [

      {
        name: '已签约',
        value: 1,
        color: '#4CAF50'
      },
      {
        name: '经理人沟通中',
        value: 2,
        color: "#00BCD4"
      },
      {
        name: '兼职星探沟通中',
        value: 3,
        color: "#00B0FF"
      },
      {
        name: '待定',
        value: 4,
        color: '#FF9800'
      },
      {
        name: '淘汰',
        value: 5,
        color: '#9e9e9e'
      },
      {
        name: '合同中',
        value: 6,
        color: '#9c27b0'
      },
      {
        name: '联系但无回复',
        value: 7,
        color: '#f44336'
      },
    ],
    yesOrNo: [{
        name: '是',
        value: 1,
      },
      {
        name: '否',
        value: 2
      }
    ],
    
    blogBoolean:[
      {
        name:'是',
        value:'1'
      },
      {
        name:'否',
        value:'0'
      }
    ],
    artistPlatformList: [{
        value: 1,
        label: '微博'
      },
      {
        value: 2,
        label: '百科'
      },
      {
        value: 3,
        label: '抖音'
      },
      {
        value: 4,
        label: '其他'
      },
    ],
  // 客户类别
  clientLevelArr: [ 
    {
      name: '直客',
      value: 1
    },
    {
      name: '代理公司',
      value: 2
    }
  ],
  // 线索来源
  trailOrigin: [
    {
      name: '商务邮箱',
      value: 1
    },
    {
      name: '工作室邮箱',
      value: 2
    },
    {
      name: '微信公众号',
      value: 3
    },
    {
      name: '员工',
      value: 4
    },
    {
      name: '公司高管',
      value: 5
    },
    {
      name: '纯中介',
      value: 6
    },
    {
      name: '香港中介',
      value: 7
    },
    {
      name: '台湾中介',
      value: 8
    },
    {
      name: '复购直客',
      value: 9
    },
    {
      name: '媒体介绍',
      value: 10
    },
    {
      name: '公关or广告公司',
      value: 11
    }
  ],
    //社交平台
    platformArr: [{
      value: 1,
      label: '微博'
    }, {
      value: 2,
      label: '抖音'
    }, {
      value: 3,
      label: '小红书',
    }],
    // 博主沟通状态
    papiCommunicationStatusArr: [
      {
        name: '初步接触',
        value: 1,
        color: '#00bcd4'
      },
      {
        name: '沟通中',
        value: 2,
        color: '#00b0ff'
      },
      {
        name: '合同中',
        value: 3,
        color: '#ff9800'
      },
      {
        name: '沟通完成',
        value: 4,
        color: '#4caf50'
      },
    ],
    attachmentTypeArr: [{
        name: '艺人简报',
        value: 2
      },
      {
        name: '独白视频',
        value: 3
      },
      {
        name: '艺人规划',
        value: 4
      },
      {
        name: '自我介绍视频',
        value: 5
      },
      {
        name: '其他',
        value: 6
      }

    ],
    //公告类型
    classifyArr: [{
        name: '规则制度',
        value: 1
      },
      {
        name: '内部公告',
        value: 2
      }
    ],
    //项目来源
    trailOrigin: [{
        name: '商务邮箱',
        value: 1
      },
      {
        name: '工作室邮箱',
        value: 2
      },
      {
        name: '微信公众号',
        value: 3
      },
      {
        name: '员工',
        value: 4
      },
      {
        name: '公司高管',
        value: 5
      },
      {
        name: '纯中介',
        value: 6
      },
      {
        name: '香港中介',
        value: 7
      },
      {
        name: '台湾中介',
        value: 8
      },
      {
        name: '复购直客',
        value: 9
      },
      {
        name: '媒体介绍',
        value: 10
      },
      {
        name: '公关or广告公司',
        value: 11
      }
    ],
    //优先级
    levelArr: [{
        name: 'S',
        value: 4
      },
      {
        name: 'A',
        value: 3
      },
      {
        name: 'B',
        value: 2
      },
      {
        name: 'C',
        value: 1
      }
    ],
    //可见范围
    visibleRangeArr: [{
        name: '私有',
        value: '1'
      },
      {
        name: '公开',
        value: '0'
      }
    ],
  // 客户级别
  clientLevelArr: [
    {
      name: '直客',
      value: 1
    },
    {
      name: '代理公司',
      value: 2
    }
  ],
  // 客户规模
  clientScaleArr: [
    {
      name: '上市公司',
      value: 1
    },
    {
      name: '500强',
      value: 2
    },
  ],
  // 是否锁价
  lockArr: [
    {
      name: '否',
      value: 2
    },
    {
      name: '是',
      value: 1
    }
  ],
  // 合作类型
  cooperationTypeArr: [
    {
      name: '代言',
      value: 1
    },
    {
      name: '合作',
      value: 2
    },
    {
      name: '活动',
      value: 3
    },
    {
      name: '微博',
      value: 4
    },
    {
      name: '抖音',
      value: 5
    },
    {
      name: '短期代言',
      value: 6
    },
    {
      name: '时装周',
      value: 7
    },
    {
      name: '未确定',
      value: 8
    }
  ],
  // 销售线索状态
  trailStatusArr: [
    {
      name: '开始接洽',
      value: 1,
      color: '#00b0ff'
    },
    {
      name: '主动拒绝',
      value: 2,
      color: '#9e9e9e'
    },
    {
      name: '客户拒绝',
      value: 3,
      color: '#f44336'
    },
    {
      name: '进入谈判',
      value: 4,
      color: '#00bcd4'
    },
    {
      name: '意向签约',
      value: 5,
      color: '#f44336'
    },
    {
      name: '签约中',
      value: 6,
      color: '#ff9800'
    },
    {
      name: '签约完成',
      value: 7,
      color: '#4caf50'
    },
    {
      name: '待执行',
      value: 8,
      color: '#ff9800'
    },
    {
      name: '在执行',
      value: 9,
      color: '#00bcd4'
    },
    {
      name: '已执行',
      value: 10,
      color: '#4caf50'
    },
    {
      name: '客户回款',
      value: 11,
      color: '#9c27b0'
    },
    {
      name: '客户反馈分析及项目复盘',
      value: 12,
      color: '#3f51b5'
    },
  ],
  // 任务优先级
  priorityArr: [
    {
      name: '高',
      value: 1
    },
    {
      name: '中',
      value: 2
    },
    {
      name: '低',
      value: 3
    }
  ],
  //博主级别
  taskLevelArr: [{
      name: 'S',
      value: 4
    },
    {
      name: 'A',
      value: 3
    },
    {
      name: 'B',
      value: 2
    },
    {
      name: 'C',
      value: 1
    },
  ],
  // 签约状态
  signState: [{
      name: '签约中',
      value: 1,
      color: '#ff9800'
    },
    {
      name: '已签约',
      value: 2,
      color: '#4caf50'
    },
    {
      name: '已解约',
      value: 3,
      color: '#f44336'
    }
  ],
  //商务项目合作类型
  cooperationTypeArr: [{
      name: '代言',
      value: 1
    },
    {
      name: '合作',
      value: 2
    },
    {
      name: '活动',
      value: 3
    },
    {
      name: '微博',
      value: 4
    },
    {
      name: '抖音',
      value: 5
    },
    {
      name: '短期代言',
      value: 6
    },
    {
      name: '时装周',
      value: 7
    },
    {
      name: '未确定',
      value: 8
    }
  ],
  //销售线索状态
  trailStatusArr: [{
      name: '开始接洽',
      value: 1,
      color: '#00b0ff'
    },
    {
      name: '主动拒绝',
      value: 2,
      color: '#9e9e9e'
    },
    {
      name: '客户拒绝',
      value: 3,
      color: '#f44336'
    },
    {
      name: '进入谈判',
      value: 4,
      color: '#00bcd4'
    },
    {
      name: '意向签约',
      value: 5,
      color: '#f44336'
    },
    {
      name: '签约中',
      value: 6,
      color: '#ff9800'
    },
    {
      name: '签约完成',
      value: 7,
      color: '#4caf50'
    },
    {
      name: '待执行',
      value: 8,
      color: '#ff9800'
    },
    {
      name: '在执行',
      value: 9,
      color: '#00bcd4'
    },
    {
      name: '已执行',
      value: 10,
      color: '#4caf50'
    },
    {
      name: '客户回款',
      value: 11,
      color: '#9c27b0'
    },
    {
      name: '客户反馈分析及项目复盘',
      value: 12,
      color: '#3f51b5'
    },
  ],
}

