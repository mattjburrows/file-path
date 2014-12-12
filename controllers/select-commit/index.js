'use strict';

var path     = require('path'),
    q        = require('q'),
    octonode = require(path.resolve('.', 'lib/github')),
    sessions = require(path.resolve('.', 'lib/sessions-manager')),
    config   = require(path.resolve('.', 'app.json'));

var methods = {
        getSelectedRepository: function (repo) {
            var defer = q.defer();

            repo.commits(function (err, commits) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(commits);
                }
            });

            return defer.promise;
        },
        handleRequest: function (req, res) {
            sessions
                .get(req, 'github-token')
                .then(success, error);

            function success (token) {
                var repoName = req.body['pr-repository'],
                    repo;
                if (repoName) {
                    repo = octonode.github.client(token).repo(config.github.base_repository);

                    methods.getSelectedRepository(repo).done(function (commits) {
                        console.log('COMMITS: ', commits);
                        res.render('select-commit/index', {
                            commits: commits
                        });
                    });
                } else {
                    error('No repository selected');
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
