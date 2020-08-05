// components/home/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    card:{
      type:Object
    },
    num:Number,
    fee:String,
    type:String,
    name:String,
    vid:Number
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
    updateChildRecord(){
      let that=this
      console.log(that.data.vid)
      wx.request({
        url: 'http://121.199.7.204:8085/app1/updateChildRecord',
        header:{
          "Content-Type":"multipart/form-data;"
        },
        data:{
          childId:1,
          recordId:1,
          times:"2020-02-16 17:30:32",
          vname:2,
          vid:1
        },
        method:"POST",
        success(res){
          console.log(res)
        }
      })
    }
  }
})
