import CustomPage from '../../common/CustomPage.js'
CustomPage({
  onShareAppMessage() {
    return {
      title: 'tabs',
      path: ''
    }
  },
  data: {
    tabs: [],
    activeTab: 0
  },

  onLoad() {
    const tabs = [
      {
        title: 'HPV疫苗',
        desc: '本视频系列课程，由腾讯课堂NEXT学院与微信团队联合出品，通过实战案例，深入浅出地进行讲解。',
      },
      {
        title: '流感疫苗',
        desc: '微信小程序直播系列课程持续更新中，帮助大家更好地理解、应用微信小程序直播功能。',
      },
      {
        title: '狂犬疫苗',
        desc: '提高审核质量',
      },
      {
        title: '流感疫苗',
        desc: '本课程共四节，将分阶段为开发者展示如何开通流量主功能、如何接入广告组件、不同类型小程序接入的建议，以及如何通过工具调优小程序变现效率。',
      },
      {
        title: '流感疫苗3',
        desc: '微信小程序应用开发赛',
      },
    ]
    this.setData({ tabs })
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
    wx.navigateTo({
      url: './webview',
    })
  }
})
