import Map from './map'
import DataBus from '../../databus'
import ajax from '../../base/ajax'

let databus = new DataBus()

//统一配置UI值
let bl = databus.GameUI.piecesWH //棋子宽高  
let bwh = databus.GameUI.boardWH //棋盘宽高  
let btt = databus.GameUI.boardToTOP //棋盘到顶部的距离  
let btlr = databus.GameUI.boardToLR //棋盘左右两边间距  
let bi = databus.GameUI.boardInner //棋盘内边框  
let pm = databus.GameUI.piecesMargin //棋子边距 
let rcc = databus.GameUI.cupCoordinates //奖杯坐标宽高
let sbc = databus.GameUI.scoreBgCoordinates //积分背景坐标宽高
let sc = databus.GameUI.stepsCoordinates //步数坐标宽高
let pec = databus.GameUI.progressEmptyCoordinates //空进度条坐标宽高
let pfc = databus.GameUI.progressFullCoordinates //满进度条坐标宽高
let fc = databus.GameUI.fruitCoordinates //水果icon坐标宽高
let hc = databus.GameUI.homeCoordinates //首页按钮坐标宽高
let mc = databus.GameUI.musicCoordinates //音乐按钮坐标宽高
let asc = databus.GameUI.addStepsCoordinates //增加步数按钮坐标宽高
let ctc = databus.GameUI.colorToolCoordinates //彩色道具坐标宽高
let cc = databus.GameUI.coinCoordinates //金币坐标宽高
let cpc = databus.GameUI.checkPointCoordinates //关卡文字坐标宽高
let shsc = databus.GameUI.selfHighScoreCoordinates //个人最高分数坐标
let hsc = databus.GameUI.highestScoreCoordinates //世界最高分数坐标
let snc = databus.GameUI.stepsNumCoordinates //步数坐标
let stc = databus.GameUI.stepsTxtCoordinates //步数文字坐标
let csc = databus.GameUI.currentScoreCoordinates //当前分数坐标
let psc = databus.GameUI.passScoreCoordinates //当前过关分数坐标




