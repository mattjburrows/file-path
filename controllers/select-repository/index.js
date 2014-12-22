'use strict';

var path     = require('path'),
    q        = require('q'),
    octonode = require(path.resolve('.', 'lib/github')),
    sessions = require(path.resolve('.', 'lib/sessions-manager')),
    config   = require(path.resolve('.', 'app.json'));

var methods = {
        getUser: function (user) {
            var defer = q.defer();

            user.info(function (err, user) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(user);
                }
            });

            return defer.promise;
        },
        getUserRepos: function (user) {
            var defer = q.defer();

            user.repos(function (err, repos) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(repos);
                }
            });

            return defer.promise;
        },
        getBaseRepositoryInfo: function (repo) {
            var defer = q.defer();

            repo.info(function (err, repo) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(repo);
                }
            });

            return defer.promise;
        },
        getBaseRepositoryBranch: function (repo) {
            var defer = q.defer();

            repo.branch('develop', function (err, repo) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(repo);
                }
            });

            return defer.promise;
        },
        getBaseRepositoryPRs: function (repo) {
            var defer = q.defer();

            repo.prs(function (err, prs) {
                if(err) {
                    defer.reject(err);
                } else {
                    defer.resolve(prs);
                }
            });

            return defer.promise;
        },
        handleRequest: function (req, res) {
            sessions
                .get(req, 'github-token')
                .then(success, error);

            function success (token) {
                var client = octonode.github.client(token),
                    user   = client.me(),
                    repo   = client.repo(config.github.base_repository);

                q
                    .all([
                        methods.getUser(user),
                        methods.getBaseRepositoryPRs(repo),
                        methods.getBaseRepositoryInfo(repo),
                        methods.getBaseRepositoryBranch(repo)
                    ])
                    .done(function (data) {
                        console.log(data[2]);
                        res.render('select-repository/index', {
                            user: data[0],
                            baseRepoPRs: data[1],
                            baseRepoInfo: data[2],
                            baseRepoBranch: data[3]
                        });
                    });
            };

            function error (err) {
                console.error(err);
                res.redirect('/');
            };
        }
    };

module.exports = function (router) {
    router.get('/', methods.handleRequest);
};
