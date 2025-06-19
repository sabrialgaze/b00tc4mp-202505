function Image(src, alt) {
    Component.call(this, document.createElement('img'))

    this.container.src = src

    if (alt) this.container.alt = alt
}

Image.prototype = Object.create(Component.prototype)
Image.prototype.constructor = Image
