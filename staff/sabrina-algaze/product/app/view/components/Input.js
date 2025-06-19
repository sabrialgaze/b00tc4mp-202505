function Input(id, type, pattern) {
    Component.call(this, document.createElement('input'))

    this.container.id = id

    this.container.type = type

    if (pattern) {
        this.container.pattern = pattern
    }
}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

Input.prototype.getValue = function () {
    return this.container.value
}