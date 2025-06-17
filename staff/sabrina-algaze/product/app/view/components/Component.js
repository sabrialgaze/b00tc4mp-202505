function Component(container) {
    this.container = container

    this.children = []
}

Component.prototype.add = function (child) {
    if (!(child instanceof Component)) throw new TypeError('child is not a Component')
    this.children.push(child)

    this.container.appendChild(child.container)
}