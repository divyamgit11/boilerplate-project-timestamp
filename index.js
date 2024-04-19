// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api',(req,res)=>{
  const date = new Date();
  res.json({"unix": Math.floor(date.getTime() / 1000.0),"utc": date.toUTCString()});
})
// your first API endpoint... 
app.get("/api/:id", function(req, res) {
  const id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id);
  const date = new Date(id)
  if (date == "Invalid date"){
    res.json({error:date});
  }
  else{
    res.json({"unix": Math.floor(date.getTime() / 1000.0),"utc": date.toUTCString()});
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
