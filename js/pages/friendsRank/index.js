import Music from '../../music/music'
import DataBus from '../../databus'
import { ajax } from '../../base/ajax'

let databus = new DataBus()
const ratio = wx.getSystemInfoSync().pixelRatio;//获取设备像素比
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
import DataStore from '../../base/helper';
const ngpng = wx.createImage();
ngpng.src = 'images/rank/2.png';
const friend_table = wx.createImage();
friend_table.src = 'images/rank/friend_light.png';
const world_table_dark = wx.createImage();
world_table_dark.src = 'images/rank/24.png';

const world_table = wx.createImage();
world_table.src = 'images/rank/world_light.png';
const friend_table_dark = wx.createImage();
friend_table_dark.src = 'images/rank/12.png';
let openDataContext = wx.getOpenDataContext();
let shareProv = wx.createImage();
shareProv.src = 'images/rank/share_prev.png';
let shareNext = wx.createImage();
shareNext.src = 'images/rank/share_next.png';
let pageindex = 1;
const homeimg = wx.createImage();
homeimg.src = 'images/rank/home.png';

let friend_loan = false;
let world_loan = false;
let prov_loan = false;
let next_loan = false;
/**
 * 游戏页
 */
export default class Index {
  constructor(ctx) {
    this.module_type = 1;
    // 维护当前requestAnimationFrame的id
    this.aniId = 2

  }
  getWorldData() { //获取世界排行榜数据
    let me = this;
    let options = {
      tradecode: 'rank02',
      apiType: 'user',
      method: 'POST',
      data: {
        user: true,
        start: 0,
        limit: 500
      },
      success(data) {
        // data.body.user_list = [...data.body.user_list]
        openDataContext.postMessage({
          type: 'world',
          text: data.body.user_list
        });
      }
    }
    ajax(options)
  }
  drawnextbtn(ctx) {
    if (!databus.provbtn_state) {
      ctx.drawImage(shareProv, databus.shareProv.x, databus.shareProv.y, databus.shareProv.w, databus.shareProv.h);
    } else {
      ctx.drawImage(shareProv, databus.shareProv.x - (databus.shareProv.w * 0.05), databus.shareProv.y - (databus.shareProv.h * 0.05), databus.shareProv.w * 1.1, databus.shareProv.h * 1.1);
    }
    if (!databus.nextbtn_state) {
      ctx.drawImage(shareNext, databus.shareNext.x, databus.shareNext.y, databus.shareNext.w, databus.shareNext.h);
    } else {
      ctx.drawImage(shareNext, databus.shareNext.x - (databus.shareNext.w * 0.05), databus.shareNext.y - (databus.shareNext.h * 0.05), databus.shareNext.w * 1.1, databus.shareNext.h * 1.1);
    }
  }
  messageSharecanvas(type, text) {
    // 排行榜也应该是实时的，所以需要sharedCanvas 绘制新的排行榜
    openDataContext.postMessage({
      type: type || 'friends',
      text: text,
    });
    this.ranking = true;
  }
  restart(ctx) {
    this.music = new Music()
    this.module_type = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.ctx = ctx
    this.touchEvent = false
    this.bindLoop = this.loop.bind(this)
    this.messageSharecanvas()
    // 清除上一帧的动画
    databus.friend_back_state = false;
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
    
  }

  finish() {
    //清除定时动画和绑定事件
    // wx.offTouchStart()
    window.cancelAnimationFrame(this.aniId)
    canvas.removeEventListener('touchstart', this.touchHandler)
  }

