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
    this.f = 0
  }
  getscore() { //获取最高分
    let me = this;
    let options = {
      tradecode: 'sys04',
      apiType: 'user',
      method: 'POST',
      data:{
        version:databus.version
      },
      success(data) {
        databus.bestscore = data.body.user.bestscore;
        databus.usergold = data.body.user.glod; //用户拥有金币
        databus.updateMaxScore(databus.bestscore)
        //精力系统相关
        databus.boxExchangeTime = data.body.user.lastzhtime;
        databus.boxNum = data.body.user.boxnum;
        databus.myEnergy = data.body.user.pengry;
        databus.boxEnergy = data.body.user.boxengry;
        databus.wxaqrcodeurl = 'http://3break-1257630833.file.myqcloud.com' + data.body.user.wxaqrcodeurl;
        
        if(parseInt(databus.boxNum) > 0){
          databus.lotteryPoint = true
        }

        if(!databus.boxExchangeTime){
          databus.canExchangeBox = true
          databus.lotteryPoint = true
        }else{
          if((new Date()).getTime() > databus.boxExchangeTime + 10 * 60 * 60 * 1000){
            databus.canExchangeBox = true
            databus.lotteryPoint = true
          }
        }
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
    databus.active_state = false;
    //获取精力系统相关
    this.getEngerySysInfo()
  }

  finish() {
    //清除定时动画和绑定事件 
    window.cancelAnimationFrame(this.aniId)
    canvas.removeEventListener('touchstart', this.touchHomePageHandler)
  }
  // 首页按钮事件处理逻辑
  touchHomePage(e) {
    let self = this;
    //wx.offTouchStart();
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    if (databus.homeState == 1) {

      let startBtnArea = this.pageBtn.startBtnArea
      let friendsBtnArea = this.pageBtn.friendsBtnArea
      let laodaoBtnArea = this.pageBtn.laodaoBtnArea
      let activeBtnArea = this.pageBtn.activeBtnArea

      if (startBtnArea) {
        if (x >= startBtnArea.startX && x <= startBtnArea.endX && y >= startBtnArea.startY && y <= startBtnArea.endY) {
          if (databus.archiveState) {
            //存档弹框
            databus.homeState = 3;
            //弹框音效
            this.music.playMusic('modalShow')
          } else {
            //按钮按下音效
            databus.playbtn_state = true;
            this.music.playMusic('btnDown')
            setTimeout(() => {
              this.finish()
              databus.scene = 1
              setTimeout(() => {
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
           
              databus.gameClubbutton.destroy() //游戏圈按钮销毁
              databus.gameClubbutton = null;
            
          }, databus.laterTime)
        }
      }
      if (activeBtnArea) {
        if (x >= activeBtnArea.startX && x <= activeBtnArea.endX && y >= activeBtnArea.startY && y <= activeBtnArea.endY) {
          databus.active_state = true;
          this.music.playMusic('btnDown')
          setTimeout(()=>{
            databus.homeState = 4;
            databus.active_state = false;
            databus.gameClubbutton.destroy() //游戏圈按钮销毁
            databus.gameClubbutton = null;
          },databus.laterTime)
        }
      }
      if (databus.shareflag) {//如果是非审核模式
        if (!databus.activityData) {//如果没有获得banner数据就return
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
    } else if (databus.homeState == 2) {
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

    } else if (databus.homeState == 3) {//读档弹框
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
        setTimeout(() => {
          databus.homeState = 1;
          this.finish()
          databus.scene = 1
          setTimeout(() => {
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
        setTimeout(() => {
          databus.homeState = 1;
          this.finish()
          databus.scene = 1
          databus.archiveData = {}
          databus.archiveState = false
          setTimeout(() => {
            databus.gameClubbutton.destroy() //游戏圈按钮销毁
            databus.gameClubbutton = null;
          }, 50)
        }, databus.laterTime)
      }

    } else if (databus.homeState == 4) {//精力系统弹框
      //精力系统tab弹框之后的点击事件 0非弹框状态 1签到 2补签 3开箱成功
     
      if (databus.energySysModal == 1) {
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
      } else if (databus.energySysModal == 2) {
        if (x >= 190 * ratio && x <= (455 * ratio + 190 * ratio) && y >= 875 * ratio && y <= (875 * ratio + 170 * ratio)) {
          //关闭签到成功弹框
          //按钮按下音效
          this.music.playMusic('btnDown')
          //补签弹框
          if(databus.signType == 2){
            databus.showSignVideoAd()
          }
          if(databus.signType == 0){
            if(parseInt(databus.usergold) > 50){
              this.goSign({
                openid:wx.getStorageSync('openId'),
                day:databus.signData.day,
                isoverday:1,
                gold:50
              })
            }else{
              wx.showToast({ title: "金币不足", icon:'none'})
            }
          }
          if(databus.signType == 1){
            databus.wxShare('3',()=>{
              this.goSign({
                openid:wx.getStorageSync('openId'),
                day:databus.signData.day,
                isoverday:1,
                gold:0
              })
            })
          }
          
        }
        if (x >= 185 * ratio && x <= (185 * ratio + 80 * ratio) && y >= 365 * ratio && y <= (365 * ratio + 80 * ratio)) {
          //关闭签到成功弹框
          //按钮按下音效
          this.music.playMusic('btnDown')
          //补签弹框
          databus.energySysModal = 0
        }
      } else if (databus.energySysModal == 3) {
        // if (x >= 190 * ratio && x <= (455 * ratio + 190 * ratio) && y >= 875 * ratio && y <= (875 * ratio + 170 * ratio)) {
        //   //关闭开箱成功弹框
        //   //按钮按下音效
        //   this.music.playMusic('btnDown')
        //   //补签弹框
        //   databus.energySysModal = 0
        //   //reset开箱相关数据
        //   databus.boxOpenStart = false
        //   databus.boxOpenNeedClickNum = 0
        //   databus.boxOpenClickNum = 0
        // }
        if (x >= 185 * ratio && x <= (185 * ratio + 80 * ratio) && y >= 365 * ratio && y <= (365 * ratio + 80 * ratio)) {
          //关闭开箱成功弹框
          //按钮按下音效
          this.music.playMusic('btnDown')
          //补签弹框
          databus.energySysModal = 0
          //reset开箱相关数据
          databus.boxOpenStart = false
          databus.boxOpenNeedClickNum = 0
          databus.boxOpenClickNum = 0
          //关闭广告
          databus.bannerAd && databus.bannerAd.hide();
        }
      } else if (databus.energySysModal == 0) {
        
        if (databus.energySysTab == 0) {
          //大赛部分点击事件
          //分享
          if (x >= 60 * ratio && x <= (60 * ratio + 305 * ratio) && y >= 1300 * ratio && y <= (1285 * ratio + 145 * ratio)) {
            //按钮按下音效
            this.music.playMusic('btnDown')
            // wx.shareAppMessage({
            //   'title': databus.battleInfo.sharetextofgame, 
            //   'imageUrl': databus.battleInfo.shareimgofgame,
            //   'query':'fatherId=' + wx.getStorageSync('openId')
            // })

            databus.wxShare('2')
          }

          //大赛详情
          if (x >= 415 * ratio && x <= (415 * ratio + 350 * ratio) && y >= 1300 * ratio && y <= (1285 * ratio + 145 * ratio)) {
            //按钮按下音效
            this.music.playMusic('btnDown')
            wx.setStorageSync('battlePoint', databus.getNowTimeStr())
            databus.battlePoint = false
            const pageurl = encodeURIComponent(databus.battleInfo.tosprourl + "?openid=" + wx.getStorageSync('openId'))
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
          //海报点击
          if (x >= 54 * ratio && x <= (54 * ratio + 720 * ratio) && y >= 300 * ratio && y <= (300 * ratio + 960 * ratio)) {
            //按钮按下音效
            this.music.playMusic('btnDown')
            wx.setStorageSync('battlePoint', databus.getNowTimeStr())
            databus.battlePoint = false
            const pageurl = encodeURIComponent(databus.battleInfo.tosprourl + "?openid=" + wx.getStorageSync('openId'))
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


        } else if (databus.energySysTab == 1) {
          //签到部分点击事件
          for (let i = 0; i < databus.daysinfo.length; i++) {
            //弹框关闭
            if (x >= databus.signXY[i].signBg.x * ratio && x <= (220 * ratio + databus.signXY[i].signBg.x * ratio) && y >= databus.signXY[i].signBg.y * ratio && y <= (296 * ratio + databus.signXY[i].signBg.y * ratio)) {
              if (parseInt(databus.daysinfo[i].day) < parseInt(databus.getNowTimeStr())) {//当日之前的天数
                //签到状态-补签
                if (databus.daysinfo[i].isdone == '0') {
                  //按钮按下音效
                  this.music.playMusic('btnDown')

                  //补签弹框
                  if(databus.shareflag){//非审核模式
                    databus.signType = 2
                  }else{
                    databus.signType = 0
                  }
                  databus.signData = databus.daysinfo[i];
                  databus.energySysModal = 2;
                }
              }
              if (parseInt(databus.daysinfo[i].day) == parseInt(databus.getNowTimeStr())) {//当日之前的天数
                //签到状态-签到
                if (databus.daysinfo[i].isdone == '0') {
                  //按钮按下音效
                  this.music.playMusic('btnDown')
                  this.goSign({
                    openid:wx.getStorageSync('openId'),
                    day:databus.daysinfo[i].day,
                    isoverday:0,
                  })
                  databus.signPoint = false
                }
              }
            }
          }
        } else if (databus.energySysTab == 2) {
          //抽奖部分点击事件
          if(databus.canExchangeBox){
            //点击换取宝箱精力
            if (x >= 615 * ratio && x <= (615 * ratio + 148 * ratio) && y >= 295 * ratio && y <= (295 * ratio + 156 * ratio)) {
              //按钮按下音效
              this.music.playMusic('btnDown')
              this.enchangeEngery()
            }
          }

          //点击开箱
          if (x >= 255 * ratio && x <= (255 * ratio + 312 * ratio) && y >= 1170 * ratio && y <= (1170 * ratio + 138 * ratio)) {
            //按钮按下音效
            this.music.playMusic('btnDown')
            if(databus.boxOpenStart){ //开箱进行中时 开箱次数+1
              databus.boxOpenClickNum++
              if(databus.boxOpenClickNum == databus.boxOpenNeedClickNum){//当开箱次数等于需要开箱总次数时  开箱成功
                this.openBox()
              }
            }else{
              if(databus.boxNum > 0){
                wx.showToast({ title: "连续点击按钮开箱~", icon:'none'})
                databus.boxOpenStart = true
                databus.boxOpenNeedClickNum = _.random(4, 8)
              }else{
                wx.showToast({ title: "暂无宝箱可开~", icon:'none'})
              }
            }
          }
          
        } else if (databus.energySysTab == 3){ //搜刮事件绑定
          if (databus.tip_success || databus.tip_flase){
           
            if (x >= 45 * ratio && x <= (45 * ratio + 80 * ratio) && y >= 415 * ratio && y <= (415 * ratio) + (80 * ratio)) {
              databus.tip_success = false;
              databus.tip_flase = false;
            }
            if (x >= 155 * ratio && x <= (155 * ratio + 512 * ratio) && y >= 875 * ratio && y <= (875 * ratio) + (200 * ratio)) {
              databus.tip_success = false;
              databus.tip_flase = false;
            }
           
            if ((x >= 84 * ratio && x <= (84 * ratio + 662 * ratio) && y >= 825 * ratio && y <= (825 * ratio) + (200 * ratio)) && databus.tip_flase) {
              
                databus.wxShare('1')
                     
            }
            
          }else{
            if (x >= 230 * ratio && x <= (230 * ratio + 194 * ratio) && y >= 295 * ratio && y <= (295 * ratio) + (88 * ratio)) {
              this.music.playMusic('btnDown')
              databus.shareState = false;

              setTimeout(() => {
                databus.shareState = true;
                databus.wxShare('4')
              }, 200)
              
            }
            const datalist = databus.jl_list.slice((databus.ji_pageindex-1)*6,databus.ji_pageindex*6)
            const itemHeight = 917 * ratio / 6;
            
            if (databus.jl_list.length>0){
              if (x >= 110 * ratio && x <= (110 * ratio + 258 * ratio) && y >= 1300 * ratio && y <= (1300 * ratio) + (130 * ratio)) {
                if (databus.ji_pageindex > 1){
                  this.music.playMusic('btnDown')
                  databus.provState = false;
                  setTimeout(() => {
                    databus.provState = true
                    databus.ji_pageindex--
                  }, 200)
                }
              }
            
              if (x >= 460 * ratio && x <= (460 * ratio + 258 * ratio) && y >= 1300 * ratio && y <= (1300 * ratio) + (130 * ratio)) {
                if (databus.ji_pageindex < databus.ji_totlePage) {
                  this.music.playMusic('btnDown')
                  databus.nextState = false
                  setTimeout(()=>{
                    databus.nextState = true
                    databus.ji_pageindex++
                  },200)
                }
              }
            }
            datalist.map((item,index) => {
              if (x >= 592 * ratio && x <= (592 * ratio) + (148 * ratio) && y >= index * itemHeight + (365 * ratio) && y <= index * itemHeight + (365 * ratio)+(156*ratio)) { //点击列表的搜刮精力
              
                if (item.cansteal != '0' && item.penrgy && !databus.tip_loan){
                  databus.tip_loan = true;
                  ajax({
                    tradecode: 'sys22',
                    apiType: 'user',
                    method: 'POST',
                    data: {
                      openid: wx.getStorageSync('openId'),
                      lopenid: item.openid
                    },
                    success(data) {
                      self.music.playMusic('passPoint')
                      databus.tip_loan = false;
                      console.log(data)
                      item.cansteal = 0;
                      databus.getScore = data.body.info.propnum;
                      item.penrgy = item.penrgy - data.body.info.propnum
                      databus.tip_success = true;
                    }
                  })
                 
                } else if (item.cansteal == '1' && !item.penrgy){
                  this.music.playMusic('btnDown')
                  databus.tip_flase = true;
                }else{
                  wx.showToast({ title: "今日已经搜刮过了,明天再来噢~", icon: 'none' })
                }
              }
            })
          }
        }

        //弹框关闭
        if (x >= 0 * ratio && x <= (0 * ratio + 80 * ratio) && y >= 100 * ratio && y <= (100 * ratio + 80 * ratio)) {
          //按钮按下音效
          
          this.music.playMusic('btnDown')
          databus.homeState = 1;
          if(databus.battleInfo){//有无大赛判断
            databus.energySysTab = 0;
          }else{
            databus.energySysTab = 1;
          }
        }
        //大赛tab点击
        if (x >= 80 * ratio && x <= (80 * ratio + 164 * ratio) && y >= 110 * ratio && y <= (110 * ratio + 164 * ratio)) {
          //按钮按下音效
         
          this.music.playMusic('btnDown')
          if(databus.battleInfo){//有无大赛判断
            databus.energySysTab = 0;
          }else{
            databus.energySysTab = 1;
          }
        }
        //签到tab点击
        if (x >= 242 * ratio && x <= (242 * ratio + 164 * ratio) && y >= 110 * ratio && y <= (110 * ratio + 164 * ratio)) {
          //按钮按下音效
          this.music.playMusic('btnDown')
          if(databus.battleInfo){//有无大赛判断
            databus.energySysTab = 1;
          }else{
            databus.energySysTab = 2;
          }
        }
        //抽奖tab点击
        if (x >= 422 * ratio && x <= (422 * ratio + 164 * ratio) && y >= 110 * ratio && y <= (110 * ratio + 164 * ratio)) {
          //按钮按下音效
          databus.ji_pageindex = 1;
          databus.tip_flase = false;
         databus.tip_success = false;
          this.music.playMusic('btnDown')
          if(databus.battleInfo){//有无大赛判断
            databus.energySysTab = 2;
          }else{
            databus.energySysTab = 3;
            databus.getFriendsList()
          }
        }

        if(databus.battleInfo){//有无大赛判断
          //搜刮tab点击
          if (x >= 605 * ratio && x <= (605 * ratio + 164 * ratio) && y >= 110 * ratio && y <= (110 * ratio + 164 * ratio)) {
            //按钮按下音效
            databus.ji_pageindex = 1;
            databus.tip_flase = false;
            databus.tip_success = false;
            this.music.playMusic('btnDown')
            databus.energySysTab = 3;
            databus.getFriendsList()
            console.log(112)
          }
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
    //动画帧f
    this.f++
    if(this.f % 2 == 0){
      if(databus.exchangeBoxAniTime < 30){
        databus.exchangeBoxAniTime++
      }else{
        // databus.exchangeBoxAni = false
      }
    }
  }

  // 实现游戏帧循环
  loop() {
    this.render(this.ctx)
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)

  }

  //获取精力系统相关
  getEngerySysInfo(){
    this.getBattleInfo()
    this.getPlunderList()
    databus.getFriendsList()
    databus.getSignInfo()


    const battlePoint = wx.getStorageSync('battlePoint')
    if(battlePoint != databus.getNowTimeStr()){
      databus.battlePoint = true
    }

  }

  getBattleInfo() {

    //获取大赛信息
    ajax({
      tradecode: 'sys23',
      apiType: 'user',
      method: 'POST',
      data: {
        openid:wx.getStorageSync('openId')
      },
      success(data) {
        if(JSON.stringify(data.body.info).length > 2){
          databus.battleInfo = data.body.info
          databus.energySysTab = 0
          databus.battleDays = databus.getDurDays(data.body.info.starttime,data.body.info.endtime)//大赛总天数
          databus.battlePastDays = databus.getDurDays(data.body.info.starttime,(new Date()).getTime()) //大赛进行天数
        }
      }
    })

  }

  getPlunderList() {

    //获取搜刮记录
    ajax({
      tradecode: 'sys18',
      apiType: 'user',
      method: 'POST',
      data: {
        openid:wx.getStorageSync('openId')
      },
      success(data) {
        databus.plunderRecord = data.body.infos
      }
    })

  }

  goSign(data) {
    let self = this;
    //签到补签
    ajax({
      tradecode: 'sys20',
      apiType: 'user',
      method: 'POST',
      data: data,
      success(data) {

        self.music.playMusic('passPoint')

        databus.signData = data.body.info;
        databus.energySysModal = 1;
        databus.getSignInfo()
        // if(data.signtype == 1){
        //   databus.energySysModal = 1;
        // }
        // if(data.signtype == 2){
        //   databus.energySysModal = 2;
        // }
      }
    })
  }

  enchangeEngery() {
    //个人精力换取宝箱精力
    ajax({
      tradecode: 'sys17',
      apiType: 'user',
      method: 'POST',
      data: {
        openid:wx.getStorageSync('openId'),
        penrgy: databus.myEnergy
      },
      success(data) {
        // wx.showToast({ title: "成功换取精力啦~", icon:'none'})
        databus.exchangeBoxAni = true
        databus.exchangeBoxAniTime = 0
        setTimeout(()=>{
          databus.getUserInfo()
        },500)
      }
    })
  }

  openBox() {
    let self = this;
    //开箱
    ajax({
      tradecode: 'sys21',
      apiType: 'user',
      method: 'POST',
      data: {
        openid:wx.getStorageSync('openId'),
        version: databus.version
      },
      success(data) {

        self.music.playMusic('passPoint')

        databus.energySysModal = 3
        databus.openBoxData = data.body.info
        databus.boxNum = data.body.info.boxnum
        if(databus.shareflag){
          if(_.random(0, 10) >= (1 - this.sharerate) * 10){
            databus.showOpenBoxAd()
          }
        }
        databus.getUserInfo()
      }
    })

  }
}