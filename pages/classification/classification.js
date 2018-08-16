// pages/classification/classification.js
var app = getApp()
var pagesize = 0;

var util = require('../../utils/util')
function selectTypePage(that) {
  console.log("21")
  wx.request({
    url: app.globalData.appUrl + 'WXCompanyJob/selectCompanyJobPage',
    data: {
      currentPage: ++pagesize,
      jobCategoryId: that.data.jobCategoryId,
      returnMoney: that.data.returnMoney,
      jobRecruitsGender: that.data.jobRecruitsGender,
      jobSalaryMin: that.data.jobSalaryMin,
      jobSalaryMax: that.data.jobSalaryMax,
      companyAddress: that.data.companyAddress,
      createTimes: that.data.createTimes,
      companyName: that.data.companyName,
      key: that.data.key
    },
    header: {
      // 'content-type': 'application/x-www-form-urlencoded' // 默认值
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      xcxuser_name: "xcxuser_name"
    },
    method: 'POST',
    success: function(res) {
      console.info("下面是分类页面数据")
      console.log(res)

      if (res.data[0].lists.length > 0) {

        var shopList = that.data.shopList
        var shopZD = []
        var shop = []
        for (var i = 0; i < res.data[0].lists.length; i++) {
          if (res.data[0].lists[i].jobStick == 1) {
          res.data[0].lists[i].jobLabels = JSON.parse(res.data[0].lists[i].jobLabels)
          res.data[0].lists[i].jobSwiperImages = JSON.parse(res.data[0].lists[i].jobSwiperImages)
          shopZD.push(res.data[0].lists[i])
          }else{
            res.data[0].lists[i].jobLabels = JSON.parse(res.data[0].lists[i].jobLabels)
            res.data[0].lists[i].jobSwiperImages = JSON.parse(res.data[0].lists[i].jobSwiperImages)
            shop.push(res.data[0].lists[i])
          }
        }
        var s = shopZD.concat(shop)
        console.info("下面是指定数据")
        console.info(s)
        console.info(shop)

        console.info(res.data[0].lists, shopList)
        that.setData({
          shopList: that.data.shopList.concat(s),
          showData: true,
          showLoading: true
        })
      } else {
        that.setData({
          bottomText: false,
          showLoading: true
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
    pricex: -1, //返现金额选择
    selectsx: -1,//筛选的选择
    // 下拉框第一个显示
    diyige: "true",
    dier: "true",
    disan: "true",
    disi: "true",
    xuanze: "a",
    curren: "",
    gao: 0,
    xianshi: "none",
    clientY: "",
    post: "relative",
    foterlist: [{
        name: "上海胜瑞日铭",
        url: "https://www.chuanshoucs.com/ServerImg/2018-05-28/7a412589-1159-42bc-ae8c-f014b8247843.jpg",
        title: [{
            name: "人气"
          },
          {
            name: "返现最高"
          }
        ],
        fanli: "3400",
        price: "4000-5000/月"
      },
      {
        name: "天下第一仓:菜鸟",
        url: "https://www.chuanshoucs.com/ServerImg/2018-05-28/81672414-0c6f-473e-8b86-6204d0bb49ff.jpg",
        title: [{
            name: "人气"
          },
          {
            name: "返现最高"
          }
        ],
        fanli: "3700",
        price: "4000-5000/月"
      }
    ],
    foterlist1: [{
        name: "上海胜瑞日铭",
        url: "https://www.chuanshoucs.com/ServerImg/2018-05-28/801519c6-74e7-43f8-bfa5-f473cf8780cf.jpg",
        title: [{
            name: "人气"
          },
          {
            name: "返现最高"
          }
        ],
        fanli: "3400",
        price: "4000-5000/月"
      },
      {
        name: "上海圣澜科技有限公司",
        url: "https://www.chuanshoucs.com/ServerImg/2018-05-28/20a58256-d943-479f-8278-dcbd18881785.jpg",
        title: [{
            name: "人气"
          },
          {
            name: "返现最高"
          }
        ],
        fanli: "3700",
        price: "4000-5000/月"
      },
      {
        name: "上海恩诩有限公司",
        url: "https://www.chuanshoucs.com/ServerImg/2018-05-28/8f735726-01af-440b-a923-fef845c55088.jpg",
        title: [{
            name: "人气"
          },
          {
            name: "返现最高"
          }
        ],
        fanli: "3700",
        price: "4000-5000/月"
      },
      {
        name: "上海圣澜科技有限公司",
        url: "https://www.chuanshoucs.com/ServerImg/2018-05-28/20a58256-d943-479f-8278-dcbd18881785.jpg",
        title: [{
            name: "人气"
          },
          {
            name: "返现最高"
          }
        ],
        fanli: "3700",
        price: "4000-5000/月"
      },
      {
        name: "上海恩诩有限公司",
        url: "https://www.chuanshoucs.com/ServerImg/2018-05-28/8f735726-01af-440b-a923-fef845c55088.jpg",
        title: [{
            name: "人气"
          },
          {
            name: "返现最高"
          }
        ],
        fanli: "3700",
        price: "4000-5000/月"
      }
    ],

    leixing: [{
        name: "普工",
        state: 0
      },
      {
        name: "包装工",
        state: 0
      },
      {
        name: "质检员",
        state: 0
      },
      {
        name: "仓库员",
        state: 0
      },
      {
        name: "电工",
        state: 0
      },
      {
        name: "叉车/铲车",
        state: 0
      }
    ],
    xingbie: [{
        name: "全部",
        state: 0
      },
      {
        name: "男可做",
        state: 0
      },
      {
        name: "女可做",
        state: 0
      }
    ],
    jine: [{
        name: "1000-2000",
        state: 0
      },
      {
        name: "2000-3000",
        state: 0
      },
      {
        name: "3000-4000",
        state: 0
      },
      {
        name: "4000以上",
        state: 0
      }
    ],
    hezong: [{
        name: "最新发布",
        state: 0
      },
      {
        name: "离我最近",
        state: 0
      }
    ],
    //轮播图集
    shopList: [],
    //选择的类型
    jobCategoryId: [],
    showData: true,
    bottomText: true,
    //返费
    returnMoney: null,
    //选择的性别
    jobRecruitsGender: null,
    //工资最小值
    jobSalaryMin: null,
    //工资最大值
    jobSalaryMax: null,
    //当前的地址
    companyAddress: null,
    //最新时间排序
    createTimes: "true",
    //根据企业名称查询
    companyName: null,

    //优职推荐
    goodJob: [],

    //企业名称input获取值
    companyNames: null,
    //选择功能
    key:null

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //设置下滑高度 start
    var that = this
    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      scrollHeight: scrollHeight
    });
    //设置下滑高度 end 
    var ss = 0;
    wx.getSystemInfo({
      success: function(res) {
        ss = res.screenHeight;
      },
    })
    this.setData({
      clientY: ss
    })
    //获取商品数据 start 
    pagesize = 0;
    selectTypePage(that)
    //获取商品数据 end
    //获取所有分类的方法 start

    wx.request({ 
      url: app.globalData.appUrl + 'WXJobCategory/selectJobCategoryType',
      header: {
       'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info(res);
        that.setData({
          leixing: res.data
        })

      }
    })
    //获取所有分类的方法 end

    //优职推荐start
    wx.request({
      url: app.globalData.appUrl + 'WXCompanyJob/findTwoCompanyJob',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("优职推荐开始")
        console.info(res)
        console.info(res.data[0].jobSwiperImages)
        if (res.data.length > 0) {
          var goodJob1 = that.data.goodJob;
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].jobLabels = JSON.parse(res.data[i].jobLabels)
            res.data[i].jobSwiperImages = JSON.parse(res.data[i].jobSwiperImages)
            if ((res.data[i].jobLabels).length <= 1) {
              goodJob1.push(res.data[i]);
            } else {
              var a = [];
              for (var j = 0; j < 2; j++) {
                a.push(res.data[i].jobLabels[j])
              }
              res.data[i].jobLabels = a;
              goodJob1.push(res.data[i]);
            }
          }
          console.info(goodJob1)
          // console.info(res.data[0].jobSwiperImages[0])
          that.setData({
            goodJob: goodJob1
          })
          //console.info(that.data.goodJob)
        }
        //console.info("优职推荐结束")
      }
    })
    //优职推荐end
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

  },

  //岗位详情
  jobDetails: function (e) {
    console.info("************************************")
    console.log(e.currentTarget.dataset.id);
    var companyJobId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/postdetails/postdetails?CompanyJobId=' + companyJobId,
    })
  },


  //换一批事件start
  changeJob: function (e) {
    // console.info("换一批事件开始")
    // console.info(e)
    var that = this;
    wx.request({
      url: app.globalData.appUrl + 'WXCompanyJob/findTwoCompanyJob',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        // console.info("下面是优职推荐数据：")
        //console.info(res.data.length)
        that.data.goodJob = [];
        that.setData({
          goodJob: that.data.goodJob
        })
        if (res.data.length > 0) {
          var goodJob1 = that.data.goodJob;
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].jobSwiperImages = JSON.parse(res.data[i].jobSwiperImages)
            res.data[i].jobLabels = JSON.parse(res.data[i].jobLabels)
            if ((res.data[i].jobLabels).length<=1){
                goodJob1.push(res.data[i]);
            }else{
              var a = [];
              for (var j = 0; j < 2; j++) {
                a.push(res.data[i].jobLabels[j])
              }
              res.data[i].jobLabels = a;
              goodJob1.push(res.data[i]);
              }
          }
          // console.info(goodJob1)
          // console.info("上面是优职推荐数据：")
          that.setData({
            goodJob: goodJob1
          })
        }

      }
    })

    //console.info("换一批事件结束")
  },

  sanlei: function() {


    if (this.data.curren == 0 && this.data.diyige == "true") {
      // if (this.data.curren != 1) {
      var that = this;
      var gaodu = 0;
      setTimeout(function() {
        var ss = setInterval(function() {
          gaodu += 40;
          that.setData({
            xuanze: 0,
            curren: 0,
            gao: gaodu,
            xianshi: "block",
            post: "fixed",
            diyige: "false",
            dier: "true",
            disan: "true",
            disi: "true"
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }, 10)
      }, 30)
      // }
    } else if (this.data.curren != 0 && this.data.diyige == "true") {
      var that = this;
      var gaodu = 0;
      setTimeout(function() {
        var ss = setInterval(function() {
          gaodu += 40;
          that.setData({
            xuanze: 0,
            curren: 0,
            gao: gaodu,
            xianshi: "block",
            post: "fixed",
            diyige: "false",
            dier: "true",
            disan: "true",
            disi: "true"
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }, 10)
      }, 30)
    }
  },
  sanprice: function() {
    if (this.data.curren == 1 && this.data.dier == "true") {
      // if (this.data.curren != 1) {
      var that = this;
      var gaodu = 0;
      setTimeout(function() {
        var ss = setInterval(function() {
          gaodu += 40;
          that.setData({
            xuanze: 1,
            curren: 1,
            gao: gaodu,
            xianshi: "block",
            post: "fixed",
            diyige: "true",
            dier: "false",
            disan: "true",
            disi: "true"
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }, 10)
      }, 30)
      // }
    } else if (this.data.curren != 1 && this.data.dier == "true") {
      var that = this;
      var gaodu = 0;
      setTimeout(function() {
        var ss = setInterval(function() {
          gaodu += 40;
          that.setData({
            xuanze: 1,
            curren: 1,
            gao: gaodu,
            xianshi: "block",
            post: "fixed",
            diyige: "true",
            dier: "false",
            disan: "true",
            disi: "true"
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }, 10)
      }, 30)
    }
  },
  sanzong: function() {
    if (this.data.curren != 2 && this.data.disan == "true") {
      var that = this;
      var gaodu = 0;
      setTimeout(function() {
        var ss = setInterval(function() {

          gaodu += 40;
          that.setData({
            xuanze: 2,
            curren: 2,
            gao: gaodu,
            xianshi: "block",
            post: "fixed",
            diyige: "true",
            dier: "true",
            disan: "false",
            disi: "true"
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }, 10)
      }, 30)
    } else if (this.data.curren == 2 && this.data.disan == "true") {
      var that = this;
      var gaodu = 0;
      setTimeout(function() {
        var ss = setInterval(function() {

          gaodu += 40;
          that.setData({
            xuanze: 2,
            curren: 2,
            gao: gaodu,
            xianshi: "block",
            post: "fixed",
            diyige: "true",
            dier: "true",
            disan: "false",
            disi: "true"
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }, 10)
      }, 30)
    }
  },
  sanshai: function() {
    if (this.data.curren != 3 && this.data.disi == "true") {
      var that = this;
      var gaodu = 0;
      setTimeout(function() {
        var ss = setInterval(function() {
          gaodu += 40;
          that.setData({
            xuanze: 3,
            curren: 3,
            gao: gaodu,
            xianshi: "block",
            post: "fixed",
            diyige: "true",
            dier: "true",
            disan: "true",
            disi: "false"
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }, 10)
      }, 30)
    } else if (this.data.curren == 3 && this.data.disi == "true") {
      var that = this;
      var gaodu = 0;
      setTimeout(function() {
        var ss = setInterval(function() {

          gaodu += 40;
          that.setData({
            xuanze: 3,
            curren: 3,
            gao: gaodu,
            xianshi: "block",
            post: "fixed",
            diyige: "true",
            dier: "true",
            disan: "true",
            disi: "false"
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }, 10)
      }, 30)
    }
  },
  gaibain: function(e) {
    var index = e.detail.current;
    if (index == 0) {
      this.data.xuanze = 0;
    } else if (index == 1) {
      this.data.xuanze = 1;
    } else if (index == 2) {
      this.data.xuanze = 2;
    } else if (index == 3) {
      this.data.xuanze = 3;
    }
    this.setData({
      xuanze: this.data.xuanze
    })
  },
  btn: function(e) {
    var that = this
    var index = e.currentTarget.dataset.in;
    console.log(index, index == "search")
    //类型选择
    if (index == "leixing") {
      var jobCategoryId = []
      var leixing = that.data.leixing
      for (var i = 0; i < leixing.length; i++) {
        if (leixing[i].state == 1) {
          jobCategoryId.push(that.data.leixing[i].jobCategoryId)
        }

      }
      if (jobCategoryId.length > 0) {
        that.setData({
          jobCategoryId,
          shopList: []
        })
        pagesize = 0
        selectTypePage(that)

      }
      //全取消的恢复空条件查询
      else {
        that.setData({
          jobCategoryId: [],
          shopList: []
        })
        pagesize = 0
        selectTypePage(that)
      }
    }
    //返现金额选择
    else if (index == "jine") {
      var returnMoney = [];
      var jine = that.data.jine
      if (that.data.pricex != -1) {
        console.log("进来了")
        console.log(that.data.jine[that.data.pricex].name)
        if (that.data.jine[that.data.pricex].name == "4000以上") {
          that.data.jine[that.data.pricex].name = "4000-"
        }
        that.setData({
          returnMoney: that.data.jine[that.data.pricex].name,
          shopList: [],

        })
        pagesize = 0
        selectTypePage(that)

      } else {
        that.setData({
          returnMoney: null,
          shopList: [],

        })
        pagesize = 0
        selectTypePage(that)
      }

    }
    //综合排序
    else if (index == "address") {
      // city + district
      var hezong = that.data.hezong

      if (hezong[1].state == 1) {

        if (hezong[0].state == 0) {
          that.setData({
            createTimes: null
          })

        } else {
          that.setData({
            createTimes: "true",
          })
        }


        that.setData({
          companyAddress: that.data.city + "," + that.data.district,
          shopList: [],
          city: null,
          district: null
        })
        pagesize = 0
        selectTypePage(that)

      } else {
        if (hezong[0].state == 0) {
          that.setData({
            createTimes: null
          })

        } else {
          that.setData({
            createTimes: "true",
          })
        }

        that.setData({
          companyAddress: null,
          shopList: [],

        })
        pagesize = 0
        selectTypePage(that)
      }
    }
    //赛选选择
    else if (index == "saixuan") {
      if (that.data.jobSalaryMin != null && that.data.jobSalaryMax == null) {
        wx.showToast({
          title: '请填写工资最大值',
          icon: 'none',
          duration: 1500
        })
        return
      } else if (that.data.jobSalaryMin == null && that.data.jobSalaryMax != null) {
        wx.showToast({
          title: '请填写工资最小值',
          icon: 'none',
          duration: 1500
        })
        return
      }
      var selectsx = that.data.selectsx
      if (selectsx != -1 && companyNameelectsx != 0) {
        that.setData({
          jobRecruitsGender: selectsx - 1,
          shopList: [],
        })
        if (selectsx != -1 && selectsx != 0) {
          that.setData({
            jobRecruitsGender: selectsx - 1,
            shopList: [],
          })
          pagesize = 0
          selectTypePage(that)
        } else {
          that.setData({
            jobRecruitsGender: null,
            shopList: [],

          })
          pagesize = 0
          selectTypePage(that)
        }

      }
    } 
    else if (index == "search") {
      console.log("123")
      console.log(that.data.companyNames)
      if (that.data.companyNames != null) {
        that.setData({
          shopList: [],
          companyName: that.data.companyNames
        })
        pagesize = 0
        selectTypePage(that)
      }

    }
    console.log(e)
    this.setData({
      gao: 0,
      post: "relative",
      diyige: "true",
      disi: "true",
      dier: "true",
      disan: "true"
    })
  },
  // swiper分类选择
  textdianji: function(e) {
    var that = this
    var index = e.currentTarget.dataset.ind;
    console.log(index)

    var leixing = that.data.leixing

    if (this.data.leixing[index].state == 1) {
      leixing[index].state = 0;
    } else {
      leixing[index].state = 1;
    }
    that.setData({
      leixing: leixing
    })
  },
  //筛选的选择
  textdian: function(e) {
    var index = e.currentTarget.dataset.id;

    console.log(index, this.data.selectsx)
    if (this.data.selectsx == index) {
      console.log("ss")
      this.setData({
        selectsx: -1
      })
      return false;
    } else {
      console.log("xx")
      this.setData({
        selectsx: index
      })
    }
  },
  //返现的选择
  textdiana: function(e) {
    var index = e.currentTarget.dataset.id;

    var index = e.currentTarget.dataset.ia;
    console.log(index, this.data.pricex)
    if (this.data.pricex == index) {
      console.log("ss")
      this.setData({
        pricex: -1
      })
      return false;
    } else {
      console.log("xx")
      this.setData({
        pricex: index
      })
    }
    // console.log(index)
    // console.log(this.data.jine[index].state)
    // if (this.data.jine[index].state == 1) {
    //   this.data.jine[index].state = 0;
    //   // console.log(0)
    // }
    // else if (this.data.jine[index].state == 0) {
    //   this.data.jine[index].state = 1;
    //   // console.log(0)
    // }
    // this.setData({
    //   jine: this.data.jine
    // })
  },
  //综合的选择
  textdianb: function(e) {
    console.log("离我最进")
    var index = e.currentTarget.dataset.ib;
    console.log(index)
    console.log(this.data.hezong[index].state)
    if (index == 1) {
      util.getLocationDetails(this)
    }
    if (this.data.hezong[index].state == 1) {
      this.data.hezong[index].state = 0;
      // console.log(0)
    } else if (this.data.hezong[index].state == 0) {
      this.data.hezong[index].state = 1;
      // console.log(0)
    }
    this.setData({
      hezong: this.data.hezong
    })
  },
  huidaotop: function() {
    console.log(this.data.gao)
    if (this.data.gao == 0) {
      this.setData({
        abba: 74
      })
    }
    this.setData({
      post: 'fixed',
      juli: '0'
    })
  },
  shopDetails(e) {
    console.log(e, e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/postdetails/postdetails?CompanyJobId=' + e.currentTarget.dataset.id,
    })
  },
  bindscro: function(e) {
    if (e.detail.scrollTop >= 74) {
      this.setData({
        post: 'fixed',
        juli: '130'
      })
    } else {
      this.setData({
        post: 'relative',
        juli: '0',
      })
    }
  },
  //下拉刷新
  lower: function() {
    console.log("..")
    var that = this
    that.setData({
      showLoading: false
    })
    selectTypePage(that)
  },
  //工资输入框
  inputTyping: function(e) {
    var id = e.currentTarget.id
    console.log(e, id)
    if (id == "min") {
      this.setData({
        jobSalaryMin: e.detail.value
      })
    } else if (id == "max") {
      this.setData({
        jobSalaryMax: e.detail.value
      })
    } else if (id == "search") {

      this.setData({
        companyNames: e.detail.value
      })
    }
  },
})