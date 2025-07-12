const { data } = require('../data/index.js')

const searchProducts = query => {
    if (typeof query !== 'string') throw new TypeError('invalid query type')

    let cameras = data.loadCameras()

    cameras = cameras.filter(camera => camera.brand.toLowerCase() === query.toLowerCase())

    return cameras
}

module.exports = { searchProducts }