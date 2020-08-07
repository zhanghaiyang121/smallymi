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
    age:String,
    child:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectBaby(){
      //选择儿童
      wx.setStorageSync('childinfo',this.data.child)
      this.triggerEvent('changechild',this.data.child)
    }
  }
})
