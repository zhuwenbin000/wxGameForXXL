let sharedCanvas = wx.getSharedCanvas();
let context = sharedCanvas.getContext('2d');
const mt = 255;
let avatar = wx.createImage();
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

let nowpage = 1 //当前页码，点击tab就翻回到第一页所以共用一个page
let module = 1;//1好友 2世界
let friendData = []
let worldData = []
let myInfo = {}; //用户的基本信息 

let userArr = []
let myScore = undefined;
let myRank = undefined;


initRanklist([], nowpage)
getUserInfo();

wx.onMessage(data => {
  if (data.type === 'friends') {
    nowpage = 1; //点击好友就把页码置换为1
    module = 1;
    getFriendsRanking();
    getMyScore();
  } else if (data.type === 'world') {
    nowpage = 1; //点击世界就把页码置换为1
    module = 2;
    data.text.map(item => { //处理世界数据  保持和好友一样
      item.avatarUrl = item.logopath
      item.KVDataList = [{
        key: "score",
        value: item.score
      }]
    })
    worldData = sortByScore(2, data.text)
    initRanklist(worldData, nowpage)
  } else if (data.type === 'group') {
    getGroupRanking(data.text);
    getMyScore();
  } else if (data.type === 'updateMaxScore') {
    // 更新最高分
    updateMaxScore(data)
  } else if (data.type === 'nextfriend') {
    initRanklist(friendData, nowpage + 1, 'add');
  } else if (data.type === 'provfriend') {
    initRanklist(friendData, nowpage - 1, 'reduce');
  } else if (data.type === 'nextworld') {
    initRanklist(worldData, nowpage + 1, 'add');
  } else if (data.type === 'provworld') {
    initRanklist(worldData, nowpage - 1, 'reduce');
  }
});



function initRanklist(list, page, type) {

  // 至少绘制6个
  list = list.slice(6 * (page - 1), 6 * (page))

  if (type == 'add' && list.length > 0) { //如果是正向翻页且有数据
    nowpage++
  } else if (type == 'reduce' && list.length > 0 && nowpage > 0) {
    nowpage--
  }
  if (list.length > 0) { //有数据才渲染
    let length = 7
    let itemHeight = 917 / 7;
    var w = (750 - 40 * 2);
    var h = itemHeight * length;
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);

    for (let i = 0; i < length; i++) {
      let threeImage = wx.createImage();
      threeImage.src = 'images/rank/firstthree.png';
      let lessIamge = wx.createImage()
      lessIamge.src = "images/rank/icon_three.png"
      let meIamge = wx.createImage()
      meIamge.src = "images/rank/me.png"
      if (page == 1) {
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
      } else {
        lessIamge.onload = function () {
          context.drawImage(lessIamge, 40, i * itemHeight + mt, w, itemHeight);
        }
      }
      if (i == 6) {
        meIamge.onload = function () {
          context.drawImage(meIamge, 33, i * itemHeight + mt, w * 1.024, itemHeight);
          drawrank(list, page)
        }
      }
    }
  }
}
function drawrank(list, page) {
  if (list && list.length > 0) {
    let allNum = 0;
    let avatarList = []
    list.map((item, index) => {
      avatarList[index] = wx.createImage();
      avatarList[index].src = item.avatarUrl;
      avatarList[index].onload = function () {
        allNum++
        if (allNum == list.length) {
          drawList(avatarList, list, page)
        }
      }
    });
  } else {
    // 没有数据
  }
}

