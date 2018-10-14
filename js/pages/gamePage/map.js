import Block from './block'
import DataBus from '../../databus'

let databus = new DataBus()

//棋盘的宽数和列数
let rn = databus.rowNum
let cn = databus.colNum

/**
 * 游戏页
 */
export default class Map {
  constructor(ctx) {
    //二维矩阵
    this.QRcode = [];
    //存放真实block元素的矩阵
    this.blocks = [];
    //临时用一下的小矩阵
    //所有需要爆炸的元素的标记
    this.needToBomb = [];
    //下落行数阵
    this.downRow = [];

    //根据行列数生成二维矩阵
    for (var r = 0; r < rn; r++) {
      this.QRcode[r] = []
      this.blocks[r] = []
      this.needToBomb[r] = []
      this.downRow[r] = []
      for (var c = 0; c < cn; c++) {
        // this.QRcode[r][c] = _.random(0, databus.piecesType - 1)

        this.QRcode[r][c] = {
          piecesType: _.random(0, databus.piecesType - 1),
          piecesLevel: databus.getPiecesLevel()
        }
      }
    }

    this.createBlocksByQR();

  }

  createBlocksByQR() {
    //根据QRcode，把blocks里面填值
    for (var r = 0; r < rn; r++) {
      for (var c = 0; c < cn; c++) {
        this.blocks[r][c] = new Block(r, c, this.QRcode[r][c]);
      }
    }
  }

    /**
   * 渲染
   */
  render(ctx, Robj) {
    //渲染地图就是渲染自己的所有转块
    for (var r = 0; r < rn; r++) {
      for (var c = 0; c < cn; c++) {
        //更新所有转块
        this.blocks[r][c].update();
        //渲染所有转块
        this.blocks[r][c].render(ctx, Robj);
        // //打印地图矩阵
        // ctx.fillText(this.QRcode[r][c], c * 10, 60 + r * 10);
        // //打印自己needToBomb阵
        // if (this.needToBomb[r][c]) {
        //   ctx.fillText(this.needToBomb[r][c], 100 + c * 10, 60 + r * 10);
        // }
        // //打印自己的downRow阵
        // if (this.downRow[r][c]) {
        //   ctx.fillText(this.downRow[r][c], 200 + c * 10, 60 + r * 10);
        // }
      }
    }
  }

  //检测是否爆炸
  check () {
    var result = false;
    //按行、列，分别遍历一遍。
    // for (var r = 0; r < rn; r++) {
    //   var i = 0;
    //   var j = 1;

    //   while (i < rn) {
    //     if (this.QRcode[r][i] == this.QRcode[r][j]) {
    //       j++;
    //     } else {
    //       //把i和j之前的位，推入结果数组
    //       if (j - i >= 3) {
    //         for (var m = i; m < j; m++) {
    //           //命令该爆炸的矩阵，这一位是X
    //           this.needToBomb[r][m] = "X";
    //           //爆了
    //           this.blocks[r][m].bomb();
    //           result = true;
    //         }
    //       }
    //       i = j;
    //       j++;
    //     }
    //   }
    // }

    //按行、列，分别遍历一遍。
    for (var c = 0; c < cn; c++) {
      var i = 0;
      var j = 1;

      while (i < cn) {
        if (j < cn && this.QRcode[i][c].piecesType == this.QRcode[j][c].piecesType) {
          j++;
        } else {
          //把i和j之前的位，推入结果数组
          if (j - i >= 3) {
            for (var m = i; m < j; m++) {
              //命令该爆炸的矩阵，这一位是X
              this.needToBomb[m][c] = "X";
              //爆了
              this.blocks[m][c].bomb();
              result = true;
            }
          }
          i = j;
          j++;
        }
      }
    }

    return result;
  }

  //炸了
  blocksBomb (sb) {
    if (sb.length <= 0) return
    for (var i = 0; i < sb.length; i++) {
      this.needToBomb[sb[i].row][sb[i].col] = "X";
      this.blocks[sb[i].row][sb[i].col].bomb();
    }
  }

  //规整
  dropDown () {
    //现在要现提出一个矩阵，这个矩阵表示每一个元素要下落多少行
    for (var r = 0; r < rn - 1; r++) {
      for (var c = 0; c < cn; c++) {
        if (this.needToBomb[r][c] != "X") {
          var sum = 0;
          for (var m = r + 1; m < rn; m++) {
            if (this.needToBomb[m][c] == "X") {
              sum++;
            }
          }

          //矩阵上维持这个增量
          this.downRow[r][c] = sum;

          //命令这个元素下落
          this.blocks[r][c].moveTo(r + sum, c, 4);
        }
      }
    }

    //整理出新的QR矩阵，清空整个QR矩阵
    for (var r = 0; r < rn; r++) {
      for (var c = 0; c < cn; c++) {
        this.QRcode[r][c] = '*';
      }
    }
    //从block阵反推QR阵
    for (var r = 0; r < rn; r++) {
      for (var c = 0; c < cn; c++) {
        var theblock = this.blocks[r][c];
        //如果隐藏了
        if (!this.blocks[r][c].hide) {
          this.QRcode[theblock.row][theblock.col] = theblock;
        }
      }
    }
  }

  //补充新的
  supplement () {
    //规整一下blocks
    this.createBlocksByQR();
    //遍历QR帧，如果这个位置是*，那么就new出一个新的，从第一行往这一行移动
    for (var r = 0; r < rn; r++) {
      for (var c = 0; c < cn; c++) {
        if (this.QRcode[r][c] == "*") {
          var attr = {
            piecesType: _.random(0, databus.piecesType - 1),
            piecesLevel: databus.getPiecesLevel()
          }
          this.blocks[r][c] = new Block(0, c, attr);
          this.blocks[r][c].moveTo(r, c, 10);
          this.QRcode[r][c] = attr;
        }

        //借这个位置，复原一下needToBomb、downRow两个阵
        this.needToBomb[r][c] = undefined;
        this.downRow[r][c] = undefined;
      }
    }
  }

  test (row1, col1, row2, col2) {
    //备份当前的QRcode阵
    var oldQRcode = [[], [], [], [], [], [], [], []];
    for (var i = 0; i < rn; i++) {
      for (var j = 0; j < cn; j++) {
        oldQRcode[i][j] = this.QRcode[i][j];
      }
    }

    //换
    var c = this.QRcode[row1][col1];
    this.QRcode[row1][col1] = this.QRcode[row2][col2];
    this.QRcode[row2][col2] = c;

    this.createBlocksByQR();
    //然后check
    if (this.check()) {
      return true;
    } else {
      console.log("B", oldQRcode);
      //alert("执行了")
      this.QRcode = oldQRcode;

      this.blocks[row1][col1].moveTo(row2, col2);
      this.blocks[row2][col2].moveTo(row1, col1);

      return false;
    }
  }
}
