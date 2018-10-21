import Pool from './base/pool'

let instance
let uiWidth = 828;
let ratio = canvas.width / uiWidth //设计稿宽度
/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance)
      return instance

    instance = this
    this.pool = new Pool()
    this.reset()
  }

  reset() {
    this.userinfo = null;//用户的头像等信息
    this.pownstate = 3 //是否授权 1同意 2.拒绝 3.未询问
    this.mt = 210; //头像到顶部的距离 
    this.br = 40; //头像的半径 
    this.nmt = 321; //置灰状态下按钮到顶部的距离 
    this.pmt = 361; //授权状态下按钮到顶部的距离
    this.nb = 20; //置灰状态下按钮间距
    this.toptxt = {
      w: 718 * ratio,
      h: 260 * ratio,
      x: ((828 - 718) / 2 + 10) * ratio,
      y: 20 * ratio
    }
    this.backbtn = {
      w: 96 * ratio,
      h: 96 * ratio,
      x: 36 * ratio,
      y: 36 * ratio
    }
    this.pagesize = {
      x: 20 * ratio,
      y: 250 * ratio,
      w: (828 - 40) * ratio,
      h: (canvas.height / canvas.width) * (828 - 40) * ratio,
    }
    this.bgpic = {
      w: 828 * ratio,
      h: 1427 * ratio,
    }
    this.share_prev = {
      x: 60 * ratio,
      y: 1310 * ratio,
      w: 258 * ratio,
      h: 130 * ratio
    }
    this.share_next = {
      x: 505 * ratio,
      y: 1310 * ratio,
      w: 258 * ratio,
      h: 130 * ratio
    }

    this.score = 0 //每次开始默认分数
    this.steps = 13 //剩余步数
    this.combo = 0 //combo数
    this.checkPoint = 1 //当前关卡  默认为1
    this.passScore = 100 //当前关卡过关分数
    this.selfHighScore = 0 //个人历史最高分
    this.highestScore = 0 //世界最高分
    this.piecesType = 3 //棋子种类
    this.piecesLevelProbblt = { //棋子对应等级的生成概率
      piecesLevel: ['level1', 'level2', 'level3'],
      piecesProbblt: [0.3, 0.3, 0.3]
    }
    this.piecesLevelScore = { //棋子对应等级的分数
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
    //游戏页的UI值（比如：宽高，边距）
    this.GameUI = {
      boardToTOP: 475 * ratio, //棋盘到顶部的距离
      boardToLR: 75 * ratio, //棋盘左右两边间距
      boardInner: 20 * ratio, //棋盘内边框
      piecesMargin: 12 * ratio, //棋子边距
      boardWH: 0, //棋盘宽高
      piecesWH: 0, //棋子宽高
      levelWH: 30 * ratio, //棋子等级标志宽高
      cupCoordinates: { //奖杯坐标宽高
        x: 20 * ratio,
        y: 44 * ratio,
        w: 110 * ratio,
        h: 100 * ratio
      },
      scoreBgCoordinates: { //积分背景坐标宽高
        x: 128 * ratio,
        y: 85 * ratio,
        w: 220 * ratio,
        h: 60 * ratio,
      },
      stepsCoordinates: { //步数坐标宽高
        x: 658 * ratio,
        y: 74 * ratio,
        w: 124 * ratio,
        h: 100 * ratio,
      },
      progressEmptyCoordinates: { //空进度条坐标宽高
        x: 252 * ratio,
        y: 214 * ratio,
        w: 300 * ratio,
        h: 28 * ratio,
      },
      progressFullCoordinates: { //满进度条坐标宽高
        x: 254 * ratio,
        y: 216 * ratio,
        w: (this.score / this.passScore) * 296 * ratio,
        h: 24 * ratio,
      },
      fruitCoordinates: { //水果icon坐标宽高
        x: 184 * ratio,
        y: 273 * ratio,
        w: 467 * ratio,
        h: 186 * ratio,
      },
      homeCoordinates: { //首页坐标宽高
        x: 75 * ratio,
        y: 1215 * ratio,
        w: 74 * ratio,
        h: 74 * ratio,
      },
      musicCoordinates: { //音乐坐标宽高
        x: 175 * ratio,
        y: 1215 * ratio,
        w: 74 * ratio,
        h: 74 * ratio,
      },
      addStepsCoordinates: { //增加步数坐标宽高
        x: 300 * ratio,
        y: 1160 * ratio,
        w: 152 * ratio,
        h: 152 * ratio,
      },
      colorToolCoordinates: { //彩色道具坐标宽高
        x: 475 * ratio,
        y: 1160 * ratio,
        w: 152 * ratio,
        h: 152 * ratio,
      },
      coinCoordinates: { //金币坐标宽高
        x: 665 * ratio,
        y: 1190 * ratio,
        w: 90 * ratio,
        h: 90 * ratio,
      },
      checkPointCoordinates: { //关卡坐标
        x: (uiWidth / 2) * ratio,
        y: 195 * ratio,
        font: 24 * ratio + 'px Arial'
      },
      selfHighScoreCoordinates: { //个人最高分数坐标
        x: 40 * ratio,
        y: 195 * ratio,
        font: 26 * ratio + 'px Arial'
      },
      highestScoreCoordinates: { //世界最高分数坐标
        x: 235 * ratio,
        y: 130 * ratio,
        font: 'bold ' + 40 * ratio + 'px Arial'
      },
      stepsNumCoordinates: { //步数坐标
        x: 720 * ratio,
        y: 125 * ratio,
        font: 'bold ' + 40 * ratio + 'px Arial'
      },
      stepsTxtCoordinates: { //步数文字坐标
        x: 720 * ratio,
        y: 160 * ratio,
        font: 26 * ratio + 'px Arial'
      },
      passScoreCoordinates: { //当前过关分数坐标
        x: 585 * ratio,
        y: 236 * ratio,
        font: 24 * ratio + 'px Arial'
      },
      currentScoreCoordinates: { //当前分数坐标
        x: (uiWidth / 2) * ratio,
        y: 236 * ratio,
        font: 24 * ratio + 'px Arial'
      }
    }
    //棋盘宽高
    this.GameUI.boardWH = canvas.width - 2 * this.GameUI.boardToLR
    //棋子宽高
    this.GameUI.piecesWH = ((canvas.width - 2 * this.GameUI.boardToLR - 2 * this.GameUI.boardInner - this.rowNum * this.GameUI.piecesMargin) / this.rowNum) //棋子宽高
  }

  /**
   * 页面状态变化
   */
  pageStateUpdate(page) {
    this.pageState[page] = true
    //重置其他页面状态
    for (var i in this.pageState) {
      if (i != page) {
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
      if (random <= factor) {
        hasLevel = true
        return arr1[i];
      }
    };
    if (!hasLevel) {
      this.getPiecesLevel()
    }
  }
}