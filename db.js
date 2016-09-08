'use strict'
//var express = require('express');
//var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Twitter.db');


//initDB(db);

function initDB() {
    db.serialize(function () {
        //User table
        db.run("CREATE TABLE User (Name TEXT, Follower_Cnt INT)");

        //Tweet table
        db.run("CREATE TABLE Tweet (UserId INT, Msg TEXT, Insrt_TS DATETIME DEFAULT CURRENT_TIMESTAMP)");

    });
}

function insertTweet(msg) {
    db.each("SELECT rowid as Id FROM User where Name = 'John'", function (err, row) {
        if (err) {
            console.log(err);
        } else {
            var stmt = db.prepare("INSERT INTO Tweet (UserId, Msg) VALUES (?, ?)");
            stmt.run(row.Id, msg);
            stmt.finalize();
        }
    });

}

// function getTweet(db){

// }

// function updateTweet(db){

// }

// function deleteTweet(db){

// }

function insertUser(name, fcnt) {
    var stmt = db.prepare("INSERT INTO User (Name, Follower_Cnt) VALUES (?, ?)");
    stmt.run(name, fcnt);
    stmt.finalize();
}

function getUser() {
    return new Promise(function (resolve, reject) {
        db.all("SELECT rowid as Id, Name AS Name, Follower_Cnt AS Follower_Cnt FROM User", function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });
    });

}

function getUserId(userId) {
    var stmt = "SELECT rowid as Id FROM User where Name = ?";
    db.each(stmt, userId, function (err, row) {
        if (err) {
            console.log(err);
        } else {
            console.log("RowId = " + row.Id);

            var userId = row.Id;
            //var msg = 'Hello';
            console.log("UserId = " + userId);
            return userId;
        }
    });
}


// function updateUser(db){

// }

// function deleteUser(db){

// }


//db.close();
exports.initDB = initDB;
exports.insertUser = insertUser;
exports.insertTweet = insertTweet;
exports.getUserId = getUserId;