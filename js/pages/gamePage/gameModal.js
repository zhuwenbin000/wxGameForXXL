import { ajax } from '../../base/ajax'
import DataBus from '../../databus'
let databus = new DataBus()
let uiWidth = 828;
let ratio = canvas.width / uiWidth //设计稿宽度


let rulec = databus.GameUI.ruleCoordinates //规则按钮坐标宽高
let hc = databus.GameUI.homeCoordinates //首页按钮坐标宽高
let mc = databus.GameUI.musicCoordinates //音乐按钮坐标宽高

let R = null

//把所有的图片放到一个对象中
let Robj = {};	//两个对象有相同的k
// 遍历R对象，把真实image对象，放入Robj中

export default class GameModal {
  render(ctx) {

    if(!R){
      R = {
        "gameEndBg": "images/gameEnd/gameEndBg.png",
        "addSteps": "energySys/img/gameModal/add_steps.png",
        "colorTool": "energySys/img/gameModal/color_tool.png",
        "modalBg": "energySys/img/gameModal/modal_bg.png",
        "modalClose": "energySys/img/gameModal/modal_close.png",
        "modalSubmit": "energySys/img/gameModal/modal_submit.png",
        "musicBgFalse": "energySys/img/gameModal/music_bg_false.png",
        "musicBgTrue": "energySys/img/gameModal/music_bg_true.png",
        "musicSoundFalse": "energySys/img/gameModal/music_sound_false.png",
        "musicSoundTrue": "energySys/img/gameModal/music_sound_true.png",
        "passState": "images/gamePage/passState.png",
        "ruleCon": "energySys/img/gameModal/rule.png",
        "finger": "energySys/img/gameModal/finger.png",
        "nextStage": "energySys/img/gameModal/next_stage.png",
        "iknow": "energySys/img/gameModal/iknow.png",
        "passStateBg": "images/gamePage/passStateBg.png",
        "buy": "energySys/img/gameModal/icon_buy.png",
        "coin": "energySys/img/gameModal/coin.png",
        "saveModal": "images/gamePage/archive/save_modal.png",
        "saveBtn": "images/gamePage/archive/save_game.png",
        "rule": "images/gamePage/gameBtn/rule.png",
        "home": "images/gamePage/gameBtn/home.png",
        "music": "images/gamePage/gameBtn/music.png",
        "crazyBtnFree": "images/gamePage/crazyTime/crazy_btn_free.png",
        "crazyBtnVideo": "images/gamePage/crazyTime/crazy_btn_video.png",
        "crazyEndModal": "images/gamePage/crazyTime/endModal.png",
        "crazyStartModal": "images/gamePage/crazyTime/startModal.png",
        "okBtn": "images/gamePage/crazyTime/ok_btn.png",
        "onestep": "energySys/img/pic/oneStep.png",
        "share3": "energySys/img/pic/share3.png",
        "video5": "energySys/img/pic/video5.png",
        "crazyBtnShare": "energySys/img/pic/startCrazy.png",
        "leftArea": "images/news/leftArea.png",
        "recommendPoster": "images/news/recommend_poster.png",
      }
      for (var k in R) {
        Robj[k] = wx.createImage();
        Robj[k].src = R[k];
      }
    }
    this.ctx = ctx;
    //3:音乐弹框
    if (databus.gameState == 3) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 190 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 170 * ratio, 150 * ratio, 162 * ratio);
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, (250 - 17) * ratio, (1030 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1030 * ratio, 340 * ratio, 168 * ratio);
      }
      if (!databus.musicBgState){
        //背景音乐-关
        ctx.drawImage(Robj["musicBgFalse"], 0, 0, Robj["musicBgFalse"].width, Robj["musicBgFalse"].height, 190 * ratio, 495 * ratio, 238 * ratio, 120 * ratio);
      }else{
        //背景音乐-开
        ctx.drawImage(Robj["musicBgTrue"], 0, 0, Robj["musicBgTrue"].width, Robj["musicBgTrue"].height, 190 * ratio, 495 * ratio, 238 * ratio, 120 * ratio);
      }
      if (!databus.musicSoundState) {
        //游戏音效-关
        ctx.drawImage(Robj["musicSoundFalse"], 0, 0, Robj["musicSoundFalse"].width, Robj["musicSoundFalse"].height, 190 * ratio, 720 * ratio, 238 * ratio, 120 * ratio);
      } else {
        //游戏音效-开
        ctx.drawImage(Robj["musicSoundTrue"], 0, 0, Robj["musicSoundTrue"].width, Robj["musicSoundTrue"].height, 190 * ratio, 720 * ratio, 238 * ratio, 120 * ratio);
      }

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('声音', (uiWidth / 2) * ratio, 365 * ratio); 
      ctx.textAlign = 'left';
      ctx.fillText('背景音乐', 485 * ratio, 570 * ratio); 
      ctx.fillText('游戏音效', 485 * ratio, 800 * ratio); 
    }
    //4:彩色道具弹框
    if (databus.gameState == 4) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 190 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 170 * ratio, 150 * ratio, 162 * ratio);
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, (250 - 17) * ratio, (1030 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1030 * ratio, 340 * ratio, 168 * ratio);
      }
      //金脚丫
      ctx.drawImage(Robj["colorTool"], 0, 0, Robj["colorTool"].width, Robj["colorTool"].height, 250 * ratio, 385 * ratio, 346 * ratio, 356 * ratio);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('道具购买', (uiWidth / 2) * ratio, 365 * ratio);
      ctx.textAlign = 'left';
      ctx.font = 40 * ratio + 'px Arial';
      ctx.fillText('效果：消除棋盘内指定同色水果', 155 * ratio, 815 * ratio);
      ctx.fillText('价格：' + databus.hammerprice + '金币', 155 * ratio, 905 * ratio); 
    }
    //5:增加步数弹框
    if (databus.gameState == 5) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 190 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 170 * ratio, 150 * ratio, 162 * ratio);
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["buy"], 0, 0, Robj["buy"].width, Robj["buy"].height, (250 - 17) * ratio, (1030 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["buy"], 0, 0, Robj["buy"].width, Robj["buy"].height, 250 * ratio, 1030 * ratio, 340 * ratio, 168 * ratio);
      }
      //金脚丫
      ctx.drawImage(Robj["addSteps"], 0, 0, Robj["addSteps"].width, Robj["addSteps"].height, 250 * ratio, 385 * ratio, 346 * ratio, 356 * ratio);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('道具购买', (uiWidth / 2) * ratio, 365 * ratio);
      ctx.textAlign = 'left';
      ctx.font = 40 * ratio + 'px Arial';
      ctx.fillText('效果：游戏步数增加3步', 155 * ratio, 815 * ratio);
      ctx.fillText('价格：' + databus.stepprice + '金币', 155 * ratio, 905 * ratio); 
    }


    //6:首页弹框
    if (databus.gameState == 6) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 190 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 170 * ratio, 150 * ratio, 162 * ratio);
      //弹框确认
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, (250 - 17) * ratio, (1030 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1030 * ratio, 340 * ratio, 168 * ratio);
      }

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('返回将丢失当局进度、得分，', (uiWidth / 2) * ratio, 650 * ratio);
      ctx.fillText('确认返回？', (uiWidth / 2) * ratio, 750 * ratio);
      
    }
    //7:过关
    if (databus.gameState == 7) {
      const endTime = 60;
      const rotateTime = 60;
      const aniTime = 10;
      // const endTime = 180;
      if (databus.passStateTime > endTime - 1){
        databus.passStateTime = 0
        databus.gameState = 10
        return
      }
      databus.passStateTime++
      if (databus.passStateTime <= aniTime) {
        //透明度变化
        ctx.globalAlpha = 1 * databus.passStateTime / aniTime
        //绘制背景
        ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
        //中心点变化
        ctx.translate(414 * ratio, 550 * ratio)
        //旋转
        ctx.rotate(Math.PI * databus.passStateTime / rotateTime)
        //过关光图
        ctx.drawImage(Robj["passStateBg"], 0, 0, Robj["passStateBg"].width, Robj["passStateBg"].height, -414 * ratio, -550 * ratio, 828 * ratio, 1100 * ratio);
        //复位旋转和中心点以及透明度
        ctx.rotate(-Math.PI * databus.passStateTime / rotateTime)
        ctx.translate(-414 * ratio, -550 * ratio)
        ctx.globalAlpha = 1
        //过关
        ctx.drawImage(Robj["passState"], 0, 0, Robj["passState"].width, Robj["passState"].height, (828 - 540) / 2 * ratio + 270 * ratio * (1 - databus.passStateTime / aniTime), 370 * ratio + 281 * ratio * (1 - databus.passStateTime / aniTime), 540 * ratio * databus.passStateTime / aniTime, 562 * ratio * databus.passStateTime / aniTime);
        if (databus.passStateTime == aniTime) {
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 80 * ratio + 'px Arial';
          ctx.fillText(databus.checkPoint, (uiWidth / 2) * ratio, 640 * ratio);
          ctx.textAlign = 'left';
          ctx.fillStyle = '#f76001';
          ctx.font = 50 * ratio + 'px Arial';
          ctx.fillText(databus.rewardstep, 430 * ratio, 770 * ratio);
        }
      } else if (databus.passStateTime > aniTime && databus.passStateTime < 100 + aniTime) {
        //绘制背景
        ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
        //中心点变化
        ctx.translate(414 * ratio, 550 * ratio)
        //旋转
        ctx.rotate(Math.PI * databus.passStateTime / rotateTime)
        //过关光图
        ctx.drawImage(Robj["passStateBg"], 0, 0, Robj["passStateBg"].width, Robj["passStateBg"].height, -414 * ratio, -550 * ratio, 828 * ratio, 1100 * ratio);
        //复位旋转和中心点以及透明度
        ctx.rotate(-Math.PI * databus.passStateTime / rotateTime)
        ctx.translate(-414 * ratio, -550 * ratio)
        //过关
        ctx.drawImage(Robj["passState"], 0, 0, Robj["passState"].width, Robj["passState"].height, (828 - 540) / 2 * ratio, 370 * ratio, 540 * ratio, 562 * ratio);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 80 * ratio + 'px Arial';
        ctx.fillText(databus.checkPoint, (uiWidth / 2) * ratio, 640 * ratio);
        ctx.textAlign = 'left';
        ctx.fillStyle = '#f76001';
        ctx.font = 50 * ratio + 'px Arial';
        ctx.fillText(databus.rewardstep, 430 * ratio, 770 * ratio);
      } else {
        //透明度变化
        ctx.globalAlpha = 1 * (endTime - databus.passStateTime) / aniTime
        //绘制背景
        ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
        //中心点变化
        ctx.translate(414 * ratio, 550 * ratio)
        //旋转
        ctx.rotate(Math.PI * (aniTime + endTime - databus.passStateTime) / rotateTime)
        //过关光图
        ctx.drawImage(Robj["passStateBg"], 0, 0, Robj["passStateBg"].width, Robj["passStateBg"].height, -414 * ratio, -550 * ratio, 828 * ratio, 1100 * ratio);
        //复位旋转和中心点以及透明度
        ctx.rotate(-Math.PI * (aniTime + endTime - databus.passStateTime) / rotateTime)
        ctx.translate(-414 * ratio, -550 * ratio)
        ctx.globalAlpha = 1
        //过关
        ctx.drawImage(Robj["passState"], 0, 0, Robj["passState"].width, Robj["passState"].height, (828 - 540) / 2 * ratio + 270 * ratio * (1 - (endTime - databus.passStateTime) / aniTime), 370 * ratio + 281 * ratio * (1 - (endTime - databus.passStateTime) / aniTime), 540 * ratio * (endTime - databus.passStateTime) / aniTime, 562 * ratio * (endTime - databus.passStateTime) / aniTime);
        if (databus.passStateTime ==  (100 + aniTime)) {
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 80 * ratio + 'px Arial';
          ctx.fillText(databus.checkPoint, (uiWidth / 2) * ratio, 640 * ratio);
          ctx.textAlign = 'left';
          ctx.fillStyle = '#f76001';
          ctx.font = 50 * ratio + 'px Arial';
          ctx.fillText(databus.rewardstep, 430 * ratio, 770 * ratio);
        }
      }
    }

    //8:规则弹框
    if (databus.gameState == 8) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["ruleCon"], 0, 0, Robj["ruleCon"].width, Robj["ruleCon"].height, (824 - 768) / 2 * ratio, 100 * ratio, 768 * ratio, 1308 * ratio);
      if (databus.fingerAniTime < 230){
        databus.fingerAniTime++
      }else{
        databus.fingerAniTime = 0
      }
      if (databus.fingerAniTime < 30) {
        //手指动画
        ctx.drawImage(Robj["finger"], 0, 0, Robj["finger"].width, Robj["finger"].height, (130 + databus.fingerAniTime/30 * 140) * ratio, 320 * ratio, 90 * ratio, 92 * ratio);
      } else if (databus.fingerAniTime >= 30 && databus.fingerAniTime < 60) {
        //手指动画
        ctx.drawImage(Robj["finger"], 0, 0, Robj["finger"].width, Robj["finger"].height, (270 - (1 - (60 - databus.fingerAniTime) / 30) * 140) * ratio, (320 + (1 - (60 - databus.fingerAniTime) / 30) * 100) * ratio, 90 * ratio, 92 * ratio);
      } else if (databus.fingerAniTime >= 60 && databus.fingerAniTime < 140) {
        //手指动画
        ctx.drawImage(Robj["finger"], 0, 0, Robj["finger"].width, Robj["finger"].height, (130 + (databus.fingerAniTime - 60) / 80 * 540) * ratio, 420 * ratio, 90 * ratio, 92 * ratio);
      } else if (databus.fingerAniTime >= 140 && databus.fingerAniTime < 170) {
        //手指动画
        ctx.drawImage(Robj["finger"], 0, 0, Robj["finger"].width, Robj["finger"].height, (130 + 540) * ratio, (420 - (1 - (170 - databus.fingerAniTime) / 30) * 100) * ratio, 90 * ratio, 92 * ratio);
      } else if (databus.fingerAniTime >= 170 && databus.fingerAniTime < 200) {
        //手指动画
        ctx.drawImage(Robj["finger"], 0, 0, Robj["finger"].width, Robj["finger"].height, (130 + 540 - (1 - (200 - databus.fingerAniTime) / 30) * 140) * ratio, 320 * ratio, 90 * ratio, 92 * ratio);
      }
      
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["iknow"], 0, 0, Robj["iknow"].width, Robj["iknow"].height, (250 - 15.6) * ratio, (1235 - 7.2) * ratio, 312 * 1.1 * ratio, 142 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["iknow"], 0, 0, Robj["iknow"].width, Robj["iknow"].height, 250 * ratio, 1235 * ratio, 312 * ratio, 142 * ratio);
      }
    }

    //11:金币规则弹框
    if (databus.gameState == 11) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["coin"], 0, 0, Robj["coin"].width, Robj["coin"].height, (824 - 768) / 2 * ratio, 300 * ratio, 768 * ratio, 704 * ratio);
      
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["iknow"], 0, 0, Robj["iknow"].width, Robj["iknow"].height, (250 - 15.6) * ratio, (820 - 7.2) * ratio, 312 * 1.1 * ratio, 142 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["iknow"], 0, 0, Robj["iknow"].width, Robj["iknow"].height, 250 * ratio, 820 * ratio, 312 * ratio, 142 * ratio);
      }
    }

    //9:游戏异常弹框
    if (databus.gameState == 9) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 190 * ratio, 824 * ratio, 1072 * ratio);
      
      //弹框确认
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, (250 - 17) * ratio, (1030 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1030 * ratio, 340 * ratio, 168 * ratio);
      }

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('网络异常', (uiWidth / 2) * ratio, 650 * ratio);
      ctx.fillText('请检查网络设置', (uiWidth / 2) * ratio, 750 * ratio);

    }

    //10:闯关动画
    if (databus.gameState == 10) {
      const endTime = 70;
      const aniTime = 20;
      if (databus.passStateTime > endTime - 1){
        databus.passStateTime = 0
        databus.gameState = 1
        return
      }
      databus.passStateTime++
      if (databus.passStateTime <= aniTime) {
        //透明度变化
        ctx.globalAlpha = 1 * databus.passStateTime / aniTime
        //绘制背景
        ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
        //关卡
        ctx.drawImage(Robj["nextStage"], 0, 0, Robj["nextStage"].width, Robj["nextStage"].height, (828 - 676) / 2 * ratio + 338 * ratio * (1 - databus.passStateTime / aniTime), 370 * ratio + 208 * ratio * (1 - databus.passStateTime / aniTime), 676 * ratio * databus.passStateTime / aniTime, 416 * ratio * databus.passStateTime / aniTime);
        ctx.globalAlpha = 1
        if (databus.passStateTime == aniTime) {
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 50 * ratio + 'px Arial';
          //剩余步数
          ctx.fillText(databus.steps, 390 * ratio, 605 * ratio);
          //过关分数
          ctx.fillText(databus.passScore, 440 * ratio, 665 * ratio);
        }
      } else if (databus.passStateTime > aniTime && databus.passStateTime < 30 + aniTime) {
        //绘制背景
        ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
        //关卡
        ctx.drawImage(Robj["nextStage"], 0, 0, Robj["nextStage"].width, Robj["nextStage"].height, (828 - 676) / 2 * ratio, 370 * ratio, 676 * ratio , 416 * ratio);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 50 * ratio + 'px Arial';
        //剩余步数
        ctx.fillText(databus.steps, 390 * ratio, 605 * ratio);
        //过关分数
        ctx.fillText(databus.passScore, 440 * ratio, 665 * ratio);
      } else {
        //透明度变化
        ctx.globalAlpha = 1 * (endTime - databus.passStateTime) / aniTime
        //绘制背景
        ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
        //关卡
        ctx.drawImage(Robj["nextStage"], 0, 0, Robj["nextStage"].width, Robj["nextStage"].height, (828 - 676) / 2 * ratio + 338 * ratio * (1 - (endTime - databus.passStateTime) / aniTime), 370 * ratio + 208 * ratio * (1 - (endTime - databus.passStateTime) / aniTime), 676 * ratio * (endTime - databus.passStateTime) / aniTime, 416 * ratio * (endTime - databus.passStateTime) / aniTime);
        ctx.globalAlpha = 1
        if (databus.passStateTime == (60 + aniTime)) {
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.font = 50 * ratio + 'px Arial';
          //剩余步数
          ctx.fillText(databus.steps, 390 * ratio, 605 * ratio);
          //过关分数
          ctx.fillText(databus.passScore, 440 * ratio, 665 * ratio);
        }
      }
    }
    
    //13:存档弹框
    if (databus.gameState == 13) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框
      ctx.drawImage(Robj["saveModal"], 0, 0, Robj["saveModal"].width, Robj["saveModal"].height, 30 * ratio, 300 * ratio, 768 * ratio, 704 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 250 * ratio, 150 * ratio, 162 * ratio);
      
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["saveBtn"], 0, 0, Robj["saveBtn"].width, Robj["saveBtn"].height, (252 - 16.2) * ratio, (770 - 7.2) * ratio, 324 * 1.1 * ratio, 142 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["saveBtn"], 0, 0, Robj["saveBtn"].width, Robj["saveBtn"].height, 252 * ratio, 770 * ratio, 324 * ratio, 142 * ratio);
      }
    }

    //14设置
    if(databus.gameState == 14){
      //绘制首页按钮
      ctx.drawImage(Robj["home"], 0, 0, Robj["home"].width, Robj["home"].height, hc.x, hc.y, hc.w, hc.h);
      //绘制规则按钮
      ctx.drawImage(Robj["rule"], 0, 0, Robj["rule"].width, Robj["rule"].height, rulec.x, rulec.y, rulec.w, rulec.h);
      //绘制音乐按钮
      ctx.drawImage(Robj["music"], 0, 0, Robj["music"].width, Robj["music"].height, mc.x, mc.y, mc.w, mc.h);
    }

    //15:crazy开始
    if (databus.gameState == 15) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框
      ctx.drawImage(Robj["crazyStartModal"], 0, 0, Robj["crazyStartModal"].width, Robj["crazyStartModal"].height, 41 * ratio, 300 * ratio, 746 * ratio, 754 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 250 * ratio, 150 * ratio, 162 * ratio);
      
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //crazy按钮
        if(databus.crazyTimeCost == 1){
          ctx.drawImage(Robj["crazyBtnFree"], 0, 0, Robj["crazyBtnFree"].width, Robj["crazyBtnFree"].height, (198 - 21.6) * ratio, (790 - 8.7) * ratio, 432 * 1.1 * ratio, 174 * 1.1 * ratio);
        }else if(databus.crazyTimeCost == 2){
          ctx.drawImage(Robj["crazyBtnShare"], 0, 0, Robj["crazyBtnShare"].width, Robj["crazyBtnShare"].height, (198 - 21.6) * ratio, (790 - 8.7) * ratio, 432 * 1.1 * ratio, 174 * 1.1 * ratio);
        }else if(databus.crazyTimeCost == 3){
          ctx.drawImage(Robj["crazyBtnVideo"], 0, 0, Robj["crazyBtnVideo"].width, Robj["crazyBtnVideo"].height, (198 - 21.6) * ratio, (790 - 7.2) * ratio, 432 * 1.1 * ratio, 174 * 1.1 * ratio);
        }
      } else {
        databus.btnPlus = 0
        //crazy按钮
        if(databus.crazyTimeCost == 1){
          ctx.drawImage(Robj["crazyBtnFree"], 0, 0, Robj["crazyBtnFree"].width, Robj["crazyBtnFree"].height, 198 * ratio, 790 * ratio, 432 * ratio, 174 * ratio);
        }else if(databus.crazyTimeCost == 2){
          ctx.drawImage(Robj["crazyBtnShare"], 0, 0, Robj["crazyBtnShare"].width, Robj["crazyBtnShare"].height, 198 * ratio, 790 * ratio, 432 * ratio, 174 * ratio);
        }else if(databus.crazyTimeCost == 3){
          ctx.drawImage(Robj["crazyBtnVideo"], 0, 0, Robj["crazyBtnVideo"].width, Robj["crazyBtnVideo"].height, 198 * ratio, 790 * ratio, 432 * ratio, 174 * ratio);
        }
      }
    }


    //16:crazy结束
    if (databus.gameState == 16) {

      if(databus.crazyTimeCost == 1){
        wx.setStorageSync('hasCrazyTime','true')
      }
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框
      ctx.drawImage(Robj["crazyEndModal"], 0, 0, Robj["crazyEndModal"].width, Robj["crazyEndModal"].height, 41 * ratio, 300 * ratio, 746 * ratio, 754 * ratio);
      //弹框关闭
      // ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 250 * ratio, 150 * ratio, 162 * ratio);
      
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 70 * ratio + 'px Arial';
      ctx.fillText(databus.crazyScore, 440 * ratio, 740 * ratio);

      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        ctx.drawImage(Robj["okBtn"], 0, 0, Robj["okBtn"].width, Robj["okBtn"].height, (198 - 21.6) * ratio, (790 - 8.7) * ratio, 432 * 1.1 * ratio, 174 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["okBtn"], 0, 0, Robj["okBtn"].width, Robj["okBtn"].height, 198 * ratio, 790 * ratio, 432 * ratio, 174 * ratio);
      }

    }

    //17:无广告时消耗金币
    if (databus.gameState == 17) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 190 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 170 * ratio, 150 * ratio, 162 * ratio);
      //弹框确认
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, (250 - 17) * ratio, (1030 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1030 * ratio, 340 * ratio, 168 * ratio);
      }

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('暂无广告可用，', (uiWidth / 2) * ratio, 650 * ratio);
      ctx.fillText('是否用' + databus.videoCoin + '金币购买', (uiWidth / 2) * ratio, 750 * ratio);
      
    }

    //18:剩余最后一步时提示分享
    if (databus.gameState == 18) {
      //弹框背景
      ctx.drawImage(Robj["onestep"], 0, 0, Robj["onestep"].width, Robj["onestep"].height, 30 * ratio, 490 * ratio, 768 * ratio, 476 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 450 * ratio, 150 * ratio, 162 * ratio);
      //弹框确认
      // if (databus.btnPlus > 0 && databus.btnPlus < 10) {
      //   databus.btnPlus++
      //   //弹框确认
      //   ctx.drawImage(Robj["share3"], 0, 0, Robj["share3"].width, Robj["share3"].height, (250 - 17) * ratio, (1030 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      // } else {
      //   databus.btnPlus = 0
      //   //弹框确认
      //   ctx.drawImage(Robj["share3"], 0, 0, Robj["share3"].width, Robj["share3"].height, 250 * ratio, 1030 * ratio, 340 * ratio, 168 * ratio);
      // }
      if(databus.oneStepShare){
        ctx.drawImage(Robj["share3"], 0, 0, Robj["share3"].width, Robj["share3"].height, 220 * ratio, 780 * ratio, 390 * ratio, 142 * ratio);
      }else{
        ctx.drawImage(Robj["video5"], 0, 0, Robj["video5"].width, Robj["video5"].height, 220 * ratio, 780 * ratio, 390 * ratio, 142 * ratio);
      }
    }

    //19:游戏页推荐位展开
    if (databus.gameState == 19) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["leftArea"], 0, 0, Robj["leftArea"].width, Robj["leftArea"].height, 0 * ratio, 205 * ratio, 560 * ratio, 420 * ratio);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#0a4d82';
      ctx.font = 17 * ratio + 'px Arial';
      //推荐位
      for (let i = 0; i < databus.recommendInfoList.length; i++) {
        if(i < 4){
          ctx.drawImage(databus.recommendInfoList[i].rilImg, 0, 0, databus.recommendInfoList[i].rilImg.width, databus.recommendInfoList[i].rilImg.height, 30 * ratio + (i * 115) * ratio, 250 * ratio, 76 * ratio, 76 * ratio);
          ctx.fillText(databus.recommendInfoList[i].gamename, 68 * ratio + (i * 115) * ratio, 350 * ratio);
        }else if(i >= 4 && i < 8){
          ctx.drawImage(databus.recommendInfoList[i].rilImg, 0, 0, databus.recommendInfoList[i].rilImg.width, databus.recommendInfoList[i].rilImg.height, 30 * ratio + ((i - 4) * 115) * ratio, 370 * ratio, 76 * ratio, 76 * ratio);
          ctx.fillText(databus.recommendInfoList[i].gamename, 68 * ratio + ((i - 4) * 115) * ratio, 470 * ratio);
        }else{
          ctx.drawImage(databus.recommendInfoList[i].rilImg, 0, 0, databus.recommendInfoList[i].rilImg.width, databus.recommendInfoList[i].rilImg.height, 30 * ratio + ((i - 8) * 115) * ratio, 487 * ratio, 76 * ratio, 76 * ratio);
          ctx.fillText(databus.recommendInfoList[i].gamename, 68 * ratio + ((i - 8) * 115) * ratio, 585 * ratio);
        }
      }
      
    }
    
  }
}
