var app = getApp();
// pages/index/index.js

function getHomeSwiper(that) {
  wx.request({
    url: app.globalData.appUrl + 'WXHomeSwiper/selectHomeSwiperList', //仅为示例，并非真实的接口地址
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      //'content-type': 'application/json', // 默认值
      xcxuser_name: "xcxuser_name"
    },
    success: function(res) {
      console.log(res)

      that.setData({
        HomeSwiper: res.data
      })
    }
  })
}
 
var util = require('../../utils/util')
var pagesize = 0;

function selectTypePage(that) {
  console.log("22")
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
      console.info("下面是首页列表数据")
      console.log(res)

      if (res.data[0].lists.length > 0) {


        var shopList = that.data.shopList
        var shopZD = []
        var shop = []
        for (var i = 0; i < res.data[0].lists.length; i++) {
          if (res.data[0].lists[i].jobStick==1){
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
        // console.info(res.data[0].lists, shopList)
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
    pricex: -1,//返现金额选择
    selectsx: -1,//筛选的选择
    juli: -11,
    // 下拉框第一个显示
    diyige: "true",
    dier: "true",
    disan: "true",
    disi: "true",
    // 报名表显示
    dcancel: "block",
    clientY: "",
    post: "relative",
    tophead: 0,
    // 头部轮播图
    slider: [{
        picUrl: "/img/index/banner.jpg"
      },
      {
        picUrl: "https://www.chuanshoucs.com/ServerImg/2018-05-28/ef6245ff-1ffe-442f-9cd2-f996ba9f54b5.jpg"
      },
      {
        picUrl: "https://www.chuanshoucs.com/ServerImg/2018-05-28/4a333764-8229-420d-8f4d-c91ac0f159e1.jpg"
      },
      {
        picUrl: "https://www.chuanshoucs.com/ServerImg/2018-05-28/e99b9c44-8f0c-4223-a1f5-a1735473d4c0.jpg"
      },
      {
        picUrl: "https://www.chuanshoucs.com/ServerImg/2018-05-28/62c32dd7-df0f-4ad6-b041-6d85d2c1b772.jpg"
      }
    ],
    suoyouc: 0,
    swiperCurrent: 0,
    // 换一批的数据
    change: [{
        name: "上海胜瑞日铭",
        title: [{
            name: "人气"
          },
          {
            name: "返现最高"
          }
        ],
        price: "4000-5000/月"
      },
      {
        name: "天下第一仓:菜鸟",
        title: [{
            name: "人气"
          },
          {
            name: "返现最高"
          }
        ],
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
    jine: [{
        name: "1000-2000"
      },
      {
        name: "2000-3000"
      },
      {
        name: "3000-4000"
      },
      {
        name: "4000以上"
      }
    ],
    hezong: [{
        name: "最新发布",
        state: 1
      },
      {
        name: "离我最近",
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
    xuanze: "a",
    curren: "",
    gao: 0,
    xianshi: "none",

    // 底部列表显示
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
        url: "https://www.chuanshoucs.com/ServerImg/2018-05-28/801519c6-74e7-43f8-bfa5-f473cf8780cf.jpg",
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
        name: "上海胜瑞日铭",
        url: "https://www.chuanshoucs.com/ServerImg/2018-05-28/81672414-0c6f-473e-8b86-6204d0bb49ff.jpg",
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
        name: "天下第一仓:菜鸟",
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
        name: "天下第一仓:菜鸟",
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
        name: "天下第一仓:菜鸟",
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
    //轮播图集合
    HomeSwiper: [],
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
    companyName:null,
    //key设置为null
    key:null,
    //优职推荐
    goodJob: [],
    //首页导航开始
    homeNavigation:[],
    scene:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info("****************************************************");
    // console.info(options)
    if (options.scene) {
      this.setData({
        scene: decodeURIComponent(options.scene)
      });
      console.log("Path1: " + decodeURIComponent(options.scene))

      wx.navigateTo({
        url: '/pages/postdetails/postdetails' + '?CompanyJobId=' + this.data.scene
      })
    } 
    
    // var scene ='';
    // this.setData({
    //   scene:options.scene
    // })
    

    //设置下滑高度
    var that = this
    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      scrollHeight: scrollHeight
    });
    //查找轮播图
    getHomeSwiper(this);
    var ss = 0;
    wx.getSystemInfo({
      success: function(res) {
        ss = res.screenHeight;
      },
    }) 
    this.setData({
      clientY: ss 
    })
 

    //判断用户是否有报名表start
    if (app.globalData.applicantUser == true) {
      this.setData({
        dcancel: 'none'
      })
    } else {
      this.setData({
        dcancel: 'block'
      })
    }
    //判断用户是否有报名表end

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
      success: function(res) {
        //console.info("优职推荐开始")
        if (res.data.length > 0) {
          var goodJob1 = that.data.goodJob;
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].jobLabels = JSON.parse(res.data[i].jobLabels);
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
          that.setData({
            goodJob: goodJob1
          })
        }
        //console.info("优职推荐结束")
      }
    })
    //优职推荐end

    //首页导航栏start
    wx.request({
      url: app.globalData.appUrl + 'WXHomeNavigation/findHomeNavigationList',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
          console.info("首页导航栏开始")
          console.info(res.data)
        if (res.data.length > 0) {
          var homeNavigation = that.data.homeNavigation;
          for (var i = 0; i < res.data.length; i++) {
            // res.data[i].labelName = JSON.parse(res.data[i].labelName);
            homeNavigation.push(res.data[i]);
            }
          }
          that.setData({
            homeNavigation: homeNavigation
          })
        console.info(homeNavigation)
        console.info("首页导航栏结束")
      }
    })
    //首页导航栏end

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
    // console.info("哈哈哈哈哈哈哈哈哈哈")
    // if (this.data.scene != '') {
    //   console.info("****************")
    //   wx.navigateTo({
    //     url: '/pages/postdetails/postdetails' + '?CompanyJobId=' + this.data.scene
    //   })
    // }
    // console.info("哈哈哈哈哈哈哈哈哈哈")
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
    wx.reLaunch({
        url: '/pages/index/index'
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("..")
    var that = this
    that.setData({
      showLoading: false
    })
    selectTypePage(that)
  },


  // onPageScroll: function(e) {
  //   console.log(e); //{scrollTop:99}
  //   if (e.scrollTop >= 565) {
  //     this.setData({
  //       post: 'fixed',
  //       juli: '140'
  //     })
  //   } else {
  //     this.setData({
  //       post: 'relative',
  //       juli: '0',
  //     })
  //   }
    // else if (this.data.gao != 0) {
    //   this.setData({
    //     post: 'fixed',
    //     juli: '0',
    //   })
    // }
    // gao: 0,
    //   // post: "relative",
    //   diyige: "true",
    //     disi: "true",
    //       dier: "true",
    //         disan: "true"
  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      imageUrl: app.globalData.homeImg

    }
  },


  //岗位详情
  jobDetails: function (e) {
    var companyJobId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/postdetails/postdetails?CompanyJobId=' + companyJobId,
    })
  },
  
  //换一批事件start
  changeJob: function(e) {
    console.info("换一批事件开始")
    console.info(e)
    var that=this;
    wx.request({
      url: app.globalData.appUrl + 'WXCompanyJob/findTwoCompanyJob',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        // console.info("下面是优职推荐数据：")
        // console.info(res.data[0].jobLabels)
        // console.info(res.data[1].jobLabels)
        that.data.goodJob = [];
        that.setData({
          goodJob: that.data.goodJob
        })
        if (res.data.length > 0) {
          var goodJob1 = that.data.goodJob;
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].jobLabels = JSON.parse(res.data[i].jobLabels)
            // console.info((res.data[i].jobLabels).length)
            if ((res.data[i].jobLabels).length <=1) {
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
  //换一批事件end
  
  //获取当前swiper的current，修改swiper指示点
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  // 头部4个分类跳转
  fanli: function(e) {
    var that = this;
    console.info("导航栏点击事件开始")
    console.info(e.currentTarget.dataset.index);
    // console.info(that.data.homeNavigation)
    var index = e.currentTarget.dataset.index;
    console.info(that.data.homeNavigation[index].labelName);
    var homeNavigation = that.data.homeNavigation[index];
    app.globalData.homeNavigation = homeNavigation
    var labelName = that.data.homeNavigation[index].labelName;

    wx.navigateTo({
      url: '/pages/bendi/bendi?key=' + labelName
    })
    console.info("导航栏点击事件结束")
  },
  // zuixin: function() {
  //   wx.navigateTo({
  //     url: '/pages/bendi/bendi?key=jrzx'
  //   })
  // },
  // bendi: function() {
  //   wx.navigateTo({
  //     url: '/pages/bendi/bendi?key=bdzp'
  //   })
  // },
  // mingqi: function() {
  //   wx.navigateTo({
  //     url: '/pages/bendi/bendi?key=mqzp'
  //   })
  // },
  mendian: function(){
    wx.navigateTo({
      url: '/pages/mendian/mendian',
    })
  },
  returnfee: function() {
    wx.navigateTo({
      url: '/pages/returnfee/returnfee',
    })
  },
  // 头部4个分类跳转
  sanlei: function(e) {
    var that = this;

    // tophead距离顶部的值
    var clienty = e.touches[0].clientY;

    // console.log(this.data.diyige)
    if (this.data.curren == 0 && this.data.diyige == "true") {
      var ww = setInterval(function() {
        clienty -= 10;
        that.setData({
          tophead: clienty,
          post: "fixed"
        })
        if (that.data.tophead <= 0) {
          clearInterval(ww)
          that.setData({
            tophead: 0,
            post: "fixed"
          })
        }
      }, 1)

      var gaodu = 0;
      setTimeout(function() {
        var ss = setInterval(function() {
          // console.log(gaodu)
          if (that.data.tophead == 0) {
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
              disi: "true",
            })
            if (gaodu > 500) {
              clearInterval(ss);
            }
          }
        }, 10)
      }, 1)
    } else if (this.data.curren != 0 && this.data.diyige == "true") {
      var ww = setInterval(function() {
        clienty -= 10;
        that.setData({
          tophead: clienty,
          post: "fixed"
        })
        if (that.data.tophead <= 0) {
          clearInterval(ww)
          that.setData({
            tophead: 0,
            post: "fixed"
          })
        }
      }, 1)
      var that = this;
      var gaodu = 0;
      // setTimeout(function () {
      var ss = setInterval(function() {
        // console.log(gaodu)
        if (that.data.tophead == 0) {
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
            disi: "true",
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }
      }, 10)
      // }, 300)
    }
  },

  sanprice: function(e) {

    // wx.pageScrollTo({
    //   scrollTop: 560
    // })
    var that = this;
    var clienty = e.touches[0].clientY;
    // console.log(clienty)


    if (this.data.curren != 1 && this.data.dier == "true") {
      var ww = setInterval(function() {
        clienty -= 10;
        that.setData({
          tophead: clienty,
          post: "fixed"
        })
        if (that.data.tophead <= 0) {
          clearInterval(ww)
          that.setData({
            tophead: 0,
            post: "fixed"
          })
        }
      }, 1)

      var gaodu = 0;
      // setTimeout(function () {
      var ss = setInterval(function() {
        if (that.data.tophead == 0) {
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
            disi: "true",
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }
      }, 10)
      // }, 300)
    } else if (this.data.curren == 1 && this.data.dier == "true") {
      var ww = setInterval(function() {
        clienty -= 10;
        that.setData({
          tophead: clienty,
          post: "fixed"
        })
        if (that.data.tophead <= 0) {
          clearInterval(ww)
          that.setData({
            tophead: 0,
            post: "fixed"
          })
        }
      }, 1)

      var gaodu = 0;
      // setTimeout(function () {
      var ss = setInterval(function() {
        if (that.data.tophead == 0) {
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
            disi: "true",
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }
      }, 10)
      // }, 300)
    }
  },

  sanzong: function(e) {

    // wx.pageScrollTo({
    //   scrollTop: 560
    // })
    var that = this;
    var clienty = e.touches[0].clientY;

    if (this.data.curren != 2 && this.data.disan == "true") {
      var ww = setInterval(function() {
        clienty -= 10;
        that.setData({
          tophead: clienty,
          post: "fixed"
        })
        if (that.data.tophead <= 0) {
          clearInterval(ww)
          that.setData({
            tophead: 0,
            post: "fixed"
          })
        }
      }, 1)
      // var that = this;
      var gaodu = 0;
      // setTimeout(function () {
      var ss = setInterval(function() {
        if (that.data.tophead == 0) {
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
            disi: "true",
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }
      }, 10)
      // }, 300)
    } else if (this.data.curren == 2 && this.data.disan == "true") {
      var ww = setInterval(function() {
        clienty -= 10;
        that.setData({
          tophead: clienty,
          post: "fixed"
        })
        if (that.data.tophead <= 0) {
          clearInterval(ww)
          that.setData({
            tophead: 0,
            post: "fixed"
          })
        }
      }, 1)
      // var that = this;
      var gaodu = 0;
      // setTimeout(function () {
      var ss = setInterval(function() {
        if (that.data.tophead == 0) {
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
            disi: "true",
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }
      }, 10)
      // }, 300)
    }
  },
  sanshai: function(e) {

    var that = this;
    var clienty = e.touches[0].clientY;
    if (this.data.curren != 3 && this.data.disi == "true") {
      var ww = setInterval(function() {
        clienty -= 10;
        that.setData({
          tophead: clienty,
          post: "fixed"
        })
        if (that.data.tophead <= 0) {
          clearInterval(ww)
          that.setData({
            tophead: 0,
            post: "fixed"
          })
        }
      }, 1)
      // var that = this;
      var gaodu = 0;
      // setTimeout(function () {
      var ss = setInterval(function() {
        if (that.data.tophead == 0) {
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
            disi: "false",
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }
      }, 10)
      // }, 300)
    } else if (this.data.curren == 3 && this.data.disi == "true") {
      var ww = setInterval(function() {
        clienty -= 10;
        that.setData({
          tophead: 0,
          post: "fixed"
        })
        if (that.data.tophead <= 0) {
          clearInterval(ww)
          that.setData({
            tophead: 0,
            post: "fixed"
          })
        }
      }, 1)
      // var that = this;
      var gaodu = 0;
      // setTimeout(function () {
      var ss = setInterval(function() {
        if (that.data.tophead == 0) {
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
            disi: "false",
          })
          if (gaodu > 500) {
            clearInterval(ss);
          }
        }
      }, 10)
      // }, 300)
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
      console.log(selectsx)
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
  //类型选择
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
  //返现选择
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
    // console.log(this.data.jine[index].state)
    // if (this.data.jine[index].state == 1) {
    //   this.data.jine[index].state = 0;
    // }
    // else if (this.data.jine[index].state == 0) {
    //   this.data.jine[index].state = 1;
    //   // console.log(0)
    // }
    // this.setData({
    //   jine: this.data.jine
    // })
  },
  //综合选择
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
  //筛选选择
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
  // 填写报名信息显示和隐藏
  dcancel: function() {
    this.setData({
      dcancel: "none"
    })
  },
  dconfirm: function() {
    this.setData({
      dcancel: "none"
    })
    wx.navigateTo({
      // 跳转到报名表
      url: '/pages/baoming/baoming',
    })
  },
  xiangqing: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/postdetails/postdetails?CompanyJobId=' + e.currentTarget.dataset.id,
    })
  },
  huidaotop: function() {
    console.log(this.data.gao)
    if (this.data.gao == 0) {
      wx.pageScrollTo({
        scrollTop: 565
      })
      this.setData({
        abba: 565
      })
    }
    this.setData({
      post: 'fixed',
      juli: '100'
    })
  },
  bindscro: function(e) {
    if (e.detail.scrollTop >= 565) {
      this.setData({
        post: 'fixed',
        juli: '100'
      })
    } else {
      this.setData({
        post: 'relative',
        juli: '-17',
      })
    }
  },
  //下拉刷新
  lower: function() {
    // console.log("..")
    // var that = this
    // that.setData({
    //   showLoading: false
    // })
    // selectTypePage(that)
  },

  //上拉刷新
  up:function(){
   
    // setTimeout(function(){
    //   wx.reLaunch({
    //     url: '/pages/index/index'
    //   })
    // },1000)
    
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
    }
  },
  //
  shopDetails(e){
   console.log(e,e.currentTarget.dataset.id);
   wx.navigateTo({
     url: '/pages/postdetails/postdetails?CompanyJobId=' + e.currentTarget.dataset.id,
   })
  }
})