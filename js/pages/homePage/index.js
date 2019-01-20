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
            //弹框音效
            this.music.playMusic('modalShow')   
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
      if (databus.shareflag) {//如果是非审核模式
        if(!databus.activityData){//如果没有获得banner数据就return
          return
        }

        //点击banner icon事件
        if (x >= 680 * ratio && x <= (680 * ratio + 120 * ratio) && y >= 130 * ratio && y <= (130 * ratio + 136 * ratio)) {
          //弹框音效
          this.music.playMusic('modalShow')   
          databus.homeState = 2;
          this.pageBtn.bannerButton && this.pageBtn.bannerButton.show()
          this.pageBtn.createbutton && this.pageBtn.createbutton.hide()
          this.pageBtn.friendbutton && this.pageBtn.friendbutton.hide()

        }
      }

      //页面结束事件
      if (databus.scene != 0) {
        this.finish()
      }
    }else if(databus.homeState == 2){
      //关闭banner icon事件
      if (x >= 30 * ratio && x <= (30 * ratio + 150 * ratio) && y >= 250 * ratio && y <= (250 * ratio + 162 * ratio)) {
        //按钮按下音效
        this.music.playMusic('btnDown')

        databus.homeState = 1;
        this.pageBtn.bannerButton && this.pageBtn.bannerButton.hide()
        this.pageBtn.createbutton && this.pageBtn.createbutton.show()
        this.pageBtn.friendbutton && this.pageBtn.friendbutton.show()
        return
      }
      //开始跳转小程序
      // if (x >= 250 * ratio && x <= (250 * ratio + 490 * ratio) && y >= 820 * ratio && y <= (820 * ratio + 180 * ratio)) {
      if (x >= 94 * ratio && x <= (94 * ratio + 640 * ratio) && y >= 300 * ratio && y <= (300 * ratio + 900 * ratio)) {

        //按钮按下音效
        this.music.playMusic('btnDown')

        const pageurl = encodeURIComponent(databus.activityData.url + "?openid=" + wx.getStorageSync('openId'))
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
        //按钮按下音效
        databus.playbtn_state = true;
        this.music.playMusic('btnDown')        
        setTimeout(()=>{
          databus.homeState = 1;
          this.finish()
          databus.scene = 1
          setTimeout(()=>{
            databus.gameClubbutton.destroy() //游戏圈按钮销毁
            databus.gameClubbutton = null;
          }, 50)
        }, databus.laterTime)
      }

      //新开一把
      if (x >= 197 * ratio && x <= (197 * ratio + 434 * ratio) && y >= 840 * ratio && y <= (840 * ratio + 176 * ratio)) {
        //按钮按下音效
        databus.playbtn_state = true;
        this.music.playMusic('btnDown')        
        setTimeout(()=>{
          databus.homeState = 1;
          this.finish()
          databus.scene = 1
          databus.archiveData = {}
          databus.archiveState = false
          setTimeout(()=>{
            databus.gameClubbutton.destroy() //游戏圈按钮销毁
            databus.gameClubbutton = null;
          }, 50)        
        }, databus.laterTime)
      }
      
    }else if(databus.homeState == 4){//精力系统弹框
      //精力系统tab弹框之后的点击事件 1签到 2补签
      if(databus.energySysModal == 1){
        if (x >= 190 * ratio && x <= (455 * ratio + 190 * ratio) && y >= 875 * ratio && y <= (875 * ratio + 170 * ratio)) {
          //关闭签到成功弹框
          //按钮按下音效
          this.music.playMusic('btnDown')
          //补签弹框
          databus.energySysModal = 0
        }
        if (x >= 185 * ratio && x <= (185 * ratio + 80 * ratio) && y >= 365 * ratio && y <= (365 * ratio + 80 * ratio)) {
          //关闭签到成功弹框
          //按钮按下音效
          this.music.playMusic('btnDown')
          //补签弹框
          databus.energySysModal = 0
        }
      }else if(databus.energySysModal == 2){
        if (x >= 190 * ratio && x <= (455 * ratio + 190 * ratio) && y >= 875 * ratio && y <= (875 * ratio + 170 * ratio)) {
          //关闭签到成功弹框
          //按钮按下音效
          this.music.playMusic('btnDown')
          //补签弹框
          databus.energySysModal = 0
        }
        if (x >= 185 * ratio && x <= (185 * ratio + 80 * ratio) && y >= 365 * ratio && y <= (365 * ratio + 80 * ratio)) {
          //关闭签到成功弹框
          //按钮按下音效
          this.music.playMusic('btnDown')
          //补签弹框
          databus.energySysModal = 0
        }
      }else if(databus.energySysModal == 0){
        //签到部分点击事件
        if(databus.energySysTab == 1){
          for (let i = 0; i < databus.daysinfo.length; i++) {
            //弹框关闭
            if (x >= databus.signXY[i].signBg.x * ratio && x <= (220 * ratio + databus.signXY[i].signBg.x * ratio) && y >= databus.signXY[i].signBg.y * ratio && y <= (296 * ratio + databus.signXY[i].signBg.y * ratio)) {
              if(parseInt(databus.daysinfo[i].day) < parseInt(databus.getNowTimeStr())){//当日之前的天数
                //签到状态-补签
                if (databus.daysinfo[i].isdone == '0') {
                  //按钮按下音效
                  this.music.playMusic('btnDown')
                  //补签弹框
                  databus.signData = databus.daysinfo[i];
                  databus.energySysModal = 2;
                }
              }
              if(parseInt(databus.daysinfo[i].day) == parseInt(databus.getNowTimeStr())){//当日之前的天数
                //签到状态-签到
                if (databus.daysinfo[i].isdone == '0') {
                  //按钮按下音效
                  this.music.playMusic('btnDown')
                  //签到成功
                  databus.signData = databus.daysinfo[i];
                  databus.energySysModal = 1;
                }
              }
            }
          }
        }

        //弹框关闭
        if (x >= 0 * ratio && x <= (0 * ratio + 80 * ratio) && y >= 100 * ratio && y <= (100 * ratio + 80 * ratio)) {
          //按钮按下音效
          this.music.playMusic('btnDown')
          databus.homeState = 1;
          databus.energySysTab = 0;
        }
        //大赛tab点击
        if (x >= 80 * ratio && x <= (80 * ratio + 164 * ratio) && y >= 110 * ratio && y <= (110 * ratio + 164 * ratio)) {
          //按钮按下音效
          this.music.playMusic('btnDown')
          databus.energySysTab = 0;
        }
        //签到tab点击
        if (x >= 242 * ratio && x <= (242 * ratio + 164 * ratio) && y >= 110 * ratio && y <= (110 * ratio + 164 * ratio)) {
          //按钮按下音效
          this.music.playMusic('btnDown')
          databus.energySysTab = 1;
        }
        //抽奖tab点击
        if (x >= 422 * ratio && x <= (422 * ratio + 164 * ratio) && y >= 110 * ratio && y <= (110 * ratio + 164 * ratio)) {
          //按钮按下音效
          this.music.playMusic('btnDown')
          databus.energySysTab = 2;
        }
        //搜刮tab点击
        if (x >= 605 * ratio && x <= (605 * ratio + 164 * ratio) && y >= 110 * ratio && y <= (110 * ratio + 164 * ratio)) {
          //按钮按下音效
          this.music.playMusic('btnDown')
          databus.energySysTab = 3;
        }
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