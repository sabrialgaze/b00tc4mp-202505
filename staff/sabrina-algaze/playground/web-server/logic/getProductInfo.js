const { data } = require('../data/index')

const getProductInfo = (id) => {
    const cameras = data.loadCameras()

    const item = cameras.find(camera => camera.id === id)

    return item
}

module.exports = { getProductInfo }
