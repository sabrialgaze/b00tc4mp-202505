const express = require('express')
const { data } = require('./data/index.js')

const server = express()

server.get('/', (request, response) => {
    response.send('Hello, World!')
})

server.get('/search', (request, response) => {
    const { q } = request.query

    let cameras = data.loadCameras()

    //TODO filter cameras according to query (q)
    cameras = cameras.filter(camera => camera.brand.toLowerCase() === q.toLowerCase())

    response.send(cameras.map(camera => {
        return `<ul>
        <li>Brand: ${camera.brand}</li>
        <li>Model: ${camera.model}</li>
        <li>Type: ${camera.type}</li>
        <li>Film format: ${camera.film_format}</li>
        <li>Year: ${camera.year}</li>
        </ul>`
    }).join(''))
})

server.listen(8080, () => console.log('Server is up on port 8080'))