'use strict';

(function () {
    angular
        .module('app.users')
        .factory('UserFactory', []);

    function UserFactory () {
        function UserModel (data) {
            this.id = data.id;
            this.login = data.login;
            this.avatar_url = data.avatar_url;

            return this;
        };

        return RepoModel;
    };
})();
