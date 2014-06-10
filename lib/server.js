var http = require('http'),
    cons = require('consolidate'),
    express = require('express'),
    compress = require('compression'),
    favicon = require('serve-favicon'),
    helpers = require('./helpers'),
    router = require('./route/route'),
    logger = require('morgan');

var appRoot = process.cwd();

module.exports = function createServer(app, io) {

    initAppConfig(app);

    initMiddleware(app);

    initRoute(app, io);
    
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
function initRoute(app, io) {
    app.use('/api', require('./route/api')(app, io));
    app.use('/', router.router);
}
