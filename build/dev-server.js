const opn = require('opn');
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const router = require('../router');
const { exec } = require('child_process');
const songData = require('../static/data/song.json');
const webpackDevConfig = require('./webpack.dev.config');
const httpProxyMiddleware = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(webpackDevConfig);
const express = require('express');
const app = express();
const port = config.dev.port;
const url = 'http://localhost:' + port;
const proxyTable = config.dev.proxyTable;

// 当环境变量不存在时设置为开发环境
if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = config.dev.env;
}

// config router
router(express, app, songData);

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
    stats: {
        colors: true
    }
});
const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler, {
    log: () => {}
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        webpackHotMiddlewareInstance.publish({
            action: 'reload'
        });
        cb();
    })
});

// config proxy
Object.keys(proxyTable).forEach(ctx => {
    let options = proxyTable[ctx];
    if(typeof options === 'string') {
        options = { target: options }
    }
    app.use(httpProxyMiddleware(options.filter || ctx, options));
});

// use middleWare
app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);

// static path config
const staticObj = {
    path: path.join(__dirname, '../static'),
    imgPath: path.join(__dirname, '../static/img'),
    dataPath: path.join(__dirname, '../static/data'),
}
app.use('/static', express.static(staticObj.path));
app.use('/static/img', express.static(staticObj.imgPath));
app.use('/static/data', express.static(staticObj.dataPath));

let _resolve;
/* const readyPromise =  */new Promise((resolve, reject) => {
    _resolve = resolve;
});

console.log('> Starting dev server...')
webpackDevMiddlewareInstance.waitUntilValid(() => {
    console.log('server start at ' + url);
    if(process.env.NODE_ENV === config.dev.env) {
        opn(url);
    }
    _resolve();
});

// 判断要启动的端口号是否被占用, 占用的话先关闭占用的进程再开启node服务
const cmd = process.platform === 'win32' ? 'netstat -ano' : 'ps aux';
exec(cmd, (err, stdout, stderr) => {
    if(err) {
        console.log('>>> err', err);
        return;
    }
    let isOccupy = false;       // 用来标识端口号是否被占用了
    let pid = '';               // 占用端口号的进程pid
    const listLine = stdout.split('\n');
    // 检测端口号是否有被占用
    for(const line of listLine) {
        const lines = line.trim().split(/\s+/);
        const address = lines[1];
        if(address) {
            const addressPort = address.split(':')[1];
            if(addressPort && Number(addressPort) === port) {
                isOccupy = true;
                pid = lines[4];
                break;
            }
        }
    }
    // 端口被占用时
    if(isOccupy) {
        exec('taskkill /F /pid ' + pid, (error, stdoutK, stderrK) => {
            if(error) {
                console.log('>>> 释放指定端口失败', error);
                return;
            }
            app.listen(port);
        });
    }
    else {
        app.listen(port);
    }
});