import { ajax } from './base/ajax'
import Pool from './base/pool'

let instance
let uiWidth = 828;
let uiWidth2 = 1242;//第二版的宽度
let ratio = canvas.width / uiWidth //设计稿宽度
let ratio2 = canvas.width / uiWidth2 //设计稿宽度

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance)
      return instance

    instance = this
    this.pool = new Pool()
    this.gameTop = 0 * ratio
    this.gameEndTop = 0 * ratio

    //创建游戏视频
    this.createVideoAd()
    //创建存档视频
    this.creatAarchiveVideoAd()
    //创建crazy视频
    this.creatCrazyVideoAd()
    //创建sign视频
    this.creatSignVideoAd()

    //判断是否是哪种设备 
    wx.getSystemInfo({
      success: res => {
        // console.log('手机信息res'+res.model)
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          //适配iphonex 刘海屏
          this.gameTop = 80 * ratio
          this.gameEndTop = 80 * ratio
        } else if (modelmes.search('iPhone 5') != -1) {
          //适配iphone 5s
          // this.offsetTop = 60 * ratio
        } else if (modelmes.search('vivo Y85') != -1) {
          //适配vivo Y85
          this.gameTop = 80 * ratio
          this.gameEndTop = 80 * ratio
        } else if (modelmes.search('huawei P20') != -1) {
          //适配华为P20
          this.gameTop = 80 * ratio
          this.gameEndTop = 80 * ratio
        }
        this.reset()
      }
    })

  }

  reset() {
    this.clickTimes = 1;//点击次数
    this.getScore = 0;
    this.tip_success = false
    this.tip_flase = false
    this.tip_loan = false
    this.ji_pageindex = 1
    this.ji_totlePage = 1;
    this.jl_list = []
    this.avatarList = []
    this.nextState = true;
    this.provState = true;
    this.shareState = true;
    this.frinendCount = 18;//搜刮好友数量
    this.active_state = false;//活动按钮状态
    this.playbtn_state = false;//开始游戏按钮状态
    this.sharebtn_state = false;//分享按钮状态
    this.provbtn_state = false;//上一页按钮状态
    this.nextbtn_state = false;//上一页按钮状态
    this.friend_back_state = false;//排行榜返回按钮状态
    this.laterTime = 100;//按钮延时时间
    this.friendbtn_state = false;//好友排行按钮状态
    this.gameClubbutton = null;//游戏圈按钮
    this.userinfo = null;//用户的头像等信息
    this.pownstate = 3 //是否授权 1同意 2.拒绝 3.未询问
    this.bestscore = 0;//最高分数
    this.mt = 610; //头像到顶部的距离 
    this.br = 80; //头像的半径 
    this.nmt = 900; //置灰状态下按钮到顶部的距离 
    this.pmt = 361; //授权状态下按钮到顶部的距离
    this.nb = 10; //置灰状态下按钮间距
    this.toptxt = {
      w: 718 * ratio,
      h: 260 * ratio,
      x: ((828 - 718) / 2 + 10) * ratio,
      y: 20 * ratio
    }
    this.backbtn = {
      w: 96 * ratio,
      h: 96 * ratio,
      x: 16 * ratio,
      y: 20 * ratio
    }
    this.shareProv = {
      x: 60 * ratio,
      y: 1320 * ratio,
      w: 258 * ratio,
      h: 130 * ratio
    }
    this.shareNext = {
      x: 500 * ratio,
      y: 1320 * ratio,
      w: 258 * ratio,
      h: 130 * ratio
    }

    this.pagesize = {
      x: 20 * ratio,
      y: 250 * ratio,
      w: (828 - 40) * ratio,
      h: (canvas.height / canvas.width) * (828 - 40) * ratio,
    }
    this.bgpic = {
      w: 828 * ratio,
      h: 1472 * ratio,
    }
    this.friendbtn = {
      x: 65 * ratio2,
      y: 188 * ratio2,
      w: 382 * ratio2,
      h: 165 * ratio2
    }
    this.worldbtn = {
      x: 440 * ratio2,
      y: 188 * ratio2,
      w: 382 * ratio2,
      h: 104 * ratio2
    }
    this.friendbtn_world = {
      x: 65 * ratio2,
      y: 188 * ratio2,
      w: 382 * ratio2,
      h: 104 * ratio2
    }
    this.worldbtn_world = {
      x: 440 * ratio2,
      y: 188 * ratio2,
      w: 382 * ratio2,
      h: 165 * ratio2
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
    this.gameendbanner = null //结算页banner
    this.gameendbannerObj = null
    this.gameendbannerurl = null //结算页跳转地址
    this.isEndBanner = 0 //结算页是否显示大赛banner 1是0否 0显示微信广告banner
    this.sharetime = 0 //有效分享的最短时间
    this.battleDays = 0 //大赛总天数
    this.battlePastDays = 0 //大赛进行天数
    this.battleInfo = null //大赛信息
    this.homeState = 1 //首页状态变化 2banner弹框 3存档弹框 4精力系统
    this.energySysTab = 1 //精力系统tab顺序
    this.energySysModal = 0 //精力系统tab弹框状态
    this.battlePoint = false //大赛红点
    this.signPoint = false //签到红点
    this.lotteryPoint = false //抽奖红点
    this.plunderPoint = false //搜刮红点
    //签到部分
    this.signXY = [ //签到各个位置坐标
      {
        signBg: { x: 65, y: 300 },
        week: { x: 145, y: 315 },
        rewardBg: { x: 75, y: 350 },
        state2: { x: 140, y: 550 },
        state3: { x: 125, y: 550 },
      },
      {
        signBg: { x: 305, y: 300 },
        week: { x: 385, y: 315 },
        rewardBg: { x: 315, y: 350 },
        state2: { x: 380, y: 550 },
        state3: { x: 365, y: 550 },
      },
      {
        signBg: { x: 545, y: 300 },
        week: { x: 625, y: 315 },
        rewardBg: { x: 555, y: 350 },
        state2: { x: 620, y: 550 },
        state3: { x: 605, y: 550 },
      },
      {
        signBg: { x: 65, y: 610 },
        week: { x: 145, y: 625 },
        rewardBg: { x: 75, y: 660 },
        state2: { x: 140, y: 860 },
        state3: { x: 125, y: 860 },
      },
      {
        signBg: { x: 305, y: 610 },
        week: { x: 385, y: 625 },
        rewardBg: { x: 315, y: 660 },
        state2: { x: 380, y: 860 },
        state3: { x: 365, y: 860 },
      },
      {
        signBg: { x: 545, y: 610 },
        week: { x: 625, y: 625 },
        rewardBg: { x: 555, y: 660 },
        state2: { x: 620, y: 860 },
        state3: { x: 605, y: 860 },
      },
      {
        signBg: { x: 65, y: 925 },
        week: { x: 145, y: 940 },
        rewardBg: { x: 75, y: 975 },
        state2: { x: 140, y: 1175 },
        state3: { x: 125, y: 1175 },
      },
    ];
    this.daysinfo = [] //签到页数据
    this.signData = {} //当前签到奖励
    this.signType = 0 //补签条件 0金币1分享2视频
    this.onMusic = true
    this.sharerate = 0
    this.nogoldsharerate = 0
    this.boxbannerrate = 0
    //抽奖部分
    this.plunderRecord = []//搜刮记录
    this.boxNum = 0 //拥有箱子的数量
    this.myEnergy = 0 //个人精力
    this.boxEnergy = 0 //箱子精力
    this.wxaqrcodeurl = '' //个人小游戏二维码地址
    this.wxaqrcodeurlObj = null
    this.boxExchangeTime = 0 //上次换取宝箱时间
    this.canExchangeBox = false //上次换取宝箱时间
    this.boxOpenStart = false //开箱状态 
    this.boxOpenClickNum = 0 //当前开箱次数
    this.boxOpenNeedClickNum = 0 //需要开箱总次数
    this.openBoxData = {} //开箱结果
    this.exchangeBoxAni = false //是否换取宝箱动画
    this.exchangeBoxAniTime = 0 //换取动画帧

    this.energySysLoad = false //精力系统加载状态
    this.version = '0.0.2.5';
    this.shareflag = false; //true为非审核模式
    this.showRule = true;
    this.scene = 0 //场景id
    this.rowNum = 6 //行数
    this.colNum = 6 //列数
    this.pageState = { //页面状态
      homePage: false,
      gamePage: false,
      friendsRank: false,
      worldRank: false,
    }
    this.gameState = 0 //1:游戏中2:游戏结束3:音乐弹框4:彩色道具弹框5:增加步数弹框,6::返回首页,7:游戏过关,8:规则弹框
    this.gameEndState = 0 //0结束 1战报
    this.musicBg = true //背景音默认开
    this.musicSound = true //音效默认开
    this.musicBgState = true //背景音状态
    this.musicSoundState = true //音效默状态
    this.musicBgChange = false //是否结束音效改变
    this.shareConfig = {} //分享配置
    this.btnPlus = 0 //按钮变大效果
    this.fingerAniTime = 0 //手指滑动动画
    this.firstRule = false //首次进入规则页
    // this.offsetTop = 0 * ratio //游戏页上移高度
    this.isGameCtxScale = true //游戏页是否放大
    this.bannerOver = false //是否需要显示banner
    this.isVideoing = false  //视频是否在播放中
    this.archiveState = false //是否有存档
    this.archiveData = {} //存档数据
    this.activityData = null //活动数据
    //游戏页的UI值（比如：宽高，边距）
    this.GameUI = {
      boardToTOP: 254 * ratio + this.gameTop, //棋盘到顶部的距离
      boardToLR: 34 * ratio, //棋盘左右两边间距
      boardInner: 8 * ratio, //棋盘内边框
      piecesMargin: 8 * ratio, //棋子边距
      boardWH: 0, //棋盘宽高
      piecesWH: 0, //棋子宽高
      ruleCoordinates: { //规则坐标宽高
        x: 15 * ratio,
        y: 830 * ratio + this.gameTop,
        w: 180 * ratio,
        h: 74 * ratio
      },
      scoreBgCoordinates: { //积分背景坐标宽高
        x: 128 * ratio,
        y: 85 * ratio,
        w: 220 * ratio,
        h: 60 * ratio,
      },
      stepsCoordinates: { //步数坐标宽高
        x: 32 * ratio,
        y: 110 * ratio + this.gameTop,
        w: 124 * ratio,
        h: 126 * ratio,
      },
      progressEmptyCoordinates: { //空进度条坐标宽高
        x: 237 * ratio,
        y: 185 * ratio + this.gameTop,
        w: 360 * ratio,
        h: 52 * ratio,
      },
      progressEmpty2Coordinates: { //空进度条2坐标宽高
        x: 252 * ratio,
        y: 195 * ratio + this.gameTop,
        w: 330 * ratio,
        h: 26 * ratio,
      },
      progressFullCoordinates: { //满进度条坐标宽高
        x: 252 * ratio,
        y: 195 * ratio + this.gameTop,
        w: 330 * ratio,
        h: 26 * ratio,
      },
      homeCoordinates: { //首页坐标宽高
        x: 15 * ratio,
        y: 910 * ratio + this.gameTop,
        w: 180 * ratio,
        h: 74 * ratio
      },
      musicCoordinates: { //音乐坐标宽高
        x: 15 * ratio,
        y: 990 * ratio + this.gameTop,
        w: 180 * ratio,
        h: 74 * ratio
      },
      setCoordinates: { //设置坐标宽高
        x: 45 * ratio,
        y: 1070 * ratio + this.gameTop,
        w: 96 * ratio,
        h: 96 * ratio,
      },
      addStepsCoordinates: { //增加步数坐标宽高
        x: 180 * ratio,
        y: 1060 * ratio + this.gameTop,
        w: 108 * ratio,
        h: 108 * ratio,
      },
      addStepsPointCoordinates: { //增加步数红点坐标宽高
        x: 245 * ratio,
        y: 1044 * ratio + this.gameTop,
        w: 52 * ratio,
        h: 52 * ratio,
      },
      addStepsUserCoordinates: { //增加步数拥有数量坐标宽高
        x: 270 * ratio,
        y: 1080 * ratio + this.gameTop,
        font: 24 * ratio + 'px Arial'
      },
      colorToolCoordinates: { //彩色道具坐标宽高
        x: 325 * ratio,
        y: 1060 * ratio + this.gameTop,
        w: 108 * ratio,
        h: 108 * ratio,
      },
      colorToolPointCoordinates: { //彩色道具红点坐标宽高
        x: 395 * ratio,
        y: 1044 * ratio + this.gameTop,
        w: 52 * ratio,
        h: 52 * ratio,
      },
      colorToolUserCoordinates: { //彩色道具拥有数量坐标宽高
        x: 420 * ratio,
        y: 1080 * ratio + this.gameTop,
        font: 24 * ratio + 'px Arial'
      },
      saveToolCoordinates: { //存档道具坐标宽高
        x: 475 * ratio,
        y: 1060 * ratio + this.gameTop,
        w: 108 * ratio,
        h: 108 * ratio,
      },
      coinCoordinates: { //金币坐标宽高
        x: 630 * ratio,
        y: 1039 * ratio + this.gameTop,
        w: 182 * ratio,
        h: 150 * ratio,
      },
      coinNumCoordinates: { //金币数量坐标宽高
        x: 715 * ratio,
        y: 1150 * ratio + this.gameTop,
        font: 24 * ratio + 'px Arial'
      },
      checkPointCoordinates: { //关卡坐标
        x: 32 * ratio,
        y: 72 * ratio + this.gameTop,
        font: 46 * ratio + 'px Arial'
      },
      selfHighScoreCoordinates: { //本轮分数
        x: (uiWidth / 2) * ratio,
        y: 77 * ratio + this.gameTop,
        font: 'bold ' + 60 * ratio + 'px Arial'
      },
      // highestScoreCoordinates: { //世界最高分数坐标
      //   x: 235 * ratio,
      //   y: 130 * ratio,
      //   font: 'bold ' + 40 * ratio + 'px Arial'
      // },
      stepsNumCoordinates: { //步数坐标
        x: 92 * ratio,
        y: 172 * ratio + this.gameTop,
        font: 'bold ' + 40 * ratio + 'px Arial'
      },
      // stepsTxtCoordinates: { //步数文字坐标
      //   x: 90 * ratio,
      //   y: 230 * ratio,
      //   font: 26 * ratio + 'px Arial'
      // },
      passScoreCoordinates: { //当前过关分数坐标
        x: 560 * ratio,
        y: 220 * ratio + this.gameTop,
        font: 24 * ratio + 'px Arial'
      },
      currentScoreCoordinates: { //当前分数坐标
        x: (uiWidth / 2) * ratio,
        y: 168 * ratio + this.gameTop,
        font: 'bold ' + 60 * ratio + 'px Arial'
      },
      getScoreCoordinates: { //游戏结束得分
        x: 14 * ratio,
        y: 150 * ratio + this.gameEndTop,
        w: 800 * ratio,
        h: 482 * ratio,
      },
      newRecordCoordinates: { //游戏结束新纪录
        x: 560 * ratio,
        y: 240 * ratio + this.gameEndTop,
        w: 278 * ratio,
        h: 224 * ratio,
      },
      tipsCoordinates: { //游戏结束提示
        x: 68 * ratio,
        y: 676 * ratio + this.gameEndTop,
        w: 692 * ratio,
        h: 248 * ratio,
      },
      shareCoordinates: { //游戏结束分享
        x: (uiWidth - 318) / 2 * ratio,
        y: 790 * ratio + this.gameEndTop,
        w: 318 * ratio,
        h: 120 * ratio,
      },
      lookVideoCoordinates: { //游戏结束看视频
        // x: 425 * ratio,
        // y: 950 * ratio,
        // w: 318 * ratio,
        // h: 120 * ratio,
        x: (uiWidth - 318) / 2 * ratio,
        y: 790 * ratio + this.gameEndTop,
        w: 318 * ratio,
        h: 120 * ratio,
      },
      indexCoordinates: { //游戏结束首页
        x: 95 * ratio,
        y: 1070 * ratio + this.gameEndTop,
        w: 166 * ratio,
        h: 166 * ratio,
      },
      tryAgainCoordinates: { //游戏结束再来一局
        x: 300 * ratio,
        y: 1055 * ratio + this.gameEndTop,
        w: 496 * ratio,
        h: 200 * ratio,
      },
      battleIconCoordinates: { //战报icon
        x: 120 * ratio,
        y: 940 * ratio + this.gameEndTop,
        w: 110 * ratio,
        h: 110 * ratio,
      },
      addEngCoordinates: { //增加精力
        x: 315 * ratio,
        y: 940 * ratio + this.gameEndTop,
        w: 166 * ratio,
        h: 106 * ratio,
      },
      addEngNumCoordinates: { //增加精力数字
        x: 410 * ratio,
        y: 1030 * ratio + this.gameEndTop,
        font: 36 * ratio + 'px Arial'
      },
      stageScoreCoordinates: { //游戏结束分数
        x: 325 * ratio,
        y: 250 * ratio + this.gameEndTop,
        font: 'bold ' + 40 * ratio + 'px Arial'
      },
      avatarCoordinates: { //游戏结束头像
        x: 105 * ratio,
        y: 90 * ratio + this.gameEndTop,
        r: 95 * ratio,//头像的半径
      },
      userNameCoordinates: { //游戏结束昵称
        x: 325 * ratio,
        y: 165 * ratio + this.gameEndTop,
        font: 'bold ' + 40 * ratio + 'px Arial'
      },
      bestScoreCoordinates: { //游戏结束最高得分
        x: (uiWidth / 2) * ratio,
        y: 530 * ratio + this.gameEndTop,
        font: 'bold ' + 55 * ratio + 'px Arial'
      },
      preScoreCoordinates: { //预得分
        x: (uiWidth / 2 + 40) * ratio,
        y: 165 * ratio + this.gameTop,
        font: 'bold ' + 40 * ratio + 'px Arial'
      },
    }
    //棋盘宽高
    this.GameUI.boardWH = canvas.width - 2 * this.GameUI.boardToLR
    //棋子宽高
    this.GameUI.piecesWH = ((canvas.width - 2 * this.GameUI.boardToLR - 2 * this.GameUI.boardInner - this.rowNum * this.GameUI.piecesMargin) / this.rowNum)//棋子宽高


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
    this.gameDoubleHit = 0 //本局总连击数
    this.doubleHitStars = 0 //连击星星等级
    this.gameCrazyTime = 0 //本局总crazyTime分数
    this.crazyTimeStars = 0 //crazyTime星星等级
    this.gameStartTime = 0 //本局开始时间
    this.gameEndTime = 0 //本局结束时间
    this.gameTimeStars = 0 //时间星星等级
    this.battlePrecent = 0 //本局结束打败了多少玩家
    this.gameLevel = 'c' //结束评分
    this.obtainpengry = 0 //游戏结束获得的精力
    this.combo = 0 //combo数
    this.prevSelectBlocks = [] //上次爆炸棋子数组
    this.selectBlocks = [] //连线棋子数组
    this.selectAniBlocks = [] //连线旗子爆炸
    this.selfHighScore = 0 //个人历史最高分
    this.highestScore = 0 //世界最高分
    this.isguide = 0 //是否需要引导 1 需要
    this.isShare = false //本局游戏是否分享过
    this.isLookVideo = false //本局游戏是否观看过视频
    this.buyTips = false //购买提示
    this.stepsAni = false //步数动画
    this.videoCoin = 0 //视频金币

    this.QRcode = [] //棋盘数据
    this.score = 0 //每次开始默认分数、当前关卡获得分数
    this.gameScore = 0 //本轮游戏总分
    this.stagegold = 0 //过关时的金币
    this.gamegold = 0 //本轮游戏总金币
    this.usergold = 0 //用户拥有金币
    this.userhammer = 0 //用户拥有道具-锤子
    this.hammerprice = 0 //用户道具-锤子购买价格
    this.stepprice = 0 //用户道具-步数购买价格
    this.usersteps = 0 //用户拥有道具-步数
    this.checkPoint = 1 //当前关卡  默认为1
    this.passScore = 0 //当前关卡过关分数
    this.gameId = '' //本轮游戏id
    this.steps = 10 //总步步数
    this.useSteps = 0 //使用步数
    this.rewardstep = 0 //过关奖励步数
    this.piecesType = 4 //棋子种类
    this.isHighScore = false //是否新纪录
    this.preScoreStart = 0 //预获得开始分数
    this.preScoreEnd = 0 //预获得结束分数
    this.preScoreAniTime = 0 //预获得分数进度条动画帧时间
    this.processScore = 0 //进度条分数
    this.processAniTime = 0 //进度条动画帧时间
    this.isNewScore = false //是否最高分
    this.doubleHit = 0 //连击数
    this.doubleHitList = 0 //连击数
    this.doubleHitTime = 0 //连击动画时间
    this.passStateTime = 0 //过关动画
    this.piecesLevelProbblt = { //棋子对应等级的生成概率
      piecesLevel: [],
      piecesProbblt: []
    }
    this.piecesLevelScore = {//棋子对应等级的分数
      level1: 0,
      level2: 0,
      level3: 0
    }

    //craz模式配置
    this.isCrazy = false //是否crazy
    this.crazyBombScore = 0 //爆炸累计分数
    this.crazyScore = 0 //crazy期间的总分数
    this.crazyTimes = 0 //crazy次数
    this.gameTimer = 0 //游戏的时间 1 = 50ms
    this.crazyShow = 0 //crazy出现的次数 出现2次不点击就重新60s
    this.isBananaMoving = false //香蕉是否在移动
    this.bananaX = - 200 * ratio //香蕉的X坐标
    this.bananaY = 600 * ratio //香蕉的Y坐标
    this.crazyRemain = 20 //crazy20秒倒计时
    this.crazyRateInterval = 10 //时间间隔-秒
    this.crazyStartInterval = 60 //时间间隔-秒
    this.bananaTime = 0 //香蕉的移动时间
    this.bananaClick = false //香蕉是否被点击
    this.crazyMusic = true //crazy music
    this.bananaMovingType = 0 //香蕉移动类型

  }

  //获取棋子所在中心的坐标
  getPointCenter(point) {
    let bl = this.GameUI.piecesWH //棋子宽高  
    let btt = this.GameUI.boardToTOP //棋盘到顶部的距离  
    let btlr = this.GameUI.boardToLR //棋盘左右两边间距  
    let bi = this.GameUI.boardInner //棋盘内边框  
    let pm = this.GameUI.piecesMargin //棋子边距 
    var coordinates = {};
    coordinates.x = point.col * (bl + pm) + bl / 2 + btlr + bi;
    coordinates.y = point.row * (bl + pm) + bl / 2 + btt + bi;
    return coordinates
  }

  //更新最高分 如果大于当前的最高分
  updateMaxScore(score) {
    let openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage({
      type: 'updateMaxScore',
      text: score
    });
  }

  circleImg(ctx, img, x, y, r) {//画一个带边框的头像圆
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 3, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff"
    ctx.fill();
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore()
  }


  //计算相同分数相连得分
  getScoreForList(list) {
    if (list.length <= 0) {
      return 0
    }
    if (list.length >= 3) {
      return (list[0] * (list.length - 2) * 10) * list.length
    } else {
      var totalScore = 0;
      for (var i = 0; i < list.length; i++) {
        totalScore = totalScore + list[i]
      }
      return totalScore
    }
  }

  //续命接口
  continueGame(type, steps) {
    var self = this;
    let options = {
      tradecode: 'game04',
      apiType: 'user',
      method: 'POST',
      data: {
        "gameid": this.gameId,
        "continuetype": type,
        "stageno": this.checkPoint
      },
      success(data) {
        self.gameState = 1
        self.isNewScore = false
        self.steps = parseInt(self.steps) + parseInt(steps)
      }
    }
    ajax(options)
  }

  //存档
  saveGame() {
    let archiveData = {};
    //开始存档配置
    archiveData.score = this.score //每次开始默认分数、当前关卡获得分数
    archiveData.gameScore = this.gameScore //本轮游戏总分
    archiveData.checkPoint = this.checkPoint //当前关卡
    archiveData.steps = this.steps //剩余步数
    archiveData.useSteps = this.useSteps //使用步数
    archiveData.gamegold = this.gamegold //本轮游戏总金币
    archiveData.stagegold = this.stagegold //过关时的金币
    archiveData.selfHighScore = this.selfHighScore //个人历史最高分
    archiveData.isShare = this.isShare //本局游戏是否分享过
    archiveData.isLookVideo = this.isLookVideo //本局游戏是否观看过视频

    archiveData.passScore = this.passScore //过关分数
    archiveData.gameId = this.gameId //本轮游戏id
    archiveData.rewardstep = this.rewardstep //过关奖励步数
    archiveData.piecesLevelScore = this.piecesLevelScore //旗子对应分数
    archiveData.piecesLevelProbblt = this.piecesLevelProbblt //旗子对应等级和生成概率
    archiveData.userhammer = this.userhammer //用户拥有道具-锤子
    archiveData.hammerprice = this.hammerprice //用户购买道具-锤子价格
    archiveData.usersteps = this.usersteps //用户拥有道具-步数
    archiveData.stepprice = this.stepprice //用户购买道具-步数价格
    archiveData.QRcode = this.QRcode //棋盘数据

    //缓存数据
    wx.setStorageSync('archiveData', JSON.stringify(archiveData))

    this.gameState = 0
    this.archiveState = true
  }

  getWXFunction(name) {
    if (typeof (wx) == 'undefined' || wx == null) {
      return null;
    }
    return wx[name];
  }
  showBannerAd() {
    this.bannerAd && this.bannerAd.destroy();
    var wxFunc = this.getWXFunction('createBannerAd');
    var isOver = false
    if (typeof (wxFunc) != 'undefined' && wxFunc != null) {
      var phone = wx.getSystemInfoSync();
      var w = phone.screenWidth / 2;
      var h = phone.screenHeight;
      this.bannerAd = wxFunc({
        adUnitId: 'adunit-43f5508f47958d6b',
        style: {
          width: 300,
          top: 0,
          left: 0
        }
      });
      this.bannerAd.onResize(() => {
        this.bannerAd.style.left = w - this.bannerAd.style.realWidth / 2 + 0.1;
        this.bannerAd.style.top = h - this.bannerAd.style.realHeight + 0.1;
        if (this.bannerAd.style.top > 1220 * ratio) {
          this.bannerOver = true
          if (this.gameState == 8) {
            this.bannerAd.hide();
          } else {
            this.bannerAd.show();
          }
        } else {
          this.bannerAd.hide();
        }
      })
    }
  }

  showGameEndAd() {
    this.bannerAd && this.bannerAd.destroy();
    var wxFunc = this.getWXFunction('createBannerAd');
    if (typeof (wxFunc) != 'undefined' && wxFunc != null) {
      var phone = wx.getSystemInfoSync();
      var w = phone.screenWidth / 2;
      var h = phone.screenHeight;
      this.bannerAd = wxFunc({
        adUnitId: 'adunit-550eb97eb726418a',
        style: {
          width: 300,
          top: 0,
          left: 0
        }
      });
      this.bannerAd.onResize(() => {
        this.bannerAd.style.left = w - this.bannerAd.style.realWidth / 2 + 0.1;
        this.bannerAd.style.top = h - this.bannerAd.style.realHeight + 0.1;
        
        if (this.bannerAd.style.top > 1220 * ratio) {
          this.bannerAd.show();
        }
        
      })
    }
  }

  showOpenBoxAd() {
    this.bannerAd && this.bannerAd.destroy();
    var wxFunc = this.getWXFunction('createBannerAd');
    if (typeof (wxFunc) != 'undefined' && wxFunc != null) {
      var phone = wx.getSystemInfoSync();
      var w = phone.screenWidth / 2;
      var h = phone.screenHeight;
      this.bannerAd = wxFunc({
        adUnitId: 'adunit-550eb97eb726418a',
        style: {
          width: 300,
          top: 0,
          left: 0
        }
      });
      this.bannerAd.onResize(() => {
        this.bannerAd.style.left = w - this.bannerAd.style.realWidth / 2 + 0.1;
        this.bannerAd.style.top = 1170 * ratio;
        this.bannerAd.hide();
        // if (this.energySysModal == 3) {
        //   this.bannerAd.show();
        // }
      })
    }
  }

  createVideoAd() {
    this.videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-64e0388ba29c2725'
    })
    this.videoAd.onClose(res => {
      // 用户点击了【关闭广告】按钮
      // 小于 2.1.0 的基础库版本，res 是一个 undefined
      if (res && res.isEnded || res === undefined) {
        this.getVideoReward()
      }
      else {
        // 播放中途退出，不下发游戏奖励
      }
    })
  }

  creatAarchiveVideoAd() {
    this.archiveVideoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-7db4ea2fa1cd4854'
    })
    // this.archiveVideoAd.onClose(res => {
    //   // 用户点击了【关闭广告】按钮
    //   // 小于 2.1.0 的基础库版本，res 是一个 undefined
    //   if (res && res.isEnded || res === undefined) {
    //     this.getVideoReward()
    //   }
    //   else {
    //       // 播放中途退出，不下发游戏奖励
    //   }
    // })
  }

  creatCrazyVideoAd() {
    this.crazyVideoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-5d837d2cf40a537f'
    })
    // this.crazyVideoAd.onClose(res => {
    //   // 用户点击了【关闭广告】按钮
    //   // 小于 2.1.0 的基础库版本，res 是一个 undefined
    //   if (res && res.isEnded || res === undefined) {
    //     this.getVideoReward()
    //   }
    //   else {
    //       // 播放中途退出，不下发游戏奖励
    //   }

    // })
  }

  creatSignVideoAd() {
    this.signVideoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-5d837d2cf40a537f'
    })
    // this.signVideoAd.onClose(res => {
    //   // 用户点击了【关闭广告】按钮
    //   // 小于 2.1.0 的基础库版本，res 是一个 undefined
    //   if (res && res.isEnded || res === undefined) {
    //     this.getVideoReward()
    //   }
    //   else {
    //       // 播放中途退出，不下发游戏奖励
    //   }

    // })
  }

  hasNoVideo(coin) {
    if (coin) {
      this.gameState = 17
      this.videoCoin = coin
    } else {
      //如果补签没有视频
      if (this.energySysModal == 2) {
        if (this.usergold > 50) {
          if (_.random(0, 10) >= (1 - this.sharerate) * 10) {
            this.signType = 1
          } else {
            this.signType = 0
          }
        } else {
          if (_.random(0, 10) >= (1 - this.nogoldsharerate) * 10) {
            this.signType = 1
          } else {
            this.signType = 0
          }
        }
      }
    }
  }

  getVideoReward() {

    if (this.energySysModal == 2) {
      this.goSign({
        openid: wx.getStorageSync('openId'),
        day: this.signData.day,
        isoverday: 1,
        gold: 0
      })
    }

    if (this.gameState == 15 || this.videoCoin == 150) {

      //开始crazy
      this.gameState = 1
      this.isCrazy = true
      this.crazyScore = 0
      this.crazyBombScore = 0

    }

    if (this.gameState == 13 || this.videoCoin == 100) {
      //存档
      this.saveGame()
    }

    if (this.gameState == 2) {

      this.continueGame(1, 5)
      this.isLookVideo = true

    }

    if (this.musicBgChange) {
      //开启音乐
      this.musicBg = true
      this.musicBgChange = false
    }

  }

  showAarchiveVideoAd() {
    this.archiveVideoAd.load()
      .then(() => {
        this.archiveVideoAd.show()
      })
      .catch(err => {
        // wx.showToast({ title: '暂时没有视频广告，过段时间再试试', icon:'none'})
      })

    this.archiveVideoAd.onError(err => {
      this.hasNoVideo(100)
      this.archiveVideoAd.offError(this.hasNoVideo())
    })
  }

  showCrazyVideoAd() {
    this.crazyVideoAd.load()
      .then(() => {
        this.crazyVideoAd.show()
      })
      .catch(err => {
        // wx.showToast({ title: '暂时没有视频广告，过段时间再试试', icon:'none'})
      })

    this.crazyVideoAd.onError(err => {
      this.hasNoVideo(150)
      this.crazyVideoAd.offError(this.hasNoVideo())
    })
  }

  showSignVideoAd() {
    this.signVideoAd.load()
      .then(() => {
        this.signVideoAd.show()
      })
      .catch(err => {
        // wx.showToast({ title: '暂时没有视频广告，过段时间再试试', icon:'none'})
      })

    this.signVideoAd.onError(err => {
      this.hasNoVideo()
      this.signVideoAd.offError(this.hasNoVideo())
    })
  }

  showVideoAd() {
    this.videoAd.load()
      .then(() => {
        this.videoAd.show()
          .then(() => {
            this.isVideoing = false
          })
      })
      .catch(err => {
        wx.showToast({ title: '暂时没有视频广告，过段时间再试试', icon: 'none' })
        this.isVideoing = false
      })

  }


  getDateStr(date) {
    var year = "";
    var month = "";
    var day = "";
    var now = date;
    year = "" + now.getFullYear();
    if ((now.getMonth() + 1) < 10) {
      month = "0" + (now.getMonth() + 1);
    } else {
      month = "" + (now.getMonth() + 1);
    }
    if ((now.getDate()) < 10) {
      day = "0" + (now.getDate());
    } else {
      day = "" + (now.getDate());
    }
    return year + month + day;
  }
  getNowTimeStr() {
    var year = "";
    var month = "";
    var day = "";
    var now = new Date();
    year = "" + now.getFullYear();
    if ((now.getMonth() + 1) < 10) {
      month = "0" + (now.getMonth() + 1);
    } else {
      month = "" + (now.getMonth() + 1);
    }
    if ((now.getDate()) < 10) {
      day = "0" + (now.getDate());
    } else {
      day = "" + (now.getDate());
    }
    return year + month + day;
  }
  getWeekStartAndEnd(AddWeekCount) {
    //起止日期数组   
    var startStop = new Array();
    //一天的毫秒数   
    var millisecond = 1000 * 60 * 60 * 24;
    //获取当前时间   
    var currentDate = new Date();
    //相对于当前日期AddWeekCount个周的日期
    currentDate = new Date(currentDate.getTime() + (millisecond * 7 * AddWeekCount));
    //返回date是一周中的某一天
    var week = currentDate.getDay();
    //返回date是一个月中的某一天   
    var month = currentDate.getDate();
    //减去的天数   
    var minusDay = week != 0 ? week - 1 : 6;
    //获得当前周的第一天   
    var currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay));
    //获得当前周的最后一天
    var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6));
    //添加至数组   
    startStop.push(this.getDateStr(currentWeekFirstDay));
    startStop.push(this.getDateStr(currentWeekLastDay));

    return startStop;
  }

  getRemainTime() {
    var day = 0, hour = 0, minute = 0, second = 0;//时间默认值
    var times = Math.floor((this.boxExchangeTime + 10 * 60 * 60 * 1000 - (new Date()).getTime()) / 1000)
    if (times > 0) {
      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - (day * 24);
      minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;

    return hour + ":" + minute + ":" + second
  }

  getRemainTime(){
    var day = 0, hour = 0, minute = 0, second = 0;//时间默认值
    var times = Math.floor((this.boxExchangeTime + 10 * 60 * 60 * 1000 - (new Date()).getTime()) / 1000)
    if(times > 0){
      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - (day * 24);
      minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    
    return hour + ":" + minute + ":" + second 
  }

  getDurDays(start,end){
    var day = 0;
    var times = Math.floor((end - start) / 1000)
    if(times > 0){
      day = Math.floor(times / (60 * 60 * 24));
    }
    if (day <= 9) day = '0' + day;
    
    return day
  }

  getStealTime(time){
    var day = 0, hour = 0, minute = 0;//时间默认值
    var times = Math.floor(((new Date()).getTime() - time) / 1000)
    if(times > 0){
      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - (day * 24);
      minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
    }
    
    if(day > 0){
      return day + "天"
    }
    if(hour > 0){
      return hour + "小时"
    }
    if(minute > 0){
      return minute + "分钟"
    }
    
  }

  getGameTime(start,end){
    var day = 0, hour = 0, minute = 0, second = 0;//时间默认值
    var times = (end - start) / 1000
    if(times > 0){
      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - (day * 24);
      minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if(hour == 0){
      hour = ''
    }else{
      if (hour <= 9) hour = '0' + hour;
      hour = hour + "时";
    }

    if(minute == 0){
      minute = ''
    }else{
      if (minute <= 9) minute = '0' + minute;
      minute = minute + "分";
    }

    if(second == 0){
      second = ''
    }else{
      if (second <= 9) second = '0' + second;
      second = second + "秒";
    }

    return hour + minute + second
  }

  getSignInfo() {
    let self = this
    //获取签到信息
    ajax({
      tradecode: 'sys16',
      apiType: 'week',
      method: 'POST',
      data: {
        startday: this.getWeekStartAndEnd(0)[0],
        endday: this.getWeekStartAndEnd(0)[1],
        openid: wx.getStorageSync('openId')
      },
      success(data) {
        self.daysinfo = data.body.daysinfo

        for (let i = 0; i < self.daysinfo.length; i++) {
          if (parseInt(self.daysinfo[i].day) == parseInt(self.getNowTimeStr())) {
            if (self.daysinfo[i].isdone == '1') {}else{
              self.signPoint = true
            }
          }
        }
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
        // self.music.playMusic('passPoint')

        self.signData = data.body.info;
        self.energySysModal = 1;
        self.getSignInfo()
        // if(data.signtype == 1){
        //   databus.energySysModal = 1;
        // }
        // if(data.signtype == 2){
        //   databus.energySysModal = 2;
        // }
      }
    })
  }
  getFriendsList() {
    let self = this;
    ajax({
      tradecode: 'sys19',
      apiType: 'user',
      method: 'POST',
      data: {
        start: 0,
        pagesize: 200,
        openid: wx.getStorageSync('openId')
      },
      success(data) {
        self.jl_list = data.body.infos
        self.jl_list.map((item, index) => {
          if (item.logopath) {
            let picboj = wx.createImage();
            picboj.src = item.logopath;
            self.avatarList.push(picboj)
          } else {
            self.avatarList.push(null)
          }
          if (item.cansteal == '1' && item.penrgy){
            self.plunderPoint = true
          }
          
        });
        self.ji_totlePage = parseInt(self.jl_list.length/6)+1 
      }
    })
  }
  getUserInfo() { //获取个人信息
    let self = this;
    let options = {
      tradecode: 'sys04',
      apiType: 'user',
      method: 'POST',
      data:{
        version:self.version
      },
      success(data) {

        //精力系统相关
        self.boxExchangeTime = data.body.user.lastzhtime;
        self.boxNum = data.body.user.boxnum;
        self.myEnergy = data.body.user.pengry;
        self.boxEnergy = data.body.user.boxengry;
        self.wxaqrcodeurl = 'http://3break-1257630833.file.myqcloud.com' + data.body.user.wxaqrcodeurl;
        // if(parseInt(self.boxNum) > 0){
        //   self.lotteryPoint = true
        // }

        if(!self.boxExchangeTime){
          self.canExchangeBox = true
          self.lotteryPoint = true
        }else{
          if((new Date()).getTime() > self.boxExchangeTime + 10 * 60 * 60 * 1000){
            self.canExchangeBox = true
            self.lotteryPoint = true
          }else{
            self.canExchangeBox = false
            // if(parseInt(self.boxNum) == 0){
            //   self.lotteryPoint = false
            // }
          }
        }
      }
    }
    ajax(options)

  }
  getRandomNum(Max) {
    var Range = Max - 0;
    var Rand = Math.random();
    return (0 + Math.round(Rand * Range));
  }

  wxShare(shareType, callback) {
    callback && wx.setStorageSync('shareStart', (new Date()).getTime())
    const randomNum = this.shareConfig[shareType].length == 1 ? 0 : this.getRandomNum(this.shareConfig[shareType].length-1)
    console.log(randomNum,shareType)
    
    wx.shareAppMessage({
      'title': this.shareConfig[shareType][randomNum].info, 
      'imageUrl': this.shareConfig[shareType][randomNum].url,
      'imageUrlId': this.shareConfig[shareType][randomNum].imgid,
      'query':'fatherId=' + wx.getStorageSync('openId') + '&shareType=' + shareType
    })
    console.log('分享最短时间：' + this.sharetime)
    
    callback && setTimeout(()=>{
    console.log('分享开始时间：' + parseInt(wx.getStorageSync('shareStart')))
    console.log('分享结束时间：' + parseInt(wx.getStorageSync('shareEnd')))
      if(wx.getStorageSync('shareEnd')){
        if(parseInt(wx.getStorageSync('shareEnd')) > parseInt(wx.getStorageSync('shareStart')) + this.sharetime * 1000){
          console.log('分享成功')
          callback()
        }else{
          console.log('分享时间太短')
          wx.showToast({ title: '请分享游戏到群', icon:'none'})
        }
      }else{
        console.log('分享成功')
        callback()
      }
      wx.removeStorage({key: 'shareStart'})
      wx.removeStorage({key: 'shareEnd'})
    },parseInt(this.sharetime) * 1000)
  }

  onShareAppMessage() {
    const shareType = '3';
    const randomNum = this.shareConfig[shareType].length == 1 ? 0 : this.getRandomNum(this.shareConfig[shareType].length-1)

    wx.onShareAppMessage({
      'title': this.shareConfig[shareType][randomNum].info, 
      'imageUrl': this.shareConfig[shareType][randomNum].url,
      'imageUrlId': this.shareConfig[shareType][randomNum].imgid,
      'query':'fatherId=' + wx.getStorageSync('openId') + '&shareType=' + shareType
    })
  }

}

