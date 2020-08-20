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
    vid:Number,
    child:Object,
    parent:Object
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
    toyiminfo(){
      let card=this.data.card
      wx.setStorageSync('yiminfo', card)
      wx.navigateTo({
        url: '/pages/yiminfo/index',
      })
    },
    getunixTime(){
      let year = new Date().getFullYear()
      let month = (new Date().getMonth()+1)
      if(parseInt(month)<10){
        month = '0'+month;
      }
      let day = (parseInt(new Date().getDate())+2);
      if(parseInt(day)<10){
        day = '0'+day;
      }
      return year+'-'+month+'-'+day;
    },
    //待确认
    submit(){
      this.triggerEvent('submityuyue',this.data.card)
    },
    
    subscribe(e){
      let that =this;
      if(e.currentTarget.dataset.stock==0){
        wx.showToast({
          title: '暂无库存',
          icon: 'none',
          duration: 2000
        })
        return
      }

      //先判断用户是否登录
      var openid = wx.getStorageSync('openid')
      if(!openid){
        wx.showToast({
          title: '请前往登录',
          icon: 'none',
          duration: 2000
        })
      }
      //在判断用户是否有监护人
      if(!this.data.parent){
        wx.showToast({
          title: '请添加监护人',
          icon: 'none',
          duration: 2000
        })
        return
      }
      //在判断是否有儿童
      if(!this.data.child){
        wx.showToast({
          title: '请选择儿童',
          icon: 'none',
          duration: 2000
        })
        return
      }
      //判断version
      if(e.currentTarget.dataset.version==0){
        wx.request({
          url: 'https://vaccing.51vipsh.com/app1/updateChildRecord',
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          data: {
            childId: this.data.child[0].cid?this.data.child[0].cid:0,
            adultId: this.data.parent.id,
            recordId: 0,
            times: that.getunixTime(),
            vname: this.data.card.name,
            vid: this.data.card.id,
            type: 2
          },
          method: "POST",
          success(res) {
            that.triggerEvent('submitcard',res.data)
          }
        })
        return
      }
      console.log(this.data.card)
      let card = Object.assign({}, this.data.card)
      card.type = 2
      wx.setStorageSync('cardInfo', card)
      wx.navigateTo({
        url: '/pages/sub/index',
      })
    },
  }
})
