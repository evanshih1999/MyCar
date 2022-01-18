import express from 'express'
import cors from 'cors'
import http from 'http'
import connectMongoDB from './mongo.js'
import router from './routes/api.js'
import bodyParser from 'body-parser';
import wssConnect from './wssConnect.js'
import WebSocket from 'ws'

const app = express()
const server = http.createServer(app)
const {wss, sendFile} = wssConnect(server)

/*const client = new WebSocket('ws://172.20.10.3:8080')
client.onmessage = (byteString) => {
  const { data } = byteString
  const buff = Buffer.from(data, 'base64')
  sendFile(buff)
}*/

// connect database
const db = connectMongoDB()

db.once('open', () => {
  wss.on('connection', (ws) => {
    ws.onmessage = async (byteString) => {
      const { data } = byteString
      const task = JSON.parse(data)
      if (task.info=='getImage') {
        sendFile()
      }
    }
  })
  const PORT = process.env.port || 4000

  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
})


// init middleware
app.use(cors())
app.use(bodyParser.json())

// define routes
app.use('/api', router)

// define server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})