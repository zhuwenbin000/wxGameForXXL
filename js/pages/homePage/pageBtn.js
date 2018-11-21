const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
let ratio = canvas.width / 828 //设计稿宽度
import DataBus from '../../databus'
let databus = new DataBus()
import { ajax } from '../../base/ajax'
let onget = false;//接口正在调用中
let logoBtn = wx.createImage();
let startBtn = wx.createImage();
let friendsRankBtn = wx.createImage();
let gameClubbutton = null;
let authorBtn = wx.createImage();
let bg = wx.createImage();
let loginfriendsRankBtn = wx.createImage();

let loginauthorBtn = wx.createImage();
let loginstartBtn = wx.createImage();
let headimg = wx.createImage();
let shareBtn = wx.createImage();
let mt = databus.mt * ratio; //头像到顶部的距离
let br = databus.br * ratio; //头像的半径
let nmt = databus.nmt * ratio; //置灰状态下按钮到顶部的距离
let nmt_big = (databus.nmt * ratio) - (226 * ratio * 0.1/2);
let pmt = screenHeight / 2 + 30 * ratio;//授权状态下按钮到顶部的距离
let nb = databus.nb * ratio; //置灰状态下按钮间距
let ml = (window.innerWidth - 590 * ratio) / 2
let ml_big = (window.innerWidth - 590 * 1.1 * ratio) / 2
let sml = (window.innerWidth - 560 * ratio) / 2
let sml_big = (window.innerWidth - 560 * 1.1 * ratio) / 2
let sml2 = window.innerWidth / 2
let smleft = nmt + 91 * ratio + 312 * ratio + nb * 2
let smleft_big = nmt + 91 * ratio + 312 * ratio + nb * 2 - (138 * ratio * 0.1 / 2)
bg.src = 'images/home/background.png'
logoBtn.src = 'images/home/logo.png'
startBtn.src = 'images/home/start.png'
friendsRankBtn.src = 'images/home/friends.png'
shareBtn.src ='images/home/share.png'
authorBtn.src = "images/home/author.png"
loginstartBtn.src = 'images/home/start.png'
loginfriendsRankBtn.src = 'images/home/friends.png'
loginauthorBtn.src = "images/home/author.png"

/**
 * 游戏首页按钮类
 */
export default class PageBtn {
  /**
   * 首页按钮绘制函数
   */
  constructor() {
    if (databus.userinfo && databus.userinfo.userInfo && databus.userinfo.userInfo.nickName) {
      this.savedata(databus.userinfo)//同步用户数据 每次进来都同步一下昵称头像等数据
    }
    this.getBtnposition()
  }
  
  render(ctx) {
    ctx.clearRect(0, 0, screenWidth, screenHeight)
    ctx.drawImage(bg, 0, 0, screenWidth, screenHeight)
    this.drawlogo(ctx)//画logo
    
    if (databus.pownstate == 1) { //已授权
      this.drawhead(ctx)//画头像
    } else { //未授权
      this.startBtn(ctx)
      this.friendsRankBtn(ctx)
      this.render_btn(ctx)
      this.loginauthor(ctx)
      this.share_button(ctx)
    }
  }
  render_btn() {

  }
  getBtnposition(){
    if (databus.pownstate == 1) { //按钮位置
      this.startBtnArea = {
        startX: ml,
        startY: nmt,
        endX: ml + 590 * ratio,
        endY: nmt + 226 * ratio
      }
      this.friendsBtnArea = {
        startX: ml,
        startY: nmt + (196 * ratio) + nb,
        endX: ml + 590 * ratio,
        endY: nmt + (196 * ratio) + nb + 226 * ratio
      }
      this.shareBtnArea = {
        startX: sml,
        startY: nmt + 91 * ratio + 312 * ratio + nb * 2,
        endX: sml2 + 282 * ratio,
        endY: nmt + 91 * ratio + 312 * ratio + nb * 2 + 138 * ratio,
      }
    } else {
      this.shareBtnArea = {
        startX: sml,
        startY: nmt + 91 * ratio + 312 * ratio + nb * 2,
        endX: sml2 + 282 * ratio,
        endY: nmt + 91 * ratio + 312 * ratio + nb * 2 + 138 * ratio,
      }
    }
  }
  drawhead(ctx) {
    var me = this
    if (!databus.userinfo && !onget) {
      onget = true;
      wx.getUserInfo({ //获取用户基本信息
        success: function (res) {
          databus.userinfo = res
          me.savedata(res)//保存用户数据
          var name = res.userInfo.nickName
          me.getscore(ctx, databus.userinfo.signature)
          me.circleName(ctx, name)
          headimg.src = res.userInfo.avatarUrl
          me.circleImg(ctx, headimg, (screenWidth / 2) - br, mt, br, name)
        }
      })
    } else {
      if (databus.userinfo) {
        var name = databus.userinfo.userInfo.nickName
        var bestscore = databus.bestscore
        me.circleName(ctx, name)
        headimg.src = databus.userinfo.userInfo.avatarUrl
        me.circleImg(ctx, headimg, (screenWidth / 2) - br, mt, br, name, bestscore)
      }
    }
  }
  getscore(signature) { //获取最高分
    
    let me = this;
    let options = {
      tradecode: 'sys04',
      apiType: 'user',
      method: 'POST',
      success(data) {
        
        var bestscore = data.body.user.bestscore;
        
        databus.bestscore = bestscore;
      }
    }
    ajax(options)
  }
  savedata(res) {
    let options = {
      tradecode: 'sys03',
      apiType: 'user',
      method: 'POST',
      data: {
        nickname: encodeURIComponent(res.userInfo.nickName),
        province: res.userInfo.province,
        city: res.userInfo.city,
        country: res.userInfo.country,
        sex: res.userInfo.gender,
        logourl: res.userInfo.avatarUrl
      },
      success(data) {
      }
    }
    ajax(options)
  }
  circleName(ctx, name) {
    var score = 2999;//假设分数
    ctx.fillStyle = '#fff';
    ctx.font = '16px  Arial';
    ctx.fontWeight = "bold"
    ctx.textAlign = 'center';
    ctx.fillText(name, screenWidth / 2, mt + (br * 2) + 45 * ratio);
  }
  drawscore(ctx, bestscore) {//预留加载最高分接口
    var score = 2999;//假设分数
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fontWeight = "900"
    ctx.textAlign = 'center';

    var bestscore = parseInt(bestscore)
    if (bestscore) {
      ctx.fillText(bestscore + '分', screenWidth / 2, mt + (br * 2) + 95 * ratio);
    } else {
      ctx.fillText('暂无分数', screenWidth / 2, mt + (br * 2) + 95 * ratio);
    }

  }
  circleImg(ctx, img, x, y, r, name, bestscore) {//画一个带边框的头像圆
    ctx.drawImage(bg, 0, 0, screenWidth, screenHeight)
    this.drawlogo(ctx)//画logo
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 3, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff"
    ctx.fill();
    ctx.save();
    ctx.restore()
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore()

    //画按钮
    this.circleName(ctx, name)
    this.loginstartBtn(ctx)
    this.loginfriendsRankBtn(ctx)
    this.loginauthor(ctx)
    this.share_button(ctx)
    //画分数
    if (bestscore) {
      this.drawscore(ctx, bestscore)
    }

  }
  drawlogo(ctx) {
    ctx.drawImage(logoBtn, 0, 0, 796, 538, (window.innerWidth - 796 * ratio) / 2, 120 * ratio, 796 * ratio, 538 * ratio)
    //开始游戏按钮区域

  }
  loginstartBtn(ctx) {
    if (!databus.playbtn_state){
      ctx.drawImage(loginstartBtn, 0, 0, 590, 226, ml, nmt, 590 * ratio, 226 * ratio) 
    }else{
      ctx.drawImage(loginstartBtn, 0, 0, 590, 226, ml_big, nmt_big, 590 * ratio*1.1, 226 * ratio*1.1)
    } 
  }

