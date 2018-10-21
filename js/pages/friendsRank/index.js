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
    console.log("好友排行加载了")
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
    this.touchEvent = false
    this.bindLoop = this.loop.bind(this)
    this.messageSharecanvas()
    // 清除上一帧的动画
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
  }

  finish() {
    //清除定时动画和绑定事件
    console.log("清除定时动画和绑定事件")
   // wx.offTouchStart()
    window.cancelAnimationFrame(this.aniId)
    canvas.removeEventListener('touchstart', this.touchHandler) 
  }

  //页面触摸事件处理
  touchPage(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let backBtnArea = {
      startX: databus.backbtn.x,
      startY: databus.backbtn.y,
      endX: databus.backbtn.x + databus.backbtn.w,
      endY: databus.backbtn.y + databus.backbtn.h
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
    console.log("好友排行在循环")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const lineImg = wx.createImage();
    lineImg.src = 'images/ph_bg.jpg';
    ctx.drawImage(lineImg, 0, 0, screenWidth * ratio, screenHeight * ratio);

    const ngpng = wx.createImage();
    ngpng.src = 'images/bgpic.png';
    ctx.drawImage(ngpng, 0, 0, databus.bgpic.w, databus.bgpic.h);

    const homeimg = wx.createImage();
    homeimg.src = 'images/home.png';
    ctx.drawImage(homeimg, databus.backbtn.x, databus.backbtn.y, databus.backbtn.w, databus.backbtn.h);

    

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
