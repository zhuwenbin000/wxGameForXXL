import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.scene      = 0
    this.frame      = 0
    this.score      = 0
    this.bullets    = []
    this.enemys     = []
    this.animations = []
    this.gameOver   = false
    this.pageState = {
      homePage: false,
      gamePage: false,
      friendsRank: false,
      worldRank: false
    }
  }

  /**
   * 页面状态变化
   */
  pageStateUpdate(page) {
    
    this.pageState[page] = true

    //重置其他页面状态
    for (var i in this.pageState) {
      if(i != page){
        this.pageState[i] = false
      }
    }

  }

  
}
