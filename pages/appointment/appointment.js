import CustomPage from '../../common/CustomPage.js'
const app = getApp()
CustomPage({
  onShareAppMessage() {
    return {
      title: 'tabs',
      path: ''
    }
  },
  data: {
    tabs: [],
    activeTab: 0,
    totalHeight: 44,
    isLoad: false
  },

  getTypeList(code){
    let data = {
      area: code
    }
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/getVaccineClass',
      header:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      data:data,
      method:"POST",
      success: (res) => {
        if (res.data.data && res.data.data.length > 0) {
          let tabs = res.data.data.map(item => {
            item.title = item.name
            item.descList = item.desc.split('|')
            return item
          })
          this.setData({
            tabs
          })
        }
        this.setData({
          isLoad: true
        })
      }
    })
  },
  goOrder(e){
    let card = Object.assign({}, e.target.dataset.card)
    card.type = 1
    wx.setStorageSync('cardInfo', card)
    //跳到预约页面
    wx.navigateTo({
      url: '/pages/sub/index',
    })
  },
  initData(){
    let openid=wx.getStorageSync('openid')
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/getAdultByOpenid',
      header:{
        "Content-Type":"application/x-www-form-urlencoded;"
      },
      data:{
        openId:openid
      },
      method:"POST",
      success: (res) => {
        this.getTypeList(res.data.data.areaCode)
      }
    })
  },

  onLoad() {
    this.setData({
      totalHeight: app.globalData.statusHeight + app.globalData.navHeight
    })
    this.initData()
  },

  onTabClick(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },
  handleClick(e) {
    // wx.navigateTo({
    //   url: './webview',
    // })
  }
})
