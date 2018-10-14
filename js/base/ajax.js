
//发送请求
export default function ajax(options) {
  wx.request({
    url: options.url,
    method: options.method,
    data: JSON.stringify({
      "head": {
        "tradecode": options.tradecode,//交易编码，每个接口定义的接口编号
        "traceno": parseInt(Math.random() * 1000000000),//请求流水号，前端随机生成
        "channel": "3",//渠道号：1:IOS 2:Android 3:wechart
        "requesttime": new Date().getTime(),//请求时间
        "sign": hex_md5(JSON.stringify(options.data) + "3123").toUpperCase() //签名
      },
      "body": options.data
    }),
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      options.success(res)
    },
    fail(res) {
      options.fail(res)
    },
    complete(res) {
      options.complete(res)
    }
  })
}