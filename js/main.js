import HomePage from './pages/homePage/index'
import GamePage from './pages/gamePage/index'
import FriendsRank from './pages/friendsRank/index'
import WorldRank from './pages/worldRank/index'
import DataBus from './databus'

import DataStore from '/base/helper';
let ctx = canvas.getContext('2d')
let databus = new DataBus()
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const ratio = wx.getSystemInfoSync().pixelRatio;
/**
 * 根据场景id渲染页面
 */
export default class Main {
  constructor() {
    canvas.width = screenWidth * ratio;
    canvas.height = screenHeight * ratio;
    ctx.scale(ratio, ratio); //加上这个图片清晰的一批
    let openDataContext = wx.getOpenDataContext();
    let sharedCanvas = openDataContext.canvas;
    sharedCanvas.width = screenWidth * ratio;
    sharedCanvas.height = screenHeight * ratio;
    DataStore.getInstance().sharedCanvas = sharedCanvas;
    DataStore.getInstance().ctx = ctx;
    this.renderPage()
  }

  renderPage() {
    let self = this
    let pageState = databus.pageState
    self.homePage = new HomePage(ctx)
    self.gamePage = new GamePage(ctx)
    self.friendsRank = new FriendsRank(ctx)
    self.worldRank = new WorldRank(ctx)
    // databus.scene = 2 //好友排行测试用
    // databus.scene = 1 //游戏页测试用
   
    //每隔50毫秒判断一次场景是否发生变化
    let timeLine = setInterval(() => {
      
      //首页
      if (databus.scene == 0) {
        if (!pageState.homePage) {
          databus.pageStateUpdate('homePage')
          self.homePage.restart(ctx)
        }
      }

      //游戏页
      // console.log(databus.scene)
      if (databus.scene == 1) {
        if (!pageState.gamePage) {
          
          databus.pageStateUpdate('gamePage')
          self.gamePage.restart(ctx)
        }
      }

      //好友排行榜
      if (databus.scene == 2) {
        if (!pageState.friendsRank) {
          databus.pageStateUpdate('friendsRank')
          self.friendsRank.restart(ctx)
        }
      }

      //世界排行榜
      if (databus.scene == 3) {
        if (!pageState.worldRank) {
          databus.pageStateUpdate('worldRank')
          self.worldRank.restart(ctx)
        }
      }
    }, 50)
  }
}
