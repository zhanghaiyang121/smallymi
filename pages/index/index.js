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
    child:null,
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
    userInfo:null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    childlist:null,
    parent:null
  },
  onShow: function () {
    console.log(222)
    let that=this
    wx.getStorage({
      key: 'openid',
      success: function(res){
        console.log(res)
        // success
        //说明已经受过权了，可以获取用户信息了
        wx.getUserInfo({
          success:res=>{
            console.log(res)
            const app=getApp()
            app.userInfo=res.userInfo
            that.getChildInfo()
          }
        })
        console.log(1)
      },
      fail:(err)=>{
        console.log(2)
        //第一次登录，跳到登录页
        console.log(wx)
        wx.reLaunch({
          url: '/pages/me/me'
        })
      }
    })
    this.getchild()
    this.getparents()
  },
  getChildInfo(){
    let that=this
    wx.getStorage({
      key: 'childinfo',
      success: function(res){
        // 获取儿童信息成功
        that.setData({
          child:res.data
        })
        // 渲染儿童列表
        console.log("渲染儿童注射后的疫苗列表")
        that.fetchChildList()
      },
      fail:err=>{
        //第一次登录，跳到登录页
        // 渲染默认列表
        console.log("渲染默认疫苗列表")
        that.fetchList()
      }
    })
    this.getparents()
    this.getchild()
  },
  getparents(){
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
  getchild(){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getChildByOpenId',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;"
      },
      data:{
        openId:1
      },
      method:"POST",
      success(res){
        that.setData({
          childlist:res.data.data
        })
      }
    })
  },
  dealCarsList(data){
    
  },
  
  fetchList(){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/vaccineList',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      },
      data:{
        area :1,
        type :2
      },
      method:"POST",
      success(res){
        // that.dealCarsList(res.data.data)
        that.setData({
          cards:res.data.data
        })
      }
    })
    
  },
  fetchChildList(){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/childRecordList',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      },
      data:{
        childId :1
      },
      method:"POST",
      success(res){
        //获取默认列表和已注入疫苗做对比
        let childYmilist=res.data.data
        wx.request({
          url: 'http://121.199.7.204:8085/app1/vaccineList',
          header:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
          },
          data:{
            area :1,
            type :2
          },
          method:"POST",
          success(data){
            // that.dealCarsList(res.data.data)
            let ymilist=data.data.data
            ymilist.forEach(item=>{
              childYmilist.forEach(citem=>{
                if(citem.vid==item.id){
                  if(item.status!=1){
                    item.status=citem.status
                    console.log(item)
                  }
                }else{
                  if(item.num>0){
                    item.status=0
                  }else{
                    item.status=-1
                  }
                }
              })
            })
            console.log(ymilist)
            that.setData({
              cards:ymilist
            })
           
          }
        })

        
      }
    })
    
  }
})
