//app.js
var util = require('utils/util')
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getInfo (cb) {
    if (this.globalData.db) {
      typeof cb == 'function' && cb(this.globalData.db)
    } else {
      // 拉取信息
      wx.request({
        url: 'https://iscv.storage.sunftech.org/views/structure/HLRD.json',
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          this.globalData.db = res.data
          typeof cb == 'function' && cb(this.globalData.db)
        }
      })
    }
  },
  getRisksDb (cb) {
    if (this.globalData.risksList) {
      typeof cb == 'function' && cb(this.globalData.safe)
    } else {
      this.globalData.risksDb = util.formatRisks(require('mock/risks.json'))
      console.log(this.globalData.risksDb)
      typeof cb == 'function' && cb(this.globalData.risksDb)
    }
  },
  globalData:{
    userInfo:null,
    db: null,
    risksDb: null,
  }
})