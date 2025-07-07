const cameras = require('./cameras.json')

const data = {
    loadCameras() {
        return cameras
    }
}

module.exports = { data }