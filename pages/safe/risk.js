// risk.js
var app = getApp()

var stateMap = {
  'opened': {
    des: '已发现',
    className: 'danger-bg'
  },
  'forwarded': {
    des: '已敦促',
    className: 'warning-bg'
  },
  'closed': {
    des: '以修改',
    className: 'success-bg'
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    risk: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let riskId = options.riskId
    app.getRisksDb((risksDb) => {
      let risk = risksDb.risks[riskId]
      console.log(risk)
      this.setData({ risk })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  previewImage (event) {
    console.log(event.currentTarget)
    let url = event.currentTarget.dataset.url
    wx.previewImage({
      current: url,
      urls: [url],
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * import data
http://(dev.)iscv.sunftech.org/upload/site_risk_state
HTTP POST application/json
{"state":"closed", "site_risk_id": 123, "comment":"", "commit_time": "iso 8601 string", "device":"YOUR_UUID"}

state: opened forwarded closed
   */
  changeState (event) {
    wx.showModal({
      title: '智建的提示信息',
      content: '确认已敦促相管人员来突进安全问题的结局？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#4183c4',
      confirmText: '确认',
      confirmColor: '#4183c4',
      success: function(res) {
        console.log('success')
      },
      fail: function(res) {
        console.log('fail')
      },
      complete: function(res) {},
    })
    // wx.request({
    //   url: 'https://dev.iscv.sunftech.org/upload/site_risk_state',
    //   data: '',
    //   header: {
    //     'Content-type': 'application/json'
    //   },
    //   method: '',
    //   dataType: '',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  }
})