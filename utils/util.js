
//获取地区列表
const getAreaList=(parentcode)=>{
  wx.request({
    url: 'http://121.199.7.204:8085/app1/getAddress',
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
