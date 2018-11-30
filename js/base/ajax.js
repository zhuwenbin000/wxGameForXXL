let apiUrl = 'https://koba-studio.com/kobaserver/service/json';
//发送请求
export function ajax(options) {
  //如果不是login过来就判断登录标志
  if (options.tradecode != 'sys01') {
    let loginflag = wx.getStorageSync('loginflag') //获取登录标志
    let userId = wx.getStorageSync('userId') //获取登录标志
    //如果没有登录标志 重新登录并再次调用  如果有参数拼接loginflag传入
    if (!loginflag) {
      userLogin(options)
      return
    }else{
      //如果是user类型
      if (options.apiType == 'user'){
        if(!options.data || !options.data.user){
          options.data = {
            user: {
              ...options.data,
              loginflag: loginflag,
              userId:userId
            }
          }
        }else{
          options.data = {
            user: {
              ...options.data.user,
              loginflag: loginflag,
              userId:userId
            }
          }
        }
      } else if (options.apiType == 'version') {
        // options.data = {
        //   version: {
        //     ...options.data,
        //     loginflag: loginflag,
        //     userId:userId
        //   }
        // }
        if(!options.data || !options.data.version){
          options.data = {
            version: {
              ...options.data,
              loginflag: loginflag,
              userId:userId
            }
          }
        }else{
          options.data = {
            version: {
              ...options.data,
              loginflag: loginflag,
              userId:userId
            }
          }
        }
      }
      //如果是...
    }
  }
  wx.request({
    url: apiUrl,
    method: options.method,
    data: JSON.stringify({
      "head": {
        "tradecode": options.tradecode,//交易编码，每个接口定义的接口编号
        "traceno": parseInt(Math.random() * 10000000000000) + new Date().getTime(),//请求流水号，前端随机生成 //随机数加当前时间生成
        "channel": "3",//渠道号：1:IOS 2:Android 3:wechart
        "requesttime": new Date().getTime(),//请求时间
        "sign": hex_md5(JSON.stringify(options.data) + "3123").toUpperCase() //签名
      },
      "body": options.data
    }),
    header: {
      'content-type': 'application/json;charset=utf-8' // 默认值
    },
    success(res) {//成功回调
     //console.log(res)
      if (res.data.result.code == '0') {//处理成功
        options.success && options.success(res.data)
      } else if (res.data.result.code == '10010'){//登录超时
        userLogin(options)
      }else{//其他
        wx.showToast({ title: res.data.result.message, icon:'none'})
      }
    },
    fail(res) {//失败回调
      options.fail &&  options.fail(res)
    },
    complete(res) {//完成回调
      options.complete && options.complete(res)
    }
  })
}


// 用户登录
export function userLogin(options) {
  wx.login({
    success: (res) => {
      let login = {
        tradecode: 'sys01',
        method: 'POST',
        data: { "user": { "code": res.code } },
        success(data) {
          if (data.result.code == '0') {//处理成功
            wx.setStorageSync('loginflag', data.body.user.loginflag)
            wx.setStorageSync('userId', data.body.user.userid)
            if (options.tradecode) {
              ajax(options)//再次调用
            }else{
              options.callback()
            }
          }
        }
      }
      ajax(login)
    },
    fail: (res) => {
      wx.showToast({ title: '登录失败', icon: 'none' })
    },
    complete: (res) => {
    },
  })
}