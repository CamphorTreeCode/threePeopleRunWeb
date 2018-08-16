var util = require('util')
var QQMapWX = require('qqmap-wx-jssdk');

var province = ""
var city = ""
var login = util.wxPromisify(wx.login)
var showModal = util.wxPromisify(wx.showModal)
var openSetting = util.wxPromisify(wx.openSetting)
var getLocation = util.wxPromisify(wx.getLocation)
var getSetting = util.wxPromisify(wx.getSetting)
var authorize = util.wxPromisify(wx.authorize)



//检查用户地理位置信息
function getLocationCheck(that) {
  //获取地理位置

  return new Promise((resolve, reject) => { 
    getSetting({}).then(function (res) {

    console.log(res)
    if (!res.authSetting['scope.userLocation']) {
      authorize({
        scope: 'scope.userLocation',
      }).then(function (res) {
        wx.setStorageSync('isShow', true); 
        console.log("//", res)   
        getLocationDetails(that,resolve)
      }).catch(function (res) {
        //沒有授权true
      //  locationModel(that, resolve)   
        wx.setStorageSync('isShow', false); 
        console.log("catch", res)   
        resolve()
      })
    } else {
      wx.setStorageSync('isShow', true); 
      getLocationDetails(that, resolve)
      console.log("else", res)     
    }

  })

  })
}


//弹出模态弹框
function locationModel(that, resolve) {

  // 显示提示弹窗
  return showModal({
    title: '提示',
    content: '需要获取你的"地理位置"授权才能正常使用',
  }).then(function (res) {

    if (res.confirm) {
      console.log('用户点击确定')
      openSetting({}).then(function (res) {
        if (res) {
          if (res.authSetting["scope.userLocation"] == true) {
            getLocationDetails(that, resolve)
          }
        }
      }).catch(function (res) {

        console.info("设置失败返回数据", res);
      })

    } else if (res.cancel) {

    }
  })

}
//获取地理位置信息
function getLocationDetails(that , resolve) {
  //获取地理位置
  getLocation({
    type: 'wgs84',
  }).then(function (res) {

    var latitude = res.latitude
    var longitude = res.longitude
    // 调用腾讯地图的接口查询当前位置
    var demo = new QQMapWX({
      key: 'RDVBZ-KSAWD-CJV4T-HZM3X-SKQVK-IBB4P' // 必填
    });

    demo.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
       var  province = res.result.address_component.province
        var district = res.result.address_component.district
        city = res.result.address_component.city     
        resolve(city + "," + district)

        // that.globalData.cityNow = city
        //获取数据更新页面
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });

  })


}
module.exports = {
  getLocationCheck: getLocationCheck
}
