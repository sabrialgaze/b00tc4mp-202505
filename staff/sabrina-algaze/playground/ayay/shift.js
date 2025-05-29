import './Ayay.js'

Ayay.prototype.shift = function () {
    if (this.length === 0) return undefined

    const deleted = this[0]

    for (let i = 0; i < this.length - 1; i++){
        this[i] = this[i + 1]
    }

    delete this[this.length -1]
    
    this.length--

    return deleted
}