// components/me/header/header.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false,
    defaultUser:true
  },

  /**
   * 组件的方法列表
   */
  ready(){
    const app=getApp()
    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          defaultUser:false
        })
      },
      fail:err=>{
        //
      }
    })
    
  },
  methods: {
    getUserInfo: function(e) {
      if(this.data.hasUserInfo){
        return
      }
      const app = getApp();
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        defaultUser:false
      })
      //获取openid
      wx.login({
        success:res=>{
          this.getOpenid(e.detail.userInfo.avatarUrl,e.detail.userInfo.nickName,res.code)
        }
      })
      
    },
    getOpenid(userHead,userName,code){
      //模拟获取openid
      
      wx.request({
        url: 'https://vaccing.51vipsh.com/app/login',
        header:{
          "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data:{
          code,
          userHead,
          userName
        },
        method:"POST",
        success(res){
          //缓存监护人id
          wx.setStorageSync('parentId',res.data.data.id)
          wx.setStorageSync('openid',res.data.data.open_id)
        }
      })
    }
  }
})
