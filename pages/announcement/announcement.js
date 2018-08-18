// pages/announcement/announcement.js
var app = getApp()
//公告start
function findAllHomeNoticeMsg(that) {
  wx.request({
    url: app.globalData.appUrl + 'WXHomeNotice/findAllHomeNoticeMsg', //仅为示例，并非真实的接口地址
    method: "GET",
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      //'content-type': 'application/json', // 默认值
      xcxuser_name: "xcxuser_name"
    },
    success: function (res) {
      console.info("下面是首页公告信息：")
      console.log(res)
      that.setData({
        HomeNotice: res.data
      })
    }
  })
}
//公告end

Page({

  /**
   * 页面的初始数据
   */
  data: {
    HomeNotice: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
    findAllHomeNoticeMsg(this)

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