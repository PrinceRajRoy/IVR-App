var express = require('express');
var help = require('./call');
var app = express();

app.get('/', function(req,res){
    res.header('Content-type','text/xml');
    res.send(help.getResponse(req));
});

app.listen(80);