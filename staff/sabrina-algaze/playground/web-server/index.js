const express = require('express')
const { data } = require('./data/index.js')

const server = express()

server.get('/', (request, response) => {
    response.send('Hello, World!')
})

server.get('/search', (request, response) => {
    const { q } = request.query

    const cameras = data.loadCameras()

    //TODO filter cameras according to query (q)

    response.send(cameras)
})

server.listen(8080, () => console.log('Server is up on port 8080'))