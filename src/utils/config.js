export default {
  tokenString: 'CORVUS-ACCESS-TOKEN',
  apiUrl: 'https://sandbox-api-crm.papitube.com',
  getHeaders: function () {
    let headers = {
      'Accept': 'application/vnd.Corvus.v1+json',
      'Access-Control-Expose-Headers': 'Location',
      'Access-Control-Allow-Headers': 'Authorization'
    };
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBkZmYzMzc0OGFhYjQ2YTNjOGFlNmJkZGY4NzhlZjNiZjMxZDcyMzg1MjIyNzk1NTlkNGUxYzlhMTU2NTQyODdjZWQ1MTBmN2M4N2ZmNTVjIn0.eyJhdWQiOiIyIiwianRpIjoiMGRmZjMzNzQ4YWFiNDZhM2M4YWU2YmRkZjg3OGVmM2JmMzFkNzIzODUyMjI3OTU1OWQ0ZTFjOWExNTY1NDI4N2NlZDUxMGY3Yzg3ZmY1NWMiLCJpYXQiOjE1NDc2MDI3MzAsIm5iZiI6MTU0NzYwMjczMCwiZXhwIjoxNTc5MTM4NzMwLCJzdWIiOiI3Iiwic2NvcGVzIjpbIioiXX0.wrYJN1M51lZ-GH2J1rn6vI-rYKp5GjF7zMHnVXaaA2eZGDJshNjo-TC_B5h86M6k-UW6MWMhyKct99lWa16rJ_RpA3PoZar3RmEbB3csZLoWqiTFtvfBaZrIaa41FjMuy7nydUs49rD1LeW_ryMyfn-8TJ8VXsGR6JB7Ip9jzFcQzENcC7K7CMb5KoVfR319rKYwny3TwCeo1TuBYWTswEcWbvl5FGo0kEU0fPuXYvyxgwOUTrwfkzZ_itoq6lvT-DP6IDDwoZsxeuLkNGiCglwx32EWxflCYhcjpXBbZcKdaicD2TeZvPvP_lIUtzhKdGB9MbVKRW9YuGJLidkeLMZzFarHHeKQYeYd0nobh1jRRPsPZJSeX67bKVUATZOqaW8LcYbTbRJHmhhLoMsulTLCWcJ6mbVFGFQWApCmWvnl1p0E2ctGY1RfUWB66-0yKvtdywtk29eYBoyBMVSJkAFBNvMQ6gOMaNdnLQ9HXv-ntMoVBx1MsfjqmMvHk0B6JBjSRwTsLGRTCF3mtZ5ndfOcRvfAfHn53vklF-gjWvz4xRx1A478Ve8QAOq4Y5Agl2vesfO3_Qz9b8t31uEFRgE1u2ce8VE-fQ-INzgoopT4KLjj4pzmSH3dOlCcOFV27j7urNoxk2HE2u_OsYMBgCvDIEMLQOlcfCeP2-WCevg';
    if (token) {
      headers.Authorization = 'Bearer ' + token
    }
    return headers
  },
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

