import Map from './map'

import DataBus from '../../databus'


let databus = new DataBus()
export default class Index {
  constructor(ctx) {
    // 维护当前requestAnimationFrame的id
    this.aniId = 1
    //帧编号
    this.f = 0;
    //当前游戏状态
    this.STATE = "爆破检查";  //爆破检查、爆破动画、下落动画、补充新的、静稳状态

    //加载所有资源，资源都load之后，定时器开启
    this.R = {
      "bg": "images/bg.png",
      "gameBg": "images/gameBg.png",
      "icons": "images/icons.png",
      "baozha": "images/baozha.png"
    }
    //把所有的图片放到一个对象中
    this.Robj = {};	//两个对象有相同的k

    //备份
    var self = this;
    //是否触发拖拽
    this.istuozhuai = false;

    // 遍历R对象，把真实image对象，让如this.Robj中
    for (var k in this.R) {
      this.Robj[k] = new Image();
      this.Robj[k].src = this.R[k];
    }

    //块的宽 
    this.bl = ((canvas.width - 30 - 12 * 2 - 8 * 5) / 6)
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

  touchStart(e){

    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    //判断手指落下的坐标
    let rc = this.getRC(x,y)

    //如果落在砖块上
    if(rc){
      databus.selectBlocks = []
      databus.selectBlocks.push(rc)
    }else{
      return
    }
    
    this.touchMoveHandler = this.touchMove.bind(this)
    canvas.addEventListener('touchmove', this.touchMoveHandler)

    canvas.addEventListener('touchend', () => {
      canvas.removeEventListener('touchmove', this.touchMoveHandler)
    })

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
      if (this.map.blocks[rc.row][rc.col].color == this.map.blocks[pb.row][pb.col].color){
        databus.selectBlocks.push(rc)
      }
    }

    console.log(databus.selectBlocks)
    return
    //实时记录手指移动的位置
    this.col2 = parseInt(x / 40);
    this.row2 = parseInt((y - 180) / 40);

    this.map.createBlocksByQR();
    //判定谁滑动向谁
    if (this.col2 != this.col1 || this.row2 != this.row1) {
      console.log("从" + this.row1 + "," + this.col1 + "滑到了" + this.row2 + "," + this.col2);
      //删除自己的监听，防止再次触发
      canvas.removeEventListener('touchmove', this.touchMoveHandler)
      //命令元素交换位置
      this.map.blocks[this.row1][this.col1].moveTo(this.row2, this.col2, 6);
      this.map.blocks[this.row2][this.col2].moveTo(this.row1, this.col1, 6);
      // //命令试探是否能消除

      //改变标记
      this.istuozhuai = true;
      //写当前帧
      this.starttuozhuai = this.f;
    }

  }

  getRC(x,y){
    //判断是否在游戏区域内  不是就return
    if ((x < 15 || y < 150) || (x > canvas.width - 30 + 15 || y > canvas.width - 30 + 150)) {
      databus.selectBlocks = []
      return false
    }

    //判断在哪一个区块 包括边框 
    let rx = parseInt((x - 15 - 12) / (this.bl + 8));
    let ry = parseInt((y - 150 - 12) / (this.bl + 8));

    if (((x - 15 - 12) < ((rx + 1) * this.bl + rx * 8)) && ((y - 150 - 12) < ((ry + 1) * this.bl + ry * 8))) {
      //记录手指按下时候的位置
      return {
        row: ry,
        col: rx
      }
    } else {
      return false
    }
    
  }

  drawLine(start,end){

  }

  //canvas重绘函数,每一帧重新绘制所有的需要展示的元素
  render(ctx) {
    //清屏
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //帧编号
    this.f++;
    //绘制背景。背景没动,也要每帧擦除，重绘
    ctx.drawImage(this.Robj["bg"], 0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.Robj["gameBg"], 0, 0, this.Robj["gameBg"].width, this.Robj["gameBg"].height, 15, 150, canvas.width - 30, canvas.width - 30);
    
    let row = 0;
    let col = 0;
    ctx.beginPath();
    ctx.moveTo(row * (this.bl + 8) + this.bl / 2 + 15 + 12, col * (this.bl + 8) + this.bl / 2 + 150 + 12);
    ctx.lineTo(this.x, this.y);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#cccccc";
    ctx.stroke();
    
    //绘制地图
    this.map.render(ctx, this.Robj);

    //有限状态机！！！
    if (this.STATE == "爆破检查") {
      // if (this.map.check()) {
      //   //打一个标记
      //   this.startBomb = this.f;
      //   //瞬间变为爆破动画
      //   this.STATE = "爆破动画";
      // } else {
      //   this.STATE = "静稳状态";
      // }

      this.STATE = "静稳状态";
      //20帧之后，调用补充新的
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
