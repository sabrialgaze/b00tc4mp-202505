const { data } = require('../data/index')

const filterProductsByTag = (tag) => {
    if (typeof tag !== 'string') throw new TypeError('Invalid tag type')

    const cameras = data.loadCameras()

    const filteredCameras = cameras.filter(camera => camera.tags.includes(tag))

    return filteredCameras
}

module.exports = { filterProductsByTag }