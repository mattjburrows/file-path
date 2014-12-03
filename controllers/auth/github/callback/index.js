'use strict';

var path     = require('path'),
    octonode = require(path.resolve('.', 'config/octonode'));

module.exports = function (router) {
    router.get('/', function (req, res) {
        if (!octonode.state || octonode.state[1] !== req.query.state) {
            res.writeHead(403, {
                'Content-Type' : 'text/plain'
            });
          res.end('');
        } else {
          octonode.github.auth.login(req.query.code, function (err, token) {
            console.log('LOGGED IN: ', arguments);
            req.session.githubToken = token;
            res.redirect('/profile');
          });
        }
    });
};
