let sharedCanvas = wx.getSharedCanvas();
let context = sharedCanvas.getContext('2d');

const screenWidth = wx.getSystemInfoSync().screenWidth;
const screenHeight = wx.getSystemInfoSync().screenHeight;
const ratio = wx.getSystemInfoSync().pixelRatio;

 sharedCanvas.width = screenWidth * ratio;
 sharedCanvas.height = screenHeight * ratio;
let itemCanvas = wx.createCanvas();
let ctx = itemCanvas.getContext('2d');

let myScore = undefined;
let myInfo = {};
let myRank = undefined;
initEle();
getUserInfo();

// 初始化标题返回按钮等元素
function initEle() {
  context.restore();
  context.scale(ratio, ratio);
  context.clearRect(0, 0, screenWidth * ratio, screenHeight * ratio);


  // 按照 750的尺寸绘制
  let scales = screenWidth / 750;
  context.scale(scales, scales);

  // 画背景
  // context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  // context.fillRect(0, 0, screenWidth * ratio, screenHeight * ratio);
  const lineImg = wx.createImage();
  lineImg.src = 'images/ph_bg.jpg';
  lineImg.onload = () => {
    context.drawImage(lineImg, 0, 0, screenWidth * ratio, screenHeight * ratio);
  };
  //画返回按钮

  const backImg = wx.createImage();
  backImg.src = 'images/ph_back.png';
  backImg.onload = () => {
    context.drawImage(backImg, 20, 28, 54, 54);
  };

  //画标题
  
  const titleImg = wx.createImage();
  titleImg.src = 'images/ph_title.png';
  titleImg.onload = () => {
    context.drawImage(titleImg,210 , 98, 332, 61);
  };
  
  //画奖杯
  const picImg = wx.createImage();
  picImg.src = 'images/ph_jb.png';
  picImg.onload = () => {
    
    context.drawImage(picImg, 530, 20, 188, 173);
  };
  // 自己的背景
  const ownbg = wx.createImage();
  ownbg.src = 'images/ph_selfown.png';
  ownbg.onload = () => {
    context.drawImage(ownbg, 20, 213, 710, 146);
  };
  // 画标题
  context.fillStyle = '#fff';
  context.font = '50px Arial';
  context.textAlign = 'center';
  context.fillText('好友排行榜', 750 / 2, 220);

  // 排名列表外框
  context.fillStyle = '#302F30';
  context.fillRect(80, 290, 750 - 80 * 2, 650);

  // 排行榜提示
  context.fillStyle = '#8D8D8D';
  context.font = '20px Arial';
  context.textAlign = 'left';
  context.fillText('每周一凌晨刷新', 100, 330);

  // 自己排名外框
  context.fillStyle = '#302F30';
  context.fillRect(80, 960, 750 - 80 * 2, 120);

  // 返回按钮
  // let returnImage = wx.createImage();
  // returnImage.src = 'images/icon1.png';
  // returnImage.onload = () => {
  //   context.drawImage(returnImage, 80, 1120, 100, 100);
  // };
}

function initRanklist(list) {
  // 至少绘制7个
  let length = Math.max(list.length, 7);
  let itemHeight = 882 / 7;

  // itemCanvas.width = screenWidth - 40 * 2;
  // itemCanvas.height = itemHeight * length;
  itemCanvas.width = (750 - 40 * 2);
  itemCanvas.height = itemHeight * length;

  ctx.clearRect(0, 0, itemCanvas.width, itemCanvas.height);

  for (let i = 0; i < length; i++) {
    ctx.fillStyle = '#7254e8';
    console.log(itemCanvas.width);
    ctx.fillRect(0, i * itemHeight, itemCanvas.width, itemHeight);
  }

  if (list && list.length > 0) {
    list.map((item, index) => {
      var avatarurl_width = 80;    //绘制的头像宽度
      var avatarurl_heigth = 80;   //绘制的头像高度
      var avatarurl_x = 100;   //绘制的头像在画布上的位置
      var avatarurl_y = index * itemHeight + 14;   //绘制的头像在画布上的位置
      let avatar = wx.createImage();
      avatar.src = item.avatarUrl;
      avatar.onload = function () {
        ctx.drawImage(avatar, 100, index * itemHeight + 14, 100, 80);
        reDrawItem(0);
      }
      avatar.onload = function () {
        ctx.save();
        ctx.beginPath()
        ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);

        ctx.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因

        ctx.drawImage(avatar, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
        //将图片绘制进圆
        ctx.restore()
        reDrawItem(0)
      }


      ctx.fillStyle = '#fff';
      ctx.font = '28px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(item.nickname, 195, index * itemHeight + 50);

      ctx.font = '26px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`第${item.score}关` || `第0关`, 195, index * itemHeight + 90);

      ctx.font = '26px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`${item.score}分` || `0分`, 600, index * itemHeight + 90);

      ctx.font = 'italic 34px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(index + 1, 46, index * itemHeight + 64)

      if (index != list.length-1){
        ctx.moveTo(10, index * itemHeight + 120)
        ctx.strokeStyle = "#fff"
        ctx.lineTo(660, index * itemHeight + 120)
      }
     
      ctx.stroke()
    });
  } else {
    // 没有数据
  }

  reDrawItem(0);
}

