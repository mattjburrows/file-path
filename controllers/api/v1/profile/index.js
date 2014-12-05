'use strict';

var path     = require('path'),
    q        = require('q'),
    octonode = require(path.resolve('.', 'lib/github')),
    sessions = require(path.resolve('.', 'lib/sessions-manager'));

var methods = {
        getUser: function (client) {
            var defer = q.defer();

            client.info(function (err, user) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(user);
                }
            });

            return defer.promise;
        },
        getUserRepos: function (client) {
            var defer = q.defer();

            client.repos(function (err, repos) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(repos);
                }
            });

            return defer.promise;
        },
        handleRequest: function (req, res) {
            sessions
                .get(req, 'github-token')
                .then(success, error);

            function success (token) {
                var client = octonode.github.client(token).me();
                q
                    .all([methods.getUser(client), methods.getUserRepos(client)])
                    .done(function (data) {
                        res.set('Content-Type', 'text/json');
                        res.status(201);
                        res.send({
                            user: data[0],
                            repos: data[1]
                        });
                    });
            };

            function error (err) {
                console.error(err);
                res.set('Content-Type', 'text/json');
                res.status(500);
                res.send({
                    message: 'There was a problem returning the User and Repository data'
                });
            };
        }
    };

module.exports = function (router) {
    router.get('/', methods.handleRequest);
};
