let sharedCanvas = wx.getSharedCanvas();
let context = sharedCanvas.getContext('2d');
const mt = 255;

const screenWidth = wx.getSystemInfoSync().screenWidth;
const screenHeight = wx.getSystemInfoSync().screenHeight;
const ratio = wx.getSystemInfoSync().pixelRatio;

sharedCanvas.width = screenWidth * ratio;
sharedCanvas.height = screenHeight * ratio;

context.restore();
context.scale(ratio, ratio);
context.clearRect(0, 0, screenWidth * ratio, screenHeight * ratio);
// 按照 750的尺寸绘制
let scales = screenWidth / 750;
context.scale(scales, scales);
let nowpage = 1
let totlepage = 1
let myInfo = {};

let userArr =[]
let myScore = undefined;

let myRank = undefined;

initRanklist([], nowpage)
getUserInfo();


wx.onMessage(data => {
  if (data.type === 'friends') { 
    console.log("开始渲染firends页面")
    getFriendsRanking();
    getMyScore();
  } else if (data.type === 'group') {
    getGroupRanking(data.text);
    getMyScore();
  } else if (data.type === 'updateMaxScore') {
    // 更新最高分
    console.log('更新最高分');
    getMyScore();
  }
});

function drawnextbtn(){
  let shareProv = wx.createImage();
  shareProv.src = 'images/share_prev.png';
  console.log(screenHeight * ratio)
  shareProv.onload=function(){
    context.drawImage(shareProv, 60, 1180, 258, 130);
  }
  let shareNext = wx.createImage();
  shareNext.src = 'images/share_next.png';
  console.log(screenHeight * ratio)
  shareNext.onload = function () {
    context.drawImage(shareNext, 420, 1180, 258, 130);
  }
}

