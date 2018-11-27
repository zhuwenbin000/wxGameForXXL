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
  "noSharetips": "images/gameEnd/noSharetips.png",
  "tryAgain": "images/gameEnd/tryAgain.png"
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
    
    // 昵称
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff';
    ctx.font = unc.font;
    ctx.fillText(databus.userinfo.userInfo.nickName, unc.x, unc.y);
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
  }
}
