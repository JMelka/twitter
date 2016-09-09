'use strict'

var db = require('../db');

//var chai = require('chai');

//var assert = chai.assert;

var assert = require('assert');

describe('getUserId', function () {
    it('should a user id', function () {
        var result = db.getUserId('name', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("TheUserIdTest: " + result);
                assert.equal(2, result);
            }

        });
    });
});



