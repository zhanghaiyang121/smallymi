// pages/feedback/feedback.js
import {getComplain} from '../../utils/api'
let ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    userinfo:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //保存反馈信息
  bindFormSubmit(e) {
    let content = e.detail.value.textarea
    if(!content){
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(!this.data.userinfo.cityCode || !this.data.userinfo.areaCode){
      wx.showToast({
        title: '请设置用户信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let that=this
   wx.request({
     url: 'https://vaccing.51vipsh.com/app1//saveAdvice',
     header:{
       "Content-Type":"application/json"
     },
     data:{
      pid:this.data.userinfo.pid,	
      disc:content,
      provinceCode:this.data.userinfo.provinceCode,
      cityCode:this.data.userinfo.cityCode,	
      areaCode:this.data.userinfo.areaCode,	
      committeeCode:this.data.userinfo.committeeCode,	
      streetCode:this.data.userinfo.streetCode
     },
     method:"POST",
     success(res){
      wx.navigateBack()
       // that.dealCarsList(res.data.data)
      
     }
   })
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
    this.fetchParentlist()
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