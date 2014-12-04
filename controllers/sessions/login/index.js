'use strict';

var path     = require('path'),
    octonode = require(path.resolve('.', 'lib/github'));

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.writeHead(301, {
            'Content-Type' : 'text/plain',
            'Location'     : octonode.url
        });
        res.end('Redirecting to ' + octonode.url);
    });
};
