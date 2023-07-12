<template>
  <div class="content-wrap">
    <!-- 主深度图 -->
    <canvas ref="depth" :width="options.width" :height="options.height" :style="{ ...hdCanvasStyle }"></canvas>
    <!-- 坐标轴 -->
    <canvas ref="axis" :width="axisCanvasSize.width" :height="axisCanvasSize.height" :style="{ ...axisCanvasStyle }"></canvas>
    <!-- 提示框 -->
    <canvas
      ref="tip"
      :width="axisCanvasSize.width"
      :height="axisCanvasSize.height"
      :style="{ ...axisCanvasStyle }"
      @mousemove="onMouseMove"
      @mouseout="onMouseOut"
    ></canvas>
  </div>
</template>

<script>
// import logo from "./../assets/logo.png";
const deviceRatio = window.devicePixelRatio;

// 深度图默认配置项
const defaultDayOptions = {
  // 基础配置
  width: 780, // 深度图可视宽
  height: 540, // 深度图可视高
  initOffset: 0.5 * deviceRatio, // 初始偏移，解决线条模糊
  bgColor: "rgba(255,255,255)", // 整体背景色
  yAxisWidth: 50, // y轴标尺刻度线宽度

  // 线条配置
  rulerLineColor: "#666", // 标尺线条颜色颜色

  // 轴配置
  xAxisGridSpace: 90*deviceRatio, // x轴背景网格间距
  yAxisGridSpace: 30*deviceRatio, // y轴背景网格间距
  xAxisFontColor: "#666", // x轴标尺刻度字体颜色
  yAxisFontColor: "#666", // y轴标尺刻度字体颜色
  xAxisFontSize: `${12*deviceRatio}px Aria`, // x轴标尺刻度字体大小
  yAxisFontSize: `${12*deviceRatio}px Aria`, // y轴标尺刻度字体大小

  // 间距配置
  bottomSpace: 8*deviceRatio, // 深度图与y轴的间距
  buySellSpace: 10*deviceRatio, // 买卖单终点间距

  // 提示框
  tipLocationDotRadius: 3*deviceRatio, // 提示框圆点半径

  // 买 提示框
  tipBuyLocationDotBgColor: "#fff", // 提示框圆点背景颜色
  tipBuyBorderColor: "#67c23a", // 提示框边框颜色

  // 卖 提示框
  tipSellLocationDotBgColor: "#fff", // 提示框圆点背景颜色
  tipSellBorderColor: "#f56c6c", // 提示框边框颜色

  // 自定义深度样式配置
  buyStrokeColor: "#5DC787", // 买单笔触颜色 rgb(111,168,0)
  sellStrokeColor: "#E35561", // 卖单笔触颜色 rgb(234,0,112)
  buyLinearGradientArray: [
    "#5DC787",
  ],
  sellLinearGradientArray: [
    "#E35561",
  ],
};

// 深度图默认配置项
const defaultNightOptions = {
  // 基础配置
  width: 780, // 深度图可视宽
  height: 540, // 深度图可视高
  initOffset: 0.5, // 初始偏移，解决线条模糊
  bgColor: "lightpink", // 整体背景色
  yAxisWidth: 50,

  // 线条配置
  gridLineColor: "#333", // 网格线条颜色
  rulerLineColor: "rgb(47,47,47)", // 标尺线条颜色颜色

  // 轴配置
  xAxisGridSpace: 90, // x轴背景网格间距
  yAxisGridSpace: 30, // y轴背景网格间距
  xAxisFontColor: "#999", // x轴标尺刻度字体颜色
  yAxisFontColor: "#999", // y轴标尺刻度字体颜色
  xAxisFontSize: "12px Aria", // x轴标尺刻度字体大小
  yAxisFontSize: "12px Aria", // y轴标尺刻度字体大小

  // 间距配置
  bottomSpace: 8, // 深度图与y轴的间距
  buySellSpace: 10, // 买卖单终点间距

  // 提示框
  tipLocationDotRadius: 5, // 提示框圆点半径

  // 买 提示框
  tipBuyLocationDotBgColor: "#fff", // 提示框圆点背景颜色
  tipBuyBorderColor: "#67c23a", // 提示框边框颜色

  // 卖 提示框
  tipSellLocationDotBgColor: "#fff", // 提示框圆点背景颜色
  tipSellBorderColor: "#f56c6c", // 提示框边框颜色

  // 自定义深度样式配置
  buyStrokeColor: "rgb(111,168,0)", // 买单笔触颜色 rgb(111,168,0)
  sellStrokeColor: "rgb(234,0,112)", // 卖单笔触颜色 rgb(234,0,112)
  buyLinearGradientArray: [
    "rgb(80,120,3)",
  ],
  sellLinearGradientArray: [
    "rgb(217,45,127)",
  ],
};

