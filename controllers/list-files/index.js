'use strict';

var path     = require('path'),
    q        = require('q'),
    octonode = require(path.resolve('.', 'lib/github')),
    sessions = require(path.resolve('.', 'lib/sessions-manager')),
    config   = require(path.resolve('.', 'app.json'));

var methods = {
        getSelectedPR: function (pr) {
            var defer = q.defer();

            pr.files(function (err, files) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(files);
                }
            });

            return defer.promise;
        },
        handleRequest: function (req, res) {
            sessions
                .get(req, 'github-token')
                .then(success, error);

            function success (token) {
                var prNumber = req.body.pr,
                    pr;
                if (prNumber) {
                    pr = octonode.github.client(token).pr(config.github.base_repository, prNumber);

                    methods.getSelectedPR(pr).done(function (files) {
                        console.log("FILES: ", files);
                        res.render('list-files/index', {
                            files: files
                        });
                    });
                } else {
                    error('No pull request selected');
                }
            };

            function error (err) {
                console.error(err);
                res.redirect('/');
            };
        }
    };

module.exports = function (router) {
    router.post('/', methods.handleRequest);
};
