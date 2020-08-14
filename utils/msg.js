//消息订阅只能通过点击事件触发
const subscribeMessage = function () {
  wx.requestSubscribeMessage({
    tmplIds:["RA71GvREZsfAjGPs0VtpUzY28310R5INLS6xnwttnnY"],
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