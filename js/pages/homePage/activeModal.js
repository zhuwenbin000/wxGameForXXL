import DataBus from '../../databus'
let databus = new DataBus()
let uiWidth = 828;
let ratio = canvas.width / uiWidth //设计稿宽度
const mt = 373*ratio;
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
  "battleBorder": "energySys/img/tabs/battleBorder.png",
  "battleInfo": "energySys/img/tabs/battleInfo.png",
  "battleProcess": "energySys/img/tabs/battleProcess.png",
  "battleShare": "energySys/img/tabs/battleShare.png",

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
  "reward2": "energySys/img/reward/reward2.png",
  "reward3": "energySys/img/reward/reward3.png",
  "reward4": "energySys/img/reward/reward4.png",
  "reward6": "energySys/img/reward/reward6.png",
  //抽奖部分
  "boxShadow": "energySys/img/openbox/boxShadow.png",
  "box": "energySys/img/openbox/box.png",
  "boxNum": "energySys/img/openbox/boxNum.png",
  "openBoxTxt": "energySys/img/openbox/openBoxTxt.png",
  "openBtn": "energySys/img/openbox/openBtn.png",
  "boxMask": "energySys/img/openbox/boxMask.png",
  "boxProcessWrap": "energySys/img/openbox/boxProcessWrap.png",
  "boxProcess": "energySys/img/openbox/boxProcess.png",
  "myProcessWrap": "energySys/img/openbox/myProcessWrap.png",
  "myProcess": "energySys/img/openbox/myProcess.png",
  "exchangeTime": "energySys/img/plunder/exchangeTime.png",
  
  //搜刮部分
  'friend': 'energySys/img/plunder/friend.png',
  'yaoqing': 'energySys/img/plunder/yaoqing.png',
  'list_bg':'energySys/img/plunder/sgjl.png',
  'jdbg':'energySys/img/plunder/jdbg.png',
  'jd': 'energySys/img/plunder/jd.png',
  'sj': 'energySys/img/plunder/sj.png',
  'ysj': 'energySys/img/plunder/ysj.png',
  'group30':'energySys/img/plunder/group30.png',
  'group31': 'energySys/img/plunder/group31.png',
  "tip": "energySys/img/reward/tip.png",
  "sgcg": "energySys/img/reward/sgcg.png",
  "sgsb": "energySys/img/reward/sgsb.png",
  "sgcg_b": "energySys/img/plunder/sgcg.png",
}

let Img = {};
for (var k in R) {
  Img[k] = wx.createImage();
  Img[k].src = R[k];
}

