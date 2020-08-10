// components/home/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    card:{
      type:Object
    },
    num:Number,
    fee:String,
    type:String,
    name:String,
    vid:Number,
    child:Object,
    parent:Object
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
    //预约
    subscribe(){
      //先判断用户是否登录
      var openid = wx.getStorageSync('openid')
      if(!openid){
        wx.showToast({
          title: '请前往登录',
          icon: 'none',
          duration: 2000
        })
      }
      //在判断用户是否有监护人
      if(!this.data.parent){
        wx.showToast({
          title: '请添加监护人',
          icon: 'none',
          duration: 2000
        })
        return
      }
      //在判断是否有儿童
      if(!this.data.child){
        wx.showToast({
          title: '请选择儿童',
          icon: 'none',
          duration: 2000
        })
        return
      }
      console.log(this.data.card)
      wx.setStorageSync('cardInfo', this.data.card)
      //跳到预约页面
      wx.navigateTo({
        url: '/pages/sub/index',
      })
    },
  }
})
