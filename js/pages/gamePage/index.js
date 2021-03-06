import Map from './map'
import Music from '../../music/music'
import GameEnd from './gameEnd'
import GameModal from './gameModal'
import DataBus from '../../databus'
import { ajax } from '../../base/ajax'
import DataStore from '../../base/helper';

let databus = new DataBus()

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
let uiWidth = 828;
let ratio = canvas.width / uiWidth //设计稿宽度

//统一配置UI值
let bl = databus.GameUI.piecesWH //棋子宽高  
let bwh = databus.GameUI.boardWH //棋盘宽高  
let btt = databus.GameUI.boardToTOP //棋盘到顶部的距离  
let btlr = databus.GameUI.boardToLR //棋盘左右两边间距  
let bi = databus.GameUI.boardInner //棋盘内边框  
let pm = databus.GameUI.piecesMargin //棋子边距 
let rulec = databus.GameUI.ruleCoordinates //规则按钮坐标宽高
let sbc = databus.GameUI.scoreBgCoordinates //积分背景坐标宽高
let sc = databus.GameUI.stepsCoordinates //步数坐标宽高
let pec = databus.GameUI.progressEmptyCoordinates //空进度条坐标宽高
let pec2 = databus.GameUI.progressEmpty2Coordinates //空进度条坐标宽高
let pfc = databus.GameUI.progressFullCoordinates //满进度条坐标宽高
let hc = databus.GameUI.homeCoordinates //首页按钮坐标宽高
let mc = databus.GameUI.musicCoordinates //音乐按钮坐标宽高
let asc = databus.GameUI.addStepsCoordinates //增加步数按钮坐标宽高
let aspoc = databus.GameUI.addStepsPointCoordinates //增加步数红点坐标宽高
let asprc = databus.GameUI.addStepsPriceCoordinates //增加步数价格坐标宽高
let asuc = databus.GameUI.addStepsUserCoordinates //增加步数拥有数量坐标宽高
let aspbc = databus.GameUI.addStepsPriceBgCoordinates //增加步数价格背景坐标宽高
let ctc = databus.GameUI.colorToolCoordinates //彩色道具坐标宽高
let ctpoc = databus.GameUI.colorToolPointCoordinates //彩色道具红点坐标宽高
let ctprc = databus.GameUI.colorToolPriceCoordinates //彩色道具价格坐标宽高
let ctuc = databus.GameUI.colorToolUserCoordinates //增加步数拥有数量坐标宽高
let ctpbc = databus.GameUI.colorToolPriceBgCoordinates //彩色道具价格背景坐标宽高
let cc = databus.GameUI.coinCoordinates //金币坐标宽高
let cnc = databus.GameUI.coinNumCoordinates //金币数量坐标宽高
let cpc = databus.GameUI.checkPointCoordinates //关卡文字坐标宽高
let shsc = databus.GameUI.selfHighScoreCoordinates //个人最高分数坐标
let hsc = databus.GameUI.highestScoreCoordinates //世界最高分数坐标
let snc = databus.GameUI.stepsNumCoordinates //步数坐标
let stc = databus.GameUI.stepsTxtCoordinates //步数文字坐标
let csc = databus.GameUI.currentScoreCoordinates //当前分数坐标
let psc = databus.GameUI.passScoreCoordinates //当前过关分数坐标
let shc = databus.GameUI.shareCoordinates //游戏结束分享
let lvc = databus.GameUI.lookVideoCoordinates //游戏结束看视频
let ic = databus.GameUI.indexCoordinates //游戏结束首页
let tac = databus.GameUI.tryAgainCoordinates //游戏结束再来一局
let psec = databus.GameUI.preScoreCoordinates //游戏结束再来一局
const ratio2 = wx.getSystemInfoSync().pixelRatio;

//游戏页主函数
export default class Index {
  constructor(ctx) {
    
    // 维护当前requestAnimationFrame的id
    this.aniId = 1;
    this.f = 0;
    //当前游戏状态
    this.STATE = "静稳状态";  //爆破检查、爆破动画、下落动画、补充新的、静稳状态
    // console.log("游戏页加载了")
    //加载所有资源，资源都load之后，定时器开启
    this.R = {
      "bg": "images/gamePage/bg.png",
      "gameBg": "images/gamePage/gameBg.png",
      "icon0": "images/gamePage/fruit_icon1.png",
      "icon1": "images/gamePage/fruit_icon2.png",
      "icon2": "images/gamePage/fruit_icon3.png",
      "icon3": "images/gamePage/fruit_icon4.png",
      "baozha": "images/gamePage/baozha.png",
      "addSteps": "images/gamePage/icon_addSteps.png",
      "rule": "images/gamePage/icon_rule.png",
      "coin": "images/gamePage/icon_coin.png",
      "home": "images/gamePage/icon_home.png",
      "music": "images/gamePage/icon_music.png",
      "colorTool": "images/gamePage/icon_tool.png",
      "progressEmpty": "images/gamePage/progress_empty.png",
      "progressEmpty2": "images/gamePage/progress_empty2.png",
      "progressFull": "images/gamePage/progress_full.png",
      "scoreBg": "images/gamePage/score_bg.png",
      "steps": "images/gamePage/steps.png",
      "redSteps": "images/gamePage/redSteps.png",
      "pieceslevel2": "images/gamePage/pieceslevel2.png",
      "pieceslevel3": "images/gamePage/pieceslevel3.png",
      "piecesCoin": "images/gamePage/piecesCoin.png",
      "redPoint": "images/gamePage/redPoint.png",
      "toolPrice": "images/gamePage/toolPrice.png",
      "doubleHit": "images/gamePage/doubleHit.png",
      "doubleHit1": "images/gamePage/doubleHit/1.png",
      "doubleHit2": "images/gamePage/doubleHit/2.png",
      "doubleHit3": "images/gamePage/doubleHit/3.png",
      "doubleHit4": "images/gamePage/doubleHit/4.png",
      "doubleHit5": "images/gamePage/doubleHit/5.png",
      "doubleHit6": "images/gamePage/doubleHit/6.png",
      "doubleHit7": "images/gamePage/doubleHit/7.png",
      "doubleHit8": "images/gamePage/doubleHit/8.png",
      "doubleHit9": "images/gamePage/doubleHit/9.png",
      "buyTips": "images/gamePage/buy_tips.png",
    }
    //把所有的图片放到一个对象中
    this.Robj = {};	//两个对象有相同的k
    // 遍历R对象，把真实image对象，放入this.Robj中
    for (var k in this.R) {
      this.Robj[k] = new Image();
      this.Robj[k].src = this.R[k];
    }

    //是否触发拖拽
    this.istuozhuai = false;
    this.f = 0;
    this.tipsAni = 0;
    this.rt = 0;
  }

