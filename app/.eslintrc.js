// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6:true,
    node:true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  "extends": "eslint:recommended",
  // required to lint *.vue files
  plugins: [
    // 'vue',vue
    'html'
  ],
  // add your custom rules here
  "rules": {
    /**---------------逻辑错误相关--------------------- */
    "no-cond-assign": "error",  //错误：条件语句中出现赋值=操作符
    "no-dupe-args": "error",  //错误：方法中出现重名参数
    "no-console": "warn",  //警告：语句中出现console
    "no-debugger": "warn",   //警告：语句中出现debugger
    "no-dupe-keys": "error",  //错误：对象字面量出现同名key
    "no-duplicate-case": "error",  //禁止重复 case 标签
    "no-empty": "warn",  //禁用空语块语句
    "no-ex-assign": "error",  //禁止对 catch 子句中的异常重新赋值 (no-ex-assign)
    "no-extra-boolean-cast": "error",  //禁止不必要的布尔类型转换
    "no-extra-semi": "error",  //禁用不必要的分号
    "no-func-assign": "error",  //禁止对function声明重新赋值
    "no-sparse-arrays": "error",  //禁止使用稀疏数组 [1,,2]
    "no-template-curly-in-string": "error",  //禁止在普通字符串中使用模板语法 "hello ${name}"
    "no-unreachable": "warn",  //禁止在return、throw、continue和break后出现不可达代码
    "use-isnan": "error",  //要求调用isNaN()方法检查NaN，不能直接与NaN比较
    "valid-jsdoc": ["warn", {
      "requireReturn": false,  //方法中没有return，可以在注释中省略
      "requireReturnType": false  //可以省略return type类型
    }],  //强制使用有效的JSDoc注释
    "valid-typeof": "error",  //强制typeof与有效字符串进行比较

    /**---------------最佳实践------------------------- */
    "accessor-pairs": "warn",  //警告：强制getter、setter成对出现在对象中
    "array-callback-return": "error",  //强制数组回调方法有return(部分必须return的方法)
    "curly": "error",  //强制所有块语句，必须由大括号包裹{}
    "eqeqeq": ["error", "smart"],  //要求使用===和!==
    "no-alert": "warn",  //禁用Alert
    "no-caller": "error",  //禁用caller或callee(严格模式中不可使用)
    "no-empty-function": "warn",  //禁止出现空函数
    "no-eval": "error",  //禁用eval()
    "no-labels": "error",  //禁用标签语句
    "no-magic-numbers": "warn",  //禁用魔术数字 eg:oneHour=now+(60*60*1000)
    "no-redeclare": ["error", { builtinGlobals: true }],  //禁止重新声明变量，覆盖系统全局变量
    "no-return-assign": ["error", "except-parens"],  //禁止在return语句中赋值，除非有括号包裹
    "no-self-compare": "error",  //禁止自身比较
    "no-sequences": "error",  //禁止使用逗号操作符
    // "unmodified-loop-condition": "warn",  //禁用一成不变的循环条件
    "no-unused-expressions": "error",  //禁止未使用过的表达式
    "no-useless-call": "error",  //禁止不必要的.call()和.apply()
    "no-useless-concat": "error",  //禁止没必要的字符串拼接
    "no-void": "error",  //禁止使用void操作符
    "no-with": "error",  //禁止使用with操作符
    "yoda": ["error", "never"],  //禁止使用yoda条件

    /**--------------变量相关------------------------- */
    "no-delete-var": "error",  //禁止删除变量 delete x
    "no-shadow": "warn",  //禁止变量声明覆盖外层作用域的变量
    "no-unused-vars": "warn",  //警告：禁止未使用过的变量
    "no-use-before-define": "error",  //禁止变量在定义前使用

    /**---------------编码风格相关--------------------- */
    // "indent": ["error", 4],  //缩进方式
    "linebreak-style": ["error", "unix"],  //行尾结束编码方式
    "quotes": ["error", "single"],  //强制使用单引号
    "semi": ["error", "always"],    //强制句末使用分号
    "camelcase": ["error", { "properties": "always" }], //强制使用camelCase方式命名参数
    "new-cap": "error",  //构造函数名称首字母大写
    "comma-dangle": ["error", "never"],  //禁用拖尾逗号
    "no-array-constructor": "warn",  //禁止使用Array构造函数

    /**-------------ECMAScript 6------------------- */
    "arrow-body-style": ["error", "always"],  //强制箭头函数使用花括号{}
    "no-var": "error",  //要求使用let或者const而不是var
  }
}
