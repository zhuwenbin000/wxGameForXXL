import PageBtn from './pageBtn'
import Music from '../../music/music'
import DataBus from '../../databus'
let ratio = canvas.width / 828 //设计稿宽度
import { ajax } from '../../base/ajax'
let databus = new DataBus()
/**
 * 首页
 */
export default class Index {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
  }
  getscore() { //获取最高分
    let me = this;
    let options = {
      tradecode: 'sys04',
      apiType: 'user',
      method: 'POST',
      success(data) {
        databus.bestscore = data.body.user.bestscore;
        databus.updateMaxScore(databus.bestscore)
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
    if(databus.homeState == 1){
      
      let startBtnArea = this.pageBtn.startBtnArea
      let friendsBtnArea = this.pageBtn.friendsBtnArea
      let laodaoBtnArea = this.pageBtn.laodaoBtnArea
      let shareBtnArea = this.pageBtn.shareBtnArea
      
      if (startBtnArea) {
        if (x >= startBtnArea.startX && x <= startBtnArea.endX && y >= startBtnArea.startY && y <= startBtnArea.endY) {
          if(databus.archiveState){
            //存档弹框
            databus.homeState = 3;
          }else{
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
            wx.shareAppMessage({ 
              'title': databus.shareConfig.info, 
              'imageUrl': databus.shareConfig.url,
              'query':'fatherId=' + wx.getStorageSync('openId')
            })
          },100)     
        }
      }

      if (databus.shareflag) {
        //点击banner icon事件
        if (x >= 680 * ratio && x <= (680 * ratio + 120 * ratio) && y >= 130 * ratio && y <= (130 * ratio + 136 * ratio)) {
          //按钮按下音效
          this.music.playMusic('btnDown')  

          databus.homeState = 2;
        }
      }

      //页面结束事件
      if (databus.scene != 0) {
        this.finish()
      }
    }else if(databus.homeState == 2){
      //关闭banner icon事件
      if (x >= 30 * ratio && x <= (30 * ratio + 150 * ratio) && y >= 100 * ratio && y <= (100 * ratio + 162 * ratio)) {
        //按钮按下音效
        this.music.playMusic('btnDown')

        databus.homeState = 1;
      }
      //开始跳转小程序
      if (x >= 250 * ratio && x <= (250 * ratio + 490 * ratio) && y >= 820 * ratio && y <= (820 * ratio + 180 * ratio)) {
        //按钮按下音效
        this.music.playMusic('btnDown')

        const pageurl = encodeURIComponent("http://www.baidu.com?openId=2")
        wx.navigateToMiniProgram({
          appId: 'wx470a8b0b3f90857b',
          path: 'pages/webview/webview?pageurl=' + pageurl,
          envVersion: 'trial',
          success(res) {
            // 打开成功
            // console.log("成功")
            // console.log(res)
          }
        })
      }
      
    }else if(databus.homeState == 3){//读档弹框
      //弹框关闭
      if (x >= 0 * ratio && x <= (0 * ratio + 150 * ratio) && y >= 300 * ratio && y <= (300 * ratio + 162 * ratio)) {
        //按钮按下音效
        this.music.playMusic('btnDown')

        databus.homeState = 1;
      }
      
      //读档继续
      if (x >= 175 * ratio && x <= (175 * ratio + 478 * ratio) && y >= 670 * ratio && y <= (670 * ratio + 196 * ratio)) {
        
      }

      //新开一把
      if (x >= 197 * ratio && x <= (197 * ratio + 434 * ratio) && y >= 840 * ratio && y <= (840 * ratio + 176 * ratio)) {
        
      }
      
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