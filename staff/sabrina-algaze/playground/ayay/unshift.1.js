import './Ayay.js'

Ayay.prototype.unshift = function (value) {
    for (let i = 1; i < this.length + 1; i++){
        this[i] = this[i - 1]
    }
    this[0] = arguments[0]
    this.length++
    
    return this.length
}
