import regexp from '@/common/regexp';

//检测手机号码
export const checkPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('手机号码不能为空'));
  }
  else if (regexp.phone.test(value) === false) {
    callback(new Error('手机号码格式不正确'));
  }
  else {
    callback();
  }
};

//检测邮箱
export const checkEmail = (rule, value, callback) => {
  if (!value) {
    callback();
  }
  else if (regexp.email.test(value) === false) {
    callback(new Error('邮箱格式不正确'));
  }
  else {
    callback();
  }
};

//检测长度
export const checkLength = (rule, value, callback) => {
  if (!value) {
    callback();
  }
  else if (value.length > rule.maxLength ) {
    callback(new Error(rule.message));
  }
  else {
    callback();
  }
};


