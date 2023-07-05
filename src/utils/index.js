/*
 * @Author: Jackie
 * @Date: 2023-07-05 21:48:23
 * @LastEditTime: 2023-07-05 21:49:27
 * @LastEditors: Jackie
 * @Description: file content
 * @FilePath: /vue3-element-plus-demo/src/utils/index.js
 * @version:
 */
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以 arg2的精确结果
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  // eslint-disable-next-line no-empty
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  // eslint-disable-next-line no-empty
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  );
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
  return accMul(+arg, +this);
};

//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  // eslint-disable-next-line no-empty
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  // eslint-disable-next-line no-empty
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

//给Number类型增加一个div方法，调用起来更加 方便。
Number.prototype.div = function (arg) {
  return accDiv(+this, +arg);
};

// 让数字arg1舍弃arg2位以后的小数，不四舍五入
export function accAbandon(arg1, arg2) {
  return Math.floor(parseFloat(`${arg1}`).mul(Math.pow(10, arg2))).div(
    Math.pow(10, arg2)
  );
}
