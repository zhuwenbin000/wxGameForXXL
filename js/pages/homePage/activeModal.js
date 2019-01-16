import DataBus from '../../databus'
let databus = new DataBus()
let uiWidth = 828;
let ratio = canvas.width / uiWidth //设计稿宽度

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
  //抽奖部分

  //搜刮部分
}

let Img = {};	
for (var k in R) {
  Img[k] = wx.createImage();
  Img[k].src = R[k];
}

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
    }else{
      ctx.drawImage(Img["battle"], 0, 0, Img["battle"].width, Img["battle"].height, 58 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
      //红点
      ctx.drawImage(Img["redPoint"], 0, 0, Img["redPoint"].width, Img["redPoint"].height, 168 * ratio, 110 * ratio, 60 * ratio, 60 * ratio);
    }

    //签到
    if (databus.energySysTab == 1) {
      ctx.drawImage(Img["signDown"], 0, 0, Img["signDown"].width, Img["signDown"].height, 242 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
    }else{
      ctx.drawImage(Img["sign"], 0, 0, Img["sign"].width, Img["sign"].height, 242 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
      //红点
      ctx.drawImage(Img["redPoint"], 0, 0, Img["redPoint"].width, Img["redPoint"].height, 352 * ratio, 110 * ratio, 60 * ratio, 60 * ratio);
    }

    //抽奖
    if (databus.energySysTab == 2) {
      ctx.drawImage(Img["lotteryDown"], 0, 0, Img["lotteryDown"].width, Img["lotteryDown"].height, 422 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
    }else{
      ctx.drawImage(Img["lottery"], 0, 0, Img["lottery"].width, Img["lottery"].height, 422 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
      //红点
      ctx.drawImage(Img["redPoint"], 0, 0, Img["redPoint"].width, Img["redPoint"].height, 532 * ratio, 110 * ratio, 60 * ratio, 60 * ratio);
    }

    //搜刮好友
    if (databus.energySysTab == 3) {
      ctx.drawImage(Img["plunderDown"], 0, 0, Img["plunderDown"].width, Img["plunderDown"].height, 605 * ratio, 110 * ratio, 164 * ratio, 164 * ratio);
    }else{
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
      ctx.drawImage(Img["signBg"], 0, 0, Img["signBg"].width, Img["signBg"].height, 65 * ratio, 300 * ratio, 220 * ratio, 296 * ratio);


      ctx.drawImage(Img["signBg"], 0, 0, Img["signBg"].width, Img["signBg"].height, 305 * ratio, 300 * ratio, 220 * ratio, 296 * ratio);


      ctx.drawImage(Img["signBg"], 0, 0, Img["signBg"].width, Img["signBg"].height, 545 * ratio, 300 * ratio, 220 * ratio, 296 * ratio);


      ctx.drawImage(Img["signBg"], 0, 0, Img["signBg"].width, Img["signBg"].height, 65 * ratio, 610 * ratio, 220 * ratio, 296 * ratio);


      ctx.drawImage(Img["signBg"], 0, 0, Img["signBg"].width, Img["signBg"].height, 305 * ratio, 610 * ratio, 220 * ratio, 296 * ratio);


      ctx.drawImage(Img["signBg"], 0, 0, Img["signBg"].width, Img["signBg"].height, 545 * ratio, 610 * ratio, 220 * ratio, 296 * ratio);


      ctx.drawImage(Img["signBg"], 0, 0, Img["signBg"].width, Img["signBg"].height, 65 * ratio, 925 * ratio, 220 * ratio, 296 * ratio);
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
      
    }
    

  }
}
