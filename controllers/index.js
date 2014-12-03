'use strict';

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('home/index', {
            name: 'Test',
            token: req.session.githubToken || false
        });
    });
};
