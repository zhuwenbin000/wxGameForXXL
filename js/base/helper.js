export default class helper {
  constructor() {

  }
  static getsetting() {
    return new Promise((reslove, reject) => {
      wx.getSetting({
        success: function (res) {
          var authSetting = res.authSetting
          if (authSetting['scope.userInfo'] === true) {
            // 用户已授权，可以直接调用相关 API
            reslove(1)
          } else if (authSetting['scope.userInfo'] === false) {
            // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
            reslove(2)
          } else {
            // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
            reslove(3)
          }
        }
      })
    })
  }
}

