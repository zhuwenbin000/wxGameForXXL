import Music from '../../music/music'
import DataBus from '../../databus'

let databus = new DataBus()
const ratio = wx.getSystemInfoSync().pixelRatio;//获取设备像素比
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
import DataStore from '../../base/helper';
/**
 * 游戏页
 */
export default class Index {
  constructor(ctx) {
    console.log(ctx,'123')
   
    // 维护当前requestAnimationFrame的id
    this.aniId = 2
    
  }
  messageSharecanvas(type, text) {
    // 排行榜也应该是实时的，所以需要sharedCanvas 绘制新的排行榜
    let openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage({
      type: type || 'friends',
      text: text,
    });
    this.ranking = true;
  }
  restart(ctx) {
   
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.ctx = ctx
    console.log(999)
    this.touchEvent = false
    this.bindLoop = this.loop.bind(this)
    this.messageSharecanvas()
    // 清除上一帧的动画
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
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
    if (databus.scene != 2) {
      this.finish()
    }
  }

  //首页canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#ccc';  //设置填充的背景颜色
    ctx.fillRect(0, 0, 100, 80); //绘制 800*300 像素的已填充矩形：
   // ctx.drawImage(sharedCanvas, 0, 0, screenWidth, screenHeight)
   
    DataStore.getInstance().ctx.drawImage(DataStore.getInstance().sharedCanvas, 0, 0, screenWidth, screenHeight);
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
