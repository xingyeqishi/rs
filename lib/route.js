var express = require('express'),
    fs = require('fs'),
    router = express.Router(),
    Q = require('q'),
    appRoot = process.cwd();

module.exports = function() {

    router.get('/resources/:name', function(req, res, next) {
        fs.readdir(appRoot + req.url, function(err, data) {
            var tar = {};
            var result = data.filter(function(item) {
                var reg = /^\d[\S]*$/;
                return reg.test(item);
            });
            result = result.map(function(version) {
                return readDir(appRoot + req.url + '/' + version, version);
            });
            Q.all(result).then(function(data) {
                console.log(data);
                res.render('reslist.handlebars', { title: '第三方资源平台', data: data });
            });
        });
    });

    router.get('/', function(req, res, next) {
        fs.readdir(appRoot + '/resources', function(err, data) {
            var result = data.filter(function(item) {
                var reg = /^\w+$/;
                return reg.test(item);
            });
            result = result.map(function(item) {
                return {
                    title: item,
                    url: item 
                }
            });
            res.render('index.handlebars', { title: '第三方资源平台', data: result });
        });
    });
    return router;
}
/**
 * 读取目录
 */
function readDir(path, version) {
    var deferred = Q.defer();
    fs.readdir(path, function(err, data) {
        var tarData = {version: version};

        if (err) {
            defer.resolve(new Error(err));
        }
        tarData.files = excludeDotFile(data);
        deferred.resolve(tarData);
    });
    return deferred.promise;
}
/**
 *
 */
function excludeDotFile(filesArr) {
    var reg = /^[^\.]+/;
    filesArr = filesArr.filter(function(item) {
        return reg.test(item);
    });
    return filesArr;
}
