const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

const net = require('net')
const Promise = require('bluebird')

const app = express()

// Allow express to parse the body of the requests.
app.use(bodyParser.json())

// Simple session handling with a hash of sessions.
const SERVER_HOST = 'localhost'
const serverNumber = process.argv[2] || 0
const serverPort = 5000 + parseInt(serverNumber)

app.listen(serverPort, function () {
  console.log(`${serverNumber}: Server listening on port ${serverPort}.`)
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Headers', "*")
  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
})

// check if server is running and accepting connections
const checkConnection = (host, port, timeout) => {
  return new Promise(function (resolve, reject) {
    timeout = timeout || 10000 // default of 10 seconds
    const timer = setTimeout(function () {
      reject('timeout')
      socket.end()
    }, timeout)
    const socket = net.createConnection(port, host, function () {
      clearTimeout(timer)
      resolve()
      socket.end()
    })
    socket.on('error', function (err) {
      clearTimeout(timer)
      reject(err)
    })
  })
}

checkConnection(SERVER_HOST, serverPort).then(() => {
  console.log(`${SERVER_HOST} on port ${serverPort}: success`)
}, error => {
  console.log(`${SERVER_HOST} on port ${serverPort}: ${error}`)
})


// Query servers loads.
// app.get('/server-loads', (req, res) => {
//   const loads = sessions[req.query.session]
//   console.log(`${serverNumber}: get loads for session ${req.query.session}`, loads)
//   res.json(loads)
// })

// Configure servers loads.
// app.put('/server-loads', (req, res) => {
//   const loads = req.body
//   console.log(`${serverNumber}: set loads for session ${req.query.session}`, loads)
//   sessions[req.query.session] = loads
//   res.status(201)
//   res.json(loads)
// })


app.get('/images/*', function (req, res) {
  console.log(`${serverNumber}: get image`, req.path)
  const file = `.${req.path.replace('images', `images_${serverNumber}`)}`
  console.log(file)
  const fileStream = fs.createReadStream(file)
  fileStream.on('open', function () {
    res.set('Content-Type', 'image/jpg')
    fileStream.pipe(res)
  })
  fileStream.on('error', function () {
    res.set('Content-Type', 'text/plain')
    res.status(404).end('Not found')
  })
})
