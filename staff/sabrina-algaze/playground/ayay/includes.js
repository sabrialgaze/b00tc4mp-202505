import './Ayay.js'

Ayay.prototype.includes = function (searchElement, fromIndex = 0) {
    for (let i = fromIndex < 0 ? this.length + fromIndex : fromIndex; i < this.length; i++)
        if (this[i] === searchElement || Number.isNaN(this[i])) return true
    return false
}