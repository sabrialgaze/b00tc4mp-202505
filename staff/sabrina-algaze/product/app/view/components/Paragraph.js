function Paragraph(text) {
    Component.call(this, document.createElement('p'))

    if (text) this.container.textContent = text
}

Paragraph.prototype = Object.create(Component.prototype)
Paragraph.prototype.constructor = Paragraph