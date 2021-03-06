import Block from './block'
import Music from '../../music/music'
import DataBus from '../../databus'
import { ajax } from '../../base/ajax'


let databus = new DataBus()
let uiWidth = 828;
let ratio = canvas.width / uiWidth //设计稿宽度

//棋盘的宽数和列数
let rn = databus.rowNum
let cn = databus.colNum

let R = {
  "combo": "images/gamePage/combo/combo.png",
  "combo2": "images/gamePage/combo/combo2.png",
  "combo3": "images/gamePage/combo/combo3.png",
  "comboNum0": "images/gamePage/combo/0.png",
  "comboNum1": "images/gamePage/combo/1.png",
  "comboNum2": "images/gamePage/combo/2.png",
  "comboNum3": "images/gamePage/combo/3.png",
  "comboNum4": "images/gamePage/combo/4.png",
  "comboNum5": "images/gamePage/combo/5.png",
  "comboNum6": "images/gamePage/combo/6.png",
  "comboNum7": "images/gamePage/combo/7.png",
  "comboNum8": "images/gamePage/combo/8.png",
  "comboNum9": "images/gamePage/combo/9.png",
  "score0": "images/gamePage/comboScore/0.png",
  "score1": "images/gamePage/comboScore/1.png",
  "score2": "images/gamePage/comboScore/2.png",
  "score3": "images/gamePage/comboScore/3.png",
  "score4": "images/gamePage/comboScore/4.png",
  "score5": "images/gamePage/comboScore/5.png",
  "score6": "images/gamePage/comboScore/6.png",
  "score7": "images/gamePage/comboScore/7.png",
  "score8": "images/gamePage/comboScore/8.png",
  "score9": "images/gamePage/comboScore/9.png",
}

//把所有的图片放到一个对象中
let Robj = {};	//两个对象有相同的k
// 遍历R对象，把真实image对象，放入this.Robj中
for (var k in R) {
  Robj[k] = wx.createImage();
  Robj[k].src = R[k];
}
/**
 * 游戏页
 */
export default class Map {
  constructor(ctx) {
    this.ctx = ctx;
    //二维矩阵
    this.QRcode = [];
    //存放真实block元素的矩阵
    this.blocks = [];
    //临时用一下的小矩阵
    //所有需要爆炸的元素的标记
    this.needToBomb = [];
    //下落行数阵
    this.downRow = [];

    //根据行列数生成二维矩阵
    for (var r = 0; r < rn; r++) {
      this.QRcode[r] = []
      this.blocks[r] = []
      this.needToBomb[r] = []
      this.downRow[r] = []
      for (var c = 0; c < cn; c++) {
        this.QRcode[r][c] = {
          piecesType: _.random(0, databus.piecesType - 1),
          piecesLevel: databus.getPiecesLevel(),
          piecesCoin: _.random(0, 10) > 9 ? true : false
        }
      }
    }

    this.createBlocksByQR();

    this.music = new Music()
    this.gsl = [];
    // this.gcl = [];
    // this.gslScore = 0;
    this.gclCombo = 0;
    this.gclTime = 0;
    this.gslTime = 0;
    this.ss = false;
    this.sc = false;
  }

  createBlocksByQR() {
    //根据QRcode，把blocks里面填值
    for (var r = 0; r < rn; r++) {
      for (var c = 0; c < cn; c++) {
        this.blocks[r][c] = new Block(r, c, this.QRcode[r][c]);
      }
    }
  }

  /**
 * 渲染
 */
  render(ctx, Robj) {
    //渲染地图就是渲染自己的所有转块
    for (var r = 0; r < rn; r++) {
      for (var c = 0; c < cn; c++) {
        //更新所有转块
        this.blocks[r][c].update();
        //渲染所有转块
        this.blocks[r][c].render(ctx, Robj);

        //判断爆炸动画
        for (let i = 0; i < databus.selectAniBlocks.length; i++) {
          if(databus.selectAniBlocks[i].row == r && databus.selectAniBlocks[i].col == c ){
            this.blocks[r][c].selectAni(ctx,i);
          }
        }
        // //打印地图矩阵
        // ctx.fillText(this.QRcode[r][c], c * 10, 60 + r * 10);
        // //打印自己needToBomb阵
        // if (this.needToBomb[r][c]) {
        //   ctx.fillText(this.needToBomb[r][c], 100 + c * 10, 60 + r * 10);
        // }
        // //打印自己的downRow阵
        // if (this.downRow[r][c]) {
        //   ctx.fillText(this.downRow[r][c], 200 + c * 10, 60 + r * 10);
        // }
        // ctx.fillText(databus.combo, 200, 60);
      }
    }
    //渲染得分
    this.showScore()
    //渲染combo
    this.showCombo()
  }

