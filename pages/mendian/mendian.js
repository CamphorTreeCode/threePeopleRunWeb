// pages/mendian/mendian.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: 5,
    shopList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //查询门店的接口
   var that  = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res)
        wx.request({
          url: app.globalData.appUrl + 'WXBranchStore/selectBranchStore', //仅为示例，并非真实的接口地址
          method: "POST",
          data:{
            latitude: latitude,
            longitude: longitude,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            //'content-type': 'application/json', // 默认值
            xcxuser_name: "xcxuser_name"
          },
          success: function (res) {
            console.log(res)
            that.setData({
              shopList:res.data
            })
          }
        })
        // wx.openLocation({
        //   latitude: latitude,
        //   longitude: longitude,
        //   scale: 28
        // })
      }
    })
   //计算门店接口


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
  weizhi:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.latitude)

        wx.openLocation({
          latitude: parseFloat( e.currentTarget.dataset.latitude),
          longitude: parseFloat(e.currentTarget.dataset.longitude),
          scale: 28
        })
  }
})