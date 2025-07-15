const { data } = require('../data/index')

const getProductInfo = (id) => {
    if (typeof id !== 'string') throw new TypeError('Invalid id type')

    const cameras = data.loadCameras()

    const item = cameras.find(camera => camera.id === id)

    return item
}

module.exports = { getProductInfo }
