const cameras = require('./cameras.json')
let cartJSON = '[]'
let usersJSON = '[]'

const data = {
    loadCameras() {
        return cameras
    },
    loadCart() {
        return JSON.parse(cartJSON)
    },
    saveCart(cart) {
        cartJSON = JSON.stringify(cart)
    },
    loadUsers() {
        return JSON.parse(usersJSON)
    },
    saveUsers(users) {
        usersJSON = JSON.stringify(users)
    }
}

module.exports = { data }