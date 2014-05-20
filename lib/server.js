var http = require('http'),
    cons = require('consolidate'),
    express = require('express'),
    compress = require('compression'),
    favicon = require('serve-favicon'),
    helpers = require('./helpers'),
    logger = require('morgan');

var appRoot = process.cwd();

module.exports = function createServer(app) {

    initAppConfig(app);

    initMiddleware(app);

    initRoute(app);
    
    helpers();

    return app;
}
/**
 *
 */
function initAppConfig(app) {
    app.enable('view cache');
    app.enable('strict routing');
    app.enable('x-powered-by');
    app.engine('handlebars', cons.handlebars);
    app.set('view engine', '.handlebars'); 
    app.set('views', appRoot + '/views');
}
/**
 *
 */
function initMiddleware(app) {
    app.use(logger());
    app.use(compress());
    app.use(favicon(appRoot + '/public/favicon.ico'));
    app.use('/static', express.static(appRoot + '/public'));
}
/**
 *
 */
function initRoute(app) {
    app.use('/', require('./route.js')());
}
