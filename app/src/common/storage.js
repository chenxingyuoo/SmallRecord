/**
 * Created on 2017/6/10.
 */

'use strict';

let storage;

let storages = {
  local : window.localStorage,
  session : window.sessionStorage
};

//检测是否是字符串
const checkString = (val) => {
  if (typeof val !== 'string') {
    throw new Error('请确保 val 为字符串');
  }
};

//本地存储操作api
const storeApi = {
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

/**
 * 创建本地储存
 * @param storeType 本地存储的类型 local 、session
 * @returns {{set: (function(*=, *=)), get: (function(*=)), remove: (function(*=))}}
 */
const createStore = (storeType) => {
  storage = storages[storeType];

  if (!storage.setItem) {
    throw new Error('请确保 storeType 为 local 或者 session');
  }

  return storeApi;
};

export default createStore;