function initRanklist(list,page) {
  
  // 至少绘制6个
  list = list.slice(6 * (page - 1), 6 * (page))
  
  let length = 7
  let itemHeight = 917 / 7;
  var w = (750 - 40 * 2);
  var h = itemHeight * length;
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
  drawnextbtn();

  for (let i = 0; i < length; i++) {
    let threeImage = wx.createImage();
    threeImage.src = 'images/firstthree.png';
    let lessIamge = wx.createImage()
    lessIamge.src = "images/icon_three.png"
    let meIamge = wx.createImage()
    meIamge.src = "images/me.png"
    if(page == 1){
      if (i < 3) {
        threeImage.onload = function () {
          context.drawImage(threeImage, 40, i * itemHeight + mt, w, itemHeight);
        }
      }
      if (i >= 3 && i < 6) {
        lessIamge.onload = function () {
          context.drawImage(lessIamge, 40, i * itemHeight + mt, w, itemHeight);
        }

      }
    }else{
      lessIamge.onload = function () {
        context.drawImage(lessIamge, 40, i * itemHeight + mt, w, itemHeight);
      }
    }
    
    if (i == 6) {
      meIamge.onload = function() {
        context.drawImage(meIamge, 33, i * itemHeight + mt, w * 1.024, itemHeight);
        console.log("绿色渲染完了")
        drawrank(list,page)
      }
    }
  }
}
function drawrank(list,page){
  let length = 7
  let itemHeight = 917 / 7;
  var w = (750 - 40 * 2);
  var h = itemHeight * length;
  if (list && list.length > 0) {
    list.map((item, index) => {
      var avatarurl_width = 80;    //绘制的头像宽度
      var avatarurl_heigth = 80;   //绘制的头像高度
      var avatarurl_x = 140;   //绘制的头像在画布上的位置
      var avatarurl_y = index * itemHeight + 260;   //绘制的头像在画布上的位置
      let avatar = wx.createImage();
      avatar.src = item.avatarUrl;
      avatar.onload = function () {
        context.drawImage(avatar, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
      }
     

      context.fillStyle = '#fff';
      context.font = '28px Arial';
      context.textAlign = 'left';
      item.nickname = item.nickname.length > 5 ? item.nickname.substring(0, 6) + '..' : item.nickname
      context.fillText(item.nickname, 225, index * itemHeight + 310);

      context.font = '26px Arial';
      context.textAlign = 'left';
      if (!item.score || item.score == "undefined") {
        item.score = 0
      }
      
      context.fillText(`第${item.score}关` || `第0关`, 475, index * itemHeight + 310);

      context.font = '26px Arial';
      context.textAlign = 'right';
      if (!item.score || item.score == "undefined"){
        item.score = 0
      }
      context.fillText(`${item.score}分` || `0分`, 660, index * itemHeight + 310);
      if (index < 3 && page == 1){
        let firstImage = wx.createImage();
        firstImage.src = 'images/first.png';
        let secondIamge = wx.createImage()
        secondIamge.src = "images/second.png"
        let thirdIamge = wx.createImage()
        thirdIamge.src = "images/third.png"
        if(index == 0){
          firstImage.onload = function(){
            context.drawImage(firstImage, 46, index * itemHeight + 240, 100, 100)
          }    
        }
        if (index == 1) {
          secondIamge.onload = function () {
            context.drawImage(secondIamge, 66, index * itemHeight + 260, 80, 80)
          }
        }
        if (index == 2) {
          thirdIamge.onload = function (){
            context.drawImage(thirdIamge, 66, index * itemHeight + 260, 80, 80)
          }
        }
      }else{
        context.font = 'italic 34px Arial';
        context.textAlign = 'center';
        context.fillText(index + 1+((page-1)*6), 106, index * itemHeight + 310)
      }
      context.stroke()
     
    });

    drawMyRank();
  } else {
    // 没有数据
  }
}
function getFriendsRanking() {
  wx.getFriendCloudStorage({
    keyList: ['score', 'maxScore'],
    success: res => {
      let data = [...res.data, ...res.data,...res.data];
      nowpage = 1
      totlepage = parseInt(data.length/6)+1
      initRanklist(sortByScore(data), nowpage);
      console.log("nowpage:" + nowpage, "totlepage:" + totlepage)
    }
  });
}

function getMyScore() {
  wx.getUserCloudStorage({
    keyList: ['score', 'maxScore'],
    success: res => {
      let data = res;
      console.log(data);
      if(data.KVDataList.length){
        let lastScore = data.KVDataList[0].value || 0;
        if (!data.KVDataList[1]) {
          saveMaxScore(lastScore);
          myScore = lastScore;
        } else if (lastScore > data.KVDataList[1].value) {
          saveMaxScore(lastScore);
          myScore = lastScore;
        } else {
          myScore = data.KVDataList[1].value;
        }
      }
    }
  });
}

function saveMaxScore(maxScore) {
  wx.setUserCloudStorage({
    KVDataList: [{ 'key': 'maxScore', 'value': ('' + maxScore) }],
    success: res => {
      console.log(res);
    },
    fail: res => {
      console.log(res);
    }
  });
}

function sortByScore(data) {
  let array = [];
  data.map(item => {
    array.push({
      avatarUrl: item.avatarUrl,
      nickname: item.nickname,
      openid: item.openid,
      score: item['KVDataList'][1] && item['KVDataList'][1].value != 'undefined' ? item['KVDataList'][1].value : (item['KVDataList'][0] ? item['KVDataList'][0].value : 0) // 取最高分
      // checkpoint
    })

  })
  array.sort((a, b) => {
    return a['score'] < b['score'];
  });
  myRank = array.findIndex((item) => {
    return item.nickname === myInfo.nickName && item.avatarUrl === myInfo.avatarUrl;
  });
  if (myRank === -1)
    myRank = array.length;
  userArr = array
  return array;
}
function getUserInfo() {
  wx.getUserInfo({
    openIdList: ['selfOpenId'],
    lang: 'zh_CN',
    success: res => {
      myInfo = res.data[0];
    },
    fail: res => {

    }
  })
}
// 绘制自己的排名
function drawMyRank() {
  console.log("渲染完了自己的数据")
  if (myInfo.avatarUrl) {
    let avatar = wx.createImage();
    avatar.src = myInfo.avatarUrl;
    
    avatar.onload = function () {
      context.drawImage(avatar, 133, 960 + 74, 80, 80);
    }
    context.fillStyle = '#fff';
    context.font = '28px Arial';
    context.textAlign = 'left';
    context.fillText(myInfo.nickName, 255, 960 + 124);
    
    context.font = 'bold 26px Arial';
    context.textAlign = 'right';
    context.fillText(`第${myScore}关` || 0, 630, 960 + 124);
    // 自己的名次
    if (myRank !== undefined) {
      context.font = 'italic 44px Arial';
      context.textAlign = 'center';
      context.fillText(myRank + 1, 96, 960 + 124);
    }
    
  }
  
}
console.log("排行榜开始绑事件")
wx.onTouchStart(e => {
  let touch = e.touches[0];
  const prov = {
    x: 60,
    y: 1180,
    w: 258,
    h: 130
  }
  const next = {
    x: 420,
    y: 1180,
    w: 258,
    h: 130
  }
  if (touch.clientX / scales >= prov.x && touch.clientX / scales < prov.x + prov.w && touch.clientY / scales > prov.y && touch.clientY / scales < prov.y + prov.h) {
    console.log("上一页", nowpage)
    if (nowpage > 1) {
      console.log("渲染上一页")
      nowpage -= 1
      initRanklist(userArr, nowpage)
    }
  }
  if (touch.clientX / scales >= next.x && touch.clientX / scales < next.x + next.w && touch.clientY / scales > next.y && touch.clientY / scales < next.y + next.h) {
    console.log("下一页")
    if (nowpage < totlepage) {
      console.log("渲染下一页")
      nowpage += 1
      initRanklist(userArr, nowpage)
    }
  }
  // 触摸移动第一次触发的位置
});