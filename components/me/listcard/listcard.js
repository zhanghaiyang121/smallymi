// components/me/listcard/listcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageurl:{
      type:String,
      value:"../../../images/people_icon.png"
    },
    name:{
      type:String,
      value:"监护人"
    },
    pageurl:{
      type:String,
      value:""
    },
    isbtn:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    topage(){
      if(this.data.pageurl===""){
        return
      }else if(this.data.pageurl=='sub'){
        wx.requestSubscribeMessage({
          tmplIds:["3-dJHDl3xWjbgkuNcuFTWhhUEwWhN_30Z0Ot-FXvArg"],
          success:res=>{
          },
          fail:err=>{
          }
        })
      }else{
        wx.navigateTo({
          url: this.data.pageurl,
        })
      }
    }
  }
})
