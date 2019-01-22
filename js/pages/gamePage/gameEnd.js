import { ajax } from '../../base/ajax'
import DataBus from '../../databus'
let databus = new DataBus()
let uiWidth = 828;
let ratio = canvas.width / uiWidth //设计稿宽度

//统一配置UI值
let gsc = databus.GameUI.getScoreCoordinates //本次得分坐标
let nrc = databus.GameUI.newRecordCoordinates //游戏结束新纪录
let tc = databus.GameUI.tipsCoordinates //游戏结束提示
let sc = databus.GameUI.shareCoordinates //游戏结束分享
let lvc = databus.GameUI.lookVideoCoordinates //游戏结束看视频
let ic = databus.GameUI.indexCoordinates //游戏结束首页
let tac = databus.GameUI.tryAgainCoordinates //游戏结束再来一局
let ac = databus.GameUI.avatarCoordinates //游戏结束头像
let unc = databus.GameUI.userNameCoordinates //游戏结束昵称
let bsc = databus.GameUI.bestScoreCoordinates //游戏结束最高得分
let ssc = databus.GameUI.stageScoreCoordinates //游戏结束最高得分
let bic = databus.GameUI.battleIconCoordinates //战报icon
let aec = databus.GameUI.addEngCoordinates //增加精力
let aenc = databus.GameUI.addEngNumCoordinates //增加精力数字


let R = {
  "gameEndBg": "images/gameEnd/gameEndBg.png",
  "getScore": "images/gameEnd/getScore.png",
  "index": "images/gameEnd/index.png",
  "lookVideo": "images/gameEnd/lookVideo.png",
  "lookVideoGrey": "images/gameEnd/lookVideo-grey.png",
  "newRecord": "images/gameEnd/newRecord.png",
  "shareToQun": "images/gameEnd/shareToQun.png",
  "shareToQunGrey": "images/gameEnd/shareToQun-grey.png",
  "tips": "images/gameEnd/tips.png",
  "tips2": "images/gameEnd/tips2.png",
  "tryAgain": "images/gameEnd/tryAgain.png",
  "addEnergy": "images/gameEnd/addEnergy.png",
  "battleReportIcon": "images/gameEnd/battleReportIcon.png",
  "battleReportBg": "images/gameEnd/battleReportBg.png",
  "modalClose": "images/gameModal/modal_close.png",
}

//把所有的图片放到一个对象中
let Robj = {};	//两个对象有相同的k
// 遍历R对象，把真实image对象，放入this.Robj中
for (var k in R) {
  Robj[k] = wx.createImage();
  Robj[k].src = R[k];
}

