/**
 * Created on 2017/6/25.
 */

'use strict';

const log4js = require('log4js');
const logConfig = require('../config/log_config');
const emit = require('events').EventEmitter;
let errorLogger = log4js.getLogger('errorLogger');
let resLogger = log4js.getLogger('resLogger');
let logUtil = {};

class logUtils extends emit {
  emitError(ctx, error, resTime) {
    this.emit('error', ctx, error, resTime)
  }
  emitLog(ctx, resTime) {
    this.emit('log', ctx, resTime)
  }
  formatReqLog(req, resTime) {
    let logText = '';
    let method = req.method;
    logText += "request method: " + method + "\n";
    logText += "request originalUrl:  " + req.originalUrl + "\n";
    logText += "request client ip:  " + req.ip + "\n";
    let startTime;
    if (method === 'GET') {
      logText += "request query:  " + JSON.stringify(req.query) + "\n";
    } else {
      logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
    }
    logText += "response time: " + resTime + "\n";
    return logText;
  }
  formatRes(ctx, resTime) {
    let logText = '';
    logText += "\n" + "*************** response log start ***************" + "\n";
    logText += this.formatReqLog(ctx.request, resTime);
    logText += "response status: " + ctx.status + "\n";
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";
    logText += "*************** response log end ***************" + "\n";
    return logText;
  }
  formatError(ctx, err, resTime) {
    let logText = '';
    logText += "\n" + "*************** error log start ***************" + "\n";
    logText += this.formatReqLog(ctx.request, resTime);
    logText += "err name: " + err.name + "\n";
    logText += "err message: " + err.message + "\n";
    logText += "err stack: " + err.stack + "\n";
    logText += "*************** error log end ***************" + "\n";
    return logText;
  }
}

let log4Util = new logUtils();

log4js.configure(logConfig);

log4Util.on('error', (ctx, error, resTime) => {
  errorLogger.error(log4Util.formatError(ctx, error, resTime));
})

log4Util.on('log', (ctx, resTime) => {
  resLogger.info(log4Util.formatRes(ctx, resTime));
})

logUtil.logError = (ctx, error, resTime) => {
  if (ctx && error) {
    log4Util.emitError(ctx, error, resTime)
  }
};

logUtil.logResponse = (ctx, resTime) => {
  if (ctx) {
    log4Util.emitLog(ctx, resTime)
  }
};
module.exports = logUtil;