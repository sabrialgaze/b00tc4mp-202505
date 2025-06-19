import './Ayay.js'

Ayay.prototype.indexOf = function (searchElement, fromIndex = 0) {
    for (let i = fromIndex < 0 ? this.length + fromIndex : fromIndex; i < this.length; i++)
        if (this[i] === searchElement) return i

    return -1
}