  //检测是否combo
  check() {
    var result = false;
    //遍历上次消除的棋子来获取能够combo的棋子位置
    var psb = databus.prevSelectBlocks; //上次消除的棋子包括combod的
    var comboBlocks = []; //能combo的棋子数组
    for (var i = 0; i < psb.length; i++) {
      //如果当前棋子在comboBlocks中，那就找到相同位置的棋子然后往下顺延，如果顺延到5则无法combo，判断方向向下
      if (JSON.stringify(comboBlocks).indexOf(JSON.stringify(psb[i])) >= 0) {
        for (var j = 0; j < comboBlocks.length; j++) {
          if (JSON.stringify(comboBlocks[j]) == JSON.stringify(psb[i])) {
            if (comboBlocks[j].row < 5) {
              comboBlocks[j].row = comboBlocks[j].row + 1
            } else {
              comboBlocks.splice(j, 1)
            }
          }
        }
      } else {//如果当前棋子不在comboBlocks中，并且不在最后一行，并且顺延棋子不在上次消除的棋子中，判断方向向上
        if (psb[i].row < 5) {
          var rc = {
            row: psb[i].row + 1,
            col: psb[i].col
          }
          if (JSON.stringify(psb).indexOf(JSON.stringify(rc)) < 0) {
            comboBlocks.push(rc)
          }
        }
      }
    }
    // debugger
    var checkComboBlocks = [];//当前屏幕棋子竖方向相连大于2的数组
    var isCombo = 0;//当前屏幕棋子是否符合combo
    databus.prevSelectBlocks = []
    //按列遍历。
    for (var c = 0; c < cn; c++) {
      var i = 0;
      var j = 1;
      while (i < cn) {
        if (j < cn && (this.QRcode[i][c].piecesType == this.QRcode[j][c].piecesType)) {
          j++;
        } else {
          //把i和j之前的位，推入结果数组
          if (j - i >= 2) {
            for (var m = i; m < j; m++) {
              checkComboBlocks.push({ row: m, col: c })
            }
            //利用上面得出当前屏幕棋子竖方向相连大于2的数组，判断能combo的棋子数组是否存在相连大于2的情况
            for (var k = 0; k < comboBlocks.length; k++) {
              if (JSON.stringify(checkComboBlocks).indexOf(JSON.stringify(comboBlocks[k])) > 1) {

                databus.prevSelectBlocks = databus.prevSelectBlocks.concat(checkComboBlocks)
                databus.combo = databus.combo + 1
                isCombo = isCombo + 1

                //显示combo
                // let x = databus.getPointCenter(checkComboBlocks[checkComboBlocks.length - 2]).x + (1 - _.random(0, 2)) * _.random(0, 50) * ratio;
                // const y = databus.getPointCenter(checkComboBlocks[checkComboBlocks.length - 2]).y;
                // if (x > 400 * ratio) {
                //   x = 400 * ratio + (1 - _.random(0, 2)) * _.random(0, 50) * ratio
                // }
                // this.gcl.push({
                  // rc: checkComboBlocks[checkComboBlocks.length - 2],
                  // combo: databus.combo,
                  // t: 0,
                  // x: x,
                  // y: y
                // })
                this.gclCombo++
                this.comboBlocksBomb(checkComboBlocks)

                result = true;
              }
            }
            checkComboBlocks = []
          }
          i = j;
          j++;
        }
      }
    }
    if (this.gclCombo > 0) {
      this.sc = true
    }
    // if (this.gslScore > 0) {
    //   this.ss = true
    // }
    //重置能combo的棋子数组
    comboBlocks = []
    //如果当前页没有combo，则combo连击清0，上一次消除也清0,可以进行手指连线消除
    if (isCombo == 0) {
      // if (this.gslScore > 0) {
      //   this.gslScore = 0
      //   this.gslTime = 0
      //   this.ss = false
      // }
      if (this.gclCombo > 0) {
        this.gclCombo = 0
        this.gclTime = 0
        this.sc = false
      }
      databus.combo = 0
      databus.prevSelectBlocks = []
      // this.gcl = []
      // this.gsl = []
      //判断是否过关
      this.checkPassStage()
    }
    return result;
  }

