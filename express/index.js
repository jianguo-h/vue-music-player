const path = require('path');
const proxy = require('./proxy')
const router = require('./router');
const express = require('express');
const config = require('../config');
const historyMode = require('./history-mode');
const detectionPort = require('./detection-port');

const app = express();
const serverPort = config.prod.port;

// config express router
router(app);

// config history mode
historyMode(app);

// config exress server proxy
proxy(app);

// static path config
const distPath = path.join(__dirname, '../dist');
app.use('/', express.static(distPath));

// 端口检测
detectionPort(app, serverPort);