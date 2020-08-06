// pages/addUser/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArr: [{"name": "男", "value": 1, "checked": false},{"name": "女", "value": 2, "checked": false}]
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