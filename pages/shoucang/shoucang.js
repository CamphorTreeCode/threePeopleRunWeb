var app = getApp();

var pagesize = 0
function selectApplicant(that) {
  var openId = app.returnOpenId();
  wx.request({
    url: app.globalData.appUrl + 'WXCollection/selectCollectionPage',
    data: {
      openId: openId,
      currentPage: ++pagesize
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      xcxuser_name: "xcxuser_name"
    },
    method: 'get',
    success: function (res) {
      console.info("下面是用户收藏职位的信息：")
      console.log(res.data[0])
      // console.info(res.data[0].lists[0].companyJob[0].jobLabels)-
      // console.info(JSON.parse(res.data[0].lists[0].companyJob[0].jobLabels))
      // console.info(res.data[0].lists[0].companyJob[0].company.companyAddress.split(",")[2])
      //console.info(res.data[0].lists[0].companyJob[0].companyJobId)
      if (res.data[0].lists.length > 0) {
        var collectionList = that.data.collectionList;
        console.info(collectionList)
        for (var i = 0; i < res.data[0].lists.length; i++) {
          res.data[0].lists[i].companyJob[0].jobLabels = JSON.parse(res.data[0].lists[i].companyJob[0].jobLabels)
          res.data[0].lists[i].companyJob[0].company.companyAddress = res.data[0].lists[i].companyJob[0].company.companyAddress.split(",")[1];
          res.data[0].lists[i].state= "false";
          collectionList.push(res.data[0].lists[i]);

          
        }
        console.info(res.data[0].lists, collectionList)
        that.setData({
          collectionList,
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

    collectionList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取系统高度
    // let scrollHeight = wx.getSystemInfoSync().windowHeight;
    // this.setData({
    //   scrollHeight: scrollHeight
    // });

    // pagesize = 0
    // selectApplicant(this)
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
    //获取系统高度
    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      collectionList:[],
      scrollHeight: scrollHeight
    });

    pagesize = 0,
    selectApplicant(this)
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

// 左滑与右滑
  touchstart: function (e) {
    //开始触摸时 重置所有取消收藏
    this.data.collectionList.forEach(function (v, i) {
      if (v.state)//只操作为true的
        v.state = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      collectionList: this.data.collectionList
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.collectionList.forEach(function (v, i) {
      v.state = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.state = false
        else //左滑
          v.state = true
      }
    })
    //更新数据
    that.setData({
      collectionList: that.data.collectionList
    })
  },
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  // 去报名
  baoming: function(e){
    console.log("去报名");
    console.info(e)
    var index = e.target.dataset.index;
    console.log(this.data.collectionList[index].isCollection);
    var isCollection = this.data.collectionList[index].isCollection;
    if (isCollection==1){
      wx.showModal({
        title: '提示',
        content: '您已经报名！',
      })
    }else {
      var companyJobId = e.currentTarget.dataset.id;
      console.info(companyJobId)
      wx.navigateTo({
        url: '/pages/postdetails/postdetails?CompanyJobId=' + companyJobId,
      })
    }
    
  },
  // 取消收藏
  quxiao: function(e){
    console.log("取消收藏", e, e.currentTarget.dataset.collectionid);
    console.log("index",e.currentTarget.dataset.index)
    var collectionId = e.currentTarget.dataset.collectionid
    var index = e.currentTarget.dataset.index
    var that = this
    wx.request({
      url: app.globalData.appUrl + 'WXCollection/cancelCollection',
      data: {
        collectionId: collectionId
      }, 
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info(res, );
        if (res.data[0] == 1) {
          wx.showToast({
            title: '取消成功！',
            icon: 'success',
            duration: 2000
          })
          var collectionList = that.data.collectionList
          collectionList.splice(index,1)
          that.setData({
            collectionList: collectionList
          })
        } else {

        }
      }
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

  //岗位详情
  companyJobDetails: function (e) {
    var that = this
    console.log(e,e.currentTarget.dataset.index)
    console.log(e.currentTarget.dataset.id);
    var companyJobId = e.currentTarget.dataset.id;
    var collectionList = that.data.collectionList
    var index = e.currentTarget.dataset.index
    var collectionContent=collectionList[index].collectionContent

    console.log(collectionContent)

    app.globalData.collectionContent = collectionContent

    wx.navigateTo({
      url: '/pages/postdetails/postdetails?CompanyJobId=' + companyJobId + '&CompanyJob=' + collectionContent,
    })
  }
})

