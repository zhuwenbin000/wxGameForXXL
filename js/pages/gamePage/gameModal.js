import { ajax } from '../../base/ajax'
import DataBus from '../../databus'
let databus = new DataBus()
let uiWidth = 828;
let ratio = canvas.width / uiWidth //设计稿宽度

let R = {
  "gameEndBg": "images/gameEnd/gameEndBg.png",
  "addSteps": "images/gameModal/add_steps.png",
  "colorTool": "images/gameModal/color_tool.png",
  "modalBg": "images/gameModal/modal_bg.png",
  "modalClose": "images/gameModal/modal_close.png",
  "modalSubmit": "images/gameModal/modal_submit.png",
  "musicBgFalse": "images/gameModal/music_bg_false.png",
  "musicBgTrue": "images/gameModal/music_bg_true.png",
  "musicSoundFalse": "images/gameModal/music_sound_false.png",
  "musicSoundTrue": "images/gameModal/music_sound_true.png",
  "passState": "images/gamePage/passState.png",
  "ruleBg": "images/gameModal/rule_bg.png",
  "rule": "images/gameModal/rule.png",
  "iknow": "images/gameModal/iknow.png",
  "passStateBg": "images/gamePage/passStateBg.png",
}

//把所有的图片放到一个对象中
let Robj = {};	//两个对象有相同的k
// 遍历R对象，把真实image对象，放入this.Robj中
for (var k in R) {
  Robj[k] = wx.createImage();
  Robj[k].src = R[k];
}

export default class GameModal {
  render(ctx) {
    this.ctx = ctx;
    //3:音乐弹框
    if (databus.gameState == 3) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 240 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 220 * ratio, 150 * ratio, 162 * ratio);
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, (250 - 17) * ratio, (1080 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1080 * ratio, 340 * ratio, 168 * ratio);
      }
      if (!databus.musicBgState){
        //背景音乐-关
        ctx.drawImage(Robj["musicBgFalse"], 0, 0, Robj["musicBgFalse"].width, Robj["musicBgFalse"].height, 190 * ratio, 545 * ratio, 238 * ratio, 120 * ratio);
      }else{
        //背景音乐-开
        ctx.drawImage(Robj["musicBgTrue"], 0, 0, Robj["musicBgTrue"].width, Robj["musicBgTrue"].height, 190 * ratio, 545 * ratio, 238 * ratio, 120 * ratio);
      }
      if (!databus.musicSoundState) {
        //游戏音效-关
        ctx.drawImage(Robj["musicSoundFalse"], 0, 0, Robj["musicSoundFalse"].width, Robj["musicSoundFalse"].height, 190 * ratio, 770 * ratio, 238 * ratio, 120 * ratio);
      } else {
        //游戏音效-开
        ctx.drawImage(Robj["musicSoundTrue"], 0, 0, Robj["musicSoundTrue"].width, Robj["musicSoundTrue"].height, 190 * ratio, 770 * ratio, 238 * ratio, 120 * ratio);
      }

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('声音', (uiWidth / 2) * ratio, 415 * ratio); 
      ctx.textAlign = 'left';
      ctx.fillText('背景音乐', 485 * ratio, 620 * ratio); 
      ctx.fillText('游戏音效', 485 * ratio, 850 * ratio); 
    }
    //4:彩色道具弹框
    if (databus.gameState == 4) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 240 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 220 * ratio, 150 * ratio, 162 * ratio);
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, (250 - 17) * ratio, (1080 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1080 * ratio, 340 * ratio, 168 * ratio);
      }
      //金脚丫
      ctx.drawImage(Robj["colorTool"], 0, 0, Robj["colorTool"].width, Robj["colorTool"].height, 250 * ratio, 435 * ratio, 346 * ratio, 356 * ratio);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('道具购买', (uiWidth / 2) * ratio, 415 * ratio);
      ctx.textAlign = 'left';
      ctx.font = 40 * ratio + 'px Arial';
      ctx.fillText('效果：消除棋盘内指定同色水果', 155 * ratio, 865 * ratio);
      ctx.fillText('价格：' + databus.hammerprice + '金币', 155 * ratio, 955 * ratio); 
    }
    //5:增加步数弹框
    if (databus.gameState == 5) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 240 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 220 * ratio, 150 * ratio, 162 * ratio);
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, (250 - 17) * ratio, (1080 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1080 * ratio, 340 * ratio, 168 * ratio);
      }
      //金脚丫
      ctx.drawImage(Robj["addSteps"], 0, 0, Robj["addSteps"].width, Robj["addSteps"].height, 250 * ratio, 435 * ratio, 346 * ratio, 356 * ratio);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('道具购买', (uiWidth / 2) * ratio, 415 * ratio);
      ctx.textAlign = 'left';
      ctx.font = 40 * ratio + 'px Arial';
      ctx.fillText('效果：游戏步数增加3步', 155 * ratio, 865 * ratio);
      ctx.fillText('价格：' + databus.stepprice + '金币', 155 * ratio, 955 * ratio); 
    }


    //6:首页弹框
    if (databus.gameState == 6) {
      //绘制背景
      ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 240 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 220 * ratio, 150 * ratio, 162 * ratio);
      //弹框确认
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, (250 - 17) * ratio, (1080 - 8.4) * ratio, 340 * 1.1 * ratio, 168 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1080 * ratio, 340 * ratio, 168 * ratio);
      }

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('回首页将丢失本关得分，', (uiWidth / 2) * ratio, 700 * ratio);
      ctx.fillText('是否确认返回？', (uiWidth / 2) * ratio, 800 * ratio);
      
    }
    //7:过关
    if (databus.gameState == 7) {
      const endTime = 120;
      const rotateTime = 120;
      const aniTime = 10;
      // const endTime = 180;
      if (databus.passStateTime > endTime){
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
      ctx.drawImage(Robj["rule"], 0, 0, Robj["rule"].width, Robj["rule"].height, (824 - 768) / 2 * ratio, 200 * ratio, 768 * ratio, 1308 * ratio);
      if (databus.btnPlus > 0 && databus.btnPlus < 10) {
        databus.btnPlus++
        //弹框确认
        ctx.drawImage(Robj["iknow"], 0, 0, Robj["iknow"].width, Robj["iknow"].height, (250 - 15.6) * ratio, (1335 - 7.2) * ratio, 312 * 1.1 * ratio, 142 * 1.1 * ratio);
      } else {
        databus.btnPlus = 0
        //弹框确认
        ctx.drawImage(Robj["iknow"], 0, 0, Robj["iknow"].width, Robj["iknow"].height, 250 * ratio, 1335 * ratio, 312 * ratio, 142 * ratio);
      }
    }
  }
}
