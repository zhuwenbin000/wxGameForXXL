const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let startBtn = new Image();
let friendsRankBtn = new Image();
let worldRankBtn = new Image();

startBtn.src = 'images/startBtn.png'
friendsRankBtn.src = 'images/friendsRankBtn.png'
worldRankBtn.src = 'images/worldRankBtn.png'

/**
 * 游戏首页按钮类
 */
export default class PageBtn {

  /**
   * 首页按钮绘制函数
   */
  render(ctx) {
    this.startBtn(ctx)
    this.friendsRankBtn(ctx)
    this.worldRankBtn(ctx)
  }

  startBtn(ctx) {
    ctx.drawImage(startBtn, 0, 0, 300, 80, screenWidth / 2 - 150, screenHeight / 2 - 120, 300, 80)
    /**
     * 开始游戏按钮区域
     * 方便简易判断按钮点击
     */
    this.startBtnArea = {
      startX: screenWidth / 2 - 150,
      startY: screenHeight / 2 - 120,
      endX  : screenWidth / 2  + 150,
      endY  : screenHeight / 2 - 120 + 80
    }
  }

  friendsRankBtn(ctx) {
    ctx.drawImage(friendsRankBtn, 0, 0, 150, 80, screenWidth / 2 - 150, screenHeight / 2 - 20, 150, 80)
  }

  worldRankBtn(ctx) {
    ctx.drawImage(worldRankBtn, 0, 0, 140, 80, screenWidth / 2 + 10, screenHeight / 2 - 20, 140, 80)
  }

}
