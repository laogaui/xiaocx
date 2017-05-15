// risksOfSection.js
var app = getApp()
var util = require('../../utils/util')

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
    buildingId:null,
    sectionId: null,
    sectionName: '',
    // risks: null,
    // idList: null,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let sectionId = options.sectionId
    let buildingId = options.buildingId
    let sectionName = options.sectionName
    this.setData({
      buildingId,
      sectionId,
      sectionName,
    })
    let currentType = options.currentType
    app.getRisksDb((risksDb) => {
      let risks = risksDb.risks
      let sectionName = risksDb.sections[sectionId].name
      let idList = risksDb.structure[currentType][buildingId][sectionId]
      let list = idList.map((i) => {
        let risk = risks[i]
        risk.date = new Date(risk.commit_time).format('YYYY-MM-dd')
        let preState = risk.state
        if (Object.prototype.toString.call(preState) === '[object String]') {
          let state = Object.assign({}, stateMap[preState], { code: preState })
          risk.state = state
        }
        return risk
      })
      this.setData({ list })

      console.log(this.data)
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
  tap (event) {
    let riskId = event.currentTarget.dataset.id
    wx.navigateTo({ url: `risk?riskId=${riskId}` })
  }
})