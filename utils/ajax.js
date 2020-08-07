let loadings = 0;
let isShowNetWork = true;
const ajax = (config, method) => {
  if (config.hideLoading){

  }else{
    if (loadings === 0)
      wx.showLoading({
        title: '加载中',
        mask: true
      });
  }
  loadings++
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.url,
      method: method || 'GET',
      data: config.data,
      header: {
        'content-type': config.type ? config.type : 'application/json',
        'Authorization': wx.getStorageSync('loginToken') ? wx.getStorageSync('loginToken') : ''
      },
      success: res => {
        setTimeout(() => {
          resolve(res)
        }, 10)
       
      },
      fail: err => {
        wx.getNetworkType({
          success(res) {
            const networkType = res.networkType
            if (networkType!="none"){
              reject(err)
              console.error(err, config)
            }else{
              if (isShowNetWork){
                isShowNetWork = false;
                wx.showModal({
                  title: '提示',
                  content: '请检查您的网络',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      isShowNetWork = true
                    } else if (res.cancel) {
                      isShowNetWork = true
                    }
                  }
                })
              }
             
            }
           
          }
        })
      
      },
      complete() {
        wx.hideLoading();
      }
    })
  })
}

module.exports = ajax