
var authorizationCheck = require('../authorizationCheck');
Component({
  options: { 
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表 
   * 用于组件自定义设置
   */
  properties: {
    // 弹窗标题
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '需要获取你的“地理位置"授权才能正常使用”'
    },
    // 弹窗取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    },
    isShow:{
      type:String,
      value:""
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    isShow: true,
    paramAtoB: ''
  },
  ready: function () {
    // authorizationCheck.getLocationCheck(this).then(function (result) {
    //   console.log(result,"组件...")
    // })
    // var isShow = wx.getStorageSync('isShow')
    // console.log("..isShow", isShow)
    // this.setData({
    //   isShow: isShow
    //   })
    // wx.getSetting({
    //   success: (res) => {
    //     console.log("初始化授权",res);
    //     console.log(res.authSetting['scope.userLocation']);
    //     if (res.authSetting['scope.userLocation'] == undefined && res.authSetting['scope.userLocation'] == true) {//非初始化进入该页 面,且e
    //       console.log("没有授权显示")
    //       this.setData({
    //         isShow: true
    //       })

    //     }else{
    //       console.log("文件")
    //       this.setData({
    //         isShow: false
    //       })
    //     }
        
    //     }
    //    })

  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */

    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
      console.log("....")
      this.hideDialog()
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
      console.log("..11..")
      this.hideDialog()
    }
  }
})
