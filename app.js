'use strict'

var dbFile = require('./db');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Create database
//dbFile.initDB();


app.use(express.static('public'));

//create User
app.get('/createUser.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "createUser.htm" );
})

app.post('/insertUser', urlencodedParser, function (req, res) {

var user = {};

   // Prepare output in JSON format
   user = {
       name:req.body.name,
       profile:req.body.profile,
       password:req.body.password,
       loginName:req.body.loginName
   };

   dbFile.insertUser(user.name, user.profile, user.password, user.loginName);
//    console.log(JSON.parse(JSON.stringify(user)));
//    console.log(JSON.stringify(user));

   res.end("User Added!: " + JSON.stringify(user));
})

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);

})


//Get User Id
app.get('/getUser.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "getUser.htm" );
})

app.post('/getUserId', urlencodedParser, function (req, res) {

var userName = {};

// Prepare output in JSON format
userName = {
    name: req.body.name,
};

dbFile.getUserId(userName.name, function (err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log("TheUserId: " + result);

        //app.get('/responsePage.htm', function (req, res) {
        // res.sendFile( __dirname + "/" + "responsePage.htm" );
        res.end("User Id: " + result);


    }

});

    //res.redirect('/responsePage.htm');
    
   //res.end("User Name: " + JSON.stringify(userName));
})



//Insert User
//dbFile.insertUser('John', 'JMelka', 'ABC123', 'JMelka@Test.com');
//dbFile.insertUser('Haritha', 'Haritha_Profile', 'ABC123', 'Haritha@Test.com');

// //Insert Tweet
// dbFile.insertTweet('John', 'Hello World');
// dbFile.insertTweet('Haritha', 'Hello World 2');

// dbFile.updateUser('JOHN', 'JMelka@Test.com');

// var userId = 20;

// //get user id
// dbFile.getUserId('John', cbUserId);




