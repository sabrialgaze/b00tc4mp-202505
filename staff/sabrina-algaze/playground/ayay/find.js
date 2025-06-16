import './Ayay.js'

Ayay.prototype.find = function (callback) {
    if (!callback) throw new TypeError('undefined is not a function')

    for (let index = 0; index < this.length; index++) {
        const element = this[index]

        if (callback(element, index, this)) return element
    }
}

