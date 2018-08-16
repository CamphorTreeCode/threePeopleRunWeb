var app = getApp()  
// pages/me/guanyu/guanyu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    aboutUsContent: '',
    aboutUsimg: '',
    //"jianjie":"职介梭的萨芬决定萨拉空间法拉第；是进口量的时间考虑发神经的拉丁；神经分裂；啊速度加快立法；是大家啊；监控力度是解放啦；时间考虑法拉的时间法律撒的健康路附近拉开的是福建拉多少"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var aboutMe = this
    wx.request({
      url: app.globalData.appUrl + 'WXAboutUs/findAboutUsDetails',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info(res);
        //console.info(res.data[0].content)
        //console.info(res.data[0].images)
        aboutMe.setData({

          aboutUsContent: res.data[0].content,
          aboutUsimg: res.data[0].images
        })
      }
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
  
  }
})