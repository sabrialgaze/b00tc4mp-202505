const { data } = require('../data/index.js')

const getCartProducts = () => {
    const cameras = data.loadCameras()
    const cart = data.loadCart()

    const items = cart.map(id => cameras.find(camera => camera.id === id))

    return items
}

module.exports = { getCartProducts }