  //重置页面
  restart(ctx) {
    this.ctx = ctx
    // this.screenCtx = screenCtx
    // this.gameCtx = gameCtx
    // this.gameCtx.width = canvas.width;
    // this.gameCtx.height = canvas.height + databus.offsetTop;
    // if(databus.isGameCtxScale){
    //   this.ctx.scale(ratio2, ratio2); //加上这个图片清晰的一批
    //   databus.isGameCtxScale = false;
    // }
    this.f = 0
    this.tipsAni = 0
    this.music = new Music()
    this.music.playGameBgm()
    databus.gameInfoReset()
    this.getGameInfo()
    this.getUserInfo()
    this.gameEnd = new GameEnd()
    this.gameModal = new GameModal()
    //解决点击开始游戏断网情况导致的黑屏，强制返回首页
    setTimeout(()=>{
      if (databus.piecesLevelProbblt.piecesLevel.length == 0){
        databus.scene = 0
      }
    },10000)
    
    //广告位展示
    databus.showBannerAd()
  }

  //页面notOnShow 
  finish() {
    //清除定时动画和绑定事件
    window.cancelAnimationFrame(this.aniId)
    canvas.removeEventListener('touchstart', this.touchStartHandler)
    //隐藏广告
    databus.bannerAd && databus.bannerAd.hide()
  }

  //canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {
    //清屏
    // console.log("游戏页在循环")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //帧编号
    this.f++;
    if(this.f % 10 == 0){
      this.tipsAni++
    }
    //绘制背景。背景没动,也要每帧擦除，重绘
    ctx.drawImage(this.Robj["bg"], 0, 0, canvas.width, canvas.height);
    //绘制棋盘
    ctx.drawImage(this.Robj["gameBg"], 0, 0, this.Robj["gameBg"].width, this.Robj["gameBg"].height, btlr, btt, bwh, bwh);
    if(databus.stepsAni){
      this.rt++
      if(this.rt > 120){
        databus.stepsAni = false
        this.rt = 0
      }else{
        if(this.tipsAni % 2 == 1){
          //绘制步数图标
          ctx.drawImage(this.Robj["redSteps"], 0, 0, this.Robj["redSteps"].width, this.Robj["redSteps"].height, sc.x, sc.y, sc.w, sc.h);
        }else{
          //绘制步数图标
          ctx.drawImage(this.Robj["redSteps"], 0, 0, this.Robj["redSteps"].width, this.Robj["redSteps"].height, sc.x + 10 * ratio, sc.y + 10 * ratio, sc.w - 20 * ratio, sc.h - 20 * ratio);
        }
      }
    }else{
      if(databus.steps < 6){
        //绘制步数图标
        ctx.drawImage(this.Robj["redSteps"], 0, 0, this.Robj["redSteps"].width, this.Robj["redSteps"].height, sc.x, sc.y, sc.w, sc.h);
      }else{
        //绘制步数图标
        ctx.drawImage(this.Robj["steps"], 0, 0, this.Robj["steps"].width, this.Robj["steps"].height, sc.x, sc.y, sc.w, sc.h);
      }
      //绘制步数图标
      // ctx.drawImage(this.Robj["steps"], 0, 0, this.Robj["steps"].width, this.Robj["steps"].height, sc.x, sc.y, sc.w, sc.h);
    }

    //绘制空进度条
    ctx.drawImage(this.Robj["progressEmpty"], 0, 0, this.Robj["progressEmpty"].width, this.Robj["progressEmpty"].height, pec.x, pec.y, pec.w, pec.h);

    //绘制预获得分数进度条
    databus.preScoreStart = databus.preScoreEnd;
    databus.preScoreEnd = this.getScoreBySb(databus.selectBlocks) || 0;
    if (databus.preScoreStart != databus.preScoreEnd) {
      var totalTime = 15
      databus.preScoreAniTime = databus.preScoreAniTime + 1
      if (databus.preScoreAniTime > totalTime) {
        databus.preScoreStart = databus.preScoreEnd
        databus.preScoreAniTime = 0
      } else {
        databus.preScoreStart = databus.preScoreStart + (databus.preScoreEnd - databus.preScoreStart) * (databus.preScoreAniTime / totalTime)
        if (databus.preScoreStart == databus.preScoreEnd) {
          databus.processAniTime = 0
        }
        ctx.drawImage(this.Robj["progressEmpty2"], 0, 0, ((databus.score + databus.preScoreStart) >= databus.passScore ? 1 : (databus.score + databus.preScoreStart) / databus.passScore) * this.Robj["progressEmpty2"].width, this.Robj["progressEmpty2"].height, pec2.x, pec2.y, ((databus.score + databus.preScoreStart) >= databus.passScore ? 1 : (databus.score + databus.preScoreStart) / databus.passScore) * pec2.w, pec2.h);
      }
    
    } else {
      ctx.drawImage(this.Robj["progressEmpty2"], 0, 0, ((databus.score + databus.preScoreStart) >= databus.passScore ? 1 : (databus.score + databus.preScoreStart) / databus.passScore) * this.Robj["progressEmpty2"].width, this.Robj["progressEmpty2"].height, pec2.x, pec2.y, ((databus.score + databus.preScoreStart) >= databus.passScore ? 1 : (databus.score + databus.preScoreStart) / databus.passScore) * pec2.w, pec2.h);
    }

