// pages/addUser/index.js
import {getProvide,getTowns,getVillage,saveParent,getParent} from '../../utils/api'
let ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  
  
  data: {
    sex:1,
    userInfo:null,
    name:"",
    mobile:"",
    idCard:"",
    address:"",
    cityCode:"",
    city:null,
    area:null,
    areaCode:"",
    streetCode:"",
    committee:null,
    committeeCode:"",
    street:null,
    sexArr: [{"name": "男", "value": 1, "checked": false},{"name": "女", "value": 2, "checked": false}],
    index: 0,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    isSel:false,
    town:[],
    cityarry:["石家庄市","张家口市"
    ],
    cityindex:0,
    areaindex:0,
    commiIndex:0,
    streetindex:0,
    scityarry:[],
    totalrigion:[],
    sarealist:[],
    arealist:[],
    totalstreetrigion:[],
    commitarry:[],
    scommitarry:[],
    streetlist:[],
    sstreetlist:[]

  },
  //保存监护人信息
  saveDetail() {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (this.data.name == '' || this.data.name == null) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    if ((this.data.idCard != '' && this.data.idCard != null) && !reg.test(this.data.idCard)) {
      wx.showToast({
        title: '身份证格式不正确',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    let data={
        name: this.data.name,
        mobile: this.data.mobile,
        sex: this.data.sex,
        idCard: this.data.idCard,
        provinceCode:13,
        province: "河北省",
        cityCode:this.data.cityCode,
        city: this.data.region[1],
        areaCode:this.data.areaCode,
        area:this.data.area,
        streetCode:this.data.streetCode,
        street:this.data.street,
        committee:this.data.committee,
        committeeCode:this.data.committeeCode,
        address: this.data.address
      }
      wx.request({
        url: 'http://121.199.7.204:8085/app1/updateAdult',
        header:{
          "Content-Type":"application/json"
        },
        data:data,
        method:"POST",
        success(res){
          wx.reLaunch({
            url: '/pages/parent/index',
          })
          
        }
      })
  },
  //性别选择
  radioChange(e) {
    console.log(e)
    let sex = e.detail.value
    this.setData({
      sex
    })
  },
  bindName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindmobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindCard(e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  getareaCodeList(cityCode){
    let arealist=[]
    let sarealist=[]
    this.data.totalrigion.forEach(item=>{
      let flag=false
      if(item.c_code==cityCode){
        flag=arealist.includes(item.t_name); 
        if(!flag){
          arealist.push(item.t_name)
          sarealist.push(item)
        }
      }
      
    })
    console.log(arealist)
    this.setData({
      arealist,
      sarealist
    })
  },
  getstreetCodeList(areaCode){
    this.getstreetlist(areaCode)
  },
  dealstreetRegion(data){
    let totalstreetrigion=data
    let commitarry=[]
    let scommitarry=[]
    data.forEach(item=>{
      let flag=false
      flag=commitarry.includes(item.c_name); 
      if(!flag){
        commitarry.push(item.c_name)
        scommitarry.push(item)
      }
    })
    this.setData({
      commitarry,
      scommitarry,
      totalstreetrigion
    })
  },
  bindCommitChange(e){
    console.log(e)
    let committeeCode
    let committee=this.data.commitarry[e.detail.value]
    this.data.scommitarry.forEach(item=>{
      if(item.c_name==committee){
        committeeCode=item.c_code
        //获取县
        this.getStreetCodeList(committeeCode)
      }
    })
    console.log(committee)
    this.setData({
      committee,
      committeeCode
    })
  },
  bindStreetChange(e){
    console.log(e)
    let streetCode
    let street=this.data.streetlist[e.detail.value]
    this.data.sstreetlist.forEach(item=>{
      if(item.t_name==street){
        streetCode=item.t_code
      }
    })
    console.log(street)
    this.setData({
      street,
      streetCode
    })
  },
  getStreetCodeList(commitCode){
    let streetlist=[]
    let sstreetlist=[]
    this.data.totalstreetrigion.forEach(item=>{
      let flag=false
      if(item.c_code==commitCode){
        flag=streetlist.includes(item.t_name); 
        if(!flag){
          streetlist.push(item.t_name)
          sstreetlist.push(item)
        }
      }
      
    })
    console.log(streetlist)
    this.setData({
      streetlist,
      sstreetlist
    })
  },
  getstreetlist(areaCode){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getAddress',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      },
      data:{
        parent_code:areaCode
      },
      method:"POST",
      success(res){
        that.dealstreetRegion(res.data.data)
      }
    })
  },
  bindAreaChange(e){
    console.log(e)
    let areaCode
    let area=this.data.arealist[e.detail.value]
    this.data.sarealist.forEach(item=>{
      if(item.t_name==area){
        areaCode=item.t_code
        this.getstreetCodeList(areaCode)
      }
    })
    console.log(area)
    this.setData({
      area,
      areaCode
    })
  },
  bindCityChange(e){
    console.log(e)
    let cityCode
    let city=this.data.cityarry[e.detail.value]
    this.data.scityarry.forEach(item=>{
      if(item.c_name==city){
        cityCode=item.c_code
        //获取县
        this.getareaCodeList(cityCode)
      }
    })
    console.log(city)
    this.setData({
      city,
      cityCode
    })
    
  },
  bindAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  //添加父母资料
addParentInfo(){
   wx.request({
     url: 'http://121.199.7.204:8085/app1/updateAdult',
     header:{
       "Content-Type":"application/json"
     },
     data:{
       name:"wangwei"
     },
     method:"POST",
     success(res){
     }
   })
 },
 bindPickerChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value
  })
},
//选择省市区
bindRegionChange: function (e) {
  console.log(e.detail.value)
  this.setData({
    region: e.detail.value,
    isSel: true
  })
  // this.bindTown();
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })
    this.getArealist()
  },
  dealRegion(data){
    let totalrigion=data
    let cityarry=[]
    let scityarry=[]
    data.forEach(item=>{
      let flag=false
      flag=cityarry.includes(item.c_name); 
      if(!flag){
        cityarry.push(item.c_name)
        scityarry.push(item)
      }
    })
    this.setData({
      cityarry,
      scityarry,
      totalrigion
    })
  },
  getArealist(){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getAddress',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      },
      data:{
        parent_code:13
      },
      method:"POST",
      success(res){
        that.dealRegion(res.data.data)
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
})