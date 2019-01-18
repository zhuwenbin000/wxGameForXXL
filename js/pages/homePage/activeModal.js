import DataBus from '../../databus'
let databus = new DataBus()
let uiWidth = 828;
let ratio = canvas.width / uiWidth //设计稿宽度
const mt = 170;
let R = {
  //其他部分
  "bg": "images/gameEnd/gameEndBg.png",
  "modalBg": "energySys/img/tabs/bg.png",
  "close": "energySys/img/tabs/close.png",
  "redPoint": "energySys/img/tabs/redPoint.png",
  "battle": "energySys/img/tabs/battle.png",
  "battleDown": "energySys/img/tabs/battleDown.png",
  "lottery": "energySys/img/tabs/lottery.png",
  "lotteryDown": "energySys/img/tabs/lotteryDown.png",
  "plunder": "energySys/img/tabs/plunder.png",
  "plunderDown": "energySys/img/tabs/plunderDown.png",
  "sign": "energySys/img/tabs/sign.png",
  "signDown": "energySys/img/tabs/signDown.png",
  //大赛部分

  //签到部分
  "btnY": "energySys/img/sign/btn_y.png",
  "coinToSign": "energySys/img/sign/coinToSign.png",
  "lightBg": "energySys/img/sign/lightBg.png",
  "pending": "energySys/img/sign/pending.png",
  "received": "energySys/img/sign/received.png",
  "receivedBg": "energySys/img/sign/receivedBg.png",
  "shareToSign": "energySys/img/sign/shareToSign.png",
  "signBtn": "energySys/img/sign/sign.png",
  "signBar": "energySys/img/sign/signBar.png",
  "signBg": "energySys/img/sign/signBg.png",
  "signPic": "energySys/img/sign/signPic.png",
  "signSuc": "energySys/img/sign/signSuc.png",
  "signTips": "energySys/img/sign/signTips.png",
  "signTodayBg": "energySys/img/sign/signTodayBg.png",
  "videoToSign": "energySys/img/sign/videoToSign.png",
  "waitSign": "energySys/img/sign/waitSign.png",
  "week1": "energySys/img/sign/week1.png",
  "week2": "energySys/img/sign/week2.png",
  "week3": "energySys/img/sign/week3.png",
  "week4": "energySys/img/sign/week4.png",
  "week5": "energySys/img/sign/week5.png",
  "week6": "energySys/img/sign/week6.png",
  "week7": "energySys/img/sign/week7.png",
  "rewardBg": "energySys/img/reward/rewardBg.png",
  "reward1": "energySys/img/reward/reward1.png",
  //抽奖部分

  //搜刮部分
  'friend': 'energySys/img/plunder/friend.png',
  'yaoqing': 'energySys/img/plunder/yaoqing.png',
  'list_bg':'energySys/img/plunder/sgjl.png',
  'jdbg':'energySys/img/plunder/jdbg.png',
  'jd': 'energySys/img/plunder/jd.png',
  'sj': 'energySys/img/plunder/sj.png',
  'ysj': 'energySys/img/plunder/ysj.png',
  'group30':'energySys/img/plunder/group30.png',
  'group31': 'energySys/img/plunder/group31.png'
}

let Img = {};
for (var k in R) {
  Img[k] = wx.createImage();
  Img[k].src = R[k];
}