function drawList(avatarList, list, page) {
  let length = 7
  let itemHeight = 917 / 7;
  var w = (750 - 40 * 2);
  var h = itemHeight * length;
  var avatarurl_width = 80;    //绘制的头像宽度
  var avatarurl_heigth = 80;   //绘制的头像高度
  var avatarurl_x = 148;   //绘制的头像在画布上的位置

  list.map((item, index) => {
    var avatarurl_y = index * itemHeight + 275;   //绘制的头像在画布上的位置
    context.drawImage(avatarList[index], avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
    context.fillStyle = '#fff';
    context.font = '28px Arial';
    context.textAlign = 'left';
    item.nickname = item.nickname.length > 5 ? item.nickname.substring(0, 6) + '..' : item.nickname
    context.fillText(item.nickname, 235, index * itemHeight + 325);
    context.font = '26px Arial';
    context.textAlign = 'right';
    if (!item.score || item.score == "undefined") {
      item.score = 0
    }
    context.fillText(`${item.score}分` || `0分`, 660, index * itemHeight + 325);
    if (index < 3 && page == 1) {
      let firstImage = wx.createImage();
      firstImage.src = 'images/rank/first.png';
      let secondIamge = wx.createImage()
      secondIamge.src = "images/rank/second.png"
      let thirdIamge = wx.createImage()
      thirdIamge.src = "images/rank/third.png"
      if (index == 0) {
        firstImage.onload = function () {
          context.drawImage(firstImage, 46, index * itemHeight + 260, 100, 100)
        }
      }
      if (index == 1) {
        secondIamge.onload = function () {
          context.drawImage(secondIamge, 66, index * itemHeight + 280, 80, 80)
        }
      }
      if (index == 2) {
        thirdIamge.onload = function () {
          context.drawImage(thirdIamge, 66, index * itemHeight + 280, 80, 80)
        }
      }
    } else {
      context.font = 'italic 34px Arial';
      context.textAlign = 'center';
      context.fillText(index + 1 + ((page - 1) * 6), 100, index * itemHeight + 330)
    }
   
    context.stroke()
  })
  drawMyRank();
}

function getFriendsRanking() {
  wx.getFriendCloudStorage({
    keyList: ['score'],
    success: res => {
      let data = [...res.data];
      nowpage = 1
      friendData = sortByScore(1, data)
      initRanklist(friendData, nowpage);
    }
  });
}

function getMyScore() {
  wx.getUserCloudStorage({
    keyList: ['score'],
    success: res => {
      let data = res;
      if (data.KVDataList.length) {
        let lastScore = data.KVDataList[0].value || 0;
        if (!data.KVDataList[1]) {
          // saveMaxScore(lastScore);
          myScore = lastScore;
        } else if (lastScore > data.KVDataList[1].value) {
          //  saveMaxScore(lastScore);
          myScore = lastScore;
        } else {
          myScore = data.KVDataList[1].value;
        }
      }
    }
  });
}

function updateMaxScore(score) {

  wx.getUserCloudStorage({
    keyList: ['score'],
    success: res => {
      let maxScore = res.KVDataList.length > 0 ? JSON.parse(res.KVDataList[0].value).wxgame.score.text : 0;
      if (maxScore - 0 < score.text - 0) {
        let KVData = JSON.stringify({
          "wxgame": {
            "score": score,
            "update_time": new Date().getTime()
          }
        })

        wx.setUserCloudStorage({
          KVDataList: [{
            key: 'score',
            value: KVData
          }],
          success: res => {

          }
        });
      }
    }
  });
}


function sortByScore(type, data) {
  let array = [];
  data.map(item => {
    if (item.nickname && item.avatarUrl) { //过滤世界传过来的没头像昵称的数据
      var score = 0;

      if (module == 1) {
        score = item['KVDataList'][0] ? JSON.parse(item['KVDataList'][0].value).wxgame.score.text : 0
      } else {
        score = item['KVDataList'][1] && item['KVDataList'][1].value != 'undefined' ? item['KVDataList'][1].value : (item['KVDataList'][0] ? item['KVDataList'][0].value : 0)
      }
      score = parseInt(score) //字符串类型转数字
      array.push({
        avatarUrl: item.avatarUrl,
        nickname: decodeURIComponent(item.nickname),
        openid: item.openid,
        score: score // 取最高分
        // checkpoint
      })
    }
  })
  if (type == 1) {
    array = bubbleSort(array)
  }
  
  myRank = array.findIndex((item) => {  
    return item.nickname == myInfo.nickName && item.avatarUrl == myInfo.avatarUrl;
  });
  if (myRank == -1)
  myRank = '-';
  userArr = array
  return array;
}
function bubbleSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j]['score'] < arr[j + 1]['score']) {
        var tmp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = tmp
      }
    }
  }
  return arr
}
function getUserInfo() {
  wx.getUserInfo({
    openIdList: ['selfOpenId'],
    lang: 'zh_CN',
    success: res => {
      myInfo = res.data[0];
      avatar.src = myInfo.avatarUrl;
    },
    fail: res => {

    }
  })
}
// 绘制自己的排名
function drawMyRank() {
  var text = myScore ? JSON.parse(myScore).wxgame.score.text : '0'
  if (myInfo.avatarUrl) {
    context.drawImage(avatar, 133, 1065, 80, 80);
    context.fillStyle = '#fff';
    context.font = '28px Arial';
    context.textAlign = 'left';
    context.fillText(myInfo.nickName, 255, 1120);

    context.font = 'bold 26px Arial';
    context.textAlign = 'right';
    
    context.fillText(`${text}分` || 0, 630, 1120);
    // 自己的名次
    if (myRank != undefined) {

      context.font = 'italic 44px Arial';
      context.textAlign = 'center';
      if (text != '0') {
        context.fillText(myRank + 1, 86, 1120);
      } else {
        context.fillText('-', 86, 1120);
      }
    }
  }
}
