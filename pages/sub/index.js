// pages/sub/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //预约
  subscribe(){
    let that=this
    console.log(that.data.vid)
    wx.request({
      url: 'http://121.199.7.204:8085/app1/updateChildRecord',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      },
      data:{
        childId:1,
        recordId:1,
        times:"2020-02-16 17:30:32",
        vname:2,
        vid:1
      },
      method:"POST",
      success(res){
        console.log(res)
      }
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