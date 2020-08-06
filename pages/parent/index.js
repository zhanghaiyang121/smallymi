// pages/babylist/babylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parent:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  fetchBabylist(){
    console.log(222222222222)
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getAdultByOpenid',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;"
      },
      data:{
        openId:1
      },
      method:"POST",
      success(res){
        console.log(res)
        that.setData({
          parent:res.data.data
        })
      }
    })
  },
  fetchBabylist(){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getAdultByOpenid',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;"
      },
      data:{
        openId:1
      },
      method:"POST",
      success(res){
        console.log(res)
        that.setData({
          parent:res.data.data
        })
      }
    })
  },
  addParentInfo(){
    wx.navigateTo({
      url: "/pages/addUser/index",
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
    this.fetchBabylist()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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