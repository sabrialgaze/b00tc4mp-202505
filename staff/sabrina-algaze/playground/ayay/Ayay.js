global.Ayay = function Ayay() {
    if (arguments.length === 1 && typeof arguments[0] === 'number'){
        this.length = arguments[0]
    } else {
        this.length = arguments.length
        for (let i = 0; i < arguments.length; i++) {
            this[i] = arguments[i]
        }
    }       
}