let ratio = canvas.width / 828 //设计稿宽度
const screenWidth = window.innerWidth 
const screenHeight = window.innerHeight
import DataBus from '../../databus'
let databus = new DataBus()
import {
  ajax
} from '../../base/ajax'
import ActiveModal from './activeModal'
let onget = false; //接口正在调用中
let startBtn = wx.createImage();
let gameClubbutton = null;
let authorBtn = wx.createImage();
let bg = wx.createImage();
let loginfriendsRankBtn = wx.createImage();
let loginauthorBtn = wx.createImage();
let loginstartBtn = wx.createImage();
let loginstartBtn2 = wx.createImage();
let activeBtn = wx.createImage()
let headimg = wx.createImage();
let shareBtn = wx.createImage();
let mt = databus.mt ; //头像到顶部的距离
let br = databus.br ; //头像的半径
let nmt = databus.nmt ; //置灰状态下按钮到顶部的距离
let nmt_big = (databus.nmt ) - (226  * 0.1 / 2);
let pmt = screenHeight / 2 + 30 ; //授权状态下按钮到顶部的距离
let nb = databus.nb ; //置灰状态下按钮间距
let ml = (window.innerWidth - 590 ) / 2
let ml_big = (window.innerWidth - 590 * 1.1 ) / 2
let sml = (window.innerWidth - 560 ) / 2
let sml_big = (window.innerWidth - 560 * 1.1 ) / 2
let sml2 = window.innerWidth / 2
let smleft = nmt + 91  + 312  + nb * 2
let smleft_big = nmt + 91  + 312  + nb * 2 - (138  * 0.1 / 2)
bg.src = 'images/home/background.png'
// banner.src = 'images/home/banner_icon.png'
// bannerModal.src = 'images/home/banner_modal.png'
activeBtn.src = 'images/home/active.png'
startBtn.src = 'images/home/start.png'

shareBtn.src = 'images/home/share.png'
authorBtn.src = "images/home/author.png"
loginstartBtn.src = 'images/home/start.png'
loginstartBtn2.src = 'images/gamePage/archive/dd_start_btn.png'
loginfriendsRankBtn.src = 'images/home/newrank.png'
loginauthorBtn.src = "images/home/author.png"


let R = {
  "logo0": "images/home/logo/logo0.png",
  "logo1": "images/home/logo/logo1.png",
  "logo2": "images/home/logo/logo2.png",
  "logo3": "images/home/logo/logo3.png",
  "logo4": "images/home/logo/logo4.png",
  "logo5": "images/home/logo/logo5.png",
  "logo6": "images/home/logo/logo6.png",
  "gameEndBg": "images/gameEnd/gameEndBg.png",
  "modalClose": "images/gameModal/modal_close.png",
  "author": "images/home/author.png",
  "archiveModal": "images/gamePage/archive/archive_modal.png",
  "newGame": "images/gamePage/archive/new_game.png",
  "ddBtn": "images/gamePage/archive/dd_btn.png",
  'active': 'images/home/active.png'
}

//把所有的图片放到一个对象中
let Robj = {}; //两个对象有相同的k
// 遍历R对象，把真实image对象，放入this.Robj中
for (var k in R) {
  Robj[k] = wx.createImage();
  Robj[k].src = R[k];
}

/**
 * 游戏首页按钮类
 */
export default class PageBtn {
  /**
   * 首页按钮绘制函数
   */
  constructor() {
    if (databus.userinfo && databus.userinfo.userInfo && databus.userinfo.userInfo.nickName) {
      this.savedata(databus.userinfo) //同步用户数据 每次进来都同步一下昵称头像等数据
    }
    this.getBtnposition()
    this.logoTime = 0
    this.f = 0


    this.banner = wx.createImage();
    this.bannerModal = wx.createImage();
    this.activeModal = new ActiveModal()
    console.log(ratio, '11111')
  }

