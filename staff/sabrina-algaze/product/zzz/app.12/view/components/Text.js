function Text(text) {
    Component.call(this, document.createElement('span'))

    this.container.textContent = text
}

Text.prototype = Object.create(Component.prototype)
Text.prototype.constructor = Text