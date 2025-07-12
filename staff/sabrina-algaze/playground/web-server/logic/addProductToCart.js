const { data } = require('../data/index')

const addProductToCart = (id) => {
    if (typeof id !== 'string') throw new TypeError('Invalid id type')

    const cart = data.loadCart()

    cart.push(id)

    return cart
}

module.exports = { addProductToCart }