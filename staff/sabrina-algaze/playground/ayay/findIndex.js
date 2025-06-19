import './Ayay.js'

Ayay.prototype.findIndex = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(`${typeof callback}${callback !== undefined ? ` ${callback}` : ''} is not a function`)
    // if (typeof callback !== 'function') throw new TypeError((typeof callback) + (callback !== undefined ? ' ' + callback : '') + ' is not a function')

    for (let index = 0; index < this.length; index++) {
        const element = this[index]

        if (callback(element, index, this)) return index
    }
    return -1
}