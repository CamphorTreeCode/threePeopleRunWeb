//表单验证
function yanzheng(applicantList) {
  if (applicantList.applicantName == '') {
    wx.showToast({
      title: '请填写姓名',
      icon: 'none',
      duration: 2000
    })
    return false;
  }
  if (applicantList.applicantPhoneNo == '') {
    wx.showToast({
      title: '请填写联系电话',
      icon: 'none',
      duration: 2000
    })
    return false;
  } else {
    if (!/^((\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(applicantList.applicantPhoneNo)) {
      wx.showToast({
        title: '请按照正确联系方式填写',
        icon: 'none',
        duration: 2000 
      })
      return false;
    } else {
      // return true;
    }
  }
  if (applicantList.applicantIDCardNo == '') {
    // wx.showToast({
    //   title: '请填写身份证号码',
    //   icon: 'none',
    //   duration: 2000
    // })
    return true;
  } else {
    if (!/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(applicantList.applicantIDCardNo)) {
      wx.showToast({
        title: '请正确填写身份证号码',
        icon: 'none',
        duration: 2000
      })
    } else {
      return true;
    }
  }
}
var app = getApp();
// pages/me/baoming/baoming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioCheckVal: 0,
    radioVal: 0,
    dateTime: '',
    applicantList: [],
    date: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置系统时间
    this.data.dateTime = new Date();
    var myDate = this.data.dateTime.getFullYear() + '-' + (this.data.dateTime.getMonth() + 1) + '-' + this.data.dateTime.getDate();
    this.setData({
      dateTime: myDate
    })
    console.info("用户报名表状态为：" + app.globalData.applicantUser)
    if (app.globalData.applicantUser == true) {
      var that = this;
      wx.request({
        url: app.globalData.appUrl + 'WXApplicant/findApplicantMsg',
        data: { openId: options.openId },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
          that.setData({
            applicantList: res.data.applicant,
            date: res.data.applicant.applicantBirthday,
            radioCheckVal: res.data.applicant.applicantGender
          })
        }
      })
    }
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  xingbie: function (e) {
    this.setData({
      radioCheckVal: e.detail.value
    })
  },
  shenti: function (e) {
    this.setData({
      radioVal: e.detail.value
    })
  },

  //提交表单
  formSubmit: function (e) {

    console.info('触发事件');
    console.info(e);
    var that = this;
    var applicantList = e.detail.value;
    applicantList.openId = app.returnOpenId()
    applicantList.applicantGender = this.data.radioCheckVal;
    applicantList.readstate = 0;
    if (yanzheng(applicantList)) {
      wx.request({
        url: app.globalData.appUrl + 'WXApplicant/addApplicantMsg',
        data: applicantList,
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        success: function () {
          app.globalData.applicantUser = true;
        }
      })
      wx.switchTab({
        url: '/pages/me/me',
      })
    }

  }
})