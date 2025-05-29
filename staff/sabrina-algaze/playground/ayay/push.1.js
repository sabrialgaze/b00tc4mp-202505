import './Ayay.js'

Ayay.prototype.push = function (value) {
    this[this.length] = value
    this.length++
    
    return this.length
}
