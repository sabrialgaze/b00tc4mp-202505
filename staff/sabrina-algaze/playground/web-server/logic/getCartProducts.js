const { data } = require('../data/index.js')

const getCartProducts = (userId) => {
    if (typeof userId !== 'string') throw new TypeError('Invalid userId type')
    const cameras = data.loadCameras()
    const carts = data.loadCarts()

    const cart = carts.find(cart => cart.owner === userId)

    const items = cart.items.map(id => cameras.find(camera => camera.id === id))

    return items
}

module.exports = { getCartProducts }