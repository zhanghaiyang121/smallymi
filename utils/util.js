
//获取地区列表
const getAreaList=(parentcode)=>{
  wx.request({
    url: 'https://vaccing.51vipsh.com/app1/getAddress',
    header:{
      "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    data:{
      parent_code:parentcode
    },
    method:"POST",
    success(res){
      console.log(res)
    }
  })
}

module.exports = {
  getAreaList:getAreaList
}
