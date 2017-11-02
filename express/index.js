const opn = require('opn');
const path = require('path');
const express = require('express');
const config = require('../config');
const router = require('../router');
const songData = require('../static/data/song.json');
const httpProxyMiddleware = require('http-proxy-middleware');
const app = express();
const serverPort = 8088;
const proxyTable = config.dev.proxyTable;
const url = 'http: //localhost:' + serverPort;

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
app.listen(serverPort, () => {
    console.log('server start at ' + url);
    opn(url);
});