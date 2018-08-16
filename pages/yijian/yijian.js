var tankuang = false;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: "true"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  formSubmit: function(e) {

    var bu = true;
    //表单验证
    if (e.detail.value.content == '') {
      bu = false;
      wx.showToast({
        title: '请填写反馈内容',
        icon: 'none',
        duration: 2000
      })

    } else {
      wx.getUserInfo({
        success: function(res) {
          console.log(res)
          var OpenId = app.returnOpenId()
          wx.request({
            url: app.globalData.appUrl + 'WXFeedBack/addFeedBack',
            header: {
              // 'content-type': 'application/x-www-form-urlencoded' // 默认值
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              xcxuser_name: "xcxuser_name"
            },
            data: {
              content: e.detail.value.content,
              openId: OpenId,
            },
            success: function(res) {
              console.info(res)

            }

          })
        }
      })
    }
    if (bu) {
      this.setData({
        tankuang: true,
        show: false
      })
      setTimeout(function() {
        wx.switchTab({
          url: '/pages/me/me',
        })
      }, 1000)
    }

  }


}) 