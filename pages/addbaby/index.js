// pages/addUser/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArr: [{"name": "男", "value": 1, "checked": false},{"name": "女", "value": 2, "checked": false}],
    sex:null,
    name:"",
    birthday:null,
    idCard:null,
    pid:null,
    cid:null,
    isaddchild:false

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
          pid:parent.id
         })
         
      }
    })
  },
  bindidCard(e){
    this.setData({
      idCard: e.detail.value
    })
  },
  bindName(e){
    this.setData({
      name: e.detail.value
    })
  },
  bindTimeChange(e){
    this.setData({
      birthday: e.detail.value
    })
  },
  addBabyInfo(){
    let that=this
    let date=that.data.birthday
    let birthday=date+" "+"00:00:00"
    let id=null
    let data={
      name:that.data.name,
      idCard:that.data.idCard,
      sex:that.data.sex,
      pid:that.data.pid,
      birthday:birthday
    }
    console.log(that.data.isaddchild)
    if(!that.data.isaddchild){
      data.id=that.data.cid
    }else{
      delete data.cid
      console.log(data)
    }
    
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/updateChild',
      header:{
        "Content-Type":"application/json"
      },
      data:data,
      method:"POST",
      success(res){
        wx.reLaunch({
          url: '/pages/babylist/babylist',
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
  getchildInfo(){
    let child=wx.getStorageSync('childinfo')
    let isaddchild=wx.getStorageSync('isaddchild')
    let date=child.birthday.split(" ")
    console.log(date)
    if(!isaddchild){
      this.setData({
        name:child.name,
        birthday:date[0],
        idCard:child.idCard,
        sex:child.sex,
        pid:child.pid,
        cid:child.cid,
        isaddchild:isaddchild
      })
    }else{
      this.setData({
        name:null,
        birthday:null,
        idCard:null,
        sex:null,
        pid:null,
        isaddchild:isaddchild
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      this.getparents()
      this.getchildInfo()
  },
})