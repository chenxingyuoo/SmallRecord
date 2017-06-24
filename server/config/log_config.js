'use strict';
const path = require('path');
const fs = require('fs');

//日志根目录
let baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
let errorPath = "/error";
//错误日志文件名
let errorFileName = "error";
//错误日志输出完整路径
let errorLogPath = baseLogPath + errorPath + "/" + errorFileName;

//响应日志目录
let responsePath = "/response";
//响应日志文件名
let responseFileName = "response";
//响应日志输出完整路径
let responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

let config = {
  "appenders":
    [
      {
        "category":"errorLogger",             //logger名称
        "type": "dateFile",                   //日志类型
        "filename": errorLogPath,             //日志输出位置
        "alwaysIncludePattern":true,          //是否总是有后缀名
        "pattern": "-yyyy-MM-dd-hh.log",       //后缀，每小时创建一个新的日志文件
        "path" : errorPath
      },
      {
        "category":"resLogger",
        "type": "dateFile",
        "filename": responseLogPath,
        "alwaysIncludePattern":true,
        "pattern": "-yyyy-MM-dd-hh.log",
        "path" : responsePath
      }
    ],
  "levels":                                     //设置logger名称对应的的日志等级
    {
      "errorLogger":"ERROR",
      "resLogger":"ALL"
    }
}

/**
 * 确定目录是否存在，如果不存在则创建目录
 */
const confirmPath = function(pathStr) {
  if(!fs.existsSync(pathStr)){
    fs.mkdirSync(pathStr);
  }
}

//初始化log相关目录
if(baseLogPath){
  //创建log的根目录'logs'
  confirmPath(baseLogPath)
  //根据不同的logType创建不同的文件目录
  for(let i = 0, len = config.appenders.length; i < len; i++){
    if(config.appenders[i].path){
      confirmPath(baseLogPath + config.appenders[i].path);
    }
  }
}

module.exports = config;