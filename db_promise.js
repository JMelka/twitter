'use strict'
//var express = require('express');
//var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Twitter.db');


initDB(db);

function initDB(db) {
    db.serialize(function () {
        //User table
        db.run("CREATE TABLE User (Name TEXT, Follower_Cnt INT)");

        //Tweet table
        db.run("CREATE TABLE Tweet (UserId INT, Msg TEXT, Insrt_TS DATETIME DEFAULT CURRENT_TIMESTAMP)");

        //Insert User
        insertUser(db, 'John', 6);

        //Get User
        getUser(db).then(
            (val) => {
                return insertTweet(db, 'Hello');
            }
        ).then(

        ).catch(
            (err) => {
                
            }
        );


        //Insert Tweet
        insertTweet(db, 'Hello');

        //db.close();

        // db.each("SELECT rowid as Id FROM User where Name = 'John'", function (err, row) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //     console.log("RowId = " + row.Id);


        //     var userId = row.Id;
        //     var msg = 'Hello';
        //     console.log("UserId = " + userId);
        //     insertTweet(db, userId, msg)
        //     console.log("UserId = " + userId);

        //     }
        // });
        //var userId = getUserId(db);
        //console.log("UserIdafterCall = " + userId);

        // db.each("SELECT rowid as Id, UserId AS UserId, Msg AS Msg, Insrt_TS AS Insrt_TS FROM Tweet", function (err, row) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log(row.Id + " - UserId:" + row.UserId + ", Message:" + row.Msg + ", TS:" + row.Insrt_TS);
        // });
    });
}

function insertTweet(db, msg) {
    db.each("SELECT rowid as Id FROM User where Name = 'John'", function (err, row) {
        if (err) {
            console.log(err);
        } else {
            console.log("RowId = " + row.Id);

            console.log("UserIdinsertTweet = " + row.Id);
            var stmt = db.prepare("INSERT INTO Tweet (UserId, Msg) VALUES (?, ?)");
            stmt.run(row.Id, msg);
            stmt.finalize();
        }
    });
    //var userId = getUserId(db);

}

// function getTweet(db){

// }

// function updateTweet(db){

// }

// function deleteTweet(db){

// }



function insertUser(db, name, fcnt) {
    var stmt = db.prepare("INSERT INTO User (Name, Follower_Cnt) VALUES (?, ?)");
    stmt.run(name, fcnt);
    stmt.finalize();
}

function getUser(db) {
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

function getUserId(db) {
    db.each("SELECT rowid as Id FROM User where Name = 'John'", function (err, row) {
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

   // insertTweet(db, userId, msg)


