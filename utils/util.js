var QQMapWX = require('qqmap-wx-jssdk');

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//获取地理位置信息
function getLocationDetails(that) {
  //获取地理位置
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
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
        console.log(res)
        //获取地址位置
        that.setData({
          address: res.result.address
        });
          console.log(res)

        var province = res.result.address_component.province
        var city = res.result.address_component.city
        var district = res.result.address_component.district
        console.log( city + district)
   
        wx.setStorageSync('companyAddress', city + "," + district );
        that.setData({
          city: city,
          district: district      
        });


        // that.globalData.cityNow = city
        //获取数据更新页面
      }
    });
    }
  })
}

module.exports = {
  formatTime: formatTime,
  getLocationDetails: getLocationDetails,
  wxPromisify: wxPromisify
}
