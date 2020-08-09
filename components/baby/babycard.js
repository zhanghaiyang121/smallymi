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
  ready(){
    let curYear = new Date().getFullYear()
    let birth = this.data.child.birthday.split('-')[0]
    let age = curYear > birth ? curYear - birth : 0
    this.setData({
      age
    })
  }
})
