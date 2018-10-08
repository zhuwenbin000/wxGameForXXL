let sharedCanvas = wx.getSharedCanvas() 
let context = sharedCanvas.getContext('2d')
const lineImg = wx.createImage();
const PAGE_SIZE = 6;
const ITEM_HEIGHT = 125;
lineImg.src = 'images/friend.jpg';
lineImg.onload = () => {
  context.drawImage(lineImg, 0, 0, sharedCanvas.width, sharedCanvas.height);
};
class RankList{
  constructor() {
    this.totalPage = 0;
    this.currPage = 0;
 
  }
  restart(){
    wx.onMessage(data => {
      console.log(data)
      let kvdata = [{ key: "score", value: "12" }]
      wx.setUserCloudStorage({
        KVDataList: kvdata,
        success: res => {
         
        }, fail: res => {
          console.log(res)
        }
      })
    })
  }
  getdata(){   
    wx.getFriendCloudStorage({
      keyList: ["score"],
      success: res => {
        let data = res.data
        console.log(data,123)
        for (let i = 0, len = data.length; i < len; i++) {
          this.drawRankItem(context, i, 1, data[i], 10);
        }
      },
      fail:res=>{
        console.log(res,1233)
      }
    })
  }
  drawRankItem(ctx, index, rank, data, pageLen) {
    
    const avatarUrl = data.avatarUrl;
    const nick = data.nickname.length <= 10 ? data.nickname : data.nickname.substr(0, 10) + "...";
   
    const grade = 0;
    const itemGapY = ITEM_HEIGHT * index;
    //名次
    ctx.fillStyle = "#D8AD51";
    ctx.textAlign = "right";
    ctx.baseLine = "middle";
    ctx.font = "70px Helvetica";
    ctx.fillText(`${rank}`, 90, 80 + itemGapY);

    //头像
    const avatarImg = wx.createImage();
    avatarImg.src = avatarUrl;
    avatarImg.onload = () => {
      if (index + 1 > pageLen) {
        return;
      }
      ctx.drawImage(avatarImg, 50, 100 + itemGapY, 30, 30);
    };

    //名字
    ctx.fillStyle = "#777063";
    ctx.textAlign = "left";
    ctx.baseLine = "middle";
    ctx.font = "20px Helvetica";
    ctx.fillText(nick, 235, 80 + itemGapY);

    //分数
    ctx.fillStyle = "#777063";
    ctx.textAlign = "left";
    ctx.baseLine = "middle";
    ctx.font = "30px Helvetica";
    ctx.fillText(`${grade}分`, 620, 80 + itemGapY);

    //分隔线
    const lineImg = wx.createImage();
    lineImg.src = 'images/bullet.png';
    lineImg.onload = () => {
      
      ctx.drawImage(lineImg, 14, 120 + itemGapY, 720, 1);
    };
  }
}


 
const rankList = new RankList();
rankList.getdata();