import HomePage from './pages/homePage/index'
import GamePage from './pages/gamePage/index'
import FriendsRank from './pages/friendsRank/index'
import WorldRank from './pages/worldRank/index'
import DataBus from './databus'
import helper from './base/helper'
let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 根据场景id渲染页面
 */
export default class Main {
  constructor() {
    let state = helper.getsetting()
    Promise.all([
      helper.getsetting()
    ]).then((options) => {
      databus.pownstate = options[0] ////是否授权 1同意 2.拒绝 3.未询问
      this.renderPage()
    })
  }
  renderPage() {
    let self = this
    let pageState = databus.pageState
    self.homePage = new HomePage(ctx)
    self.gamePage = new GamePage(ctx)
    self.friendsRank = new FriendsRank(ctx)
    self.worldRank = new WorldRank(ctx)
  
   
    //每隔50毫秒判断一次场景是否发生变化
    let timeLine = setInterval(() => {
<<<<<<< HEAD
      console.log(111)
=======
      
>>>>>>> e0ddf579ecbd8b3376ef549d8e2a3297f86bc514
      //首页
      if (databus.scene == 0) {
        if (!pageState.homePage) {
          databus.pageStateUpdate('homePage')
          self.homePage.restart(ctx)
        }
      }

      //游戏页
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

<<<<<<< HEAD
    }, 50)
=======
    },50)

>>>>>>> e0ddf579ecbd8b3376ef549d8e2a3297f86bc514
  }

}
