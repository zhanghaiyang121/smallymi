// components/home/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    child: Object,
    childlist: Array,
    hospital: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready() {},
  /**
   * 组件的方法列表
   */
  methods: {
    goChildpage() {
      console.log(this.data.childlist)
      if (this.data.childlist.length) {
        this.triggerEvent('selecChild')
      } else {
        wx.navigateTo({
          url: "/pages/babylist/babylist",
        })
      }
    }
  }
})