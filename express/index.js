const opn = require('opn');
const path = require('path');
const express = require('express');
const config = require('../config');
const router = require('../router');
const { exec } = require('child_process');
const songData = require('../static/data/song.json');
const httpProxyMiddleware = require('http-proxy-middleware');
const app = express();
const serverPort = 8088;
const proxyTable = config.dev.proxyTable;
const url = 'http://localhost:' + serverPort;

// config express router
router(express, app, songData);

// config exress server proxy
Object.keys(proxyTable).forEach(ctx => {
  let options = proxyTable[ctx];
  if(typeof options === 'string') {
    options = { target: options }
  }
  app.use(httpProxyMiddleware(options.filter || ctx, options));
});

// static path config
const basePath = path.join(__dirname, '../dist');
app.use('/', express.static(basePath));

// listen express server port
const startServer = port => {
  app.listen(port, () => {
    console.log('server start at ' + url);
    opn(url);
  });
}

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
      if(addressPort && Number(addressPort) === serverPort) {
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
      startServer(serverPort);
    });
  }
  else {
    startServer(serverPort);
  }
});