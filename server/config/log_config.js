'use strict';
const path = require('path');
const fs = require('fs');

//日志根目录
let baseLogPath = path.resolve(__dirname, '../logs')

//错误日志输出完整路径
let errorLogPath = baseLogPath + "/error";
//响应日志输出完整路径
let responseLogPath = baseLogPath +  "/response";

let dbLogPath = baseLogPath +  "/db";

let apiLogPath = baseLogPath +  "/api";

/**
 * 确定目录是否存在，如果不存在则创建目录
 */
const confirmPath = function(pathStr) {
  if(!fs.existsSync(pathStr)){
    fs.mkdirSync(pathStr);
  }
}

confirmPath(errorLogPath)
confirmPath(responseLogPath)
confirmPath(dbLogPath)
confirmPath(apiLogPath)


// let config = {
//   "appenders": [
//       {
//         "category":"errorLogger",             //logger名称
//         "type": "file",                   //日志类型
//         "filename": errorLogPath,             //日志输出位置
//         "alwaysIncludePattern":true,          //是否总是有后缀名
//         "pattern": "-yyyy-MM-dd.log",       //后缀，每小时创建一个新的日志文件
//         "path" : errorPath
//       },
//       {
//         "category":"resLogger",
//         "type": "file",
//         "filename": responseLogPath,
//         "alwaysIncludePattern":true,
//         "pattern": "-yyyy-MM-dd.log",
//         "path" : responsePath
//       }
//   ],
//   "levels":                                     //设置logger名称对应的的日志等级
//     {
//       "errorLogger":"ERROR",
//       "resLogger":"ALL"
//     }
// }

// /**
//  * 确定目录是否存在，如果不存在则创建目录
//  */
// const confirmPath = function(pathStr) {
//   if(!fs.existsSync(pathStr)){
//     fs.mkdirSync(pathStr);
//   }
// }

// //初始化log相关目录
// if(baseLogPath){
//   //创建log的根目录'logs'
//   confirmPath(baseLogPath)
//   //根据不同的logType创建不同的文件目录
//   for(let i = 0, len = config.appenders.length; i < len; i++){
//     if(config.appenders[i].path){
//       confirmPath(baseLogPath + config.appenders[i].path);
//     }
//   }
// }




module.exports = {
  "appenders":{
    "console":{
      "type":"console"
    },
    "everything":{
      "type":"DateFile",
      "filename": responseLogPath + '/error',
      "pattern": "-yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "layout":{"type":"pattern", "pattern":"[%d{yyyy-MM-dd hh:mm:ss} %5.5p] %m"}
    },
    "db":{
      "type":"DateFile",
      "filename": dbLogPath + '/db',
      "pattern": "-yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "layout":{"type":"pattern", "pattern":"[%d{yyyy-MM-dd hh:mm:ss} %5.5p] %m"}
    },
    "api":{
      "type":"DateFile",
      "filename":apiLogPath + '/api',
      "pattern": "-yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "layout":{"type":"pattern", "pattern":"[%d{yyyy-MM-dd hh:mm:ss} %5.5p] %m"}
    }
  },
  "categories":{
    "default":{
      "appenders":["console"],
      "level":"all"
    },
    "everything":{
      "appenders":["console", "everything"],
      "level":"info"
    },
    "db":{
      "appenders":["console", "everything", "db"],
      "level":"info"
    },
    "api":{
      "appenders":["console", "everything", "api"],
      "level":"trace"
    }
  }
}

;