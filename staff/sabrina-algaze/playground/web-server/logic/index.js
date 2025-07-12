const { searchProducts } = require('./searchProducts')
const { getCartProducts } = require('./getCartProducts')
const { addProductToCart } = require('./addProductToCart')
const { getProductInfo } = require('./getProductInfo')
const { filterProductsByTag } = require('./filterProductsByTag')

const logic = {
    searchProducts,
    getCartProducts,
    addProductToCart,
    getProductInfo,
    filterProductsByTag
}

module.exports = { logic }