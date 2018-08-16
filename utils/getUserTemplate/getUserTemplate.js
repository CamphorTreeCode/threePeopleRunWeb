// utils/getUserTemplate/getUserTemplate.js
var app = getApp();
var userLogin = require('../userlogin.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: { 
    showSQ: true,
    noneShowButton: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindGetUserInfo: function (e) {
      
      console.log(app.globalData.userInfo)
      var that = this
      console.log(e, this)   
   if (e.detail.errMsg == "getUserInfo:ok") {
        that.setData({
          showSQ: true,
          noneShowButton: false
        })
        userLogin.login();
      }
    }
  },
  ready:function(){
    var that =this

    wx.getSetting({
      success: function (res) {

        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          userLogin.getOpenid()
          console.log("yiji ", res)
          wx.getUserInfo({
            success: function (res) {
              console.log("app.js start ")
              console.log(res.errMsg)
              if (res.errMsg == "getUserInfo:ok") {
          
                that.setData({
                  showSQ: true
                })
                userLogin.login();
              }
            }
          })

        } else {
          userLogin.getOpenid()
          console.log("my", res)
          that.setData({
            showSQ: false
          })
          
        }
      }
    })
  //权限验证

  }
})
