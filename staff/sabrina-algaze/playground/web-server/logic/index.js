const { searchProducts } = require('./searchProducts')
const { getCartProducts } = require('./getCartProducts')
const { addProductToCart } = require('./addProductToCart')
const { removeProductFromCart } = require('./removeProductFromCart')
const { getProductInfo } = require('./getProductInfo')
const { getUserInfo } = require('./getUserInfo')
const { filterProductsByTag } = require('./filterProductsByTag')
const { registerUser } = require('./registerUser')
const { loginUser } = require('./loginUser')


const logic = {
    searchProducts,
    getCartProducts,
    addProductToCart,
    removeProductFromCart,
    getProductInfo,
    getUserInfo,
    filterProductsByTag,
    registerUser,
    loginUser
}

module.exports = { logic }