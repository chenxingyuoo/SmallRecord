/**
 * Created on 2017/5/26.
 */

'use strict';

const alwaysTrue = () => {
  return true;
};

export default class DomScroll {
  constructor(opts) {
    this.el = typeof opts.el === 'string' ? document.querySelector(opts.el) : opts.el;
    this.offSetTop = opts.offSetTop || 5;
    this.offSetDown = opts.offSetDown || 5;
    this.tempScrollTop = 0;
    this.lock = true;  //锁定
    this.isRemoveEvent = false;
    this.scroll = opts.scroll || alwaysTrue;
    this.scrollTopCallback = opts.scrollTop || alwaysTrue;
    this.scrollDownCallback = opts.scrollDown || alwaysTrue;
    this.init();
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    //滚动处理函数
    const scrollFn = (event) => {
      window.requestAnimFrame(() => {
        let scrollTop = this.getScrollTop();
        let clientHeight = this.getClientHeight();
        let scrollHeight = this.getScrollHeight();

        //执行scroll函数
        this.scroll();

        //滚动到顶部
        if (scrollTop === 0 && this.lock === true) {
          this.lock = false;
          this.complete(this.scrollTopCallback);
        }

        //滚动到底部
        if (scrollTop + clientHeight  >= scrollHeight && this.lock === true) {
          this.lock = false;
          this.complete(this.scrollDownCallback);
        }

        //判断是否移除事件
        if (this.isRemoveEvent === true) {
          this.el.removeEventListener('scroll', scrollFn);
        }

      });
    };

    //监听事件
    this.el.addEventListener('scroll', scrollFn , false);
  }

  getScrollTop() {
    return this.el.scrollTop;
  }

  getOffsetTop(){
    return this.el.offsetTop;
  }

  getClientHeight() {
    return this.el.clientHeight;
  }

  getScrollHeight() {
    return this.el.scrollHeight;
  }

  //完成
  complete(callback) {
    if (callback(this) === true) {
      this.lock = true;
    }
  }

}