export default {
  props: {
    data: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
    customizeOptions: {
      type: [Object],
      default() {
        return defaultDayOptions;
      },
    },
    theme: {
      type: String,
      default() {
        return "day";
      },
    },
  },
  data() {
    return {
      options: Object.assign(defaultDayOptions, this.customizeOptions),
      depth: null,
      depthContext: null,
      axis: null,
      axisContext: null,
      tip: null,
      tipContext: null,
      pointMap: new Map(),
    };
  },
  computed: {
    hdCanvasStyle() {
      return {
        width: `${this.options.width/deviceRatio}px`,
        height: `${this.options.height/deviceRatio}px`,
      }
    },
    axisCanvasSize() {
      const { width, height, yAxisWidth } = this.options;
      return {
        width: (width + yAxisWidth),
        height: height,
      }
    },
    axisCanvasStyle() {
      return {
        width: `${this.axisCanvasSize.width/deviceRatio}px`,
        height: `${this.axisCanvasSize.height/deviceRatio}px`
      }
    }
  },
  watch: {
    data: {
      handler(val) {
        this.pointMap = new Map();
        this.drawDepth(val, this.depthContext, this.options);
        this.drawAxis(val, this.axisContext, this.options);
      },
      immediate: false,
      deep: true,
    },
  },
  mounted() {
    if (this.theme == "night") {
      this.options = Object.assign(defaultNightOptions, this.customizeOptions);
    }
    // 初始化
    this.init();
  },
  // destroyed() {
  //   // 重置
  //   this.reset();
  // },
  methods: {
    // 初始化canvas
    init() {
      this.depth = this.$refs["depth"];
      this.depthContext = this.getContext2D(this.depth);
      this.axis = this.$refs["axis"];
      this.axisContext = this.getContext2D(this.axis);
      this.tip = this.$refs["tip"];
      this.tipContext = this.getContext2D(this.tip);
      this.tipContext.translate(
        this.options.initOffset,
        this.options.initOffset
      );

      // 绘制深度区域
      this.drawDepth(this.data, this.depthContext, this.options);
      // 绘制轴标尺刻度
      this.drawAxis(this.data, this.axisContext, this.options);
    },
    reset() {
      // this.tip = this.grid = this.depth = this.axis = null;
      // this.tipContext = this.gridContext = this.depthContext = this.axisContext = null;
    },
    // 绘制坐标轴
    drawAxis(data, context, options) {
      // 判断是否有对应的深度数组
      if (
        !Object.prototype.hasOwnProperty.call(data, "buy") ||
        !Object.prototype.hasOwnProperty.call(data, "sell")
      ) {
        alert("无法渲染坐标刻度，缺少关键数组(买单或卖单)");
        return;
      }
      const {
        width,
        height,
        initOffset,
        bottomSpace,
        buySellSpace,
        xAxisGridSpace,
        yAxisGridSpace,
        rulerLineColor,
        xAxisFontSize,
        yAxisFontSize,
        xAxisFontColor,
        yAxisFontColor,
      } = options;
      const yLen = height - yAxisGridSpace;
      const origin = [0, yLen];
      const allData = this.deepClone(data)
      const buyDataOri = allData["buy"];
      const buyData = buyDataOri.reverse();
      const sellData = data["sell"];
      const buyLen = buyData.length;
      const sellLen = sellData.length;
      const buyBasePrice = buyData[buyLen - 1]?.price || 0;
      const sellBasePrice = sellData[sellLen - 1]?.price||0;
      const buyPriceDiff = (buyData[0]?.price||0) - (buyData[buyLen - 1]?.price||0);
      const sellPriceDiff = (sellData[0]?.price||0) - (sellData[sellLen - 1]?.price||0);
      const staticWidth = (width - buySellSpace) / 2; // 单边宽度
      const staticHeight = yLen - bottomSpace;
      const buyTotalAmount = buyData[0]?.amount||0; // 买单全部深度数量
      const sellTotalAmount = sellData[0]?.amount||0; // 卖单全部深度数量
      const totalAmount = Math.max(buyTotalAmount, sellTotalAmount); // 确定最大高度对应的数量

      context.clearRect(0, 0, width+1000, height+1000);
      context.save();
      context.translate(initOffset, initOffset);
      context.beginPath();

      // 创建x坐标轴的刻度线路径
      for (let i = origin[0] + xAxisGridSpace; i < width; i += xAxisGridSpace) {
        context.moveTo(i, origin[1] - bottomSpace);
        context.lineTo(i, origin[1] - bottomSpace + 4*deviceRatio);
        context.font = xAxisFontSize;
        context.fillStyle = xAxisFontColor;
        context.stroke();
        // 设置居中
        context.textAlign = "center";

        let number = 0;
        if (i <= staticWidth) {
          number = parseFloat(
            (i / staticWidth) * buyPriceDiff + buyBasePrice
          ).toFixed(2);
        } else if (i > staticWidth + buySellSpace) {
          number = parseFloat(
            ((i - (staticWidth + buySellSpace)) / staticWidth) * sellPriceDiff +
              sellBasePrice
          ).toFixed(2);
        } else {
          number = null;
        }

        // maxWidth 为间距
        context.fillText(number, i, origin[1] + 18, xAxisGridSpace);
      }

      // 创建y坐标轴的刻度线路径
      for (
        let j = origin[1] - yAxisGridSpace;
        j > origin[1] - yLen;
        j -= yAxisGridSpace
      ) {
        context.moveTo(width, j);
        context.lineTo(width+4*deviceRatio, j);
        context.font = yAxisFontSize;
        context.fillStyle = yAxisFontColor;
        context.textAlign = "left";

        const number = parseFloat(
          ((staticHeight - j) / staticHeight) * totalAmount
        ).toFixed(2);

        context.fillText(number, width + 8*deviceRatio, j + 4);
      }

      // 设置绘制颜色
      context.strokeStyle = rulerLineColor;
      // 设置绘制线段的宽度
      context.lineWidth = 1;
      // 绘制中央坐标轴
      context.moveTo(width/2, 0);
      context.lineTo(width/2, height - yAxisGridSpace - bottomSpace);
      context.stroke();
      context.closePath();
      context.restore();
    },
    // 绘制主深度图
    drawDepth(data, context, options) {
      // 判断是否有对应的深度数组
      if (
        !Object.prototype.hasOwnProperty.call(data, "buy") ||
        !Object.prototype.hasOwnProperty.call(data, "sell")
      ) {
        alert("无法渲染深度图，缺少关键数组(买单或卖单)");
        return;
      }
      // 初始化基本数据
      const {
        width,
        height,
        initOffset,
        bottomSpace,
        buySellSpace,
        yAxisGridSpace,
        buyLinearGradientArray,
        sellLinearGradientArray,
      } = options;
      const allwidth = width; // 整体宽度
      const allheight = height - yAxisGridSpace;
      const staticWidth = (allwidth - buySellSpace) / 2; // 固定单边宽度
      const staticHeight = allheight - bottomSpace;
      const buyPoint = [],
        sellPoint = [];
      const allData = this.deepClone(data)
      const buyData = allData["buy"];
      const sellData = data["sell"];
      const buyLen = buyData.length;
      const sellLen = sellData.length;

      const buyEndOrigin = { x: staticWidth, y: staticHeight }; // 买单画笔终点
      const sellEndOrigin = { x: staticWidth + buySellSpace, y: staticHeight }; // 卖单画笔终点
      const buyStartOrigin = { x: 0, y: staticHeight }; // 买单画笔边缘起点
      const sellStartOrigin = { x: width, y: staticHeight }; // 卖单画笔边缘起点
      const buySidePrice = buyData[0]?.price || 0; // 买单边缘价格
      const sellSidePrice = sellData[0]?.price || 0; // 买单边缘价格
      const buyTotalAmount = buyData[0]?.amount || 0; // 买单全部深度数量
      const sellTotalAmount = sellData[0]?.amount || 0; // 卖单全部深度数量
      const totalAmount = Math.max(buyTotalAmount, sellTotalAmount); // 确定最大高度对应的数量
      const buyMaxPriceDiff = (buyData[buyLen - 1]?.price||0) - (buyData[0]?.price || 0); // 买单最大价差
      const sellMaxPriceDiff = (sellData[0]?.price||0) - (sellData[sellLen - 1]?.price||0); // 卖单最大价差
      let pointList = [];
      // 添加买单画点 并确保坐标点均为整数
      buyData.forEach((item, index) => {
        const x = Math.round(
          ((item.price - buySidePrice) / buyMaxPriceDiff) * staticWidth
        );
        const y = Math.round(
          ((totalAmount - item.amount) / totalAmount) * staticHeight
        );
        buyPoint.push({ x, y });

        if (buyData[index + 1]) {
          const yDrop = Math.round(
            ((totalAmount - buyData[index + 1].amount) / totalAmount) *
              staticHeight
          );
          buyPoint.push({ x, y: yDrop });
        }
        pointList.push({ x, y, side: "buy", value: item });
      });
      // 添加卖单画点 并确保坐标点均为整数
      sellData.forEach((item, index) => {
        const x = Math.round(
          width -
            ((sellSidePrice - item.price) / sellMaxPriceDiff) * staticWidth
        );
        const y = Math.round(
          ((totalAmount - item.amount) / totalAmount) * staticHeight
        );
        sellPoint.push({ x, y });
        // 下落点
        if (sellData[index + 1]) {
          const yDrop = Math.round(
            ((totalAmount - sellData[index + 1].amount) / totalAmount) *
              staticHeight
          );
          sellPoint.push({ x, y: yDrop });
        }
        pointList.push({ x, y, side: "sell", value: item });
      });
      pointList = pointList.sort((a, b) => {
        return a.x - b.x;
      });
      console.log(pointList);
      pointList.forEach((item) => {
        this.pointMap.set([item.x, item.y, item.side], item.value);
      });

      buyPoint.push(buyEndOrigin);
      buyPoint.push(buyStartOrigin);
      sellPoint.push(sellEndOrigin);
      sellPoint.push(sellStartOrigin);
      // 初始化中心偏移，确保无锯齿化地画线
      context.clearRect(0, 0, width+1000, height+1000);
      context.save();
      context.translate(initOffset, initOffset);
      context.lineWidth = 2*deviceRatio; // 因为已经中心偏移，所以不需要设为0.5，设为0.5又会产生锯齿
      context.lineJoin = "bevel"; // 线条和线条相交的时候所呈现出的形态设为"斜接（不会延长形成尖角）"

      // 买单笔触画线
      context.beginPath();
      // 设置买单渐变填充和笔触颜色
      const buyLinearGradient = context.createLinearGradient(
        0,
        0,
        0,
        staticHeight
      );
      buyLinearGradient.addColorStop(0, buyLinearGradientArray[0]);
      context.strokeStyle = this.options.buyStrokeColor;
      context.fillStyle = buyLinearGradient;
      // 连接对应的点
      buyPoint.forEach((item, index) => {
        context.lineTo(item.x, item.y);
        if (index !== buyPoint.length - 1) {
          context.stroke();
        }
      });
      context.fill();
      context.closePath();

      // 卖单笔触画线
      context.beginPath();
      // 设置卖单渐变填充和笔触颜色
      const sellLinearGradient = context.createLinearGradient(0, 0, 0, height);
      sellLinearGradient.addColorStop(0, sellLinearGradientArray[0]);
      context.fillStyle = sellLinearGradient;
      context.strokeStyle = this.options.sellStrokeColor;
      // 连接对应的点
      sellPoint.forEach((item, index) => {
        context.lineTo(item.x, item.y);
        if (index !== sellPoint.length - 1) {
          context.stroke();
        }
      });
      context.fill();
      context.closePath();
      context.restore();
    },
    onMouseMove({offsetX}) {
      const tipContext = this.tipContext;
      const { yAxisWidth, width, buySellSpace } = this.options;
      console.log(offsetX, (width-buySellSpace)/deviceRatio/2);
      if (offsetX >= (width-buySellSpace)/deviceRatio/2 && offsetX <= ((width-buySellSpace)/deviceRatio/2+10)) return
      // 先清空
      tipContext.clearRect(-10, -10, width + yAxisWidth+1000, this.options.height + 1020);
      this.mouseMoveHandler({ offsetX })
      this.mouseMoveHandler({ offsetX: width/deviceRatio-offsetX })
    },
    mouseMoveHandler({ offsetX }) {
      const pointMap = this.pointMap;
      const tipContext = this.tipContext;
      const {
        tipLocationDotRadius,
        tipBuyLocationDotBgColor,
        tipBuyBorderColor,
        tipSellLocationDotBgColor,
        tipSellBorderColor,
        yAxisGridSpace,
        buyStrokeColor, 
        sellStrokeColor,
        width,
      } = this.options;
      const height = this.options.height - yAxisGridSpace;
      console.log('---');
      for (let key of pointMap.keys()) {
        const x = key[0];
        const y = key[1];
        const side = key[2];
        const obj = pointMap.get(key);
        if (offsetX*deviceRatio < x) {
          // 绘制定位虚线
          tipContext.strokeStyle = side === 'buy' ? buyStrokeColor : sellStrokeColor;
          tipContext.lineWidth = 1*deviceRatio;
          tipContext.setLineDash([5]);
          tipContext.beginPath();
          if (side === 'buy') {
            tipContext.moveTo(0, y);
            tipContext.lineTo(width/2, y);
          } else {
            tipContext.moveTo(width/2, y);
            tipContext.lineTo(width, y)
          }
          tipContext.stroke();
          tipContext.closePath();
          tipContext.beginPath();
          tipContext.moveTo(x, 0);
          tipContext.lineTo(x, height);
          tipContext.stroke();
          tipContext.closePath();

          // 绘制小圆点
          tipContext.beginPath();
          tipContext.lineWidth = 1 * deviceRatio;
          tipContext.setLineDash([]);
          tipContext.fillStyle =
            side === "buy"
              ? tipBuyLocationDotBgColor
              : tipSellLocationDotBgColor;
          tipContext.strokeStyle =
            side === "buy" ? tipBuyBorderColor : tipSellBorderColor;
          tipContext.arc(x, y, tipLocationDotRadius, 0, 2 * Math.PI);
          tipContext.fill();
          tipContext.stroke();
          tipContext.closePath();

          // 绘制提示框
          tipContext.font = `${12*deviceRatio}px bold`;
          tipContext.strokeStyle = "#fff";
          const xPadding = 5 * deviceRatio
          const tipsPriceText = `${this.toThousand(obj.price)}`;
          const tipsAmountText = `${obj.amount}`;
          const tipsPriceWidth =
            tipContext.measureText(tipsPriceText).width;
          const tipsAmountWidth =
            tipContext.measureText(tipsAmountText).width;
          const lineHeight = 12*deviceRatio;
          const yOffset = 4*deviceRatio;
          // 绘制x轴上的提示框
          tipContext.beginPath();
          tipContext.moveTo(x, height - xPadding);
          tipContext.lineTo(x - tipsPriceWidth / 2 - xPadding, height - xPadding);
          tipContext.lineTo(x - tipsPriceWidth / 2 - xPadding, height + xPadding + lineHeight);
          tipContext.lineTo(x + tipsPriceWidth / 2 + xPadding, height + xPadding + lineHeight);
          tipContext.lineTo(x + tipsPriceWidth / 2 + xPadding, height - xPadding);
          if (this.theme == "night") {
            tipContext.fillStyle = "rgb(25,25,25)";
          } else {
            tipContext.fillStyle = "#fff";
          }
          tipContext.fill();
          tipContext.stroke();
          if (this.theme == "night") {
            tipContext.fillStyle = "#ccc";
          } else {
            tipContext.fillStyle = side === 'buy' ? buyStrokeColor : sellStrokeColor;
          }
          tipContext.textAlign = "center";
          tipContext.fillText(tipsPriceText, x, height + 20);
          tipContext.closePath();
          // 绘制y轴上的提示框
          const startX = side === 'buy' ? 4*deviceRatio : width;
          tipContext.beginPath();
          tipContext.moveTo(startX, y - lineHeight + yOffset);
          tipContext.lineTo(startX, y + xPadding + yOffset);
          tipContext.lineTo(startX + xPadding*2 + tipsAmountWidth, y + xPadding + yOffset);
          tipContext.lineTo(startX + xPadding*2 + tipsAmountWidth, y - lineHeight + yOffset);
          if (this.theme == "night") {
            tipContext.fillStyle = "rgb(25,25,25)";
          } else {
            tipContext.fillStyle = side === 'buy' ? '#eaf5fe' : '#fff';
          }
          tipContext.fill();
          // tipContext.stroke();
          if (this.theme == "night") {
            tipContext.fillStyle = "#ccc";
          } else {
            tipContext.fillStyle = side === 'buy' ? buyStrokeColor : sellStrokeColor;
          }
          tipContext.textAlign = 'left'
          tipContext.fillText(tipsAmountText, startX + xPadding, y+yOffset, tipsAmountWidth);
          tipContext.closePath();
          break;
        }
      }
    },
    onMouseOut() {
      const { width, height, yAxisWidth } = this.options;
      this.tipContext.clearRect(-20, -20, width + yAxisWidth+1000, height+1000);
    },
    drawRoundedRect(context, x, y, width, height, r, fill, stroke) {
      context.moveTo(x + r, y);
      context.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner
      context.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner
      context.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner
      context.arcTo(x, y, x + r, y, r);
      if (fill) {
        context.fill();
      }
      if (stroke) {
        context.stroke();
      }
    },
    getContext2D(elem) {
      // 判断是否为canvas
      if (elem && elem.nodeType && elem.nodeType == 1) {
        return elem.getContext("2d");
      }
      return null;
    },
    // 数字用逗号分隔
    toThousand(num = 0) {
      if (typeof num === "undefined") {
        return 0;
      }
      return (num || 0).toString().replace(/\d+/, function (n) {
        var len = n.length;
        if (len % 3 === 0) {
          return n.replace(/(\d{3})/g, ",$1").slice(1);
        } else {
          return (
            n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ",$1")
          );
        }
      });
    },
    deepClone(obj) {
      if (obj instanceof RegExp) return new RegExp(obj);
      if (obj instanceof Date) return new Date(obj);
      if (obj === null || typeof obj !== "object") return obj; //如果不是引用类型则直接返回
      let newObj = new obj.constructor(); //如果obj是数组，newObj=[];如果obj是对象，newObj={}
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          //是否是自身的对象
          newObj[key] = this.deepClone(obj[key]); //赋值
        }
      }
      return newObj;
    },
  },
};
</script>

<style scoped>
.content-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
canvas {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
