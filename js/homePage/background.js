import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.jpg'
const BG_WIDTH = 274
const BG_HEIGHT = 490

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
    constructor(ctx) {
        super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)
        this.render(ctx)
    }

    /**
   * 背景图绘制函数
   */
    render(ctx) {
        ctx.drawImage(this.img, 0, 0, this.width, this.height, 0, 0, screenWidth, screenHeight)
    }
}
