// pages/sublist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalHeight:44,
    isShow:false,
    list:[],
    currentid:null,
    currentstatus:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app =  getApp();
    this.setData({
      totalHeight: app.globalData.statusHeight + app.globalData.navHeight
    })
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
    this.fetchlist()
  },
  fetchlist(){
    let that=this
    let parentId=wx.getStorageSync('parentId')
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/getOrderList',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;"
      },
      method:"POST",
      data: {
        adultId: parentId
      },
      success(res){
        console.log("预约列表")
        console.log(res.data.list)
        that.setData({
          list:res.data.list
        })
      }
    })
  },
  updatestatus(){
    let that=this
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/updateStatus',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;"
      },
      method:"POST",
      data: {
        id: that.data.currentid
      },
      success(res){
        that.setData({
          isShow:false,
          currentid:null,
          currentstatus:null
        })
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        that.fetchlist()
      }
    })
  },
  cancelupdate(){
    this.setData({
      isShow:false,
      currentid:null,
      currentstatus:null
    })
  },
  cancelsub(e){
    console.log(e.currentTarget.dataset)
    this.setData({
      isShow:true,
      currentid:e.currentTarget.dataset.info.id,
      currentstatus: e.currentTarget.dataset.info.status
    })
  },
  cancelMark(){
    this.setData({
      isShow:false
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