/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';

var path = require('path'),
    sessions = require(path.resolve('.', 'lib/sessions-manager'));

describe('Test session manager', function () {
    var req = {
            session: {
                test1: 'test1',
                test2: 'test2'
            }
        };

    it('Should set session', function (done) {
        sessions
            .set(req, 'test3', 'test3')
            .then(function (data) {
                done();
                expect(data).equals('test3');
            });
    });
    it('Should throw rejection when missing arguments', function (done) {
        sessions
            .set(req, 'test3')
            .then(function () {}, function (err) {
                done();
                expect(err).equals('Make sure you pass the request object, session key and session value');
            });
    });

    it('Should get session', function (done) {
        sessions
            .get(req, 'test1')
            .then(function (data) {
                done();
                expect(data).equals('test1');
            });
    });
    it('Should throw error when key does\'t exist', function (done) {
        var key = 'test4';
        sessions
            .get(req, key)
            .then(function () {}, function (err) {
                done();
                expect(err).equals('Session ' + key + ' doesn\'t exist');
            });
    });

    it('Should get all sessions', function (done) {
        sessions
            .getAll(req)
            .then(function (data) {
                done();
                expect(Object.keys(data).length).equals(3);
            });
    });
    it('Should throw error when request not passed', function (done) {
        sessions
            .getAll()
            .then(function () {}, function (err) {
                done();
                expect(err).equals('Make sure you pass the request object');
            });
    });

    it('Should destroy session key', function (done) {
        sessions
            .destroy(req, 'test3')
            .then(function (data) {
                done();
                expect(Object.keys(obj).length).equal(2);
            });
    });
    it('Should throw error when key doesn\'t exist', function (done) {
        sessions
            .destroy(req, 'test3')
            .then(function () {}, function (err) {
                done();
                expect(err).equal('Session doesn\'t exist');
            });
    });

    it('Should destroy all sessions', function () {
        sessions
            .destroyAll(req)
            .then(function (data) {
                expect(data).equal(null);
            })
    });
    it('Should throw error when request not passed', function () {
        sessions
            .destroyAll()
            .then(function (err) {
                expect(data).equal(undefined);
            })
    });
});