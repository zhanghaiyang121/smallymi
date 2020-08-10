// pages/news/news.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalHeight: 44,
    pageSize: 10,
    pageNum: 1,
    userinfo: {},
    loadFinish: false,
    newList:  [],
    isLoad: false
  },
  fetchParentlist(){
    let that=this
    let openId = wx.getStorageSync('openid')
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getAdultByOpenid',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;"
      },
      data:{
        openId
      },
      method:"POST",
      success(res){
        that.setData({
          userinfo:res.data.data
        })
        that.getNews()
      }
    })
  },
  getNews(){
    let data = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum,
      provinceCode:this.data.userinfo.provinceCode,
      cityCode:this.data.userinfo.cityCode,	
      areaCode:this.data.userinfo.areaCode,	
      committeeCode:this.data.userinfo.committeeCode,	
      streetCode:this.data.userinfo.streetCode
    }
    wx.request({
      url: 'https://vaccing.51vipsh.com/app/getMessageByPage',
      header:{
        "Content-Type":"application/json"
      },
      data:data,
      method:"POST",
      success: (res) => {
        let data = res.data.data
        if(data.records.length > 0) {
          // let list = data.records.map(item => {
          //   if(+new Date(item.createTime) > +new Date(this.data.userinfo.userNewLogin)){

          //   }
          // })
          let newList = this.data.newList.concat(data.records)
          this.setData({
            newList
          })
        } else {
          this.setData({
            loadFinish: true
          })
        }
        this.setData({
          isLoad: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      totalHeight: app.globalData.statusHeight + app.globalData.navHeight
    })
    this.fetchParentlist()
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
    if(!this.data.loadFinish){
      let pageNum = this.data.pageNum + 1
      this.setData({
        pageNum
      })
      this.getNews()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})