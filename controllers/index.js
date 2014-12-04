'use strict';

var path     = require('path'),
    sessions = require(path.resolve('.', 'lib/sessions-manager'));

var methods = {
        handleRequest: function (req, res) {
            sessions
                .get(req, 'github-token')
                .then(success, error);

            function success (token) {
                res.redirect('/profile');
            };

            function error (err) {
                console.error(err);
                res.render('home/index', {
                    name: 'Home'
                });
            };
        }
    };

module.exports = function (router) {
    router.get('/', methods.handleRequest);
};
