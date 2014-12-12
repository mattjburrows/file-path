'use strict';

var path     = require('path'),
    octonode = require(path.resolve('.', 'lib/github')),
    sessions = require(path.resolve('.', 'lib/sessions-manager'));

module.exports = function (router) {
    router.get('/', function (req, res) {
        if (!octonode.state || octonode.state[1] !== req.query.state) {
            error('Token mismatch');
        } else {
            octonode.github.auth.login(req.query.code, function (err, token) {
                sessions
                    .set(req, 'github-token', token)
                    .then(success, error);
            });
        }

        function success (token) {
            res.redirect('/select-repository');
        };

        function error (err) {
            console.error(err);
            res.redirect('/');
        };
    });
};
