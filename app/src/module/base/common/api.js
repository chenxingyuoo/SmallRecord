/**
 * Created on 2017/6/22.
 */

'use strict';
let apis = {
  userSignup : 'userSignup', //用户注册
  userSignin : 'userSignin'  //用户登录
};

for (let key in apis){
  apis[key] = '/api/' + apis[key];
}

export default apis;