  //combo消除并且计算积分
  comboBlocksBomb(cb) {
    if (cb.length <= 0) return;
    for (var i = 0; i < cb.length; i++) {
      this.needToBomb[cb[i].row][cb[i].col] = "X";
      this.blocks[cb[i].row][cb[i].col].bomb();
    }
    //combo音效
    this.music.playMusic('combo')
    //计算消除得分
    this.getScoreForBomb(cb)
  }

  //连线消除
  blocksBomb(sb) {
    if (sb.length <= 0) return
    if (databus.steps <= 0 ){
      databus.gameState = 9 //游戏异常
      return
    }
    //减去1步
    databus.steps--;
    if(databus.steps <= 5){
      databus.stepsAni = true
    }
    //当前关卡使用步数
    databus.useSteps++;
    //存储当前消除的棋子数组
    databus.prevSelectBlocks = sb;
    //消除棋子
    for (var i = 0; i < sb.length; i++) {
      this.needToBomb[sb[i].row][sb[i].col] = "X";
      this.blocks[sb[i].row][sb[i].col].bomb();
    }
    //计算消除得分
    this.getScoreForBomb(sb)
    //预获得分数归0
    databus.preScore = 0;
  }

  //根据棋子消除序列计算得分
  getScoreForBomb(sb) {
    if (sb.length <= 0) return
    var bombScore = 0;//本次爆炸分数
    var scorePrev = 0;//上一个连线分数
    var scoreList = [];//相同连线分数的集合
    var doubleHit = 0;//连击次数
    var gold = 0;//棋子所带金币
    for (var i = 0; i < sb.length; i++) {
      //计算金币
      if (this.blocks[sb[i].row][sb[i].col].attr.piecesCoin){
        gold++
      }
      //计算分数
      var piecesLevelScore = databus.piecesLevelScore[this.blocks[sb[i].row][sb[i].col].attr.piecesLevel];
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
      databus.doubleHit = doubleHit
      doubleHit = 1
    }else{
      databus.doubleHit = doubleHit
    }
    
    databus.score = databus.score + bombScore * doubleHit

    //显示获得得分
    const x = databus.getPointCenter(sb[sb.length - 1]).x;
    const y = databus.getPointCenter(sb[sb.length - 1]).y;

    this.gsl.push({
      rc: sb[sb.length - 1],
      score: bombScore * doubleHit,
      t:0,
      x:x,
      y:y
    })
    // if (this.gclCombo > 0) {
    //   this.gslScore = this.gslScore + bombScore * doubleHit
    // }
    //得分音效
    this.music.playMusic('getScore')
    if (gold > 0 ){
      //上报金币
      this.updateGold(gold)
      this.music.playMusic('getCoin')
    }
  }

  updateGold(gold) {
    var self = this;
    let options = {
      tradecode: 'acct03',
      apiType: 'user',
      method: 'POST',
      data: {
        'gold': gold,//当前关卡过关分数
        'gameid': databus.gameId,//游戏id
      },
      success(data) {
        databus.usergold = parseInt(databus.usergold) + gold;
        databus.stagegold = parseInt(databus.stagegold) + gold;
        // if((databus.usersteps == 0 || databus.usersteps == '0') && (databus.usergold >= databus.stepprice) && databus.buyTips){
        //   databus.buyTips = false
        // }
      }
    }
    ajax(options)
  }

  showScore(){
    if (this.gsl.length <= 0) return;
    for (var i = 0; i < this.gsl.length; i++) {
      if (this.gsl[i].t < 50) {
        //显示分数
        const score = (this.gsl[i].score + '').split('');
        const len = score.length;
        for (let j = 0; j < len; j++) {
          this.ctx.drawImage(Robj["score" + score[j]], 0, 0, Robj["score" + score[j]].width, Robj["score" + score[j]].height, this.gsl[i].x + 35 * j * ratio, this.gsl[i].y, 30 * ratio, 40 * ratio);
        }

        this.gsl[i].t++
      }
    }
    // if (this.gslScore == 0 || !this.ss) return;
    // if (this.ss) {
    //   //显示分数
    //   const score = (this.gslScore + '').split('');
    //   const len = score.length;
    //   for (let j = 0; j < len; j++) {
    //     // if (this.gslTime <= 30) {
    //     //   this.ctx.globalAlpha = (1 / 30) * this.gslTime;
    //     // } else {
    //     //   this.ctx.globalAlpha = 1 - (1 / 30) * (this.gslTime - 30);
    //     // }
    //     this.ctx.drawImage(Robj["score" + score[j]], 0, 0, Robj["score" + score[j]].width, Robj["score" + score[j]].height, (uiWidth - 30) / 2 * ratio + 35 * j * ratio, 750 * ratio, 30 * ratio, 40 * ratio);
    //   }
    //   this.gslTime++
    // }
  }


