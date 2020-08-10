// pages/addUser/index.js
import {getProvide,getTowns,getVillage,saveParent,getParent} from '../../utils/api'
import { subscribeMessage } from '../../utils/msg.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  
  
  data: {
    totalHeight: 44,
    wxuserInfo:null,
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
    sexArr: [{"name": "男", "value": 1, "checked": false},{"name": "女", "value": 2, "checked": true}],
    index: 0,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    isSel:false,
    town:[],
    cityarry:[[{ name: '河北省', code: 13}]],
    cityindex: [0,0,0],
    cityarry1: [], //县
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
    subscribeMessage()
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    let phoneReg = /0?(13|14|15|17|18|19)[0-9]{9}/
    if (this.data.name == '' || this.data.name == null) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    if (!this.data.mobile || !phoneReg.test(this.data.mobile)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.idCard || !reg.test(this.data.idCard)) {
      wx.showToast({
        title: '身份证格式不正确',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.cityCode || !this.data.areaCode) {
      wx.showToast({
        title: '请选择省市区',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.streetCode || !this.data.street) {
      wx.showToast({
        title: '请选择乡镇',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.committeeCode || !this.data.committee) {
      wx.showToast({
        title: '请选择居委会',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    
    let parentId=wx.getStorageSync('parentId')
    let data={
        name: this.data.name,
        mobile: this.data.mobile,
        sex: this.data.sex,
        idCard: this.data.idCard,
        provinceCode:13,
        province: "河北省",
        cityCode:this.data.cityCode,
        city: this.data.city,
        areaCode:this.data.areaCode,
        area:this.data.area,
        streetCode:this.data.streetCode,
        street:this.data.street,
        committee:this.data.committee,
        committeeCode:this.data.committeeCode,
        address: this.data.address,
        id:parentId
      }
      wx.showLoading({
        title: '',
      })
      wx.request({
        url: 'https://vaccing.51vipsh.com/app1/updateAdult',
        header:{
          "Content-Type":"application/json"
        },
        data:data,
        method:"POST",
        success(res){
          wx.reLaunch({
            url: '/pages/me/me',
          })
          
        },
        complete(){
          wx.hideLoading()
        }
      })
  },
  getparents(){
    let that=this
    let openid=wx.getStorageSync('openid')
    setTimeout(()=>{
    },1000)
    
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
         let parent=res.data.data
         let arr=that.data.sexArr
         if(parent.sex==1){
          arr[0].checked=true
          arr[1].checked=false
         }else{
          arr[0].checked=false
          arr[1].checked=true
         }
         that.setData({
          sexArr:arr
        })
         that.setData({
          name: parent.name,
          mobile: parent.mobile,
          sex: parent.sex,
          idCard: parent.idCard,
          provinceCode:13,
          province: "河北省",
          cityCode:parent.cityCode,
          city: parent.city,
          areaCode:parent.areaCode,
          area:parent.area,
          streetCode:parent.streetCode,
          street:parent.street,
          committee:parent.committee,
          committeeCode:parent.committeeCode,
          address: parent.address,
          id:parent.id
         })
         that.getArealist()
      }
    })
  },
  //性别选择
  radioChange(e) {
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
  getareaCodeList(val){
    let arealist=[]
    let sarealist=[]
    let arr = []
    this.data.totalrigion[val].forEach(item=>{
      let flag=false
      if(item.code==val){
        flag=arealist.includes(item.t_name); 
        if(!flag){
          arealist.push(item.t_name)
          sarealist.push(item)
        }
      }
      
    })
    arealist.push(arr)
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
    let streetlist=[]
    let scommitarry=[]
    let o = {};
    let arr = data.reduce(function (item, next) {
      o[next.c_code] ? '' : o[next.c_code] = true && item.push(next);
      return item;
    }, [])
    arr.forEach(item=>{
      let obj = {}
      obj.name = item.c_name
      obj.code = item.c_code
      streetlist.push(obj)
      scommitarry.push(item)
    })
    this.setData({
      streetlist,
      totalstreetrigion
    })
    if(this.data.streetCode){
      this.dealcommitRegion(this.data.streetCode)
    }
  },
  dealcommitRegion(code){
    let commitarry=[]
    this.data.totalstreetrigion.forEach(item=>{
      if (item.c_code == code){
        let obj = {}
        obj.name = item.t_name
        obj.code = item.t_code
        commitarry.push(obj)
      }
    })
    this.setData({
      commitarry
    })
    let streetindex = 0
    let commiIndex = 0
    if(this.data.streetCode){
      streetindex = this.data.streetlist.findIndex(item => item.code == this.data.streetCode) || 0
    }
    if(this.data.committeeCode){
      commiIndex = this.data.commitarry.findIndex(item => item.code == this.data.committeeCode) || 0
    }
    this.setData({
      streetindex,
      commiIndex
    })
  },
  bindCommitChange(e){
    let committeeCode=this.data.commitarry[e.detail.value].code
    let committee=this.data.commitarry[e.detail.value].name
    this.setData({
      committee,
      committeeCode
    })
  },
  bindStreetChange(e){
    let streetCode=this.data.streetlist[e.detail.value].code
    let street=this.data.streetlist[e.detail.value].name
    this.setData({
      street,
      streetCode,
      committee: '',
      committeeCode: '',
      commitarry: []
    })
    this.dealcommitRegion(streetCode)
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
    let areaCode
    let area=this.data.arealist[e.detail.value]
    this.data.sarealist.forEach(item=>{
      if(item.t_name==area){
        areaCode=item.t_code
        this.getstreetCodeList(areaCode)
      }
    })
    this.setData({
      area,
      areaCode
    })
  },
  bindCityChange(e){
    let arr = e.detail.value
    let cityarry = this.data.cityarry
    let cityCode = cityarry[1][arr[1]].code
    let city=cityarry[1][arr[1]].name
    let areaCode = cityarry[2][arr[2]].code
    let area=cityarry[2][arr[2]].name
    this.setData({
      city,
      cityCode,
      area,
      areaCode,
      street: '',
      streetCode: '',
      streetlist: [],
      committee: '',
      committeeCode: '',
      commitarry: []
    })
    this.getstreetlist(areaCode)
    
  },
  bindColumnChange(e){
    if(e.detail.column == 1){
      let val = e.detail.value
      let cityarry1 = this.data.totalrigion[val].addressDtoList
      let arr = []
      this.data.totalrigion[val].addressDtoList.forEach(item=>{
        let obj = {}
        obj.name = item.name
        obj.code = item.code
        arr.push(obj)
      })
      let cityarry = this.data.cityarry
      cityarry[2] = arr
      this.setData({
        cityarry,
        cityarry1
      })
    }else if(e.detail.column == 2){
    }
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
  this.setData({
    index: e.detail.value
  })
},
//选择省市区
bindRegionChange: function (e) {
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
    if (userInfo) {
      this.setData({
        wxuserInfo: userInfo
      })
    }
    this.getparents()
  },
  dealRegion(data){
    let totalrigion=data
    let cityarry=this.data.cityarry
    let cityarry1=totalrigion[0].addressDtoList
    let scityarry=[]
    let arr = []
    data.forEach(item=>{
      let obj = {}
      obj.name = item.name
      obj.code = item.code
      arr.push(obj)
      scityarry.push(item)
    })
    cityarry.push(arr)
    let arr1 = []
    if(this.data.cityCode){
      let index = cityarry[1].findIndex(item => item.code == this.data.cityCode)
      index = index < 0 ? 0 : index
      totalrigion[index].addressDtoList.forEach(item=>{
        let obj = {}
        obj.name = item.name
        obj.code = item.code
        arr1.push(obj)
      })
    }else{
      totalrigion[0].addressDtoList.forEach(item=>{
        let obj = {}
        obj.name = item.name
        obj.code = item.code
        arr1.push(obj)
      })
    }

    cityarry.push(arr1)
    
    this.setData({
      cityarry,
      cityarry1,
      scityarry,
      totalrigion
    })

    let indexArr = this.data.cityindex
    if(this.data.cityCode){
      let index = cityarry[1].findIndex(item => item.code == this.data.cityCode)
      indexArr[1] = index
    }
    if(this.data.areaCode){
      let index = cityarry[2].findIndex(item => item.code == this.data.areaCode)
      indexArr[2] = index
    }
    this.setData({
      cityindex: indexArr
    })
  },
  getArealist(){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/getAddressByParentCode',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      },
      data:{
        parentCode:13
      },
      method:"POST",
      success(res){
        that.dealRegion(res.data.data)
      }
    })
    if(this.data.areaCode){
      this.getstreetlist(this.data.areaCode)
    }
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
})