export default class GameEnd {
  render(ctx) {
    this.ctx = ctx;
    //绘制背景
    ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
    //绘制本次得分
    ctx.drawImage(Robj["getScore"], 0, 0, Robj["getScore"].width, Robj["getScore"].height, gsc.x, gsc.y, gsc.w, gsc.h);
    //游戏结束首页
    ctx.drawImage(Robj["index"], 0, 0, Robj["index"].width, Robj["index"].height, ic.x, ic.y, ic.w, ic.h);
    if (databus.shareflag) {//审核模式
        //游戏结束提示
        ctx.drawImage(Robj["tips2"], 0, 0, Robj["tips"].width, Robj["tips"].height, tc.x, tc.y, tc.w, tc.h);
      if (!databus.isShare) {
        //游戏结束分享-未分享
        ctx.drawImage(Robj["shareToQun"], 0, 0, Robj["shareToQun"].width, Robj["shareToQun"].height, 85 * ratio, sc.y, sc.w, sc.h);
      } else {
        //游戏结束分享-已分享
        ctx.drawImage(Robj["shareToQunGrey"], 0, 0, Robj["shareToQunGrey"].width, Robj["shareToQunGrey"].height, 85 * ratio, sc.y, sc.w, sc.h);
      }
      if(!databus.isLookVideo){
        //游戏看视频-未观看
        ctx.drawImage(Robj["lookVideo"], 0, 0, Robj["lookVideo"].width, Robj["lookVideo"].height, 425 * ratio, sc.y, sc.w, sc.h);
      }else{
        //游戏看视频-已观看
        ctx.drawImage(Robj["lookVideoGrey"], 0, 0, Robj["lookVideoGrey"].width, Robj["lookVideoGrey"].height, 425 * ratio, sc.y, sc.w, sc.h);
      }
    } else {//非审核模式
      //游戏结束提示
      ctx.drawImage(Robj["tips"], 0, 0, Robj["tips"].width, Robj["tips"].height, tc.x, tc.y, tc.w, tc.h);
      if(!databus.isLookVideo){
        //游戏看视频-未观看
        ctx.drawImage(Robj["lookVideo"], 0, 0, Robj["lookVideo"].width, Robj["lookVideo"].height, sc.x, sc.y, sc.w, sc.h);
      }else{
        //游戏看视频-已观看
        ctx.drawImage(Robj["lookVideoGrey"], 0, 0, Robj["lookVideoGrey"].width, Robj["lookVideoGrey"].height, sc.x, sc.y, sc.w, sc.h);
      }
    }
    if(databus.isNewScore){
      //游戏结束新纪录
      ctx.drawImage(Robj["newRecord"], 0, 0, Robj["newRecord"].width, Robj["newRecord"].height, nrc.x, nrc.y, nrc.w, nrc.h);
    }
    //游戏结束再来一局
    ctx.drawImage(Robj["tryAgain"], 0, 0, Robj["tryAgain"].width, Robj["tryAgain"].height, tac.x, tac.y, tac.w, tac.h);
    //战报icon
    ctx.drawImage(Robj["battleReportIcon"], 0, 0, Robj["battleReportIcon"].width, Robj["battleReportIcon"].height, bic.x , bic.y, bic.w, bic.h);
    //增加精力
    ctx.drawImage(Robj["addEnergy"], 0, 0, Robj["addEnergy"].width, Robj["addEnergy"].height, aec.x, aec.y, aec.w, aec.h);
    
    // 昵称
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff';
    ctx.font = unc.font;
    ctx.fillText(databus.userinfo.userInfo.nickName, unc.x, unc.y);
    //增加精力数字
    ctx.font = aenc.font;
    ctx.fillText('+18', aenc.x, aenc.y);
    //历史最高分
    ctx.font = ssc.font;
    if (databus.isNewScore) {
      ctx.fillText('最高得分：' + parseInt(databus.gameScore + databus.score) + '分', ssc.x, ssc.y);
    }else{
      ctx.fillText('最高得分：' + databus.bestscore + '分', ssc.x, ssc.y);
    }
    //本局分数
    ctx.textAlign = 'center';
    ctx.font = bsc.font;
    ctx.fillText(databus.gameScore + databus.score, bsc.x, bsc.y);
    //头像
    let headimg = wx.createImage();
    headimg.src = databus.userinfo.userInfo.avatarUrl
    databus.circleImg(ctx, headimg, ac.x, ac.y, ac.r)

    if(databus.gameEndState == 1){
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //绘制战报背景
      ctx.drawImage(Robj["battleReportBg"], 0, 0, Robj["battleReportBg"].width, Robj["battleReportBg"].height, 54 * ratio, 140 * ratio, 720 * ratio, 1200 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 85 * ratio, 150 * ratio, 162 * ratio);
      
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff323';
      ctx.font = 30 * ratio + 'px Arial';
      //最后得分
      ctx.fillText("1212", 310 * ratio, 670 * ratio);
      //最后关卡
      ctx.fillText("10", 590 * ratio, 667 * ratio);
      //累计连击
      ctx.fillText("10", 290 * ratio, 730 * ratio);
      //crazy time得分
      ctx.fillText("1000", 385 * ratio, 792 * ratio);
      //花费时间
      ctx.textAlign = 'left';
      ctx.fillText("1小时20分20秒", 260 * ratio, 850 * ratio);
      ctx.textAlign = 'center';
      //击败百分比
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText("80", 310 * ratio, 923 * ratio);
      //保存tips
      ctx.font = 30 * ratio + 'px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText("已为你保存到相册", 414 * ratio, 1390 * ratio);
    }
  }
}
