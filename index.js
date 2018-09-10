'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var router = express.Router();
var http = require('http').Server(app);
var unirest = require("unirest");

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/api/alexa", function(req, res) {

  var fnl_response = {
    'version': '1.0',
    'Content-Type': 'application/json',
    'response': {
      'outputSpeech': {
        'type': 'SSML',
        'ssml': ''
      },
      'sessionAttributes': '',
      'shouldEndSession': false
    }
  };

  if (typeof req.body.request.intent != "undefined") {
    if(typeof req.body.session.attributes != "undefined") {
      fnl_response.response.outputSpeech.ssml = '<speak>' + 'Current text - ' + req.body.request.intent.slots.EveryThingSlot.value + '. Previous text - ' + req.body.session.attributes.previousText + '</speak>';
    }
    fnl_response.sessionAttributes = {"previousText": req.body.request.intent.slots.EveryThingSlot.value};

  } else {
    fnl_response.response.outputSpeech.ssml = '<speak>' + "Hello there!" + '</speak>';
    fnl_response.sessionAttributes = {"previousText": ""};
  }

  res.json(fnl_response);

});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!')
});