  showCombo() {
    // if (this.gcl.length <= 0) return;
    // for (var i = 0; i < this.gcl.length; i++) {
    //   if (this.gcl[i].t < 60) {
    //     //显示Combo
    //     if (i == 0) {
    //       this.ctx.drawImage(Robj["combo"], 0, 0, Robj["combo"].width, Robj["combo"].height, this.gcl[i].x, this.gcl[i].y, 200 * ratio, 54 * ratio);
    //     } else if (i == 1) {
    //       this.ctx.drawImage(Robj["combo2"], 0, 0, Robj["combo2"].width, Robj["combo2"].height, this.gcl[i].x, this.gcl[i].y, 298 * ratio, 54 * ratio);
    //     } else {
    //       this.ctx.drawImage(Robj["combo3"], 0, 0, Robj["combo3"].width, Robj["combo3"].height, this.gcl[i].x, this.gcl[i].y, 282 * ratio, 60 * ratio);
    //       if(i < 10){
    //         this.ctx.drawImage(Robj["comboNum" + (i + 1)], 0, 0, Robj["comboNum" + (i + 1)].width, Robj["comboNum" + (i + 1)].height, this.gcl[i].x + 290 * ratio, this.gcl[i].y, 42 * ratio, 66 * ratio);
    //       }
    //     }
    //     this.gcl[i].t++
    //   }
    // }
    if (this.gclCombo == 0 || !this.sc) return;
    if (this.sc) {
      // if (this.gclTime <= 30){
      //   this.ctx.globalAlpha = (1 / 30) * this.gclTime;
      // }else{
      //   this.ctx.globalAlpha = 1 - (1 / 30) * (this.gclTime - 30);
      // }
      //显示Combo
      this.ctx.drawImage(Robj["combo3"], 0, 0, Robj["combo3"].width, Robj["combo3"].height, (uiWidth - 225) / 2 * ratio, 680 * ratio, 225 * ratio, 48 * ratio);
      this.ctx.drawImage(Robj["comboNum" + this.gclCombo], 0, 0, Robj["comboNum" + this.gclCombo].width, Robj["comboNum" + this.gclCombo].height, (uiWidth - 225) / 2 * ratio + 230 * ratio, 680 * ratio, 30 * ratio, 46 * ratio);
      this.gclTime++
    }
  }
  //判断是否过关
  checkPassStage() {
    //当前关卡获得分数大于当前关卡过关分数
    if (databus.score >= databus.passScore) {
      const curstagegold = databus.stagegold;
      const curscore = databus.score;
      databus.gamegold = databus.gamegold + databus.stagegold;
      databus.gameScore = databus.gameScore + databus.score;
      databus.stagegold = 0;
      databus.score = 0;
      var self = this;
      let options = {
        tradecode: 'game02',
        apiType: 'user',
        method: 'POST',
        data: {
          'stagecore': curscore,//当前关卡过关分数
          'usestep': databus.useSteps,//过关使用步数
          'stagegold': curstagegold,//过关所得金币
          'gameid': databus.gameId,//游戏id
          'gamescore': databus.gameScore,//本轮游戏的总得分
          'gamegold': databus.gamegold,//本次游戏获得总金币数
          'currstage': databus.checkPoint,//当前关卡
        },
        success(data) {
          //过关音效
          self.music.playMusic('passPoint')
          databus.passScore = data.body.game.passscore //第一关过关所需分数
          databus.gameId = data.body.game.gameid //本轮游戏id
          databus.steps = databus.steps + parseInt(data.body.game.rewardstep) //剩余步数加上奖励步数
          databus.rewardstep = data.body.game.rewardstep //过关奖励步数
          databus.checkPoint = data.body.game.stageno //下一关关卡编号
          //根据水果数字信息获得棋子种类和棋子对应等级的生成概率
          let piecesConfig = data.body.game.numberifno.split(',');
          let piecesLevel = ['level1', 'level2', 'level3'];
          let piecesProbblt = [];
          for (var i = 0; i < piecesConfig.length; i++) {
            piecesProbblt.push(parseFloat(piecesConfig[i].split(':')[1]))
            databus.piecesLevelScore['level' + (i + 1)] = parseFloat(piecesConfig[i].split(':')[0])
          }
          databus.piecesLevelProbblt = { //棋子对应等级的生成概率
            piecesLevel: piecesLevel,
            piecesProbblt: piecesProbblt
          }
          databus.gameState = 7 //过关弹框
          databus.score = 0 //重置当前关卡获得分数
          databus.processScore = 0 //重置得分进度条
          databus.useSteps = 0 //重置当前关卡使用步数
          databus.stagegold = 0 //重置当前关卡所得金币
        }
      }
      ajax(options)
    }else{
      if (databus.steps == 0){
        databus.updateMaxScore(databus.gameScore + databus.score)
        this.gameEnd()
      }
    }
  }

