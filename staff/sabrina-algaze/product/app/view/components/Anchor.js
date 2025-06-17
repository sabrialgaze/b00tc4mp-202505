function Anchor(href, text) {
    Component.call(this, document.createElement('a'))

    this.container.href = href
    this.container.textContent = text
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor = Anchor