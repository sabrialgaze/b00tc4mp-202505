export function Ayay() {
    this.length = arguments.length

    for (let i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
    }
}