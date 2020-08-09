//index.js
//获取应用实例
const app = getApp()
let config = require('../../utils/config.js')
Page({
  data: {
    isShow: false,
    list: [{
        index: 1,
        name: "北京新增",
        num: 0
      },
      {
        index: 2,
        name: "国内新增",
        num: 122
      },
      {
        index: 3,
        name: "境外输入",
        num: 25
      },
      {
        index: 4,
        name: "国外新增",
        num: 2333
      }
    ],
    child: null,
    cards: [],
    currentage: 0,
    agelist: [
      "出生时",
      "一岁时",
      "两岁时",
      "三岁时",
      "四岁时",
      "五岁时",
      "六岁时",
    ],
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    childlist: null,
    parent: null,
    hospital: null
  },
  onShow: function () {
    // wx.clearStorage()
    let openid = wx.getStorageSync('openid');
    if (openid) {
      this.getparents()
      this.fetchchildslist()
      this.fetchList()
      console.log(this.data.childlist)
      //判断缓存里是否有儿童信息
      let childinfo = wx.getStorageSync('childinfo')
      if (childinfo) {
        //如果有获取儿童对应的疫苗信息
        this.setData({
          child: childinfo
        })
        setTimeout(() => {
          console.log(this.data.parent)
          this.fetchChildList(childinfo.cid)
        })

      } else {
        // 渲染默认疫苗列表并获取默认区域的医院
      }
    } else {
      // 第一次登录或者缓存清空后第一次登录跳转到个人中心进行登录
      wx.clearStorageSync()
      wx.reLaunch({
        url: '/pages/me/me'
      })
    }
  },
  fetchHospital(code) {
    let that = this
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/getHospitalList',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: {
        parent_code: code
      },
      method: "POST",
      success(res) {
        that.setData({
          hospital: res.data.data
        })
      }
    })
  },
  getparents() {
    let that = this
    let openid = wx.getStorageSync('openid')
    if (!openid) {
      return
    }
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/getAdultByOpenid',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;"
      },
      data: {
        openId: openid
      },
      method: "POST",
      success(res) {
        console.log(res.data.data.areaCode)
        if (!res.data.data.areaCode) {
          wx.showToast({
            title: '请完善监护人信息',
            icon: 'none'
          })
        } else {
          that.setData({
            parent: res.data.data
          })
          that.fetchHospital(res.data.data.areaCode)
        }
      }
    })
  },
  dealCarsList(data) {

  },

  fetchList() {
    let that = this
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/vaccineList',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: {
        area: 1,
        type: 2
      },
      method: "POST",
      success(res) {
        // that.dealCarsList(res.data.data)
        console.log("获取默认疫苗列表")
        console.log(res.data.data)
        let ymilist = res.data.data
        ymilist.forEach(item => {
          if (item.num > 0) {
            item.status = 0
          } else {
            item.status = -1
          }
        })

        let yimarr = []
        let finalarr = []
        ymilist.forEach(item => {
          let flag = yimarr.includes(item.time)
          if (!flag) {
            yimarr.push(item.time)
            let month = (item.time) % 12
            let year = Math.floor((item.time) / 12)
            let age = year + "岁"
            if (month != 0) {
              age += month + "个月"
            }

            if (item.time == 0) {
              age = "出生时"
            }
            if (item.time < 12) {
              age = month + "个月"
            }
            finalarr.push({
              age: age,
              key: item.time,
              list: []
            })
          }
        })
        ymilist.forEach(item => {
          let index = yimarr.indexOf(item.time)
          finalarr[index].list.push(item)
        })
        that.setData({
          cards: finalarr
        })
      }
    })

  },
  fetchchildslist() {
    let that = this
    let openid = wx.getStorageSync('openid')
    this.setData({
      openid
    })
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/getChildByOpenId',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;"
      },
      data: {
        openId: openid
      },
      method: "POST",
      success(res) {
        that.setData({
          childlist: res.data.data
        })
      }
    })
  },
  fetchChildList(childId) {
    let that = this
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/childRecordList',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: {
        childId: childId
      },
      method: "POST",
      success(res) {
        //获取默认列表和已注入疫苗做对比
        console.log("获取儿童注射疫苗列表")
        let childYmilist = res.data.data ? res.data.data : [];
        wx.request({
          url: 'https://vaccing.51vipsh.com/app1/vaccineList',
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          data: {
            area: 1,
            // area: that.data.parent.areaCode,
            type: 2
          },
          method: "POST",
          success(data) {
            console.log(data.data.data)
            // that.dealCarsList(res.data.data)
            let ymilist = data.data.data
            console.log(childYmilist)
            ymilist.forEach(item => {
              childYmilist.forEach(citem => {
                if (citem.vid == item.id) {
                  if (item.status != 1) {
                    item.status = citem.status
                  }
                } else {
                  if (item.num > 0) {
                    item.status = 0
                  } else {
                    item.status = -1
                  }
                }
              })
            })
            let yimarr = []
            let finalarr = []
            ymilist.forEach(item => {
              let flag = yimarr.includes(item.time)
              if (!flag) {
                yimarr.push(item.time)
                let month = (item.time) % 12
                let year = Math.floor((item.time) / 12)
                let age = year + "岁"
                // console.log('month', month)
                // console.log(item)
                if (month != 0) {
                  age += month + "个月"
                } else {
                  age = "出生时"
                }

                if (item.time == 0) {
                  age = "出生时"
                } else {
                  if (item.time < 12) {
                    age = month + "个月"
                  }
                }

                finalarr.push({
                  age: age,
                  key: item.time,
                  list: []
                })
              }
            })
            ymilist.forEach(item => {
              console.log(item)
              let index = yimarr.indexOf(item.time)
              finalarr[index].list.push(item)
            })
            that.setData({
              cards: finalarr
            })

          }
        })


      }
    })

  },
  cancelMark() {
    this.setData({
      isShow: false
    })
  },
  SelectChild() {
    if (!this.data.childlist) {
      return
    }
    this.setData({
      isShow: true
    })
  },
  changechild(e) {
    let child = e.detail
    this.setData({
      child,
      isShow: false
    })
    this.fetchChildList(child.cid)
  }
})