'use strict';

var path   = require('path'),
    github = require('octonode'),
    config = require(path.resolve('.', 'app.json'));

var url = github.auth.config({
        id: config['github']['client_id'],
        secret: config['github']['client_secret']
    }).login(['user', 'repo', 'gist']);

var state = url.match(/&state=([0-9a-z]{32})/i);

module.exports = {
    github: github,
    url: url,
    state: state
};
