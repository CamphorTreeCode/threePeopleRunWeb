const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    state: 0,
    tubiao: "../../image/jiantou.png",
    tubiao1:"../../image/jinatou.png",
    // 点击保存按钮后跳转到我state变为1,并且tubiao变为../../image / jinatou.png
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

 

    var that=this;
    wx.getUserInfo({
      success: function (res) {
        //console(res.userInfo)
        that.setData({
          userInfo: res.userInfo,
        })
      }
    })

  },

  onShow: function () {

    //查询用户信息是否填写完整
    var that = this;
    wx.request({
      url: app.globalData.appUrl + 'WXApplicant/findUserFullApplicantMsg?openId=' + app.returnOpenId() + '', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },

      success: function (res) {
        //console.info("下面是查询用户信息是否填写完整结果")
        var fullMsg = res.data.applicantMsgAll;
        // console.log(fullMsg)
        // console.info('返回数据###################')
        // console.log("完整状态为：" + fullMsg)
        //判断信息是否填写完整
        if (fullMsg == true) {
          that.setData({
            //完整不显示待完善
            state: 1
          })
        } else {
          that.setData({
            //不完整显示待完善
            state: 0
          })
        }
        //console.log("最后状态为：" + that.data.state)
      }
    })
  },
  shoucang: function(){
    wx.navigateTo({
      url: '/pages/shoucang/shoucang',
    })
  },
  huiyuan: function(){
    wx.navigateTo({
      url: '/pages/huiyuan/huiyuan',
    })
  },
  baoming: function(){
    wx.navigateTo({
      url: '/pages/baoming/baoming?openId=' + wx.getStorageSync('openid') +'',
    })
  },
  dianhua: function(){
    wx.makePhoneCall({
      phoneNumber: '021-57659081',
    })
  },
  yijian: function(){
    wx.navigateTo({
      url: '/pages/yijian/yijian',
    })
  },
  guanyu: function(){
    wx.navigateTo({
      url: '/pages/guanyu/guanyu',
    })
  }
})
