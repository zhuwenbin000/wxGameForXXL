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
    console.log("排行榜加载完了")
  }

  restart(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.ctx = ctx

    this.touchEvent = false
    this.bindLoop = this.loop.bind(this)

    // 清除上一帧的动画
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
   
    let openDataContext = wx.getOpenDataContext()
    let num = parseInt(Math.random()*1000)
    openDataContext.postMessage({
      test: 'hello',
      year: num
    })

    wx.request({
      url: 'https://www.easy-mock.com/mock/5a5c408ee990076261beed88/example/getranklist',
      method:'GET',
      data:{},
      success:function(res){
        console.log(res)
      }
    })
  }

 drawnextbtn(ctx) {
 
  let shareNext = wx.createImage();
  shareNext.src = 'images/share_next.png';
  shareNext.onload = function () {
    ctx.drawImage(shareNext, 420, 1180, 258, 130);
  }
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
    if (databus.scene != 3) {
      this.finish()
    }
  }

  //首页canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const lineImg = wx.createImage();
    lineImg.src = 'images/ph_bg.jpg';
    ctx.drawImage(lineImg, 0, 0, canvas.width, canvas.height);

    const ngpng = wx.createImage();
    ngpng.src = 'images/bgpic.png';
    ctx.drawImage(ngpng, 0, 0, databus.bgpic.w, databus.bgpic.h);

    const homeimg = wx.createImage();
    homeimg.src = 'images/home.png';
    ctx.drawImage(homeimg, databus.backbtn.x, databus.backbtn.y, databus.backbtn.w, databus.backbtn.h);
   // this.drawnextbtn(ctx);

    let shareProv = wx.createImage();
    shareProv.src = 'images/share_prev.png';
   
    ctx.drawImage(shareProv, databus.share_prev.x, databus.share_prev.y, databus.share_prev.w, databus.share_prev.h);

    let shareNext = wx.createImage();
    shareNext.src = 'images/share_next.png';
   
    ctx.drawImage(shareNext, databus.share_next.x, databus.share_next.y, databus.share_next.w, databus.share_next.h);
    
    
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
