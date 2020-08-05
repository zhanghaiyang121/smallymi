// components/me/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false
  },

  /**
   * 组件的方法列表
   */
  ready(){
    wx.getUserInfo({
      success: res => {
        const app = getApp();
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  methods: {
    getUserInfo: function(e) {
      console.log(e)
      const app = getApp();
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
  }
})
