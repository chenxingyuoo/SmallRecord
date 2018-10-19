/**
 * Created on 2017/6/2.
 */

'use strict';
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    var filePath = path.join(__dirname, '../', dir);

    console.log(filePath);
    // 先导入fs模块，然后用readdirSync列出文件
    var files = fs.readdirSync(filePath);

    // 过滤出.js文件:
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(filePath + '/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers'; // 如果不传参数，扫描目录默认为'controllers'
    addControllers(router, controllers_dir);
    return router.routes();
};
