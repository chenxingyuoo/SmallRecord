/**
 * Created on 2017/6/15.
 */

'use strict';
const settings = require('./settings');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${settings.host}/${settings.db}`);

module.exports = {
  mongoose : mongoose
}