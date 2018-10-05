import BackGround from './pageBg'
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
    this.ctx = ctx
    this.bg = new BackGround(ctx)
    this.pageBtn = new PageBtn(ctx)
    this.music = new Music()
    this.touchEvent = false
    this.bindLoop = this.loop.bind(this)

    // 清除上一帧的动画
    window.cancelAnimationFrame(this.aniId)

    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
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
      console.log("渲染好友排行榜")
      databus.scene = 2
    }

    // 世界排行榜按钮事件
    if (x >= worldBtnArea.startX && x <= worldBtnArea.endX && y >= worldBtnArea.startY && y <= worldBtnArea.endY) {
      console.log("渲染世界排行榜")
      databus.scene = 3
    }

    //页面结束事件
    if (databus.scene != 0){
      this.finish()
    }
  }

  //首页canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)
    this.pageBtn.render(ctx)

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
