import './Ayay.js'

Ayay.prototype.pop = function () {
    if (this.length === 0) return undefined
    const deleted = this[this.length - 1]
    this[this.length - 1] = undefined
    this.length--
    return deleted
}
