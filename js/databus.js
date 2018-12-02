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

    this.createVideoAd()
    //判断是否是哪种设备 
    wx.getSystemInfo({
      success: res=>{
        // console.log('手机信息res'+res.model)
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          //适配iphonex 刘海屏
          this.gameTop = 80 * ratio
          this.gameEndTop = 80 * ratio
        }else if(modelmes.search('iPhone 5') != -1){
          //适配iphone 5s
          // this.offsetTop = 60 * ratio
        }else if(modelmes.search('vivo Y85') != -1){
          //适配vivo Y85
          this.gameTop = 80 * ratio
          this.gameEndTop = 80 * ratio
        }
        this.reset()
      }
    })

  }

  reset() {
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
    this.shareProv ={
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
    
    this.version = '0.0.1.5';
    this.shareflag = false;
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
    this.musicBg = true //背景音默认开
    this.musicSound = true //音效默认开
    this.musicBgState = true //背景音状态
    this.musicSoundState = true //音效默状态
    this.musicBgChange = false //是否结束音效改变
    this.shareConfig = {} //分享配置
    this.btnPlus = 0 //按钮变大效果
    this.fingerAniTime = 0 //手指滑动动画
    this.firstRule = false //首次进入规则页
    this.videoAdState = false //视频广告状态
    // this.offsetTop = 0 * ratio //游戏页上移高度
    this.isGameCtxScale = true //游戏页是否放大
    this.bannerOver = false
    //游戏页的UI值（比如：宽高，边距）
    this.GameUI = {
      boardToTOP: 254 * ratio  + this.gameTop, //棋盘到顶部的距离
      boardToLR: 34 * ratio, //棋盘左右两边间距
      boardInner: 8 * ratio, //棋盘内边框
      piecesMargin: 8 * ratio, //棋子边距
      boardWH: 0, //棋盘宽高
      piecesWH: 0, //棋子宽高
      ruleCoordinates: { //规则坐标宽高
        x: 40 * ratio,
        y: 1046 * ratio + this.gameTop,
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
        x: 44 * ratio,
        y: 1126 * ratio + this.gameTop,
        w: 82 * ratio,
        h: 82 * ratio,
      },
      musicCoordinates: { //音乐坐标宽高
        x: 142 * ratio,
        y: 1126 * ratio + this.gameTop,
        w: 82 * ratio,
        h: 82 * ratio,
      },
      addStepsCoordinates: { //增加步数坐标宽高
        x: 275 * ratio,
        y: 1045 * ratio + this.gameTop,
        w: 144 * ratio,
        h: 142 * ratio,
      },
      addStepsPointCoordinates: { //增加步数红点坐标宽高
        x: 375 * ratio,
        y: 1044 * ratio + this.gameTop,
        w: 52 * ratio,
        h: 52 * ratio,
      },
      addStepsUserCoordinates: { //增加步数拥有数量坐标宽高
        x: 400 * ratio,
        y: 1080 * ratio + this.gameTop,
        font: 24 * ratio + 'px Arial'
      },
      addStepsPriceCoordinates: { //增加步数价格坐标宽高
        x: 355 * ratio,
        y: 1190 * ratio + this.gameTop,
        font: 24 * ratio + 'px Arial'
      },
      addStepsPriceBgCoordinates: { //增加步数价格背景坐标宽高
        x: 270 * ratio,
        y: 1155 * ratio + this.gameTop,
        w: 148 * ratio,
        h: 58 * ratio,
      },
      colorToolCoordinates: { //彩色道具坐标宽高
        x: 460 * ratio,
        y: 1045 * ratio + this.gameTop,
        w: 144 * ratio,
        h: 142 * ratio,
      },
      colorToolPointCoordinates: { //彩色道具红点坐标宽高
        x: 560 * ratio,
        y: 1044 * ratio + this.gameTop,
        w: 52 * ratio,
        h: 52 * ratio,
      },
      colorToolPriceCoordinates: { //彩色道具价格坐标宽高
        x: 540 * ratio,
        y: 1190 * ratio + this.gameTop,
        font: 24 * ratio + 'px Arial'
      },
      colorToolUserCoordinates: { //彩色道具拥有数量坐标宽高
        x: 585 * ratio,
        y: 1080 * ratio + this.gameTop,
        font: 24 * ratio + 'px Arial'
      },
      colorToolPriceBgCoordinates: { //彩色道具价格背景坐标宽高
        x: 455 * ratio,
        y: 1155 * ratio + this.gameTop,
        w: 148 * ratio,
        h: 58 * ratio,
      },
      coinCoordinates: { //金币坐标宽高
        x: 630 * ratio,
        y: 1039 * ratio + this.gameTop,
        w: 171 * ratio,
        h: 175 * ratio,
      },
      coinNumCoordinates: { //金币数量坐标宽高
        x: 715 * ratio,
        y: 1190 * ratio + this.gameTop,
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
        y: 200 * ratio + this.gameEndTop,
        w: 800 * ratio,
        h: 482 * ratio,
      },
      newRecordCoordinates: { //游戏结束新纪录
        x: 560 * ratio,
        y: 290 * ratio + this.gameEndTop,
        w: 278 * ratio,
        h: 224 * ratio,
      },
      tipsCoordinates: { //游戏结束提示
        x: 68 * ratio,
        y: 756 * ratio + this.gameEndTop,
        w: 692 * ratio,
        h: 248 * ratio,
      },
      shareCoordinates: { //游戏结束分享
        x: (uiWidth - 318) / 2 * ratio,
        y: 870 * ratio + this.gameEndTop,
        w: 318 * ratio,
        h: 120 * ratio,
      },
      lookVideoCoordinates: { //游戏结束看视频
        // x: 425 * ratio,
        // y: 950 * ratio,
        // w: 318 * ratio,
        // h: 120 * ratio,
        x: (uiWidth - 318) / 2 * ratio,
        y: 870 * ratio + this.gameEndTop,
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
        y: 580 * ratio + this.gameEndTop,
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
  continueGame(type,steps) {
    var self = this;
    let options = {
      tradecode: 'game04',
      apiType: 'user',
      method: 'POST',
      data:{
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

  getWXFunction(name) {
    if(typeof(wx) == 'undefined' || wx == null) {
      return null;
    }
    return wx[name];
  }
  showBannerAd() {
    this.bannerAd && this.bannerAd.destroy();
    var wxFunc = this.getWXFunction('createBannerAd');
    var isOver = false
    if(typeof(wxFunc) != 'undefined' && wxFunc != null) {
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
      this.bannerAd.onResize(()=> {
        this.bannerAd.style.left = w - this.bannerAd.style.realWidth / 2 + 0.1;
        this.bannerAd.style.top = h - this.bannerAd.style.realHeight + 0.1;
        if(this.bannerAd.style.top > 1220 * ratio){
          this.bannerOver = true
          if(this.gameState == 8){
            this.bannerAd.hide();
          }else{
            this.bannerAd.show();
          }
        }else{
          this.bannerAd.hide();
        }
      })
    } 
  }

  createVideoAd(){
    this.videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-64e0388ba29c2725'
    })
    this.videoAd.onClose(res => {
      // 用户点击了【关闭广告】按钮
      // 小于 2.1.0 的基础库版本，res 是一个 undefined
      if (res && res.isEnded || res === undefined) {
        // 正常播放结束，可以下发游戏奖励
        this.videoAdState = true //观看完毕可以获得奖励
        this.continueGame(1, 5)
        if (this.musicBgChange) {
          //开启音乐
          this.musicBg = true
          this.musicBgChange = false
        }
        this.isLookVideo = true
      }
      else {
          // 播放中途退出，不下发游戏奖励
      }
    })
  }

  showVideoAd(){
    this.videoAd.load()
    .then(() => {
      this.videoAd.show()
      this.isVideoing = false
    })
    .catch(err => {
      wx.showToast({ title: '暂时没有视频广告，过段时间再试试', icon:'none'})
      this.isVideoing = false
    })
  }
}

