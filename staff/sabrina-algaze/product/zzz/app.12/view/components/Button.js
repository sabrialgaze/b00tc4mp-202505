function Button(type, text) {
    Component.call(this, document.createElement('button'))

    this.container.type = type

    this.container.textContent = text
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button