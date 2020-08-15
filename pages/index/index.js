//index.js
//获取应用实例
const app = getApp()
let config = require('../../utils/config.js')
Page({
  data: {
    yimstatusinfo:null,
    issubShow:false,
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
    } else {
      // 第一次登录或者缓存清空后第一次登录跳转到个人中心进行登录
      // wx.clearStorageSync()
      // wx.reLaunch({
      //   url: '/pages/me/me'
      // })
      this.fetchChildList(0,0)
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
          that.fetchChildList(0,0)
        } else {
          that.setData({
            parent: res.data.data
          })
          wx.setStorageSync('parentInfo', res.data.data)
          //判断缓存里是否有儿童信息
          let childinfo = wx.getStorageSync('childinfo')
          that.fetchchildslist(res.data.data.areaCode)
        }
      }
    })
  },

  fetchList() {
    let that = this
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/vaccineListNew',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: {
        area: that.data.parent ? that.data.parent.areaCode : '',
        type: 2,
        childId:0
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
            console.log('month', month)
            console.log('item.time', item.time)
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
  fetchchildslist(areacode) {
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
        let childInfo=null
        if(res.data.data){
          childInfo = res.data.data[0]
          that.setData({
            childlist: res.data.data,
          })
        }
        
        if (childInfo) {
          let ageArr = that.getAge(res.data.data[0].birthday)
          let ageYear = ageArr[0] > 0 ? ageArr[0] + '岁' : ''
          let ageMonth = ageArr[0] > 0 ? ageArr[1] > 0 ? ageArr[1] + '个月' : '' : ageArr[1] > 0 ? ageArr[1] + '个月' : '不满1月'
          res.data.data[0].age = ageYear + ageMonth
          that.setData({
            child: res.data.data[0]
          })
          wx.setStorageSync('childinfo', res.data.data[0])
            that.fetchChildList(res.data.data[0].cid,areacode)
        }else{
          that.fetchChildList(0,areacode)
        }
      }
    })
  },
  fetchChildList(childId,areaCode) {
    let that = this
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/vaccineListNew',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: {
        childId: childId,
        area: areaCode,
        type: 2
      },
      method: "POST",
      success(data) {
        //获取默认列表和已注入疫苗做对比
        console.log("获取列表的参数")
        console.log("childId=========="+childId)
        console.log("area=========="+areaCode)
        console.log("type======="+2)
        console.log("获取儿童注射疫苗列表")
        console.log(data.data.data)
        that.setData({
          hospital: data.data.info
        })
        // that.dealCarsList(res.data.data)
        let ymilist = data.data.data
        console.log(ymilist)
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
            console.log(item.time)
            if (month != 0) {
              age += month + "个月"
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
        console.log("处理过的的列表")
        console.log(finalarr)
        that.setData({
          cards: finalarr
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
    let ageArr = this.getAge(child.birthday)
    let ageYear = ageArr[0] > 0 ? ageArr[0] + '岁' : ''
    let ageMonth = ageArr[0] > 0 ? ageArr[1] > 0 ? ageArr[1] + '个月' : '' : ageArr[1] > 0 ? ageArr[1] + '个月' : '不满1月'
    child.age = ageYear + ageMonth
    this.setData({
      child,
      isShow: false
    })
    let parent=wx.getStorageSync('parentInfo')
    this.fetchChildList(child.cid,parent.areaCode)
    wx.setStorageSync('childinfo', child)
  },
  getAge(birthday) {
    // console.log("根据生日计算年龄&月份",birthday);
    if (birthday == undefined) return [0, 0];
    let today = new Date();
    let birthDate = new Date(birthday);
    let year = today.getYear() - birthDate.getYear();


    let todayMonth = today.getMonth() + 1;
    let birthDateMonth = birthDate.getMonth() + 1;

    let todayDays = today.getDate();
    let birthDateDays = birthDate.getDate();

    let month = 0;
    if (todayMonth < birthDateMonth) {
      year--;
      if (todayDays >= birthDateDays) {
        month = 12 - birthDateMonth + todayMonth;
      } else {
        month = 12 - birthDateMonth + todayMonth - 1;
      }
    } else if (todayMonth > birthDateMonth) {
      if (todayDays >= birthDateDays) {
        month = todayMonth - birthDateMonth;
      } else {
        month = todayMonth - birthDateMonth - 1;
      }
    } else {
      //
      if (todayDays < birthDateDays) {
        year--;
        month = 11;
      }
    }
    return [year, month];
  },
  submityuyue(e){
    console.log(e.detail)
    this.setData({
      yimstatusinfo:e.detail,
      issubShow:true
    })
  },
  //取消
  cancelupdate(){
    this.setData({
      yimstatusinfo:null,
      issubShow:false,
    })
  },
  //确认
  updatestatus(){
    let that=this
    wx.request({
      url: 'https://vaccing.51vipsh.com/app1/updateStatus',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;"
      },
      method:"POST",
      data: {
        id: that.data.yimstatusinfo.recordId
      },
      success(res){
        that.setData({
          yimstatusinfo:null,
          issubShow:false,
        })
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        let child=wx.getStorageSync('childinfo')
        let parent=wx.getStorageSync('parentInfo')
        that.fetchChildList(child.cid,parent.areaCode)
      }
    })
  },
})