// 绘制自己的排名
function drawMyRank() {
  if (myInfo.avatarUrl && myScore) {
    var avatarurl_width = 100;    //绘制的头像宽度
    var avatarurl_heigth = 100;   //绘制的头像高度
    var avatarurl_x = 180;   //绘制的头像在画布上的位置
    var avatarurl_y = 225;   //绘制的头像在画布上的位置
    
    let avatar = wx.createImage();
    avatar.src = myInfo.avatarUrl;
    // avatar.onload = function () {
    //   context.drawImage(avatar, 180, 225, 70, 70);
    // }
     avatar.onload = function () {
       context.save();
       context.beginPath()
       context.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);

       context.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因

       context.drawImage(avatar, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); 
       //将图片绘制进圆
       context.restore()
     }
   
   
    context.fillStyle = '#fff';
    context.font = '33px Arial';
    context.textAlign = 'left';
    context.fillText(myInfo.nickName, 290, 265);

    context.font = '28px Arial';
    context.textAlign = 'left';
    context.fillText(`第${myScore}关` || 0, 290, 315);

    context.font = '28px Arial';
    context.textAlign = 'left';
    context.fillText(`${myScore}分` || 0, 570, 315);

    // 自己的名次
    if (myRank !== undefined) {
      context.font = 'italic 44px Arial';
      context.textAlign = 'center';
      context.fillText(myRank + 1, 126, 288);
    }
  }
  // context.fillRect(40, 480, screenWidth - 40 * 2, 60);
}
// 因为头像绘制异步的问题，需要重新绘制
function reDrawItem(y) {
  context.clearRect(40, 350, 750 - 40 * 2, 882);
  context.fillStyle = '#302F30';
  context.fillRect(40, 350, 750 - 40 * 2, 882);
  context.drawImage(itemCanvas, 0, y, 750 - 40 * 2, 882, 40, 350, 750 - 40 * 2, 882);
}
function sortByScore(data) {
  let array = [];
  debugger
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

  return array;
}
// 开放域的getUserInfo 不能获取到openId, 可以在主域获取，并从主域传送
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

// 获取自己的分数
function getMyScore() {
  wx.getUserCloudStorage({
    keyList: ['score', 'maxScore'],
    success: res => {
      let data = res;
      console.log(data);
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

function getFriendsRanking() {
  wx.getFriendCloudStorage({
    keyList: ['score', 'maxScore', 'checkpoint','maxcheckpoint'],
    success: res => {
      let data = [...res.data, ...res.data, ...res.data, ...res.data, ...res.data, ...res.data];     
      initRanklist(sortByScore(data));
      drawMyRank();
    }
  });
}

function getGroupRanking(ticket) {
  wx.getGroupCloudStorage({
    shareTicket: ticket,
    keyList: ['score', 'maxScore'],
    success: res => {
      console.log('getGroupCloudStorage:success');
      console.log(res.data);
      let data = res.data;
      initRanklist(sortByScore(data));
      drawMyRank();
    },
    fail: res => {
      console.log('getGroupCloudStorage:fail');
      console.log(res.data);
    }
  });
}
// getGroupRanking();
wx.onMessage(data => {
  if (data.type === 'friends') {
    // sharedCanvas.height = screenHeight;
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

let startY = undefined, moveY = 0;
// 触摸移动事件
wx.onTouchMove(e => {
  let touch = e.touches[0];
  // 触摸移动第一次触发的位置
  if (startY === undefined) {
    startY = touch.clientY + moveY;
  }
  moveY = startY - touch.clientY;
  reDrawItem(moveY);
});
wx.onTouchEnd(e => {
  startY = undefined;
  if (moveY < 0) { // 到顶
    moveY = 0;
  } else if (moveY > itemCanvas.height - 882) { // 到底
    moveY = itemCanvas.height - 882;
  }
  reDrawItem(moveY);
});