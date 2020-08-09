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
  },

  getTypeList(){
    let data = {
      area: 1
    }
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/getVaccineClass',
      header:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      data:data,
      method:"POST",
      success: (res) => {
        let tabs = res.data.data.map(item => {
          item.title = item.name
          item.descList = item.desc.split('|')
          return item
        })
        this.setData({
          tabs
        })
      }
    })
  },
  goOrder(e){
    console.log(e.target.dataset)
  },

  onLoad() {
    this.setData({
      totalHeight: app.globalData.statusHeight + app.globalData.navHeight
    })
    this.getTypeList()
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
