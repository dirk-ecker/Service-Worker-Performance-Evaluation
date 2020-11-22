const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
var net = require('net');
var Promise = require('bluebird');

const app = express();

// Simple session handling with a hash of sessions.
// const sessions = {};

// Allow express to parse the body of the requests.
app.use(bodyParser.json());

// Simple session handling with a hash of sessions.
const sessions = {};
const SERVER_HOST = 'localhost'
const serverNumber = process.argv[2] || 0
const serverPort = 5000 + parseInt(serverNumber)

app.listen(serverPort, function () {
    console.log(`${serverNumber}: Server listening on port ${serverPort}.`)
  })

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  })



// check if server is running and accepting connections
function checkConnection(host, port, timeout) {
    return new Promise(function(resolve, reject) {
        timeout = timeout || 10000;     // default of 10 seconds
        var timer = setTimeout(function() {
            reject("timeout");
            socket.end();
        }, timeout);
        var socket = net.createConnection(port, host, function() {
            clearTimeout(timer);
            resolve();
            socket.end();
        });
        socket.on('error', function(err) {
            clearTimeout(timer);
            reject(err);
        });
    });
}
checkConnection(SERVER_HOST, serverPort).then(function() {
    console.log(SERVER_HOST + "on port" + serverPort + ":success");
}, function(err) {
    console.log(SERVER_HOST+" on port " + serverPort + err);
})


// Query servers loads.
app.get('/server-loads', (req, res) => {
    const loads = sessions[req.query.session]
    console.log(`${serverNumber}: get loads for session ${req.query.session}`, loads)
    res.json(loads)
  })
  
  // Configure servers loads.
  app.put('/server-loads', (req, res) => {
    const loads = req.body
    console.log(`${serverNumber}: set loads for session ${req.query.session}`, loads)
    sessions[req.query.session] = loads
    res.status(201)
    res.json(loads)
  })

  
app.get('/images/*', function (req, res) {
    console.log(`${serverNumber}: get image`, req.path)
    const file = `.${req.path.replace("images", `images_${serverNumber}`)}`
    console.log(file);
    const s = fs.createReadStream(file)
    s.on('open', function () {
      res.set('Content-Type', 'image/jpeg')
      s.pipe(res)
    })
    s.on('error', function () {
      res.set('Content-Type', 'text/plain')
      res.status(404).end('Not found')
    })
  })



