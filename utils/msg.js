//消息订阅只能通过点击事件触发
const subscribeMessage = function () {
  wx.requestSubscribeMessage({
    tmplIds:["Kn811deRG2xaXFvXuEiSQYHHyfx4gAje2U4hy-WuThs"],
    success:res=>{
      console.log(res)
    },
    fail:err=>{
      console.log(err)
    }
  })
}
module.exports = {
  subscribeMessage
}