  //游戏结束
  gameEnd(){
    var self = this;
    let options = {
      tradecode: 'game03',
      apiType: 'user',
      method: 'POST',
      data: {
        'gameid': databus.gameId,//游戏id
        'stage': databus.checkPoint,//当前关卡
        'stagescore': databus.score,//当前关卡过关分数
        'usestep': databus.useSteps,//过关使用步数
        'stagegold': databus.stagegold,//过关所得金币
        'gamescore': databus.gameScore + databus.score,//本轮游戏的总得分
        'gamegold': databus.gamegold + databus.stagegold,//本次游戏获得总金币数
      },
      success(data) {
        databus.gameState = 2
        if (databus.musicBg) {
          //暂停音乐
          self.music.pauseMusicBgm()
          databus.musicBg = false
          databus.musicBgChange = true
        }
        //判断是否最高分
        if ((databus.gameScore + databus.score) > databus.bestscore){
          databus.isNewScore = true
          databus.bestscore = databus.gameScore + databus.score
          //结束音
          self.music.playMusic('NewRecord')
        } else {
          //结束音
          self.music.playMusic('noNewRecord')
        }
      }
    }
    ajax(options)
  }

  //规整
  dropDown() {
    //现在要现提出一个矩阵，这个矩阵表示每一个元素要下落多少行
    for (var r = 0; r < rn - 1; r++) {
      for (var c = 0; c < cn; c++) {
        if (this.needToBomb[r][c] != "X") {
          var sum = 0;
          for (var m = r + 1; m < rn; m++) {
            if (this.needToBomb[m][c] == "X") {
              sum++;
            }
          }

          //矩阵上维持这个增量
          this.downRow[r][c] = sum;

          //命令这个元素下落
          this.blocks[r][c].moveTo(r + sum, c, 4);
        }
      }
    }

    //整理出新的QR矩阵，清空整个QR矩阵
    for (var r = 0; r < rn; r++) {
      for (var c = 0; c < cn; c++) {
        this.QRcode[r][c] = '*';
      }
    }
    //从block阵反推QR阵
    for (var r = 0; r < rn; r++) {
      for (var c = 0; c < cn; c++) {
        var theblock = this.blocks[r][c];
        //如果隐藏了
        if (!this.blocks[r][c].hide) {
          this.QRcode[theblock.row][theblock.col] = theblock.attr;
        }
      }
    }
  }

  //补充新的
  supplement() {
    //规整一下blocks
    this.createBlocksByQR();
    //遍历QR帧，如果这个位置是*，那么就new出一个新的，从第一行往这一行移动
    for (var r = 0; r < rn; r++) {
      for (var c = 0; c < cn; c++) {
        if (this.QRcode[r][c] == "*") {
          var attr = {};
          attr = {
            piecesType: _.random(0, databus.piecesType - 1),
            piecesLevel: databus.getPiecesLevel(),
            piecesCoin: _.random(0, 10) > 9 ? true : false
          }
          this.blocks[r][c] = new Block(0, c, attr);
          this.blocks[r][c].moveTo(r, c, 10);
          this.QRcode[r][c] = attr;
        }

        //借这个位置，复原一下needToBomb、downRow两个阵
        this.needToBomb[r][c] = undefined;
        this.downRow[r][c] = undefined;
      }
    }
  }


  test(row1, col1, row2, col2) {
    //备份当前的QRcode阵
    var oldQRcode = [[], [], [], [], [], [], [], []];
    for (var i = 0; i < rn; i++) {
      for (var j = 0; j < cn; j++) {
        oldQRcode[i][j] = this.QRcode[i][j];
      }
    }

    //换
    var c = this.QRcode[row1][col1];
    this.QRcode[row1][col1] = this.QRcode[row2][col2];
    this.QRcode[row2][col2] = c;

    this.createBlocksByQR();
    //然后check
    if (this.check()) {
      return true;
    } else {
      //console.log("B", oldQRcode);
      //alert("执行了")
      this.QRcode = oldQRcode;

      this.blocks[row1][col1].moveTo(row2, col2);
      this.blocks[row2][col2].moveTo(row1, col1);

      return false;
    }
  }
}