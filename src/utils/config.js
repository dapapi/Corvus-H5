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
}

