
import PageBtn from './pageBtn'
import Music from '../../music/music'
import DataBus from '../../databus'

let databus = new DataBus()
/**
 * 首页
 */
export default class Index {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
  }

  restart(ctx) {  
    var me = this; 
    this.ctx = ctx
   
    this.pageBtn = new PageBtn(ctx)
    this.music = new Music()
    this.touchEvent = false
    this.bindLoop = this.loop.bind(this)
    // 清除上一帧的动画
    window.cancelAnimationFrame(this.aniId)
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)

    //渲染按钮之前先获取用户的登录状态
    wx.getSetting({
      success: function (res) {
        var authSetting = res.authSetting
        if (authSetting['scope.userInfo'] === true) {
          // 用户已授权，可以直接调用相关 API
          databus.pownstate = 1
          me.render(me.ctx) //首页不需要循环移到这里
        } else if (authSetting['scope.userInfo'] === false) {
          databus.pownstate = 2
          me.render(me.ctx) //首页不需要循环移到这里
          // 用户已拒绝授权
        } else {
          databus.pownstate = 3
          me.render(me.ctx) //首页不需要循环移到这里
          // 未询问过用户授权，
        }
      }
    })
  
   
  }

  finish() {
    //清除定时动画和绑定事件
    window.cancelAnimationFrame(this.aniId)

    canvas.removeEventListener('touchstart', this.touchHomePageHandler)
  }

  // 首页按钮事件处理逻辑
  touchHomePage(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let startBtnArea = this.pageBtn.startBtnArea
    let friendsBtnArea = this.pageBtn.friendsBtnArea
    let worldBtnArea = this.pageBtn.worldBtnArea

    // 开始游戏按钮事件
    if (x >= startBtnArea.startX && x <= startBtnArea.endX && y >= startBtnArea.startY && y <= startBtnArea.endY) {
      console.log("渲染游戏页")
      databus.scene = 1

    }

    // 好友排行榜按钮事件
    if (x >= friendsBtnArea.startX && x <= friendsBtnArea.endX && y >= friendsBtnArea.startY && y <= friendsBtnArea.endY) {
      if (databus.pownstate!=1){
        wx.authorize({ //获取授权
          scope: 'scope.userInfo',
          success(res) {//授权成功
            databus.scene = 2
          },
          fail(res){//授权失败
            databus.scene = 2
          }
        })
      }else{
        databus.scene = 2
      }
     
      console.log("渲染好友排行榜", databus.pownstate)
    
     
    }

    // 世界排行榜按钮事件
    if (x >= worldBtnArea.startX && x <= worldBtnArea.endX && y >= worldBtnArea.startY && y <= worldBtnArea.endY) {
      console.log("渲染世界排行榜")
      databus.scene = 3
    }

    //页面结束事件
    if (databus.scene != 0) {
      this.finish()
    }
  }

  //首页canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

   
    this.pageBtn.render(ctx)
    let openDataContext = wx.getOpenDataContext()
    
    
    // 按钮点击事件,只绑定一次
    if (!this.touchEvent) {
      this.touchEvent = true
      this.touchHomePageHandler = this.touchHomePage.bind(this)
      canvas.addEventListener('touchstart', this.touchHomePageHandler)
    }
  }

  // 实现游戏帧循环
  loop() {

   
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)

  }
}
