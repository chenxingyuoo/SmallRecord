/**
 * Created on 2017/6/15.
 */

'use strict';
const settings = require('./settings');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const options = {
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
};

mongoose.connect(`mongodb://${settings.host}/${settings.db}`,options);

module.exports = {
  mongoose : mongoose
}