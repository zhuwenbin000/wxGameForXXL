import Music from '../../music/music'
import DataBus from '../../databus'

let databus = new DataBus()
/**
 * 游戏页
 */
export default class Index {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 3
    
  }

  restart(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.ctx = ctx

    this.touchEvent = false
    this.bindLoop = this.loop.bind(this)

    // 清除上一帧的动画
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
    console.log(1231221)
    let openDataContext = wx.getOpenDataContext()
    let num = parseInt(Math.random()*1000)
    openDataContext.postMessage({
      test: 'hello',
      year: num
    })
  }

  finish() {
    //清除定时动画和绑定事件
    window.cancelAnimationFrame(this.aniId)

    canvas.removeEventListener('touchstart', this.touchHandler)
  }

  //页面触摸事件处理
  touchPage(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let backBtnArea = {
      startX: 0,
      startY: 0,
      endX: 100,
      endY: 100
    }

    // 开始游戏按钮事件
    if (x >= backBtnArea.startX && x <= backBtnArea.endX && y >= backBtnArea.startY && y <= backBtnArea.endY) {
      console.log("返回")
      databus.scene = 0
    }

    //页面结束事件
    if (databus.scene != 3) {
      this.finish()
    }
  }

  //首页canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#ccc';  //设置填充的背景颜色
    ctx.fillRect(0, 0, 100, 100); //绘制 800*300 像素的已填充矩形：
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff'; //设置笔触的颜色
    ctx.font = "bold 40px '字体','字体','微软雅黑','宋体'"; //设置字体
    ctx.fillText('世界排行榜', 140, 130); //设置文本内容
    ctx.fillText('返回', 10, 50); //设置文本内容
  
    // 按钮点击事件,只绑定一次
    if (!this.touchEvent) {
      this.touchEvent = true
      this.touchHandler = this.touchPage.bind(this)
      canvas.addEventListener('touchstart', this.touchHandler)
    }

  }

  // 实现游戏帧循环
  loop() {
    this.render(this.ctx)
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
  }
}
