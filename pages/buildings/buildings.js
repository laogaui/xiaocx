// buildings.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectId: null,
    buildings: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getInfo((info) => {
      let buildings = info['global_structure']['buildings']
      this.setData({
        buildings
      })
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
    let id = event.currentTarget.dataset.id
    this.setData({
      selectId: id,
    })
    wx.navigateTo({
      url: `../sections/sections?buildingId=${id}`
    })
  },
  btnClick () {
    let data = wx.getStorageSync('imageInfoList') || []

    let next = () => {
      if (data.length > 0) {
        let info = data.shift()
        this.upload(info, next)
      }
    }
    next()
  },
  upload(info, cb) {
    let filePath = info.tempFilePath
    info.content = JSON.stringify(info.content)
    delete info.tempFilePath
    wx.uploadFile({
      url: 'https://dev.iscv.sunftech.org/upload/site_risk',
      filePath,
      name: 'image',
      header: {},
      formData: info,
      success: function(res) {
        console.log('success')
        console.log(res)
        cb()
      },
      fail: function(res) {
        console.log('fail')
        console.log(res)
      },
      complete: function(res) {
        console.log('complete')
        console.log(res)
      },
    })
  }
})