/**
 * Created on 2017/6/10.
 */

'use strict';

//检测是否是字符串
const checkString = (val) => {
  if (typeof val !== 'string') {
    throw new Error('请确保 val 为字符串');
  }
};

/**
 * 创建本地储存
 * @param storage 本地存储的类型 localStorage 、sessionStorage
 * @returns {{set: (function(*=, *=)), get: (function(*=)), remove: (function(*=))}}
 */
const createStore = (storage) => {
  //本地存储操作api
  let storeApi = {
    set(key, val){
      checkString(key);
      storage.setItem(key, JSON.stringify(val));
    },
    get(key){
      checkString(key);

      let obj = storage.getItem(key);
      if (obj) {
        return JSON.parse(obj);
      }
    },
    remove(key){
      checkString(key);
      return storage.removeItem(key);
    }
  };

  return storeApi;
};

export const sessionStore = createStore(sessionStorage);
export const localStore = createStore(localStorage);


