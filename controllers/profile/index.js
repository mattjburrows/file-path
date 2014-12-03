'use strict';

var path     = require('path'),
    octonode = require(path.resolve('.', 'config/octonode'));

module.exports = function (router) {
    router.get('/', function (req, res) {
        var token = req.session.githubToken || false,
            client;
        if (!token) {
            res.redirect('/');
            return;
        }
        client = octonode.github.client(token);
        client.get('/user', {}, function (err, status, body, headers) {
            console.log('/user: ', body);
            res.send('TESTING');
        });
    });
};
