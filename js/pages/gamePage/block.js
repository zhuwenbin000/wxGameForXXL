import DataBus from '../../databus'

let databus = new DataBus()
let uiWidth = 828;
let ratio = canvas.width / uiWidth //设计稿宽度

//统一配置UI值
let bl = databus.GameUI.piecesWH //棋子宽高  
let btt = databus.GameUI.boardToTOP //棋盘到顶部的距离
let btlr = databus.GameUI.boardToLR //棋盘左右两边间距
let bi = databus.GameUI.boardInner //棋盘内边框
let pm = databus.GameUI.piecesMargin //棋子边距

let R = {
  "org_cut0": "images/gamePage/org/cut0.png",
  "org_cut1": "images/gamePage/org/cut1.png",
  "org_cut2": "images/gamePage/org/cut2.png",
  "org_cut3": "images/gamePage/org/cut3.png",
  "org_cut4": "images/gamePage/org/cut4.png",
  "org_piece0": "images/gamePage/org/piece0.png",
  "org_piece1": "images/gamePage/org/piece1.png",
  "org_piece2": "images/gamePage/org/piece2.png",
  "org_piece3": "images/gamePage/org/piece3.png",
  "org_piece4": "images/gamePage/org/piece4.png",
  "org_piece5": "images/gamePage/org/piece5.png",
  "org_piece6": "images/gamePage/org/piece6.png",
  "org_piece7": "images/gamePage/org/piece7.png",
  "org_piece8": "images/gamePage/org/piece8.png",
  "org_piece9": "images/gamePage/org/piece9.png",
  "org_piece10": "images/gamePage/org/piece10.png",
  "org_pos0": "images/gamePage/org/pos0.png",
  "org_pos1": "images/gamePage/org/pos1.png",
  "org_pos2": "images/gamePage/org/pos2.png",
  "org_pos3": "images/gamePage/org/pos3.png",
  "org_pos4": "images/gamePage/org/pos4.png",
  "org_pos5": "images/gamePage/org/pos5.png",
  "org_pos6": "images/gamePage/org/pos6.png",
  "org_pos7": "images/gamePage/org/pos7.png",
  "org_spray0": "images/gamePage/org/spray0.png",
  "org_spray1": "images/gamePage/org/spray1.png",
  "org_spray2": "images/gamePage/org/spray2.png",
  "org_spray3": "images/gamePage/org/spray3.png",
  "org_spray4": "images/gamePage/org/spray4.png",
  "org_spray5": "images/gamePage/org/spray5.png",
  "org_spray6": "images/gamePage/org/spray6.png",
  "org_spray7": "images/gamePage/org/spray7.png",
  "org_spray8": "images/gamePage/org/spray8.png",
  "org_spray9": "images/gamePage/org/spray9.png",
  "org_spray10": "images/gamePage/org/spray10.png",
}

let I = {};	
for (var k in R) {
  I[k] = wx.createImage();
  I[k].src = R[k];
}

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
    this.staticStep = 0;
  }

  //渲染
  render(ctx, Robj) {
    //渲染在画布的指定位置

    //如果自己已经消失了，那么后面的两条渲染，都不执行
    if (this.hide) {
      return;
    }
    //根据是否爆炸来渲染不同的情形
    if (!this.isBomb) {
      if(this.attr.piecesType == 0){
        //橙子
        ctx.drawImage(I["org_pos" + this.staticStep % 8], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }else{
        //渲染普通小图
        ctx.drawImage(Robj["icon" + this.attr.piecesType], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }

      if (this.attr.piecesLevel != 'level1') {
        ctx.drawImage(Robj["pieces" + this.attr.piecesLevel], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }
      if (this.attr.piecesCoin) {
        ctx.drawImage(Robj["piecesCoin"], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }
    } else if (this.isBomb) {
      if(this.attr.piecesType == 0){
        //橙子碎片
        ctx.drawImage(I["org_piece" + this.bombStep % 11], 0, 0, 580, 600, this.x - (580 * ratio - bl) / 2, this.y - (600 * ratio - bl) / 2, 580 * ratio, 600 * ratio);
        //橙子喷溅
        ctx.drawImage(I["org_spray" + this.bombStep % 11], 0, 0, 273, 296, this.x - (273 * ratio - bl) / 2, this.y - (296 * ratio - bl) / 2, 273 * ratio, 296 * ratio);
        //橙子切开
        ctx.drawImage(I["org_cut" + this.bombStep % 5], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }else{
        //渲染爆炸图
        ctx.drawImage(Robj["baozha"], this.bombStep % 5 * 192, parseInt(this.bombStep / 5) * 192, 192, 192, this.x, this.y, bl, bl);
      }
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
    if (this.isBomb && this.f % 4 == 0) {
      this.bombStep++;
      if (this.bombStep > 9) {
        this.hide = true;
      }
    }
    //静态动画
    if (!this.isBomb && this.f % 4 == 0) {
      this.staticStep++;
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