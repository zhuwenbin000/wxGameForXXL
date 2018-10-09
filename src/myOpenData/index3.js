let sharedCanvas = wx.getSharedCanvas()
let context = sharedCanvas.getContext('2d')
sharedCanvas.width = 750
sharedCanvas.height = 1662
const PAGE_SIZE = 6;
const ITEM_HEIGHT = 40;
const ml = 50;
const mt = 100;
class RankList {
  constructor() {
    this.totalPage = 0;
    this.currPage = 0;
  }
  restart() { //保存分数入口
    wx.onMessage(data => {
      console.log(data)
      let kvdata = [{ key: "score", value: data.year + '' }]
      wx.setUserCloudStorage({
        KVDataList: kvdata,
        success: res => {
          console.log("保存分数成功了")
          rankList.getdata();
        }, fail: res => {
          console.log(res)
        }
      })
    })
  }
  getdata() { //获取数据渲染
    var me = this;
    console.log("数据渲染清除")
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height)
    const lineImg = wx.createImage();
    lineImg.src = 'images/friend.jpg';
    lineImg.onload = () => {
      context.drawImage(lineImg, 0, 0, sharedCanvas.width, sharedCanvas.height);
    };
    console.log("背景重新渲染")
    wx.getFriendCloudStorage({
      keyList: ["score"],
      success: res => {
        let data = res.data.sort(me.sortNumber)
        this.drawround()
        for (let i = 0, len = data.length; i < len; i++) {
          this.drawRankItem(context, i, i + 1, data[i], 10);
        }
      },
      fail: res => {
        console.log(res, 1233)
      }
    })
  }
  sortNumber(a, b) { //分数排序
    return parseInt(b.KVDataList[0].value) - parseInt(a.KVDataList[0].value)
  }
  drawround() {//绘制圆角矩形
    let t_height = ITEM_HEIGHT * 10 + 5
    let t_width = sharedCanvas.width - (ml * 2)
    var Point = function (x, y) {
      return { x: x, y: y };
    };
    var rect = Rect(ml, mt, t_width, t_height);
    drawRoundedRect(rect, 0, context);
    function Rect(x, y, w, h) {
      return { x: x, y: y, width: w, height: h };
    }
    function drawRoundedRect(rect, r, ctx) {
      ctx.strokeStyle = "#f00"
      var ptA = Point(rect.x + r, rect.y);
      var ptB = Point(rect.x + rect.width, rect.y);
      var ptC = Point(rect.x + rect.width, rect.y + rect.height);
      var ptD = Point(rect.x, rect.y + rect.height);
      var ptE = Point(rect.x, rect.y); ctx.beginPath();
    
      ctx.moveTo(ptA.x, ptA.y);
      ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);                  
      ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
      ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
      ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
      ctx.stroke();

    }
  }
  drawRankItem(ctx, index, rank, data, pageLen) {

    const avatarUrl = data.avatarUrl;
    const nick = data.nickname.length <= 8 ? data.nickname : data.nickname.substr(0, 8) + "...";
    console.log(data.KVDataList, '12121212')
    const grade = data.KVDataList[0].value;

    const itemGapY = ITEM_HEIGHT * index;
    //名次  (x轴左间距+20 y 轴+25+行间距)
    ctx.fillStyle = "#D8AD51";
    ctx.textAlign = "right";
    ctx.baseLine = "middle";
    ctx.font = "20px Helvetica";
    ctx.fillText(`${rank}`, ml + 20, mt + 25 + itemGapY);

    //头像
    const avatarImg = wx.createImage();
    avatarImg.src = avatarUrl;
    avatarImg.onload = () => {
      if (index + 1 > pageLen) {
        return;
      }
      ctx.drawImage(avatarImg, ml + 30, mt + 5 + itemGapY, 30, 30);
    };

    //名字
    ctx.fillStyle = "#777063";
    ctx.textAlign = "left";
    ctx.baseLine = "middle";
    ctx.font = "16px Helvetica";
    ctx.fillText(nick, ml + 70, mt + 25 + itemGapY);

    //分数
    ctx.fillStyle = "#777063";
    ctx.textAlign = "right";
    ctx.baseLine = "middle";
    ctx.font = "20px Helvetica";
    ctx.fillText(`${grade}分`, sharedCanvas.width - ml - 10, mt + 25 + itemGapY);

    //分隔线   
    context.moveTo(ml + 10, mt + ITEM_HEIGHT + itemGapY)
    context.strokeStyle = "#000"
    context.lineTo(sharedCanvas.width - ml - 10, mt + ITEM_HEIGHT + itemGapY)
    context.stroke()
  }
}

const rankList = new RankList();
rankList.getdata();
rankList.restart();