    //绘制得分进度条
    if (databus.processScore < databus.score) {
      var totalTime = 15
      databus.processAniTime = databus.processAniTime + 1
      if (databus.processAniTime > totalTime) {
        databus.processScore = databus.score
        databus.processAniTime = 0
      } else {
        databus.processScore = databus.processScore + (databus.score - databus.processScore) * (databus.processAniTime / totalTime)
        if (databus.processScore == databus.score) {
          databus.processAniTime = 0
        }
        //绘制满进度条
        ctx.drawImage(this.Robj["progressFull"], 0, 0, (databus.processScore >= databus.passScore ? 1 : databus.processScore / databus.passScore) * this.Robj["progressFull"].width, this.Robj["progressFull"].height, pfc.x, pfc.y, (databus.processScore >= databus.passScore ? 1 : databus.processScore / databus.passScore) * pfc.w, pfc.h);
      }
    }else{
      //绘制得分进度条
      ctx.drawImage(this.Robj["progressFull"], 0, 0, (databus.processScore >= databus.passScore ? 1 : databus.processScore / databus.passScore) * this.Robj["progressFull"].width, this.Robj["progressFull"].height, pfc.x, pfc.y, (databus.processScore >= databus.passScore ? 1 : databus.processScore / databus.passScore) * pfc.w, pfc.h);
    }

    //绘制首页按钮
    ctx.drawImage(this.Robj["home"], 0, 0, this.Robj["home"].width, this.Robj["home"].height, hc.x, hc.y, hc.w, hc.h);
    //绘制规则按钮
    ctx.drawImage(this.Robj["rule"], 0, 0, this.Robj["rule"].width, this.Robj["rule"].height, rulec.x, rulec.y, rulec.w, rulec.h);
    //绘制音乐按钮
    ctx.drawImage(this.Robj["music"], 0, 0, this.Robj["music"].width, this.Robj["music"].height, mc.x, mc.y, mc.w, mc.h);
    //绘制增加步数按钮
    ctx.drawImage(this.Robj["addSteps"], 0, 0, this.Robj["addSteps"].width, this.Robj["addSteps"].height, asc.x, asc.y, asc.w, asc.h);
    if(databus.usersteps != 0 || databus.usersteps != '0'){
      //增加步数红点坐标宽高
      ctx.drawImage(this.Robj["redPoint"], 0, 0, this.Robj["redPoint"].width, this.Robj["redPoint"].height, aspoc.x, aspoc.y, aspoc.w, aspoc.h);
    }else{
      if(databus.usergold >= databus.stepprice){
        if(!databus.buyTips){
          
          if(this.tipsAni % 2 == 1){
            //增加步数购买提示
            ctx.drawImage(this.Robj["buyTips"], 0, 0, this.Robj["buyTips"].width, this.Robj["buyTips"].height, 325 * ratio, 1010 * ratio + databus.gameTop, 50 * ratio, 60 * ratio);
          }else{
            //增加步数购买提示
            ctx.drawImage(this.Robj["buyTips"], 0, 0, this.Robj["buyTips"].width, this.Robj["buyTips"].height, 329 * ratio, 1004 * ratio + databus.gameTop, 42 * ratio, 52 * ratio);
          }
        }
      }
    }
    //增加步数价格背景坐标宽高
    ctx.drawImage(this.Robj["toolPrice"], 0, 0, this.Robj["toolPrice"].width, this.Robj["toolPrice"].height, aspbc.x, aspbc.y, aspbc.w, aspbc.h);
   
    // //绘制彩色道具按钮
    // ctx.drawImage(this.Robj["colorTool"], 0, 0, this.Robj["colorTool"].width, this.Robj["colorTool"].height, ctc.x, ctc.y, ctc.w, ctc.h);
    // //彩色道具红点坐标宽高
    // ctx.drawImage(this.Robj["redPoint"], 0, 0, this.Robj["redPoint"].width, this.Robj["redPoint"].height, ctpoc.x, ctpoc.y, ctpoc.w, ctpoc.h);
    // //彩色道具价格背景坐标宽高
    // ctx.drawImage(this.Robj["toolPrice"], 0, 0, this.Robj["toolPrice"].width, this.Robj["toolPrice"].height, ctpbc.x, ctpbc.y, ctpbc.w, ctpbc.h);
    
    if (databus.doubleHit > 0){
      // databus.doubleHitTime++
      // if (databus.doubleHitTime > 20){
      //   databus.doubleHit = 0
      //   databus.doubleHitTime = 0
      //   return
      // }
      //连消图案
      ctx.drawImage(this.Robj["doubleHit"], 0, 0, this.Robj["doubleHit"].width, this.Robj["doubleHit"].height, 610 * ratio, 160 * ratio + databus.gameTop, 135 * ratio, 55 * ratio);
      //连消数字
      ctx.drawImage(this.Robj["doubleHit" + databus.doubleHit], 0, 0, this.Robj["doubleHit" + databus.doubleHit].width, this.Robj["doubleHit" + databus.doubleHit].height, 740 * ratio, 165 * ratio + databus.gameTop, 33 * ratio, 47 * ratio);
    }

