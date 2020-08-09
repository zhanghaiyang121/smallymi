// components/nav/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showBack: {
      type: Boolean,
      value: false
    },
    bgColor: {
      type: String,
      value: '#fff'
    },
    textColor: {
      type: String,
      value: '#333'
    },
    navTitle: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: 0,
    statusHeight: 0
  },

  attached () {
    this.setData({
      navHeight: app.globalData.navHeight,
      statusHeight: app.globalData.statusHeight
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
