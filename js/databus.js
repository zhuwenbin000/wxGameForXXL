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
    this.pownstate = 3 //是否授权 1同意 2.拒绝 3.未询问
    this.mt = 210; //头像到顶部的距离
    this.br = 40; //头像的半径
    this.nmt = 321; //置灰状态下按钮到顶部的距离
    this.pmt = 361;//授权状态下按钮到顶部的距离
    this.nb = 20; //置灰状态下按钮间距
   


    this.rowNum = 6
    this.colNum = 6
    this.pageState = {
      homePage: false,
      gamePage: false,
      friendsRank: false,
      worldRank: false,
     
    }
    this.frame      = 0
    this.score      = 0
    this.bullets    = []
    this.enemys     = []
    this.animations = []
    this.gameOver   = false
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