  render(ctx) {
    this.f++
      ctx.clearRect(0, 0, screenWidth, screenHeight)
    ctx.drawImage(bg, 0, 0, screenWidth, screenHeight)

    this.drawlogo(ctx) //画logo
    if (this.f % 6 == 0) {
      this.logoTime++
    }


    if (databus.pownstate == 1) { //已授权
      this.drawhead(ctx) //画头像
    } else { //未授权
      this.startBtn(ctx)
      this.friendsRankBtn(ctx)

      this.render_btn(ctx)
      this.loginauthor(ctx)
      this.share_button(ctx)
      this.bannerBtn(ctx)
    }

    if (databus.homeState == 2) {
      // //模拟游戏圈
      // ctx.drawImage(Robj["author"], 0, 0, Robj["author"].width, Robj["author"].height,sml2,nmt + 91*ratio + 312*ratio + nb * 2,282*ratio,138*ratio);
      // //模拟好友排行
      // ctx.drawImage(loginfriendsRankBtn, 0, 0, 280 , 138 , ml + 16*ratio, nmt - nb*ratio, 280*ratio, 138*ratio)

      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);

      ctx.drawImage(this.bannerModal, 0, 0, this.bannerModal.width, this.bannerModal.height, 94 , 300 , 640 , 900 )
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 30 , 250 , 150 , 162 );

    }

    if (databus.homeState == 3) {
      //模拟游戏圈
      // ctx.drawImage(Robj["author"], 0, 0, Robj["author"].width, Robj["author"].height,sml2,nmt + 91*ratio + 312*ratio + nb * 2,282*ratio,138*ratio);
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //存档弹框
      ctx.drawImage(Robj["archiveModal"], 0, 0, Robj["archiveModal"].width, Robj["archiveModal"].height, 30 , 350 , 768 , 704 )
      //新开一把
      ctx.drawImage(Robj["newGame"], 0, 0, Robj["newGame"].width, Robj["newGame"].height, 197 , 840 , 434 , 176 )
      //读档继续
      ctx.drawImage(Robj["ddBtn"], 0, 0, Robj["ddBtn"].width, Robj["ddBtn"].height, 175 , 670 , 478 , 196 )
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 , 300 , 150 , 162 );
    }

    if (databus.homeState == 4) { //精力系统

      if (databus.energySysLoad) { //精力系统资源加载完毕才绘制
        this.activeModal.render(ctx)
      } else {
        wx.showToast({
          title: '资源加载中～',
          icon: 'none'
        })
      }
    }

    if (databus.shareflag) {
      if (!databus.activityData) {
        return
      } else {
        if (!this.banner.src && !this.bannerModal.src) {

          this.banner.src = databus.activityData && databus.activityData.img
          this.bannerModal.src = databus.activityData && databus.activityData.bannaer

        }
      }
      //抖m
      if (this.logoTime % 20 == 0) {
        //中心点变化
        ctx.translate(740 , 198 )
        //旋转
        ctx.rotate(Math.PI * 0)

        ctx.drawImage(this.banner, 0, 0, this.banner.width, this.banner.height, -60 , -68 , 120 , 136 )

        //复位旋转和中心点
        ctx.rotate(-Math.PI * 0)
        ctx.translate(-740 , -198 )

      } else if (this.logoTime % 20 == 1) {
        //中心点变化
        ctx.translate(740 , 198 )
        //旋转
        ctx.rotate(Math.PI * 1 / 12)

        ctx.drawImage(this.banner, 0, 0, this.banner.width, this.banner.height, -60 , -68 , 120 , 136 )

        //复位旋转和中心点
        ctx.rotate(-Math.PI * 1 / 12)
        ctx.translate(-740 , -198 )

      } else if (this.logoTime % 20 == 2) {
        //中心点变化
        ctx.translate(740 , 198 )
        //旋转
        ctx.rotate(Math.PI * 0)

        ctx.drawImage(this.banner, 0, 0, this.banner.width, this.banner.height, -60 , -68 , 120 , 136 )

        //复位旋转和中心点
        ctx.rotate(-Math.PI * 0)
        ctx.translate(-740 , -198 )

      } else if (this.logoTime % 20 == 3) {
        //中心点变化
        ctx.translate(740 , 198 )
        //旋转
        ctx.rotate(-Math.PI * 1 / 12)

        ctx.drawImage(this.banner, 0, 0, this.banner.width, this.banner.height, -60 , -68 , 120 , 136 )

        //复位旋转和中心点
        ctx.rotate(Math.PI * 1 / 12)
        ctx.translate(-740 , -198 )

      } else {
        //中心点变化
        ctx.translate(740 , 198 )
        //旋转
        ctx.rotate(Math.PI * 0)

        ctx.drawImage(this.banner, 0, 0, this.banner.width, this.banner.height, -60 , -68 , 120 , 136 )

        //复位旋转和中心点
        ctx.rotate(-Math.PI * 0)
        ctx.translate(-740 , -198 )

      }

    }
  }
  render_btn() {

  }
  getBtnposition() {
    if (databus.pownstate == 1) { //按钮位置
      this.activeBtnArea = {
        startX: ml,
        startY: nmt + (110 ),
        endX: ml + 590 ,
        endY: nmt + (110 ) + (226 )
      }

      this.startBtnArea = {
        startX: ml,
        startY: nmt + (300 ),
        endX: ml + 590 ,
        endY: nmt + (300 ) + (226 )
      }
      this.friendsBtnArea = {
        startX: ml + 16 ,
        startY: nmt - nb ,
        endX: ml + 16  + 280 ,
        endY: nmt - nb  + 138 
      }
    } else {

    }
  }
  drawhead(ctx) {
    var me = this
    if (!databus.userinfo && !onget) {
      onget = true;
      wx.getUserInfo({ //获取用户基本信息
        success: function(res) {
          databus.userinfo = res
          me.savedata(res) //保存用户数据
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
      data: {
        version: databus.version
      },
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
      success(data) {}
    }
    ajax(options)
  }
  circleName(ctx, name) {
    var score = 2999; //假设分数
    ctx.fillStyle = '#fff';
    ctx.font = '16px  Arial';
    ctx.fontWeight = "bold"
    ctx.textAlign = 'center';
    ctx.fillText(name, screenWidth / 2, mt + (br * 2) + 45 );
  }
  drawscore(ctx, bestscore) { //预留加载最高分接口
    var score = 2999; //假设分数
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fontWeight = "900"
    ctx.textAlign = 'center';

    var bestscore = parseInt(bestscore)
    if (bestscore) {
      ctx.fillText(bestscore + '分', screenWidth / 2, mt + (br * 2) + 95 );
    } else {
      ctx.fillText('暂无分数', screenWidth / 2, mt + (br * 2) + 95 );
    }

  }
  circleImg(ctx, img, x, y, r, name, bestscore) { //画一个带边框的头像圆
    ctx.drawImage(bg, 0, 0, screenWidth, screenHeight)
    this.drawlogo(ctx) //画logo
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
    this.login_share_button(ctx)
    //画分数
    if (bestscore) {
      this.drawscore(ctx, bestscore)
    }

  }
  drawlogo(ctx) {
    ctx.drawImage(Robj["logo" + this.logoTime % 7], 0, 0, 800, 500, (window.innerWidth - 800 ) / 2, 120 , 800 , 500 )
    //开始游戏按钮区域

  }
  loginstartBtn(ctx) {
    if (databus.archiveState) {
      if (!databus.playbtn_state) {
        ctx.drawImage(loginstartBtn2, 0, 0, 590, 226, ml, nmt + (300 ), 590 , 226 )
      } else {
        ctx.drawImage(loginstartBtn2, 0, 0, 590, 226, ml * 0.8, nmt + (300  * 0.98), 590  * 1.1, 226  * 1.1)
      }
    } else {
      if (!databus.playbtn_state) {
        ctx.drawImage(loginstartBtn, 0, 0, 590, 226, ml, nmt + (300 ), 590 , 226 )
      } else {
        ctx.drawImage(loginstartBtn, 0, 0, 590, 226, ml * 0.8, nmt + (300  * 0.98), 590  * 1.1, 226  * 1.1)
      }
    }
  }

  startBtn(ctx) { //活动按钮
    if (!this.createbutton) {
      this.createbutton = wx.createUserInfoButton({
        type: 'image',
        image: 'images/home/start.png',
        style: {
          left: ml,
          top: nmt + (300 ),
          width: 590 ,
          height: 226 ,
          lineHeight: 40,
          backgroundColor: '#ff0000',
          color: '#ffffff',
          textAlign: 'center',
          fontSize: 16,
          borderRadius: 4
        }
      })
      if (databus.homeState == 2) {
        this.createbutton.hide()
      }
      this.createbutton.onTap((res) => {
        if (res.rawData) //授权成功
        {
          this.activeBtn.destroy()
          this.createbutton.destroy()
          this.friendbutton.destroy()
          this.bannerButton.destroy()
          databus.pownstate = 1;
          this.getBtnposition()
          this.render(ctx)
        } else {
          wx.showToast({
            title: '授权才能进入游戏哦～',
            icon: 'none'
          })
        }
      })
    }

  }
  loginfriendsRankBtn(ctx) { //好友排行榜
    if (!databus.friendbtn_state) {
      ctx.drawImage(loginfriendsRankBtn, 0, 0, 280, 138, ml + 16 , nmt - nb , 280 , 138 )
    } else {
      ctx.drawImage(loginfriendsRankBtn, 0, 0, 280, 138, ml + 16  * 0.3, nmt - nb  * 2, 280  * 1.1, 138  * 1.1)
    }
  }
  friendsRankBtn(ctx) { //好友排行榜
    if (!this.friendbutton) {
      this.friendbutton = wx.createUserInfoButton({
        type: 'image',
        image: 'images/home/newrank.png',
        style: {
          left: ml + 16 ,
          top: nmt - nb ,
          width: 280 ,
          height: 138 ,
          lineHeight: 40,
          backgroundColor: '#ff0000',
          color: '#ffffff',
          textAlign: 'center',
          fontSize: 16,
          borderRadius: 4
        }
      })

      if (databus.homeState == 2) {
        this.friendbutton.hide()
      }

      this.friendbutton.onTap((res) => {
        if (res.rawData) //授权成功
        {

          this.createbutton.destroy()
          this.friendbutton.destroy()
          this.bannerButton.destroy()
          this.activeBtn.destroy()
          databus.pownstate = 1;
          this.getBtnposition()
          this.render(ctx)
        }
      })
    }
  }
  bannerBtn(ctx) { //banner按钮
    if (!this.bannerButton) {
      this.bannerButton = wx.createUserInfoButton({
        type: 'image',
        image: 'images/home/bannerbtn.png',
        style: {

          left: 94 ,
          top: 420 ,
          width: 640 ,
          height: 900 ,
          lineHeight: 40,
          backgroundColor: '#ff0000',
          color: '#ffffff',
          textAlign: 'center',
          fontSize: 16,
          borderRadius: 4
        }
      })


      if (databus.homeState == 1) {
        this.bannerButton.hide()
      }


      this.bannerButton.onTap((res) => {
        if (res.rawData) //授权成功
        {
          this.createbutton.destroy()
          this.friendbutton.destroy()
          this.bannerButton.destroy()
          this.activeBtn.destroy()
          databus.pownstate = 1;
          databus.homeState = 1;
          this.getBtnposition()
          this.render(ctx)
        }
      })
    }
  }
  loginauthor(ctx) {
    if (databus.homeState != 1) {
      databus.gameClubbutton && databus.gameClubbutton.hide()
      return
    } else {
      databus.gameClubbutton && databus.gameClubbutton.show()
    }


    if (!databus.gameClubbutton && !databus.playbtn_state) {

      databus.gameClubbutton = wx.createGameClubButton({
        icon: 'green',
        type: 'image',
        image: 'images/home/newidea.png',
        style: {
          left: sml2,
          top: nmt - nb ,
          width: 282 ,
          height: 138 
        }
      })
    }
  }
  login_share_button(ctx) {
    if (!databus.active_state) {
      ctx.drawImage(activeBtn, 0, 0, 590, 226, ml, nmt + (110 ), 590 , 226 )
    } else {
      ctx.drawImage(activeBtn, 0, 0, 590, 226, ml_big, nmt_big + (110 ), 590  * 1.1, 226  * 1.1)
    }

  }
  share_button(ctx) {
    if (!this.activeBtn) {
      this.activeBtn = wx.createUserInfoButton({
        type: 'image',
        image: 'images/home/active.png',
        style: {
          left: ml,
          top: nmt + (110 ),
          width: 590 ,
          height: 226 ,
          lineHeight: 40,
          backgroundColor: '#ff0000',
          color: '#ffffff',
          textAlign: 'center',
          fontSize: 16,
          borderRadius: 4
        }
      })
      if (databus.homeState == 2) {
        this.activeBtn.hide()
      }
      this.activeBtn.onTap((res) => {
        if (res.rawData) //授权成功
        {
          this.createbutton.destroy()
          this.friendbutton.destroy()
          this.bannerButton.destroy()
          this.activeBtn.destroy()
          databus.homeState = 4;
          databus.pownstate = 1;
          this.getBtnposition()
          this.render(ctx)
        } else {
          wx.showToast({
            title: '授权才能参加活动噢～',
            icon: 'none'
          })
        }
      })
    }
  }
}