//游戏页主函数
export default class Index {
  constructor(ctx) {
    // 维护当前requestAnimationFrame的id
    this.aniId = 1;
    this.f = 0;
    //当前游戏状态
    this.STATE = "静稳状态";  //爆破检查、爆破动画、下落动画、补充新的、静稳状态

    //加载所有资源，资源都load之后，定时器开启
    this.R = {
      "bg": "images/bg.png",
      "gameBg": "images/gameBg.png",
      "icon0": "images/icon1.png",
      "icon1": "images/icon2.png",
      "icon2": "images/icon3.png",
      "baozha": "images/baozha.png",
      "addSteps": "images/icon_addSteps.png",
      "cup": "images/icon_cup.png",
      "coin": "images/icon_coin.png",
      "home": "images/icon_home.png",
      "music": "images/icon_music.png",
      "colorTool": "images/icon_tool.png",
      "progressEmpty": "images/progress_empty.png",
      "progressFull": "images/progress_full.png",
      "fruit": "images/icon_fruit.png",
      "scoreBg": "images/score_bg.png",
      "steps": "images/steps.png",
      "pieceslevel1": "images/pieceslevel1.png",
      "pieceslevel2": "images/pieceslevel2.png",
      "pieceslevel3": "images/pieceslevel3.png"
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
  }

  restart(ctx) {
    this.ctx = ctx
    //地图，唯一的实例
    this.map = new Map(ctx)
    //添加监听
    // this.bindEvent()
    this.touchStartHandler = this.touchStart.bind(this)
    canvas.addEventListener('touchstart', this.touchStartHandler)

		//主循环开始
    this.bindLoop = this.loop.bind(this)

    // 清除上一帧的动画
    window.cancelAnimationFrame(this.aniId)
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
  }

  finish() {
    //清除定时动画和绑定事件
    window.cancelAnimationFrame(this.aniId)
    canvas.removeEventListener('touchstart', this.touchStartHandler)
  }

  touchStart(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    // 首页按钮事件
    if (x >= hc.x && x <= hc.x + hc.w && y >= hc.y && y <= hc.y + hc.h) {
      databus.scene = 0
        //请求示例
        wx.login({
          success: (res) => {
            let options = {
              tradecode:'sys01',
              url: 'https://koba-studio.com/kobaserver/service/json',
              method: 'POST',
              data: { "user": { "code": res.code } },
              success(res) {
                console.log(1)
              },
              fail(res) {
                console.log(2)
              },
              complete(res) {
                console.log(3)
              }
            }
            ajax(options)
          },
          fail: (res) => {
            console.log(res)
          }
        })
    }

    //页面结束事件
    if (databus.scene != 1) {
      this.finish()
    }

    //游戏区域事件
    if ((x < btlr || y < btt) || (x > bwh + btlr || y > bwh + btt)) {
      return
    }
    //判断手指落下的坐标
    let rc = this.getRC(x,y)
    //如果落在砖块上
    if(rc){
      databus.selectBlocks = []
      databus.selectBlocks.push(rc)
    }else{
      return
    }
    //绑定move和end事件
    this.touchMoveHandler = this.touchMove.bind(this)
    this.touchEndHandler = this.touchEnd.bind(this)
    canvas.addEventListener('touchmove', this.touchMoveHandler)
    canvas.addEventListener('touchend', this.touchEndHandler)
  }

  touchMove(e) {
    e.preventDefault();
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    if (this.STATE != "静稳状态") {
      return;
    }

    this.x = x;
    this.y = y;
    
    //判断手指移动中所在的砖块
    let rc = this.getRC(x, y)

    //如果移动不在砖块内就return
    if(!rc){
      return
    }
    //已选择的上一个砖块
    let pb = databus.selectBlocks[databus.selectBlocks.length - 1]
    //如果当前砖块就是上一个砖块就return
    if(rc.row == pb.row && rc.col == pb.col){
      return
    }
    //如果移动中的砖块处在已选择的上一个砖块的九宫格内，再判断color,再将color相同的加入连线数组中
    if (Math.abs(rc.row - pb.row) <= 1 && Math.abs(rc.col - pb.col) <= 1 ){
      if (this.map.blocks[rc.row][rc.col].attr.piecesType == this.map.blocks[pb.row][pb.col].attr.piecesType){
        if (JSON.stringify(databus.selectBlocks).indexOf(JSON.stringify(rc)) == -1){
          databus.selectBlocks.push(rc)
        }else{
          //如果回退,则连线回退，即去除之前连线的棋子
          if (JSON.stringify(rc) == JSON.stringify(databus.selectBlocks[databus.selectBlocks.length - 2])){
            databus.selectBlocks.splice(databus.selectBlocks.length - 1, 1)
          }
        }
      }
    }
    // //改变标记
    // this.istuozhuai = true;
    // //写当前帧
    // this.starttuozhuai = this.f;
  }

  touchEnd() {
    this.checkBomb()
    canvas.removeEventListener('touchmove', this.touchMoveHandler)
    canvas.removeEventListener('touchend', this.touchEndHandler)
  }

  getRC(x,y){
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
      if (ry != databus.rowNum && rx != databus.colNum){
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
  checkBomb(){
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
  }

  //画折线
  drawLine(){
    let pointsList = databus.selectBlocks || [];
    if (pointsList.length == 0){
      return
    }
    this.ctx.beginPath();
    for (var i = 0; i < pointsList.length; i++) {
      if (i < pointsList.length - 1){
        this.ctx.moveTo(this.getPointCenter(pointsList[i]).x, this.getPointCenter(pointsList[i]).y);
        this.ctx.lineTo(this.getPointCenter(pointsList[i + 1]).x, this.getPointCenter(pointsList[i + 1]).y);
      } else {
        this.ctx.moveTo(this.getPointCenter(pointsList[i]).x, this.getPointCenter(pointsList[i]).y);
        this.ctx.lineTo(this.x, this.y);
      }
    }
    //如果已经爆炸则return
    if (this.x == null && this.y == null){
      return
    }
    this.ctx.lineWidth = 6;
    this.ctx.strokeStyle = "#cccccc";
    this.ctx.stroke();
  }

  //获取棋子所在中心的坐标
  getPointCenter(point){
    var coordinates = {};
    coordinates.x = point.col * (bl + pm) + bl / 2 + btlr + bi;
    coordinates.y = point.row * (bl + pm) + bl / 2 + btt + bi;
    return coordinates
  }

  //canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {
    //清屏
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //帧编号
    this.f++;
    //绘制背景。背景没动,也要每帧擦除，重绘
    ctx.drawImage(this.Robj["bg"], 0, 0, canvas.width, canvas.height);
    //绘制棋盘
    ctx.drawImage(this.Robj["gameBg"], 0, 0, this.Robj["gameBg"].width, this.Robj["gameBg"].height, btlr, btt, bwh, bwh);
    //绘制奖杯图标
    ctx.drawImage(this.Robj["cup"], 0, 0, this.Robj["cup"].width, this.Robj["cup"].height, rcc.x, rcc.y, rcc.w, rcc.h);
    //绘制分数背景
    ctx.drawImage(this.Robj["scoreBg"], 0, 0, this.Robj["scoreBg"].width, this.Robj["scoreBg"].height, sbc.x, sbc.y, sbc.w, sbc.h);
    //绘制步数图标
    ctx.drawImage(this.Robj["steps"], 0, 0, this.Robj["steps"].width, this.Robj["steps"].height, sc.x, sc.y, sc.w, sc.h);
    //绘制空进度条
    ctx.drawImage(this.Robj["progressEmpty"], 0, 0, this.Robj["progressEmpty"].width, this.Robj["progressEmpty"].height, pec.x, pec.y, pec.w, pec.h);
    //绘制满进度条
    ctx.drawImage(this.Robj["progressFull"], 0, 0, this.Robj["progressFull"].width, this.Robj["progressFull"].height, pfc.x, pfc.y, pfc.w, pfc.h);
    //绘制水果icon
    ctx.drawImage(this.Robj["fruit"], 0, 0, this.Robj["fruit"].width, this.Robj["fruit"].height, fc.x, fc.y, fc.w, fc.h);
    //绘制首页按钮
    ctx.drawImage(this.Robj["home"], 0, 0, this.Robj["home"].width, this.Robj["home"].height, hc.x, hc.y, hc.w, hc.h);
    //绘制音乐按钮
    ctx.drawImage(this.Robj["music"], 0, 0, this.Robj["music"].width, this.Robj["music"].height, mc.x, mc.y, mc.w, mc.h);
    //绘制增加步数按钮
    ctx.drawImage(this.Robj["addSteps"], 0, 0, this.Robj["addSteps"].width, this.Robj["addSteps"].height, asc.x, asc.y, asc.w, asc.h);
    //绘制彩色道具按钮
    ctx.drawImage(this.Robj["colorTool"], 0, 0, this.Robj["colorTool"].width, this.Robj["colorTool"].height, ctc.x, ctc.y, ctc.w, ctc.h);
    //绘制金币图标
    ctx.drawImage(this.Robj["coin"], 0, 0, this.Robj["coin"].width, this.Robj["coin"].height, cc.x, cc.y, cc.w, cc.h);


    // 关卡
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = cpc.font;
    ctx.fillText('第' + databus.checkPoint + '关', cpc.x, cpc.y);
    //世界最高分数
    ctx.font = hsc.font;
    ctx.fillText(databus.highestScore, hsc.x, hsc.y);
    //步数
    ctx.font = snc.font;
    ctx.fillText(databus.steps, snc.x, snc.y);
    //步数文字
    ctx.font = stc.font;
    ctx.fillText('步数', stc.x, stc.y);
    //当前分数
    ctx.font = csc.font;
    ctx.fillText(databus.score, csc.x, csc.y);
    //当前过关分数
    ctx.font = psc.font;
    ctx.fillText(databus.passScore, psc.x, psc.y);
    // 个人最高分
    ctx.fillStyle = '#f9c152';
    ctx.textAlign = 'left';
    ctx.font = shsc.font;
    ctx.fillText('最好记录：' + databus.selfHighScore, shsc.x, shsc.y);


    //根据手指移动绘制连线
    this.drawLine()
    //绘制棋子
    this.map.render(ctx, this.Robj);

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
    } else if (this.STATE == "爆破动画" && this.f > this.startBomb + 21) {
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
  }

  // 实现游戏帧循环
  loop() {
    this.render(this.ctx)
    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
  }
}
