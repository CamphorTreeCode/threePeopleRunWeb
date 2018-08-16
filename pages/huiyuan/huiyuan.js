
var app = getApp();
// pages/me/huiyuan/huiyuan.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "number": ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.appUrl + 'WXApplicant/findMembership?openId=' + wx.getStorageSync('openid') + '', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },

      success: function (res) {
        console.info("下面是会员信息：")
        console.log(res)
        //判断会员信息是否为null
        if (res.data == null){
          //为null则显示''
          that.setData({
            number: ''
          })
        }else{
          //不为null则显示会员号
          that.setData({
            number: res.data
          })
        }
        
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
    //view{animation.export()}
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
  fuzhi: function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.index.toString(),
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
          }
        })
      }
    })
  }
})