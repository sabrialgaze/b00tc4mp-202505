const { data } = require('../data/index')
const { addProductToCart } = require('./addProductToCart')

const removeProductFromCart = (userId, productId) => {
    if (typeof userId !== 'string') throw new TypeError('Invalid userId type')
    if (typeof productId !== 'string') throw new TypeError('Invalid productId type')

    const users = data.loadUsers()
    const carts = data.loadCarts()

    const user = users.find(user => user.id === userId)
    if (!user) throw Error('user not found')

    let cart = carts.find(cart => cart.owner === userId)

    const productIndex = cart.items.indexOf(productId)

    if (productIndex < 0) throw Error('product not in cart')

    cart.items.splice(productIndex, 1)

    data.saveCarts(carts)
}

module.exports = { removeProductFromCart }