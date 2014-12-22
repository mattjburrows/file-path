'use strict';

var path     = require('path'),
    q        = require('q'),
    octonode = require(path.resolve('.', 'lib/github')),
    sessions = require(path.resolve('.', 'lib/sessions-manager')),
    config   = require(path.resolve('.', 'app.json'));

var Repository = function () {
    this.branchName = '';
};

Repository.prototype.pullRepository = function () {};

module.exports = Repository;