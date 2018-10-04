import BackGround from './homePage/background'
import PageBtn from './homePage/pageBtn'
import Music from './runtime/music'
import DataBus from './databus'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0
        this.homePage()
    }

    homePage() {
        this.bg = new BackGround(ctx)
        this.pageBtn = new PageBtn(ctx)
        this.music = new Music()

        this.bindLoop = this.loop.bind(this)

        // 清除上一局的动画
        window.cancelAnimationFrame(this.aniId);

        this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
    }


    // 首页按钮事件处理逻辑
    touchStartHandler(e) {
        e.preventDefault()
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY

        let startBtnArea = this.pageBtn.startBtnArea

        // 开始游戏按钮事件
        if (x >= startBtnArea.startX && x <= startBtnArea.endX && y >= startBtnArea.startY && y <= startBtnArea.endY) {
          console.log("开始游戏")
        }
    }

    /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
    render() {

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        this.bg.render(ctx)
        this.pageBtn.render(ctx)

        // 按钮点击事件
        this.touchHandler = this.touchStartHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)

    }

    // 实现游戏帧循环
    loop() {

        this.render()

        this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
    }
}
