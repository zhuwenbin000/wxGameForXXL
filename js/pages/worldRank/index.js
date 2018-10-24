import Music from '../../music/music'
import DataBus from '../../databus'
import { ajax } from '../../base/ajax'
let databus = new DataBus()
let mt = 240;
/**
 * 游戏页
 */

export default class Index {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 3
    this.userList = []
    console.log("排行榜加载完了")

  }

  restart(ctx) {
    var me =this;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.ctx = ctx

    this.touchEvent = false
    this.bindLoop = this.loop.bind(this)

    // 清除上一帧的动画
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)

    let options = {
      tradecode: 'rank02',
      apiType: 'user',
      method: 'POST',
      data:{
        user:{
          start: 0,
          limit: 10
        }  
      },
      success(data) {
        var newlist = data.body.user_list
        newlist.map(item=>{
          item.logopath = 'https://img2.woyaogexing.com/2018/10/19/13ff6071a10f497d!400x400_big.jpg'
        })
        me.userList = newlist
      }
    }
    ajax(options)
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
  initRanklist(list,page,ctx) {
  // 至少绘制6个
  list = list.slice(6 * (page - 1), 6 * (page))
  
  let length = 7
  let itemHeight = 897 / 7;
  var w = (750 - 60 * 2);
  var h = itemHeight * length;
  ctx.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
  //drawnextbtn();

  for (let i = 0; i < length; i++) {
    let threeImage = wx.createImage();
    threeImage.src = 'images/firstthree.png';
    let lessIamge = wx.createImage()
    lessIamge.src = "images/icon_three.png"
    let meIamge = wx.createImage()
    meIamge.src = "images/me.png"
    if(page == 1){
      if (i < 3) {
        threeImage.onload = function () {
          ctx.drawImage(threeImage, 60, i * itemHeight + mt, w, itemHeight);
        }
      }
      if (i >= 3 && i < 6) {
        lessIamge.onload = function () {
          ctx.drawImage(lessIamge, 60, i * itemHeight + mt, w, itemHeight);
        }

      }
    }else{
      lessIamge.onload = function () {
        ctx.drawImage(lessIamge, 60, i * itemHeight + mt, w, itemHeight);
      }
    }
    
    if (i == 6) {
      meIamge.onload = function() {
        ctx.drawImage(meIamge, 33, i * itemHeight + mt, w * 1.09, itemHeight);
        console.log("绿色渲染完了")
       // drawrank(list,page)
      }
    }
  }
}
  //首页canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {
    console.log(this.userList)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.initRanklist(this.userList,1,ctx)
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
