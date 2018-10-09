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
    this.scene = 0 //场景id 0：首页，2：游戏页，3：好友排行榜，4：世界排行榜
    this.rowNum = 6 //行数
    this.colNum = 6 //列数
    this.pageState = { //当前页面状态
      homePage: false,
      gamePage: false,
      friendsRank: false,
      worldRank: false,
     
    }
    this.pownstate = 3 //是否授权 1同意 2.拒绝 3.未询问
    this.selectBlocks = [] //当前连线的砖块
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
