import HomePage from './pages/homePage/index'
import GamePage from './pages/gamePage/index'
import FriendsRank from './pages/friendsRank/index'
import WorldRank from './pages/worldRank/index'
import DataBus from './databus'
import Music from './music/music'
import { ajax, userLogin } from '/base/ajax'

import DataStore from '/base/helper';
let ctx = canvas.getContext('2d')
let databus = new DataBus()
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const ratio = wx.getSystemInfoSync().pixelRatio;
//游戏页离屏canvas
// let gameCanvas = wx.createCanvas()
// let gameCon = gameCanvas.getContext('2d')
/**
 * 根据场景id渲染页面
 */
export default class Main {
  constructor() {
    var me = this;
    canvas.width = screenWidth * ratio;
    canvas.height = screenHeight * ratio;
    ctx.scale(ratio, ratio); //加上这个图片清晰的一批
    
    // gameCanvas.width = screenWidth * ratio;
    // gameCanvas.height = screenHeight * ratio;

    let openDataContext = wx.getOpenDataContext();
    let sharedCanvas = openDataContext.canvas;
    sharedCanvas.width = screenWidth * ratio;
    sharedCanvas.height = screenHeight * ratio;
    DataStore.getInstance().sharedCanvas = sharedCanvas;
    DataStore.getInstance().ctx = ctx;
    // DataStore.getInstance().gameCanvas = gameCanvas;

    const res = wx.getLaunchOptionsSync()
    if(res && res.query && res.query.scene){
      wx.setStorageSync('fatherId', res.query.scene)
    }

    const scene = res && res.scene

    if(scene.length == 32){
      wx.setStorageSync('fatherId', res.scene)
    }

    if(res && res.query && res.query.fatherId){
      wx.setStorageSync('fatherId', res.query.fatherId)
    }

    let loginflag = wx.getStorageSync('loginflag')

    if (!loginflag){
      userLogin({
        callback:()=>{
          this.getBaseInfo()
        }
      })
    } else {
      this.getBaseInfo()
    }

    const archiveData = wx.getStorageSync('archiveData')
    if(JSON.stringify(archiveData).length > 2){
      databus.archiveState = true
    }
  }
  renderPage() {
    let self = this
    let pageState = databus.pageState
    self.homePage = new HomePage(ctx)
    self.gamePage = new GamePage(ctx)
    self.friendsRank = new FriendsRank(ctx)
    self.worldRank = new WorldRank(ctx)
    self.music = new Music()
   
    //每隔50毫秒判断一次场景是否发生变化
    let timeLine = setInterval(() => {
      //首页
      if (databus.scene == 0) {
        if (!pageState.homePage) {
          databus.pageStateUpdate('homePage')
          self.homePage.restart(ctx)
        }
        if (self.music.indexBgmAudio.paused && databus.musicBg == true) self.music.indexBgmAudio.play()
      }

      //游戏页
      // console.log(databus.scene)
      if (databus.scene == 1) {
        if (!pageState.gamePage) {
          databus.pageStateUpdate('gamePage')
          if(databus.showRule){
            //展示规则页
            databus.gameState = 8
            //首次进入规则页
            databus.firstRule = true
          }else{
            databus.gameState = 10
          }
          // self.gamePage.restart(gameCon,ctx,gameCanvas)
          self.gamePage.restart(ctx)
        }
        if (self.music.gameBgmAudio.paused && databus.musicBg == true) self.music.gameBgmAudio.play()
      }

      //好友排行榜
      if (databus.scene == 2) {
        if (!pageState.friendsRank) {
          databus.pageStateUpdate('friendsRank')
          self.friendsRank.restart(ctx)
        }
        
        if (self.music.indexBgmAudio.paused && databus.musicBg == true) self.music.indexBgmAudio.play()
      }

      //世界排行榜
      if (databus.scene == 3) {
        if (!pageState.worldRank) {
          databus.pageStateUpdate('worldRank')
          self.worldRank.restart(ctx)
        }
        
        if (self.music.indexBgmAudio.paused && databus.musicBg == true) self.music.indexBgmAudio.play()
      }
    }, 50)
  }

  getBaseInfo() {
    var me = this;
    //分享文案
    ajax({
      tradecode: 'sys05',
      apiType: 'user',
      method: 'POST',
      success(data) {
        databus.shareConfig = data.body.share;
      }
    })

    //版本号
    ajax({
      tradecode: 'sys06',
      apiType: 'version',
      method: 'POST',
      data: {
        'version': databus.version,//版本号
      },
      success(data) {
        const shareflag = data.body.version.shareflag == '1' ? false : true
        databus.shareflag = shareflag
        if(shareflag){
          databus.homeState = 2
        }
      }
    })

    const openid = wx.getStorageSync('openId')
    //活动信息
    openid && ajax({
      tradecode: 'sys02',
      apiType: 'user',
      method: 'POST',
      success(data) {
        databus.activityData = data.body.activity
      }
    })

    wx.getSetting({
      success: function (res) {
        var authSetting = res.authSetting
        if (authSetting['scope.userInfo'] === true) {
          // 用户已授权，可以直接调用相关 API
          wx.getUserInfo({ //获取用户基本信息
            success: function (res) {
              databus.userinfo = res;
              me.renderPage() //开始判断路由
            }
          })
          databus.pownstate = 1

        } else if (authSetting['scope.userInfo'] === false) {
          databus.pownstate = 2
          me.renderPage()
          // 用户已拒绝授权
        } else {
          databus.pownstate = 3
          me.renderPage()
          // 未询问过用户授权，
        }
      }
    })

    wx.getStorage({
      key: 'showRule',
      success(res) {
        if (res.data == 'false') {
          databus.showRule = false
        }
      }
    })
  }
}
