'use strict';

var path = require('path'),
    util = require('util'),
    passport = require('passport'),
    config = require(path.resolve('.', 'app.json')),
    GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: config['github_client_id'],
    clientSecret: config['github_client_secret'],
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}),
function (access, refresh, profile, done) {
    process.nextTick(function () {
        return done(null, profile);
    })
});

module.exports = function (router) {

    router.get('/', function (req, res) {
        
        res.render('home/index', {
            name: 'Test'
        });
        
    });

};
