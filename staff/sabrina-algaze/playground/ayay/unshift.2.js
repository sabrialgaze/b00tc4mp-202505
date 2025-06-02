import './Ayay.js'

Ayay.prototype.unshift = function (value) {
    for (let i = this.length - 1; i >= 0 ; i--){
        this[i + 1] = this[i]
    }
    for (let i = 0; i < arguments.length; i++){
        this[i] = arguments[i]
        this.length++
    }
    
    return this.length
}
