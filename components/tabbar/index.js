// components/tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    pageurl:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    topage(e){
      console.log(e)
      let url=e.currentTarget.dataset.pageurl
      
      wx.navigateTo({
        url: url,
      })
    
    }
  }
})
