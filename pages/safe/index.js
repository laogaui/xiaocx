// safe.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: 'tj',
    structure: null,
    buildings: null,
    sections: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getRisksDb((risksDb) => {
      let structure = risksDb.structure
      let buildings = risksDb.buildings
      let sections = risksDb.sections
      this.setData({ structure, buildings, sections })
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
    let dataset = event.currentTarget.dataset
    console.log(dataset)
    let buildingId = dataset.buildingid
    let sectionId = dataset.sectionid
    let sectionName = dataset.sectionname
    let currentType = this.data.currentType
    wx.navigateTo({ url: `risksOfSection?buildingId=${buildingId}&sectionId=${sectionId}&currentType=${currentType}&sectionName=${sectionName}` })
  }
})