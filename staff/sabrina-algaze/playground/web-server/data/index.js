const cameras = require('./cameras.json')
let cartsJSON = '[]' // '[ {"owner": "123", "items": ["a", "b", "c"] }, ...]'
let usersJSON = '[ {"id": "abc123", "name": "Pepito Grillo", "email": "pepito@grillo.com", "username": "pepitogrillo", "password": "pepito123"} ]' // '[ {"id": "123", "name": "Pepito Grillo", ... }, ...]'

const data = {
    loadCameras() {
        return cameras
    },
    loadCarts() {
        return JSON.parse(cartsJSON)
    },
    saveCarts(carts) {
        cartsJSON = JSON.stringify(carts)
    },
    loadUsers() {
        return JSON.parse(usersJSON)
    },
    saveUsers(users) {
        usersJSON = JSON.stringify(users)
    }
}

module.exports = { data }