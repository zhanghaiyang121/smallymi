// components/me/listcard/listcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageurl:{
      type:String,
      value:"../../images/baby-head.png"
    },
    name:{
      type:String,
      value:"监护人"
    },
    pageurl:{
      type:String,
      value:""
    },
    child:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    age: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectBaby(){
      //选择儿童
      wx.setStorageSync('childinfo',this.data.child)
      wx.setStorageSync('isaddchild',false)
      wx.navigateTo({
        url: '/pages/addbaby/index'
      })
    }
  },
  observers: {
    'child.birthday': function(birthday) {
      let curYear = new Date().getFullYear()
      let curMonth = new Date().getMonth() + 1
      let birthYear = birthday.split('-')[0]
      let birthMonth = birthday.split('-')[1]
      let age = '0岁'
      if(curYear > birthYear){
        age = curYear - birthYear + '岁'
      } else if (curYear == birthYear) {
        age = curMonth - birthMonth + '个月'
      }
      this.setData({
        age
      })
    }
  }
})