  startBtn(ctx) { //开始游戏按钮
    if (!this.createbutton) {
      this.createbutton = wx.createUserInfoButton({
        type: 'image',
        image: 'images/home/start.png',
        style: {
          left: ml,
          top: nmt,
          width: 590 * ratio,
          height: 226 * ratio,
          lineHeight: 40,
          backgroundColor: '#ff0000',
          color: '#ffffff',
          textAlign: 'center',
          fontSize: 16,
          borderRadius: 4
        }
      })
      this.createbutton.onTap((res) => {
        if (res.rawData)//授权成功
        {
         
          this.createbutton.destroy()
          this.friendbutton.destroy()
          databus.pownstate = 1;
          this.getBtnposition()
          this.render(ctx)
        } else {
          wx.showToast({title: '授权才能进入游戏哦～', icon: 'none' })
        }
      })
    }

  }
  loginfriendsRankBtn(ctx) { //好友排行榜
    if (!databus.friendbtn_state) {
    ctx.drawImage(loginfriendsRankBtn, 0, 0, 590, 226, ml, nmt + (196 * ratio) + nb, 590 * ratio, 226 * ratio)
    }else{
      ctx.drawImage(loginfriendsRankBtn, 0, 0, 590, 226, ml_big, nmt_big + (196 * ratio) + nb, 590 * ratio * 1.1, 226 * ratio * 1.1)
    }
    
  }
  friendsRankBtn(ctx) { //好友排行榜
    if (!this.friendbutton) {
      this.friendbutton = wx.createUserInfoButton({
        type: 'image',
        image: 'images/home/friends.png',
        style: {
          left: ml,
          top: nmt + (196 * ratio) + nb,
          width: 590 * ratio,
          height: 226 * ratio,
          lineHeight: 40,
          backgroundColor: '#ff0000',
          color: '#ffffff',
          textAlign: 'center',
          fontSize: 16,
          borderRadius: 4
        }
      })
      this.friendbutton.onTap((res) => {
        if (res.rawData)//授权成功
        {
          
          this.createbutton.destroy()
          this.friendbutton.destroy()
          databus.pownstate = 1;
          this.getBtnposition()
          this.render(ctx)
        }
      })
    }
  }
  loginauthor(ctx) {
   
    if (!databus.gameClubbutton && !databus.playbtn_state){
     
      databus.gameClubbutton = wx.createGameClubButton({
        icon: 'green',
        type: 'image',
        image: 'images/home/author.png',
        style: {
          left: sml2,
          top: nmt + 91 * ratio + 312 * ratio + nb * 2,
          width: 282 * ratio,
          height: 138 * ratio
        }
      })
    } 
  }
  share_button(ctx) {   
    if (!databus.sharebtn_state) {
      ctx.drawImage(shareBtn, 0, 0, 282, 138, sml,smleft, 282 * ratio, 138 * ratio)
    }else{
      ctx.drawImage(shareBtn, 0, 0, 282, 138, sml_big, smleft_big, 282 * ratio * 1.1, 138 * ratio * 1.1)
    }
  }
}
