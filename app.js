//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    const sysInfo = wx.getSystemInfoSync()
    const btnInfo = wx.getMenuButtonBoundingClientRect()
    this.globalData.statusHeight = sysInfo.statusBarHeight
    this.globalData.navHeight = btnInfo.height + (btnInfo.top - sysInfo.statusBarHeight) * 2
  },
  globalData: {
    navHeight: 0,
    statusHeight: 0
  }
})