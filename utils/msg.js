//消息订阅只能通过点击事件触发
const subscribeMessage = function () {
  wx.requestSubscribeMessage({
    tmplIds:["g88cONCdqx62SxzxecFZelZUVhArAQH6UOa4RR13NdY"],
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