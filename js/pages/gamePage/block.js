/**
 * 砖块类
 */
export default class Block {
  constructor(row, col, color) {
    //每个块的宽高
    this.bl = (canvas.width - 30 - 12*2 - 8*5)/6
    //行数
    this.row = row;
    //列数
    this.col = col;
    //icon类型
    this.color = color;
    //自己的位置
    this.x = 15 + 12 + this.col * 8 + this.col * this.bl;
    this.y = 150 + 12 + this.row * 8 + this.row * this.bl;
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
    //图片，切片x，切片y，切片w，切片h，画布位置x，画布位置y，画布位置w，画布位置h
    var qiepianx = this.color % 3 * 76;
    var qiepiany = (this.color < 3) ? 0 : 76;
    //如果自己已经消失了，那么后面的两条渲染，都不执行
    if (this.hide) {
      return;
    }
    //根据是否爆炸来渲染不同的情形
    if (!this.isBomb) {
      //渲染普通小图
      ctx.drawImage(Robj["icons"], qiepianx, qiepiany, 76, 76, this.x, this.y, this.bl, this.bl);
    } else if (this.isBomb) {
      //渲染爆炸图
      ctx.drawImage(Robj["baozha"], this.bombStep % 5 * 192, parseInt(this.bombStep / 5) * 192, 192, 192, this.x, this.y, this.bl, this.bl);
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
    this.dx = (col - this.col) * (this.bl + 8) / frame;
    this.dy = (row - this.row) * (this.bl + 8) / frame;
    //应该结束动画的帧编号
    this.endf = this.f + frame;
    //更改自己的行、列属性
    this.row = row;
    this.col = col;
  }

}
