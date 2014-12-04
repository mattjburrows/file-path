'use strict';

var q       = require('q'),
    methods = {
        setSession: function (req, key, value) {
            var defer = q.defer();

            if (arguments.length === 3) {
                req.session[key] = value;
                defer.resolve(req.session[key]);
            } else {
                defer.reject('Make sure you pass the request object, session key and session value');   
            }

            return defer.promise;
        },
        getSession: function (req, key) {
            var defer = q.defer();

            if (req && req.session[key]) {
                defer.resolve(req.session[key]);
            } else {
                defer.reject('Session ' + key + ' doesn\'t exist');
            }

            return defer.promise;
        },
        getAllSessions: function (req) {
            var defer = q.defer();

            if (req && req.session) {
                defer.resolve(req.session);   
            } else {
                defer.reject('Make sure you pass the request object');
            }

            return defer.promise;
        },
        destroySession: function (req, key) {
            var defer = q.defer();

            if (req && req.session[key]) {
                delete req.session[key];
                defer.resolve(req.session);
            } else {
                defer.reject('Session doesn\'t exist');
            }

            return defer.promise;
        },
        destroyAllSessions: function (req) {
            var defer = q.defer();

            if (req) {
                delete req.session;
                defer.resolve(req.session);
            } else {
                defer.reject('Make sure you pass the request object');
            }

            return defer.promise;
        }
    };

module.exports = {
    set: methods.setSession,
    get: methods.getSession,
    getAll: methods.getAllSessions,
    destroy: methods.destroySession,
    destroyAll: methods.destroyAllSessions
};
