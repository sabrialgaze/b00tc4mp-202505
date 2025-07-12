const cameras = require('./cameras.json')
const cart = []

const data = {
    loadCameras() {
        return cameras
    },
    loadCart() {
        return cart
    }
}

module.exports = { data }