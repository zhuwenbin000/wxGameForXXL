import Block from './block'
import Music from '../../music/music'
import DataBus from '../../databus'
import { ajax } from '../../base/ajax'


let databus = new DataBus()

//棋盘的宽数和列数
let rn = databus.rowNum
let cn = databus.colNum

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
          piecesCoin: _.random(0, 10) > 7 ? true : false
        }
      }
    }

    this.createBlocksByQR();

    this.music = new Music()
    this.gsl = [];
    this.gcl = [];
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
                this.comboBlocksBomb(checkComboBlocks)
                //显示combo
                this.gcl.push({
                  rc: checkComboBlocks[checkComboBlocks.length - 2],
                  combo: databus.combo,
                  t: 0
                })
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
    //重置能combo的棋子数组
    comboBlocks = []
    //如果当前页没有combo，则combo连击清0，上一次消除也清0,可以进行手指连线消除
    if (isCombo == 0) {
      databus.combo = 0
      databus.prevSelectBlocks = []
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
    //减去1步
    databus.steps--;
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
        bombScore = bombScore + this.getScoreForList(scoreList)
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
        bombScore = bombScore + this.getScoreForList(scoreList)
      }
    }

    //连击得分
    if (doubleHit == 0) {
      doubleHit = 1
    }
    databus.score = databus.score + bombScore * doubleHit

    //显示获得得分
    this.gsl.push({
      rc: sb[sb.length - 1],
      score: bombScore * doubleHit,
      t:0
    })
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
      }
    }
    ajax(options)
  }

  showScore(){
    if (this.gsl.length <= 0) return;
    for (var i = 0; i < this.gsl.length; i++) {
      if (this.gsl[i].t < 20) {
        //显示分数
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText('+' + this.gsl[i].score + '分', databus.getPointCenter(this.gsl[i].rc).x, databus.getPointCenter(this.gsl[i].rc).y);
        this.gsl[i].t++
      }else{
        this.gsl.splice(i,1)
      }
    }
  }


  showCombo() {
    if (this.gcl.length <= 0) return;
    for (var i = 0; i < this.gcl.length; i++) {
      if (this.gcl[i].t < 20) {
        //显示Combo
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText('combo ' + this.gcl[i].combo, databus.getPointCenter(this.gcl[i].rc).x, databus.getPointCenter(this.gcl[i].rc).y);
        this.gcl[i].t++
      } else {
        this.gcl.splice(i, 1)
      }
    }
  }
  //判断是否过关
  checkPassStage() {
    databus.gameScore = databus.gameScore + databus.score;
    databus.gamegold = databus.gamegold + databus.stagegold;
    //当前关卡获得分数大于当前关卡过关分数
    if (databus.score >= databus.passScore) {
      var self = this;
      let options = {
        tradecode: 'game02',
        apiType: 'user',
        method: 'POST',
        data: {
          'stagecore': databus.score,//当前关卡过关分数
          'usestep': databus.useSteps,//过关使用步数
          'stagegold': databus.stagegold,//过关所得金币
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
          let piecesLevel = [];
          let piecesProbblt = [];
          for (var i = 0; i < piecesConfig.length; i++) {
            piecesLevel.push('level' + piecesConfig[i].split(':')[0])
            piecesProbblt.push(parseFloat(piecesConfig[i].split(':')[1]))
          }
          databus.piecesType = piecesConfig.length //棋子种类
          databus.piecesLevelProbblt = { //棋子对应等级的生成概率
            piecesLevel: piecesLevel,
            piecesProbblt: piecesProbblt
          }

          databus.score = 0 //重置当前关卡获得分数
          databus.useSteps = 0 //重置当前关卡使用步数
          databus.stagegold = 0 //重置当前关卡所得金币
        }
      }
      ajax(options)
    }else{
      if (databus.steps == 0){
        databus.updateMaxScore()
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
        'gamescore': databus.gameScore,//本轮游戏的总得分
        'gamegold': databus.gamegold,//本次游戏获得总金币数
      },
      success(data) {
        databus.gameEnd = true
      }
    }
    ajax(options)
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
            piecesLevel: databus.getPiecesLevel()
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
      console.log("B", oldQRcode);
      //alert("执行了")
      this.QRcode = oldQRcode;

      this.blocks[row1][col1].moveTo(row2, col2);
      this.blocks[row2][col2].moveTo(row1, col1);

      return false;
    }
  }
}