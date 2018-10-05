import Music from '../../music/music'
import DataBus from '../../databus'

let databus = new DataBus()
/**
 * 游戏页
 */
export default class Index {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 1
  }

  restart(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.ctx = ctx

    ctx.fillStyle = '#ccc';  //设置填充的背景颜色
    ctx.fillRect(0, 0, 100, 100); //绘制 800*300 像素的已填充矩形：
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff'; //设置笔触的颜色
    ctx.font = "bold 40px '字体','字体','微软雅黑','宋体'"; //设置字体
    ctx.fillText('游戏页', 140, 130); //设置文本内容
    ctx.fillText('返回', 10, 50); //设置文本内容

    // this.music = new Music()
    // this.touchEvent = false
    // this.bindLoop = this.loop.bind(this)

    // // 清除上一帧的动画
    // window.cancelAnimationFrame(this.aniId);
    // this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
  }

  //首页canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)
    this.pageBtn.render(ctx)

  }

  // 实现游戏帧循环
  loop() {
    this.render(this.ctx)
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
  }
}
