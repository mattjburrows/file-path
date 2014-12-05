'use strict';

(function () {
    angular
        .module('app.repos')
        .factory('RepoFactory', []);

    function RepoFactory () {
        function RepoModel (data) {
            this.id = data.id;
            this.name = data.name;
            this.html_url = data.html_url;

            return this;
        };

        return RepoModel;
    };
})();
