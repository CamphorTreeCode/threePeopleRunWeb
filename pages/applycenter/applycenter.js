// pages/applycenter/applycenter.js
var app = getApp();
var pagesize = 0

function selectApplicant(that) {
  var openId = app.returnOpenId()
  wx.request({
    url: app.globalData.appUrl + 'WXApplicantCompantJob/selectApplicantCompanyJobPage',
    data: {
      openId: openId,
      currentPage: ++pagesize
    },
    header: {
      // 'content-type': 'application/x-www-form-urlencoded' // 默认值
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      xcxuser_name: "xcxuser_name"
    },
    method: 'get',
    success: function(res) {
      console.info("下面是用户申请职位的信息：")
      console.log(res.data[0])
      if (res.data[0].lists.length > 0) {
        var applicantList = that.data.applicantList;
        for (var i = 0; i < res.data[0].lists.length; i++) {
          res.data[0].lists[i].companyJob[0].jobLabels = JSON.parse(res.data[0].lists[i].companyJob[0].jobLabels)
          res.data[0].lists[i].companyJob[0].company.companyAddress = res.data[0].lists[i].companyJob[0].company.companyAddress.split(",")[1];
          applicantList.push(res.data[0].lists[i])
        }
        console.info(res.data[0].lists, applicantList)
        that.setData({
          applicantList,
          showLoading: true,
        })
      } else {
        that.setData({
          bottomText: false,
          showLoading: true,
        })
      }
    }
  })
}




Page({

  /**
   * 页面的初始数据 
   */
  data: {
    flag: true,
    // 报名成功数据
    applicantList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取系统高度
    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      scrollHeight: scrollHeight
    });

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

    this.data.applicantList = [];
    this.setData({
      applicantList: this.data.applicantList
    })
    pagesize = 0;
    selectApplicant(this)
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
    return {
      imageUrl: app.globalData.homeImg

    }
  },
  show: function() {

    this.setData({
      flag: false
    })

  },

  //下拉刷新功能
  lower() {
    console.log("分页啦")
    this.setData({
      showLoading: false
    })
    selectApplicant(this)
  },
  //消失

  hide: function() {

    this.setData({
      flag: true
    })

  },
  //岗位详情
  companyJobDetails: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.id);
    var companyJobId = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index
    //判断岗位是否生效
    var isInvalid = that.data.applicantList[index].isInvalid;
    var applicantList = that.data.applicantList
    var applicantContent = applicantList[index].applicantContent
    app.globalData.applicantContent = applicantContent
    wx.navigateTo({
      url: '/pages/postdetails/postdetails?CompanyJobId=' + companyJobId + '&CompanyJob=' + applicantContent + '&isInvalid=' + isInvalid,
    })
  }
})
