var app=getApp();
// pages/identical/identical.js
//引入富文本
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
        // 返费数据
        fanfei1:[
          {name:"程咬金",price:"3500",date:"2018-5-21"},
          { name: "李大钊", price: "3700", date: "2018-5-18" },
          { name: "鲁迅", price: "3300", date: "2018-5-17" },
          { name: "陈独秀", price: "3500", date: "2018-5-16" },
          { name: "赵日天", price: "3100", date: "2018-5-14" },
          { name: "王二麻", price: "3900", date: "2018-5-11" }
        ],
        fanfei:[],
  },  

  /**console.log("Path: "+options.scene)console.log("Path: "+options.scene)console.log("Path: "+options.scene)
}console.log("Path: "+options.scene)
}optionsbnxb          
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info("下面是传过来的id")
    console.info(options.factoryId)
    var that = this
    // 获取详细信息 start 
    wx.request({
      url: app.globalData.appUrl + 'WXBackFactory/selectBackFactoryDetails', //仅为示例，并非真实的接口地址
      data: { factoryId: options.factoryId },
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded',// 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) { 
        console.info("下面是返费名单详细信息：");
        console.log(res.data[0])
        console.info(res.data[0].company.companyName);
        //console.info(res.data[0].content);
        //富文本解析
        var article = res.data[0].content;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          fanfei: res.data[0] 
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