function Link(href, text) {
    Component.call(this, document.createElement('a'))

    this.container.href = href
    this.container.textContent = text
}

Link.prototype = Object.create(Component.prototype)
Link.prototype.constructor = Link