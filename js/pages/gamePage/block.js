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
  "apple_cut0": "images/gamePage/apple/cut0.png",
  "apple_cut1": "images/gamePage/apple/cut1.png",
  "apple_cut2": "images/gamePage/apple/cut2.png",
  "apple_cut3": "images/gamePage/apple/cut3.png",
  "apple_cut4": "images/gamePage/apple/cut5.png",
  "apple_cut5": "images/gamePage/apple/cut6.png",
  "apple_cut6": "images/gamePage/apple/cut7.png",
  "apple_cut7": "images/gamePage/apple/cut8.png",
  "apple_cut8": "images/gamePage/apple/cut4.png",
  "apple_piece0": "images/gamePage/apple/piece0.png",
  "apple_piece1": "images/gamePage/apple/piece1.png",
  "apple_piece2": "images/gamePage/apple/piece2.png",
  "apple_piece3": "images/gamePage/apple/piece3.png",
  "apple_piece4": "images/gamePage/apple/piece4.png",
  "apple_piece5": "images/gamePage/apple/piece5.png",
  "apple_piece6": "images/gamePage/apple/piece6.png",
  "apple_piece7": "images/gamePage/apple/piece7.png",
  "apple_piece8": "images/gamePage/apple/piece8.png",
  "apple_piece9": "images/gamePage/apple/piece9.png",
  "apple_piece10": "images/gamePage/apple/piece10.png",
  "apple_pos0": "images/gamePage/apple/pos0.png",
  "apple_pos1": "images/gamePage/apple/pos1.png",
  "apple_pos2": "images/gamePage/apple/pos2.png",
  "apple_pos3": "images/gamePage/apple/pos3.png",
  "apple_pos4": "images/gamePage/apple/pos4.png",
  "apple_pos5": "images/gamePage/apple/pos5.png",
  "apple_pos6": "images/gamePage/apple/pos6.png",
  "apple_pos7": "images/gamePage/apple/pos7.png",
  "apple_spray0": "images/gamePage/apple/spray0.png",
  "apple_spray1": "images/gamePage/apple/spray1.png",
  "apple_spray2": "images/gamePage/apple/spray2.png",
  "apple_spray3": "images/gamePage/apple/spray3.png",
  "apple_spray4": "images/gamePage/apple/spray4.png",
  "apple_spray5": "images/gamePage/apple/spray5.png",
  "apple_spray6": "images/gamePage/apple/spray6.png",
  "apple_spray7": "images/gamePage/apple/spray7.png",
  "apple_spray8": "images/gamePage/apple/spray8.png",
  "apple_spray9": "images/gamePage/apple/spray9.png",
  "apple_spray10": "images/gamePage/apple/spray10.png",
  "cherry_cut0": "images/gamePage/cherry/cut0.png",
  "cherry_cut1": "images/gamePage/cherry/cut1.png",
  "cherry_cut2": "images/gamePage/cherry/cut2.png",
  "cherry_cut3": "images/gamePage/cherry/cut3.png",
  "cherry_cut4": "images/gamePage/cherry/cut4.png",
  "cherry_piece0": "images/gamePage/cherry/piece0.png",
  "cherry_piece1": "images/gamePage/cherry/piece1.png",
  "cherry_piece2": "images/gamePage/cherry/piece2.png",
  "cherry_piece3": "images/gamePage/cherry/piece3.png",
  "cherry_piece4": "images/gamePage/cherry/piece4.png",
  "cherry_piece5": "images/gamePage/cherry/piece5.png",
  "cherry_piece6": "images/gamePage/cherry/piece6.png",
  "cherry_piece7": "images/gamePage/cherry/piece7.png",
  "cherry_piece8": "images/gamePage/cherry/piece8.png",
  "cherry_piece9": "images/gamePage/cherry/piece9.png",
  "cherry_piece10": "images/gamePage/cherry/piece10.png",
  "cherry_pos0": "images/gamePage/cherry/pos0.png",
  "cherry_pos1": "images/gamePage/cherry/pos1.png",
  "cherry_pos2": "images/gamePage/cherry/pos2.png",
  "cherry_pos3": "images/gamePage/cherry/pos3.png",
  "cherry_pos4": "images/gamePage/cherry/pos4.png",
  "cherry_pos5": "images/gamePage/cherry/pos5.png",
  "cherry_pos6": "images/gamePage/cherry/pos6.png",
  "cherry_pos7": "images/gamePage/cherry/pos7.png",
  "cherry_spray0": "images/gamePage/cherry/spray0.png",
  "cherry_spray1": "images/gamePage/cherry/spray1.png",
  "cherry_spray2": "images/gamePage/cherry/spray2.png",
  "cherry_spray3": "images/gamePage/cherry/spray3.png",
  "cherry_spray4": "images/gamePage/cherry/spray4.png",
  "cherry_spray5": "images/gamePage/cherry/spray5.png",
  "cherry_spray6": "images/gamePage/cherry/spray6.png",
  "cherry_spray7": "images/gamePage/cherry/spray7.png",
  "cherry_spray8": "images/gamePage/cherry/spray8.png",
  "cherry_spray9": "images/gamePage/cherry/spray9.png",
  "cherry_spray10": "images/gamePage/cherry/spray10.png",
  "blueBerries_cut0": "images/gamePage/blueBerries/cut0.png",
  "blueBerries_cut1": "images/gamePage/blueBerries/cut1.png",
  "blueBerries_cut2": "images/gamePage/blueBerries/cut2.png",
  "blueBerries_cut3": "images/gamePage/blueBerries/cut3.png",
  "blueBerries_cut4": "images/gamePage/blueBerries/cut4.png",
  "blueBerries_cut5": "images/gamePage/blueBerries/cut5.png",
  "blueBerries_piece0": "images/gamePage/blueBerries/piece0.png",
  "blueBerries_piece1": "images/gamePage/blueBerries/piece1.png",
  "blueBerries_piece2": "images/gamePage/blueBerries/piece2.png",
  "blueBerries_piece3": "images/gamePage/blueBerries/piece3.png",
  "blueBerries_piece4": "images/gamePage/blueBerries/piece4.png",
  "blueBerries_piece5": "images/gamePage/blueBerries/piece5.png",
  "blueBerries_piece6": "images/gamePage/blueBerries/piece6.png",
  "blueBerries_piece7": "images/gamePage/blueBerries/piece7.png",
  "blueBerries_piece8": "images/gamePage/blueBerries/piece8.png",
  "blueBerries_piece9": "images/gamePage/blueBerries/piece9.png",
  "blueBerries_piece10": "images/gamePage/blueBerries/piece10.png",
  "blueBerries_pos0": "images/gamePage/blueBerries/pos0.png",
  "blueBerries_pos1": "images/gamePage/blueBerries/pos1.png",
  "blueBerries_pos2": "images/gamePage/blueBerries/pos2.png",
  "blueBerries_pos3": "images/gamePage/blueBerries/pos3.png",
  "blueBerries_pos4": "images/gamePage/blueBerries/pos4.png",
  "blueBerries_pos5": "images/gamePage/blueBerries/pos5.png",
  "blueBerries_pos6": "images/gamePage/blueBerries/pos6.png",
  "blueBerries_pos7": "images/gamePage/blueBerries/pos7.png",
  "blueBerries_spray0": "images/gamePage/blueBerries/spray0.png",
  "blueBerries_spray1": "images/gamePage/blueBerries/spray1.png",
  "blueBerries_spray2": "images/gamePage/blueBerries/spray2.png",
  "blueBerries_spray3": "images/gamePage/blueBerries/spray3.png",
  "blueBerries_spray4": "images/gamePage/blueBerries/spray4.png",
  "blueBerries_spray5": "images/gamePage/blueBerries/spray5.png",
  "blueBerries_spray6": "images/gamePage/blueBerries/spray6.png",
  "blueBerries_spray7": "images/gamePage/blueBerries/spray7.png",
  "blueBerries_spray8": "images/gamePage/blueBerries/spray8.png",
  "blueBerries_spray9": "images/gamePage/blueBerries/spray9.png",
  "blueBerries_spray10": "images/gamePage/blueBerries/spray10.png",
  "coinBg":"images/gamePage/board/coin_bg.png",
  "pieceBg":"images/gamePage/board/piece_bg.png",
  "pieceBgCrazy":"images/gamePage/board/piece_bg_crazy.png"
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
    this.selectAniTime = 0;
    this.selectAnif = 0;
    this.isSelectAni = false;
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
      if(this.selectAniTime > 0){
        return
      }

      if((this.row % 2 == 0 && this.col % 2 == 0) || ((this.row + 1) % 2 == 0 && (this.col + 1) % 2 == 0)){
        ctx.drawImage(I["pieceBg"], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }

      if(this.attr.piecesCoin){
        ctx.drawImage(I["coinBg"], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }
      if(this.attr.piecesType == 0){
        //橙子
        ctx.drawImage(I["org_pos" + this.staticStep % 8], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }else if(this.attr.piecesType == 1){
        //苹果
        ctx.drawImage(I["apple_pos" + this.staticStep % 8], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }else if(this.attr.piecesType == 2){
        //蓝莓
        ctx.drawImage(I["blueBerries_pos" + this.staticStep % 8], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }else if(this.attr.piecesType == 3){
        //樱桃
        ctx.drawImage(I["cherry_pos" + this.staticStep % 8], 0, 0, 124, 124, this.x, this.y, bl, bl);
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
      }else if(this.attr.piecesType == 1){
        //苹果碎片
        ctx.drawImage(I["apple_piece" + this.bombStep % 11], 0, 0, 580, 600, this.x - (580 * ratio - bl) / 2, this.y - (600 * ratio - bl) / 2, 580 * ratio, 600 * ratio);
        //苹果喷溅
        ctx.drawImage(I["apple_spray" + this.bombStep % 11], 0, 0, 273, 296, this.x - (273 * ratio - bl) / 2, this.y - (296 * ratio - bl) / 2, 273 * ratio, 296 * ratio);
        //苹果切开
        ctx.drawImage(I["apple_cut" + this.bombStep % 5], 0, 0, 140, 140, this.x, this.y, bl, bl);
      }else if(this.attr.piecesType == 2){
        //蓝莓碎片
        ctx.drawImage(I["blueBerries_piece" + this.bombStep % 11], 0, 0, 580, 600, this.x - (580 * ratio - bl) / 2, this.y - (600 * ratio - bl) / 2, 580 * ratio, 600 * ratio);
        //蓝莓喷溅
        ctx.drawImage(I["blueBerries_spray" + this.bombStep % 11], 0, 0, 273, 296, this.x - (273 * ratio - bl) / 2, this.y - (296 * ratio - bl) / 2, 273 * ratio, 296 * ratio);
        //蓝莓切开
        ctx.drawImage(I["blueBerries_cut" + this.bombStep % 5], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }else if(this.attr.piecesType == 3){
        //樱桃碎片
        ctx.drawImage(I["cherry_piece" + this.bombStep % 11], 0, 0, 580, 600, this.x - (580 * ratio - bl) / 2, this.y - (600 * ratio - bl) / 2, 580 * ratio, 600 * ratio);
        //樱桃喷溅
        ctx.drawImage(I["cherry_spray" + this.bombStep % 11], 0, 0, 273, 296, this.x - (273 * ratio - bl) / 2, this.y - (296 * ratio - bl) / 2, 273 * ratio, 296 * ratio);
        //樱桃切开
        ctx.drawImage(I["cherry_cut" + this.bombStep % 5], 0, 0, 124, 124, this.x, this.y, bl, bl);
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
    if (!this.isBomb && this.f % 8 == 0) {
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

  selectAni(ctx,i){
    this.selectAnif++
    if(this.selectAnif % 4 == 0){
      this.selectAniTime++
    }
    if(JSON.stringify(databus.selectBlocks).indexOf(JSON.stringify(databus.selectAniBlocks[i])) == -1 ){
      this.selectAniTime = 0
      this.selectAnif = 0
      databus.selectAniBlocks.splice(i, 1)
      return
    }
    if(this.selectAniTime > 4){

      if(JSON.stringify(databus.doubleHitList).indexOf(JSON.stringify(databus.selectAniBlocks[i])) == -1 ){
        if(this.attr.piecesType == 0){
          //橙子切开
          ctx.drawImage(I["org_cut" + this.selectAniTime % 5], 0, 0, 124, 124, this.x, this.y, bl, bl);
        }else if(this.attr.piecesType == 1){
          //苹果切开
          ctx.drawImage(I["apple_cut" + this.selectAniTime % 5], 0, 0, 140, 140, this.x, this.y, bl, bl);
        }else if(this.attr.piecesType == 2){
          //蓝莓切开
          ctx.drawImage(I["blueBerries_cut" + this.selectAniTime % 5], 0, 0, 124, 124, this.x, this.y, bl, bl);
        }else if(this.attr.piecesType == 3){
          //樱桃切开
          ctx.drawImage(I["cherry_cut" + this.selectAniTime % 5], 0, 0, 124, 124, this.x, this.y, bl, bl);
        }

      }else{
        if(this.attr.piecesType == 0){
          //橙子切开
          ctx.drawImage(I["org_cut" + this.selectAniTime % 5], 0, 0, 124, 124, this.x - 15 * ratio, this.y - 15 * ratio, bl + 30 * ratio, bl + 30 * ratio);
        }else if(this.attr.piecesType == 1){
          //苹果切开
          ctx.drawImage(I["apple_cut" + this.selectAniTime % 5], 0, 0, 140, 140, this.x - 15 * ratio, this.y - 15 * ratio, bl + 30 * ratio, bl + 30 * ratio);
        }else if(this.attr.piecesType == 2){
          //蓝莓切开
          ctx.drawImage(I["blueBerries_cut" + this.selectAniTime % 5], 0, 0, 124, 124, this.x - 15 * ratio, this.y - 15 * ratio, bl + 30 * ratio, bl + 30 * ratio);
        }else if(this.attr.piecesType == 3){
          //樱桃切开
          ctx.drawImage(I["cherry_cut" + this.selectAniTime % 5], 0, 0, 124, 124, this.x - 15 * ratio, this.y - 15 * ratio, bl + 30 * ratio, bl + 30 * ratio);
        }

      }
    }else{
      if(this.attr.piecesType == 0){
        //橙子碎片
        ctx.drawImage(I["org_piece" + this.selectAniTime % 11], 0, 0, 580, 600, this.x - (580 * ratio - bl) / 2, this.y - (600 * ratio - bl) / 2, 580 * ratio, 600 * ratio);
        //橙子喷溅
        ctx.drawImage(I["org_spray" + this.selectAniTime % 11], 0, 0, 273, 296, this.x - (273 * ratio - bl) / 2, this.y - (296 * ratio - bl) / 2, 273 * ratio, 296 * ratio);
        //橙子切开
        ctx.drawImage(I["org_cut" + this.selectAniTime % 5], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }else if(this.attr.piecesType == 1){
        //苹果碎片
        ctx.drawImage(I["apple_piece" + this.selectAniTime % 11], 0, 0, 580, 600, this.x - (580 * ratio - bl) / 2, this.y - (600 * ratio - bl) / 2, 580 * ratio, 600 * ratio);
        //苹果喷溅
        ctx.drawImage(I["apple_spray" + this.selectAniTime % 11], 0, 0, 273, 296, this.x - (273 * ratio - bl) / 2, this.y - (296 * ratio - bl) / 2, 273 * ratio, 296 * ratio);
        //苹果切开
        ctx.drawImage(I["apple_cut" + this.selectAniTime % 5], 0, 0, 140, 140, this.x, this.y, bl, bl);
      }else if(this.attr.piecesType == 2){
        //蓝莓碎片
        ctx.drawImage(I["blueBerries_piece" + this.selectAniTime % 11], 0, 0, 580, 600, this.x - (580 * ratio - bl) / 2, this.y - (600 * ratio - bl) / 2, 580 * ratio, 600 * ratio);
        //蓝莓喷溅
        ctx.drawImage(I["blueBerries_spray" + this.selectAniTime % 11], 0, 0, 273, 296, this.x - (273 * ratio - bl) / 2, this.y - (296 * ratio - bl) / 2, 273 * ratio, 296 * ratio);
        //蓝莓切开
        ctx.drawImage(I["blueBerries_cut" + this.selectAniTime % 5], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }else if(this.attr.piecesType == 3){
        //樱桃碎片
        ctx.drawImage(I["cherry_piece" + this.selectAniTime % 11], 0, 0, 580, 600, this.x - (580 * ratio - bl) / 2, this.y - (600 * ratio - bl) / 2, 580 * ratio, 600 * ratio);
        //樱桃喷溅
        ctx.drawImage(I["cherry_spray" + this.selectAniTime % 11], 0, 0, 273, 296, this.x - (273 * ratio - bl) / 2, this.y - (296 * ratio - bl) / 2, 273 * ratio, 296 * ratio);
        //樱桃切开
        ctx.drawImage(I["cherry_cut" + this.selectAniTime % 5], 0, 0, 124, 124, this.x, this.y, bl, bl);
      }
    }
  }

}