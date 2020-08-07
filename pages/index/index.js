//index.js
//获取应用实例
const app = getApp()
let config = require('../../utils/config.js')
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
    parent:null,
    hospital:null
  },
  onShow: function () {
    console.log(222)
    let that=this
    // wx.clearStorage()
    let openid=wx.getStorageSync('openid')
    if(openid){
      this.getparents()
      //判断缓存里是否有儿童信息
      let childinfo=wx.getStorageSync('childinfo')
      if(childinfo){
        //如果有获取儿童对应的疫苗信息
        that.setData({
          child:childinfo
        })
        that.fetchHospital(childinfo.area_code)
        that.fetchChildList()
      }else{
        // 渲染默认疫苗列表并获取默认区域的医院
        that.fetchHospital(13)
        that.fetchList()
      }
    }else{
      //第一次登录或者缓存清空后第一次登录跳转到个人中心进行登录
      wx.reLaunch({
        url: '/pages/me/me'
      })
    }
  },
  fetchHospital(code){
    let that=this
    console.log("333333333333333333")
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/getHospitalList',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      },
      data:{
        parent_code :code
      },
      method:"POST",
      success(res){
        console.log(res)
        that.setData({
          hospital:res.data.data
        })
      }
    })
  },
  getparents(){
      let that=this
      let openid=wx.getStorageSync('openid')
      if(!openid){
        return
      }
      wx.request({
        url: 'http://121.199.7.204:8085/app1/getAdultByOpenid',
        header:{
          "Content-Type":"application/x-www-form-urlencoded;"
        },
        data:{
          openId:openid
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
        res.data.data.forEach(item=>{
          if(item.num>0){
            item.status=0
          }else{
            item.status=-1
          }
        })
        that.setData({
          cards:res.data.data
        })
      }
    })
    
  },
  fetchChildList(){
    let that=this
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/childRecordList',
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
            area :that.data.child.area_code,
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
