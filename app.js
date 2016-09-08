'use strict'

var dbFile = require('./db');

//Create database
dbFile.initDB();

//Insert User
dbFile.insertUser('John', 'JMelka', 'ABC123', 'JMelka@Test.com');
dbFile.insertUser('Haritha', 'Haritha_Profile', 'ABC123', 'Haritha@Test.com');

//Insert Tweet
dbFile.insertTweet('John', 'Hello World');
dbFile.insertTweet('Haritha', 'Hello World 2');

dbFile.updateUser('JOHN', 'JMelka@Test.com');

var userId = 20;

//get user id
dbFile.getUserId('John', cbUserId);



function cbUserId(err, result){
    if (err) {
        console.log(err);
    } else {
        console.log("TheUserId: " + result);
        userId = result;
    }

}
