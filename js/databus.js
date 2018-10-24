
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
      boardToTOP: 334 * ratio, //棋盘到顶部的距离
      boardToLR: 34 * ratio, //棋盘左右两边间距
      boardInner: 8 * ratio, //棋盘内边框
      piecesMargin: 8 * ratio, //棋子边距
      boardWH: 0, //棋盘宽高
      piecesWH: 0, //棋子宽高
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
        x: 32 * ratio,
        y: 168 * ratio,
        w: 124 * ratio,
        h: 126 * ratio,
      },
      progressEmptyCoordinates: { //空进度条坐标宽高
        x: 237 * ratio,
        y: 265 * ratio,
        w: 360 * ratio,
        h: 52 * ratio,
      },
      progressEmpty2Coordinates: { //空进度条2坐标宽高
        x: 243 * ratio,
        y: 267 * ratio,
        w: 344 * ratio,
        h: 44 * ratio,
      },
      progressFullCoordinates: { //满进度条坐标宽高
        x: 252 * ratio,
        y: 275 * ratio,
        w: 330 * ratio,
        h: 26 * ratio,
      },
      homeCoordinates: { //首页坐标宽高
        x: 44 * ratio,
        y: 1206 * ratio,
        w: 82 * ratio,
        h: 82 * ratio,
      },
      musicCoordinates: { //音乐坐标宽高
        x: 142 * ratio,
        y: 1206 * ratio,
        w: 82 * ratio,
        h: 82 * ratio,
      },
      addStepsCoordinates: { //增加步数坐标宽高
        x: 275 * ratio,
        y: 1125 * ratio,
        w: 144 * ratio,
        h: 142 * ratio,
      },
      colorToolCoordinates: { //彩色道具坐标宽高
        x: 460 * ratio,
        y: 1125 * ratio,
        w: 144 * ratio,
        h: 142 * ratio,
      },
      coinCoordinates: { //金币坐标宽高
        x: 665 * ratio,
        y: 1190 * ratio,
        w: 90 * ratio,
        h: 90 * ratio,
      },
      checkPointCoordinates: { //关卡坐标
        x: 32 * ratio,
        y: 130 * ratio,
        font: 46 * ratio + 'px Arial'
      },
      selfHighScoreCoordinates: { //本轮分数
        x: (uiWidth / 2) * ratio,
        y: 135 * ratio,
        font: 'bold ' + 60 * ratio + 'px Arial'
      },
      // highestScoreCoordinates: { //世界最高分数坐标
      //   x: 235 * ratio,
      //   y: 130 * ratio,
      //   font: 'bold ' + 40 * ratio + 'px Arial'
      // },
      stepsNumCoordinates: { //步数坐标
        x: 92 * ratio,
        y: 230 * ratio,
        font: 'bold ' + 40 * ratio + 'px Arial'
      },
      // stepsTxtCoordinates: { //步数文字坐标
      //   x: 90 * ratio,
      //   y: 230 * ratio,
      //   font: 26 * ratio + 'px Arial'
      // },
      passScoreCoordinates: { //当前过关分数坐标
        x: 560 * ratio,
        y: 300 * ratio,
        font: 24 * ratio + 'px Arial'
      },
      currentScoreCoordinates: { //当前分数坐标
        x: (uiWidth / 2) * ratio,
        y: 248 * ratio,
        font: 'bold ' + 60 * ratio + 'px Arial'
      }
    }
    //棋盘宽高
    this.GameUI.boardWH = canvas.width - 2 * this.GameUI.boardToLR
    //棋子宽高
    this.GameUI.piecesWH = ((canvas.width - 2 * this.GameUI.boardToLR - 2 * this.GameUI.boardInner - (this.rowNum - 1) * this.GameUI.piecesMargin) / this.rowNum)//棋子宽高

    
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

  /**
   * 游戏页数据初始化
   */
  gameInfoReset() {
    this.combo = 0 //combo数
    this.prevSelectBlocks = [] //上次爆炸棋子数组
    this.selectBlocks = [] //连线棋子数组
    this.selfHighScore = 0 //个人历史最高分
    this.highestScore = 0 //世界最高分
    this.isguide = 0 //是否需要引导 1 需要

    this.score = 0 //每次开始默认分数、当前关卡获得分数
    this.gameScore = 0 //本轮游戏总分
    this.checkPoint = 1 //当前关卡  默认为1
    this.passScore = 0 //当前关卡过关分数
    this.gameId = '' //本轮游戏id
    this.steps = 20 //总步数
    this.useSteps = 0 //使用步数
    this.stagegold = 0 //过关所得金币
    this.gamegold = 0 //本次游戏获得总金币数
    this.rewardstep = 0 //过关奖励步数
    this.piecesType = 0 //棋子种类
    this.piecesLevelProbblt = { //棋子对应等级的生成概率
      piecesLevel: [],
      piecesProbblt: []
    }
    this.piecesLevelScore = {//棋子对应等级的分数
      level1: 1,
      level2: 2,
      level3: 3
    }

  }
}

