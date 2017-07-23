/* eslint-disable no-unused-expressions */
/**
 * Created on 2017/7/23.
 */

'use strict';

import Vue from 'vue';
let Mask = Vue.extend(require('./loading.vue'));

exports.install = Vue => {
  if (Vue.prototype.$isServer) {
    return;
  }
  let insertDom = (parent, el, binding) => {
    if (!el.domVisible) {
      Object.keys(el.maskStyle).forEach(property => {
        el.mask.style[property] = el.maskStyle[property];
      });

      el.domVisible = true;

      parent.appendChild(el.mask);
      Vue.nextTick(() => {
        el.instance.visible = true;
      });
      el.domInserted = true;
    }
  };

  let toggleLoading = (el, binding) => {
    if (binding.value) {
      Vue.nextTick(() => {
        insertDom(el, el, binding);
      });
    } else {
      if (el.domVisible) {
        el.instance.visible = false;
      }
    }
  };

  Vue.directive('loading', {
    bind: function(el, binding) {
      let mask = new Mask({
        el: document.createElement('div'),
        data: {
          text: el.getAttribute('loading-text')
        }
      });
      el.instance = mask;
      el.mask = mask.$el;
      el.maskStyle = {};

      toggleLoading(el, binding);
    },

    update: function(el, binding) {
      el.instance.setText(el.getAttribute('loading-text'));
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },

    unbind: function(el, binding) {
      if (el.domInserted) {
        el.mask &&
        el.mask.parentNode &&
        el.mask.parentNode.removeChild(el.mask);
      }
    }
  });
};

