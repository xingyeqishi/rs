var express = require('express');
var app = express();
require('./lib/server.js')(app);
app.listen(3000);
