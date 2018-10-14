const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
import DataBus from '../../databus'
let databus = new DataBus()

let logoBtn = wx.createImage();
let startBtn = wx.createImage();
let friendsRankBtn = wx.createImage();
let worldRankBtn = wx.createImage();
let kobeBtn = wx.createImage();
let authorBtn = wx.createImage();
let bg = wx.createImage();
let loginfriendsRankBtn = wx.createImage();
let loginworldRankBtn = new Image();
let loginkobeBtn = new Image();
let loginauthorBtn = new Image();
let loginstartBtn = new Image();

let mt = databus.mt; //头像到顶部的距离
let br = databus.br; //头像的半径
let nmt = databus.nmt; //置灰状态下按钮到顶部的距离
let pmt = databus.pmt;//授权状态下按钮到顶部的距离
let nb = databus.nb; //置灰状态下按钮间距
let ml = (window.innerWidth - 291) / 2

bg.src = 'images/background.png'
bg.width = 413
bg.height = 734

logoBtn.src = 'images/logo.png'
startBtn.src = 'images/startBtn.png'
friendsRankBtn.src = 'images/friendsRankBtn.png'
worldRankBtn.src = 'images/world.png'
kobeBtn.src = "images/kobe.png"
authorBtn.src = "images/author.png"


loginstartBtn.src = 'images/loginstart.png'
loginfriendsRankBtn.src = 'images/loginfriends.png'
loginworldRankBtn.src = 'images/loginworld.png'
loginkobeBtn.src = "images/loginkobe.png"
loginauthorBtn.src = "images/loginauthor.png"


/**
 * 游戏首页按钮类
 */
export default class PageBtn {
  /**
   * 首页按钮绘制函数
   */
  render(ctx) {
    ctx.clearRect(0, 0, screenWidth, screenHeight)
    ctx.drawImage(bg, 0, 0, screenWidth, screenHeight)
    this.drawlogo(ctx)//画logo
    if (databus.pownstate == 1) { //已授权
      this.drawhead(ctx)//画头像
      this.drawscore(ctx)
      //画按钮
      this.loginstartBtn(ctx)
      this.loginfriendsRankBtn(ctx)
      this.loginworldRankBtn(ctx)
      this.loginkobe(ctx)
      this.loginauthor(ctx)
    } else { //未授权
      this.startBtn(ctx)
      this.friendsRankBtn(ctx)
      this.worldRankBtn(ctx)
      this.render_btn(ctx)
      this.kobe(ctx)
      this.author(ctx)
    }

  }
  render_btn() {

  }
  drawhead(ctx) {
    var me = this
    wx.getUserInfo({ //获取用户基本信息
      success: function (res) {
        var img = wx.createImage();
        var name = res.userInfo.nickName
        me.circleName(ctx, name)
        img.src = res.userInfo.avatarUrl
        img.onload = function () {
          me.circleImg(ctx, img, (screenWidth / 2) - br, mt, br)
        }
      }
    })

  }
  circleName(ctx, name) {
    var score = 2999;//假设分数
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(name, screenWidth / 2, mt + (br * 2) + 21);
  }
  drawscore(ctx) {//预留加载最高分接口
    var score = 2999;//假设分数
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(score + '分', screenWidth / 2, mt + (br * 2) + 45);
  }
  circleImg(ctx, img, x, y, r) {//画一个带边框的头像圆
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff"
    ctx.fill();
    ctx.save();
    ctx.restore()
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore()
  }
  drawlogo(ctx) {
    ctx.drawImage(logoBtn, 0, 0, 296, 192, screenWidth / 2 - 148, 30, 296, 192)
    //开始游戏按钮区域

  }
  loginstartBtn(ctx) {

    ctx.drawImage(loginstartBtn, 0, 0, 291, 91, ml, pmt, 291, 91)
    this.startBtnArea = {
      startX: ml,
      startY: pmt,
      endX: ml+291,
      endY: pmt + 91
    }
  }
  cleanRect(ctx) {
    ctx.clearRect(0, 0, 200, 200)
    return;
  }
  startBtn(ctx) { //开始游戏按钮
    this.createbutton = wx.createUserInfoButton({
      type: 'image',
      image: 'images/start.png',
      style: {
        left: ml,
        top: nmt,
        width: 291,
        height: 91,
        lineHeight: 40,
        backgroundColor: '#ff0000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    })
    this.createbutton.onTap((res) => {
      this.createbutton.destroy()
      this.friendbutton.destroy()
      databus.pownstate = 1;
      this.render(ctx)
      console.log(res)
    })
  }
  loginfriendsRankBtn(ctx) { //好友排行榜
    ctx.drawImage(loginfriendsRankBtn, 0, 0, 163, 71, ml, pmt + 91 + nb, 163, 71)
    this.friendsBtnArea = {
      startX:ml,
      startY: pmt + 91 + nb,
      endX: ml+ 163,
      endY: pmt + 91 + nb + 71
    }
  }
  friendsRankBtn(ctx) { //好友排行榜
    this.friendbutton = wx.createUserInfoButton({
      type: 'image',
      image: 'images/friends.png',
      style: {
        left: ml,
        top: nmt + 91 + nb,
        width: 163,
        height: 71,
        lineHeight: 40,
        backgroundColor: '#ff0000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    })
    this.friendbutton.onTap((res) => {
      this.friendbutton.destroy()
      console.log(res)
    })
  }

  loginkobe(ctx) {
    ctx.drawImage(loginkobeBtn, 0, 0, 155, 60, screenWidth - ml - 155, pmt + 91 + 72 + nb * 2, 155, 60)
  }
  kobe(ctx) {
    ctx.drawImage(kobeBtn, 0, 0, 155, 60, screenWidth - ml - 155, nmt + 91 + 72 + nb * 2, 155, 60)

  }
  author(ctx) {
    ctx.drawImage(authorBtn, 0, 0, 122, 60, ml, nmt + 91 + 72 + nb * 2, 122, 60)

  }
  loginauthor(ctx) {
    ctx.drawImage(loginauthorBtn, 0, 0, 122, 60, ml, pmt + 91 + 72 + nb * 2, 122, 60)

  }
  loginworldRankBtn(ctx) {
    ctx.drawImage(loginworldRankBtn, 0, 0, 110, 72, screenWidth - ml - 110, pmt + 91 + nb, 110, 72)
    //世界排行榜按钮区域
    this.worldBtnArea = {
      startX: screenWidth - ml - 110,
      startY: pmt + 91 + nb,
      endX: screenWidth - ml - 110 + 110,
      endY: pmt + 91 + nb + 72
    }
  }

  worldRankBtn(ctx) {
    ctx.drawImage(worldRankBtn, 0, 0, 110, 72, screenWidth - ml - 110, nmt + 91 + nb, 110, 72)
    //世界排行榜按钮区域
    this.worldBtnArea = {
      startX: screenWidth - ml - 110,
      startY: nmt + 91 + nb,
      endX: screenWidth - ml - 110 + 110,
      endY: nmt + 91 + nb + 72
    }
  }

}
