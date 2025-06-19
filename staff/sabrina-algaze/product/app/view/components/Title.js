function Title(level, text) {
    Component.call(this, document.createElement('h' + level))

    this.container.textContent = text
}

Title.prototype = Object.create(Component.prototype)
Title.prototype.constructor = Title