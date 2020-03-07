'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(express.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded



console.log(`Connecting DB to ${process.env.DATABASE_URI}` )
mongoose.connect(process.env.DATABASE_URI, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}); 


function simpleRequestLogger(req, resp, next){
	var time = (new Date()).toUTCString();
  console.log(`[${time}] req.method='${req.method}' req.path='${req.path}' req.ip='${req.ip}'`);
  console.log(`[${time}] req.body='${JSON.stringify(req.body)}'`);
  next();
}

app.use(simpleRequestLogger);

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


const getCurrentSequenceValue = require("./shorturl-dao.js").getCurrentSequenceValue;
const getShortUrl = require("./shorturl-dao.js").getShortUrl;


app.post("/api/shorturl/new", function(req, res){

	if(!req.body && !req.body.url){
		res.send({error: "invalid URL"})
		return;
	}

	getShortUrl(req.body.url).then((result)=>{
		res.send(result);
	})

})


app.get("/checkConnection", function(req, res){
	getCurrentSequenceValue((err, data)=>{
		console.log(`got data back ${err} ${data}`)
		res.send(data);
	});
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

