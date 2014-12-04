'use strict';

var path     = require('path'),
    sessions = require(path.resolve('.', 'lib/sessions-manager'));

module.exports = function (router) {
    router.get('/', function (req, res) {
        sessions
            .get(req, 'github-token')
            .then(success, error)

        function success (token) {
            res.render('home/index', {
                name: 'Test',
                token: token
            });
        };

        function error (err) {
            res.render('home/index', {
                name: 'Test',
                token: false
            });  
        };
    });
};
