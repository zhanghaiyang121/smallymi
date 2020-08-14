
const app = getApp()
// pages/sub/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalHeight: 44,
    card: {}, // 疫苗信息
    child: {}, // 儿童信息
    parent: {}, // 父级信息
    subscribeList: [], // 挂号列表
    currentTab: 0, // 默认选中挂号列表
    isShow:false,
    subinfo:"很抱歉,预约失败！",
    subimage:"../../images/dconfirm.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let card = wx.getStorageSync('cardInfo')
    let child = wx.getStorageSync('childinfo')
    let parent = wx.getStorageSync('parentInfo')
    this.setData({
      card,
      child,
      parent
    })
    this.getSubscribeDate();
  },
  getSubscribeDate() {
    let that = this;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let tomorraw = date.getDate() + 1;
    let createTime = year + '-' + month + '-' + tomorraw;
    let parent = wx.getStorageSync('parentInfo')
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/getRegisteredList',
      data: {
        code: parent.areaCode,
        createTime: createTime
      },
      method: "POST",
      success(res) {
        let subscribeList = res.data.data.splice(0, 6);
        subscribeList.forEach(i => {
          let time = i.createTime.replace(/-/g,'/')
          let date = new Date(time);
          let month = date.getMonth() > 8 ? date.getMonth()+1 : '0' + (date.getMonth()+1)
          i.monthDay = month + '-' + date.getDate();
          i.week = that.getWeek(date.getDay());
          i.isHaveNum = i.total - i.agreeNum > 0 ? true : false
        })
        that.setData({
          subscribeList: subscribeList
        })
        console.log(that.data.subscribeList)
      }
    })
  },
  getWeek(week) {
    switch (week) {
      case 1:
        return '星期一';
      case 2:
        return '星期二';
      case 3:
        return '星期三';
      case 4:
        return '星期四';
      case 5:
        return '星期五';
      case 6:
        return '星期六';
      case 0:
        return '星期日';
    }
  },
  // 选择日期
  switchList(e) {
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  //预约点击
  subscribe() {
    console.log(123)
    if(!this.data.subscribeList.length){
      wx.showToast({
        title: '没有预约列表',
        icon: 'none'
      })
      return;
    }
    wx.requestSubscribeMessage({
      tmplIds: ["3-dJHDl3xWjbgkuNcuFTWhhUEwWhN_30Z0Ot-FXvArg"],
      success: res => {
        this.subscribeData();
      },
      fail: err => {}
    })
  },
  // 预约接口
  subscribeData() {
    let that=this
    let currentTab = this.data.currentTab
    let time = new Date().getFullYear()+ '-' + this.data.subscribeList[currentTab].monthDay
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/updateChildRecord',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: {
        childId: this.data.child.cid?this.data.child.cid:0,
        adultId: this.data.parent.id,
        recordId: 0,
        times: time,
        vname: this.data.card.name,
        vid: this.data.card.id,
        type: this.data.card.type
      },
      method: "POST",
      success(res) {
        //判断flag状态
        let flag=false
        if(res.data.code==200){
          flag=true
        }else{
          flag=false
        }
        if(flag){
          that.setData({
            isShow:true,
            subinfo:res.data.msg,
            subimage:"../../images/confirm.png"
          })
        }else{
          that.setData({
            isShow:true,
            subinfo:res.data.msg,
            subimage:"../../images/dconfirm.png"
          })
        }
        setTimeout(() => {
          wx.navigateTo({
            url: "/pages/index/index",
          })
        }, 1000);
      }
    })
  },
  cancelMark(){
    this.setData({
      isShow:false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.setData({
        totalHeight: app.globalData.statusHeight + app.globalData.navHeight
      })
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