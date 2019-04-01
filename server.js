const express = require("express");
const app = express();

const serverDb = require('./controller/ServerDB');
const loginvr = require('./controller/Login');

serverDb.createServer(4000);

app.use('/api', require('./routes'));

module.exports = app;