// pages/bendi/bendi.js
var app =getApp();
var util = require('../../utils/util')
var authorizationCheck = require('../../utils/authorizationCheck');
var pagesize = 0;
function selectTypePage(that) {
  console.log("21",wx.getStorageSync('companyAddress'))
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
      key:that.data.key
    },
    header: {
      // 'content-type': 'application/x-www-form-urlencoded' // 默认值
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      xcxuser_name: "xcxuser_name"
    },
    method: 'POST',
    success: function (res) {
      console.log("下面是条件查询列表数据：")
      console.log(res)
      if (res.data[0].lists.length > 0) {
        var shopList = that.data.shopList
        for (var i = 0; i < res.data[0].lists.length; i++) {
          res.data[0].lists[i].jobLabels = JSON.parse(res.data[0].lists[i].jobLabels)
          res.data[0].lists[i].jobSwiperImages = JSON.parse(res.data[0].lists[i].jobSwiperImages)
          shopList.push(res.data[0].lists[i])
        }
        console.info(res.data[0].lists, shopList)
        that.setData({
          shopList,
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
    pricex:-1,//返现金额选择
    selectsx:-1,//筛选的选择
    diyige: "true",
    dier: "true",
    disan: "true",
    disi: "true",
    post: "relative",
    leixing: [
      { name: "普工", state: 0 },
      { name: "包装工", state: 0 },
      { name: "质检员", state: 0 },
      { name: "仓库员", state: 0 },
      { name: "电工", state: 0 },
      { name: "叉车/铲车", state: 0 }
    ],
    xingbie: [
      { name: "全部", state: 0 },
      { name: "男可做", state: 0 },
      { name: "女可做", state: 0 }
    ],
    jine: [
      { name: "1000-2000", state: 0 },
      { name: "2000-3000", state: 0 },
      { name: "3000-4000", state: 0 },
      { name: "4000以上", state: 0 }
    ],
    hezong: [
      { name: "最新发布", state: 1 },
      { name: "离我最近", state: 0 }
    ],
    xuanze: "a",
    curren: "",
    gao: 0,
    xianshi: "none",
    foterlist: [
      {
        name: "上海胜瑞日铭",
        title: [
          { name: "人气" },
          { name: "返现最高" }
        ],
        fanli: "3400",
        price: "4000-5000/月"
      },
      {
        name: "天下第一仓:菜鸟",
        title: [
          { name: "人气" },
          { name: "返现最高" }
        ],
        fanli: "3700",
        price: "4000-5000/月"
      },
      {
        name: "上海胜瑞日铭",
        title: [
          { name: "人气" },
          { name: "返现最高" }
        ],
        fanli: "3400",
        price: "4000-5000/月"
      },
      {
        name: "天下第一仓:菜鸟",
        title: [
          { name: "人气" },
          { name: "返现最高" }
        ],
        fanli: "3700",
        price: "4000-5000/月"
      },
      {
        name: "上海胜瑞日铭",
        title: [
          { name: "人气" },
          { name: "返现最高" }
        ],
        fanli: "3400",
        price: "4000-5000/月"
      },
      {
        name: "天下第一仓:菜鸟",
        title: [
          { name: "人气" },
          { name: "返现最高" }
        ],
        fanli: "3700",
        price: "4000-5000/月"
      },
      {
        name: "上海胜瑞日铭",
        title: [
          { name: "人气" },
          { name: "返现最高" }
        ],
        fanli: "3400",
        price: "4000-5000/月"
      },
      {
        name: "天下第一仓:菜鸟",
        title: [
          { name: "人气" },
          { name: "返现最高" }
        ],
        fanli: "3700",
        price: "4000-5000/月"
      }
    ],
    shopList:[],
    //选择的类型
    jobCategoryId:[],
    showData: true,
    bottomText: true,
    //返费
    returnMoney:null,
    //选择的性别
    jobRecruitsGender:null,
    //工资最小值
    jobSalaryMin:null,
    //工资最大值
    jobSalaryMax:null,
    //当前的地址
    companyAddress:null,
    //最新时间排序
    createTimes:"true",
    //根据企业名称查询
    companyName: null,
    //功能查询
    key:null,
    //地理位置授权
    isShow:'true'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取所有分类的方法 start
   wx.request({
      url: app.globalData.appUrl + 'WXJobCategory/selectJobCategoryType',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info(res);
        that.setData({
          leixing: res.data
        })

      }
    })
    //获取所有分类的方法 end
    //设置样式属性  start
    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      scrollHeight: scrollHeight,
      key: key
    });


    var ss = 0;
    wx.getSystemInfo({
      success: function (res) {
        ss = res.screenHeight;
      },
    })
    this.setData({
      clientY: ss
    })
    //设置样式属性  end

    //接收首页参数  start
    var key =options.key
    console.info(app.globalData.homeNavigation)
    console.info(options)
    console.log(key)
    if (key=="gfl"){
     var hezong = this.data.hezong
             hezong[0].state=0
      this.setData({
        hezong: hezong,
        createTimes:null,
        key:key
      })
      wx.setNavigationBarTitle({
        title: "高返费",
        success: function (res) { }

      })
    }
    else if (key == "jrzx"){
   this.setData({
     key: key
   })
   wx.setNavigationBarTitle({
     title: "今日最新",
     success: function (res) { }
   })
    }else if(key=="bdzp"){
      //获取地理位置
      wx.setNavigationBarTitle({
        title: "本地招聘",
        success: function (res) { }
      })
      console.log(key)

      var hezong = this.data.hezong
      hezong[1].state =1
      this.setData({
        hezong: hezong,
        key: key
      })
      //初始化显示
      // var isShow = wx.getStorageSync('isShow');
      // that.setData({
      //   isShow: isShow != null || isShow != '' ? "trues" : ""
      // })
      //获取地理位置
      authorizationCheck.getLocationCheck(this).then(function (result) {
        console.info("我的地理位置是")
        console.log(result)
        var isShow = wx.getStorageSync('isShow');
        that.setData({
          companyAddress: result,
          isShow: isShow != false?"true":""
        })
   
        console.log(isShow,"显示还是不显示")
        pagesize = 0;
        selectTypePage(that)
      })
      return;
    } else if (key == app.globalData.homeNavigation.labelName){
      wx.setNavigationBarTitle({
        title: app.globalData.homeNavigation.homeNavigationName,
        success: function (res) { }
      })
      this.setData({
        key: key
      })
    }
    //接收首页参数  end
    //获取商品数据 start 
    pagesize = 0;
    selectTypePage(that)
    //获取商品数据 end

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  //获取所有分类http://localhost/ZhangJie/WXJobCategory/selectJobCategoryType
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 console.log("文件")
 var that = this
 if (that.data.key == 'bdzp' && that.data.isShow==""){
   authorizationCheck.getLocationCheck(that).then(function (result) {
     console.log(result,"///")
     var isShow = wx.getStorageSync('isShow');
     that.setData({
       companyAddress: result,
       isShow: isShow != false ? "true" : "",
       shopList:[]
     })

     console.log(isShow, "显示还是不显示")
     pagesize = 0;
     selectTypePage(that)
   })
   return;
 } else if (that.data.hezong[1].state == 1 && that.data.isShow == ""){
   authorizationCheck.getLocationCheck(that).then(function (result) {
     console.log(result, "///")
     var isShow = wx.getStorageSync('isShow');
     that.setData({
       companyAddress: result,
       isShow: isShow != false ? "true" : "",
       shopList: []
     })

     console.log(isShow, "显示还是不显示")
     pagesize = 0;
     selectTypePage(that)
   })
   return;
 }
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
  sanlei: function () {

    // if(this.data.curren!=0){
    var that = this;
    var gaodu = 0;
    if (this.data.curren == 0 && this.data.diyige == "true") {
      var ss = setInterval(function () {
        // console.log(gaodu)
        gaodu += 40;
        that.setData({
          xuanze: 0,
          curren: 0,
          gao: gaodu,
          xianshi: "block",
          post: "fixed",
          diyige: "false",
          disi: "true",
          dier: "true",
          disan: "true"
        })
        if (gaodu > 500) {
          clearInterval(ss);
        }
      }, 10)
      
    } else if (this.data.curren != 0 && this.data.diyige == "true") {
      var ss = setInterval(function () {
        // console.log(gaodu)
        gaodu += 40;
        that.setData({
          xuanze: 0,
          curren: 0,
          gao: gaodu,
          xianshi: "block",
          post: "fixed",
          diyige: "false",
          disi: "true",
          dier: "true",
          disan: "true"
        })
        if (gaodu > 500) {
          clearInterval(ss);
        }
      }, 10)

    }

  },
  sanprice: function () {

    // if(this.data.curren!=1){
    var that = this;
    var gaodu = 0;
    if (this.data.curren == 1 && this.data.dier == "true") {
      var ss = setInterval(function () {
        // console.log(gaodu)
        gaodu += 40;
        that.setData({
          xuanze: 1,
          curren: 1,
          gao: gaodu,
          xianshi: "block",
          post: "fixed",
          diyige: "true",
          disi: "true",
          dier: "false",
          disan: "true"
        })
        if (gaodu > 500) {
          clearInterval(ss);
        }
      }, 10)
    } else if (this.data.curren != 1 && this.data.dier == "true") {
      var ss = setInterval(function () {
        // console.log(gaodu)
        gaodu += 40;
        that.setData({
          xuanze: 1,
          curren: 1,
          gao: gaodu,
          xianshi: "block",
          post: "fixed",
          diyige: "true",
          disi: "true",
          dier: "false",
          disan: "true"
        })
        if (gaodu > 500) {
          clearInterval(ss);
        }
      }, 10)
    }
  },
  sanzong: function () {

    // if (this.data.curren!=2){
    var that = this;
    var gaodu = 0;
    if (this.data.curren == 2 && this.data.disan == "true") {
      var ss = setInterval( function () {
        // console.log(gaodu)
        gaodu += 40;
        that.setData({
          xuanze: 2,
          curren: 2,
          gao: gaodu,
          xianshi: "block",
          post: "fixed",
          diyige: "true",
          disi: "true",
          dier: "true",
          disan: "false"
        })
        if (gaodu > 500) {
          clearInterval(ss);
        }
      }, 10)

    } else if (this.data.curren != 2 && this.data.disan == "true") {
      var ss = setInterval(function () {
        // console.log(gaodu)
        gaodu += 40;
        that.setData({
          xuanze: 2,
          curren: 2,
          gao: gaodu,
          xianshi: "block",
          post: "fixed",
          diyige: "true",
          disi: "true",
          dier: "true",
          disan: "false"
        })
        if (gaodu > 500) {
          clearInterval(ss);
        }
      }, 10)

    }
  },
  sanshai: function () {

    // if (this.data.curren!=3){
    var that = this;
    var gaodu = 0;
    if (this.data.curren == 3 && this.data.disi == "true") {
      var ss = setInterval(function () {
        // console.log(gaodu)
        gaodu += 40;
        that.setData({
          xuanze: 3,
          curren: 3,
          gao: gaodu,
          xianshi: "block",
          post: "fixed",
          diyige: "true",
          disi: "false",
          dier: "true",
          disan: "true"
        })
        if (gaodu > 500) {
          clearInterval(ss);
        }
      }, 10)

    } else if (this.data.curren != 3 && this.data.disi == "true") {
      var ss = setInterval(function () {
        // console.log(gaodu)
        gaodu += 40;
        that.setData({
          xuanze: 3,
          curren: 3,
          gao: gaodu,
          xianshi: "block",
          post: "fixed",
          diyige: "true",
          disi: "false",
          dier: "true",
          disan: "true"
        })
        if (gaodu > 500) {
          clearInterval(ss);
        }
      }, 10)
    }
  },
  gaibain: function (e) {
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
  btn: function (e) {
    var that = this
    var index = e.currentTarget.dataset.in;
    //类型选择
    if (index =="leixing"){
      var jobCategoryId=[]
      var leixing = that.data.leixing
      for (var i = 0; i < leixing.length;i++){
        if (leixing[i].state==1){
          jobCategoryId.push(that.data.leixing[i].jobCategoryId)
        }
       
      }
      if (jobCategoryId.length>0){
        that.setData({
          jobCategoryId,
          shopList:[]
        })
       pagesize = 0
       selectTypePage(that)
      
}   
//全取消的恢复空条件查询
else{
        that.setData({
          jobCategoryId:[],
          shopList: []
        })
        pagesize = 0
        selectTypePage(that)
} 
    }
    //返现金额选择
    else if (index =="jine"){
      var returnMoney = [];
      var jine = that.data.jine
      if (that.data.pricex!=-1){
        console.log("进来了")
        console.log(that.data.jine[that.data.pricex].name)
        if (that.data.jine[that.data.pricex].name=="4000以上"){
          that.data.jine[that.data.pricex].name="4000-"
        }
        that.setData({
          returnMoney: that.data.jine[that.data.pricex].name,
          shopList: [],
          
        })
        pagesize = 0
        selectTypePage(that)

      }else{
        that.setData({
          returnMoney: null,
          shopList: [],

        })
        pagesize = 0
        selectTypePage(that)
      }
  
    }
    //综合排序
    else if (index=="address"){
      // city + district
      var hezong = that.data.hezong
   
      if (hezong[1].state == 1){

        if (hezong[0].state == 0) {
          that.setData({
            createTimes: null          
          })
      
        }else{
          that.setData({
            createTimes: "true",
          })
        }
    
          
          that.setData({
            shopList:[],
            city:null,
            district:null
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
    else if (index =="saixuan"){
      if (that.data.jobSalaryMin != null && that.data.jobSalaryMax==null){
        wx.showToast({
          title: '请填写工资最大值',
          icon: 'none',
          duration: 1500
        })
        return
      } else if (that.data.jobSalaryMin == null && that.data.jobSalaryMax != null){
        wx.showToast({
          title: '请填写工资最小值',
          icon: 'none',
          duration: 1500
        })
        return
      }
      var selectsx = that.data.selectsx
      if (selectsx != -1 && selectsx!=0){
        that.setData({
          jobRecruitsGender: selectsx-1,
          shopList: [],
        })
        pagesize = 0
        selectTypePage(that)
      }else{
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
  textdianji: function (e) {
    var that = this
    var index = e.currentTarget.dataset.ind;
    console.log(index)
 
    var leixing = that.data.leixing

    if (this.data.leixing[index].state == 1) {
      leixing[index].state = 0;

    }
    else{
      leixing[index].state = 1;
    }
    that.setData({
      leixing: leixing
    })
  },
  //筛选选择
  textdian: function (e) {
    var index = e.currentTarget.dataset.id;
   
    console.log(index, this.data.selectsx)
     if (this.data.selectsx == index) {
       console.log("ss")
       this.setData({
         selectsx: -1
       })
       return false;
     }
     else {
       console.log("xx")
       this.setData({
         selectsx: index
       })
     }
    // console.log(this.data.xingbie[index].state)
    // if (this.data.xingbie[index].state == 1) {
    //   this.data.xingbie[index].state = 0;
    // }
    // else if (this.data.xingbie[index].state == 0) {
    //   this.data.xingbie[index].state = 1;
    // }
    // this.setData({
    //   xingbie: this.data.xingbie
    // })
  },
  //返现选择
  textdiana: function (e) {
    var index = e.currentTarget.dataset.ia;
    console.log(index, this.data.pricex)
    if (this.data.pricex == index) { 
    console.log("ss")
      this.setData({
        pricex:-1
      })
      return false; 
      }
    else {
      console.log("xx")
      this.setData({
        pricex: index
      })
    }
    // console.log(index)
    // console.log(this.data.jine[index].state)
    // var jine = this.data.jine
    // for (var i = 0 ; i<jine.length;i++){

    // }
    // if (jine[index].state == 1) {
    //   this.data.jine[index].state = 0;
    //   // console.log(0)
    // }
    // else if (this.data.jine[index].state == 0) {
    //   this.data.jine[index].state = 1;
      // console.log(0)
    // }
    // this.setData({
    //   jine: this.data.jine
    // })
  },
  textdianb: function (e) {
    var that = this
    console.log("离我最进")
    var index = e.currentTarget.dataset.ib;
     console.log(index)
    console.log(this.data.hezong[index].state)
    if (index==1){
     //点击获取地理位置
     // util.getLocationDetails(this)

    }
    if (this.data.hezong[index].state == 1) {
      this.data.hezong[index].state = 0;
      // console.log(0)
    }
    else if (this.data.hezong[index].state == 0) {
      this.data.hezong[index].state = 1;
      // console.log(0)
      authorizationCheck.getLocationCheck(that).then(function (result) {
        console.log(result,"cc")
        var isShow = wx.getStorageSync('isShow');
        that.setData({
          companyAddress: result,
          isShow: isShow != false ? "true" : "",

        })

        console.log(isShow, "显示还是不显示")

      })
    }
    this.setData({
      hezong: this.data.hezong
    })
  },
  huiqu:function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  //下拉刷新
  lower:function(){
    console.log("..")
    var that = this
    that.setData({
      showLoading: false
    })
    selectTypePage(that)
  },
  //工资输入框
  inputTyping:function(e){
    var id = e.currentTarget.id
    console.log(e, id)
    if (id == "min"){
     this.setData({
       jobSalaryMin: e.detail.value
     })
    }
    else if (id == "max"){
      this.setData({
      jobSalaryMax: e.detail.value
      })
    }
  },
  // 获取地理位置
  getPostion() {
    /*登陆的位置 */
    check.getLocationCheck(this)
  },
  //商品的图片地址
  shopDetails(e) {
    console.log(e, e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/postdetails/postdetails?CompanyJobId=' + e.currentTarget.dataset.id,
    })
  },
  xuanfu:function(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

})