const signXY = [
  {
    signBg: { x: 65, y: 300 },
    week: { x: 145, y: 315 },
    rewardBg: { x: 75, y: 350 },
    state2: { x: 140, y: 545 },
    state3: { x: 125, y: 545 },
  },
  {
    signBg: { x: 305, y: 300 },
    week: { x: 385, y: 315 },
    rewardBg: { x: 315, y: 350 },
    state3: { x: 380, y: 545 },
    state3: { x: 365, y: 545 },
  },
  {
    signBg: { x: 545, y: 300 },
    week: { x: 625, y: 315 },
    rewardBg: { x: 555, y: 350 },
    state3: { x: 620, y: 545 },
    state3: { x: 605, y: 545 },
  },
  {
    signBg: { x: 65, y: 610 },
    week: { x: 145, y: 625 },
    rewardBg: { x: 75, y: 660 },
    state3: { x: 140, y: 855 },
    state3: { x: 125, y: 855 },
  },
  {
    signBg: { x: 305, y: 610 },
    week: { x: 385, y: 625 },
    rewardBg: { x: 315, y: 660 },
    state3: { x: 380, y: 855 },
    state3: { x: 365, y: 855 },
  },
  {
    signBg: { x: 545, y: 610 },
    week: { x: 625, y: 625 },
    rewardBg: { x: 555, y: 660 },
    state3: { x: 620, y: 855 },
    state3: { x: 605, y: 855 },
  },
  {
    signBg: { x: 65, y: 925 },
    week: { x: 145, y: 940 },
    rewardBg: { x: 75, y: 975 },
    state2: { x: 140, y: 1170 },
    state3: { x: 125, y: 1170 },
  },
]

const daysinfo = [
  {
    day: '20190114',
    week: '1',
    proptype: '1',
    propnum: '1',
    isdone: '1'
  },
  {
    day: '20190114',
    week: '2',
    proptype: '1',
    propnum: '1',
    isdone: '1'
  },
  {
    day: '20190114',
    week: '3',
    proptype: '1',
    propnum: '1',
    isdone: '1'
  },
  {
    day: '20190114',
    week: '4',
    proptype: '1',
    propnum: '1',
    isdone: '1'
  },
  {
    day: '20190114',
    week: '5',
    proptype: '1',
    propnum: '1',
    isdone: '1'
  },
  {
    day: '20190114',
    week: '6',
    proptype: '1',
    propnum: '1',
    isdone: '1'
  },
  {
    day: '20190114',
    week: '7',
    proptype: '1',
    propnum: '1',
    isdone: '0'
  }
]

