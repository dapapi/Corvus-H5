export default {
  tokenString: 'CORVUS-ACCESS-TOKEN',
  apiUrl: 'https://sandbox-api-crm.papitube.com',
  taskLevelArr: [
    {
      name: 'S',
      value: 1
    },
    {
      name: 'A',
      value: 2
    },
    {
      name: 'B',
      value: 3
    },
    {
      name: 'C',
      value: 0
    }
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
}

