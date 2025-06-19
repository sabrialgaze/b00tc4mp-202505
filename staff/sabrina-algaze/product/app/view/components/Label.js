function Label(htmlFor, text) {
    Component.call(this, document.createElement('label'))

    this.container.htmlFor = htmlFor

    this.container.textContent = text
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label


