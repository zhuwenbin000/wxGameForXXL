import PageBtn from './pageBtn'
import Music from '../../music/music'
import DataBus from '../../databus'
const ratio = wx.getSystemInfoSync().pixelRatio;
import { ajax } from '../../base/ajax'
let databus = new DataBus()
/**
 * 首页
 */
export default class Index {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    // if (databus.userinfo){ //如果可以获取到用户信息 直接去获取最高分
    //   this.getscore()
    // }
   

  }
  getscore() { //获取最高分
    let me = this;
    let options = {
      tradecode: 'sys04',
      apiType: 'user',
      method: 'POST',
      success(data) {
        databus.bestscore = data.body.user.bestscore;
        // databus.usergold = data.body.user.glod; //用户拥有金币
      }
    }
    ajax(options)
  }

  restart(ctx) {
    var me = this;
    this.ctx = ctx
    this.pageBtn = new PageBtn(ctx)
    this.music = new Music()
    this.music.playIndexBgm()
    this.touchEvent = false
    this.bindLoop = this.loop.bind(this)
    // 清除上一帧的动画
    window.cancelAnimationFrame(this.aniId)
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
    //渲染按钮之前先获取用户的登录状态
    this.getscore()
    databus.playbtn_state = false;
    databus.friendbtn_state = false;
  }

  finish() {
    //清除定时动画和绑定事件 
    window.cancelAnimationFrame(this.aniId)
    canvas.removeEventListener('touchstart', this.touchHomePageHandler)
  }
  // 首页按钮事件处理逻辑
  touchHomePage(e) {
    //wx.offTouchStart();
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    let startBtnArea = this.pageBtn.startBtnArea
    let friendsBtnArea = this.pageBtn.friendsBtnArea
    let laodaoBtnArea = this.pageBtn.laodaoBtnArea
    let shareBtnArea = this.pageBtn.shareBtnArea

    if (startBtnArea) {
      if (x >= startBtnArea.startX && x <= startBtnArea.endX && y >= startBtnArea.startY && y <= startBtnArea.endY) {
        //按钮按下音效
        databus.playbtn_state = true;
        this.music.playMusic('btnDown')        
          setTimeout(()=>{
            this.finish()
            databus.scene = 1   
            setTimeout(()=>{
              databus.gameClubbutton.destroy() //游戏圈按钮销毁
              databus.gameClubbutton = null;
            }, 50)        
          }, databus.laterTime)
      }
    }
    // 开始游戏按钮事件
    if (friendsBtnArea) {
      if (x >= friendsBtnArea.startX && x <= friendsBtnArea.endX && y >= friendsBtnArea.startY && y <= friendsBtnArea.endY) {
        databus.friendbtn_state = true;
        this.music.playMusic('btnDown')
        setTimeout(() => {
          this.finish()
          databus.scene = 2
          setTimeout(() => {
            databus.gameClubbutton.destroy() //游戏圈按钮销毁
            databus.gameClubbutton = null;
          })
        }, databus.laterTime)
      }
    }
    if (shareBtnArea) {
      if (x >= shareBtnArea.startX && x <= shareBtnArea.endX && y >= shareBtnArea.startY && y <= shareBtnArea.endY) {
        databus.sharebtn_state = true;
        setTimeout(()=>{
          databus.sharebtn_state = false;
          wx.shareAppMessage({ 'title': databus.shareConfig.info, 'imageUrl': databus.shareConfig.url })
        },100)     
      }
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
   
    this.render(this.ctx)
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)

  }
}