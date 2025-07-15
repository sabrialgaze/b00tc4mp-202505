const { data } = require('../data/index')

const addProductToCart = (userId, productId) => {
    if (typeof userId !== 'string') throw new TypeError('Invalid userId type')
    if (typeof productId !== 'string') throw new TypeError('Invalid productId type')

    const users = data.loadUsers()
    const carts = data.loadCarts()

    const user = users.find(user => user.id === userId)
    if (!user) throw Error('user not found')

    let cart = carts.find(cart => cart.owner === userId)

    if (!cart) {
        cart = { owner: userId, items: [] }
        carts.push(cart)
    }

    cart.items.push(productId)

    data.saveCarts(carts)
}

module.exports = { addProductToCart }