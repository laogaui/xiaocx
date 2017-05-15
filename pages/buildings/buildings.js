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
    console.log('88888')
    let data = wx.getStorageSync('imageInfoList') || []
    if (data.length>0){
      wx.showLoading({
        title: '正在上传',
      })
      let next = () => {
        if (data.length > 0) {
          let info = data.shift()
          this.upload(info, next)
        }else{
          let imagedata = wx.getStorageSync('imageInfoList') || []
          for (let i in imagedata){
            console.log('file path is ')
            console.log(imagedata[i].tempFilePath)
            wx.removeSavedFile({
              filePath: imagedata[i].tempFilePath,
              complete: function (res) {
                if (i==imagedata.length-1){
                  wx.removeStorageSync('imageInfoList')
                  wx.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
                console.log(res)
              }
            })
          }
          // wx.hideLoading()
        }
      }
      next()
    }else{
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '没有采集数据',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '确认',
        confirmColor: '',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  upload(info, cb) {
    let filePath = info.tempFilePath
    let imagecontent = info['content']
    // delete info.tempFilePath
    wx.uploadFile({
      url: 'https://dev.iscv.sunftech.org/upload/site_risk',
      filePath,
      name: 'image',
      header: {},
      formData: { 'content': JSON.stringify(imagecontent)},
      success: function(res) {
        cb()
        // let data = res.data
        // console.log(data[''])
        // if (data['status']=='success'){
        //   cb()
        // }else{
        //   wx.hideLoading()
        //   let detail = res.data['detail'] || '数据上传失败'
        //   wx.showModal({
        //     title: '提示',
        //     content: detail,
        //   })
        // }
        console.log(res)
        
      },
      fail: function(res) {
        wx.hideLoading()
        let detail = res.data['detail']||'数据上传失败'
        wx.showModal({
          title: '提示',
          content: detail,
          showCancel: true,
          cancelText: '取消',
          cancelColor: '',
          confirmText: '确认',
          confirmColor: '',
          success: function (res) { },
          fail: function (res) {

           },
          complete: function (res) { },
        })
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