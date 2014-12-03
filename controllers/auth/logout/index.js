'use strict';

module.exports = function (router) {
    router.get('/', function (req, res) {
        req.session.githubToken = null;
        res.redirect('/');
    });
};
