/**
 * Created by chenxingyu on 2017/5/14.
 */

'use strict';
(function (c, d) {
  let a = window.document.createElement('div');
  a.style.width = '1rem';
  a.style.display = 'none';
  let e = window.document.getElementsByTagName('head')[0];
  e.appendChild(a);
  let b = parseFloat(window.getComputedStyle(a, null).getPropertyValue('width'));
  a.remove();
  a = document.createElement('style');
  a.innerHTML = '@media screen and (min-width: ' + window.innerWidth + 'px) {html{font-size:' + window.innerWidth / (c / d) / b * 100 + '%;}}' + ('@media screen and (min-width: ' + window.innerHeight + 'px) {html{font-size:' + window.innerHeight /
    (c / d) / b * 100 + '%;}}');
  e.appendChild(a);
  return b;
})(640, 100);
