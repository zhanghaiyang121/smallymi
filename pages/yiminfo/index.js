// pages/yiminfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yiminfo:null,
    yim:null,
    totalHeight:44,
    isFree:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const app=getApp()
    console.log(app.globalData)
    
    let yim=wx.getStorageSync('yiminfo')
    let arr=yim.desc_info.split("|")
    let isFree=true
    if(yim.cost!=0){
      isFree=false
    }
    this.setData({
      yiminfo:arr,
      yim:yim,
      isFree,
      totalHeight: app.globalData.statusHeight + app.globalData.navHeight
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})