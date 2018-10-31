import DataBus from '../databus'
let databus = new DataBus()
let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    //首页音乐
    this.indexBgmAudio = new Audio()
    this.indexBgmAudio.loop = true
    this.indexBgmAudio.src = 'audio/indexBgm.mp3'

    //游戏音乐
    this.gameBgmAudio = new Audio()
    this.gameBgmAudio.loop = true
    this.gameBgmAudio.src = 'audio/gameBgm.mp3'

    //音效类
    this.M = {
      "piecesDown1": "audio/piecesDown/piecesDown1.mp3",//棋子按下1
      "piecesDown2": "audio/piecesDown/piecesDown2.mp3",//棋子按下2
      "piecesDown3": "audio/piecesDown/piecesDown3.mp3",//棋子按下3
      "piecesDown4": "audio/piecesDown/piecesDown4.mp3",//棋子按下4
      "piecesDown5": "audio/piecesDown/piecesDown5.mp3",//棋子按下5
      "piecesDown6": "audio/piecesDown/piecesDown6.mp3",//棋子按下6
      "piecesDown7": "audio/piecesDown/piecesDown7.mp3",//棋子按下7
      "piecesDown8": "audio/piecesDown/piecesDown8.mp3",//棋子按下8
      "piecesDown9": "audio/piecesDown/piecesDown9.mp3",//棋子按下9
      "piecesDown10": "audio/piecesDown/piecesDown10.mp3",//棋子按下10
      "passPoint": "audio/passPoint.mp3",//过关
      "getScore": "audio/getScore.mp3",//得分
      "getCoin": "audio/getCoin.mp3",//得金币
      "doubleHit": "audio/doubleHit.mp3",//连击
      "combo": "audio/combo.mp3",//combo
      "btnDown": "audio/btnDown.mp3",//按钮按下
    }
    //把所有的音乐放到一个对象中
    this.Mobj = {};	//两个对象有相同的k
    // 遍历R对象，把真实音乐对象，放入this.Mobj中
    for (var k in this.M) {
      this.Mobj[k] = new Audio();
      this.Mobj[k].src = this.M[k];
    }

  }

  playIndexBgm() {
    if (!databus.musicBg) return
    this.gameBgmAudio.pause()
    this.indexBgmAudio.play()
  }

  playGameBgm() {
    if (!databus.musicBg) return
    this.indexBgmAudio.pause()
    this.gameBgmAudio.play()
  }

  pauseMusicBgm() {
    this.gameBgmAudio.pause()
  }
  
  playMusic(musicName) {
    if (!databus.musicSound) return
    this.Mobj[musicName].currentTime = 0
    this.Mobj[musicName].play()
  }

}
