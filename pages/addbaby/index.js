// pages/addUser/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArr: [{"name": "男", "value": 1, "checked": false},{"name": "女", "value": 2, "checked": false}],
    sex:null,
    name:""
  },
  bindName(e){
    this.setData({
      name: e.detail.value
    })
  },
  addBabyInfo(){
    let that=this
    wx.request({
      url: 'http://121.199.7.204:8085/app1/updateChild',
      header:{
        "Content-Type":"application/json"
      },
      data:{
        id:1,
        name:that.data.name
      },
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

  },
})