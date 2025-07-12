const { data } = require('../data/index')

const filterProductsByTag = (tag) => {
    const cameras = data.loadCameras()

    const filteredCameras = cameras.filter(camera => camera.tags.includes(tag))

    return filteredCameras
}

module.exports = { filterProductsByTag }