    //绘制金币图标
    ctx.drawImage(this.Robj["coin"], 0, 0, this.Robj["coin"].width, this.Robj["coin"].height, cc.x, cc.y, cc.w, cc.h);

    // 关卡
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff';
    ctx.font = cpc.font;
    
    ctx.fillText('第' + databus.checkPoint + '关', cpc.x, cpc.y);
    //世界最高分数
    // ctx.font = hsc.font;
    // ctx.textAlign = 'center';
    // ctx.fillText(databus.highestScore, hsc.x, hsc.y);
    // 步数

    ctx.textAlign = 'center';
    ctx.font = snc.font;
    ctx.fillText(databus.steps, snc.x, snc.y);
    //步数文字
    // ctx.font = stc.font;
    // ctx.fillText('步数', stc.x, stc.y);
    // 本轮分数
    ctx.font = shsc.font;
    ctx.fillText(databus.gameScore + databus.score, shsc.x, shsc.y);
    //增加步数价格
    ctx.font = asprc.font;
    ctx.fillText(databus.stepprice, asprc.x, asprc.y);
    //增加步数拥有数量
    ctx.font = asuc.font;
    if(databus.usersteps != 0 || databus.usersteps != '0'){
      ctx.fillText(databus.usersteps, asuc.x, asuc.y);
    }
    // //彩色道具价格
    // ctx.font = ctprc.font;
    // ctx.fillText(databus.hammerprice, ctprc.x, ctprc.y);
    // //彩色道具拥有数量
    // ctx.font = ctuc.font;
    // ctx.fillText(databus.userhammer, ctuc.x, ctuc.y);
    //金币拥有数量
    ctx.font = cnc.font;
    ctx.fillText(databus.usergold, cnc.x, cnc.y);
    //当前分数
    ctx.fillStyle = '#7fdc19';
    ctx.font = csc.font;
    ctx.fillText(databus.score, csc.x, csc.y);
    if (databus.preScoreEnd) {
      //预得分数
      ctx.fillStyle = '#ffde44';
      ctx.textAlign = 'left';
      ctx.font = psec.font;
      ctx.fillText('+' + databus.preScoreEnd, (uiWidth / 2 + 20 + 15 * (databus.score + '').split('').length) * ratio , psec.y);
    }

    //当前过关分数
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'right';
    ctx.font = psc.font;
    ctx.fillText(databus.passScore, psc.x, psc.y);


    //根据手指移动绘制连线
    this.drawLine()
    //绘制棋子
    this.map.render(ctx, this.Robj);

    if (databus.gameState == 2) {
      this.gameEnd.render(ctx)
    }

    if (databus.gameState == 3 || databus.gameState == 4 || databus.gameState == 5 || databus.gameState == 6 || databus.gameState == 7 || databus.gameState == 8 || databus.gameState == 9 || databus.gameState == 10 || databus.gameState == 11) {
      this.gameModal.render(ctx)
    }

    //有限状态机！！！
    if (this.STATE == "爆破检查") {
      if (this.map.check()) {
        //打一个标记
        this.startBomb = this.f;
        //瞬间变为爆破动画
        this.STATE = "爆破动画";
      } else {
        this.STATE = "静稳状态";
      }
    } else if (this.STATE == "爆破动画" && this.f > this.startBomb + 41) {
      this.STATE = "下落动画";
      this.map.dropDown();
      this.startDropDown = this.f
    } else if (this.STATE == "下落动画" && this.f > this.startDropDown + 5) {

      this.STATE = "补充新的";
      this.map.supplement();
      this.startSupple = this.f;
    } else if (this.STATE == "补充新的" && this.f > this.startSupple + 11) {
      this.STATE = "爆破检查"
      // this.map.check();
    } else if (this.STATE == "静稳状态") {
      //console.log(this.istuozhuai , this.starttuozhuai)
      if (this.istuozhuai && this.f == this.starttuozhuai + 6) {
        if (this.map.test(this.row1, this.col1, this.row2, this.col2)) {
          this.STATE = "爆破检查";
        }
        this.istuozhuai = false;
      }
    }

    // console.log(screenWidth,screenHeight,canvas.width,canvas.height,this.gameCtx.width,this.gameCtx.height)
    // DataStore.getInstance().ctx.drawImage(DataStore.getInstance().gameCanvas, 0, -databus.offsetTop, canvas.width, canvas.height+ databus.offsetTop);

