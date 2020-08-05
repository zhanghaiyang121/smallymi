//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[
      {
        index:1,
        name:"北京新增",
        num:0
      },
      {
        index:2,
        name:"国内新增",
        num:122
      },
      {
        index:3,
        name:"境外输入",
        num:25
      },
      {
        index:4,
        name:"国外新增",
        num:2333
      }
    ],
    cards:[],
    currentage:0,
    agelist:[
      "出生时",
      "一岁时",
      "两岁时",
      "三岁时",
      "四岁时",
      "五岁时",
      "六岁时",
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //判断是否有openid
    // wx.setStorageSync('storage', this.data.storage)
    let that = this; 
    wx.getStorage({
      key: 'openid',
      success: function(res){
        // success
        console.log(res)
      },
      fail:err=>{
        //第一次登录，跳到登录页
        wx.switchTab({
          url: '/pages/me/me'
        })
      }
    })
    this.fetchList()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  dealCarsList(data){
    let agearr=[]
    data.forEach(item=>{
      if(!agearr.includes(item.time)){
        agearr.push(item.time)
      }
    })
    let cardlist=[]
    agearr.forEach((item,index)=>{
      cardlist[index]={
        age:item,
        list:[]
      }
    })
    data.forEach(item=>{
      let index
      index=agearr.indexOf(item.time)
      cardlist[index].list.push(item)
    })
    this.setData({
      cards:cardlist
    })
    console.log(cardlist)

  },
  fetchList(){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/vaccineList?area=1',
      header:{
        "Content-Type":"application/json"
      },
      method:"POST",
      success(res){
        that.dealCarsList(res.data.data)
      }
    })
    
  }
})
