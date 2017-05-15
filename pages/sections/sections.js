// sections.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buildingName: null,
    selectId: null,
    currentType: 'tj',
    sections: {
      tj: {},
      az: {},
    },
    tjClass: '',
    azClass: '',
    imageComments: [],
    modalHidden: true,
    commentSelectIndex: null,
    commentInfo: '',
    descriptionInfo: '',
    currentImageInfo: {
      tempFilePath: '',
      content: {}
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let buildingId = options.buildingId
    app.getInfo((info) => {
      let building = info['global_structure']['buildings'][buildingId]
      let sections = building.sections
      let newSections = Object.assign({}, this.data.sections)
      for (let i in sections) {
        if ('土建' in sections[i]['categories']) {
          newSections.tj[i] = sections[i]
          newSections.tj[i]['categoryId'] = sections[i]['categories']['土建']['id']
        }
        if ('安装' in sections[i]['categories']) {
          newSections.az[i] = sections[i]
          newSections.tj[i]['categoryId'] = sections[i]['categories']['安装']['id']
        }
      }
      let currentType = this.data.currentType
      this.setData({
        buildingId,
        buildingName: building.name,
        sections: newSections,
        [`${currentType}Class`]: 'tap'
      })
    })
    this.setData({
      imageComments: require('imageComments.json'),
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
  toggle (event) {
    let toggleType = event.currentTarget.dataset.type
    if (toggleType !== this.data.currentType) {
      this.setData({
        currentType: toggleType,
        tjClass: toggleType === 'tj' ? 'tap' : '',
        azClass: toggleType === 'az' ? 'tap' : '',
      })
    }
  },
  chooseImage(event) {
    console.log(`buildingId: ${this.data.buildingId}`)
    console.log(`sectionId: ${event.currentTarget.dataset.id}`)
    console.log(`categoryType: ${this.data.currentType}`)
    let sections = this.data.sections
    let categoryType = this.data.currentType
    let sectionId = event.currentTarget.dataset.id
    wx.chooseImage({
      count: 0,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: (res) => {
        // console.log(res)
        this.setData({ modalHidden: false })
        let currentImageInfo = {
          tempFilePath: res.tempFilePaths[0],
          content: {
            commit_time: new Date(),
            construction_category_id: sections[categoryType][sectionId]['categoryId'],
            type: 'safety_risk',
            section_id: sectionId,
            device: '1',
            comment: '',
            description: '',
          }
        }
        this.setData({ currentImageInfo })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  commentTap(event) {
    let dataset = event.currentTarget.dataset
    let index = parseInt(dataset.index, 10)
    let oldIndex = this.data.commentSelectIndex
    if (index === oldIndex) {
      return
    }
    let commentInfo = dataset.info
    this.setData({
      commentSelectIndex: index,
      commentInfo,
    })
  },
  input (event) {
    // console.log(event.detail.value)
    // console.log(this.data.descriptionInfo)
    this.setData({ descriptionInfo: event.detail.value })
  },
  modalCancelClick () {
    this.setData({ modalHidden: true })
  },
  modalComfirmClick () {
    let currentImageInfo = this.data.currentImageInfo
    let description = this.data.descriptionInfo
    let comment = this.data.commentInfo
    currentImageInfo.content.description = description
    currentImageInfo.content.comment = comment

    console.log(currentImageInfo)

    let data = wx.getStorageSync('imageInfoList') || []
    data.push(currentImageInfo)
    wx.setStorage({
      key: 'imageInfoList',
      data,
      success: () => {
        this.setData({
          modalHidden: true,
          commentSelectIndex: null,
          commentInfo: '',
          descriptionInfo: '',
          currentImageInfo: {
            tempFilePath: '',
            content: {}
          }
        })
      }
    })
  }
})