    // this.screenCtx.drawImage(this.gameCtx, 0, -databus.offsetTop,screenWidth, screenHeight + databus.offsetTop)
  }

  // 实现游戏帧循环
  loop() {
    this.render(this.ctx)
    // this.screenCtx.drawImage(this.gameCtx, 0, -databus.offsetTop,screenWidth, screenHeight + databus.offsetTop)
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
  }

  /**
   * 调用接口开始
   */

  //获取初始关卡数据
  getGameInfo() {
    var self = this;
    let options = {
      tradecode: 'game01',
      apiType: 'user',
      method: 'POST',
      success(data) {
        databus.passScore = data.body.game.stagescore //第一关过关所需分数
        databus.gameId = data.body.game.gameid //本轮游戏id
        databus.rewardstep = data.body.game.rewardstep //过关奖励步数
        //根据水果数字信息获得棋子种类和棋子对应等级的生成概率
        let piecesConfig = data.body.game.numberifno.split(',');
        let piecesLevel = ['level1', 'level2','level3'];
        let piecesProbblt = [];
        for (var i = 0; i < piecesConfig.length; i++) {
          piecesProbblt.push(parseFloat(piecesConfig[i].split(':')[1]))
          databus.piecesLevelScore['level' + (i + 1)] = parseFloat(piecesConfig[i].split(':')[0])
        }
        databus.piecesLevelProbblt = { //棋子对应等级的生成概率
          piecesLevel: piecesLevel,
          piecesProbblt: piecesProbblt
        }

        var propList = data.body.prop_list;
        //道具相关
        for (var j = 0; j < propList.length; j++) {
          if (propList[j].proptype == '2'){
            databus.userhammer = propList[j].propbalance || 0; //用户拥有道具-锤子
            databus.hammerprice = propList[j].propprice || 0; //用户购买道具-锤子价格
          } 
          if (propList[j].proptype == '3'){
            databus.usersteps = propList[j].propbalance || 0; //用户拥有道具-步数
            databus.stepprice = propList[j].propprice || 0; //用户购买道具-步数价格
          }
        }

        //地图，唯一的实例
        self.map = new Map(self.ctx)
        //添加监听
        self.touchStartHandler = self.touchStart.bind(self)
        canvas.addEventListener('touchstart', self.touchStartHandler)

        //主循环开始
        self.bindLoop = self.loop.bind(self)

        // 清除上一帧的动画
        window.cancelAnimationFrame(self.aniId)
        self.aniId = window.requestAnimationFrame(self.bindLoop, canvas)
      }
    }
    ajax(options)
  }

  //获取用户信息 最高分数 最高关卡 拥有金币
  getUserInfo() {
    var self = this;
    let options = {
      tradecode: 'sys04',
      apiType: 'user',
      method: 'POST',
      success(data) {
        databus.usergold = data.body.user.glod; //用户拥有金币
      }
    }
    ajax(options)
  }

  
  //购买道具
  buyTool(type) {
    ajax({
      tradecode: 'acct01',
      apiType: 'user',
      method: 'POST',
      data: {
        "gameid": databus.gameId,
        "proptype": type,
      },
      success(data) {
        databus.gameState = 1
        databus.usergold = data.body.user.glod
        var propList = data.body.prop_list;
        //道具相关
        for (var j = 0; j < propList.length; j++) {
          if (propList[j].proptype == '2') {
            databus.userhammer = propList[j].propbalance || 0; //用户拥有道具-锤子
            databus.hammerprice = propList[j].propprice || 0; //用户购买道具-锤子价格
          }
          if (propList[j].proptype == '3') {
            databus.usersteps = propList[j].propbalance || 0; //用户拥有道具-步数
            databus.stepprice = propList[j].propprice || 0; //用户购买道具-步数价格
          }
        }
        databus.gameState = 1
        databus.btnPlus = 0
      }
    })
  }

  //消耗道具
  useTool(type) {
    ajax({
      tradecode: 'acct02',
      apiType: 'user',
      method: 'POST',
      data: {
        "gameid": databus.gameId,
        "proptype": type,
      },
      success(data) {
        wx.showToast({ title: '道具使用成功，加油冲关哦~', icon: 'none' })
        if(type == '3'){//如果类型为3 则使用成功加3步
          databus.steps = databus.steps + 3
          databus.usersteps = databus.usersteps - 1
        }
      }
    })
  }
  /**
   * 调用接口结束
   */


  /**
   * 手指触摸事件开始
   */

  touchStart(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY 
    if (this.STATE != "静稳状态") {
      return;
    }
    if (databus.gameState == 2){
      // 首页按钮事件
      if (x >= ic.x && x <= ic.x + ic.w && y >= ic.y && y <= ic.y + ic.h) {
        this.finish()
        databus.scene = 0
        databus.gameState = 0
        if (databus.musicBgChange) {
          //开启音乐
          databus.musicBg = true
          databus.musicBgChange = false
        }
        //按钮按下音效
        this.music.playMusic('btnDown')
      }
      // 再来一局事件
      if (x >= tac.x && x <= tac.x + tac.w && y >= tac.y && y <= tac.y + tac.h) {
        databus.gameState = 1
        if (databus.musicBgChange) {
          //开启音乐
          databus.musicBg = true
          databus.musicBgChange = false
        }
        //移除事件重新绑定
        canvas.removeEventListener('touchstart', this.touchStartHandler)
        canvas.removeEventListener('touchmove', this.touchMoveHandler)
        canvas.removeEventListener('touchend', this.touchEndHandler)
        // this.restart(this.ctx,this.screenCtx,this.gameCtx)
        this.restart(this.ctx)

        //按钮按下音效
        this.music.playMusic('btnDown')
      }
      //有分享按钮才可以触发点击事件
      if (databus.shareflag) {
        if (!databus.isShare) {
          // 分享事件
          if (x >= 85 * ratio && x <= (85 * ratio + shc.w) && y >= shc.y && y <= shc.y + shc.h) {
            wx.shareAppMessage({ 'title': databus.shareConfig.info, 'imageUrl': databus.shareConfig.url })
            databus.continueGame(2, 3)
            if (databus.musicBgChange) {
              //开启音乐
              databus.musicBg = true
              databus.musicBgChange = false
            }
            setTimeout(() => {
              databus.isShare = true
            }, 1000)
            //按钮按下音效
            this.music.playMusic('btnDown')
          }
        }
        if (!databus.isLookVideo) {
          // 视频广告事件
          if (x >= 425 * ratio && x <= (425 * ratio + lvc.w) && y >= lvc.y && y <= lvc.y + lvc.h) {
            if(databus.isVideoing == true){
              return
            }
            databus.isVideoing = true
            databus.showVideoAd()
            //按钮按下音效
            this.music.playMusic('btnDown')
          }
        }
      }else{
        if (!databus.isLookVideo) {
          // 视频广告事件
          if (x >= lvc.x && x <= lvc.x + lvc.w && y >= lvc.y && y <= lvc.y + lvc.h) {
            if(databus.isVideoing == true){
              return
            }
            databus.isVideoing = true
            databus.showVideoAd()
            //按钮按下音效
            this.music.playMusic('btnDown')
          }
        }
      }

      // // 看视频事件
      // if (x >= lvc.x && x <= lvc.x + lvc.w && y >= lvc.y && y <= lvc.y + lvc.h) {
      //   databus.continueGame(1, 10)
      //   //按钮按下音效
      //   this.music.playMusic('btnDown')
      // }
    } else if (databus.gameState == 3) {//音乐弹框
      // 关闭弹框事件
      if (x >= (0 * ratio) && x <= ((0 + 150) * ratio) && y >= (170 * ratio) && y <= ((170 + 162) * ratio)) {
        databus.gameState = 1
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

      // 点击背景音事件
      if (x >= (190 * ratio) && x <= ((190 + 238) * ratio) && y >= (495 * ratio) && y <= ((495 + 120) * ratio)) {
        databus.musicBgState = !databus.musicBgState
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

      // 点击游戏音效事件
      if (x >= (190 * ratio) && x <= ((190 + 238) * ratio) && y >= (720 * ratio) && y <= ((720 + 120) * ratio)) {
        databus.musicSoundState = !databus.musicSoundState
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

      // 点击确认事件
      if (x >= (250 * ratio) && x <= ((250 + 340) * ratio) && y >= (1030 * ratio) && y <= ((1030 + 168) * ratio)) {
        databus.btnPlus = 1
        setTimeout(() => {
          databus.musicBg = databus.musicBgState
          databus.musicSound = databus.musicSoundState
          if (databus.musicBg == true) {
            this.music.playGameBgm()
          } else {
            this.music.pauseMusicBgm()
          }
          databus.gameState = 1
          databus.btnPlus = 0
        }, databus.laterTime)
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

    } else if (databus.gameState == 4) {//4:彩色道具弹框
      // 关闭弹框事件
      if (x >= (0 * ratio) && x <= ((0 + 150) * ratio) && y >= (220 * ratio) && y <= ((220 + 162) * ratio)) {
        databus.gameState = 1
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

      // 点击确认事件
      if (x >= (250 * ratio) && x <= ((250 + 340) * ratio) && y >= (1080 * ratio) && y <= ((1080 + 168) * ratio)) {
        this.buyTool('2')
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

    } else if (databus.gameState == 5) {//5:增加步数弹框
      // 关闭弹框事件
      if (x >= (0 * ratio) && x <= ((0 + 150) * ratio) && y >= (170 * ratio) && y <= ((170 + 162) * ratio)) {
        databus.gameState = 1
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

      // 点击确认事件
      if (x >= (250 * ratio) && x <= ((250 + 340) * ratio) && y >= (1030 * ratio) && y <= ((1030 + 168) * ratio)) {
        databus.btnPlus = 1
        setTimeout(() => {
          this.buyTool('3')
        }, databus.laterTime)
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

    } else if (databus.gameState == 6) {//6:返回首页弹框
      // 关闭弹框事件
      if (x >= (0 * ratio) && x <= ((0 + 150) * ratio) && y >= (170 * ratio) && y <= ((170 + 162) * ratio)) {
        databus.gameState = 1
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

      // 点击确认事件
      if (x >= (250 * ratio) && x <= ((250 + 340) * ratio) && y >= (1030 * ratio) && y <= ((1030 + 168) * ratio)) {
        databus.btnPlus = 1
        setTimeout(() => {
          this.finish()
          databus.scene = 0
          databus.gameState = 0
          databus.btnPlus = 0
        }, databus.laterTime)
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

    } else if (databus.gameState == 9) {//9:游戏异常返回首页
      // 点击确认事件
      if (x >= (250 * ratio) && x <= ((250 + 340) * ratio) && y >= (1080 * ratio) && y <= ((1080 + 168) * ratio)) {
        databus.btnPlus = 1
        setTimeout(() => {
          this.finish()
          databus.scene = 0
          databus.gameState = 0
          databus.btnPlus = 0
        }, databus.laterTime)
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

    } else if (databus.gameState == 8) {//8:规则弹框
      // 点击确认事件
      if (x >= (250 * ratio) && x <= ((250 + 312) * ratio) && y >= (1235 * ratio) && y <= ((1235 + 142) * ratio)) {
        databus.btnPlus = 1
        setTimeout(() => {
          if(databus.firstRule){
            databus.gameState = 10
            databus.firstRule = false
          }else{
            databus.gameState = 1
          }
          databus.btnPlus = 0
          databus.showRule = false
          wx.setStorage({
            key: "showRule",
            data: "false"
          })

          if(databus.bannerOver){
            //显示广告
            databus.bannerAd && databus.bannerAd.show()
          }

        }, databus.laterTime)
        //按钮按下音效
        this.music.playMusic('btnDown')
      }
    } else if (databus.gameState == 11) {//8:金币规则弹框
      // 点击确认事件
      if (x >= (250 * ratio) && x <= ((250 + 312) * ratio) && y >= (820 * ratio) && y <= ((820 + 142) * ratio)) {
        databus.btnPlus = 1
        setTimeout(() => {
          databus.gameState = 1
          databus.btnPlus = 0
        }, databus.laterTime)
        //按钮按下音效
        this.music.playMusic('btnDown')
      }
    }else if (databus.gameState == 1){//游戏进行中
      // 首页按钮事件
      if (x >= hc.x && x <= hc.x + hc.w && y >= hc.y && y <= hc.y + hc.h) {
        databus.gameState = 6
        //按钮按下音效
        this.music.playMusic('btnDown')
      }
      // 规则按钮事件
      if (x >= rulec.x && x <= rulec.x + rulec.w && y >= rulec.y && y <= rulec.y + rulec.h) {
        databus.gameState = 8
        databus.fingerAniTime = 0
        //隐藏广告
        databus.bannerAd && databus.bannerAd.hide()
        //按钮按下音效
        this.music.playMusic('btnDown')
      }
      // 音乐按钮事件
      if (x >= mc.x && x <= mc.x + mc.w && y >= mc.y && y <= mc.y + mc.h) {
        databus.gameState = 3
        databus.musicBgState = databus.musicBg
        databus.musicSoundState = databus.musicSound
        //按钮按下音效
        this.music.playMusic('btnDown')
      }
      // 增加步数购买按钮事件
      if (x >= (270 * ratio) && x <= ((270 + 50) * ratio) && y >= (1155 * ratio + databus.gameTop) && y <= ((1155 + 50) * ratio) + databus.gameTop) {
        if((databus.usersteps == 0 || databus.usersteps == '0') && (databus.usergold >= databus.stepprice)){
          databus.buyTips = true
        }
        databus.gameState = 5
        //按钮按下音效
        this.music.playMusic('btnDown')
      }
      // 增加步数使用按钮事件
      if (x >= (270 * ratio) && x <= ((270 + 140) * ratio) && y >= (1045 * ratio + databus.gameTop) && y <= ((1045 + 120) * ratio) + databus.gameTop) {
        if (databus.usersteps > 0) {
          this.useTool('3')
        } else {
          if((databus.usersteps == 0 || databus.usersteps == '0') && (databus.usergold >= databus.stepprice)){
            databus.buyTips = true
          }
          databus.gameState = 5
        }
        //按钮按下音效
        this.music.playMusic('btnDown')
      }

      // 金币问号事件
      if (x >= cc.x  && x <= (cc.x + cc.w) && y >= cc.y && y <= (cc.y + cc.h)) {
        databus.gameState = 11
        //按钮按下音效
        this.music.playMusic('btnDown')
      }
      
      // 彩色道具购买按钮事件
      // if (x >= (455 * ratio) && x <= ((455 + 50) * ratio) && y >= (1235 * ratio) && y <= ((1235 + 50) * ratio)) {
      //   databus.gameState = 4
      //   //按钮按下音效
      //   this.music.playMusic('btnDown')
      // }

      //游戏区域事件
      if ((x < btlr || y < btt) || (x > bwh + btlr || y > bwh + btt)) {
        return
      }
      //判断手指落下的坐标
      let rc = this.getRC(x, y)
      //如果落在砖块上
      if (rc) {
        databus.selectBlocks = []
        databus.selectBlocks.push(rc)
        databus.selectAniBlocks.push(rc)
        //棋子按下音效
        this.music.playMusic('piecesDown' + databus.selectBlocks.length)
        this.checkDoubleHit(databus.selectBlocks)
        this.getDoubleHitNum()
        //震动效果
        wx.vibrateShort()
      } else {
        return
      }
      //绑定move和end事件
      this.touchMoveHandler = this.touchMove.bind(this)
      this.touchEndHandler = this.touchEnd.bind(this)
      canvas.addEventListener('touchmove', this.touchMoveHandler)
      canvas.addEventListener('touchend', this.touchEndHandler)
    }
  }

  touchMove(e) {
    e.preventDefault();
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    if (databus.gameState == 1) {
      if (this.STATE != "静稳状态") {
        return;
      }

      this.x = x;
      this.y = y;

      //判断手指移动中所在的砖块
      let rc = this.getRC(x, y)

      //如果移动不在砖块内就return
      if (!rc || databus.selectBlocks.length == 0) {
        return
      }
      //已选择的上一个砖块
      let pb = databus.selectBlocks[databus.selectBlocks.length - 1]
      //如果当前砖块就是上一个砖块就return
      if (rc.row == pb.row && rc.col == pb.col) {
        return
      }
      //如果移动中的砖块处在已选择的上一个砖块的九宫格内，再判断color,再将color相同的加入连线数组中
      if (Math.abs(rc.row - pb.row) <= 1 && Math.abs(rc.col - pb.col) <= 1) {
        if (this.map.blocks[rc.row][rc.col].attr.piecesType == this.map.blocks[pb.row][pb.col].attr.piecesType) {
          if (JSON.stringify(databus.selectBlocks).indexOf(JSON.stringify(rc)) == -1) {
            databus.selectBlocks.push(rc)
            databus.selectAniBlocks.push(rc)
            //棋子按下音效
            if (databus.selectBlocks.length > 10) {
              this.music.playMusic('piecesDown10')
            } else {
              this.music.playMusic('piecesDown' + databus.selectBlocks.length)
            }
            this.checkDoubleHit(databus.selectBlocks)
            this.getDoubleHitNum()
            //震动效果
            wx.vibrateShort()
          } else {
            //如果回退,则连线回退，即去除之前连线的棋子
            if (JSON.stringify(rc) == JSON.stringify(databus.selectBlocks[databus.selectBlocks.length - 2])) {
              databus.selectBlocks.splice(databus.selectBlocks.length - 1, 1)
              this.getDoubleHitNum()
            }
          }
        }
      }
    // //改变标记
    // this.istuozhuai = true;
    // //写当前帧
    // this.starttuozhuai = this.f;
    }
  }

  touchEnd() {
    if (databus.gameState == 1) {
      this.checkBomb()
      canvas.removeEventListener('touchmove', this.touchMoveHandler)
      canvas.removeEventListener('touchend', this.touchEndHandler)
    }
  }

  /**
   * 手指触摸事件结束
   */

  /**
   * 工具函数开始
   */

  //工具函数
  getRC(x, y) {
    //判断是否在游戏区域内  不是就检查爆炸并return
    if ((x < btlr || y < btt) || (x > bwh + btlr || y > bwh + btt)) {
      this.checkBomb()
      return false
    }

    //判断在哪一个区块 包括边框 
    let rx = parseInt((x - btlr - bi) / (bl + pm));
    let ry = parseInt((y - btt - bi) / (bl + pm));
    //除去边框 判断在哪一个区块
    if (((x - btlr - bi) < ((rx + 1) * bl + rx * pm)) && ((y - btt - bi) < ((ry + 1) * bl + ry * pm))) {
      //记录手指移动时候的位置
      if (ry != databus.rowNum && rx != databus.colNum) {
        return {
          row: ry,
          col: rx
        }
      } else {
        return false
      }
    } else {
      return false
    }

  }

  //touchmove结束或者手指超出边界 导致本次连线结束 判断是否爆炸
  checkBomb() {
    if (databus.selectBlocks.length >= 3) {//如果连线超过3个就爆炸
      this.map.blocksBomb(databus.selectBlocks)
      //打一个标记
      this.startBomb = this.f;
      //瞬间变为爆破动画
      this.STATE = "爆破动画";
    }
    //连线结束  清空已连棋子
    databus.selectBlocks = []
    //清空上次移动的最终坐标
    this.x = null
    this.y = null

    databus.doubleHitList = 0
    databus.doubleHit = 0
  }

  //画折线
  drawLine() {
    let pointsList = databus.selectBlocks || [];
    if (pointsList.length == 0) {
      return
    }
    this.ctx.beginPath();
    for (var i = 0; i < pointsList.length; i++) {
      if (i < pointsList.length - 1) {
        this.ctx.moveTo(databus.getPointCenter(pointsList[i]).x, databus.getPointCenter(pointsList[i]).y);
        this.ctx.lineTo(databus.getPointCenter(pointsList[i + 1]).x, databus.getPointCenter(pointsList[i + 1]).y);
      } else {
        this.ctx.moveTo(databus.getPointCenter(pointsList[i]).x, databus.getPointCenter(pointsList[i]).y);
        this.ctx.lineTo(this.x, this.y);
      }
    }
    //如果已经爆炸则return
    if (this.x == null && this.y == null) {
      return
    }
    this.ctx.lineWidth = 10 * ratio;
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.stroke();
  }

  checkDoubleHit(sb) {
    if(sb.length < 3) return
    let sb1 = this.map.blocks[sb[sb.length - 1].row][sb[sb.length - 1].col].attr.piecesLevel
    let sb2 = this.map.blocks[sb[sb.length - 2].row][sb[sb.length - 2].col].attr.piecesLevel
    let sb3 = this.map.blocks[sb[sb.length - 3].row][sb[sb.length - 3].col].attr.piecesLevel
    if (sb1 == sb2 && sb2 == sb3){
      this.music.playMusic('doubleHit')
    }
  }


  //分数计算根据连线棋子
  getScoreBySb(sb) {
    if (sb.length <= 0) return
    var bombScore = 0;//本次爆炸分数
    var scorePrev = 0;//上一个连线分数
    var scoreList = [];//相同连线分数的集合
    var doubleHit = 0;//连击次数
    for (var i = 0; i < sb.length; i++) {
      //计算分数
      var piecesLevelScore = databus.piecesLevelScore[this.map.blocks[sb[i].row][sb[i].col].attr.piecesLevel];
      if (scorePrev == 0) {
        scorePrev = piecesLevelScore;
        scoreList.push(piecesLevelScore)
      } else if (piecesLevelScore == scorePrev) {
        scoreList.push(piecesLevelScore)
      } else {
        scorePrev = piecesLevelScore;
        bombScore = bombScore + databus.getScoreForList(scoreList)
        //连击加1
        if (scoreList.length >= 3) {
          doubleHit++
        }
        scoreList = []
        scoreList.push(piecesLevelScore)
      }
      if (i == sb.length - 1) {
        //连击加1
        if (scoreList.length >= 3) {
          doubleHit++
        }
        bombScore = bombScore + databus.getScoreForList(scoreList)
      }
    }

    //连击得分
    if (doubleHit == 0) {
      doubleHit = 1
    }

    return bombScore * doubleHit
  }

  //计算旗子连击数量
  getDoubleHitNum() {
    const sb = databus.selectBlocks;
    if (sb.length <= 0) return
    var scorePrev = 0;//上一个连线分数
    var scoreList = [];//相同连线分数的集合
    var doubleHitBL = [];//相同连线分数的集合
    var doubleHit = 0;//连击次数
    var doubleHitList = [] //连击数列表
    for (var i = 0; i < sb.length; i++) {
      //计算分数
      var piecesLevelScore = databus.piecesLevelScore[this.map.blocks[sb[i].row][sb[i].col].attr.piecesLevel];
      if (scorePrev == 0) {
        scorePrev = piecesLevelScore;
        scoreList.push(piecesLevelScore)
        doubleHitBL.push(sb[i])
      } else if (piecesLevelScore == scorePrev) {
        scoreList.push(piecesLevelScore)
        doubleHitBL.push(sb[i])
      } else {
        scorePrev = piecesLevelScore;
        //连击加1
        if (scoreList.length >= 3) {
          doubleHit++
          doubleHitList = doubleHitList.concat(doubleHitBL)
        }
        scoreList = []
        doubleHitBL = []
        scoreList.push(piecesLevelScore)
        doubleHitBL.push(sb[i])
      }

      if (i == sb.length - 1) {
        //连击加1
        if (scoreList.length >= 3) {
          doubleHit++
          doubleHitList = doubleHitList.concat(doubleHitBL)
        }
      }
    }

    databus.doubleHitList = doubleHitList
    databus.doubleHit = doubleHit
  }



  /**
   * 工具函数结束
   */
}