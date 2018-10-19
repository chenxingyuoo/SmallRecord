/**
 * Created on 2017/5/26.
 */

'use strict';

//定时器兼容 animationFrame API
const animationFrameSetTimeout = (callback) => {
  return window.setTimeout(callback, 1000 / 60);
};

//定时器
window.requestAnimFrame = (() => {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || animationFrameSetTimeout;
})();

//取消定时器
window.cancelAnimFrame = (() => {
  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout;
})();
