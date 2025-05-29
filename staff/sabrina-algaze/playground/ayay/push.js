import './Ayay.js'

Ayay.prototype.push = function () {
    for (let i = 0; i < arguments.length; i++){
        this[this.length] = arguments[i]
        this.length++
    } 
    return this.length
}
