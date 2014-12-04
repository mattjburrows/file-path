'use strict';

var path     = require('path'),
    sessions = require(path.resolve('.', 'lib/sessions-manager'));

module.exports = function (router) {
    router.get('/', function (req, res) {
        sessions
            .destroyAll(req)
            .then(success, error);

        function success () {
            res.redirect('/');
        };

        function error (err) {
            console.error(err);
        };
    });
};
