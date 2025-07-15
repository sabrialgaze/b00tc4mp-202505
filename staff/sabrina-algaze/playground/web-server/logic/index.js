const { searchProducts } = require('./searchProducts')
const { getCartProducts } = require('./getCartProducts')
const { addProductToCart } = require('./addProductToCart')
const { getProductInfo } = require('./getProductInfo')
const { filterProductsByTag } = require('./filterProductsByTag')
const { registerUser } = require('./registerUser')
const { loginUser } = require('./loginUser')


const logic = {
    searchProducts,
    getCartProducts,
    addProductToCart,
    getProductInfo,
    filterProductsByTag,
    registerUser,
    loginUser
}

module.exports = { logic }