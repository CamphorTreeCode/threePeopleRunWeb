
var app=getApp();
// pages/returnfee/returnfee.js
var util = require('../../utils/util.js');
var pagesize = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    date: '', //代表自己定义的日期
    dates: "", //显示的日期
    // 工厂信息
    factory: [ 
      {
        name: "常熟新市常熟新市",
        date: "2018-3-23",
        title: [
          { name: "学生" }
        ]
      },  
      {
        name: "【扬州李尔",
        date: "2018-3-23",
        title: [
          { name: "学生" }
        ]
      },
      {
        name: "常熟新市",
        date: "2018-3-23",
        title: [
          { name: "学生" }
        ]
      },
      {
        name: "【扬州李尔",
        date: "2018-3-23",
        title: [
          { name: "学生" }
        ]
      },
      {
        name: "常熟新市",
        date: "2018-3-23",
        title: [
          { name: "学生" }
        ]
      },
      { 
        name: "【扬州李尔",
        date: "2018-3-23",
        title: [
          { name: "学生" }
        ]
      }
    ],
    backFactory:[],
    effectiveDate:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    // 先获取当前日期显示
    // this.data.date = new Date();
    // var ddd = new Date();
    // var myDate = this.data.date.getFullYear() + '-' + (this.data.date.getMonth() + 1) + '-' + this.data.date.getDate()
    
    // var yayay = {
    //   year: ddd.getFullYear(),
    //   month: ddd.getMonth() +1,
    //   day: ddd.getDate()
    // }
    // // 判断月份和日期前面有没有0
    // if ((ddd.getMonth() + 1) <= 9 && ddd.getDate() >= 10) {
    //   var myDate = ddd.getFullYear() + '-' + (ddd.getMonth() + 1) + '-0' + ddd.getDate();
    // }
    // if ((ddd.getMonth() + 1) && ddd.getDate() >= 10) {
    //   var myDate = ddd.getFullYear() + '-0' + (ddd.getMonth() + 1) + '-' + ddd.getDate();
    // }
    // if ((ddd.getMonth() + 1) && ddd.getDate() <= 9) {
    //   var myDate = ddd.getFullYear() + '-0' + (ddd.getMonth() + 1) + '-0' + ddd.getDate();
    // }
    // if ((ddd.getMonth() + 1) >= 10 && ddd.getDate() >= 10) {
    //   var myDate = ddd.getFullYear() + '-' + (ddd.getMonth() + 1) + '-' + ddd.getDate();
    // }
    // // 再通过setData更改Page()里面的data，动态更新页面的数据  
    // this.setData({
    //   dateend: myDate,      
    //   dates: myDate,
    //   date: yayay
    // });
    // this.findAllEffectiveDate()
    //获取系统高度
    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    // console.info("下面是系统高度")
    // console.info(scrollHeight)
    this.setData({
      scrollHeight: scrollHeight
    });
  //返费通知start
    this.findAllEffectiveDate()
     //返费通知end
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
  //  点击日期组件确定事件  
  // bindDateChange: function (e) {

    

    // //根据获取到的日期，进行解析，分别取到 年，月，日,然后赋值给日期数据
    // var arr = e.detail.value.split('-');
    // var er = [''], san = [''];
    // if (arr[1] <= 9) {
    //   er = arr[1].split('0')
    // }
    // if (arr[2] <= 9) {
    //   san = arr[2].split('0')
    // }
    // var ser, ber;
    // if (er.length == 2) {
    //   ser = er[1];
    // } else {
    //   ser = arr[1];
    // }
    // //转化成number类型
    // parseInt(ser);
    // if (san.length == 2) {
    //   ber = san[1]
    // } else {
    //   ber = arr[2]
    // }
    // var yayay = {
    //   year: arr[0],
    //   month: ser,
    //   day: ber 
    // }
    // this.setData({
    //   dates: e.detail.value,
    //   date: yayay,
    //   backFactory:[]
    // }) 
    // pagesize = 0;
    // this.selectBackFactory();
  // },
  chakan: function (e) {
    // var that = this;
    console.log(e)
    var factoryId = e.currentTarget.dataset.id;
    console.log(factoryId)
    // wx.setStorageSync("shijiana", that.data.dates)
    wx.navigateTo({
      url: '/pages/identical/identical?factoryId=' + factoryId,
    })
    
  },
  pageon: function () {
    
    // that.setData({
    //   effectiveDate: data,
    //   dates: data[0]
    // })
    
    var inde= ++(this.data.index);
    var dat = this.data.effectiveDate[inde]


    wx.showNavigationBarLoading();
    this.setData({
      dates: dat //拼接后的日期
    });
    this.data.backFactory = [];
    this.setData({
      backFactory: this.data.backFactory
    })

    pagesize = 0;
    this.selectBackFactory();

    // var datea = this.data.date;
    // var monthDaySize;
    // if (datea.day == 1){
    //   datea.month--;
    // }
    // if (datea.month == 1 || datea.month == 3 || datea.month == 5 || datea.month == 7 || datea.month == 8 || datea.month == 10 || datea.month == 12)     {
    //   monthDaySize = 31;
    // } else if (datea.month == 4 || datea.month == 6 || datea.month == 9 || datea.month == 11) {
    //   monthDaySize = 30;
    // } else if (datea.month == 2) {
    //   // 计算是否是闰年,如果是二月份则是29天
    //   if ((datea.year - 2000) % 4 == 0) {
    //     monthDaySize = 29;
    //   } else {
    //     monthDaySize = 28;
    //   }
    // };
    // //判断月份为1，天数为1时，年份减1
    // if (datea.month== 1 && datea.day == 1){
    //   datea.month = 13;
    //   datea.year--; 
    // }
    // //判断天数为1，月份减1，天数回到本月最大
    // if (datea.day == 1) {
    //   datea.day = monthDaySize;
      
    //   if (datea.day <= 9 && datea.month >= 10) {
    //     var myDate = datea.year + '-' + (datea.month) + '-0' + datea.day;
    //   }
    //   if (datea.month <= 9 && datea.day >= 10) {
    //     var myDate = datea.year + '-0' + (datea.month) + '-' + datea.day;
    //   }
    //   if (datea.month <= 9 && datea.day <= 9) {
    //     var myDate = datea.year + '-0' + (datea.month) + '-0' + datea.day;
    //   }
    //   if (datea.month >= 10 && datea.day >= 10) {
    //     var myDate = datea.year + '-' + (datea.month) + '-' + datea.day;
    //   }

    // } else {
    //   datea.day--;
    //   if (datea.day <= 9 && datea.month >= 10) {
    //     var myDate = datea.year + '-' + (datea.month) + '-0' + datea.day;
    //   }
    //   if (datea.month <= 9 && datea.day >= 10) {
    //     var myDate = datea.year + '-0' + (datea.month) + '-' + datea.day;
    //   }
    //   if (datea.month <= 9 && datea.day <= 9) {
    //     var myDate = datea.year + '-0' + (datea.month) + '-0' + datea.day;
    //   }
    //   if (datea.month >= 10 && datea.day >= 10) {
    //     var myDate = datea.year + '-' + (datea.month) + '-' + datea.day;
    //   }
    // }


  },
  pageup: function () {
    wx.showNavigationBarLoading()
  //   var datea = this.data.date;
  //   // 根据月份来判断当前对应月份的天数
  //   var monthDaySize;
  //   if (datea.month == 1 || datea.month == 3 || datea.month == 5 || datea.month == 7 || datea.month == 8 || datea.month == 10 || datea.month == 12)     {
  //     monthDaySize = 31;
  //   } else if (datea.month == 4 || datea.month == 6 || datea.month == 9 || datea.month == 11) {
  //     monthDaySize = 30;
  //   } else if (datea.month == 2) {
  //     // 计算是否是闰年,如果是二月份则是29天
  //     if ((datea.year - 2000) % 4 == 0) {
  //       monthDaySize = 29;
  //     } else {
  //       monthDaySize = 28;
  //     }
  //   };
    
  //  //判断月份为12，天数为最大时，年份加1
  //   if (datea.month == 12 && datea.day == monthDaySize) {
  //     datea.month = 0;
  //     datea.year++;
  //   }
  //   // 获取当前系统日期来判断，不能超过当前日期
  //   var ddd = new Date();
  //   var ss = ddd.getMonth() + 1;
  //   var aa = ddd.getDate();
  //   var yy=ddd.getFullYear();
  //   if (datea.month >= ss && datea.day >= aa && datea.year >=yy) {
  //     return false
  //   }
  // //判断天数为本月最大，月份加1，天数回到1
  //   if (datea.day == monthDaySize) {
  //     datea.day = 1;
  //     datea.month++;
  //     if (datea.day <= 9 && datea.month >= 10) {
  //       var myDate = datea.year + '-' + (datea.month) + '-0' + datea.day;
  //     }
  //     if (datea.month <= 9 && datea.day >= 10) {
  //       var myDate = datea.year + '-0' + (datea.month) + '-' + datea.day;
  //     }
  //     if (datea.month <= 9 && datea.day <= 9) {
  //       var myDate = datea.year + '-0' + (datea.month) + '-0' + datea.day;
  //     }
  //     if (datea.month >= 10 && datea.day >= 10) {
  //       var myDate = datea.year + '-' + (datea.month) + '-' + datea.day;
  //     }

  //   } else { 
  //     datea.day++;
  //     if (datea.day <= 9 && datea.month >= 10) {
  //       var myDate = datea.year + '-' + (datea.month) + '-0' + datea.day;
  //     }
  //     if (datea.month <= 9 && datea.day >= 10) {
  //       var myDate = datea.year + '-0' + (datea.month) + '-' + datea.day;
  //     }
  //     if (datea.month <= 9 && datea.day <= 9) {
  //       var myDate = datea.year + '-0' + (datea.month) + '-0' + datea.day;
  //     }
  //     if (datea.month >= 10 && datea.day >= 10) {
  //       var myDate = datea.year + '-' + (datea.month) + '-' + datea.day;
  //     }
  //   }

    if(this.data.index == 0){
      return false;
    }


    this.data.backFactory = [];
    this.setData({
      backFactory: this.data.backFactory
    })


  
    var inde = --(this.data.index);
    var dat = this.data.effectiveDate[inde]


    wx.showNavigationBarLoading();
    this.setData({
      dates: dat //拼接后的日期
    });
    pagesize = 0;
    this.selectBackFactory();

  },
    dateTime:function(){
    // 判断月份和日期前面有没有0
    var that=this;
    if(that.data.date.month <= 9 && that.data.date.day >= 10) {
      var shijian = that.data.date.year + "-0" + that.data.date.month + "-" + that.data.date.day
    }
  if (that.data.date.month >= 10 && that.data.date.day <= 9) {
      var shijian = that.data.date.year + "-" + that.data.date.month + "-0" + that.data.date.day
    }
  if (that.data.date.month <= 9 && that.data.date.day <= 9) {
      var shijian = that.data.date.year + "-0" + that.data.date.month + "-0" + that.data.date.day
    }
    // console.info("下面是获取时间")
    // console.info(that.data.date);
    return shijian;
  },
  
  //返费通知start
  selectBackFactory:function (that) {
    this.data.backFactory = []
    this.setData({
      backFactory: this.data.backFactory
    })

    var that=this;
    // var shijian1=this.dateTime();
    var shijian1 = that.data.dates;
    console.info("下面是返费工厂入职时间的信息：")
    console.info(shijian1);
    console.info(pagesize)
    wx.request({
      url: app.globalData.appUrl + 'WXBackFactory/selectBackFactoryPage',
      data: {
        entryTime: shijian1,
        // currentPage: ++pagesize
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      method: 'get',
      success: function (res) {
        that.setData({
          datastart: shijian1
        })
        // console.log()
        console.info("下面是返费工厂列表的信息：")
        console.log(res)
        console.info(pagesize)
        if (res.data.length > 0) {
          var backFactory = that.data.backFactory;
         var  backFactory1 = res.data
          for (var x = 0; x < backFactory1.length; x++) {
            backFactory1[x].labels = JSON.parse(backFactory1[x].labels)
            backFactory.push(backFactory1[x])
          }
          that.setData({
            backFactory: backFactory,
            showLoading: true,
          })
          console.log(backFactory)
          wx.hideNavigationBarLoading()
        } else {
          that.setData({
            //pagesize:page,
            bottomText: false,
            showLoading: true,
          })
          wx.hideNavigationBarLoading()

        }
      }
    })
  },
  //返费通知end

  //下拉刷新功能
  // lower() {
  //   wx.showNavigationBarLoading()
  //   console.log("下拉刷新")
  //   var that = this
  //   this.setData({
  //     showLoading: false
  //   })
  //   that.selectBackFactory(that)
  // },
  shouye:function(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  findAllEffectiveDate:function(){  
    this.data.effectiveDate = []
    this.setData({
      effectiveDate: this.data.effectiveDate
    })
    
    var that = this;
    wx.request({
      url: app.globalData.appUrl + 'WXBackFactory/findAllEffectiveDate',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      method: 'get',
      success: function (res) {
        console.info(res)
        that.setData({
        })
        // console.log()
        console.info("下面是返费通知时间列表的信息：")
        console.log(res)
        console.info(res.data[0].effectiveDate)
        var datatime = res.data;
        var data=[];
        for (var x = 0; x < datatime.length;x++){
          var dat= datatime[x].effectiveDate.split(" ");
          data.push(dat[0])
        }
        console.log(data);
        //  if (res.data[0].length > 0) {
           
        //  } 
        
        that.setData({
          effectiveDate: data,
            dates: data[0]
        })

        pagesize = 0;
        that.selectBackFactory();
      }
    })
  }

})