const signXY = databus.signXY
const daysinfo = databus.daysinfo
const plunderRecord = databus.plunderRecord

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

      //大赛进度
      ctx.drawImage(Img["battleProcess"], 0, 0, Img["battleProcess"].width, Img["battleProcess"].height, 56 * ratio, 1180 * ratio, 716 * ratio, 80 * ratio);
      //大赛框
      ctx.drawImage(Img["battleBorder"], 0, 0, Img["battleBorder"].width, Img["battleBorder"].height, 54 * ratio, 300 * ratio, 720 * ratio, 960 * ratio);
      //大赛进度
      ctx.drawImage(Img["btnY"], 0, 0, Img["btnY"].width, Img["btnY"].height, 60 * ratio, 1300 * ratio, 305 * ratio, 115 * ratio);
      //大赛进度
      ctx.drawImage(Img["btnY"], 0, 0, Img["btnY"].width, Img["btnY"].height, 415 * ratio, 1300 * ratio, 350 * ratio, 115 * ratio);
      //分享组战队
      ctx.drawImage(Img["battleShare"], 0, 0, Img["battleShare"].width, Img["battleShare"].height, 110 * ratio, 1330 * ratio, 200 * ratio, 40 * ratio);
      //最新赛况
      ctx.drawImage(Img["battleInfo"], 0, 0, Img["battleInfo"].width, Img["battleInfo"].height, 470 * ratio, 1325 * ratio, 232 * ratio, 52 * ratio);

    }

    //签到
    if (databus.energySysTab == 1) {
      
      for (let i = 0; i < daysinfo.length; i++) {
        //签到背景
        if(databus.getNowTimeStr() == daysinfo[i].day && daysinfo[i].isdone == '0'){
          ctx.drawImage(Img["signTodayBg"], 0, 0, Img["signTodayBg"].width, Img["signTodayBg"].height, signXY[i].signBg.x * ratio, signXY[i].signBg.y * ratio, 220 * ratio, 296 * ratio);
        }else{
          ctx.drawImage(Img["signBg"], 0, 0, Img["signBg"].width, Img["signBg"].height, signXY[i].signBg.x * ratio, signXY[i].signBg.y * ratio, 220 * ratio, 296 * ratio);
        }
        //week
        ctx.drawImage(Img["week" + daysinfo[i].week], 0, 0, Img["week" + daysinfo[i].week].width, Img["week" + daysinfo[i].week].height, signXY[i].week.x * ratio, signXY[i].week.y * ratio, 56 * ratio, 30 * ratio);
        //奖品背景
        ctx.drawImage(Img["rewardBg"], 0, 0, Img["rewardBg"].width, Img["rewardBg"].height, signXY[i].rewardBg.x * ratio, signXY[i].rewardBg.y * ratio, 200 * ratio, 200 * ratio);
        
        //奖品
        ctx.drawImage(Img["reward" + daysinfo[i].proptype], 0, 0, Img["reward" + daysinfo[i].proptype].width, Img["reward" + daysinfo[i].proptype].height, signXY[i].rewardBg.x * ratio, signXY[i].rewardBg.y * ratio, 200 * ratio, 200 * ratio);
        if(daysinfo[i].proptype == '2' || daysinfo[i].proptype == '3' || daysinfo[i].proptype == '6'){//判断道具名字长度
          //奖品数量
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 28 * ratio + 'px Arial';
          ctx.fillText(daysinfo[i].propnum, (signXY[i].signBg.x + 165) * ratio, (signXY[i].signBg.y + 230) * ratio);
        }else{
          //奖品数量
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 28 * ratio + 'px Arial';
          ctx.fillText(daysinfo[i].propnum, (signXY[i].signBg.x + 150) * ratio, (signXY[i].signBg.y + 230) * ratio);
        }
        
        if(parseInt(daysinfo[i].day) < parseInt(databus.getNowTimeStr())){//当日之前的天数
          //签到状态-已签到
          if (daysinfo[i].isdone == '1') {
            ctx.drawImage(Img["received"], 0, 0, Img["received"].width, Img["received"].height, signXY[i].state3.x * ratio, signXY[i].state3.y * ratio, 98 * ratio, 34 * ratio);
            //已领取蒙层
            ctx.drawImage(Img["receivedBg"], 0, 0, Img["receivedBg"].width, Img["receivedBg"].height, signXY[i].signBg.x * ratio, signXY[i].signBg.y * ratio, 220 * ratio, 296 * ratio);
          } else {
            //签到状态-签到
            ctx.drawImage(Img["pending"], 0, 0, Img["pending"].width, Img["pending"].height, signXY[i].state3.x * ratio, signXY[i].state3.y * ratio, 98 * ratio, 34 * ratio);
          }
        } 
        if(parseInt(daysinfo[i].day) == parseInt(databus.getNowTimeStr())){
          //签到状态-已签到
          if (daysinfo[i].isdone == '1') {
            ctx.drawImage(Img["received"], 0, 0, Img["received"].width, Img["received"].height, signXY[i].state3.x * ratio, signXY[i].state3.y * ratio, 98 * ratio, 34 * ratio);
            //已领取蒙层
            ctx.drawImage(Img["receivedBg"], 0, 0, Img["receivedBg"].width, Img["receivedBg"].height, signXY[i].signBg.x * ratio, signXY[i].signBg.y * ratio, 220 * ratio, 296 * ratio);
          } else {
            //签到状态-签到
            ctx.drawImage(Img["signBtn"], 0, 0, Img["signBtn"].width, Img["signBtn"].height, signXY[i].state2.x * ratio, signXY[i].state2.y * ratio, 66 * ratio, 34 * ratio);
            //红点
            ctx.drawImage(Img["redPoint"], 0, 0, Img["redPoint"].width, Img["redPoint"].height, (signXY[i].signBg.x + 145) * ratio, (signXY[i].signBg.y + 220) * ratio, 40 * ratio, 40 * ratio);
          }
        }
        if(parseInt(daysinfo[i].day) > parseInt(databus.getNowTimeStr())){
          //签到状态-签到
          ctx.drawImage(Img["waitSign"], 0, 0, Img["waitSign"].width, Img["waitSign"].height, signXY[i].state3.x * ratio, signXY[i].state3.y * ratio, 98 * ratio, 34 * ratio);
        }
      }

      //底部提示和修饰图
      ctx.drawImage(Img["signPic"], 0, 0, Img["signPic"].width, Img["signPic"].height, 360 * ratio, 960 * ratio, 402 * ratio, 274 * ratio);
      ctx.drawImage(Img["signBar"], 0, 0, Img["signBar"].width, Img["signBar"].height, 129 * ratio, 1250 * ratio, 570 * ratio, 22 * ratio);
      ctx.drawImage(Img["signTips"], 0, 0, Img["signTips"].width, Img["signTips"].height, 110 * ratio, 1300 * ratio, 592 * ratio, 62 * ratio);

      //签到成功弹框
      if(databus.energySysModal == 1){
        //绘制背景
        ctx.drawImage(Img["bg"], 0, 0, canvas.width, canvas.height);
        //弹框背景
        ctx.drawImage(Img["rewardBg"], 0, 0, Img["rewardBg"].width, Img["rewardBg"].height, 210 * ratio, 400 * ratio, 428 * ratio, 428 * ratio);
        //弹框关闭
        ctx.drawImage(Img["close"], 0, 0, Img["close"].width, Img["close"].height, 185 * ratio, 365 * ratio, 80 * ratio, 80 * ratio);
        //奖品
        ctx.drawImage(Img["reward" + databus.signData.proptype], 0, 0, Img["reward" + databus.signData.proptype].width, Img["reward" + databus.signData.proptype].height, 210 * ratio, 400 * ratio, 428 * ratio, 428 * ratio);
        if(databus.signData.proptype == '2' || databus.signData.proptype == '3' || databus.signData.proptype == '6'){//判断道具名字长度
          //奖品数量
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 50 * ratio + 'px Arial';
          ctx.fillText(databus.signData.propnum, 550 * ratio, 785 * ratio);
        }else{
          //奖品数量
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 50 * ratio + 'px Arial';
          ctx.fillText(databus.signData.propnum, 525 * ratio, 785 * ratio);
        }
        //按钮背景
        ctx.drawImage(Img["btnY"], 0, 0, Img["btnY"].width, Img["btnY"].height, 195 * ratio, 875 * ratio, 455 * ratio, 170 * ratio);
        //签到成功
        ctx.drawImage(Img["signSuc"], 0, 0, Img["signSuc"].width, Img["signSuc"].height, 300 * ratio, 920 * ratio, 236 * ratio, 58 * ratio);
      }

      //补签弹框
      if(databus.energySysModal == 2){
        //绘制背景
        ctx.drawImage(Img["bg"], 0, 0, canvas.width, canvas.height);
        //弹框背景
        ctx.drawImage(Img["rewardBg"], 0, 0, Img["rewardBg"].width, Img["rewardBg"].height, 210 * ratio, 400 * ratio, 428 * ratio, 428 * ratio);
        //弹框关闭
        ctx.drawImage(Img["close"], 0, 0, Img["close"].width, Img["close"].height, 185 * ratio, 365 * ratio, 80 * ratio, 80 * ratio);
        //奖品
        ctx.drawImage(Img["reward" + databus.signData.proptype], 0, 0, Img["reward" + databus.signData.proptype].width, Img["reward" + databus.signData.proptype].height, 210 * ratio, 400 * ratio, 428 * ratio, 428 * ratio);
        if(databus.signData.proptype == '2' || databus.signData.proptype == '3' || databus.signData.proptype == '6'){//判断道具名字长度
          //奖品数量
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 50 * ratio + 'px Arial';
          ctx.fillText(databus.signData.propnum, 550 * ratio, 785 * ratio);
        }else{
          //奖品数量
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 50 * ratio + 'px Arial';
          ctx.fillText(databus.signData.propnum, 525 * ratio, 785 * ratio);
        }
        //按钮背景
        ctx.drawImage(Img["btnY"], 0, 0, Img["btnY"].width, Img["btnY"].height, 195 * ratio, 875 * ratio, 455 * ratio, 170 * ratio);
        //视频补签
        ctx.drawImage(Img["videoToSign"], 0, 0, Img["videoToSign"].width, Img["videoToSign"].height, 270 * ratio, 918 * ratio, 302 * ratio, 60 * ratio);
      }
    }

    //抽奖
    if (databus.energySysTab == 2) {
      //我的背景
      ctx.drawImage(Img["list_bg"], 0, 0, Img["list_bg"].width, Img["list_bg"].height, 42 * ratio, 320 * ratio, 740 * ratio, 152 * ratio);
      //我的精力进度条外层
      ctx.drawImage(Img["myProcessWrap"], 0, 0, Img["myProcessWrap"].width, Img["myProcessWrap"].height, 265 * ratio, 380 * ratio, 308 * ratio, 28 * ratio);
      //我的精力进度条内层
      if(databus.exchangeBoxAni){
        ctx.drawImage(Img["myProcess"], 0, 0, Img["myProcess"].width * (databus.myEnergy * ((30 - databus.exchangeBoxAniTime) / 30) / 100), Img["myProcess"].height, 272 * ratio, 386 * ratio, 294 * (databus.myEnergy * ((30 - databus.exchangeBoxAniTime) / 30) / 100) * ratio, 16 * ratio);
      }else{
        ctx.drawImage(Img["myProcess"], 0, 0, Img["myProcess"].width * (databus.myEnergy / 100), Img["myProcess"].height, 272 * ratio, 386 * ratio, 294 * (databus.myEnergy / 100) * ratio, 16 * ratio);
      }
      //我的精力
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 28 * ratio + 'px Arial';
      ctx.fillText('我的精力：' + databus.myEnergy + 'g', 414 * ratio, 445 * ratio);
      //换取倒计时
      // if((new Date()).getTime() > databus.boxExchangeTime + 10 * 60 * 60 * 1000){
      if(databus.canExchangeBox){
        //搜刮精力
        ctx.drawImage(Img["sj"], 0, 0, Img["sj"].width, Img["sj"].height, 615 * ratio, 295 * ratio, 148 * ratio, 156 * ratio);
        //搜刮精力红点
        ctx.drawImage(Img["redPoint"], 0, 0, Img["redPoint"].width, Img["redPoint"].height, 723 * ratio, 344 * ratio, 40 * ratio, 40 * ratio);
      }else{
        //搜刮精力
        ctx.drawImage(Img["exchangeTime"], 0, 0, Img["exchangeTime"].width, Img["exchangeTime"].height, 615 * ratio, 295 * ratio, 148 * ratio, 156 * ratio);
        //搜刮倒计时
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 28 * ratio + 'px Arial';
        ctx.fillText(databus.getRemainTime(), 685 * ratio, 430 * ratio);
      }
      //偷取记录
      for (let i = 0; i < 3; i++) {
        ctx.textAlign = 'left';
        ctx.fillStyle = '#ffe739';
        ctx.font = 28 * ratio + 'px Arial';
        ctx.fillText('好友' + plunderRecord[i].nickname + '，' + plunderRecord[i].stealtime + '小时前搜刮了你的精力' + plunderRecord[i].penrgy + '点。', 80 * ratio, (470 + 45 * (i + 1)) * ratio);
      }
      //宝箱投影
      ctx.drawImage(Img["boxShadow"], 0, 0, Img["boxShadow"].width, Img["boxShadow"].height, 200 * ratio, 920 * ratio, 430 * ratio, 106 * ratio);
      //宝箱
      ctx.drawImage(Img["box"], 0, 0, Img["box"].width, Img["box"].height, 245 * ratio, 715 * ratio, 350 * ratio, 286 * ratio);
      if(databus.boxOpenStart){
        //开箱中
        ctx.drawImage(Img["boxMask"], 0, 0, Img["boxMask"].width, Img["boxMask"].height * (1 - databus.boxOpenClickNum / databus.boxOpenNeedClickNum), 245 * ratio, 715 * ratio, 350 * ratio, 286 * (1 - databus.boxOpenClickNum / databus.boxOpenNeedClickNum) * ratio);
      }
      //宝箱数量
      ctx.drawImage(Img["boxNum"], 0, 0, Img["boxNum"].width, Img["boxNum"].height, 555 * ratio, 690 * ratio, 80 * ratio, 80 * ratio);
      //宝箱数量
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 40 * ratio + 'px Arial';
      ctx.fillText(databus.boxNum, 595 * ratio, 745 * ratio);
      //箱子精力进度条外层
      ctx.drawImage(Img["boxProcessWrap"], 0, 0, Img["boxProcessWrap"].width, Img["boxProcessWrap"].height, 214 * ratio, 1043 * ratio, 400 * ratio, 28 * ratio);
      //箱子精力进度条内层
      if(databus.exchangeBoxAni){
        ctx.drawImage(Img["boxProcess"], 0, 0, Img["boxProcess"].width * ((databus.boxEnergy + databus.myEnergy * (databus.exchangeBoxAniTime / 30)) / 50), Img["boxProcess"].height, 222 * ratio, 1049 * ratio, 384 * ((databus.boxEnergy + databus.myEnergy * (databus.exchangeBoxAniTime / 30)) / 50) * ratio, 16 * ratio);
      }else{
        ctx.drawImage(Img["boxProcess"], 0, 0, Img["boxProcess"].width * (databus.boxEnergy / 50), Img["boxProcess"].height, 222 * ratio, 1049 * ratio, 384 * (databus.boxEnergy / 50) * ratio, 16 * ratio);
      }
      //箱子精力
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 30 * ratio + 'px Arial';
      ctx.fillText('箱子精力：' + databus.boxEnergy + '/50', 414 * ratio, 1120 * ratio);
      //开箱按钮
      ctx.drawImage(Img["openBtn"], 0, 0, Img["openBtn"].width, Img["openBtn"].height, 255 * ratio, 1170 * ratio, 312 * ratio, 138 * ratio);
      //连续点击
      ctx.drawImage(Img["openBoxTxt"], 0, 0, Img["openBoxTxt"].width, Img["openBoxTxt"].height, 306 * ratio, 1310 * ratio, 216 * ratio, 74 * ratio);

      //头像
      let headimg = wx.createImage();
      headimg.src = "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erm1XibgogmATqWxAVhGOCuWVeicNua02FcsVHZAicmmPrSriaY2oQvFLiacoico3ZhZVnTAG9DIQHJFSOg/132"
      databus.circleImg(ctx, headimg, 110 * ratio, 348 * ratio, 40 * ratio)

      //开箱成功弹框
      if(databus.energySysModal == 3){
        //绘制背景
        ctx.drawImage(Img["bg"], 0, 0, canvas.width, canvas.height);
        //弹框背景
        ctx.drawImage(Img["rewardBg"], 0, 0, Img["rewardBg"].width, Img["rewardBg"].height, 210 * ratio, 400 * ratio, 428 * ratio, 428 * ratio);
        //弹框关闭
        ctx.drawImage(Img["close"], 0, 0, Img["close"].width, Img["close"].height, 185 * ratio, 365 * ratio, 80 * ratio, 80 * ratio);
        //奖品
        ctx.drawImage(Img["reward" + databus.openBoxData.proptype], 0, 0, Img["reward" + databus.openBoxData.proptype].width, Img["reward" + databus.openBoxData.proptype].height, 210 * ratio, 400 * ratio, 428 * ratio, 428 * ratio);
        if(databus.openBoxData.proptype == '2' || databus.openBoxData.proptype == '3' || databus.openBoxData.proptype == '6'){//判断道具名字长度
          //奖品数量
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 50 * ratio + 'px Arial';
          ctx.fillText(databus.openBoxData.propnum, 550 * ratio, 785 * ratio);
        }else{
          //奖品数量
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 50 * ratio + 'px Arial';
          ctx.fillText(databus.openBoxData.propnum, 525 * ratio, 785 * ratio);
        }
        // //按钮背景
        // ctx.drawImage(Img["btnY"], 0, 0, Img["btnY"].width, Img["btnY"].height, 195 * ratio, 875 * ratio, 455 * ratio, 170 * ratio);
        // //开箱成功
        // ctx.drawImage(Img["signSuc"], 0, 0, Img["signSuc"].width, Img["signSuc"].height, 300 * ratio, 920 * ratio, 236 * ratio, 58 * ratio);
      }
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

  //签到部分

  //搜刮部分
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
      var w = (750 * ratio - 20 * ratio );
      var h = itemHeight * length;
      for (let i = 0; i < length; i++) {
        ctx.drawImage(Img["list_bg"], 50*ratio, i * itemHeight + mt, w, itemHeight);
            
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
      ctx.fillText(item.penrgy+'g', 485 * ratio, index * itemHeight + (496 * ratio));//能量几克
      var jd = item.penrgy/100
      ctx.drawImage(Img["jd"], 420 * ratio, index * itemHeight + (430 * ratio), Img["jd"].width * ratio, Img["jd"].height * ratio) 
      ctx.drawImage(Img["jdbg"], 432 * ratio, index * itemHeight + (441 * ratio), Img["jdbg"].width * ratio * jd, Img["jdbg"].height * ratio*0.8) 
      if (item.cansteal == 1){
        ctx.drawImage(Img["sj"], 632 * ratio, index * itemHeight + (365 * ratio), Img["sj"].width * 0.9  * ratio, Img["sj"].height*0.9  * ratio)
      }
    })
    if (databus.tip_success){
      ctx.drawImage(Img["bg"], 0, 0, canvas.width, canvas.height);
      ctx.drawImage(Img["tip"], 0, 0, Img["tip"].width, Img["tip"].height, 80 * ratio, 400 * ratio, 672 * ratio, 384 * ratio);
      ctx.drawImage(Img["sgcg"], 0, 0, Img["sgcg"].width, Img["sgcg"].height, 92 * ratio, 412 * ratio, 648 * ratio, 360 * ratio);
      ctx.drawImage(Img["reward4"], 0, 0, Img["reward4"].width, Img["reward4"].height * 0.7, 262 * ratio, 432 * ratio, 400 * ratio * 0.8, 400 * ratio * 0.56);
      //弹框关闭
      ctx.drawImage(Img["close"], 0, 0, Img["close"].width, Img["close"].height, 45 * ratio, 365 * ratio, 80 * ratio, 80 * ratio);
      ctx.drawImage(Img["sgcg_b"], 0, 0, Img["sgcg_b"].width, Img["sgcg_b"].height, 155 * ratio, 825 * ratio, 512 * ratio, 200 * ratio);
    }
  }
}