export default class ActiveModal {
  render(ctx) {

    //绘制背景
    ctx.drawImage(Img["bg"], 0, 0, canvas.width, canvas.height);
    //弹框背景
    ctx.drawImage(Img["modalBg"], 0, 0, Img["modalBg"].width, Img["modalBg"].height, 14 * ratio, 130 * ratio, 796 * ratio, 1334 * ratio);
    //弹框关闭
    ctx.drawImage(Img["close"], 0, 0, Img["close"].width, Img["close"].height, 0 * ratio, 100 * ratio, 80 * ratio, 80 * ratio);

    //导航部分
    //大赛
    if (databus.energySysTab == 0) {
      ctx.drawImage(Img["battleDown"], 0, 0, Img["battleDown"].width, Img["battleDown"].height, 58 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
    } else {
      ctx.drawImage(Img["battle"], 0, 0, Img["battle"].width, Img["battle"].height, 58 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
      //红点
      ctx.drawImage(Img["redPoint"], 0, 0, Img["redPoint"].width, Img["redPoint"].height, 168 * ratio, 110 * ratio, 60 * ratio, 60 * ratio);
    }

    //签到
    if (databus.energySysTab == 1) {
      ctx.drawImage(Img["signDown"], 0, 0, Img["signDown"].width, Img["signDown"].height, 242 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
    } else {
      ctx.drawImage(Img["sign"], 0, 0, Img["sign"].width, Img["sign"].height, 242 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
      //红点
      ctx.drawImage(Img["redPoint"], 0, 0, Img["redPoint"].width, Img["redPoint"].height, 352 * ratio, 110 * ratio, 60 * ratio, 60 * ratio);
    }

    //抽奖
    if (databus.energySysTab == 2) {
      ctx.drawImage(Img["lotteryDown"], 0, 0, Img["lotteryDown"].width, Img["lotteryDown"].height, 422 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
    } else {
      ctx.drawImage(Img["lottery"], 0, 0, Img["lottery"].width, Img["lottery"].height, 422 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
      //红点
      ctx.drawImage(Img["redPoint"], 0, 0, Img["redPoint"].width, Img["redPoint"].height, 532 * ratio, 110 * ratio, 60 * ratio, 60 * ratio);
    }

    //搜刮好友
    if (databus.energySysTab == 3) {
      ctx.drawImage(Img["plunderDown"], 0, 0, Img["plunderDown"].width, Img["plunderDown"].height, 605 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
    } else {
      ctx.drawImage(Img["plunder"], 0, 0, Img["plunder"].width, Img["plunder"].height, 605 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
      //红点
      ctx.drawImage(Img["redPoint"], 0, 0, Img["redPoint"].width, Img["redPoint"].height, 715 * ratio, 110 * ratio, 60 * ratio, 60 * ratio);

    }


    //内容部分
    //大赛
    if (databus.energySysTab == 0) {

    }

    //签到
    if (databus.energySysTab == 1) {

      for (let i = 0; i < daysinfo.length; i++) {
        //签到背景
        ctx.drawImage(Img["signBg"], 0, 0, Img["signBg"].width, Img["signBg"].height, signXY[i].signBg.x * ratio, signXY[i].signBg.y * ratio, 220 * ratio, 296 * ratio);
        //week
        ctx.drawImage(Img["week" + daysinfo[i].week], 0, 0, Img["week" + daysinfo[i].week].width, Img["week" + daysinfo[i].week].height, signXY[i].week.x * ratio, signXY[i].week.y * ratio, 56 * ratio, 30 * ratio);
        //奖品背景
        ctx.drawImage(Img["rewardBg"], 0, 0, Img["rewardBg"].width, Img["rewardBg"].height, signXY[i].rewardBg.x * ratio, signXY[i].rewardBg.y * ratio, 200 * ratio, 200 * ratio);
        //奖品
        ctx.drawImage(Img["reward1"], 0, 0, Img["reward1"].width, Img["reward1"].height, signXY[i].rewardBg.x * ratio, signXY[i].rewardBg.y * ratio, 200 * ratio, 200 * ratio);
        if (daysinfo[i].isdone == '1') {
          //签到状态-已签到
          ctx.drawImage(Img["received"], 0, 0, Img["received"].width, Img["received"].height, signXY[i].state3.x * ratio, signXY[i].state3.y * ratio, 98 * ratio, 34 * ratio);
          //已领取蒙层
          ctx.drawImage(Img["receivedBg"], 0, 0, Img["receivedBg"].width, Img["receivedBg"].height, signXY[i].signBg.x * ratio, signXY[i].signBg.y * ratio, 220 * ratio, 296 * ratio);
        } else {
          //签到状态-签到
          ctx.drawImage(Img["signBtn"], 0, 0, Img["signBtn"].width, Img["signBtn"].height, signXY[i].state2.x * ratio, signXY[i].state2.y * ratio, 66 * ratio, 34 * ratio);
        }
      }

      //底部提示和修饰图
      ctx.drawImage(Img["signPic"], 0, 0, Img["signPic"].width, Img["signPic"].height, 360 * ratio, 960 * ratio, 402 * ratio, 274 * ratio);
      ctx.drawImage(Img["signBar"], 0, 0, Img["signBar"].width, Img["signBar"].height, 129 * ratio, 1250 * ratio, 570 * ratio, 22 * ratio);
      ctx.drawImage(Img["signTips"], 0, 0, Img["signTips"].width, Img["signTips"].height, 110 * ratio, 1300 * ratio, 592 * ratio, 62 * ratio);
    }

    //抽奖
    if (databus.energySysTab == 2) {

    }

    //搜刮好友
    if (databus.energySysTab == 3) {
      //获取数据
      ctx.drawImage(Img["friend"], 0, 0, Img["friend"].width, Img["friend"].height, 110 * ratio, 320 * ratio, 42 * ratio, 34 * ratio);
      ctx.fillStyle = '#fff';
      ctx.font = '18px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(databus.frinendCount, 160 * ratio, 355 * ratio);
      ctx.drawImage(Img["yaoqing"], 0, 0, Img["yaoqing"].width, Img["yaoqing"].height, 230 * ratio, 295 * ratio, 194 * ratio, 88 * ratio);
      ctx.drawImage(Img["group30"], 0, 0, Img["group30"].width, Img["group30"].height, 460 * ratio, 1300 * ratio, 258 * ratio, 130 * ratio);
      ctx.drawImage(Img["group31"], 0, 0, Img["group31"].width, Img["group31"].height, 110 * ratio, 1300 * ratio, 258 * ratio, 130 * ratio);
      ctx.fillText('1/3', 390 * ratio, 1370 * ratio);
      this.initRanklist(ctx, databus.jl_list, 1)
    }


  }
  initRanklist = (ctx, list, page, type) => {
    let me = this;
    // 至少绘制6个

    list = list.slice(6 * (page - 1), 6 * (page))
    if (type == 'add' && list.length > 0) { //如果是正向翻页且有数据
      nowpage++
    } else if (type == 'reduce' && list.length > 0 && nowpage > 0) {
      nowpage--
    }
    if (list.length > 0) { //有数据才渲染
      let length = 6
      let itemHeight = 917 * ratio / 6;
      var w = (750 * ratio - 50 * ratio * 2);
      var h = itemHeight * length;
      for (let i = 0; i < length; i++) {
        ctx.drawImage(Img["list_bg"], 40, i * itemHeight + mt, w, itemHeight);
            
        
        if (i == 5) {  
          me.drawrank(ctx, list, page)  
        }
      }
    }
  }
  drawrank = (ctx, list, page) => {
    if (list && list.length > 0) {
      let allNum = 0;
      let avatarList = []
      list.map((item, index) => {
        avatarList[index] = wx.createImage();
        avatarList[index].src = item.avatarUrl;
       
        allNum++
        if (allNum == list.length) {
          this.drawList(ctx, avatarList, list, page)
        }
       
      });
    } else {
      // 没有数据
    }
  }
  drawList = (ctx, avatarList, list, page) => {
    
    let length = 6
    let itemHeight = 917 * ratio / 6;
    var w = (750 * ratio - 50 * ratio * 2);
    var h = itemHeight * length;
    var avatarurl_width = 80*ratio;    //绘制的头像宽度
    var avatarurl_heigth = 80 * ratio;   //绘制的头像高度
    var avatarurl_x = 115*ratio;   //绘制的头像在画布上的位置
    
    list.map((item, index) => { 
      ctx.drawImage(avatarList[index], avatarurl_x, index * itemHeight + (405 * ratio), avatarurl_width, avatarurl_heigth)    
      
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      item.nickname = item.nickname.length > 5 ? item.nickname.substring(0, 6) + '..' : item.nickname
     
      ctx.fillText(item.nickname, 205 * ratio, index * itemHeight+(460*ratio)); 
      ctx.fillText(item.penrgy+'g', 455 * ratio, index * itemHeight + (496 * ratio));//能量几克
      var jd = item.penrgy/100
      ctx.drawImage(Img["jd"], 380*ratio, index * itemHeight + (430 * ratio), Img["jd"].width*0.5, Img["jd"].height*0.5) 
      ctx.drawImage(Img["jdbg"], 392 * ratio, index * itemHeight + (441 * ratio), Img["jdbg"].width * 0.51 * jd, Img["jdbg"].height * 0.5) 
      if (item.cansteal == 1){
        ctx.drawImage(Img["sj"], 592 * ratio, index * itemHeight + (371 * ratio), Img["sj"].width*0.4, Img["sj"].height*0.4 )
      }
    })

  }
}
