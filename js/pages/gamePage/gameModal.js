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
  "ruleBg": "images/gameModal/rule_bg.png"
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
    //绘制背景
    ctx.drawImage(Robj["gameEndBg"], 0, 0, canvas.width, canvas.height);
    //3:音乐弹框
    if (databus.gameState == 3){
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 240 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 220 * ratio, 150 * ratio, 162 * ratio);
      //弹框确认
      ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1080 * ratio, 340 * ratio, 168 * ratio);
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
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 240 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 220 * ratio, 150 * ratio, 162 * ratio);
      //弹框确认
      ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1080 * ratio, 340 * ratio, 168 * ratio);
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
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 240 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 220 * ratio, 150 * ratio, 162 * ratio);
      //弹框确认
      ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1080 * ratio, 340 * ratio, 168 * ratio);
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
      //弹框背景
      ctx.drawImage(Robj["modalBg"], 0, 0, Robj["modalBg"].width, Robj["modalBg"].height, 2 * ratio, 240 * ratio, 824 * ratio, 1072 * ratio);
      //弹框关闭
      ctx.drawImage(Robj["modalClose"], 0, 0, Robj["modalClose"].width, Robj["modalClose"].height, 0 * ratio, 220 * ratio, 150 * ratio, 162 * ratio);
      //弹框确认
      ctx.drawImage(Robj["modalSubmit"], 0, 0, Robj["modalSubmit"].width, Robj["modalSubmit"].height, 250 * ratio, 1080 * ratio, 340 * ratio, 168 * ratio);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 50 * ratio + 'px Arial';
      ctx.fillText('确定返回首页吗', (uiWidth / 2) * ratio, 600 * ratio);
    }
  }
}
