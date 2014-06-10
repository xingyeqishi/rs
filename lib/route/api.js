var Q = require('q'),
    express = require('express'),
    spawn = require('child_process').spawn,
    router = express.Router();

function execNpmInstall(name, io) {
    var deferred = Q.defer();
    var install = spawn('npm', ['install', name], {
        cwd: process.cwd() 
    });

    install.stdout.on('data', function(data) {
        //console.log(data.toString());
    });
    install.stderr.on('data', function(data) {
        io.emit('npm install', {data :data.toString()});
    });

    install.on('close', function(code) {
        console.log('close');
        io.emit('npm finish', {data: '下载完成'});
        deferred.resolve(true);
    });
    return deferred.promise;
}
module.exports = function(app, io) {

    router.get('/:name', function(req, res, next) {
        res.render('add.handlebars', { title: '第三方资源平台'});
        setTimeout(function() {
        execNpmInstall(req.params.name, io).then(function(data) {
            console.log('end');
        });
        }, 1000);
    });
    return router;
};