  //页面触摸事件处理
  touchPage(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let friend_area = {
      startX: databus.friendbtn.x,
      startY: databus.friendbtn.y,
      endX: databus.friendbtn.w + databus.friendbtn.x,
      endY: databus.friendbtn.h + databus.friendbtn.y
    }
    let world_area = {
      startX: databus.worldbtn.x,
      startY: databus.worldbtn.y,
      endX: databus.worldbtn.w + databus.worldbtn.x,
      endY: databus.worldbtn.h + databus.worldbtn.y,
    }

    let backBtnArea = {
      startX: databus.backbtn.x,
      startY: databus.backbtn.y,
      endX: databus.backbtn.x + databus.backbtn.w,
      endY: databus.backbtn.y + databus.backbtn.h
    }

    // 返回按钮事件
    if (x >= backBtnArea.startX && x <= backBtnArea.endX && y >= backBtnArea.startY && y <= backBtnArea.endY) {
      this.music.playMusic('btnDown')
      databus.friend_back_state = true;
      this.finish()
      setTimeout(() => {
        databus.scene = 0
      },databus.laterTime)
    }
    if (x >= friend_area.startX && x <= friend_area.endX && y >= friend_area.startY && y <= friend_area.endY) {
      this.music.playMusic('btnDown')
      if (friend_loan || world_loan) {
        return;
      }
      friend_loan = true;
      setTimeout(() => {
        friend_loan = false;
      }, 500)
      this.messageSharecanvas()
      this.module_type = 1
      this.render(this.ctx)
    }

    if (x >= world_area.startX && x <= world_area.endX && y >= world_area.startY && y <= world_area.endY) {
      this.music.playMusic('btnDown')
      if (world_loan || friend_loan) {
        return;
      }
      world_loan = true;
      setTimeout(() => {
        world_loan = false;
      }, 500)
      this.getWorldData()
      this.module_type = 2
      this.render(this.ctx)
    }

    if (x >= databus.shareProv.x && x <= databus.shareProv.x + databus.shareProv.w && y >= databus.shareProv.y && y <= databus.shareProv.h + databus.shareProv.y) {
      this.music.playMusic('btnDown')
      if (prov_loan||next_loan){
        return;
      }
      prov_loan = true;
      setTimeout(()=>{
        prov_loan = false;
      },500)
     
      if (!databus.provbtn_state) {
        databus.provbtn_state = true;
        setTimeout(() => {
          databus.provbtn_state = false;
        }, databus.laterTime)
      }
      if (this.module_type == 1) { //好友翻页
        openDataContext.postMessage({
          type: 'provfriend',
          text: ''
        });
      } else { //世界翻页
        openDataContext.postMessage({
          type: 'provworld',
          text: ''
        });
      }
    }
    if (x >= databus.shareNext.x && x <= databus.shareNext.x + databus.shareNext.w && y >= databus.shareNext.y && y <= databus.shareNext.h + databus.shareNext.y) {
      this.music.playMusic('btnDown')
      if (next_loan || prov_loan) {
        return;
      }
      next_loan = true;
      setTimeout(() => {
        next_loan = false;
      }, 500)
      
      if (!databus.nextbtn_state) {
        databus.nextbtn_state = true;
        setTimeout(() => {
          databus.nextbtn_state = false;
        }, databus.laterTime)
      }
      if (this.module_type == 1) { //好友翻页
        openDataContext.postMessage({
          type: 'nextfriend',
          text: ''
        });
      } else { //世界翻页
        openDataContext.postMessage({
          type: 'nextworld',
          text: ''
        });
      }
    }

    //页面结束事件
    if (databus.scene != 2) {
      this.finish()
    }
  }

  //首页canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#7b79ff';
    ctx.fillRect(0, 0, screenWidth, screenHeight)
    ctx.drawImage(ngpng, 0, 0, databus.bgpic.w, databus.bgpic.h);
    if (this.module_type == 1) { //渲染好友排行样式
      ctx.drawImage(friend_table, databus.friendbtn.x, databus.friendbtn.y, databus.friendbtn.w, databus.friendbtn.h);
      ctx.drawImage(world_table_dark, databus.worldbtn.x, databus.worldbtn.y, databus.worldbtn.w, databus.worldbtn.h);
    } else { //渲染世界排行样式 

      ctx.drawImage(friend_table_dark, databus.friendbtn_world.x, databus.friendbtn_world.y, databus.friendbtn_world.w, databus.friendbtn_world.h);

      ctx.drawImage(world_table, databus.worldbtn_world.x, databus.worldbtn_world.y, databus.worldbtn_world.w, databus.worldbtn_world.h);
    }

    this.drawnextbtn(ctx)
    if (!databus.friend_back_state) {
      ctx.drawImage(homeimg, databus.backbtn.x, databus.backbtn.y, databus.backbtn.w, databus.backbtn.h);
    } else {
      ctx.drawImage(homeimg, databus.backbtn.x - (databus.backbtn.w * 0.05), databus.backbtn.y - (databus.backbtn.h * 0.05), databus.backbtn.w * 1.1, databus.backbtn.h * 1.1);
    }

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
