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
    this.score = 0 //每次开始默认分数
    this.piecesType = 3 //棋子种类
    this.mt = 210; //头像到顶部的距离
    this.br = 40; //头像的半径
    this.nmt = 321; //置灰状态下按钮到顶部的距离
    this.pmt = 361;//授权状态下按钮到顶部的距离
    this.nb = 20; //置灰状态下按钮间距
    this.piecesLevelProbblt = { //棋子对应等级的生成概率
      piecesLevel: ['level1', 'level2', 'level3'],
      piecesProbblt: [1 / 3, 1 / 3, 1 / 3]
    }
    this.piecesLevelScore = {//棋子对应等级的分数
      level1: 1,
      level2: 2,
      level3: 3
    }
    this.scene = 0 //场景id
    this.rowNum = 6 //行数
    this.colNum = 6 //列数
    this.pageState = { //页面状态
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

  /**
   * 根据配置棋子level随机生成函数
   */
  getPiecesLevel() {
    var arr1 = this.piecesLevelProbblt.piecesLevel;
    var arr2 = this.piecesLevelProbblt.piecesProbblt;
    var sum = 0,
      factor = 0,
      hasLevel = false,
      random = Math.random();

    for (var i = arr2.length - 1; i >= 0; i--) {
      sum += arr2[i]; // 统计概率总和
    };
    random *= sum; // 生成概率随机数
    for (var i = arr2.length - 1; i >= 0; i--) {
      factor += arr2[i];
      if (random <= factor)
        hasLevel = true
        return arr1[i];
    };
    if(!hasLevel){
      this.getPiecesLevel()
    }
  }
}
