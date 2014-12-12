'use strict';

(function () {
    angular
        .module('app.repos', [])
        .factory('RepoFactory', [RepoFactory]);

    function RepoFactory () {

        var apiUrl = '/api/v1/'

        function RepoModel (data) {
            this.id = data.id;
            this.name = data.name;
            this.html_url = data.html_url;
            this.fork = data.fork;

            return this;
        };

        return RepoModel;
    };
})();
