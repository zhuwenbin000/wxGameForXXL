
import DataBus from '../../databus'

let databus = new DataBus()

//统一配置UI值
let bl = databus.GameUI.piecesWH //棋子宽高  
let btt = databus.GameUI.boardToTOP //棋盘到顶部的距离
let btlr = databus.GameUI.boardToLR //棋盘左右两边间距
let bi = databus.GameUI.boardInner //棋盘内边框
let pm = databus.GameUI.piecesMargin //棋子边距
let lwh = databus.GameUI.levelWH //level标志的宽高

/**
 * 砖块类
 */
export default class Block {
  constructor(row, col, attr) {
    //行数
    this.row = row;
    //列数
    this.col = col;
    //棋子的属性
    this.attr = attr;
    //自己的位置
    this.x = btlr + bi + this.col * pm + this.col * bl;
    this.y = btt + bi + this.row * pm + this.row * bl;
    //level标志的位置
    this.levelX = btlr + bi + this.col * pm + this.col * bl;
    this.levelY = btt + bi + this.row * pm + this.row * bl;
    //小帧计数器
    this.f = 0;
    //指示爆炸的小动画
    this.bombStep = 0;
    //自己是否正处于爆炸动画中
    this.isBomb = false;
    //自己是否正处于运动动画中
    this.isAnimate = false;
  }

  //渲染
  render(ctx,Robj) {
    //渲染在画布的指定位置

    //如果自己已经消失了，那么后面的两条渲染，都不执行
    if (this.hide) {
      return;
    }
    //根据是否爆炸来渲染不同的情形
    if (!this.isBomb) {
      //渲染普通小图
      ctx.drawImage(Robj["icon" + this.attr.piecesType], 0, 0, 50, 46, this.x, this.y, bl, bl);
      // ctx.drawImage(Robj["pieces" + this.attr.piecesLevel], 0, 0, 73, 73, this.x, this.y, lwh, lwh);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'right';
      ctx.font = '20px Arial';
      ctx.fillText(databus.piecesLevelScore[this.attr.piecesLevel], this.x + bl, this.y + bl);

    } else if (this.isBomb) {
      //渲染爆炸图
      ctx.drawImage(Robj["baozha"], this.bombStep % 5 * 192, parseInt(this.bombStep / 5) * 192, 192, 192, this.x, this.y, bl, bl);
    }
  }


	//更新，这个函数每帧执行
  update() {
    //小帧计数器++
    this.f++;

    //如果自己在运动，那么x、y有增量
    if (this.isAnimate && this.f <= this.endf) {
      this.x += this.dx;
      this.y += this.dy;
    }

    //爆炸动画
    if (this.isBomb && this.f % 2 == 0) {
      this.bombStep++;
      if (this.bombStep > 9) {
        this.hide = true;
      }
    }
  }

  bomb() {
    this.isBomb = true;
    this.endbomb = this.f + 10;
  }

  moveTo(row, col, frame) {
    var frame = frame || 20;
    //写标记
    this.isAnimate = true;
    //增量
    this.dx = (col - this.col) * (bl + pm) / frame;
    this.dy = (row - this.row) * (bl + pm) / frame;
    //应该结束动画的帧编号
    this.endf = this.f + frame;
    //更改自己的行、列属性
    this.row = row;
    this.col = col;
  }

}
