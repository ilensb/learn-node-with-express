
var express = require('express');
var app = express();
var bodyParser = require("body-parser");


app.use(express.static(__dirname + "/public"));

app.use('/', function(req, res, next){
console.log(`${req.method} ${req.path} - ${req.ip}`);
next();
});


app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.json( {time: req.time} );
});

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


console.log("Hello World");

// app.get('/', function(req, res) {
//   res.send("Hello Express");
// });

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


app.get('/json', function(req, res) {
  if(process.env.MESSAGE_STYLE === 'uppercase') {
      res.json({"message": "HELLO JSON"});
    } 
        res.json({"message": "Hello json"});
});


app.get('/:word/echo', function(req, res) {
  var word = req.params.word;
  res.json( {echo: word} );
});

app.route('/name').get(function(req, res) {
   var first = req.query.first;
   var last = req.query.last;
   var jsonObj = {name: first + ' ' + last};
   res.send(jsonObj);
 }).post(function(req, res) {
  // Handle the data in the request
  var firstName = req.body.first;
  var lastName = req.body.last;
  res.send({"name": firstName + " " + lastName})
});

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
